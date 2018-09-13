<style lang="less" scoped>
@import "./operation.less";
</style>

<template>
    <div class="app">
        
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>动作</h3><span class="warning-color marlr">勾选以启用或停用应用的动作</span>
            </Row>
            <div class="app-action-source">
                <Row class="app-action-source-list">
                    <Col span="6" class="app-action-source-item" v-for="(list,index) of actionData" :key="index">

                        <Col span="2" class="app-action-source-item-check">
                            <Checkbox @on-change="isForbidden(list,index)" :disabled="!isAdminTrue" :value="list.permType===0?true:false"></Checkbox>
                        </Col>

                        <Col span="21" class="app-action-source-item-content">
                            <h3>{{ list.name }}</h3>
                            <div class="app-action-source-item-desc">{{ list.desc }}</div>
                        </Col>
                    </Col>
                </Row>
            </div>
        </Row>
    </div>
</template>

<script>
import {
  getAppResourcesAndAuthoritys,
  getAllPermissionData,
  ProhibitApp,
  deleteRelationPermission
} from "@/services/appService.js";
import {APP_ACTION} from "@/assets/const";

export default {
  name: "permissionSource",
  components: {},
  props: {
    enabledForbidden: Number,
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      isAdminTrue: false,
      isEdit: "",
      actionData: []
    };
  },
  watch: {
    enabledForbidden: function() {
      this.getData();
    },
    isAdmin: function(value) {
      if(value){
        this.isAdminTrue = true;
      }else{
        this.isAdminTrue = false;
      }
    }
  },
  methods: {
    //启用禁用动作权限
    isForbidden(list, index) {
      let actionStatus = list.permType === 0 ? true : false,
        relStatus;
      if (actionStatus) {
        relStatus = -2;
      } else {
        relStatus = 0;
      }
      ProhibitApp(list.id, relStatus).then(res => {
        if (res.success) {
          this.$Message.success(res.message);
          this.getData();
        }
      });
    },
    getData() {
      let listId = this.listId;
      //获取应用权限数据
      getAllPermissionData(listId).then(res => {
        this.actionData = res.tableContent;

        this.actionData.map(ac=>{
          ac.desc = APP_ACTION[ac.resourceName];
        });
      });
    }
  },
  created() {},
  mounted() {
    this.getData();
  }
};
</script>

