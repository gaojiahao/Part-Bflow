<style lang="less" scoped>
  @import "./war-room.less";
</style>
<template>
  <div class="war-room">
    <div
      class="war-room-toolbar"
      style=''
    >
      <div class="war-room-toolbar-title">
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
      <div class="war-room-toolbar-actions">
        <Tooltip
          content="评论"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="ios-chatbubbles-outline"
            type="primary"
            shape="circle"
            @click="projectCommentModel=true;"
          ></Button>
        </Tooltip>
        <Tooltip
          content="日志任务"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="md-clipboard"
            type="primary"
            shape="circle"
            @click="showProjectTaskLogModel();"
          ></Button>
        </Tooltip>
        <Tooltip
          content="财务分析"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="ios-pie-outline"
            type="primary"
            shape="circle"
            @click="financialAnalysisModel=true;"
          ></Button>
        </Tooltip>

        <Tooltip
          content="项目信息"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="md-list-box"
            type="primary"
            shape="circle"
            @click="projectBaseInfoModel=true;"
          ></Button>
        </Tooltip>

        <Tooltip
          content="刷新数据"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="md-refresh"
            type="primary"
            shape="circle"
            @click="ganttLoadData"
          ></Button>
        </Tooltip>

        <div class="war-room-toolbar-actions-process">
          <div
            v-for="(p,index) in taskProcess"
            :key="index"
            :style="{'background-color':p.color}"
          >
            {{p.fieldValue}}
          </div>
        </div>

      </div>
    </div>
    <div style='width: 100%;height: calc(100% - 40px);display: flex;'>
      <div
        style='flex:24'
        ref="gantt"
      ></div>
    </div>
    <!-- 财务分析 -->
    <Drawer
      :mask="true"
      class="project-drawer"
      width="350"
      :closable="false"
      v-model="financialAnalysisModel"
    >
      <financialAnalysis
        :projectTransCode="projectTransCode"
        :transType="transType"
      ></financialAnalysis>
    </Drawer>

    <!-- 报表分析 -->
    <Drawer
      :mask="true"
      class="project-drawer"
      width="600"
      :closable="false"
      :scrollable='true'
      v-model="timeAnalysisModel"
    >
      <timeAnalysis ref='timeAnalysis'></timeAnalysis>
    </Drawer>

    <!-- 评论 -->
    <Drawer
      :mask="true"
      class="project-drawer"
      width="600"
      :closable="false"
      :scrollable='true'
      v-model="projectCommentModel"
    >
      <userComments ref='taskComments'></userComments>
    </Drawer>

    <!-- 日志任务 -->
    <Drawer
      :mask="true"
      class="project-drawer"
      width="680"
      :closable="false"
      :scrollable='true'
      v-model="projectTaskLogModel"
    >
      <taskLog></taskLog>
    </Drawer>

    <!-- 项目信息 -->
    <Drawer
      :closable="false"
      width="640"
      v-model="projectBaseInfoModel"
    >
      <p class="base-info-p">{{project.projectName}}</p>
      <div>
        <Row>
          <Col span="12">
          项目经理：{{project.projectManagerName}}
          </Col>
          <Col span="12">
          联系方式: {{project.phoneNumber}}
          </Col>
        </Row>
        <Row>
          <Col span="12">
          项目大类: {{project.projectType}}
          </Col>
          <Col span="12">
          项目子类: {{project.projectSubclass}}
          </Col>
        </Row>
        <Row>
          <Col span="12">
          开始日期:{{project.expectStartDate | dateFormatFilter('YYYY-mm-dd')}}
          </Col>
          <Col span="12">
          结束日期: {{project.expectEndDate | dateFormatFilter('YYYY-mm-dd')}}
          </Col>
        </Row>

      </div>
      <Divider />
      <p
        class="base-info-p"
        v-if="project.comment"
      >描述</p>
      <pre
        class="project-comment"
        v-if="project.comment"
      >{{project.comment}}</pre>
      <Divider />
      <div>
        <Table
          :columns="memberColumns"
          :data="projectMember"
        >
          <template
            slot-scope="{ row }"
            slot="percent"
          >
            <span>{{  Math.floor(row.shareOfProfits * 100) + '%' }}</span>
          </template>
          <template
            slot-scope="{ row }"
            slot="divisionOfResponsibilities"
          >
            <Button
              type="error"
              size="small"
              v-if="row.divisionOfResponsibilities==='交付经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <Button
              type="success"
              size="small"
              v-if="row.divisionOfResponsibilities==='方案经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <Button
              type="info"
              size="small"
              v-if="row.divisionOfResponsibilities==='客户经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <span v-if="row.divisionOfResponsibilities==='项目成员'">{{row.divisionOfResponsibilities}}</span>
          </template>
        </Table>
      </div>
    </Drawer>
    <Modal
      v-model="errorTip"
      width="360"
      footer-hide
      class="error-tip"
    >
      <div style="text-align:center;color:#e4393c;">
        <p>
          <Icon type="ios-information-circle"></Icon>{{errorText}}
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
const echarts = require("echarts");
import { ganttLocale } from "./ganttLocale";

