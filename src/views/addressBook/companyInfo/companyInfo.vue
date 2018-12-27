<style lang="less" scoped>
@import "./companyInfo.less";
</style>

<style>
.ivu-tabs-nav {
  float: right;
}
.ivu-tabs-bar {
  border-bottom: none;
  margin-bottom: 0;
  background: #fff;
}
.ivu-breadcrumb {
  font-size: 18px;
}
</style>
<template>
  <div class="content-wrap">
    <Row class="detail-com-header">
      <div class="detail-com-header-bread">
        <span @click="goCompanyList" class="detail-com-header-bread-user">公司</span>
        <span class="detail-com-header-bread-others">/</span>
        <span class="detail-com-header-bread-others">{{ (companyInformation&&companyInformation.groupName)?companyInformation.groupName:'创建'}}</span>
      </div>
      <Tag v-show="companyInformation.status" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:companyInformation.status}"></Tag>
    </Row>
    <Row class="detail-tabs">
      <div @click="onClickTab(index)" v-if="groupId?item.isShow:item.isShowAcive" :class="{'detail-tabs-child':true,'active-item':item.isShowAcive}" v-for="(item,index) of relativeInstance" :key="index">
        <img v-if="!item.type" :src="item.imgUrl" />
        <Icon v-else :type="item.type" class="icon" />
        <div class="detail-tabs-child-right">
          <span>{{ item.relativeNum }}</span>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </Row>
    <Row class="detail-content">
      <!-- 公司基本信息 -->
      <base-info :isPermission="isPermission" v-if="whichShow.baseInfo"></base-info>
      <!-- 公司成员-->
      <member-info :isPermission="isPermission" v-if="whichShow.member" @getInstanceCount="getInstanceCount"></member-info>
      <!--上级公司-->
      <higher-company :isPermission="isPermission" v-if="whichShow.higherCompany" @getInstanceCount="getInstanceCount"></higher-company>
      <!--下级公司-->
      <lower-company :isPermission="isPermission" v-if="whichShow.lowerCompany" @getInstanceCount="getInstanceCount"></lower-company>

    </Row>
  </div>
</template>

<script>
import BaseInfo from "@/views/addressBook/companyInfo/baseInfo/baseInfo";
import MemberInfo from "@/views/addressBook/companyInfo/memberInfo/memberInfo";
import HigherCompany from "@/views/addressBook/companyInfo/higherCompany/higherCompany";
import LowerCompany from "@/views/addressBook/companyInfo/lowerCompany/lowerCompany";
import {
  getCompanyInfoByGroupId,
  getInstanceCountByGroupId,
  getListById
} from "@/services/addressBookService.js";
export default {
  components: {
    BaseInfo,
    MemberInfo,
    HigherCompany,
    LowerCompany
  },
  data() {
    return {
      groupId: this.$route.params.groupId,
      isPermission: true,
      whichShow: {
        baseInfo: true,
        higherCompany: false,
        lowerCompany: false,
        member: false
      },
      companyInformation: {},
      relativeInstance: [
        {
          name: "下级公司",
          showName: "lowerCompany",
          isShow: true,
          isShowAcive: false,
          relativeNum: 0,
          imgUrl: "resources/images/icon/company.png"
        },
        {
          name: "上级公司",
          showName: "higherCompany",
          isShow: true,
          isShowAcive: false,
          relativeNum: 0,
          imgUrl: "resources/images/icon/company.png"
        },
        {
          name: "公司成员",
          showName: "member",
          isShow: true,
          isShowAcive: false,
          relativeNum: 0,
          imgUrl: "resources/images/icon/user.png"
        },
        {
          name: "基本信息",
          showName: "baseInfo",
          isShow: true,
          isShowAcive: true,
          type: "ios-home"
        }
      ]
    };
  },
  methods: {
    goCompanyList() {
      location.href = '/Site/index.html#page/companys';
    },
    //切换tab
    onClickTab(currentIndex) {
      this.relativeInstance.forEach((val, k) => {
        if (currentIndex === k) {
          val.isShowAcive = true;
          this.whichShow[val.showName] = true;
        } else {
          val.isShowAcive = false;
          this.whichShow[val.showName] = false;
        }
      });
    },
    //获取公司基本信息
    getCompanyInfo(groupId) {
      getCompanyInfoByGroupId(groupId).then(res => {
        this.companyInformation = res[0];
      });
    },
    //更新相关实例数量{}
    getInstanceCount() {
      getInstanceCountByGroupId(this.groupId).then(res => {
        this.relativeInstance[0].relativeNum = res.subord;
        this.relativeInstance[1].relativeNum = res.parent;
        this.relativeInstance[2].relativeNum = res.groupUser;
      });
    }
  },
  mounted() {
    let tabsMaxHeight = document.body.clientHeight - 120;
    window.document.getElementsByClassName("detail-content")[0].style.height =
      tabsMaxHeight + "px";
    let groupId =
      this.$route.name == "company-add" ? "add" : this.$route.params.groupId;
    if ("add" == groupId) {
      return;
    }
    this.getCompanyInfo(groupId);
    this.getInstanceCount();
    getListById('000004').then(res => {
        if(!res[0].action.update){
          this.isPermission = false;
        }
      });
  }
};
</script>

