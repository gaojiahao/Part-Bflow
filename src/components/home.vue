<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        border-radius: 3px;
        margin: 15px auto;
        font-size: 24px;
        font-family: -webkit-pictograph;
        text-align: -webkit-left;
        color: white;
        letter-spacing: 0.1em;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
        <Row type="flex" style="height:100%;">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu theme="dark" width="auto">
                    <div class="layout-logo-left" v-if="spanLeft!=1">Roletask</div>
                    <div class="layout-logo-left" style="text-align: center;" v-if="spanLeft==1">R</div>
                    <Menu-item name="home" to="/home">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">职位看板</span>
                    </Menu-item>
                    <Submenu name="addressBook">
                        <template slot="title">
                            <Icon type="ios-keypad" :size="iconSize" />
                            通讯录
                        </template>
                        <MenuItem name="user" to="/addressBook/user">员工</MenuItem>
                        <MenuItem name="organization" to="/addressBook/organization">组织</MenuItem>
                        <MenuItem name="job" to="/addressBook/job">职位</MenuItem>
                        <MenuItem name="companyInfo" to="/addressBook/companyInfo">公司</MenuItem>
                    </Submenu>
                    <Menu-item name="message" to="/social/message">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">消息</span>
                    </Menu-item>
                    <Menu-item name="flowtask" to="/social/flowtask">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">任务</span>
                    </Menu-item>
                    <Menu-item name="application" to="/application">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">应用中心</span>
                    </Menu-item>
                    <Menu-item name="fileCabinet" to="/fileCabinet">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">文件柜</span>
                    </Menu-item>
                    <Menu-item name="wokdGuide" to="/wokdGuide">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">作业指导</span>
                    </Menu-item>
                    <Menu-item name="knowledge" to="/knowledge">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">知识库</span>
                    </Menu-item>
                    <Menu-item name="checkSheet" to="/checkSheet">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">作业结果点检</span>
                    </Menu-item>
                    <Menu-item name="enterpriseInfo" to="/enterpriseInfo">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">企业详情信息</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick" style="mamargin-left:10px;">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>

                  
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <!-- <div class="layout-content-main">内容区域</div> -->
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2010-2018 &copy; roletask
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 3,
                spanRight: 21
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 3 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 3) {
                    this.spanLeft = 1;
                    this.spanRight = 23;
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                }
            }
        }
    }
</script>
