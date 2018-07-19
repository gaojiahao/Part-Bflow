<style lang="less" scoped>
    @import './action.less';
</style>

<template>
  <div class="app">
    <Row class="app-des">
        <span>说明：黑、白名单，只能设置其一，如果都空着，表示所有用户都有权限</span>
    </Row>
    <Row class="app-action">
        <Row>
            <b>动作管理：</b>
            <a class="app-action-white-list">添加白名单</a>
            <a class="app-action-white-list">添加黑名单</a>
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
            <a class="app-action-white-list">设置权限</a>
            <a class="app-action-white-list" style="margin-left:10px;">新增</a>
        </Row>
        <Row>
            <div class="view-manage">
                <b>每月销售汇总表</b>
                <a>删除</a>
                <span>每月的销售订单汇总记录</span>
            </div>
            <div class="view-manage">
                <b>我的销售记录</b>
                <a>删除</a>
                <span>当前用户创建的销售订单记录</span>
            </div>
            <div class="view-manage">
                <b>本部门的销售记录</b>
                <a>删除</a>
                <span>当前用户所属部门所有的销售订单记录</span>
            </div>
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

