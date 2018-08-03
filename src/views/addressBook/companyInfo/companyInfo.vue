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
        <!-- <h3 class="herder-title">
                <span style="color:red;">公司名称</span>&nbsp;/
                <span>SODL_1807_0063</span>&nbsp;/
                <span>行程中</span>
            </h3> -->
        <Row class="detail-header">
            <Breadcrumb class="detail-header-bread">
                <BreadcrumbItem>{{ companyInformation.nickname?companyInformation.nickname:'用户' }}</BreadcrumbItem>
                <BreadcrumbItem>{{ companyInformation.userCode?companyInformation.userCode:'创建' }}</BreadcrumbItem>
            </Breadcrumb>
            <Tag v-show="companyInformation.status?showTag:!showTag" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:companyInformation.status,color:'#eb2f96'}"></Tag>
        </Row>
        <Row class="detail-tabs">
            <div @click="onClickTab(index)" v-if="groupId?item.isShow:item.isShowAcive" :class="{'detail-tabs-child':true,'active':item.isShowAcive}" v-for="(item,index) of relativeInstance" :key="index">
                <img :src="item.imgUrl" />
                <div class="detail-tabs-child-right">
                    <span>{{ item.relativeNum }}</span>
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </Row>
        <Row class="detail-content">
            <!-- 公司基本信息 -->
            <base-info v-show="whichShow.baseInfo"></base-info>
            <!-- 公司成员-->
            <member-info v-show="whichShow.member"></member-info>
            <!--上级公司-->
            <higher-company v-show="whichShow.higherCompany"></higher-company>
        </Row>
    </div>
</template>

<script>
import BaseInfo from "@/views/addressBook/companyInfo/baseInfo/baseInfo";
import MemberInfo from "@/views/addressBook/companyInfo/memberInfo/memberInfo";
import HigherCompany from "@/views/addressBook/companyInfo/higherCompany/higherCompany";
export default {
  components: {
    BaseInfo,
    MemberInfo,
    HigherCompany
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
        nickname: "测试",
        userCode: "1234",
        status: 1
      },
      relativeInstance: [
        {
          name: "上级公司",
          showName: "higherCompany",
          isShow: true,
          isShowAcive: false,
          relativeNum: 1,
          imgUrl: "resources/images/icon/2_1.png"
        },
        {
          name: "下级公司",
          showName: "lowerCompany",
          isShow: true,
          isShowAcive: false,
          relativeNum: 1,
          imgUrl: "resources/images/icon/1_4.png"
        },
        {
          name: "公司信息",
          showName: "baseInfo",
          isShow: true,
          isShowAcive: true,
          relativeNum: 1,
          imgUrl: "resources/images/icon/job.png"
        },
        {
          name: "公司成员",
          showName: "member",
          isShow: true,
          isShowAcive: false,
          relativeNum: 1,
          imgUrl: "resources/images/icon/organization.png"
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
    }
  }
};
</script>

