<template>

  <div class="wrap">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="main-header">
      <div class="main-header-nav">
        <Row>
          <Col span="24">
          <ButtonGroup class="fr">
            <!-- <Button size="small" @click="goAppManage" type="ghost" caseId='apps' v-if="isAdmin">
              <i class="iconfont">&#xe6cf;</i>
              应用管理
            </Button> -->
            <Button size="small" @click="changeView" type="ghost" caseId='apps' v-bind:class="caseId==='apps'?'ivu-btn-active':''">
              <i class="iconfont">&#xe608;</i>
              全部应用
            </Button>
            <!-- <Button size="small" v-for="(pulse,i) in  pulseGraphLlistr" :key="i" type="ghost" @click="changeView" :caseId="pulse.id" v-bind:class="caseId===pulse.id?'ivu-btn-active':''">
              <i class="iconfont">&#xe64c;</i>
              {{pulse.name}}
            </Button> -->
            <Select v-model="model" class="input-select" @on-change="changeView">
              <Option v-for="item in pulseGraphLlistr" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </ButtonGroup>
          </Col>
        </Row>
      </div>
    </div>
    <div v-if="cutView">
      <section v-for="(menuList,i) in menuList" :key="i" class="bg-gray-lighter">

        <row class="menu-group">
          <row>
            <h3 class="menu-group-title">{{menuList.text}}</h3>
          </row>

          <row :gutter="16">
            <Col v-if="item.leaf" v-for="(item,j) in menuList.children" :key="j" span="4">
            <card-item v-if="item.leaf" :appinfo="item" :allTaskCount="allTaskCount"></card-item>
            </Col>
            <card-list v-else :menuItem="item" :index='j' :allTaskCount="allTaskCount"></card-list>
          </row>
        </row>
      </section>
    </div>
    <div v-for="(pulseGraph,index) in pulseGraphLlistr" :key="index" v-if="!cutView && pulseGraph.id === caseId">
      <pulse-graph :caseId="pulseGraph.id"></pulse-graph>
    </div>
  </div>
</template>

<script>
import * as ds from "deepstream.io-client-js";
import CardList from "@/components/card/CardList";
import CardItem from "@/components/card/CardItem";
import { getToken } from "@/utils/utils";
import PulseGraph from "@/views/flow/pulseGraph";
import {
  getMenu,
  getPulsationDiagramCase,
  getCurrentUserAllTasks,
  getPulseGraph,
  getMyFavorite
} from "@/services/flowService";

export default {
  components: {
    CardList,
    CardItem,
    PulseGraph
  },
  data() {
    return {
      spinShow: true,
      cutView: true,
      menuList: [],
      favoriteMenu: {
        leaf: false,
        text: "常用应用",
        children: []
      },
      caseId: "",
      pulseGraphLlistr: [],
      allTaskCount: [],
      ds: ds("wss://sunwingfood.roletask.com:6021/deepstream"),
      books$$: null,
      isAdmin:this.$currentUser.isAdmin,
      model: 0
    };
  },
  mounted() {
    this.subscribeMessage();

    getMyFavorite().then(res => {
      if (res.tableContent.length > 0) {
        this.favoriteMenu.children = res.tableContent;
      }
    });

    //获取当前用户所有待办任务
    getCurrentUserAllTasks().then(res => {
      this.allTaskCount = res.tableContent;
      //获取菜单信息
      getMenu().then(res => {
       this.urlMd5(res);

        if (this.favoriteMenu.children.length > 0) {
          this.menuList = [this.favoriteMenu, ...res];
        } else {
          this.menuList = res;
        }
        this.spinShow = false;
      });
    });

    getPulsationDiagramCase().then(res => {
      this.pulseGraphLlistr = res.tableContent;
    });
  },

  methods: {
    changeView(event) {
      if (!event) return;
      let caseId;
      if (event.currentTarget) {
        caseId = event.currentTarget.getAttribute("caseid");
      } else if (event > 0) {
        caseId = event;
      }
      if (caseId === "apps") {
        this.cutView = true;
        this.caseId = "apps";
        this.model = 0; //清空下拉选择框值，默认值为0
      } else {
        this.cutView = false;
        this.caseId = Number(caseId);
      }
    },

    goAppManage() {
      window.top.location.hash = "#page/AppSetting";
    },

    //订阅消息
    subscribeMessage: function() {
      let currentUser = this.$currentUser;
      if (currentUser.name && currentUser.Id) {
        let username = [currentUser.name, currentUser.userId].join("|");
        let token = getToken();
        //注册deepStream
        this.ds.login(
          {
            token: token,
            username: username
          },
          data => {
            console.log("connect success!");
          }
        );
        //消息订阅
        this.ds.event.subscribe("taskChange/" + token, msg => {
          this.allTaskCount = msg.tableContent;
        });
      }
    },

    //处理链接过长时
    urlMd5: function(res) {
      let loop = function(res) {
        let l = res.length,
          item;

        while (l--) {
          item = res[l];
          if (item.url && item.target == "_iframe") {
            let url = item.url,
              outlinks = {},
              md5Str = window.top.MD5(url),
              newUrl = "outlink/" + md5Str;
            item.url = newUrl;
          }
          if (item.children) loop(item.children);
        }
      };
      loop(res);
    }
  }
};
</script>

<style lang="less" >
.fr {
  float: right;
}
.menuTitle {
  font-size: 28;
  font-weight: 400;
}

@media screen and (max-width: 521px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 90% !important;
  }
}

@media screen and (min-width: 522px) and (max-width: 780px) {
  .ivu-col-span-4 {
    display: block !important;
     width: 50% !important;
  }
}

@media screen and (min-width: 781px) and (max-width: 1023px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 33.333333% !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1466px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 25% !important;
  }
}

@media screen and (min-width: 1467px) and (max-width: 1680px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 20% !important;
  }
}

.wrap {
  top: 40px;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #ddd;
}

.bg-gray-lighter {
  background-color: #f0f0f0;
  padding: 0 10%;
}

.bg-white-lighter {
  background-color: #fff;
  padding: 0 10%;
}

.menu-group {
  margin-bottom: 0px;
  //   background-color: #fff;
  padding: 5px 10px 20px;
  &-title {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 10px;
    text-align: center;
  }

  .col-span {
    span: 6;
  }
}

.main-header {
  position: fixed;

  top: 0px;
  height: 40px;
  width: 100%;
  padding: 0 10%;
  background-color: #ffffff;
  border-bottom: 1px solid #9e9e9e57;
  z-index: 997;
  padding: 5px;
  &-nav {
    button {
      cursor: pointer;
      -webkit-box-align: center;
      align-items: center;
      font-size: 14px;
      text-align: center;
      border-radius: 0px;
    }
  }
}
&-container {
  background: #fff;
  margin: 80px auto 15px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
&-content {
  padding: 20px 25px;
  position: relative;
}

//按钮选中时样式
.ivu-btn-active {
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}

.input-select {
  width: 160px !important;
  margin: 0 5px !important;
}

//下拉选择器修改自带样式
.ivu-select-selection {
  height: 30px !important;
  border-radius: 0px !important;
}
</style>

