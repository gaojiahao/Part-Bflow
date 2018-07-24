<style lang="less" scoped>
  @import './related-app.less';
</style>

<template>
<div class="bg_ff martop20">

    <Row class="app-resource-group-title">
      <h3>相关应用</h3>
    </Row>
    <Row class="related-app-content">
      <Table :columns="columns" :data="relatedApps" size="small"></Table>
    </Row>

  </div>
</template>

<script>
import { getRelatedApp } from "@/services/appService.js";

export default {
  name: "relatedApp",
  components: {},
  props: {
    listId: {
      type: String
    }
  },
  data() {
    return {
      columns: [
        {
          title: "应用名称",
          key: "relationAppName",
          align: "left"
        },
        {
          title: "应用类型",
          key: "relationAppType",
          align: "left",
          render: (h, params) => {
            if (params.row.classify === 1) {
              return h("span", {}, "会计类");
            } else {
              return h("span", {}, "非会计类");
            }
          }
        },
        {
          title: "关系类型",
          key: "relationType",
          align: "left",
        },
        {
          title: "关联应用字段",
          key: "relationAppField",
          align: "left",
        },{
          title: "本应用字段",
          key: "appField",
          align: "left",
        }
      ],
      relatedApps: []
    };
  },
  methods: {},
  created() {
    getRelatedApp('a4897429-f4f2-44a4-ade7-2fe8dc67c3cf').then(res => {
        this.relatedApps = res.tableContent;
        //todo
        //提示用户，请求失败
    });
  }
};
</script>

