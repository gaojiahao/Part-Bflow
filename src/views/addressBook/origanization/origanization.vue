<style lang="less">
.origanization-wrap {
  background-color: #fff;
  width: 100%;
  height: 800px;

  &-header {
    height: 44px;
    line-height: 44px;
    width: 100%;
    padding: 0 15px;
    border-bottom: 1px solid #e8e8e8;

    h2 span:first-child {
      color: red;
    }
  }

  &-action {
    height: 44px;
    line-height: 44px;
    width: 100%;
    padding: 0 15px;
    border-bottom: 1px solid #e8e8e8;
  }

  &-tabs{
      .ivu-tabs-nav{
          float: right !important;
      }
  }
}
</style>


<template>
    <div class="origanization-wrap">
        <header class="origanization-wrap-header">
            <h2>
                <span>管理员</span>
                <span>/岗位/</span>
                <span>001</span>
            </h2>
        </header>
        <div class="origanization-wrap-action">
            <Button type="success">编辑</Button>
            <Button type="success">删除</Button>
            <Button type="success">保存</Button>
        </div>

        <div class="origanization-wrap-tabs">
            <Tabs value="baseinfo">
                <TabPane label="基本信息" name="baseinfo">基本信息</TabPane>
                <TabPane label="成员信息" name="memberinfo">成员信息</TabPane>
                <TabPane label="权限" name="permission">权限</TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
export default {};
</script>
