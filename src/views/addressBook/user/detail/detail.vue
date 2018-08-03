<style lang="less">
@import './detail.less';
</style>

<template>
  <Row class="detail">
    <Row class="detail-header">
      <Breadcrumb class="detail-header-bread">
        <BreadcrumbItem to="/addressBook/user/board">{{ userInformation.nickname?userInformation.nickname:'用户' }}</BreadcrumbItem>
        <BreadcrumbItem>{{ userInformation.userCode?userInformation.userCode:'创建' }}</BreadcrumbItem>
      </Breadcrumb>
      <Tag v-show="userInformation.status?showTag:!showTag"   class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:userInformation.status,color:'#eb2f96'}"></Tag>
    </Row>
    <Row class="detail-header">
      <Button @click="goBack" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">返回</Button>
      <div v-show="userInformation.status?showTag:!showTag" class="detail-header-icon">
        <span>
          <Icon class="detail-header-icon-back" type="ios-arrow-back" />
        </span>
        <span>
          <Icon class="detail-header-icon-forward" type="ios-arrow-forward" />
        </span>
      </div>
    </Row>
    <Row class="detail-tabs">
      <div 
        @click="onClickTab(index)"
        v-if="userInformation.userId?item.isShow:item.isShowAcive"
        :class="{'detail-tabs-child':true,'active':item.isShowAcive}" 
        v-for="(item,index) of relativeInstance"
        :key="index">
        <img :src="item.imgUrl"/>
        <div class="detail-tabs-child-right">
          <span>{{ item.relativeNum }}</span>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </Row>
    <Row class="detail-content">
      <!-- 用户信息 -->
      <user-info v-if="whichShow.userinfo" :userInfo="userInformation"></user-info>
      <!-- 上级用户 -->
      <higher-user v-if="whichShow.highuser"></higher-user>
      <!-- 下级用户 -->
      <lower-user v-if="whichShow.lowuser"></lower-user>
      <!-- 部门 -->
      <department-member v-if="whichShow.dep"></department-member>
      <!-- 职位 -->
      <role-member v-if="whichShow.role"></role-member>
      <!-- 直接权限 -->
      <direct-permission v-if="whichShow.dirper"></direct-permission>
      <!-- 间接权限 -->
      <indirect-permission v-if="whichShow.indirper"></indirect-permission>
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
import { getUserInfoById } from "@/services/addressBookService.js";

export default {
  name: "detail",
  components: {
    UserInfo,
    HigherUser,
    LowerUser,
    DepartmentMember,
    RoleMember,
    DirectPermission,
    IndirectPermission
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
      },
      userInformation: {},
      relativeInstance: [
        { name: "间接权限", showName: 'indirper', isShow: true, isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/1_4.png' },
        { name: "直接权限", showName: 'dirper', isShow: true, isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/1_4.png' },
        { name: "用户职位", showName: 'role', isShow: true, isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/job.png' },
        { name: "用户部门", showName: 'dep',  isShow: true,isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/organization.png' },
        { name: "下级用户", showName: 'lowuser', isShow: true, isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/user.png' },
        { name: "上级用户", showName: 'highuser', isShow: true, isShowAcive: false, relativeNum: 1, imgUrl: 'resources/images/icon/user.png' },
        { name: "用户信息", showName: 'userinfo', isShow: true, isShowAcive: true, imgUrl: 'resources/images/icon/user.png' }
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
        });
      }
    },
    goBack() {
      this.$router.push({path: '/addressBook/user/board'});
    },

    //更新相关实例数量{}
    getInstanceNum() {},
  },
  mounted() {
    this.getUserInfoData();
    let tabsMaxHeight = document.body.clientHeight - 165;
    window.document.getElementsByClassName('detail-content')[0].style.height = tabsMaxHeight + 'px';
  }
};
</script>
