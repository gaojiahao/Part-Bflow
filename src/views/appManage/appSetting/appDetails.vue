<style lang="less" scoped>
  
    .app-card{
      position: relative;
      height: 200px;
      .app-name{
        font-size: 1rem;
        color: #39f;
      }
      .app-img{
        width: 60px;
        height: 60px;
        position: absolute;
        top: 34%;
      }
      .app-title{
        position: absolute;
        top: 38%;
        left: 6%;
        font-size: 15px
      }
      .app-status{
        position: absolute;
        top: 52%;
        left: 20%;
      }
      .app-creator{
        position: absolute;
        top: 53%;
        left: 6%;
        color: #797676;
      }
      .app-createtime{
        position: absolute;
        top: 72%;
        left: 6%;
        color: #797676;
      }
      .app-type{
        position: absolute;
        top: 72%;
        left: 20%;
        color: #797676;
      }
      .app-instance{
        position: absolute;
        top: 50%;
        left: 34%;
        color: #797676;
      }
      .app-desc{
        position: absolute;
        top: 72%;
        left: 34%;
        color: #797676;
      }
    }
</style>

<template>
  <div class="app-details">
    <!-- 应用详情信息 -->
    <Row >
        <Card class="app-card">
            <p class="app-name" slot="title">
                应用信息
            </p>
            <a href="#" slot="extra"></a>
            <div class="app-body">
                <img class="app-img" src="../../../resources/images/icon/0_0.png"/>
                <b class="app-title">订单核销</b>
                <span class="app-creator">创建人: maliya</span>
                <span class="app-createtime">创建时间: 2018-6-21</span>
                <span class="app-status">状态：<Tag checkable color="blue">未发布</Tag></span>
                <span class="app-type">类型：YM4</span>
                <span class="app-instance">实例数：<Tag type="dot" color="red">2000</Tag></span>
                <span class="app-desc">说明：</span>
            </div>
        </Card>
    </Row>
    <!-- 应用设置信息 -->
    <app-setting></app-setting>
    <!-- 应用视图信息 -->
    <app-view></app-view>
    <!-- 应用科目信息 -->
    <app-subject></app-subject>
  </div>
</template>

<script>
import AppSetting from './appSetting';
import AppView from './appView';
import AppSubject from './appSubject';
export default {
  name: 'appDetails',
  components:{
      AppSetting,
      AppView,
      AppSubject
  },
  data () {
      return {
         
      }
  },
  methods: {
     
  },
  mounted() {
      
  }
}
</script>

