<style lang="less" scoped>
  @import './subject.less';
</style>

<template>
<div class="bg_ff" style="margin-bottom:20px;">

    <Row class="app-resource-group-title">
         <h3>科目关系</h3>
    </Row>
    <Row class="subject-content">
         <Table :columns="columns" :data="subjects"  size="small"></Table>
    </Row>

  </div>
</template>

<script>
import { getAppSubjectData,openOrForbiddenSubject } from "@/services/appService.js";

export default {
  name: "appSubject",
  components: {},
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
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
              if (collectionStatus.indexOf(1)>-1 && collectionStatus.indexOf(-1)>-1) {
                return h("span", {}, "借方，贷方");
              } else if (collectionStatus.indexOf(1)>-1) {
                return h("span", {}, "借方");
              } else if (collectionStatus.indexOf(-1)>-1) {
                return h("span", {}, "贷方");
              }
            } else {
              if (collectionStatus.indexOf(1)>-1 && collectionStatus.indexOf(-1)>-1) {
                return h("span", {}, "增加，减少");
              } else if (collectionStatus.indexOf(1)>-1) {
                return h("span", {}, "增加");
              } else if (collectionStatus.indexOf(-1)>-1) {
                return h("span", {}, "减少");
              }
            }
          }
        },
      ],
      subjects: []
    };
  },
  watch: {
    // isAdmin: function(value) {
    //   const lastColumn = {
    //       title: "操作",
    //       key: "key",
    //       align: "center",
    //       render: (h,params) => {
    //         let isDisabled = false,isChecked = false;
    //         if(params.row.classify === 1){
    //           isDisabled = true;
    //         }
    //         if(params.row.calcRels[0].status === 1){
    //           isChecked = true;
    //         }
    //         return h('Checkbox',{
    //           props: {
    //             disabled: isDisabled,
    //             value: isChecked
    //           },
    //           on: {
    //             'on-change': (status) => {
    //               this.renderMethod(status,params);
    //             }
    //           }
    //         })
    //       }
    //   };
    //   if(value){
    //     if(this.columns[this.columns.length-1].title !== '操作'){
    //       this.columns.push(lastColumn);
    //     }
    //   }else{
    //     if(this.columns[this.columns.length-1].title === '操作'){
    //       this.columns.splice(this.columns.length-1,1);
    //     }
    //   }
    // }
  },
  methods: {
    //重新渲染科目启用禁用columns
    rerenderSubjectColumns() {
      this.columns[this.columns.length-1].render = (h,params) => {
          let isDisabled = false,isChecked = false;
          if(params.row.classify === 1){
            isDisabled = true;
          }
          if(params.row.calcRels[0].status === 1){
            isChecked = true;
          }
          return h('Checkbox',{
            props: {
              disabled: isDisabled,
              value: isChecked
            },
            on: {
              'on-change': (status) => {
                this.renderMethod(status,params);
              }
            }
          })
        }
    },
    //启用禁用方法
    renderMethod(status,params) {
      let msgContent = '';
      if(status){
        msgContent = '确认启用该科目？'
      }else{
        msgContent = '确认禁用该科目？'
      }
      this.$Modal.confirm({
        title: '确认',
        content: msgContent,
        onOk: () => {
          params.row.calcRels.forEach(val => {
            openOrForbiddenSubject(val.componentId).then(res => {
              if(res.status === 200){
                this.$Message.success('更新成功！');
              }
            })
          });
        },
        onCancel: () => {
          this.rerenderSubjectColumns(); 
        }
      });
    }
  },
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

