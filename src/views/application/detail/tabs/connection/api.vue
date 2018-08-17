<style lang="less" scoped>
@import "./api.less";
</style>

<template>
  <div class="bg_ff martop20">

    <Row class="app-resource-group-title">
      <h3>API</h3>
    </Row>
    <section>
      <Collapse simple v-model="collapseValue">
        <Panel name="commit" >
          提交
          <div slot="content">
            <p>请求方式：{{commitApi.method}}</p>
            <p>请求地址：{{commitApi.address}}</p>
            <pre class="api-code">
              {{commitApi.formData}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=appContent @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
          </div>
        </Panel>
        <Panel name="look">
          查看
          <div slot="content">
            <p>请求方式：{{viewApi.method}}</p>
            <p>请求地址：{{viewApi.address}}</p>
            <pre class="api-code">
              {{viewApi.formData}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=appContent @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
          </div>
        </Panel>
        <Panel name="update">
          更新
          <div slot="content">
            <p>请求方式：{{updateApi.method}}</p>
            <p>请求地址：{{updateApi.address}}</p>
            <pre class="api-code">
              {{updateApi.formData}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=appContent @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
          </div>
        </Panel>
      </Collapse>
    </section>
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
      collapseValue: "commit",
      commitApi:{},
      updateApi:{},
      viewApi:{},
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
        debugger
        try {
          this.commitApi = JSON.parse(res.commitUrl);
          this.updateApi = JSON.parse(res.updateUrl);
          this.viewApi = JSON.parse(res.viewUrl);
        } catch (error) {
            this.$$Message.error('后台返回格式有误！！！')
        }
        this.commitApi['formData'] = ForamtJson(this.commitApi['formData']);
        this.updateApi['formData'] = ForamtJson(this.updateApi['formData']);
        this.viewApi['formData'] = ForamtJson(this.viewApi['formData']);
      })
      .catch(error => {
        this.$Message.error(error.message.data);
      });
  }
};
</script>

