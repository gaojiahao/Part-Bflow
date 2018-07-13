<template>
  <row class="menu-field-set" :gutter="16">
    <label>{{menuItem.text}}</label>

    <Col span="4" v-for="(item,j) in menuItem.children" :key="j" >
    <card-item :appinfo="item" :allTaskCount="allTaskCount">
    </card-item>
    </Col>

  </row>
</template>

<script>
import CardItem from "@/components/card/CardItem";

export default {
  props: ["menuItem", "allTaskCount"],

  components: {
    CardItem
  },
  created() {}
};
</script>

<style lang ='less' scoped>
@import './common.less';


@media screen and (max-width: 521px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 90% !important;
  }
}

@media screen and (min-width: 522px) and (max-width: 780px) {
  .ivu-col-span-4 {
    display: block !important;
     width: 50% !important;
  }
}

@media screen and (min-width: 781px) and (max-width: 1023px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 33.333333% !important;
  }
}


@media screen and (min-width:1024px) and (max-width: 1466px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 25% !important;
  }
}

@media screen and (min-width:1467px) and (max-width:1680px) {
   .ivu-col-span-4 {
    display: block !important;
    width: 20% !important;
  }
}

.menu-field-set {
  margin-left: 0px !important;
  margin-right: 0px !important;

  label {
    display: block;
    margin-left: 1%;
    color: #333;
    font-size: 16px;
  }

  .menu-box {
    .menu-item {
      overflow: hidden;
      padding-bottom: 2%;
    }
  }
}
</style>
