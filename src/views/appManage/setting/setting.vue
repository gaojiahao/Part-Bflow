<style lang="less" scoped>
    .app-card{
        float: left;
        width: 100%;
        padding-bottom: 10px;
        .app-name{
            font-size: 1rem;
            color: #39f;
        }
        .app-body{
            &-card{
                float: left;
                width: 200px;
                height: 160px;
                ul{
                    list-style: none;
                    li{
                        margin-top:5px;
                    }
                    li:first-child{
                         margin-top: 0px;
                    }
                    .app-setting-dot{
                        color: #39f;
                    }
                }
            }
            .app-title{
                height: 12px;
                line-height: 12px; 
            }
        }
    }
    .ivu-card{
        border-radius: 0px;
    }
    
</style>

<template>
    <div>
        <Row>
            <Card class="app-card">
                <div class="app-body">
                    <Col span="6">
                    <Card class="app-body-card">
                        <p class="app-title" slot="title">表单设置</p>
                        <ul>
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
                    </Card>
                    </Col>
                    <Col span="6">
                    <Card class="app-body-card">
                        <p class="app-title" slot="title">工作流设置</p>
                        <ul>
                            <li>
                                <b class="app-setting-dot">●</b>
                                <a>一般工作流图</a>
                            </li>
                            <li>
                                <b class="app-setting-dot">●</b>
                                <a @click="showWorkFlowModal">工作流设置</a>
                            </li>
                        </ul>
                    </Card>
                    </Col>
                    <Col span="6">
                    <Card class="app-body-card">
                        <p class="app-title" slot="title">报表设置</p>
                        <ul>
                            <li>
                                <b class="app-setting-dot">●</b>
                                <a>对象查阅项</a>
                            </li>
                            <li>
                                <b class="app-setting-dot">●</b>
                                <a>报表权限</a>
                            </li>
                        </ul>
                    </Card>
                    </Col>
                    <Col span="6">
                    <Card class="app-body-card">
                        <p class="app-title" slot="title">相关应用设置</p>
                        <ul>
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
                                <a @click="showNavModal">导航</a>
                            </li>
                        </ul>
                    </Card>
                    </Col>
                </div>
            </Card>
        </Row>
        <!-- 导航modal -->
        <nav-modal @emitNavModal="emitNavModal" :modalNavStatus="showNav"></nav-modal>
        <!-- 工作流modal -->
        <workflow-modal @emitWorkFlowModal="emitWorkFlowModal" :modalWorkflowStatus="showWorkFlow" :listId="listId"></workflow-modal>
        <!-- 权限modal -->
        <permission-modal :modalPermissionStatus="showPermissionModal" :appListId="listId" @emitPermissionModal="emitPermissionModal"></permission-modal>
    </div>
</template>

<script>
import PermissionModal from './permission/permissionModal';
import WorkflowModal from './modal/workflowModal';
import NavModal from './modal/navigationModal'

export default {
  name: "appSetting",
  components: {
      PermissionModal,
      WorkflowModal,
      NavModal
  },
  props: ["listId"],
  data() {
    return {
      showPermissionModal: false,
      showWorkFlow: false,
      showNav: false
    };
  },
  methods: {
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
        window.open('Form/index.html?viewDesign=true&list='+this.listId);
    }
  },
  mounted() {
    
  }
};
</script>

