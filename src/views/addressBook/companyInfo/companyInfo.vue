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
</style>
<template>
  <div class="content-wrap">
    <Row class="detail-header">
      <Breadcrumb class="detail-header-bread">
        <BreadcrumbItem to="/addressBook/companyInfo/board">公司</BreadcrumbItem>
        <BreadcrumbItem>{{ companyInformation.groupName?companyInformation.groupShortName:'' }}</BreadcrumbItem>
        <BreadcrumbItem>{{ companyInformation.groupId?companyInformation.groupId:'创建' }}</BreadcrumbItem>
      </Breadcrumb>
      <Tag v-show="companyInformation.status" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:companyInformation.status,color:'#eb2f96'}"></Tag>
    </Row>
    <Row class="detail-tabs">
      <div @click="onClickTab(index)" v-if="groupId?item.isShow:item.isShowAcive" :class="{'detail-tabs-child':true,'active':item.isShowAcive}" v-for="(item,index) of relativeInstance" :key="index">
        <img :src="item.imgUrl" />
        <div class="detail-tabs-child-right">
          <span v-if="item.relativeNum==0||item.relativeNum">{{ item.relativeNum }}</span>
          <span v-else>&nbsp;</span>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </Row>
    <Row class="detail-content">
      <!-- 公司基本信息 -->
      <base-info v-if="whichShow.baseInfo"></base-info>
      <!-- 公司成员-->
      <member-info v-if="whichShow.member" @getInstanceCount="getInstanceCount"></member-info>
      <!--上级公司-->
      <higher-company v-if="whichShow.higherCompany" @getInstanceCount="getInstanceCount"></higher-company>
      <!--下级公司-->
      <lower-company v-if="whichShow.lowerCompany" @getInstanceCount="getInstanceCount"></lower-company>

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
  getInstanceCountByGroupId
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
      whichShow: {
        baseInfo: true,
        higherCompany: false,
        lowerCompany: false,
        member: false
      },
      companyInformation: {
        nickname: "",
        userCode: "",
        status: 3
      },
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
          name: "公司信息",
          showName: "baseInfo",
          isShow: true,
          isShowAcive: true,
          imgUrl: "resources/images/icon/company.png"
        }
      ]
    };
  },
  methods: {
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
      this.$route.name == "add" ? this.$route.name : this.$route.params.groupId;
    if ("add" == groupId) {
      return;
    }
    this.getCompanyInfo(groupId);
    this.getInstanceCount();
  }
};
</script>

