<template>

  <div class="wrap">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div v-if="cutView&&caseId==='apps'">
      <section v-for="(menuItem,i) in menu" :key="i" class="bg-white-lighter">

        <row class="menu-group">
          <row>
            <h3 class="menu-group-title">{{menuItem.text}}</h3>
          </row>

          <row :gutter="16" >
            
            <Col  v-if="item.leaf" v-for="(item,j) in menuItem.children" :key="j" span="4">
              <menu-item v-if="item.leaf" :appinfo="item" :allTaskCount="allTaskCount"></menu-item>
            </Col>
           <menu-list v-else :menuItem="item" :index='j' :allTaskCount="allTaskCount"></menu-list>
          </row>
          
        </row>
      </section>
    </div>
  </div>
</template>

<script>
import MenuList from "./card/MenuList";
import MenuItem from "./card/MenuItem";
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
    MenuList,
    MenuItem,
    PulseGraph
  },
  data() {
    return {
      spinShow: true,
      cutView: true,
      menuList: [],
      menu:[],
      favoriteMenu: {
        leaf: false,
        text: "常用应用",
        children: []
      },
      caseId: "apps",
      allTaskCount: [],
      books$$: null,
      isAdmin: this.$currentUser.isAdmin,
      model: "apps"
    };
  },
  created() {
    // getMyFavorite().then(res => {
    //   if (res.tableContent.length > 0) {
    //     this.favoriteMenu.children = res.tableContent;
    //   }
    // });
    let cache = window.sessionStorage.getItem('roletask.com.r2.cache');
    if(cache){
      cache = cache?JSON.parse(cache):{};
      this.menuList = cache['/ds/getMenu'];
      this.menu = this.menuList.slice(0,6);
      this.spinShow = false;
      }else{
      //获取菜单信息
      getMenu().then(res => {
        this.urlMd5(res);

        if (this.favoriteMenu.children.length > 0) {
          this.menuList = [this.favoriteMenu, ...res];
        } else {
          this.menuList = res;
        }
        
        if(this.menuList.length>6){
          this.menu = this.menuList.slice(0,6);
        }else{
          this.menu = menuList;
        }
        this.spinShow = false;
      });
    }
  },

  mounted(){
     this.subscribeMessage();

       //获取当前用户所有待办任务
    getCurrentUserAllTasks().then(res => {
      this.allTaskCount = res.tableContent;
    });

    //滚动加载菜单栏
    window.onscroll = ()=>{
      if(this.menu.length<this.menuList.length){
        //获取文档完整的高度 
        let bodyHeight =  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        //获取当前可视范围的高度  
        let clientHeight = 0;
        if(document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        //获取滚动条当前的位置
        let scrollTop = 0;
        if(document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if(document.body) {
            scrollTop = document.body.scrollTop;
        }
        if(scrollTop + clientHeight > bodyHeight -150){
          let menuItem = this.menuList.slice(this.menu.length,this.menu.length+1)[0]
          this.menu.push(menuItem)
        }
      }
    }
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
      this.spinShow = false;

      if(deepstream.event){
        //消息订阅
        deepstream.event.subscribe("taskChange/" + this.$currentUser.userId, msg => {
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

<style lang="less" scoped>
.fr {
  float: right;
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
}

.bg-white-lighter {
  background-color: #fff;
  padding: 0 6%;
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
  .ivu-select-selected-value {
    font-size: 14px !important;
    font-weight: bold;
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

