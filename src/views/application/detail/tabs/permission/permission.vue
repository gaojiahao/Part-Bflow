<style lang="less" scoped>
    @import './permission.less';
</style>

<template>
  <div class="app-permission">
    <!-- 动作管理 -->
    <action-manage></action-manage>
  </div>
</template>

<script>
import ActionManage from './action/action';

export default {
  name: "permissionSource",
  components: {
    ActionManage
  },
  props: {
    listId: String
  },
  data() {
    return {
    };
  }
};
</script>

