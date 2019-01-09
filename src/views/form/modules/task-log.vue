<style lang="less" scoped>
@import "./task-log.less";
</style>

<template>
  <div  class="timeline-box">
    <div class="app-resource-group-title">
        <h3>任务日志</h3>
      </div>
    <div class="timeline-box-form">
      <Form ref="formValidate" :label-width="120" :model="modalFormData" :rules="ruleValidate">
        <FormItem label="标题:" prop="logTitle" width="300">
            <Input v-model="modalFormData.logTitle" placeholder="请输入任务日志标题" />
        </FormItem> 
        <FormItem label="任务日期：">
            <DatePicker type="date" format="yyyy-MM-dd" v-model="modalFormData.taskDate"></DatePicker>
        </FormItem>
        <FormItem label="申报工时:" prop="logDeclarationHours">
          <InputNumber v-model="modalFormData.logDeclarationHours"  :min="0.1" :step="0.1"/>
          <span style="margin-left:10px;">单位/时</span>
        </FormItem>
        <FormItem label="日志描述:" prop="comments">
             <Input v-model="modalFormData.comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
        </FormItem>
        
        <FormItem>
          <input type="button" class="timeline-box-form-submit" @click="submitLog" value="提交" />
        </FormItem>
      </Form>
    </div>

    <div  class="timeline-box-log" v-show="logData.length===0?false:true">
      <ul class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <img :src="item.photo?item.photo:'resources/images/icon/user.png'" class="head-portrait"/>
        <ul class="timeline-item-content-ul">
         
          <li>
            <span>{{item.handlerName}}</span>
            <span>{{item.taskDate}}</span>
            <span>{{`${item.logDeclarationHours} 小时`}}</span>
          </li>
           <li>
            <span style="font-weight:600">{{item.logTitle}}</span>
          </li>
          <li>
            <span v-html="item.comment"></span>
          </li>
        </ul>
      </ul>
      <div class="loading-more">
        <Page 
            :total="pageTotal" 
            :current="currentPage"
            :page-size="pageSize" 
            @on-change="changeCurrentPage"
            prev-text="上一页" 
            next-text="下一页"
            size="small"  
            ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaskLog, saveTaskLog } from "@/services/appService.js";
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
    return {
        transCode:"",
        logData: [],
        modalFormData: {
            //变更日志表单数据
            logTitle: "",
            taskDate:FormatDate(new Date(),"yyyy-MM-dd"),
            logDeclarationHours: 1,
            comments: ""
        },
        ruleValidate: {
            //变更日志表单校验
            logTitle: [  
            {
                required: true,
                message: "不允许为空" 
            }
            ],
            logDeclarationHours: [ 
            {
                required: true, 
                message: "不允许为空",
                type: "number"
            }
            ],
        },

        currentPage: 1,
        pageTotal:0,
        pageSize:6
        };
  },


  methods: {
    /**
     * 提交变更日志
     */
    submitLog(event) {
        //校验提交的数据是否为空
        let valid;
        this.$refs["formValidate"].validate(v => {
            valid = v;
        });
        if(!valid) {return;}
       
        let currentUser = this.$currentUser;
        let formdata = {
            listId: 'ee4ff0a1-c612-419d-afd7-471913d57a2a',
            wfParam:null,
            formData:{
                baseinfo:{
                    handlerName: currentUser.nickname,
                    handlerUnitName: currentUser.depts?currentUser.depts[0].name:'',
                    handlerRoleName: currentUser.isSysRoleList[0].name,
                    handler: currentUser.userId,
                    handlerUnit:  currentUser.depts?currentUser.depts[0].id:'',
                    handlerRole: currentUser.isSysRoleList[0].id,
                    creator: currentUser.userId,
                    modifer: currentUser.userId,
                    id:'',
                    handlerEntity: currentUser.entityId,
                    biProcessStatus: null,
                },
                jobLog:{
                    logTitle: this.modalFormData.logTitle,
                    taskDate:FormatDate(this.modalFormData.taskDate,'yyyy-MM-dd'),
                    logDeclarationHours: this.modalFormData.logDeclarationHours,
                    projectTaskName:'测试',
                    projectTaskCode:this.transCode,
                },
                comment:{
                    biComment:this.modalFormData.comments
                }
            } 
        };
        saveTaskLog(formdata).then(res => {
            if (res.success) {
                this.$Message.success(res.message);
                this.$refs["formValidate"].resetFields();
                this.getTaskLog(this.transCode);
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
      }).then(res=>{
            window.top.setTaskLogIframeHeight();
        });;
    },

    changeCurrentPage(currentPage) {
     this.currentPage = currentPage;
     this.getTaskLog();
    },
   
  },
  created() {
    this.transCode = this.$route.params.transCode; 
    this.getTaskLog();
  }
};
</script>

