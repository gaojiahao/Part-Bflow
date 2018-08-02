<style lang="less" scoped>
@import "./companyInfo.less";
</style>

<style>
.ivu-tabs-nav {
  float: right;
}
.ivu-tabs-bar {
    border-bottom:none;
    margin-bottom:0;
    background: #fff;

}
</style>
<template>
    <div class="content-wrap">
        <div class="content-wrap-header">
            <h3 class="herder-title">
                <span style="color:red;">公司名称</span>&nbsp;/
                <span>SODL_1807_0063</span>&nbsp;/
                <span>行程中</span>
            </h3>
            <Tabs value="baseInfo">
                <TabPane label="上级公司" name="baseInfo">
                    <base-info></base-info>
                </TabPane>
                <TabPane label="下级公司" name="name2">标签二的内容</TabPane>
                <TabPane label="成员" name="memberInfo">
                    <member-info></member-info>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import BaseInfo from "@/views/addressBook/companyInfo/baseInfo/baseInfo";
import MemberInfo from "@/views/addressBook/companyInfo/memberInfo/memberInfo";
export default {
    
  components: {
    BaseInfo,
    MemberInfo
  }
};
</script>

