<template>
  <row class="menu-field-set" :gutter="16">
    <label>{{menuItem.text}}</label>

    <Col span="4" v-for="(item,j) in menuItem.children" :key="j" >
      <menu-item :appinfo="item" :allTaskCount="allTaskCount"></menu-item>
    </Col>

  </row>
</template>

<script>
import MenuItem from "./MenuItem";

export default {
  name:'MenuList',

  props: ["menuItem", "allTaskCount"],

  components: {
    MenuItem
  },
  created() {}
};
</script>

<style lang ='less' scoped>
@card-text-font-size:16px;

@media screen and (max-width: 646px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 320px !important;
    padding: unset !important;
  }
}

@media screen and (min-width: 647px) and (max-width: 808px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 240px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 809px) and (max-width: 1023px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1466px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1467px) and (max-width: 1680px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 250px !important;
    margin-right: 10px;
    padding: unset !important;
  }
}

@media screen and (min-width: 1680px) {
  .ivu-col-span-4 {
    display: block !important;
    width: 240px !important;
    margin-right: 10px;
    padding: unset !important;
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
