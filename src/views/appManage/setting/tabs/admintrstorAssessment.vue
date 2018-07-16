<style lang="less" scoped>
.app-card {
  float: left;
  width: 100%;
  border-top-style: none;
  padding-bottom: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  .app-add{
    margin-bottom: 5px;
  }
  > h2 {
    height: 40px;
    line-height: 40px;
    margin-left: 15px;
  }

  .app-name {
    font-size: 0.9rem;
  }
}
</style>

<template>
  <div class="app-card">
       <Row style="margin: 10px 15px ">
          <Col span="2">
            <b class="app-name">管理员自评：</b>
          </Col>
          <Col span="22">
            <Button icon="plus-round" type="info" class="app-add" size="small" @click="addAssess">新增</Button>
            <Table :columns="columns" width=753 :data="tableData"></Table>
          </Col>
      </Row>
      <assess-modal title="管理员自评" v-model="showAssessModal" width="650">
        <div style="margin:20px auto;width:85%;">
                <Form ref="formValidate" :label-width="150" :model="adminAssessData" :rules="ruleValidate">
                    <FormItem label="期间（月份）:" prop="duringDate">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="adminAssessData.duringDate"></DatePicker>
                    </FormItem>
                    <FormItem label="效率与成本改进成果:" prop="result">
                        <Input type="textarea" v-model="adminAssessData.result"></Input>
                    </FormItem>
                    <FormItem label="效率与成本改进机会:" prop="opportunity">
                        <Input type="textarea" v-model="adminAssessData.opportunity"></Input>
                    </FormItem>
                </Form>
            </div>
      </assess-modal>
  </div>
</template>

<script>
import { getAdmintrstorAssessmentData } from "@/services/appService.js";
import AssessModal from '@/components/modal/Modal';

export default {
  name: "admintrstorAssessment",
  components: {
    AssessModal
  },
  data() {
    return {
      showAssessModal: false,
      changeResult: '',
      adminAssessData: {
        duringDate: '',
        result: '',
        opportunity: ''
      },
      ruleValidate: {
        duringDate: [
          {
            type: "string",
            required: true,
            message: "不允许为空"
          }
        ],
        result: [
          {
            required: true,
            message: "不允许为空",
            type: "string"
          }
        ],
        opportunity: [
          {
            required: true,
            message: "不允许为空",
            type: "string"
          }
        ]
      },
      columns: [
        {
          title: "期间（月份）",
          key: "during",
          width: 150,
          align: "center"
        },
        {
          title: "效率与成本改进成果",
          key: "changeResult",
          width: 300,
          align: "center"
        },
        {
          title: "效率与成本改进机会",
          key: "changeOpportunity",
          width: 300,
          align: "center"
        }
      ],
      tableData: []
    };
  },
  methods: {
    //添加管理员自评
    addAssess() {
      this.showAssessModal = true;
    }
  },
  created() {
    getAdmintrstorAssessmentData().then(res => {
      this.tableData = res.data;
    })
  },
  mounted() {}
};
</script>

