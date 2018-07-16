<style lang="less" scoped>
.app-card {
  float: left;
  width: 100%;
  border-top-style: none;
  padding-bottom: 10px;
  overflow-x: hidden;
  overflow-y: hidden;

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
            <b class="app-name">科目关系：</b>
          </Col>
          <Col span="22">
            <Table :columns="columns" width=753 :data="tableData"></Table>
          </Col>
      </Row>
  </div>
</template>

<script>
import { getAppSubjectData } from "@/services/appService.js";

export default {
  name: "appSubject",
  components: {},
  data() {
    return {
      columns: [
        {
          title: "科目名称",
          key: "accountName",
          width: 300,
          align: "center"
        },
        {
          title: "科目类型",
          key: "classify",
          width: 300,
          align: "center",
          render: (h, params) => {
            if(params.row.classify === 1){
              return h('span',{},'会计类');
            }else{
              return h('span',{},'非会计类');
            }
          }
        },
        {
          title: "数据归集",
          key: "dataCollection",
          width: 150,
          align: "center",
          render: (h, params) => {
            let collectionStatus = [];
            params.row.calcRels.forEach(val => {
              collectionStatus.push(val.matchDirectionByDebit);
            });
            if(params.row.classify === 1){
              if(/1/.test(collectionStatus) && /-1/.test(collectionStatus)){
                return h('span',{},'借方，贷方');
              }else if(/1/.test(collectionStatus)){
                return h('span',{},'借方');
              }else if(/-1/.test(collectionStatus)){
                return h('span',{},'贷方');
              }
            }else{
              if(/1/.test(collectionStatus) && /-1/.test(collectionStatus)){
                return h('span',{},'增加，减少');
              }else if(/1/.test(collectionStatus)){
                return h('span',{},'增加');
              }else if(/-1/.test(collectionStatus)){
                return h('span',{},'减少');
              }
            }
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    
  },
  created() {
    getAppSubjectData().then(res => {
      this.tableData = res.data;
    })
  },
  mounted() {}
};
</script>

