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
  </div>
</template>

<script>

export default {
  name: "detail",
  components: {
  },
  props: {
  },
  data() {
    return {
      
    };
  },
  created() {},
  methods: {
      
  },
  mounted() {
  }
};
</script>
