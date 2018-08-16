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
        </pre>
        <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=appContent @click="copy">
          <Tooltip placement="top" content="点击复制" :disabled="disabled">
            <Icon type="md-document" size='24' />
          </Tooltip>
        </div>
      </Row>
    </Row>

  </div>
</template>

<script>
import { findList } from "@/services/appService.js";
import { ForamtJson } from "@/utils/utils";

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
    }
  },
  mounted() {
    findList(this.listId)
      .then(res => {
        this.appContent = ForamtJson(res.commitApi);
      })
      .catch(error => {
        this.$Message.error(error.message.data);
      });
  }
};
</script>

