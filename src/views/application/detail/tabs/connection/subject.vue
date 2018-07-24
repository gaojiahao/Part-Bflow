<style lang="less" scoped>
  @import './subject.less';
</style>

<template>
<div class="bg_ff">

    <Row class="app-resource-group-title">
         <h3>科目关系</h3>
    </Row>
    <Row class="subject-content">
         <Table :columns="columns" :data="subjects"  size="small"></Table>
    </Row>

  </div>
</template>

<script>
import { getAppSubjectData } from "@/services/appService.js";

export default {
  name: "appSubject",
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
          title: "科目名称",
          key: "accountName",
          align: "left"
        },
        {
          title: "科目类型",
          key: "classify",
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
          title: "数据归集",
          key: "dataCollection",
          align: "left",
          render: (h, params) => {
            let collectionStatus = [],
              subject = params.row;

            //获取到应用相对于科目的数据归集方向
            subject.calcRels.forEach(val => {
              collectionStatus.push(val.matchDirectionByDebit);
            });

            //区分科目类型 【会计类、非会计类】
            if (subject.classify === 1) {
              if (/1/.test(collectionStatus) && /-1/.test(collectionStatus)) {
                return h("span", {}, "借方，贷方");
              } else if (/1/.test(collectionStatus)) {
                return h("span", {}, "借方");
              } else if (/-1/.test(collectionStatus)) {
                return h("span", {}, "贷方");
              }
            } else {
              if (/1/.test(collectionStatus) && /-1/.test(collectionStatus)) {
                return h("span", {}, "增加，减少");
              } else if (/1/.test(collectionStatus)) {
                return h("span", {}, "增加");
              } else if (/-1/.test(collectionStatus)) {
                return h("span", {}, "减少");
              }
            }
          }
        }
      ],
      subjects: []
    };
  },
  methods: {},
  created() {
    getAppSubjectData(this.listId).then(res => {
      if (res.status === 200) {
        this.subjects = res.data;
      } else {
        //todo
        //提示用户，请求失败
      }
    });
  }
};
</script>

