<style lang="less" scoped>
@import './detail.less';
</style>

<template>
  <Row class="detail">
    <Row class="detail-user-header">
      <div class="detail-user-header-bread">
        <span @click="goUserList" class="detail-user-header-bread-user">用户</span>
        <span class="detail-user-header-bread-others">/</span>
        <span 
          v-if="userInformation.nickname?true:false" 
          class="detail-user-header-bread-others">
          {{ userInformation.nickname }}
        </span>
        <span class="detail-user-header-bread-others">{{ userInformation.userCode?'':'创建' }}</span>
        <Tag
          v-show="userId"
          class="radius10 marlr10 color_fff" 
          v-instanceStateDirective="{status:userInformation.status}">
        </Tag>
      </div>
      <div 
        @click="onClickTab(index)"
        v-if="userInformation.userId?item.isShow:item.isShowAcive"
        :class="{'detail-tabs-child':true,'active-item':item.isShowAcive}" 
        v-for="(item,index) of relativeInstance"
        :key="index">
        <img v-if="!item.type" :src="item.imgUrl"/>
        <Icon v-else :type="item.type" class="icon" />
        <div class="detail-tabs-child-right">
          <span>{{ item.relativeNum }}</span>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </Row>
    <Row class="detail-content-tabs">
      <!-- 用户信息 -->
      <user-info v-show="whichShow.userinfo" :userInfo="userInformation" @resetUser="resetUser" :isUpdate="isUpdate"></user-info>
      <!-- 上级用户 -->
      <higher-user @changeInstance="getInstanceCount" v-if="whichShow.highuser" :isUpdate="isUpdate"></higher-user>
      <!-- 下级用户 -->
      <lower-user @changeInstance="getInstanceCount" v-if="whichShow.lowuser" :isUpdate="isUpdate"></lower-user>
      <!-- 部门 -->
      <department-member @changeInstance="getInstanceCount" v-if="whichShow.dep" :isUpdate="isUpdate"></department-member>
      <!-- 职位 -->
      <role-member @changeInstance="getInstanceCount" v-if="whichShow.role" :isUpdate="isUpdate"></role-member>
      <!-- 绩效分析 -->
      <performance-analysis v-if="whichShow.performance"></performance-analysis>
      <!-- 直接权限 -->
      <direct-permission @changeInstance="getInstanceCount" v-if="whichShow.dirper" :target="target" :isUpdate="isUpdate"></direct-permission>
      <!-- 间接权限 -->
      <indirect-permission v-if="whichShow.indirper"></indirect-permission>
      <!-- 工作流任务 -->
      <workfow-task v-if="whichShow.workflow"></workfow-task>
    </Row>
  </Row>
</template>

<script>
import UserInfo from "./instance/user-info";
import HigherUser from "./instance/higher-user";
import LowerUser from "./instance/lower-user";
import DepartmentMember from "./instance/department";
import RoleMember from "./instance/role";
import DirectPermission from "./instance/direct-permission";
import IndirectPermission from "./instance/indirect-permission";
import WorkfowTask from './instance/workflow-task';
import PerformanceAnalysis from './instance/performance-analysis';
import { getUserInfoById,getInstanceCountByUserId,getListById } from "@/services/addressBookService.js";

export default {
  name: "detail",
  components: {
    UserInfo,
    HigherUser,
    LowerUser,
    DepartmentMember,
    RoleMember,
    DirectPermission,
    IndirectPermission,
    WorkfowTask,
    PerformanceAnalysis
  },
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      showTag: true,
      isUpdate: true,
      whichShow: {
        userinfo: true,
        highuser: false,
        lowuser: false,
        dep: false,
        role: false,
        dirper: false,
        indirper: false,
        workflow: false
      },
      target: {
        type: 'user',
        targetId: this.$route.params.userId
      },
      userInformation: {},
      relativeInstance: [
        { name: "工作流任务", showName: 'workflow', isShow: true, isShowAcive: false, relativeNum: 0, type:"md-menu" },
        { name: "间接权限", showName: 'indirper', isShow: true, isShowAcive: false, relativeNum: 0, type:"ios-people" },
        { name: "直接权限", showName: 'dirper', isShow: true, isShowAcive: false, relativeNum: 0, type:"md-person" },
        { name: "绩效分析", showName: 'performance', isShow: true, isShowAcive: false, imgUrl: 'https://lab.roletask.com/resource/app-icon/bonus-provisions.png' },
        { name: "职位", showName: 'role', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'https://lab.roletask.com/resource/app-icon/job.png' },
        { name: "组织", showName: 'dep',  isShow: true,isShowAcive: false, relativeNum: 0, imgUrl: 'https://lab.roletask.com/resource/app-icon/organization.png' },
        { name: "下级用户", showName: 'lowuser', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'https://lab.roletask.com/resource/app-icon/user.png' },
        { name: "上级用户", showName: 'highuser', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'https://lab.roletask.com/resource/app-icon/user.png' },
        { name: "基本信息", showName: 'userinfo', isShow: true, isShowAcive: true, type:"ios-home" }
      ]
    };
  },
  created() {},
  methods: {
    goUserList() {
        location.href = '/Site/index.html#page/users';
    },
    //切换tab
    onClickTab(currentIndex) {
      this.relativeInstance.forEach((val,k) => {
        if(currentIndex === k){
          val.isShowAcive = true;
          this.whichShow[val.showName] = true;
        }else{
          val.isShowAcive = false;
          this.whichShow[val.showName] = false;
        }
      })
    },
    //获取用户详情信息
    getUserInfoData() {
      if(this.userId){
        getUserInfoById(this.userId).then(res => {
          this.userInformation = res.tableContent[0];
        });
      }
    },
    //监听放弃编辑
    resetUser() {
      this.getUserInfoData();
    },
    //更新相关实例数量{}
    getInstanceCount() {
      if(this.userId){
        getInstanceCountByUserId(this.userId).then(res => {
          this.relativeInstance[0].relativeNum = res.workFlow;
          this.relativeInstance[1].relativeNum = res.SysPermission;
          this.relativeInstance[2].relativeNum = res.objectPermission;
          this.relativeInstance[4].relativeNum = res.role;
          this.relativeInstance[5].relativeNum = res.group;
          this.relativeInstance[6].relativeNum = res.subordinate;
          this.relativeInstance[7].relativeNum = res.superior;
        })
      }
    },
  },
  mounted() {
    this.getUserInfoData();
    this.getInstanceCount();
    getListById('000001').then(res => {
        if(!res[0].action.update){
            this.isUpdate = false;
        }
      });
  }
};
</script>
