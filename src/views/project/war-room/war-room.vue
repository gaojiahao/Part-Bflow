<style lang="less" scoped>
  @import "./war-room.less";
</style>
<template>
    <div  class="war-room" >
      <div class="war-room-toolbar"  style=''>
		<div class="war-room-toolbar-title"  >
			<Row>
				<Col span="8">
				{{project.projectName}}
				</Col>
				<!-- <Col span="16">
				项目周期:
					<DatePicker type="daterange" @on-change="setProjectDuration"  v-model="projectDuration"  split-panels   placement="bottom-end"  style="width: 200px"></DatePicker>
				</Col> -->
			</Row>
		</div>
		<div  class="war-room-toolbar-actions" >
            <Tooltip content="评论" placement="top">
                    <Button :size="buttonSize" icon="ios-chatbubbles-outline" type="primary" shape="circle" @click="projectCommentModel=true;"></Button>
            </Tooltip>
            <Tooltip content="日志任务" placement="top">
                <Button :size="buttonSize" icon="md-clipboard" type="primary" shape="circle" @click="projectTaskLogModel=true;"></Button>
            </Tooltip>
            <Tooltip content="财务分析" placement="top">
                    <Button :size="buttonSize" icon="ios-pie-outline" type="primary" shape="circle" @click="financialAnalysisModel=true;"></Button>
            </Tooltip>

			 <Tooltip content="刷新数据" placement="top">
                    <Button :size="buttonSize" icon="md-refresh" type="primary" shape="circle" @click="ganttLoadData"></Button>
            </Tooltip>
			
            <!-- <Tooltip content="数据分析" placement="top">
                <Button :size="buttonSize" icon="md-analytics" type="primary" shape="circle" @click="timeAnalysisModel=true;"></Button>
            </Tooltip> -->
		</div>
      	</div>
		<div style='width: 100%;height: calc(100% - 40px);display: flex;'>
			<div style='flex:24' ref="gantt"></div>
		</div>
        <!-- 财务分析 -->
    	 <Drawer :mask="true"  class="project-drawer"  width="350" :closable="false" v-model="financialAnalysisModel">
			<financialAnalysis :projectTransCode="projectTransCode" :transType="transType"></financialAnalysis>
		 </Drawer>

        <!-- 报表分析 -->
		 <Drawer  :mask="true"  class="project-drawer"  width="600" :closable="false" :scrollable='true' v-model="timeAnalysisModel">
			<timeAnalysis ref='timeAnalysis'></timeAnalysis>
		 </Drawer>

         <!-- 评论 -->
         <Drawer  :mask="true"  class="project-drawer"   width="600" :closable="false" :scrollable='true' v-model="projectCommentModel">
			<userComments ref='taskComments'></userComments>
		 </Drawer>
		 
         <!-- 日志任务 -->
          <Drawer :mask="true"  class="project-drawer"   width="680" :closable="false" :scrollable='true' v-model="projectTaskLogModel">
			<taskLog></taskLog>
		 </Drawer>
    </div>
</template>

<script>

import {gantt} from 'dhtmlx-gantt';
const echarts = require("echarts");
import {ganttLocale} from './ganttLocale';

import financialAnalysis from './financial-analysis'
import timeAnalysis from './time-analysis'
import userComments from '@/views/form/instance-comments'
import taskLog from '@/views/form/modules/task-log'

import {saveProjectPlan,getProjectPlan,saveProjectTask,getProjectPlanTransCode } from '@/services/projectService'
import Bus from "@/assets/eventBus.js";

