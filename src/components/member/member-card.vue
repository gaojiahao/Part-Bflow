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
            <Tag class="card-right-tag" color="green">{{ cardSatus===0?'使用中':'停用'}}</Tag>
            <h3 class="card-right-top">{{ cardTop }}</h3>
            <div class="card-right-middle">{{ cardMiddle }}</div>
            <div class="card-right-middle">{{ cardBottom }}</div>
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
      },
      cardSatus: {
          type: Number,
          default: 0
      },
      cardTop: {
          type: String,
          default: '工程部'
      },
      cardMiddle: {
          type: String,
          default: '事业部'
      },
      cardBottom: {
          type: String,
          default: '谭国正'
      }
  },
  data() {
    return {
    };
  }
};
</script>
