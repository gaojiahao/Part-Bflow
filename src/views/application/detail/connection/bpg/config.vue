<template>
    <div>
        <div class="" style="padding:20px">
            <div style="font-size:16px">
                <a @click="addJobs">添加职位</a>
                <a @click="addProcess">添加流程</a>
            </div>
            <div>
                <Table :columns="columns" :data="columnDatas" size="small" border></Table>
            </div>
        </div>

    </div>
</template>

<script>
import TaskModal from "@/components/pulsegraph/TaskModal";
export default {
  components: {},

  data() {
    return {
      columns: [
        {
          title: "需求",
          key: "name",
          align:'center',
          render: function(h, params) {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {}
                  },
                },
                "添加"
              )
            ]);
          }
        },
        {
          title: "设计",
          key: "age"
        },
        {
          title: "打样",
          key: "address"
        },
        {
          title: "客户确认",
          key: "date"
        },
        {
          title: "发布",
          key: "publish"
        },
        {
          title: "反馈",
          key: "advice"
        }
      ],
      columnDatas: [{}, {}]
    };
  },

  methods: {
    addJobs() {
      this.columnDatas.push({});
    },

    addProcess() {
      this.columns.push({
        title: "test",
        key: "test"
      });
    }
  }
};
</script>

<style>
</style>
