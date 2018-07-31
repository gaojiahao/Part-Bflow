<style lang="less" scoped>
@import './details.less';
</style>

<template>
  <div class="detail">
    <Row class="detail-header">
      <Breadcrumb class="detail-header-bread">
        <BreadcrumbItem to="/addressBook/users">张晓</BreadcrumbItem>
        <BreadcrumbItem>rfd125</BreadcrumbItem>
      </Breadcrumb>
      <Tag class="detail-header-status" color="red">使用中</Tag>
    </Row>
    <Row class="detail-header">
      <Button>返回</Button>
      <div class="detail-header-icon">
        <Icon class="detail-header-icon-back" type="ios-arrow-back" />
        <Icon type="ios-arrow-forward" />
      </div>
    </Row>
    <div class="detail-tabs">
      <Tabs value="name1">
        <TabPane label="用户信息" name="name1">标签一的内容</TabPane>
        <TabPane label="上级用户" name="name2">标签二的内容</TabPane>
        <TabPane label="下级用户" name="name3">标签三的内容</TabPane>
        <TabPane label="部门" name="name1">标签一的内容</TabPane>
        <TabPane label="职位" name="name2">标签二的内容</TabPane>
        <TabPane label="直接权限" name="name3">标签三的内容</TabPane>
        <TabPane label="间接权限" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  components: {},
  props: {},
  data() {
    return {
    };
  },
  created() {},
  methods: {
  },
  mounted() {}
};
</script>
