<style lang="less" scoped>
.app-card {
  float: left;
  width: 100%;
  border-top: 1px solid #ddd;
  padding: 10px 15px;
  .app-name {
    font-size: 1rem;
    color: #39f;
  }
  .app-body {
    &-card {
      float: left;
      width: 200px;
      height: 130px;
      font-size: 14px;
      // border-style: none;
      ul {
        list-style: none;
        li {
          margin-top: 5px;
        }
        li:first-child {
          margin-top: 0px;
        }
        .app-setting-dot {
          color: #39f;
        }
      }
    }
    .app-title {
      height: 12px;
      line-height: 12px;
    }
    .ivu-modal {
      top: 25px !important;
    }
  }
}
</style>

<template>
    <div>
        <Row>
            <div class="app-card">
                <Col span="6">
                <Row class="app-body-card">
                    <ul>
                        <li>
                            <b>表单设置</b>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>部件内部数据源过滤</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>部件之间数据过滤</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>科目分录设置</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a @click="goForm">表单设置</a>
                        </li>
                    </ul>
                </Row>
                </Col>
                <Col span="6">
                <Row class="app-body-card">
                    <ul>
                        <li>
                            <b>工作流设置</b>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>一般工作流图</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a @click="showWorkFlowModal">工作流设置</a>
                        </li>
                    </ul>
                </Row>
                </Col>
                <Col span="6">
                <Row class="app-body-card">
                    <p class="app-title" slot="title">报表设置</p>
                    <ul>
                        <li>
                            <b>报表设置</b>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>对象查阅项</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>报表权限</a>
                        </li>
                    </ul>
                </Row>
                </Col>
                <Col span="6">
                <Row class="app-body-card">
                    <ul>
                        <li>
                            <b>相关应用设置</b>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a>应用信息设置</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a @click="showPermissionApp">权限设置</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a @click="showAppLog">更新日志</a>
                        </li>
                        <li>
                            <b class="app-setting-dot">●</b>
                            <a @click="showNavModal">导航</a>
                        </li>
                    </ul>
                </Row>
                </Col>
            </div>
        </Row>
        <!-- 更新日志 -->
        <custom-modal width="600" footerBtnAlign="right" title="更新日志" v-model="visible" @onVisibleChange="modalVisibleChange" @on-ok="submitLog">
            <div style="margin:20px auto;width:80%;">
                <Form :label-width="80" :model="logData">
                    <FormItem label="更新范围:">
                        <Select multiple v-model="logData.scope">
                            <Option value="表单">表单</Option>
                            <Option value="科目关系">科目关系</Option>
                            <Option value="报表">报表</Option>
                            <Option value="工作流">工作流</Option>
                            <Option value="权限">权限</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="耗用小时数:">
                        <InputNumber v-model="logData.spendTime" />
                        <span style="color:#ddd;margin-left:10px;">单位/分</span>
                    </FormItem>
                    <FormItem label="更新内容:">
                        <Input type="textarea" v-model="logData.content" :autosize="{minRows: 2,maxRows: 5}" />
                    </FormItem>
                </Form>
            </div>
        </custom-modal>
        <!-- 导航modal -->
        <nav-modal @emitNavModal="emitNavModal" :listId="listId" :modalNavStatus="showNav" @hasPublished="hasPublished"></nav-modal>
        <!-- 工作流modal -->
        <workflow-modal @emitWorkFlowModal="emitWorkFlowModal" :modalWorkflowStatus="showWorkFlow" :listId="listId"></workflow-modal>
        <!-- 权限modal -->
        <permission-modal :modalPermissionStatus="showPermissionModal" :appListId="listId" @emitPermissionModal="emitPermissionModal" @reGetData="reGetData"></permission-modal>
    </div>
</template>

<script>
import PermissionModal from "./permission/permissionModal";
import WorkflowModal from "./modal/workflowModal";
import NavModal from "./modal/navigationModal";
import CustomModal from "@/components/modal/Modal";
import { saveAppLog } from "@/services/appService.js";

export default {
  name: "appSetting",
  components: {
    PermissionModal,
    WorkflowModal,
    NavModal,
    CustomModal
  },
  props: ["listId"],
  data() {
    return {
      showPermissionModal: false,
      showWorkFlow: false,
      showNav: false,
      visible: false,
      logData: {
        scope: "",
        spendTime: 1,
        content: ""
      }
    };
  },
  methods: {
    showAppLog() {
      this.visible = true;
    },
    modalVisibleChange(val) {
      this.visible = val;
    },

    submitLog() {
      let params = {
        listId: this.listId,
        scope: this.logData.scope.join(","),
        spendTime: this.logData.spendTime,
        content: this.logData.content
      };
      saveAppLog(params).then(res => {
        if (res.success) {
          this.$Message.success(res.message);
          this.visible = false;
        }
      });
    },

    //监听权限modal返回的状态
    emitPermissionModal() {
      this.showPermissionModal = false;
    },
    //监听工作流modal返回的状态
    emitWorkFlowModal() {
      this.showWorkFlow = false;
    },
    //监听导航modal返回的状态
    emitNavModal() {
      this.showNav = false;
    },
    showNavModal() {
      this.showNav = true;
    },
    hasPublished(data) {
      this.$emit("childHasPublished", data);
    },
    //展示权限modal
    showPermissionApp() {
      this.showPermissionModal = true;
    },
    //修改提交权限
    submitPermission() {},
    //展示工作流modal
    showWorkFlowModal() {
      this.showWorkFlow = true;
    },
    goForm() {
      window.open("/Form/index.html?viewDesign=true&list=" + this.listId);
    },
    reGetData(data) {
      this.$emit("getData", data);
    }
  },
  mounted() {}
};
</script>

