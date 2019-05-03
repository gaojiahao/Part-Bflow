<style lang="less" scoped>
@import "./task-log.less";
</style>

<template>
  <div  class="timeline-box">

    <Drawer  placement="right" :closable="false" width="400" v-model="helpPanelVisible">
        <h3>工作+进展</h3>
        <br>
        今天研发任务已经完成了60%，比计划提前三天
        <Divider />

        <h3>工作+结果 </h3>
        <br>
        今天和客户谈了一个合同，成功拿到了500万订单
        <Divider />

        <h3>工作+策略 </h3>
        <br>
        通过与供应商争取到订单式生产的有利合同条款，解决了库存多的问题
        <Divider />

        <h3>问题+解决方案</h3>
        <br>
        A客户不同意我们的合同条款，想邀请后天老板一起拜访
         <Divider />

        <h3>计划+目标</h3>
        <br>
        明天，与质量部门开会，确认出厂产品的质量检验流程
    </Drawer>

    <div class="app-resource-group-title">
        <span class="font16">工作日志  </span>
        <span class="font12 info-color">不知道如何写日志？这里有模板哦!</span> 
        <Button  @click="helpPanelVisible = !helpPanelVisible"  size='small' >立即查看
          <Icon type="ios-arrow-forward" />
        </Button>
    </div>

    <div class="timeline-box-form">
      <Form ref="formValidate" :label-width="120"   :model="modalFormData"  :rules="ruleValidate">

         <Row>
            <FormItem label="标题:" prop="logTitle" >
              <Input v-model="modalFormData.logTitle" placeholder="请输入任务日志标题" />
            </FormItem> 
         </Row>

         <Row>
            <Col span="4">
               <FormItem label="类型:" prop="logType">
                  <Select v-model="modalFormData.logType" >
                    <Option v-for="item in logTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem> 
            </Col>
           
           <Col span="4">
              <FormItem label="日期:" prop="taskDate">
                <DatePicker 
                  type="date" 
                  format="yyyy-MM-dd" 
                  :clearable="false" 
                  v-model="modalFormData.taskDate">
                </DatePicker>
              </FormItem>
            </Col>
         </Row>

         <Row>
            <Col span="24">
             <FormItem label="状态"  prop="logStatus"> 
                <RadioGroup v-model="modalFormData.logStatus">
                    <Radio label="1">已办</Radio>
                    <Radio label="0">待办</Radio>
                </RadioGroup>
            </FormItem>
            </Col>
         </Row>

          <FormItem label="申报工时:" prop="logDeclarationHours">
                <InputNumber v-model="modalFormData.logDeclarationHours"  :min="0.1" :step="0.1"/>
                <span style="margin-left:10px;">单位/时</span>
              </FormItem>

        <FormItem label="备注:" prop="comments">
          <Input  v-model="modalFormData.comments" type="textarea" placeholder="输入您特别想备注的信息" />

          
        </FormItem>

        <FormItem>
          <input type="button" class="timeline-box-form-submit" @click="submitLog" value="提交" />
        </FormItem>
      </Form>
    </div>

    <div  class="timeline-box-log" v-show="logData.length===0?false:true">
      <ul class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <img :src="item.photo?item.photo:'resources/images/icon/defaultUserPhoto.png'" class="head-portrait"/>
        <ul class="timeline-item-content-ul">
          <li>
            <span>{{item.logTitle}}</span>
          </li>
          <li>
            <span>{{item.handlerName}}</span>
            <span>{{item.taskDate}}</span>
            <span v-html="`${item.logDeclarationHours} 小时`"></span>
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
    
    const  validateTaskStatus = (rule, value, callback) => {
      if(this.modalFormData.taskDate<=new Date() && value!=1){
        callback(new Error('日期小于等于今日，日志类型应该为已办'));
      }else if(this.modalFormData.taskDate>new Date() && value!=0){
        callback(new Error('日期大于今日，日志类型应该为待办'));
      }

      callback();
    };
    return {
        transCode:"",
        projectTaskId:"",
        logData: [],
        helpPanelVisible:false,
        logTypeList:[
          {
            value: 'generally',
            label: '一般事项'
          },
          {
            value: 'abnormal',
            label: '异常事项'
          },
          {
            value: 'conference',
            label: '会议'
          }
        ],
        modalFormData: {
            //变更日志表单数据
            logTitle: "",
            taskDate:FormatDate(new Date(),"yyyy-MM-dd"),
            logDeclarationHours: 1,
            comments: "",
            logType:"generally",
            logStatus:"1"
        },
        ruleValidate: {
            //变更日志表单校验
            logTitle: [
              {required: true,message: "不允许为空" },
              { type: 'string', max: 20, message: '标题不能超过20个字符'}
            ],
            logType: [
              {required: true,message: "不允许为空" }
            ],
            logStatus: [
              {required: true,message: "不允许为空" },
              {validator:validateTaskStatus}
            ],
            logDeclarationHours: [
              {required: true, message: "不允许为空",type: "number"}
            ],
            taskDate: [
              {required: true,message: "不允许为空" }
            ]
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
        this.modalFormData.comments.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' ')
        let formdata = {
            listId: '2750a13d-295d-4776-9673-290c51bfc568',
            wfParam:null,
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
                    biProcessStatus: null,
                },
                jobLog:{
                    logTitle: this.modalFormData.logTitle,
                    taskDate:FormatDate(this.modalFormData.taskDate,'yyyy-MM-dd'),
                    logDeclarationHours: this.modalFormData.logDeclarationHours,
                    relTransCode:this.transCode,
                    logType:this.modalFormData.logType,
                    logStatus:this.modalFormData.logStatus
                },
                comment:{
                    biComment:this.modalFormData.comments
                }
            } 
        };
          
        saveTaskLog(formdata).then(res => {
            if (res.success) {
                // window.top.Ext.toast(res.message);
                console.log(this);
                this.$refs['formValidate'].resetFields();
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
        this.logData.forEach(item=>{
          item.comment.replace(/<br>/g,'\r\n'); 
        })
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
    this.projectTaskId = this.$route.params.projectTaskId;
    this.getTaskLog();
  }
};
</script>

