<template>

  <div class="card ivu-card ivu-card-bordered">

    <Badge :count="taskCount" class="badge-custom">
    </Badge>
    <img :src="appinfo.icon" />

    <div @click="xyRedirectTo(appinfo)">{{appinfo.text}}</div>

  </div>

</template>

<script>
export default {
  props: ["appinfo", "allTaskCount"],
  data() {
    return {
      taskCount: 0
    };
  },
  created() {
    if (!~this.appinfo.icon.indexOf("/dist/")) {
      this.appinfo.icon = "/dist/" + this.appinfo.icon;
    }
    let listId = this.appinfo.url.split("/")[1];
    let f = this.allTaskCount.filter(f => {
      return f.listId === listId;
    });
    if (f.length > 0) {
      this.taskCount = f[0].total;
    }
  },

  watch: {
    allTaskCount: {
      handler: function(val, oldValue) {
        let listId = this.appinfo.url.split("/")[1];
        let f = val.filter(f => {
          return f.listId === listId;
        });
        if (f.length > 0) {
          this.taskCount = f[0].total;
        }
      },
      deep: true
    }
  },
  methods: {
    redirectTo: function(appInfo) {
      let url = appInfo.url;
      if (~appInfo.url.indexOf("app")) {
        url = "appReport/" + url;
      } else if (~appInfo.url.indexOf("subject")) {
        url = "report/" + url;
      }
      window.top.postMessage(
        {
          type: "redirect",

          url: url
        },

        "*"
      );
    },

    /**
     * 新怡环境下应用链接跳转
     */
    xyRedirectTo: function(appInfo) {
      let url = appInfo.url;
      if (appInfo.target === "_blank") {
        window.open(url, "_blank");
      } else {
        if(~appInfo.url.indexOf("outlink")){
          ulr = appInfo.url;
        }else if(~appInfo.url.indexOf("app")){
          url = "appReport/" + url;
        }else {
          url = "report/" + url;
        }
        window.top.postMessage(
          {
            type: "redirect",
            url: url
          },
          "*"
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./common.less";

.card {
  height: 70px;
  border-radius: 3px;
  padding: 10px 12px;
  margin: 10px 0;
  img {
    height: 50px;
    width: 50px;
    cursor: pointer;
    // position: relative;
  }

  img:hover {
    cursor: auto;
  }
  div {
    cursor: pointer;
    font-size: @card-text-font-size;
    width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #000;
    position: absolute;
    top: 50%;
    left: 80px;
    transform: translateY(-50%);
  }

  div:hover {
    color: #0074e4;
  }

  .badge-custom {
    top: -10px;
    left: -10px;
    position: absolute;
    transform: translateX(0);
  }
}

.card:hover {
  -webkit-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -moz-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -o-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.05);
}

.ivu-card {
  background: #fff;
  font-size: 16px;
  position: relative;
  transition: all 0.2s ease-in-out;
}
.ivu-card-bordered {
  border: 1px solid #dddee1;
  border-color: #e9eaec;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.17);
}
</style>
