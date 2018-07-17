<style lang="less" scoped>
.app-permission {
  float: left;
  width: 100%;
  border-top-style: none;
  padding-bottom: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  .app-des{
      span{
          color: #918d8d;
          padding-left: 6px;
      }
  }
  .app-action{
      margin-top: 10px;
      b{
          font-size: 14px;
      }
      .action-manage{
          padding-left: 74px;
      }
  }
  .app-view{
      margin-top: 10px;
      b{
          font-size: 14px;
      }
  }
}
.setting-permission{
    font-size: 14px;
    font-weight: bold;
}
</style>

<template>
  <div class="app-permission">
    <Row class="app-des">
        <span>说明：黑、白名单，只能设置其一，如果都空着，表示所有用户都有权限</span>
    </Row>
    <Row class="app-action">
        <Row>
            <b>动作管理：</b>
            <a class="setting-permission">设置权限</a>
        </Row>
        <Row>
            <div class="action-manage" v-for="(list,index) of actionData" :key="index">
                <b>{{ list.action }}</b>
                <a>{{ list.status }}</a>
                <span>{{ list.desc }}</span>
            </div>
        </Row>
    </Row>
    <Row class="app-view">
        <Row>
            <b>报表视图：</b>
            <a class="setting-permission">设置权限</a>
            <a class="setting-permission" style="margin-left:10px;">新增</a>
        </Row>
        <Row>
            
        </Row>
    </Row>
  </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "permissionSource",
  components: {
    
  },
  props: {
    listId: String
  },
  data() {
    return {
       actionData: [{action:'新增',status: '启用',desc: '如果被禁用，用户将无法创建实例数据的入口'},
                    {action:'删除',status: '启用',desc: '如果被禁用，用户将无法创建实例数据的入口'},
                    {action:'修改',status: '禁用',desc: '如果被禁用，用户将无法创建实例数据的入口'},
                    {action:'查看',status: '启用',desc: '如果被禁用，用户将无法创建实例数据的入口'},
                    {action:'撤销',status: '禁用',desc: '如果被禁用，用户将无法创建实例数据的入口'},
                    {action:'打印',status: '禁用',desc: '如果被禁用，用户将无法创建实例数据的入口'}] 
    };
  },
  methods: {
    
  },
  created() {
    
  },
  mounted() {}
};
</script>

