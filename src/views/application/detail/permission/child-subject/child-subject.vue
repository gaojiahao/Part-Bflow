<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>管理子科目</h3>
                <span class="warning-color marlr">（非会计类）管理子科目</span>
            </Row>
            <div class="app-action-source">
                <Row>
                    <Table :columns="columns" :data="subjectData" size="small"></Table>
                </Row>
            </div>
        </Row>
    </div>
</template>

<script>
import {} from "@/services/appService.js";

export default {
  name: "ChildSubject",
  components: {},
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      subjectData: [{childName:'待下单的加工',status: true},{childName:'待下单的销售合同',status: false}],
      columns: [
          {
          title: "子科目名称",
          key: "childName"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h('Checkbox', {
              props: {
                value: params.row.status
              },
              on: {
                'on-change': (status) => {
                  console.log(status);
                }
              }
            }, '启用');
          }
        }
      ]
    };
  },
  methods: {
    getChildSubjectData() {}
  },
  mounted() {
    this.getChildSubjectData();
  }
};
</script>

