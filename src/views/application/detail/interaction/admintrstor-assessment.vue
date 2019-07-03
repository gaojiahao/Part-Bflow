<style lang="less" scoped>
@import "./admintrstor-assessment.less";
</style>

<template>
  <div class="bg_ff" style="margin-bottom: 10px;">
    <div>
      <Row class="app-resource-group-title">
        <h3>管理员自评
        </h3>
      </Row>
      <Row v-if="isAdmin" class="assessmentForm pad15" >
          <Form 
            ref="formValidate" 
            :label-width="150" 
            :model="adminAssessData" 
            :rules="ruleValidate">
            <FormItem label="期间（月份）:" prop="duringDate">
              <DatePicker 
                format="yyyy-MM" 
                type="month" 
                placeholder="选择日期" 
                style="width: 200px" 
                v-model="adminAssessData.duringDate">
              </DatePicker>
            </FormItem>
            <FormItem label="效率与成本改进成果:" prop="result">
                 <div contenteditable="true" ref="resulteditor" class="result-content"></div>
            </FormItem>
            <FormItem label="效率与成本改进机会:" prop="opportunity">
                <div contenteditable="true" ref="opporeditor" class="result-content"></div>
            </FormItem>
          </Form>
          <div style="text-align:right;margin-bottom:5px;">
            <Button 
              @click="submitAdminAssess" 
              class="radius0" 
              style="background-color: rgb(0, 150, 136) !important;color:#fff;margin-top:5px">提交</Button>
          </div>
      </Row>
     
      <div v-for="(assess, index) of assessments" :key="index" class="pad10 bg_ff assessmentItem">
        <img :src="assess.photo?assess.photo:'resources/images/icon/contactor.png'" class="user-icon">
        <div class="font14 content">
          <div>
            <h4>{{ assess.creator }}
              <span class="fr">{{ formatDate(assess.date,true) }}</span>
            </h4>
          </div>
          <div class="assessment-info">
            <div>
              <span style="color: #a06970">改进成果:</span>
              <div class="assessment-info-text" v-html="assess.achievement"></div>
            </div>
            <div>
              <span style="color: #a06970">改进机会:</span>
              <div class="assessment-info-text" v-html="assess.chance"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="assessments.length===0" class="pad10 bg_ff assessmentItem">暂无数据</div>
      <div v-if="isPage" class="pad20 bg_ff assessmentItem">
        <Page 
          @on-change="onPageChange" 
          :total="page.total" 
          :current="page.current" 
          :page-size="page.pageSize" 
          prev-text="上一页" 
          next-text="下一页" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import E from 'wangeditor';
import AssessModal from "@/components/modal/Modal";

export default {
  name: "admintrstorAssessment",
  components: {
    AssessModal
  },
  props: {
    isAdmin: {
      type: Boolean
    }
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showAssessModal: false,
      isPage: true,
      isEdit: "",
      IsEditId: "",
      changeResult: "",
      page: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      adminAssessData: {
        duringDate: "",
        result: "",
        opportunity: ""
      },
      ruleValidate: {
        duringDate: [
          {
            type: "date",
            required: true,
            message: "不允许为空"
          }
        ],
        result: [
          {
            required: true,
            message: " "
          }
        ],
        opportunity: [
          {
            required: true,
            message: " "
          }
        ]
      },
      assessments: []
    };
  },
  methods: {
    //展示管理员自评
    addAssess() {
      this.showAssessModal = true;
      this.$refs["formValidate"].resetFields();
    },
    //添加管理员自评
    submitAdminAssess() {
      if(this.$refs['opporeditor'].innerHTML === ''){
        this.$Message.error('必填项请输入！');
      }else if(this.$refs['resulteditor'].innerHTML === ''){
        this.$Message.error('必填项请输入！');
      }else{
        this.adminAssessData.opportunity = this.$refs['opporeditor'].innerHTML;
        this.adminAssessData.result = this.$refs['resulteditor'].innerHTML;
      }
      let params = {
        listId: this.listId,
        chance: this.adminAssessData.opportunity,
        achievement: this.adminAssessData.result,
        date: this.formatDate(this.adminAssessData.duringDate)
      };
      if (this.isEdit === "edit") {
        params.id = this.IsEditId;
      }
      let v = false;
      this.$refs["formValidate"].validate(valid => {
        v = valid;
      });
      if (v) {
        saveAssessment(params).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.getAssessmentData();
            this.showAssessModal = false;
            this.$refs["formValidate"].resetFields();
            this.$refs['resulteditor'].innerHTML = '';
            this.$refs['opporeditor'].innerHTML = '';
            this.isEdit = "";
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    //获取管理员自评数据
    getAssessmentData(currentPage) {
      getAssessmentByListId(this.listId,this.page.pageSize,currentPage).then(res => {
        this.assessments = res.tableContent;
        this.page.total = res.dataCount;
        if(res.tableContent.length === 0){
          this.isPage = false;
        }else{
          this.isPage = true;
        }
      });
    },
    //切换页码
    onPageChange(currentPage) {
      this.getAssessmentData(currentPage);
    },
    //格式化日期方法
    formatDate(currentDate,status) {
      let date = new Date(currentDate),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        relDate;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if(status){
        relDate = year + "-" + month;
      }else{
        relDate = year + "-" + month + "-1";
      }
      return relDate;
    }
  },
  created() {
    this.getAssessmentData(this.page.current);
  }
};
</script>

