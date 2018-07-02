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
                height: 150px;
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
                <p class="app-name" slot="title">
                    应用设置
                </p>
                <a href="#" slot="extra"></a>
                <div class="app-body">
                    <Col span="4">
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
                            </ul>
                        </Card>
                    </Col>
                    <Col span="4">
                        <Card class="app-body-card">
                            <p class="app-title" slot="title">工作流设置</p>
                            <ul>
                                <li>
                                    <b class="app-setting-dot">●</b>
                                    <a>一般工作流图</a>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span="4">
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
                    <Col span="4">
                        <Card class="app-body-card">
                            <p class="app-title" slot="title">相关应用设置</p>
                            <ul>
                                <li>
                                    <b class="app-setting-dot">●</b>
                                    <a>数据权限设置</a>
                                </li>
                                <li>
                                    <b class="app-setting-dot">●</b>
                                    <a>归属业务单元</a>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
export default {
  name: "appSetting",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