export default {
    name:'warRoom',
    components:{
        financialAnalysis,
        timeAnalysis,
        userComments,
        taskLog
    },
    data(){
        return {
			transType: "",
            buttonSize: 'small',
            financialAnalysisModel: false,
            timeAnalysisModel:false,
            projectCommentModel:false,
            projectTaskLogModel:false,
            ganttLocale:ganttLocale,
			projectDuration:[],
			projectMember:[],
			project:{},
			projectTransCode:undefined
        }
	},
	computed: {
		
  	},
    methods:{
        formatProjectData(formData){
			var tasks = [],
				links = [],
				projectPlanTask = formData.projectPlanTask,
				projectApproval = formData.projectApproval,
            	spltTask  = function(task){
					tasks.push(task);
					if(task.children.length){
						task.children.map(t=>{
							spltTask(t);
						});
					}
				};

            projectPlanTask.map(t=>{
                spltTask(t);
			});
			
            tasks.map((t,index)=>{
                // delete t.children;
                t.id = t.projectPlanTaskId;
                t.parent = t.parentId;
                t.start_date = t.startTime;
				t.end_date = t.deadline;
				// t.type = index%2 ==0?gantt.config.types.milestone:'task'
				// t.duration = t.standardWorkingHours;
				t.text = t.taskName;
				t.progress = (t.declarePrimeCostSubtotal/t.planPrimeCostSubtotal)>1?1:t.declarePrimeCostSubtotal/t.planPrimeCostSubtotal;
				console.log(t.text,t.progress);
			});

			tasks.push({
				parent:'root',
				text:projectApproval.projectName,
				dealerName:projectApproval.projectManagerName,
				start_date:new Date(projectApproval.expectStartDate),
				end_date:new Date(projectApproval.expectEndDate),
				type:'project',
				transCode:'',
				id:'0'
			});

			tasks.map((t,index)=>{
				links.push({
					id:index,
					source:t.parent,
					target:t.id,
					type:"1"
				})
			});
            return {
				data:tasks,
				// links:links 
			};
		},
		/**
		 * 添加标记
		 */
        addMarker(){
            var today = new Date();
            gantt.addMarker({
                start_date: today,
                css: "today",
                text: "今天",
                title: "Today: "+today
            });


            var start = new Date(this.project.expectStartDate);
            gantt.addMarker({
                start_date: start,
                css: "status_line",
                text: "开始日期",
                title: "开始日期: " + start
            });

		},
		/**
		 * 初始配置各类模板
		 */
        initTemplates(){
            gantt.templates.tooltip_text = function(start, end, task) {
                var tooltip = "";
                tooltip += "<b>任务:</b> "+task.text+"<br/>";
                tooltip += "<b>开始日期:</b> " +  gantt.templates.format_date(new Date(start)) + "<br/>";
                tooltip += "<b>结束日期:</b> " + gantt.templates.format_date(new Date(end))  + "<br/>";
                tooltip += "<b>计划工时:</b> " + task.duration + "<br/>";
                tooltip += "<b>执行者:</b> " + task.dealerName + "<br/>";
                
                return tooltip;
            };

            //区分工作日
            // gantt.config.correct_work_time = true;
	        gantt.config.work_time = true;
            gantt.templates.timeline_cell_class = function (task, date) {
                if (!gantt.isWorkTime({date:date,unit: "day"}))
                return "week_end";
            return "";
            };

            // 显示进度文字
            gantt.templates.progress_text = function (start, end, task) {
            	return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + "% </span>";
            };

            //弹出框标题
            gantt.templates.lightbox_header = function(start_date,end_date,task){
                return gantt.templates.format_date(new Date(start_date)) + '~' +  gantt.templates.format_date(new Date(end_date)) +  "&nbsp;" +
                (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
            };
		},
		/**
		 * 初始化事件
		 */
		initEvents(){
			let vm = this;
			gantt.attachEvent("onParse", function(){
				gantt.render();
			});
			//新增任务
			gantt.attachEvent("onAfterTaskAdd", function(id,item){
				//any custom logic here
				let projectPlanData = vm.buildProjetPlanData();
				let projectPlanTaskData = vm.initProjetPlanTaskFormData();

				vm.projectMember.map(m=>{
					if(item.executor === m.key){
						item.dealerName = m.label;
					}
				});
				//如果层级为1，和索引唯一，则需要创建项目计划，否则只是单纯的增加任务
				if(item.$index===1 && item.$level===1){
					projectPlanData.formData.projectPlanTask.push(vm.transformTask(item));

					saveProjectPlan(projectPlanData).then(res=>{
						vm.ganttLoadData();
					})
				}else{
					projectPlanTaskData.formData.rootProjectPlanTaskId = item.parent;
					projectPlanTaskData.formData.projectPlanTask.push(vm.transformTask(item));
					projectPlanTaskData.formData.transCode="PTSK2006280003";
					projectPlanTaskData.wfParam = null;
					projectPlanTaskData.formData.comment={
						biComment:''
					}
					
					saveProjectTask(projectPlanTaskData).then(res=>{
						vm.ganttLoadData();
					});
				}
			});

			//删除任务
			gantt.attachEvent("onAfterTaskDelete", function(id,item){
				//any custom logic here
			});

			//修改任务
			gantt.attachEvent("onBeforeTaskUpdate", function(id,task){
				vm.projectMember.map(m=>{
					if(task.executor === m.key){
						task.dealerName = m.label;
					}
				});
				return true;
			});

			// 选择任务
			gantt.attachEvent("onTaskClick", function(id){
				let task = gantt.getTaskBy('id',id);
				if(task.length===1){
					vm.$router.replace(`/project/warRoom/${task[0].transCode}`);
				}else{
					vm.$router.replace(`/project/warRoom/${vm.projectTransCode}`);
				}
				return true;
			});

		},
		/**
		 * 构建表单基本信息
		 */
		buildBaseInfo(){
			let currentUser = this.$currentUser;
			return {
                    handlerName: currentUser.nickname,
                    handlerUnitName: currentUser.depts&&currentUser.depts[0] ? currentUser.depts[0].name:'',
                    handlerRoleName: currentUser.isSysRoleList[0].name,
                    handler: currentUser.userId,
                    handlerUnit:  currentUser.depts&&currentUser.depts[0]?currentUser.depts[0].id:'',
                    handlerRole: currentUser.isSysRoleList[0].id,
                    creator: currentUser.userId,
                    modifer: currentUser.userId,
                    handlerEntity: currentUser.entityId,
				};
			
		},
		/**
		 * 设置项目周期
		 */
		setProjectDuration(duration){
			gantt.config.start_date = new Date(duration[0]);
			gantt.config.end_date = new Date(duration[1]);
			gantt.render();
		},
		/**
		 * 构建项目计划主体结构数据
		 */
		buildProjetPlanData(){
			let data = {
				listId:"0281f8eb-f1d2-415c-b566-756fc749ccb3",
				formData:{
					baseinfo:this.buildBaseInfo(),
					projectApproval:this.project,
					projectPlanTask:[]
				},
				
			};
			return data;
		},
		/**
		 * 构建项目任务主体结构数据
		 */
		initProjetPlanTaskFormData(){
			let data = {
				formData:{
					baseinfo:this.buildBaseInfo(),
					rootProjectPlanTaskId:'',
					projectPlanTask:[]
				},
				
			};
			return data;
		},
		/**
		 * 数据转换，将gantt的task对象转换撑RT需要的格式
		 */
		transformTask(item){
			return {
				taskName:item.text,
				parentId:item.parent,
				taskType:item.taskType,
				executor:item.executor,
				standardWorkingHours:item.duration,
				startTime: gantt.templates.format_date(item.start_date),
				deadline:gantt.templates.format_date(item.end_date),
				seq:item.$index
			}
		},
		/**
		 * 初始化甘特图配置
		 */
		initGanttConfig(){
			// gantt.config.readonly = true;
			gantt.config.root_id = "root"; 
			gantt.config.xml_date = "%Y-%m-%d";
			gantt.config.row_height = 18; //甘特图的行高
			gantt.config.min_column_width = 60;
			gantt.config.scale_height = 18 * 3;
			gantt.config.row_height = 28;
			gantt.config.open_tree_initially = true;
			gantt.config.auto_scheduling = true;
			gantt.config.scale_unit = "day";  //时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
			gantt.config.date_scale = "%d,%D";//日期格式 先数字后文字 
			gantt.config.subscales = [{ 
				unit: "month",
				step: 1,
				date: "%Y年,%M"
			}];
			//允许用户推拽条形图上用来调整进度百分比的小按钮
			gantt.config.drag_progress = false;
			//合并父节点是，分割下级任务
			gantt.config.open_split_tasks = true;
				
			let taskType = [
				{
					key:'设计类',
					label:'设计类'
				},
				{
					key:'协调类',
					label:'协调类',
				},
				{
					key:'执行类',
					label:'执行类'
				}
			];
			
			gantt.config.lightbox.sections = [
				{name:"description", height:38, map_to:"text", type:"textarea",focus:true},
				{name:"taskType", height:30, map_to:"taskType",type:"select",options:taskType},                                                                        
				{name:"executor", height:30, type:"select", map_to:"executor",options:this.projectMember},
				{name:"time", height:30, type:"duration",time_format:["%Y","%m","%d"] , map_to:"auto"},
			];

			gantt.locale.labels.section_taskType = "任务类型";
			gantt.locale.labels.section_executor = "执行者";

			gantt.config.columns = [
				{name: "text", tree: true, width: 220, resize: true,label:"任务名称",align: "left"},
				{name: "dealerName", width: 60, align: "center",label:'执行者'},
				{name: "start_date", align: "center", width: 80, resize: true,label:'开始日期'},
				// {name: "add", width: 44},
				{name: "end_date", align: "center", width: 80, resize: true,label:'结束日期'},
				// {name: "duration", width: 60, align: "right", resize: true,label:'计划工时'},
			];
			
			gantt.config.layout = {
				css: "gantt_container",
				cols: [
					{
						width:400,
						min_width: 300,
						rows:[
							{view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"},
							{view: "scrollbar", id: "gridScroll", group:"horizontal"}
						]
					},
					{resizer: true, width: 1},
					{
						rows:[
							{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
							{view: "scrollbar", id: "scrollHor", group:"horizontal"}
						]
					},
					{view: "scrollbar", id: "scrollVer"}
				]
			};

			gantt.config.duration_unit = "hour";
		},
		/**
		 * 加载甘特图数据
		 */
		ganttLoadData(){
			let planTransCode;
			Bus.$emit("refreshProjectInfo");
			this.$Loading.start();
			getProjectPlanTransCode(this.projectTransCode).then(res=>{
				this.$Loading.finish();
				if(res.length){
					this.transType = res[0].transType;
					planTransCode = res[0].transCode;
					getProjectPlan(planTransCode).then(res=>{
						let data = this.formatProjectData(res.formData);
						this.project = res.formData.projectApproval;
						gantt.parse(data);
						// this.setProjectDuration([this.project.expectStartDate,this.project.expectEndDate]);
						this.addMarker();
					});
				}
			});
		}
	},
	mounted: function () {
		// this.demoProjectB.formData.order.map(m=>{
		// 	this.projectMember.push({
		// 		key:m.projectPartnerCode,
		// 		label:m.projectPartnerName
		// 	},);
		// });
	
		gantt.i18n.setLocale(this.ganttLocale);
		gantt.config.date_format = "%Y-%m-%d";
		//暂时快捷信息
		gantt.plugins({
			// quick_info: true,
			tooltip: true,
			fullscreen: true,
			marker: true
		});
		this.initTemplates();
		this.initGanttConfig();
		gantt.init(this.$refs.gantt);
		this.ganttLoadData();
		this.initEvents();
	},
	created:function(){
		this.projectTransCode =  this.$route.params.transCode;
	}
	  
}
</script>

<style>
    @import "../../../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

<style >


.baseline {
	position: absolute;
	border-radius: 2px;
	opacity: 0.6;
	margin-top: -7px;
	height: 12px;
	background: #ffd180;
	border: 1px solid rgb(255, 153, 0);
}

.status_line {
	background-color: #0ca30a;
} 

.gantt_task_cell.week_end {
    background-color: #e8e8e87d;
}

.gantt_task_row.gantt_selected .gantt_task_cell.week_end {
    background-color: #e8e8e87d !important;
}

.gantt_task_progress {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
}

</style>