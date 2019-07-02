<style lang="less" scoped>
@import "./task-log.less";
</style>

<template>
  <div  class="timeline-box">

    <div class="app-resource-group-title">
        <span class="font16">工作日志  </span>
    </div>

    <div class="timeline-box-form">
      <Form ref="logForm" :label-width="80"   :model="modalFormData"  :rules="ruleValidate">
         <Row>
            <Col :xs="24" :sm="12" :md="8" :lg="8">
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
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label='员工'  prop="users"> 
                <Select
                  v-model="modalFormData.users"
                  multiple
                  filterable
                  remote
                  placeholder="请选择或搜索员工"
                  :remote-method="remoteFilterSearch"
                  @on-query-change="handleQueryChange"
                  :loading="loading">
                  <Option v-for="(option) in userList" :value="option.userId" :key="option.userId">{{option.nickname}}</Option>
                </Select>
              </FormItem>
            </Col>
         </Row>

          <Row>
           <Col span="24">
            <FormItem label="标题:" prop="logTitle" >
              <Input v-model="modalFormData.logTitle" placeholder="请输入工作日志标题" />
            </FormItem> 
            </Col>
         </Row>

         <Row>
          <Col :xs="24" :sm="12" :md="8" :lg="8">
               <FormItem label="类型:" prop="logType">
                  <Select v-model="modalFormData.logType" >
                    <Option v-for="item in logTypeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
              </FormItem> 
            </Col>
           
           <Col :xs="24" :sm="12" :md="8" :lg="8">
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

            <Col :xs="24" :sm="12" :md="8" :lg="8">
               <FormItem label="申报工时:" prop="logDeclarationHours">
                <InputNumber 
                  v-model="modalFormData.logDeclarationHours"
                  :max='24' 
                  :min="0.1" 
                  :step="0.1"/>单位/时
              </FormItem>
            </Col>

           
         </Row>


        <FormItem label="备注:" prop="comments">
          <Input  v-model="modalFormData.comments" type="textarea" placeholder="输入您特别想备注的信息" />
        </FormItem>

        <FormItem>
          <input type="button" class="timeline-box-form-submit" @click="submitLog" value="提交" />
        </FormItem>
      </Form>
    </div>

    <div  class="timeline-box-log" v-show="logData.length===0?false:true">
      <div class="timeline-box-log-sum">
        <span>总工时：<b>{{ logHours }}</b></span>
        <span :style="{marginLeft:'15px'}">总成本：<b>{{ logCosts }}</b></span>
      </div>
      <ul class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <img :src="item.photo?item.photo:'resources/images/icon/defaultUserPhoto.png'" class="head-portrait"/>
        <ul class="timeline-item-content-ul">
          <li>
           
            <Checkbox 
              v-model="item.logStatus" 
              size='large' 
              @on-change='handlerChangeLogStatus(item)'
              true-value='已办' 
              false-value='待办'>
            </Checkbox>

            <strong>{{item.logTitle}}</strong>
          </li>
          <li>
            <span>{{item.handlerName}}</span>
            <span>{{item.taskDate}}</span>
            <span v-html="`${item.logDeclarationHours} 小时`"></span>

            <span >{{item.logType}}</span>

          </li>
          <li>
            <pre>{{item.comment}}</pre>
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
            show-elevator
            show-sizer
            size="small"  
            ></Page>
      </div>
    </div>
    <Modal
        v-model="modalVisible"
        title="系统提示"
        @on-ok="handlerUpdateLogStatus(curLog)"
        @on-cancel="getTaskLog();modalVisible=false">
        <p>如果更新为已办，日志的日期将自动更新为今天!</p>
    </Modal>
  </div>
</template>

<script>
import { getTaskLog, saveTaskLog,updateLogStatus} from "@/services/appService.js";
import { getDictByValue} from "@/services/commonService.js";
import { getAllUsers } from "@/services/subscribeService";
import { FormatDate } from "@/utils/utils";

export default {
  name: "TaskLog",
  components: {},
  props: {
    listId: {
      type: String
    },
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
        modalVisible:false,
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
              { type: 'string', max: 20, message: '标题不能超过20个字符'}
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
              {required: true, message: "必填项且在0.1到24之间",type: "number"}
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


  methods: {
    /**
     * 提交变更日志
     */
    submitLog(event) {
        //校验提交的数据是否为空
        let valid;
        this.$refs["logForm"].validate(v => {
            valid = v;
        });
        if(!valid) {return;}
       
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
                window.top.Ext.toast(res.message);
              this.modalFormData.users = [];
              this.$nextTick(() => {
               this.$refs['logForm'].resetFields();
              });
                this.getTaskLog(this.transCode);
            }else{
                window.top.Ext.toast(res.message)
            }
        });
        
    }, 
    /**
     * 获取任务日志
     */
    getTaskLog() {
      getTaskLog(this.transCode,this.currentPage,this.pageSize).then(res => {
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
        const filter = query?JSON.stringify([{"operator":"like","value":query,"property":"nickname"}]):'';
        getAllUsers(200,1,filter).then(res=>{
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
        if(res.success){
          
        }
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
      })
    }
  },
  created() {
    this.transCode = this.$route.params.transCode; 
    this.initLogTypeList();
    this.getTaskLog();
    this.getAllUsers();
  }
};
</script>

