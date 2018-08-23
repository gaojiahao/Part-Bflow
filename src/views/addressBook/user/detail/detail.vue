<style lang="less" scoped>
@import './detail.less';
</style>

<template>
  <Row class="detail">
    <Row class="detail-header">
      <div class="detail-header-bread">
        <span class="detail-header-bread-user">用户</span>
        <span class="detail-header-bread-others">/</span>
        <span v-if="userInformation.nickname?true:false" class="detail-header-bread-others">{{ userInformation.nickname }}</span>
        <span class="detail-header-bread-others">{{ userInformation.userCode?'':'创建' }}</span>
      </div>
      <Tag v-show="userInformation.status?showTag:!showTag" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:userInformation.status}"></Tag>
    </Row>
    <Row class="detail-tabs">
      <div 
        @click="onClickTab(index)"
        v-if="userInformation.userId?item.isShow:item.isShowAcive"
        :class="{'detail-tabs-child':true,'active':item.isShowAcive}" 
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
      <user-info v-show="whichShow.userinfo" :userInfo="userInformation"></user-info>
      <!-- 上级用户 -->
      <higher-user @changeInstance="getInstanceCount" v-if="whichShow.highuser"></higher-user>
      <!-- 下级用户 -->
      <lower-user @changeInstance="getInstanceCount" v-if="whichShow.lowuser"></lower-user>
      <!-- 部门 -->
      <department-member @changeInstance="getInstanceCount" v-if="whichShow.dep"></department-member>
      <!-- 职位 -->
      <role-member @changeInstance="getInstanceCount" v-if="whichShow.role"></role-member>
      <!-- 直接权限 -->
      <direct-permission @changeInstance="getInstanceCount" v-if="whichShow.dirper"></direct-permission>
      <!-- 间接权限 -->
      <indirect-permission v-if="whichShow.indirper"></indirect-permission>
      <!-- 工作流任务 -->
      <workfow-task  v-if="whichShow.workflow"></workfow-task>
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
import { getUserInfoById,getInstanceCountByUserId } from "@/services/addressBookService.js";

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
    WorkfowTask
  },
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      showTag: true,
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
      userInformation: {},
      relativeInstance: [
        { name: "工作流任务", showName: 'workflow', isShow: true, isShowAcive: false, relativeNum: 0, type:"md-menu" },
        { name: "间接权限", showName: 'indirper', isShow: true, isShowAcive: false, relativeNum: 0, type:"ios-people" },
        { name: "直接权限", showName: 'dirper', isShow: true, isShowAcive: false, relativeNum: 0, type:"md-person" },
        { name: "职位", showName: 'role', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'resources/images/icon/job.png' },
        { name: "部门", showName: 'dep',  isShow: true,isShowAcive: false, relativeNum: 0, imgUrl: 'resources/images/icon/organization.png' },
        { name: "下级用户", showName: 'lowuser', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'resources/images/icon/user.png' },
        { name: "上级用户", showName: 'highuser', isShow: true, isShowAcive: false, relativeNum: 0, imgUrl: 'resources/images/icon/user.png' },
        { name: "基本信息", showName: 'userinfo', isShow: true, isShowAcive: true, type:"ios-home" }
      ]
    };
  },
  created() {},
  methods: {
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
          if(this.userInformation.status === 1){
            this.userInformation.statusText = '使用中';
          }else if(this.userInformation.status === -1){
            this.userInformation.statusText = '停用';
          }else if(this.userInformation.status === 3){
            this.userInformation.statusText = '草稿';
          }else{
            this.userInformation.statusText = '未使用';
          }
        });
      }
    },

    //更新相关实例数量{}
    getInstanceCount() {
      if(this.userId){
        getInstanceCountByUserId(this.userId).then(res => {
          this.relativeInstance[0].relativeNum = res.workFlow;
          this.relativeInstance[1].relativeNum = res.SysPermission;
          this.relativeInstance[2].relativeNum = res.objectPermission;
          this.relativeInstance[3].relativeNum = res.role;
          this.relativeInstance[4].relativeNum = res.group;
          this.relativeInstance[5].relativeNum = res.subordinate;
          this.relativeInstance[6].relativeNum = res.superior;
        })
      }
    },
  },
  mounted() {
    this.getUserInfoData();
    this.getInstanceCount();
    let tabsMaxHeight = document.body.clientHeight - 90;
    window.document.getElementsByClassName('detail-content-tabs')[0].style.height = tabsMaxHeight + 'px';
    window.document.getElementsByClassName('detail-content-tabs')[0].style.maxHeight = tabsMaxHeight + 'px';
  }
};
</script>
