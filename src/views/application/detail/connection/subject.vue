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
import { getAppSubjectData,updateAccountRel } from "@/services/appService.js";

export default {
  name: "appSubject",
  components: {},
  props: {
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
              return h("span", {
                style: {
                  'font-weight': 'bold',
                  color: '#adabab'
                }
              }, "禁用");
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
            //区分科目类型 【会计类1、非会计类0】
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
          key: "status",
          align: "left",
          render: (h, params) => {
            let isDisabled = false;
            if(params.row.accountStatus === 0){
              isDisabled = true;
            }
            return h('Checkbox', {
              props: {
                value: params.row.status === 1?true:false,
                disabled: isDisabled
              },
              on: {
                'on-change': (status) => {
                  this.updateAccountRelation(status,params,'relation');
                }
              }
            }, '启用');
          }
        },
        {
          title: "核销方式",
          key: "matchType",
          align: "left",
          render: (h, params) => {
            let isDisabled = false;
            if (params.row.accountStatus === 0 || params.row.accountType === 1){
              isDisabled = true;
            }
              return h('Checkbox', {
                props: {
                  value: params.row.matchType === 2?true:false,
                  disabled: isDisabled
                },
                on: {
                  'on-change': (status) => {
                    this.updateAccountRelation(status,params,'matchType');
                  }
                }
              }, '按单核销');
          }
        },
        {
          title: "余额校验",
          key: "allowedNegative",
          align: "left",
          render: (h, params) => {
            let isDisabled = false,data,renderData = [];
            if (params.row.accountStatus === 0 || params.row.accountType === 1){
              isDisabled = true;
            }
            if(params.row.accountType === 0){
              if(params.row.checkDirection === 1){
                isDisabled = true;
              }
            }
            data = [{name: '允许大于余额',value: 1},{name: '不允许大于余额',value: 0},{name: '允许一次大于余额',value: -1}];
            data.forEach(val => {
              renderData.push(
                h('Option',{
                    props: {
                      value: val.value
                    }
                  },val.name)
              )
            })
            return h('div',[
              h('Select',{
                props: {
                  value: params.row.allowedNegative,
                  disabled: isDisabled,
                  transfer: true
                },
                on: {
                  'on-change': value => {
                    this.updateAccountRelation(value,params,'allowedNegative');
                  }
                }
              },renderData)
            ]);
          }
        },
         {
          title: "主动核销",
          key: "verification",
          align: "left",
          render: (h, params) => {
            let isDisabled = false;
            if (params.row.accountStatus === 0 || params.row.accountType === 1){
              isDisabled = true;
            }
            if(params.row.accountType === 0){
              if(params.row.checkDirection === -1){
                isDisabled = true;
              }
            }
            return h('Checkbox', {
              props: {
                value: params.row.verification,
                disabled: isDisabled
              },
              on: {
                'on-change': (status) => {
                  this.updateAccountRelation(status,params,'verification');
                }
              }
            }, '启用');
          }
        }
      ],
      subjects: []
    };
  },
  watch: {
    
  },
  methods: {
    updateAccountRelation(status,params,type) {
      let data = {},transType;
      if(this.appTransType){
        transType = this.appTransType;
      }else{
        transType = localStorage.getItem('appTransType');
      }
      data.calcRelCode = params.row.calcRelCode;
      data.componentId =  params.row.componentId;
      data.transType = transType;
      data.appId = this.listId;
      data.verification = params.row.verification;
      data.status = params.row.status;
      data.allowedNegative = params.row.allowedNegative;
      data.matchType = params.row.matchType;

      switch(type) {
        case 'relation': 
          if(status){
            data.status = 1;
          }else{
            data.status = 0;
          }
          break;
        case 'matchType': 
          if(status){
            data.matchType = 2;
          }else{
            data.matchType = 1;
          }
          break;
        case 'verification':
            data.verification = status;
          break;
        case 'allowedNegative': 
            data.allowedNegative = status;
          break;
      }
      updateAccountRel(data).then(res => {
        if(res.success){
          this.$Message.success(res.message);
          this.getAllAppSubjectData();
        }else{
          this.$Message.error(res.message);
        }
      });
    },
    getAllAppSubjectData() {
      let transType;
      if(this.appTransType){
        transType = this.appTransType;
      }else{
        transType = localStorage.getItem('appTransType');
      }
      
      localStorage.setItem('appTransType', this.appTransType);

      getAppSubjectData(this.listId,transType).then(res => {
        if (res.success) {
          this.subjects = res.obj;
        }else{
          this.$Message.error(res.message);
        }
      });
    }
  },
  created() {
    this.getAllAppSubjectData();
  }
};
</script>

