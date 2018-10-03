<template>

  <div class="wrap bg_ff">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="main-header bg_ff">
      <div class="main-header-nav">
        <Row>
          <Col span="24">
          <ButtonGroup class="fr">
            <Icon :type="model==='apps'?'ios-apps':'md-share'" size="16" />
            <Select v-model="model" class="input-select" @on-change="changeView" placeholder="请选择业务单元" style="width:230px;font-size:16px">
              <Option value="apps">
                <Icon type="ios-apps" size="16" /> 所有应用看板
              </Option>
              <Option v-for="item in pulseGraphLlistr" :value="item.id" :key="item.id">
                <Icon type="md-share" size="16" /> {{ item.name }}
              </Option>
            </Select>
          </ButtonGroup>
          </Col>
        </Row>
      </div>
    </div>
    <div v-if="cutView&&caseId==='apps'">
      <section v-for="(menuList,i) in menuList" :key="i" class="bg-white-lighter">

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
      caseId: "apps",
      pulseGraphLlistr: [],
      allTaskCount: [],
      books$$: null,
      isAdmin: this.$currentUser.isAdmin,
      model: "apps"
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
    changeView(caseId) {
      if (!caseId) return;
      if (caseId === "apps") {
        this.cutView = true;
        this.caseId = caseId;
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
      let deepstream = this.$deepstream;
      let token = getToken();
      //消息订阅
      deepstream.event.subscribe("taskChange/" + this.$currentUser.userId, msg => {
        this.allTaskCount = msg.tableContent;
      });
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

<style lang="less" scoped>
.fr {
  float: right;
}
.menuTitle {
  font-size: 28;
  font-weight: 400;
}

@media screen and (max-width: 646px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 320px !important;
    padding: unset !important;
  }
}

@media screen and (min-width: 647px) and (max-width: 808px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 240px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 809px) and (max-width: 1023px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1466px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1467px) and (max-width: 1680px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1680px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 240px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}
.wrap {
  top: 40px;
  position: relative;
  height: 100%;
  width: 100%;
}

.bg-gray-lighter {
  background-color: #f0f0f0;
  padding: 0 8%;
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
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    text-align: left;
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

    .ivu-select-selected-value {
      font-size: 14px !important;
      font-weight: bold;
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

// .input-select {
//   width: 160px !important;
//   margin: 0 5px !important;
// }

//下拉选择器修改自带样式
.main-header-nav {
  .ivu-select-selection {
    height: 30px !important;
    border-radius: 0px !important;
  }
}
</style>

