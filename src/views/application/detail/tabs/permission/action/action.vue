<style lang="less" scoped>
    @import './action.less';
</style>

<template>
    <div class="app">
        <!-- <Row class="app-des">
            <span>说明：黑、白名单，只能设置其一，如果都空着，表示所有用户都有权限</span>
        </Row> -->
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>动作</h3>
            </Row>
            <div class="app-action-source">
                <Row class="app-action-source-list">
                    <Col span="6" class="app-action-source-item" v-for="(list,index) of actionData" :key="index">

                        <Col span="2" class="app-action-source-item-check">
                            <Checkbox :value="true"></Checkbox>
                        </Col>

                        <Col span="21" class="app-action-source-item-content">
                            <h3>{{ list.action }}</h3>
                            <div class="app-action-source-item-desc">{{ list.desc }}</div>
                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Table :columns="columns" :data="userSources"></Table>
                    <a @click="showModal" class="app-action-white-list">授权</a>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <action-modal :modalStatis="showActionModal" @emitPermissionModal="emitPermissionModal"></action-modal>
    </div>
</template>

<script>
import {
  getAppResourcesAndAuthoritys
} from "@/services/appService.js";
import ActionModal from './action-modal';

export default {
  name: "permissionSource",
  components: {
    ActionModal
  },
  props: {
    listId: String
  },
  data() {
    return {
      showActionModal: false,
      actionData: [
        {
          action: "新增",
          status: "启用",
          desc: "创建新纪录"
        },
        {
          action: "删除",
          status: "启用",
          desc: "除了应用管理员，仅能删除本人创建的"
        },
        {
          action: "修改",
          status: "禁用",
          desc: "除了应用管理员，仅能删除本人创建的"
        },
        {
          action: "查看",
          status: "启用",
          desc: "默认查看所有记录"
        },
        {
          action: "撤销",
          status: "禁用",
          desc: "把已生效的记录还原成未生效"
        },
        {
          action: "打印",
          status: "禁用",
          desc: "打印表单"
        }
      ],
      columns: [
        {
          title: "已授权用户",
          key: "user"
        },
        {
          title: "动作",
          key: "source"
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h,params) => {
              return h('div',[
                  h('a',{},'删除'),
                  h('span',{
                      style: {
                          height: '20px',
                          borderLeft: '1px solid #39f',
                          margin: '0px 5px'
                      }
                  }),
                  h('a',{},'修改')
              ])
          }
        }
      ],
      userSources: [
        { user: "张三", source: "新增、查看、删除、修改"},
        { user: "采购部", source: "新增、查看、删除"}
      ]
    };
  },
  methods: {
    showModal() {
      this.showActionModal = true;
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getActionData() {
      getAppResourcesAndAuthoritys(this.listId).then(res => {
        console.log(res);
      })
    }
  },
  created() {},
  mounted() {
    this.getActionData();
  }
};
</script>

