<style lang="less" scoped>
  @import './subject.less';
</style>

<template>
<div class="bg_ff" style="margin-bottom:20px;">

    <Row class="app-resource-group-title">
         <h3>业务关系</h3>
    </Row>
    <Row class="subject-content">
         <Table :columns="columns" :loading="loading" :data="businessRelateds" height="400" size="small"></Table>
    </Row>

  </div>
</template>

<script>
import { getRelatedBusinessData,updateAccountRel } from "@/services/appService.js";

export default {
  name: "BusinessRelated",
  components: {},
  props: {
    appTransType: String
  },
  data() {
    return {
      listId: this.$route.params.listId,
      loading: true,
      columns: [
        {
          title: "应用名称",
          key: "appName",
          align: "left",
          render: (h, params) => {
              return h('span',{
                  style: {
                      color: '#39f',
                      cursor: 'pointer'
                  },
                  on: {
                      click: () => { 
                          window.top.location.href = `/Site/index.html#list/${params.row.appId}`;
                      }
                  }
              },params.row.appName)
          }
        },
        {
          title: "应用类型",
          key: "transName",
          align: "left"
        },
        {
          title: "子科目",
          key: "calcRelName",
          align: "left"
        },
        {
          title: "数据归集",
          key: "classify",
          align: "left",
          render: (h, params) => {
            //区分科目类型 【会计类true、非会计类false】
            if (params.row.accountType) {
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
            if(!params.row.accountStatus){
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
            if (!params.row.accountStatus || params.row.accountType){
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
        }
      ],
      businessRelateds: []
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
      data.status = params.row.status;
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
      localStorage.setItem('appTransType', this.appTransType);
      this.loading = true;
      getRelatedBusinessData(this.listId).then(res => {
        if (res.success) {
          this.businessRelateds = res.obj.frontAppList.concat(res.obj.lastAppList);
          this.loading = false;
        }
      }).catch(err => {
          this.$Message.error(err.data.message);
      });
    }
  },
  created() {
    this.getAllAppSubjectData();
  }
};
</script>

