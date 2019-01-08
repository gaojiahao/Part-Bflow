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
    isAdmin: Boolean,
    appTransType: String
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
            if (params.row.accountType === 1) {
              return h("span", {}, "会计类");
            } else {
              return h("span", {}, "非会计类");
            }
          }
        },
        {
          title: "子科目",
          key: "calcRelName",
          align: "left"
        },
        {
          title: "子科目状态",
          key: "accountStatus",
          align: "left",
          render: (h, params) => {
            if (params.row.accountStatus === 0) {
              return h("span", {}, "禁用");
            } else {
              return h("span", {}, "启用");
            }
          }
        },
        {
          title: "数据归集",
          key: "dataCollection",
          align: "left",
          render: (h, params) => {
            //区分科目类型 【会计类、非会计类】
            if (params.row.accountType === 1) {
              if (params.row.checkDirection === 1) {
                return h("span", {}, "借方");
              } else{
                return h("span", {}, "贷方");
              }
            } else {
              if (params.row.checkDirection === 1) {
                return h("span", {}, "增加");
              } else{
                return h("span", {}, "减少");
              }
            }
          }
        },
        {
          title: "关系管理",
          key: "classify",
          align: "left",
          render: (h, params) => {
            return h('Checkbox', {
              props: {
                value: true
              },
              on: {
                'on-change': (status) => {
                  console.log(status);
                }
              }
            }, '启用');
          }
        },
        {
          title: "核销方式",
          key: "classify",
          align: "left",
          render: (h, params) => {
            if (params.row.classify === 1){
              return h('span',{},'');
            }else{
              return h('Checkbox', {
                props: {
                  value: true
                },
                on: {
                  'on-change': (status) => {
                    console.log(status);
                  }
                }
              }, '按单核销');
            }
          }
        },
        {
          title: "余额校验",
          key: "classify",
          align: "left",
          render: (h, params) => {
            if (params.row.classify === 1){
              return h('span',{},'');
            }else{
              return h('Checkbox', {
                props: {
                  value: true
                },
                on: {
                  'on-change': (status) => {
                    console.log(status);
                  }
                }
              }, '启用');
            }
          }
        }
      ],
      subjects: []
    };
  },
  watch: {
    
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
    let transCode;
    if(this.appTransType){
      transCode = this.appTransType;
    }else{
      transCode = localStorage.getItem('appTransType');
    }
    
    localStorage.setItem('appTransType', this.appTransType);

    getAppSubjectData(3,'YW12-3').then(res => {
      if (res.success) {
        this.subjects = res.obj;
      }
    });
  }
};
</script>

