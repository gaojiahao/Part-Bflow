<style lang="less">
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
            <div style="position: absolute;top: 70px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=commitApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="commitData"></Table>
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
            <div style="position: absolute;top: 70px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=viewApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="viewData"></Table>
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
            <div style="position: absolute;top: 70px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=updateApi.body @click="copy">
              <Tooltip placement="top" content="点击复制" :disabled="disabled">
                <Icon type="md-document" size='24' />
              </Tooltip>
            </div>
            <h3>请求参数：</h3>
            <Table size="small" :columns="columns" :data="updateData"></Table>
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
      commitData: [],
      viewData: [],
      updateData: []
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
    formatData(body) {
      let data;
      let nelData;
      let datas = [];
      let dataSet;
      let formData = body.formData;
      let requires = formData.isRequired;
      datas.push({
        explain: "备注",
        param: "biComment",
        required: "否"
      });
      datas.push({
        explain: "应用Id",
        param: "listId",
        required: "否"
      });
      for (var index in formData) {
        data = {};
        if (index == "order" || index == "inPut" || index == "outPut") {
          nelData = formData[index];
          for (var n in nelData) {
            data = {};
            if (n !== "dataSet") {
              data["explain"] = nelData[n];
              data["param"] = n;
              for (var r in requires) {
                if (r == n) {
                  data["required"] = "是";
                } else {
                  data["required"] = "否";
                }
              }
              datas.push(data);
            } else {
              dataSet = nelData[n][0];
              for (var s in dataSet) {
                data = {};
                data["explain"] = dataSet[s];
                data["param"] = s;
                for (var r in requires) {
                  if (r == s) {
                    data["required"] = "是";
                  } else {
                    data["required"] = "否";
                  }
                }
                datas.push(data);
              }
            }
          }
        } else if (index !== "isRequired") {
          data["explain"] = formData[index];
          data["param"] = index;
          for (var r in requires) {
            if (r == index) {
              data["required"] = "是";
            } else {
              data["required"] = "否";
            }
          }
          datas.push(data);
        }
      }
      return datas;
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
          this.$Message.error("后台返回格式有误！！！");
        }
        this.commitData = this.formatData(this.commitApi.body);
        this.updateData = this.formatData(this.updateApi.body);
        this.viewData = this.formatData(this.viewApi.body);
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

