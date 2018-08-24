<style lang="less" scoped>
@import "./MyPopTip.less";
</style>
<style>
.ivu-poptip-inner {
  border: 1px solid #39f;
}
.ivu-poptip-popper[x-placement^="bottom"] .ivu-poptip-arrow {
  border-bottom-color: #39f;
}
.ivu-poptip-popper[x-placement^="top"] .ivu-poptip-arrow {
  border-top-color: #39f;
}
</style>

<template>
    <Poptip trigger="hover" placement="top" style="position:fixed;z-index:99999;cursor:pointer;">
        <slot name="userCard"></slot>
        <div slot="content">
            <div class="userInfo">
                <div class="userInfo-top">
                    <img class="userInfo-img" src="userInfo.photo" :onerror="errorImg01">
                    <div class="userInfo-right">
                        <b class="font14">{{userInfo.nickname}}</b>&nbsp;
                        <Icon type="person" class="colorI"></Icon>
                        <p>
                            <span class="user-font">{{userInfo.groupName}}</span>
                        </p>
                    </div>
                </div>
                <div class="userInfo-bottom">
                    <p>
                        <span class="user-font">手机</span>
                        <span class="left-margin">{{userInfo.mobile}}</span>
                    </p>
                    <p>
                        <span class="user-font">邮件</span>
                        <span class="left-margin">{{ userInfo.email}}</span>
                    </p>
                    <p>
                        <span class="user-font">部门</span>
                        <span class="left-margin">{{userInfo.groupName}}</span>
                    </p>
                </div>
            </div>
        </div>
    </Poptip>
</template>
<script>
export default {
  props: {
    userInfo: Object
  },
  data() {
    return {
      errorImg01: 'this.src="' + require("@/styles/login_bg.jpg") + '"'
    };
  },
  methods: {}
};
</script>