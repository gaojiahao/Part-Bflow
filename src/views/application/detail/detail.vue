<style lang="less" scoped>
  @import './detail.less';
</style>

<template>
  <div class="app-details">

    

    <!-- 应用详情信息 -->
    <app-info :listId="this.$route.params.listId" :enforData="enforData" :isAdmin="isAdmin" :appData="appData" @reloadData="reloadData" @changeAdmin="changeAdmin" @enabledForbiddenAppPermission="enabledForbiddenAppPermission"></app-info>


    <!-- 应用tabs -->
    <div class="rfd-tab">
      <Tabs value="name1" class="rfd-tab-warp">
        <TabPane label="一般" name="name1">
          <log-instance :isAdmin="isAdmin"></log-instance>
        </TabPane>
        <TabPane label="互动" name="name2">
          <!-- 管理员自评 -->
          <admintrstor-assessment :isAdmin="isAdmin"></admintrstor-assessment>
        </TabPane>
        <TabPane label="资源" name="name3">
          <permission-source :appType="appType" :isAdmin="isAdmin" :enabledForbidden="enabledForbidden"></permission-source>
        </TabPane>
        <TabPane label="连接" name="name4">
          <!-- 应用科目 -->
          <div class="app-sub">
            <app-subject :isAdmin="isAdmin"></app-subject>
          </div>
<<<<<<< HEAD
          
          <related-app></related-app>
          <app-api></app-api>
=======
          <related-app></related-app>
>>>>>>> 4be3c7974b56f0206bdde348894812866df9800c
        </TabPane>
      </Tabs>
    </div>

  </div>
</template>

<script>
import { getListData } from "@/services/appService.js";
import LogInstance from "./tabs/base/log-instance";
import AppInfo from "./information/information";
import AppSubject from "./tabs/connection/subject";
import AppApi from "./tabs/connection/api";
import RelatedApp from  './tabs/connection/related-app';
import AdmintrstorAssessment from "./tabs/exchange/admintrstor-assessment";
import PermissionSource from "./tabs/permission/permission";
export default {
  name: "detail",
  components: {
    AppSubject,
    AppApi,
    AdmintrstorAssessment,
    PermissionSource,
    AppInfo,
    LogInstance,
    RelatedApp
  },
  data() {
    return {
      listId: this.$route.params.listId,
      //应用详情信息
      appData: {},
      enforData: [],
      isAdmin: false,
      appType: '',
      enabledForbidden: -1
    };
  },
  methods: {
    //通知应用启用禁用动作权限
    enabledForbiddenAppPermission() {
      this.enabledForbidden++;
    },
    changeAdmin() {
      this.getAppInfoDatas();
    },
    //获取应用详情信息
    getAppInfoDatas() {
      let uniqueId = this.listId,
          currentUser = this.$currentUser;
      //请求应用详情信息
      getListData(uniqueId).then(res => {
        this.appData = res[0];
        if(this.appData.type === 'business'){
          this.appData.appType = '业务应用';
        }else if(this.appData.type === 'subject'){
          this.appData.appType = '科目应用';
        }else{
          this.appData.appType = '对象应用';
        }
        this.appType = this.appData.type;
        
        if(currentUser.userId == this.appData.administratorId){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      });
    },
    //重新刷新数据
    reloadData() {
      this.getAppInfoDatas();
    }
  },
  created() {
    this.getAppInfoDatas();
  }
};
</script>

