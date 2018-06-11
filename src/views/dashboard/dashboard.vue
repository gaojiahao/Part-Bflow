<style lang="less">
    @import './dashboard.less';
     @import "../../styles/common.less";
</style>
<template>
  <div id="dashboard" class="dashboard">
      <div class="wrapper">
          <div  class="wrapper-header">
              <ul class="ivu-menu ivu-menu-light ivu-menu-horizontal">
                  <div class="wrapper-header-nav">
                    <a href="/" class="wrapper-header-nav-logo router-link-active">
                        <img src="static/logo.ico">
                    </a>
                    <div class="wrapper-header-nav-list">
                        <li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                            <i class="ivu-icon ivu-icon-chatbubble-working">
                            </i>
                            指南
                        </li>
                        <li class="ivu-menu-item ">
                            <i class="ivu-icon ivu-icon-android-laptop">
                            </i>
                            应用中心
                        </li>
                        <li class="ivu-menu-item ">
                            <i class="ivu-icon ivu-icon-ios-information-outline">
                            </i>
                            帮助
                        </li>
                    </div>
                  </div>
              </ul>
          </div>

          <div  class="wrapper-container">
              <div class="ivu-row">
                  <div class="wrapper-navigate ivu-col ivu-col-span-4">
                      <div class="navigate">
                        <div class="ivu-menu ivu-menu-light ivu-menu-vertical">
                            <li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">介绍</li>
                            <li class="ivu-menu-item ">介绍</li>
                        </div>
                      </div>
                  </div>
                  <div class="ivu-col ivu-col-span-20">
                      <div class="wrapper-content ivu-article">
                        <Row :gutter="10">
                            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                                <Card>
                                    <p slot="title" class="card-title">
                                        <Icon type="ios-pulse-strong"></Icon>
                                        数据来源统计
                                    </p>
                                    <div class="data-source-row">
                                    <salepie></salepie>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      

    <router-view/>
  </div>
</template>

<script>
import salepie from './salepie/salepie.vue';

export default {
  name: 'dashboard',
  components:{
      salepie
  }
}
</script>

<style>


</style>
