<style lang="less" scoped>
@import "./detail-layout.less";
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
      @enabledForbiddenAppPermission="enabledForbiddenAppPermission">
    </app-info>

  <Menu mode="horizontal" theme="light" :active-name="$route.name">
      <router-link :to="{ name:'change-log'}">
        <MenuItem name="change-log">
          更新日志
        </MenuItem>
      </router-link>

      <router-link :to="{ name:'analysis'}">
        <MenuItem name="analysis">
          数据分析
        </MenuItem>
      </router-link>

      <router-link :to="{ name:'interaction'}">
        <MenuItem name="interaction">
          互动评论
        </MenuItem>
      </router-link>

      <router-link :to="{ name:'permission'}">
        <MenuItem name="permission">
          资源授权
        </MenuItem>
      </router-link>

      <router-link :to="{ name:'connection',params:{appTransType:appTransType}}">
        <MenuItem name="connection">
          连接&API
        </MenuItem>
      </router-link>

      <router-link :to="{ name:'features'}">
        <MenuItem name="features">
          配置
        </MenuItem>
      </router-link>
    </Menu>

  <div class="detail-content">
    <router-view 
      :listId="this.$route.params.listId" 
      :isAdmin="isAdmin"
      :isOperator="isOperator"
      :isAddress="isAddress" 
      :appType="appType"
      :appTransType="appTransType" 
      :isCompanyAdmin="isCompanyAdmin"
      :enabledForbidden="enabledForbidden">
    </router-view>
  </div>

  </div>
</template>

<script>
import { getListData } from "@/services/appService.js";
import AppInfo from "./information/information";

export default {
  name: "detail",
  components: {
    AppInfo
  },
  data() {
    return {
      listId: this.$route.params.listId,
      //应用详情信息
      appData: {},
      enforData: [],
      isAdmin: false,       //应用管理员权限
      isCompanyAdmin: false,  //企业管理员权限
      isAddress: false,   //通讯录权限
      isOperator: false, //运营管理员权限
      appType: "",
      appTransType: "",
      enabledForbidden: -1
    };
  },
  methods: {
    //通知应用启用禁用动作权限
    enabledForbiddenAppPermission() {
      this.enabledForbidden++;
    },
    //获取应用详情信息
    getAppInfoDatas() {
      let uniqueId = this.listId,
        currentUser = this.$currentUser,
        currentUserIds = [];
      //请求应用详情信息
      getListData(uniqueId).then(res => {
        this.appData = res[0];
        if(this.appData.comment){
          this.appData.comment = this.appData.comment.replace(/<br>/g,'\r\n'); 
        } 
        this.appType = this.appData.type;
        this.appTransType = this.appData.transType;


        if(this.appData.icon){
          if(this.appData.icon.indexOf('resource')=== 0 ){
              this.appData.icon = `https://lab.roletask.com/resource/app-icon/${this.appData.icon.split('/').pop()}`
          }
        }

        //获取当前登录用户角色id
        currentUser.isSysRoleList.forEach(val => {
          currentUserIds.push(val.id);
        });
        //判断当前用户是否有当前应用权限
        currentUserIds.indexOf(-1) > -1 && (this.isOperator = true);

        if (this.appData.administrator) {
          if (
            currentUser.nickname === this.appData.administrator &&
            currentUserIds.indexOf(1) > -1
          ) {
            this.isAdmin = true;
            this.isCompanyAdmin = true;
          } else if (currentUser.nickname == this.appData.administrator) {
            this.isAdmin = true;
          } else if (currentUserIds.indexOf(1) > -1) {
            this.isCompanyAdmin = true;
            this.isAdmin = false;
          } else {
            this.isAdmin = false;
            this.isCompanyAdmin = false;
          }
        } else {
          if (currentUserIds.indexOf(1) > -1) {
            this.isAdmin = true;
            this.isCompanyAdmin = true;
          } else {
            this.isAdmin = false;
            this.isCompanyAdmin = false;
          }
        }
        //判断是否是通讯录并控制其相关应用权限
        if (this.appData.type === "hr") {
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

