<style lang="less" scoped>
  @import './subject.less';
</style>

<template>
<div class="bg_ff" style="margin-bottom:20px;">

    <Row class="app-resource-group-title">
         <h3>业务关系</h3>
    </Row>
    <Row class="subject-content">
         <Table :columns="columns" :loading="loading" :data="businessRelateds" height="400" size="small">
            <template slot-scope="{ row }" slot="status">
              <Checkbox 
              :value="row.status===1" 
              :disabled="!row.accountStatus || row.builtIn"
              @on-change="updateAccountRelation($event,row,'relation')">启用</Checkbox>
            </template>
            <template slot-scope="{ row }" slot="matchType">
              <Checkbox 
              :value="row.matchType===2" 
              :disabled="!row.accountStatus || row.accountType"
              @on-change="updateAccountRelation($event,row,'matchType')">按单核销</Checkbox>
            </template>
         </Table>
    </Row>

  </div>
</template>

<script>
import { getRelatedBusinessData,updateAccountRel } from "@/services/appService.js";

export default {
  name: "BusinessRelated",
  components: {},
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
                          window.open(`/Site/index.html#list/${params.row.appId}`);
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
          slot: "status",
          align: "left"
        },
        {
          title: "核销方式",
          slot: "matchType",
          align: "left"
        }
      ],
      businessRelateds: []
    };
  },
  watch: {
    
  },
  methods: {
    updateAccountRelation(status,row,type) {
      let data = {};
      data.calcRelCode = row.calcRelCode;
      data.componentId = row.componentId;
      data.transType = row.transType;
      data.appId = row.appId;
      data.status = row.status;
      data.matchType = row.matchType;

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

