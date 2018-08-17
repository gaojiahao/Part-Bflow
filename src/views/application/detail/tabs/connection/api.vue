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
        <Panel name="commit">
          <strong style="font-weight: 700;font-size: 14px;color: #333;">提交</strong>
          <div slot="content">
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求方式:</strong>
              {{commitApi.method}}
            </p>
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求地址：</strong>
              {{commitApi.address}}
            </p>
            <pre class="api-code">
              {{commitApi.body}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=updateApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="data"></Table>
          </div>
        </Panel>
        <Panel name="look">
          <strong style="font-weight: 700;font-size: 14px;color: #333;">查看</strong>
          <div slot="content">
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求方式:</strong>
              {{viewApi.method}}
            </p>
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求地址：</strong>
              {{viewApi.address}}
            </p>
            <pre class="api-code">
              {{viewApi.body}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=updateApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="ViewData"></Table>
          </div>
        </Panel>
        <Panel name="update">
          <strong style="font-weight: 700;font-size: 14px;color: #333;">更新</strong>
          <div slot="content">
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求方式:</strong>
              {{updateApi.method}}
            </p>
            <p style="font-size: 14px;color: #333;">
              <strong style="font-weight: 700">请求地址：</strong>
              {{updateApi.address}}
            </p>
            <pre class="api-code">
              {{updateApi.body}}
            </pre>
            <div style="position: absolute;top: 30px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=updateApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="data"></Table>
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
      commitApi: {},
      updateApi: {},
      viewApi: {},
      columns: [
        {
          title: "参数",
          key: "param",
          width: 200,
          align: "center"
        },
        {
          title: "必须",
          key: "required",
          width: 160,
          align: "center"
        },
        {
          title: "说明",
          key: "explain"
        }
      ],
      data: [
        {
          param: "listId",
          required: "是",
          explain: "应用id"
        },
        {
          param: "biComment",
          required: "否",
          explain: "备注"
        },
        {
          param: "formData",
          required: "是",
          explain: "表单数据"
        }
      ],
      ViewData: [
        {
          param: "listId",
          required: "是",
          explain: "应用id"
        }
      ]
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
        try {
          this.commitApi = JSON.parse(res.commitUrl);
          this.updateApi = JSON.parse(res.updateUrl);
          this.viewApi = JSON.parse(res.viewUrl);
        } catch (error) {
          this.$$Message.error("后台返回格式有误！！！");
        }
        this.commitApi["body"] = ForamtJson(this.commitApi["body"]);
        this.updateApi["body"] = ForamtJson(this.updateApi["body"]);
        this.viewApi["body"] = ForamtJson(this.viewApi["body"]);
      })
      .catch(error => {
        this.$Message.error(error.message.data);
      });
  }
};
</script>

