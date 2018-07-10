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
export default {
  name: "appView",
  components: {},
  data() {
    return {
      columns: [
        {
          title: "视图名称",
          key: "name",
          render: (h, params) => {
            return h("a", {}, params.row.name);
          }
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "创建者",
          key: "creator"
        },
        {
          title: "默认视图",
          key: "defaultView",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("Radio", {
              props: {
                value: true
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
            return h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                }
              },
              "删除"
            );
          }
        }
      ],
      tableData: [
        { name: "收款明细", createTime: "2018-6-21", creator: "maliya" },
        { name: "收款主表", createTime: "2018-6-21", creator: "maliya" }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

