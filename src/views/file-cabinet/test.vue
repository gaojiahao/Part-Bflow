<style lang="less" scoped>
    .parent{
        height:200px;
        border: 1px solid #ddd;
        display: table-cell;
        vertical-align: middle;
        .son{
            width:50px;
            height:50px;
            background-color: #39f;
        }
    }
</style>

<template>
    <div class="parent">
      <div class="son"></div>
    </div>
</template>

<script>

export default {
  name: "test",
  data() {
    return {};
  }
};
</script>

