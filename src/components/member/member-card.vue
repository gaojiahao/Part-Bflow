<style lang="less" scoped>
    @import './member-card.less';
</style>

<template>
  <div class="card">
      <Row>
          <Col span="8" class="card-left">
            <img :src="imgSrc"/>
          </Col>
          <Col span="16" class="card-right">
            <slot name="card-right"></slot>
            <!-- <Tag class="card-right-tag" color="green">{{ cardSatus===0?'使用中':'停用'}}</Tag>
            <h3 class="card-right-top">{{ cardTop }}</h3>
            <div class="card-right-middle">{{ cardMiddle }}</div>
            <div class="card-right-middle">{{ cardBottom }}</div> -->
          </Col>
      </Row>
  </div>
</template>

<script>
export default {
  props: {
      imgSrc: {
          type: String,
          default: '../../resources/images/icon/0_0.png'
      }
  },
  data() {
    return {
    };
  }
};
</script>
