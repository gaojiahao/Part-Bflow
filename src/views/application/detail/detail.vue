<style lang="less" scoped>
  @import './detail.less';
</style>

<template>
  <div class="app-details">


    <!-- 应用详情信息 -->
    <app-info 
      :listId="this.$route.params.listId" 
      :enforData="enforData" 
      :isAdmin="isAdmin" 
      :isCompanyAdmin="isCompanyAdmin" 
      :appData="appData" 
      @reloadData="reloadData" 
      @changeAdmin="changeAdmin" 
      @enabledForbiddenAppPermission="enabledForbiddenAppPermission">
    </app-info>

    <div class="rfd-tab">
      <Tabs value="name1" class="rfd-tab-warp">
        <TabPane label="一般" name="name1">
          <log-instance 
            :isAdmin="isAdmin" 
            :isAddress="isAddress"
            :appType="appType">
          </log-instance>
        </TabPane>
        <TabPane label="互动" name="name2">
          <!-- 管理员自评 -->
          <admintrstor-assessment :isAdmin="isAdmin"></admintrstor-assessment>
          <!-- 用户评论 -->
          <user-comments ></user-comments>
        </TabPane>
        <TabPane 
        :disabled="!(isAdmin || isCompanyAdmin)" 
        :label="(isAdmin || isCompanyAdmin)?'资源':''" 
        name="name3">
          <permission-source 
            :appType="appType" 
            :isAdmin="isAdmin" 
            :isAddress="isAddress" 
            :enabledForbidden="enabledForbidden">
          </permission-source>
        </TabPane>
        <TabPane 
        :disabled="!(isAdmin || isCompanyAdmin) && appType === 'subject'" 
        :label="((isAdmin || isCompanyAdmin) && appType !== 'subject')?'连接':''" 
        name="name4">
          <!-- 应用科目 -->
          <div class="app-sub">
            <app-subject 
              v-if="!isAddress" 
              :isAdmin="isAdmin">
            </app-subject>
          </div>
          <!-- 相关应用 -->
          <related-app 
            v-if="!isAddress" 
            :isAdmin="isAdmin">
          </related-app>
          <!-- API -->
          <app-api></app-api>
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
import UserComments from "./tabs/exchange/user-comments";
import PermissionSource from "./tabs/permission/permission";
export default {
  name: "detail",
  components: {
    AppSubject,
    AppApi,
    AdmintrstorAssessment,
    UserComments,
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
      isCompanyAdmin: false,
      isAddress: false,
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
          currentUser = this.$currentUser,
          currentUserIds = [];
      //请求应用详情信息
      getListData(uniqueId).then(res => {
        this.appData = res[0];
        this.appType = this.appData.type;
        
        //获取当前登录用户角色id
        currentUser.isSysRoleList.forEach(val => {
          currentUserIds.push(val.id);
        });
        //判断当前用户是否有当前应用权限
        if(this.appData.administrator){
          if(currentUser.nickname === this.appData.administrator && currentUserIds.indexOf(1) > -1){
            this.isAdmin = true;
            this.isCompanyAdmin = true;
          }else if(currentUser.nickname == this.appData.administrator){
            this.isAdmin = true;
          }else if(currentUserIds.indexOf(1) > -1){
            this.isCompanyAdmin = true;
            this.isAdmin = false;
          }else{
            this.isAdmin = false;
            this.isCompanyAdmin = false;
          }
        }else{
          if(currentUserIds.indexOf(1) > -1){
            this.isAdmin = true;
            this.isCompanyAdmin = true;
          }else{
            this.isAdmin = false;
            this.isCompanyAdmin = false;
          }
        }
        //判断是否是通讯录并控制其相关应用权限
        if(this.appData.type === 'hr'){
          this.isAddress = true;
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