import financialAnalysis from "./financial-analysis";
import timeAnalysis from "./time-analysis";
import userComments from "@/views/form/instance-comments";
import taskLog from "@/views/form/modules/task-log";

import {
  saveProjectPlan,
  getProjectPlan,
  saveProjectTask,
  getProjectPlanTransCode,
  getProject,
  addProjectTask,
  updateProjectTask,
  deleteProjectTask
} from "@/services/projectService";
import { getProcessStatusByListId } from "@/services/appService";
import Bus from "@/assets/eventBus.js";

export default {
  name: "warRoom",
  components: {
    financialAnalysis,
    timeAnalysis,
    userComments,
    taskLog
  },
  data() {
    return {
      taskProcess: [],
      transType: "",
      buttonSize: "small",
      financialAnalysisModel: false,
      timeAnalysisModel: false,
      projectCommentModel: false,
      projectTaskLogModel: false,
      projectBaseInfoModel: false,
      errorTip: false,
      errorText: "",
      ganttLocale: ganttLocale,
      projectDuration: [],
      projectMember: [],
      project: {},
      projectTransCode: undefined,
      memberColumns: [
        {
          title: "项目合伙人与成员",
          key: "projectPartnerName"
        },
        {
          title: "责任分工",
          key: "divisionOfResponsibilities",
          slot: "divisionOfResponsibilities"
        },
        {
          title: "分成比例",
          key: "shareOfProfits",
          slot: "percent",
          align: "right"
        },
        {
          title: "说明",
          key: "comment"
        }
      ]
    };
  },
  computed: {},
  methods: {
  showProjectTaskLogModel(){
    let taskId = gantt.getSelectedId();
    if(taskId === '0'){
      gantt.alert('抱歉,根级任务无需创建日志任务!');
    }else{
      this.projectTaskLogModel =true;
    }
  },
	getRootTask(){
		return {
			parent:'root',
			text:this.project.projectName,
			dealerName:this.project.projectManagerName,
			start_date:new Date(this.project.expectStartDate),
			end_date:new Date(this.project.expectEndDate),
			duration:10,
			type:'project',
			transCode:'',
			id:'0'
		}
	},
    formatProjectData(formData) {
      this.projectPlanReferenceId = formData.biReferenceId;
      var tasks = [],
        links = [],
        projectPlanTask = formData.projectPlanTask,
        projectApproval = formData.projectApproval,
        spltTask = function(task) {
          tasks.push(task);
          if (task.children.length) {
            task.children.map(t => {
              spltTask(t);
            });
          }
        };

      projectPlanTask.map(t => {
        spltTask(t);
      });

      tasks.map((t, index) => {
        t.id = t.projectPlanTaskId;
        t.parent = t.parentId;
        t.start_date = t.startTime;
        t.end_date = t.deadline;
        t.text = t.taskName;
        if(t.planPrimeCostSubtotal === 0){
          t.progress = 0;
        }else{
          t.progress = t.declarePrimeCostSubtotal / t.planPrimeCostSubtotal;
        }
      });

      tasks.push(this.getRootTask());

      tasks.map((t, index) => {
        links.push({
          id: index,
          source: t.parent,
          target: t.id,
          type: "1"
        });
      });
      return {
        data: tasks
        // links:links
      };
    },
    /**
     * 添加标记
     */
    addMarker() {
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "今天",
        title: "Today: " + today
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
    initTemplates() {
      gantt.templates.tooltip_text = function(start, end, task) {
        var tooltip = "";
        tooltip += "<b>任务:</b> " + task.text + "<br/>";
        tooltip +=
          "<b>开始日期:</b> " +
          gantt.templates.format_date(new Date(start)) +
          "<br/>";
        tooltip += "<b>周期天数:</b> " + task.duration + "<br/>";
        tooltip += "<b>计划工时:</b> " + task.standardWorkingHours + "<br/>";
        tooltip += "<b>执行者:</b> " + task.dealerName + "<br/>";
        tooltip += "<b>流程状态:</b> " + task.processStatus + "<br/>";

        return tooltip;
      };

      //区分工作日
      // gantt.config.correct_work_time = true;
      gantt.config.work_time = true;
      gantt.templates.timeline_cell_class = function(task, date) {
        if (!gantt.isWorkTime({ date: date, unit: "day" })) return "week_end";
        return "";
      };

      // 显示进度文字
      // gantt.templates.progress_text = function (start, end, task) {
      // 	return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + "% </span>";
      // };

      //弹出框标题
      gantt.templates.lightbox_header = function(start_date, end_date, task) {
        return "任务详情";
      };

      function percenToString(num) {
        return Math.floor(num * 100) + "%";
      }

      function ColorLuminance(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#",
          c,
          i;
        for (i = 0; i < 3; i++) {
          c = parseInt(hex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
          rgb += ("00" + c).substr(c.length);
        }

        return rgb;
      }
      let vm = this;

      gantt.templates.task_text = function(start, end, task) {
        let color,
          progress = task.progress;

        vm.taskProcess.map(c => {
          if (c.fieldValue === task.processStatus) color = c.color;
        });
        return `<div style='width:100%;position: absolute;background-color:${color}' >${
          task.text
        }</div>
						<div  style='text-align: left;opacity: 0.5;color: black;font-weight: 600;width:${progress *
              100}%;background-color:${ColorLuminance(
          color,
          0.5
        )}' >${percenToString(progress)}</div>`;
      };
    },
    createTaskSaveData(item, type) {
		let parent;
		//parent为0，则为项目
		//如果直接拿id,会拿gantt的默认自动生成的id,所有再添加子任务时，添加的parentId是错的
		if(item.parent === 'root' ){
			parent = '0';
		}else{
			parent = item.parent;
		}

		let data = {
			parentId: parent,
			projectPlanReferenceId: this.projectPlanReferenceId,
			projectId: this.project.projectApprovalId,
			taskName: item.text,
			taskType: item.taskType,
			executor: item.executor,
			dealerName: item.dealerName,
			processStatus: item.processStatus,
			standardWorkingHours: item.standardWorkingHours,
			cycleDays: item.duration,
			startTime: gantt.templates.format_date(item.start_date),
			deadline: gantt.templates.format_date(item.end_date),
			comment: item.comments || "",
			seq: item.$index
		};

		if (type === "update") {
			data["projectPlanTaskId"] = item.projectPlanTaskId;
		}
		return data;
    },
    /**
     * 初始化事件
     */
    initEvents() {
      let vm = this;
      gantt.attachEvent("onParse", function() {
        gantt.render();
      });
      //新增任务
      gantt.attachEvent("onAfterTaskAdd", function(id, item) {
        let projectPlanData = vm.buildProjetPlanData();
        let projectPlanTaskData = vm.initProjetPlanTaskFormData();
        let saveTaskData = {};

        vm.projectMember.map(m => {
          if (item.executor === m.key) {
            item.dealerName = m.label;
          }
        });
        //如果层级为1，和索引唯一，则需要创建项目计划，否则只是单纯的增加任务
        if (item.$index === 1 && item.$level === 1) {
          projectPlanData.formData.projectPlanTask.push(vm.transformTask(item));

          saveProjectPlan(projectPlanData).then(res => {
            vm.ganttLoadData();
          });
        } else {
          saveTaskData = vm.createTaskSaveData(item, "save");
          addProjectTask(saveTaskData).then(res => {
            if (res.success) {
				vm.$Message.success(res.message);
				item = Object.assign(item, res.task);
				gantt.changeTaskId(id, res.task.projectPlanTaskId);
            }
          });
        }
      });

      //删除任务
      gantt.attachEvent("onBeforeTaskDelete", function(id, item) {
        //todo:删除项目
        if (item.projectPlanTaskId) {
          deleteProjectTask(item.projectPlanTaskId).then(res => {
            if (res.success) {
              vm.$Message.success(res.message);
            }
          });
        }
      });

      //修改任务
      gantt.attachEvent("onAfterTaskUpdate", function(id, task) {
        let saveTaskData = {};
        vm.projectMember.map(m => {
          if (task.executor === m.key) {
            task.dealerName = m.label;
          }
        });
        saveTaskData = vm.createTaskSaveData(task, "update");
        updateProjectTask(saveTaskData).then(res => {
          if (res.success) {
            vm.$Message.success(res.message);
          }
        });
        return true;
      });

      // 选择任务
      gantt.attachEvent("onTaskClick", function(id) {
        let task = gantt.getTaskBy("id", id);
        if (task.length === 1) {
          vm.$router.replace(`/project/warRoom/${task[0].transCode}`);
        } else {
          vm.$router.replace(`/project/warRoom/${vm.projectTransCode}`);
        }
        return true;
      });

      //校验
      gantt.attachEvent("onLightboxSave", function(id, item) {
				let valid = true;
        if (!item.standardWorkingHours) {
					vm.errorText = "请输入计划工时！";
					valid = false;
        }
        if (!item.text) {
          vm.errorText = "请输入任务名称！";
          valid = false;
        }
				if(!valid) {
					vm.errorTip = true;
					setTimeout(() => {
						vm.errorTip = false;
					}, 2000);
					return false;
				}
        
        return true;
      });
    },
    /**
     * 构建表单基本信息
     */
    buildBaseInfo() {
      let currentUser = this.$currentUser;
      return {
        handlerName: currentUser.nickname,
        handlerUnitName:
          currentUser.depts && currentUser.depts[0]
            ? currentUser.depts[0].name
            : "",
        handlerRoleName: currentUser.isSysRoleList[0].name,
        handler: currentUser.userId,
        handlerUnit:
          currentUser.depts && currentUser.depts[0]
            ? currentUser.depts[0].id
            : "",
        handlerRole: currentUser.isSysRoleList[0].id,
        creator: currentUser.userId,
        modifer: currentUser.userId,
        handlerEntity: currentUser.entityId
      };
    },
    /**
     * 设置项目周期
     */
    setProjectDuration(duration) {
      gantt.config.start_date = new Date(duration[0]);
      gantt.config.end_date = new Date(duration[1]);
      gantt.render();
    },
    /**
     * 构建项目计划主体结构数据
     */
    buildProjetPlanData() {
      let data = {
        listId: "0281f8eb-f1d2-415c-b566-756fc749ccb3",
        formData: {
          baseinfo: this.buildBaseInfo(),
          projectApproval: this.project,
          projectPlanTask: []
        }
      };
      return data;
    },
    /**
     * 构建项目任务主体结构数据
     */
    initProjetPlanTaskFormData() {
      let data = {
        formData: {
          baseinfo: this.buildBaseInfo(),
          rootProjectPlanTaskId: "",
          projectPlanTask: []
        }
      };
      return data;
    },
    /**
     * 数据转换，将gantt的task对象转换撑RT需要的格式
     */
    transformTask(item) {
      return {
        taskName: item.text,
        parentId: item.parent,
        taskType: item.taskType,
        executor: item.executor,
        standardWorkingHours: item.duration,
        startTime: gantt.templates.format_date(item.start_date),
        deadline: gantt.templates.format_date(item.end_date),
        seq: item.$index
      };
    },
    /**
     * 初始化甘特图配置
     */
    initGanttConfig() {
      gantt.config.show_progress = false;
      // gantt.config.readonly = true;
      gantt.i18n.setLocale(this.ganttLocale);
      gantt.config.date_format = "%Y-%m-%d";
      //暂时快捷信息
      gantt.plugins({
        // quick_info: true,
        tooltip: true,
        fullscreen: true,
        marker: true
      });
      gantt.config.root_id = "root";
      gantt.config.xml_date = "%Y-%m-%d";
      gantt.config.row_height = 18; //甘特图的行高
      gantt.config.min_column_width = 60;
      gantt.config.scale_height = 18 * 3;
      gantt.config.row_height = 28;
      gantt.config.open_tree_initially = true;
      gantt.config.auto_scheduling = true;
      gantt.config.scale_unit = "day"; //时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
      gantt.config.date_scale = "%d,%D"; //日期格式 先数字后文字
      gantt.config.subscales = [
        {
          unit: "month",
          step: 1,
          date: "%Y年,%M"
        }
      ];
      //允许用户推拽条形图上用来调整进度百分比的小按钮
      gantt.config.drag_progress = false;
      //合并父节点是，分割下级任务
      gantt.config.open_split_tasks = true;

      let taskType = [
        {
          key: "设计类",
          label: "设计类"
        },
        {
          key: "协调类",
          label: "协调类"
        },
        {
          key: "执行类",
          label: "执行类"
        }
      ];

      let processStatusData = [];
      this.taskProcess.forEach(item => {
        processStatusData.push({
          key: item.fieldValue,
          label: item.fieldValue
        });
      });

      gantt.form_blocks["num_editor"] = {
        render: function(sns) {
          //sns - the section's configuration object
          return (
            "<div class='gantt_cal_ltext' >" +
            "&nbsp;<input class='editor_description' type='number'>" +
            "</div>"
          );
        },
        set_value: function(node, value, task, section) {
          node.querySelector(".editor_description").value = value;
          //node - an html object related to the html defined above
          //value - a value defined by the map_to property
          //task - the task object
          //section- the section's configuration object
        },
        get_value: function(node, task, section) {
          //node - an html object related to the html defined above
          //task - the task object
          //section - the section's configuration object
          let value = node.querySelector(".editor_description").value;
          task[section.map_to] = value;
          return value;
          ("");
        },
        focus: function(node) {
          //node - an html object related to the html defined above
        }
      };

      gantt.config.lightbox.sections = [
        {
          name: "description",
          height: 38,
          map_to: "text",
          type: "textarea",
          focus: true
        },
        {
          name: "taskType",
          height: 30,
          width: "50%",
          map_to: "taskType",
          type: "select",
          options: taskType
        },
        {
          name: "executor",
          height: 30,
          width: "50%",
          type: "select",
          map_to: "executor",
          options: this.projectMember
        },
        {
          name: "standardWorkingHours",
          height: 38,
          map_to: "standardWorkingHours",
          type: "num_editor",
          default_value: 1
        },
        {
          name: "processStatus",
          height: 30,
          width: "50%",
          type: "select",
          map_to: "processStatus",
          options: processStatusData
        },
        {
          name: "time",
          height: 30,
          type: "duration",
          time_format: ["%Y", "%m", "%d"],
          map_to: "auto"
        }
      ];

      gantt.locale.labels.section_taskType = "任务类型";
      gantt.locale.labels.section_executor = "执行者";
      gantt.locale.labels.section_standardWorkingHours = "计划工时";
      gantt.locale.labels.section_processStatus = "流程状态";

      var standardWorkingHoursEditor = {
        type: "number",
        map_to: "standardWorkingHours",
        min: 0,
        max: 24
      };

      gantt.config.columns = [
        {
          name: "text",
          tree: true,
          width: 200,
          resize: true,
          label: "任务名称",
          align: "left"
        },
        { name: "dealerName", width: 60, align: "center", label: "执行者" },
        {
          name: "start_date",
          align: "center",
          width: 80,
          resize: true,
          label: "开始日期"
        },
        // {name: "end_date", align: "center", width: 80, resize: true,label:'结束日期'},
        {
          name: "duration",
          width: 60,
          align: "right",
          resize: true,
          label: "周期天数"
        },
        {
          name: "standardWorkingHours",
          width: 60,
          align: "right",
          resize: true,
          label: "计划工时",
          editor: standardWorkingHoursEditor
        },
        { name: "add", width: 44 }
      ];

      gantt.config.layout = {
        css: "gantt_container",
        cols: [
          {
            width: 500,
            min_width: 300,
            rows: [
              {
                view: "grid",
                scrollX: "gridScroll",
                scrollable: true,
                scrollY: "scrollVer"
              },
              { view: "scrollbar", id: "gridScroll", group: "horizontal" }
            ]
          },
          { resizer: true, width: 1 },
          {
            rows: [
              { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
              { view: "scrollbar", id: "scrollHor", group: "horizontal" }
            ]
          },
          { view: "scrollbar", id: "scrollVer" }
        ]
      };

      gantt.config.duration_unit = "day";
      // gantt.config.order_branch = true;
      // gantt.config.order_branch_free = true;
      // gantt.config.placeholder_task = true;
    },
    /**
     * 加载甘特图数据
     */
    ganttLoadData() {
      let planTransCode;
      Bus.$emit("refreshProjectInfo");
      this.$Loading.start();
      getProjectPlanTransCode(this.projectTransCode).then(res => {
        this.$Loading.finish();
        if (res.length) {
          this.transType = res[0].transType;
          planTransCode = res[0].transCode;
          getProjectPlan(planTransCode).then(res => {
            let data = this.formatProjectData(res.formData);
			// this.project = res.formData.projectApproval;
			this.addMarker();
			gantt.clearAll(); 
            gantt.parse(data);
            // this.setProjectDuration([this.project.expectStartDate,this.project.expectEndDate]);
          });
		}else{
			this.addMarker();
			let rootTask = this.getRootTask();
			this.setProjectDuration([this.project.expectStartDate,this.project.expectEndDate]);
			gantt.parse({
				data:[rootTask]
			});
		}
      });
    },

    /**
     * 获取项目任务流程状态
     */
    getTaskProcess() {
      return getProcessStatusByListId(
        "ee4ff0a1-c612-419d-afd7-471913d57a2a",
        1,
        20,
        {}
      ).then(res => {
        this.taskProcess = res.tableContent;
      });
    },

    /**
     * 获取项目信息
     */
    getProjectInfo() {
      return getProject(this.projectTransCode).then(res => {
        this.projectMember = res.formData.order;
        this.projectMember.map(m => {
          m.key = m.projectPartnerCode;
          m.label = m.projectPartnerName;
		});
		this.project = res.formData.projectApproval;
      });
    }
  },
  async mounted() {
    await this.getTaskProcess();
    await this.getProjectInfo();

    this.initTemplates();
    this.initGanttConfig();
    gantt.init(this.$refs.gantt);
    this.ganttLoadData();
    this.initEvents();
  },
  created: function() {
    this.projectTransCode = this.$route.params.transCode;
  }
};
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

.project-comment {
  font-family: Arial;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
}

.base-info-p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  display: block;
  margin-bottom: 16px;
}

.gantt_task_line {
  border: none;
  background-color: snow;
}
</style>