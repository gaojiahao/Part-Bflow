<style lang="less">
@import "./api.less";
</style>
<template>
  <div class="bg_ff">

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
            <Table size="small" :columns="columns" :data="commitApi.params"></Table>
            <div style="position:relative;">
              <p style="font-size: 14px;color: #333;">
                <strong style="font-weight: 700">返回结果：</strong>
              </p>
              <pre class="api-code">{{returnMsg}}</pre>
              <div style="position: absolute;top: 40px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=msgText @click="copy">
                <Tooltip placement="top" content="点击复制" :disabled="disabled">
                  <Icon type="md-document" size='24' />
                </Tooltip>
              </div>
              <h3 style="color: #333;">参数说明：</h3>
              <Table size="small" :columns="columns1" :data="msgData"></Table>
            </div>
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
            <Table size="small" :columns="viewColumns" :data="viewData"></Table>
            <div style="position:relative;">
              <p style="font-size: 14px;color: #333;">
                <strong style="font-weight: 700">返回结果：</strong>
              </p>
              <pre class="api-code">{{returnMsg}}</pre>
              <div style="position: absolute;top: 40px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=msgText @click="copy">
                <Tooltip placement="top" content="点击复制" :disabled="disabled">
                  <Icon type="md-document" size='24' />
                </Tooltip>
              </div>
              <h3 style="color: #333;">参数说明：</h3>
              <Table size="small" :columns="columns1" :data="msgData"></Table>
            </div>
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
            <h3 style="color: #333;">请求参数：</h3>
            <Table size="small" :columns="columns" :data="updateData"></Table>
            <div style="position:relative;">
              <p style="font-size: 14px;color: #333;">
                <strong style="font-weight: 700">返回结果：</strong>
              </p>
              <pre class="api-code">{{returnMsg}}</pre>
              <div style="position: absolute;top: 40px;right: 20px;cursor: pointer;" class="tag-read" :data-clipboard-text=msgText @click="copy">
                <Tooltip placement="top" content="点击复制" :disabled="disabled">
                  <Icon type="md-document" size='24' />
                </Tooltip>
              </div>
              <h3 style="color: #333;">参数说明：</h3>
              <Table size="small" :columns="columns1" :data="msgData"></Table>
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
import { getFormViews, getViewConfig } from "@/services/flowService";

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
      returnMsg: "",
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
      viewColumns: [
        {
          title: "参数",
          key: "param",
          width: 200,
          align: "center"
        },
        {
          title: "说明",
          key: "explain"
        }
      ],
      columns1: [
        {
          title: "参数",
          key: "param1",
          width: 160,
          align: "center"
        },
        {
          title: "说明",
          key: "explain1"
        }
      ],
      commitData: [],
      viewData: [],
      updateData: [],
      msgData: [],
      msgText: ""
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
      let formData = JSON.parse(body).formData;
      let requires = formData.disallowBlank;
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
                }
              }
              if (!data.hasOwnProperty("required")) {
                data["required"] = "否";
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
                  }
                }
                if (!data.hasOwnProperty("required")) {
                  data["required"] = "否";
                }
                datas.push(data);
              }
            }
          }
        } else if (index !== "disallowBlank") {
          data["explain"] = formData[index];
          data["param"] = index;
          for (var r in requires) {
            if (r == index) {
              data["required"] = "是";
            }
          }
          if (!data.hasOwnProperty("required")) {
            data["required"] = "否";
          }
          datas.push(data);
        }
      }
      return datas;
    },
    async getBaseObjectValues() {
      var uniqueId,
          config;

      var viewId= await getFormViews(this.listId).then(res => {
          if (res.length > 0) {
              for (let item of res) {
                if (item.viewType === "submit") {
                    uniqueId = item.uniqueId;
                }
              }
            }
            return uniqueId;
        }),cfg;
        if(uniqueId != null) config = await getViewConfig(uniqueId).then(data => {
           return data;
        })
        return config;
    } 
  },
  mounted() {
    var that = this;
    findList(that.listId).then(res => {
      //创建实例
      if(res.commitApi && res.commitUrl){
        this.commitApi = JSON.parse(res.commitUrl);
        this.commitApi.body = ForamtJson(this.commitApi.body);
        this.commitApi.params = this.formatData(this.commitApi.body)
      }
      //查看实例
      if(res.viewApi && res.viewUrl){
        this.viewApi = JSON.parse(res.viewUrl);
        this.viewApi.body = ForamtJson(this.viewApi.body);
        this.viewApi.params = this.formatData(this.viewApi.body)
      }
      //修改实例
      if(res.updateApi && res.updateUrl){
        this.updateApi = JSON.parse(res.updateUrl);
        this.updateApi.body = ForamtJson(this.updateApi.body);
        this.updateApi.params = this.formatData(this.updateApi.body)
      }

      if (res.type == 'obj') {//判断类型是否为基础对象
              that.getBaseObjectValues().then(item =>{
              var itemConfig = JSON.parse(item.config),
                  apiConfig = {
                    listId : undefined, 
                    formData:{},
                  },
                  fieldLabel,
                  fieldItemKey,
                  commitMethod,
                  commitAddress,
                  viewMethod,
                  viewAddress,
                  updateMethod,
                  updateAddress,
                  apiKey = '/save',
                  baseObjectKey = itemConfig.baseObjectKey,
                  formData = apiConfig.formData;

              apiConfig.listId = item.listId;
              
              commitMethod = 'POST';
              commitAddress = ['/',baseObjectKey,apiKey].join('') + '（无工作流任务）'+
                              ['/',baseObjectKey,'/saveAndStartWf'].join('') + '（有工作流任务）';
              updateMethod = 'POST';
              updateAddress = ['/',baseObjectKey,'/updateAndEffective'].join('') + '（无工作流任务）'+
                              ['/',baseObjectKey,'/updateAndStartWf'].join('') + '（有工作流任务）';
              viewMethod = 'get';
              viewAddress = ['/',baseObjectKey,'/findData'].join('');
              

              for (var j = 0; j < itemConfig.items.length; j++) {//循环获取到config下的items 各层容器

                var fieldset = itemConfig.items[j],
                    fields = fieldset.items,
                    fieldsetNode = {},
                    isList = fieldset.isMultiple,
                    name = fieldset.name,
                    gridNode,
                    grid;

                  if (fieldset.xtype == 'r2Fileupload') continue;
                  formData[name] = fieldsetNode;

                  if (isList) {
                      gridNode = {};
                      fieldsetNode.dataSet = [gridNode];
                      if (fields) {
                        grid = fields[0];
                        fields = grid.columns;//r2Grid
                      } else {
                        fields = fieldset.columns;//bomGrid
                      }
                  }

                  if (fields) {
                    fields.map(function(fieldDetail) {
                      var fieldLabel = fieldDetail.fieldLabel || fieldDetail.text,
                          fieldCode =  fieldDetail.fieldCode;

                      (isList?gridNode:fieldsetNode)[fieldCode] = fieldLabel;
                    })
                  }
              }
              that.$set(that.commitApi,'body',apiConfig);
              that.$set(that.commitApi,'method',commitMethod);
              that.$set(that.commitApi,'address',commitAddress);
              that.$set(that.viewApi,'body',apiConfig);
              that.$set(that.viewApi,'method',viewMethod);
              that.$set(that.viewApi,'address',viewAddress);
              that.$set(that.updateApi,'body',apiConfig);
              that.$set(that.updateApi,'method',updateMethod);
              that.$set(that.updateApi,'address',updateAddress);
            });
          } 
      })
     
      this.returnMsg = {
        sucess: true,
        error: false
      };
      this.msgText = JSON.stringify(this.returnMsg);
      this.msgData = [
        { param1: "sucess", explain1: "请求成功" },
        { param1: "error", explain1: "请求失败" }
      ];
  }
};
</script>

