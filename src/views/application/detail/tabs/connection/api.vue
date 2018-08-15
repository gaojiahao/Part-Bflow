<style lang="less" scoped>
@import "./api.less";
</style>

<template>
    <div class="bg_ff martop20">

        <Row class="app-resource-group-title">
            <h3>API</h3>
        </Row>
        <Row class="api-content">
            <h2>创建销售订单</h2>
            <p>
                <strong>请求方式：POST（HTTPS）</strong>
            </p>
            <p>
                <strong>请求地址：https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=ACCESS_TOKEN</strong>
            </p>
            <p>
                <strong>请求包体：</strong>
            </p>
            <Row>
                <pre class="api-code">
                {{appContent}}
                    <div style="position: absolute;top: 0px;right: 0px;cursor: pointer;"  class="tag-read"  :data-clipboard-text=appContent  @click="copy">
                        <Tooltip placement="top" content="点击复制" :disabled="disabled">
                            <Icon type="md-document" size='24' />
                        </Tooltip>
                    </div>
                </pre>
            </Row>
        </Row>

    </div>
</template>

<script>
import { findList } from "@/services/appService.js";

const Clipboard = require("clipboard");
export default {
  name: "appApi",
  components: {},
  props: {},
  data() {
    return {
      listId: this.$route.params.listId,
      disabled: false,
      apiInfo: "HHHHHHHHHHHHHHHHHHHH",
      appContent: ""
    };
  },
  methods: {
    copy() {
      let clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    //格式话Json数据
    formatJson(json, options) {
      let reg = null,
        formatted = "",
        pad = 0,
        PADDING = "    ";
      options = options || {};
      options.newlineAfterColonIfBeforeBraceOrBracket =
        options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
      options.spaceAfterColon =
        options.spaceAfterColon === false ? false : true;
      if (typeof json !== "string") {
        json = JSON.stringify(json);
      } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
      }
      reg = /([\{\}])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /([\[\]])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /(\,)/g;
      json = json.replace(reg, "$1\r\n");
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, "\r\n");
      reg = /\r\n\,/g;
      json = json.replace(reg, ",");
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ":{");
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ":[");
      }
      if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ":");
      }
      json.split("\r\n").forEach(function(node, index) {
        //console.log(node);
        let i = 0,
          indent = 0,
          padding = "";

        if (node.match(/\{$/) || node.match(/\[$/)) {
          indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else {
          indent = 0;
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING;
        }

        formatted += padding + node + "\r\n";
        pad += indent;
      });
      return formatted;
    }
  },
  mounted() {
    findList(this.listId)
      .then(res => {
        this.appContent = this.formatJson(res.commitApi);
      })
      .catch(error => {
        this.$Message.error(error.message.data);
      });
  }
};
</script>

