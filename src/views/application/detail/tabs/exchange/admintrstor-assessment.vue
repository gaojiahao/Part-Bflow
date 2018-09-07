<style lang="less" scoped>
@import "./admintrstor-assessment.less";
</style>

<template>
  <div class="bg_ff">
    <div>
      <Row class="app-resource-group-title">
        <h3>管理员自评
        </h3>
      </Row>
      <Row v-show="isAdminTrue" class="assessmentForm pad15" >
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
            <FormItem label="效率与成本改进成果:" prop="result" style="margin-bottom: 65px;">
              <vue-wangeditor 
                ref="result" 
                id="editorResult" 
                :menus="menu" 
                height="143" 
                width="100%"
                 class="editor-result">
                 </vue-wangeditor>
            </FormItem>
            <FormItem label="效率与成本改进机会:" prop="opportunity" style="margin-bottom: 40px;">
              <vue-wangeditor 
                ref="oppor" id="editorOppor" 
                :menus="menu" 
                height="143" 
                width="100%">
                </vue-wangeditor>
            </FormItem>
          </Form>
          <div style="text-align:right;margin-bottom:5px;">
            <Button 
              @click="submitAdminAssess" 
              class="radius0" 
              style="background-color: rgb(0, 150, 136) !important;color:#fff;margin-top:5px">保存</Button>
          </div>
      </Row>
     
      <div v-for="(assess, index) of assessments" :key="index" class="pad10 bg_ff assessmentItem">
        <img :src="assess.photo?assess.photo:'resources/images/icon/contactor.png'" class="user-icon">
        <div class="font14 content">
          <div>
            <h4>{{ assess.creator }}
              <span class="fr">{{ formatDate(assess.date) }}</span>
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
    </div>
  </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import vueWangeditor from 'vue-wangeditor';
import EditTable from "@/components/table/edit-table";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "admintrstorAssessment",
  components: {
    AssessModal,
    EditTable,
    vueWangeditor
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
      isAdminTrue: false,
      isEdit: "",
      IsEditId: "",
      changeResult: "",
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
            message: ""
          }
        ],
        opportunity: [
          {
            required: true,
            message: ""
          }
        ]
      },
      assessments: [],
      menu: [
        'source',	// 源码模式
        '|',
        'bold',	// 粗体
        'underline',	// 下划线
        'italic',	// 斜体
        'strikethrough',	// 中线
        'eraser',	// 清空格式
        'forecolor',	// 文字颜色
        'bgcolor',	// 背景颜色
        '|',
        'quote',	// 引用
        'fontfamily',	// 字体
        'fontsize',	// 字号
        'head',	// 标题
        'unorderlist',	// 无序列表
        'orderlist',	// 有序列表
        'alignleft',	// 左对齐
        'aligncenter',	// 居中
        'alignright',	// 右对齐
        '|',
        'emotion',	// 表情
        '|',
        'undo',	// 撤销
        'redo'	// 重做
      ]
    };
  },
  watch: {
    isAdmin: function(value) {
      value && (this.isAdminTrue = true);
    }
  },
  methods: {
    //展示管理员自评
    addAssess() {
      this.showAssessModal = true;
      this.$refs["formValidate"].resetFields();
    },
    //添加管理员自评
    submitAdminAssess() {
      if(this.$refs.result.getText() === ''){
        this.$Message.error('必填项请输入！');
      }else if(this.$refs.oppor.getText() === ''){
        this.$Message.error('必填项请输入！');
      }else{
        this.adminAssessData.opportunity = document.getElementById('editorOppor').innerHTML;
        this.adminAssessData.result = document.getElementById('editorResult').innerHTML;
      }
      let params = {
        listId: this.listId,
        opportunity: this.adminAssessData.opportunity,
        result: this.adminAssessData.result,
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
            document.getElementById('editorOppor').innerHTML = '';
            document.getElementById('editorResult').innerHTML = '';
            this.isEdit = "";
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    //获取管理员自评数据
    getAssessmentData() {
      getAssessmentByListId(this.listId).then(res => {
        this.assessments = res.tableContent;
      });
    },
    //格式化日期方法
    formatDate(currentDate) {
      let date = new Date(currentDate),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        relDate;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      relDate = year + "-" + month;

      return relDate;
    }
  },
  created() {
    this.getAssessmentData();
  }
};
</script>

