<style lang="less" scoped>
@import "./task-log.less";
</style>

<template>
  <div  class="timeline-box">
    <div class="task-modal" :style="{display: showTaskModal?'block':'none'}"></div>
    <div class="app-resource-group-title" v-if="allowAddLog">
        <span class="font16">日志任务</span>
        <span v-if="logData.length>0 " >
          <Tooltip class="hidden-form" v-if="!hiddenForm" content="打开任务日志表单" placement="left">
          <span @click="openForm">
              <Icon type="md-arrow-dropup-circle" />
          </span>
          </Tooltip>
          <Tooltip class="hidden-form" v-else content="关闭任务日志表单" placement="left">
            <span @click="closeForm">
                <Icon type="md-arrow-dropdown-circle" />
            </span>
          </Tooltip>
        </span>
        
    </div>

    <div class="timeline-box-form" v-if="hiddenForm  && allowAddLog ">
      <Form ref="logForm" :label-width="80"   :model="modalFormData"  :rules="ruleValidate">
         <Row>
            <Col :xs="24" :sm="showAll?24:12" :md="showAll?24:8" :lg="showAll?24:8">
              <FormItem label='状态' prop="logStatus"> 
                <Checkbox 
                  v-model="modalFormData.logStatus" 
                  size='large' 
                  true-value='已办' 
                  false-value='待办'>
                  {{modalFormData.logStatus}}
                </Checkbox>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="showAll?24:12" :md="showAll?24:8" :lg="showAll?24:8">
              <FormItem label='员工'  prop="users"> 
                <Select
                  ref="selectUser"
                  v-model="modalFormData.users"
                  multiple
                  filterable
                  remote
                  placeholder="请选择或搜索员工"
                  :remote-method="remoteFilterSearch"
                  @on-query-change="handleQueryChange"
                  @on-change="onSelectChange"
                  :loading="loading"
                  class="task-user">
                  <Option v-for="(option) in userList" :value="option.userId" :key="option.userId">{{option.nickname}}</Option>
                </Select>
              </FormItem>
            </Col>
         </Row>

          <Row>
           <Col span="24">
            <FormItem label="标题:" prop="logTitle" >
              <Input v-model="modalFormData.logTitle" placeholder="请输入任务日志标题" />
            </FormItem> 
            </Col>
         </Row>

         <Row>
          <Col :xs="24" :sm="showAll?24:12" :md="showAll?24:8" :lg="showAll?24:8">
               <FormItem label="类型:" prop="logType">
                  <Select v-model="modalFormData.logType" >
                    <Option v-for="item in logTypeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
              </FormItem> 
            </Col>
           
           <Col :xs="24" :sm="showAll?24:12" :md="showAll?24:8" :lg="showAll?24:8">
              <FormItem label="日期:" prop="taskDate" >
                <DatePicker 
                  style="width: 100%"
                  type="date" 
                  format="yyyy-MM-dd" 
                  @on-change='handlerChangelogHours'
                  :clearable="false" 
                  v-model="modalFormData.taskDate">
                </DatePicker>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="showAll?24:12" :md="showAll?24:8" :lg="showAll?24:8">
               <FormItem label="申报工时:" prop="logDeclarationHours">
                <InputNumber 
                  v-model="modalFormData.logDeclarationHours"
                  :step="1"/>单位/时
              </FormItem>
            </Col>

           
         </Row>


        <FormItem label="成果:" prop="comments">
          <Input  v-model="modalFormData.comments" type="textarea" placeholder="请输入您的成果" />
        </FormItem>

        <FormItem>
          <input type="button" class="timeline-box-form-submit" @click="submitLog" value="提交" />
        </FormItem>
      </Form>
    </div>

    <div  class="timeline-box-log" v-show="logData.length===0?false:true">
      <div class="timeline-box-log-sum">
        <span>总工时：<b>{{ logHours }}</b></span>
        <span :style="{marginLeft:'15px'}">总成本：<b>{{ logCosts | toThousandFilter }}</b></span>
      </div>
      <ul class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <img  @error="errorimg(item,index)" :src="item.photo?item.photo:'resources/images/icon/defaultUserPhoto.png'" class="head-portrait"/>
        <ul class="timeline-item-content-ul">
          <li>
           
            <Checkbox 
              v-model="item.logStatus" 
              size='large' 
              @on-change='handlerChangeLogStatus(item)'
              true-value='已办' 
              false-value='待办'>
            </Checkbox>

            <strong style="word-break:break-all">{{item.logTitle}}</strong>
          </li>
          <li>
            <span>{{item.handlerName}}</span>
            <span>{{item.taskDate}}</span>
            <span v-html="`${item.logDeclarationHours} 小时`"></span>

            <span >{{item.logType}}</span>

          </li>
          <li>
            <pre class="comment-pre" >{{item.comment}}</pre>
          </li>
        </ul>
      </ul>
      <div class="loading-more">
        <Page 
            :total="pageTotal" 
            :current="currentPage"
            :page-size="pageSize" 
            @on-change="changeCurrentPage"
            @on-page-size-change="onPageSizeChange"
            show-total
            size="small"  
            ></Page>
      </div>
    </div>
    <Modal
        v-model="modalVisible"
        title="系统提示"
        @on-ok="handlerUpdateLogStatus(curLog)"
        @on-cancel="getTaskLog();modalVisible=false">
        <p>您要更改的日志任务日期大于今日，应为待办，如果更新为已办，日志的日期将自动更新为今天!</p>
    </Modal>
  </div>
