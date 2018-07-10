<style lang="less" scoped>
.app-card {
  width: 100%;
  padding-bottom: 10px;
  overflow-x: hidden;
  border-top-style: none;
  .app-name {
    font-size: 1rem;
  }

  > h2 {
    height: 40px;
    line-height: 40px;
    margin-left: 15px;
  }
  .app-body {
    &-card {
      float: left;
      width: 200px;
      height: 150px;
      ul {
        list-style: none;
        li {
          margin-top: 5px;
        }
        li:first-child {
          margin-top: 0px;
        }
        .app-setting-dot {
          color: #39f;
        }
      }
    }
  }
}
</style>

<template>
  <div class="app-card">
    <h2 class="app-name">
      应用视图
    </h2>
    <a href="#" slot="extra"></a>
    <Table :columns="columns" :data="tableData"></Table>
  </div>
</template>

<script>
import { getAppviews } from "@/services/appService.js";

export default {
  name: 'appView',
  components:{},
  props: {
    listId: String
  },
  data () {
      return {
         columns: [
          {
            title: "视图名称",
            key: "title",
            render: (h, params) => {
              return h('a', {},params.row.title)
            }
          },
          {
            title: "创建时间",
            key: "crtTime"
          },
          {
            title: "创建者",
            key: "creator"
          },
          {
            title: "默认视图",
            key: "isDefault",
            width: 100,
            align: "center",
            render: (h, params) => {
              let defaultView = false;
              if(params.row.isDefault === 1){
                defaultView = true;
              }
              return h("Radio", {
                props: {
                  value: defaultView
                },
                on: {
                  'on-change': (e) => {
                    debugger
                  }
                }
              });
            }
          },
          {
            title: "操作",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("Button", {
                props: {
                  type: "error",
                  size: "small"
                }
              },
              "删除"
            );
          }
        ],
        tableData: []
      }
  },
  methods: {
     
  },
  mounted() {
      let params = {
        filter: JSON.stringify([{operator: "eq",value: this.listId,property: "uniqueId"},{operator:"eq",value:1,property:"listViewStatus"}])
      };
      getAppviews(params).then(res => {
        this.tableData = res.tableContent;
      })
  }
}
</script>

