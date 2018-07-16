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
            <Button icon="plus-round" type="info" class="app-add" size="small">新增</Button>
            <Table :columns="columns" width=753 :data="tableData"></Table>
          </Col>
      </Row>
      <Modal title="管理员自评" v-model="showAssessModal">
        <label>期间（月份）：</label>
        <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
      </Modal>
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
      showAssessModal: true,
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
    
  },
  created() {
    getAdmintrstorAssessmentData().then(res => {
      this.tableData = res.data;
    })
  },
  mounted() {}
};
</script>