</template>

<script>
import { getTaskLog, saveTaskLog,updateLogStatus,getFeaturesConfig} from "@/services/appService.js";
import { getDictByValue} from "@/services/commonService.js";
import { getAllUsers } from "@/services/subscribeService";
import { FormatDate } from "@/utils/utils";
import Bus from "@/assets/eventBus.js";

export default {
  name: "TaskLog",
  components: {},
  props: {
    listId: {
      type: String
    },
    showAll: {
      type: Boolean,
      default(){
        return false;
      }
    },
    taskLogUrl: {
      type: String,
      default(){
        return 'jobLog/findAllJobLog';
      }
    },
    allowAddLog:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    
    const  validateTaskStatus = (rule, value, callback) => {
      if(this.modalFormData.taskDate<FormatDate(new Date(),"yyyy-MM-dd") && value!='已办'){
        callback(new Error('日期小于今日，日志类型应该为已办'));
      }else if(this.modalFormData.taskDate>new Date() && value!='待办'){
        callback(new Error('日期大于今日，日志类型应该为待办'));
      }

      callback();
    };
    return {
        transCode:"",
        logHours: "",
        logCosts: "",
        logData: [],
        showTaskModal: false,
        modalVisible:false,
        hiddenForm: true,
        logTypeList:[],
        loading:false,
        userList:[],
        modalFormData: {
            //变更日志表单数据
            logTitle: "",
            taskDate:FormatDate(new Date(),"yyyy-MM-dd"),
            logDeclarationHours: 1,
            users:[],
            comments: "",
            logType:"",
            logStatus:"已办"
        },
        ruleValidate: {
            //变更日志表单校验
            logTitle: [
              {required: true,message: "不允许为空" },
              { type: 'string', max: 100, message: '标题不能超过100个字符'}
            ],
            users: [
              {required: true,message: "不允许为空" , type: 'array'}
            ],
            logType: [
              {required: true,message: "不允许为空" }
            ],
            logStatus: [
              {required: true,message: "不允许为空" },
              {validator:validateTaskStatus}
            ],
            logDeclarationHours: [
              {required: true, message: "必填项且在0.1到24之间",type: "number",min:0.1,max:24}
            ],
            taskDate: [
              {required: true,message: "不允许为空" }
            ]
        },
        currentPage: 1,
        pageTotal:0,
        pageSize:10
        };
  },
  watch: {
    $route(to, from) {
        this.transCode = to.params.transCode;
        this.getTaskLog();
    }
  },

  methods: {
    onSelectChange() {
      this.$refs['selectUser'].hideMenu();
    },
    openForm() {
      this.hiddenForm = true;
      if(window.top.setTaskLogIframeHeight){
        setTimeout(function(){
          window.top.setTaskLogIframeHeight();
        },500)
      }
    },
    closeForm() {
      this.hiddenForm = false;
      if(window.top.setTaskLogIframeHeight){
        setTimeout(function(){
          window.top.setTaskLogIframeHeight();
        },500)
      }
    },
    errorimg(item,index) {
      this.logData[index].photo = 'resources/images/icon/defaultUserPhoto.png';
    },
    /**
     * 提交变更日志
     */
    submitLog(event) {
        this.showTaskModal = true;
        //校验提交的数据是否为空
        let valid;
        this.$refs["logForm"].validate(v => {
            valid = v;
        });
        if(!valid) {
          this.showTaskModal = false;
          return;
        }

        if(FormatDate(this.modalFormData.taskDate,"yyyy-MM-dd") < FormatDate(new Date(),"yyyy-MM-dd")){
          window.top.Ext.toast('提交日期小于今日，请重新选择日期！');
          this.showTaskModal = false;
          return;
        }

        let currentUser = this.$currentUser;
        this.modalFormData.comments.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' ')
        let formdata = {
            listId: '2750a13d-295d-4776-9673-290c51bfc568',
            wfParam:null,
            userIds:[...this.modalFormData.users],
            formData:{
                baseinfo:{
                    handlerName: currentUser.nickname,
                    handlerUnitName: currentUser.depts&&currentUser.depts[0] ? currentUser.depts[0].name:'',
                    handlerRoleName: currentUser.isSysRoleList[0].name,
                    handler: currentUser.userId,
                    handlerUnit:  currentUser.depts&&currentUser.depts[0]?currentUser.depts[0].id:'',
                    handlerRole: currentUser.isSysRoleList[0].id,
                    creator: currentUser.userId,
                    modifer: currentUser.userId,
                    id:'',
                    handlerEntity: currentUser.entityId,
                    biProcessStatus: this.modalFormData.logStatus,
                    transType:'YW146'
                },
                jobLog:{
                    logTitle: this.modalFormData.logTitle,
                    taskDate:FormatDate(this.modalFormData.taskDate,'yyyy-MM-dd'),
                    logDeclarationHours: this.modalFormData.logDeclarationHours,
                    relTransCode:this.transCode,
                    logType:this.modalFormData.logType
                },
                comment:{
                    biComment:this.modalFormData.comments
                }
            } 
        };
          
        saveTaskLog(formdata).then(res => {
            if (res.success) {
              this.$nextTick(() => {
               this.$refs['logForm'].resetFields();
               this.modalFormData.logType = this.logTypeList[0].name;
              });
              this.getTaskLog(this.transCode);
            }else{
               if(window.top.Ext){
                  window.top.Ext.toast(res.message);
                }else{
                  this.$Notice.error({
                          title: '系统提示',
                          desc: res.message
                      });
                }
            }
         
          this.showTaskModal = false;
            
        });
        
    }, 
    /**
     * 获取任务日志
     */
    getTaskLog() {
      getTaskLog(this.taskLogUrl,this.transCode,this.currentPage,this.pageSize).then(res => {
        this.pageTotal = res.dataCount;
        this.logData = res.tableContent;
        this.logCosts = res.logCosts;
        this.logHours = res.logHours;
        this.logData.forEach(item=>{
          item.comment.replace(/<br>/g,'\r\n');
        })
      }).then(res=>{
            window.top.setTaskLogIframeHeight && window.top.setTaskLogIframeHeight();
        });
    },

    handleQueryChange(query){
      if(query===""){
        this.getAllUsers();
      }
    },

    remoteFilterSearch(query){
      this.getAllUsers(query);
    },

    getAllUsers(query){
        this.loading = true;
        const filter = query?JSON.stringify([
          {"operator":"like","value":query,"property":"nickname"},
          {"operator":"in","value":"1","property":"status"}]):
          JSON.stringify([{"operator":"in","value":"1","property":"status"}]);
        getAllUsers(200,1,filter,this.$currentUser.entityId).then(res=>{
            this.userList = res.tableContent;
            this.loading = false;
        })
    },

    changeCurrentPage(currentPage) {
     this.currentPage = currentPage;
     this.getTaskLog();
    },
    onPageSizeChange(size){
      this.pageSize = size;
      this.getTaskLog();
    },
    /**
     * 更新日志状态
     */
    handlerChangeLogStatus(log){
      
      if(new Date(log.taskDate) > new Date() && log.logStatus === '已办'){
        this.modalVisible = true;
        this.curLog = log;
      }else{
        this.handlerUpdateLogStatus(log);
      }
    },
    handlerUpdateLogStatus(log){
      let taskDate = log.taskDate;
      if(log.logStatus === '已办' && new Date(log.taskDate) >new Date()){
        taskDate = FormatDate(new Date(),"yyyy-MM-dd");
      }
      updateLogStatus(log.jobLogId,log.transCode,log.logStatus,taskDate).then(res=>{
        if(res.success) this.getTaskLog();
         window.top.Ext.toast(res.message);
      })
    },
    /**
     * 执行状态校验
     */
    handlerChangelogHours(){
      this.$refs.logForm.validateField('logStatus');
    },

    /**
     * 初始化日志类型下拉选项
     */
    initLogTypeList(){
      getDictByValue('logType').then(res=>{
        this.logTypeList = res;
        this.modalFormData.logType = res[0].name;
      })
    },
    setDefaultTitle(defaultField) {
      let formData = window.top.formData;
      this.getDefaultFormValue(JSON.parse(formData),defaultField);
    },
    getDefaultFormValue(obj,defaultField) {
      for(let k in obj){
        if(k === defaultField){
          this.modalFormData.logTitle = obj[k];
          return;
        }
        obj[k] instanceof Object && this.getDefaultFormValue(obj[k],defaultField);
      }
    },
    getDefultTitle() {
      getFeaturesConfig(window.top.listId,'d2fdcf18-76e8-11e9-9199-005056a136d0').then(con => {
          if(con.success){
            let defaultField = con.data.defaultTitle && JSON.parse(con.data.defaultTitle).fieldCode;
            this.setDefaultTitle(defaultField);
          }
      })
    }
  },
  created() {
    this.transCode = this.$route.params.transCode; 
    this.modalFormData.users.push(this.$currentUser.userId);
    this.initLogTypeList();
    this.getTaskLog();
    this.getAllUsers();
    this.getDefultTitle();
  }
};
</script>

<style lang="less" scoped>
.comment-pre{
    word-break: break-all;
    white-space: pre-wrap; /* css3.0 */
    white-space:-moz-pre-wrap; /* Firefox */
    white-space:-pre-wrap; /* Opera 4-6 */
    white-space:-o-pre-wrap; /* Opera 7 */
    word-wrap:break-word; /* Internet Explorer 5.5+ */

}
</style>

