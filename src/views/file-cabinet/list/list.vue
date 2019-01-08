<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="file">
        <div class="toolbar">
            <span>分区</span>
            <Button class="toolbar-btn">新建分区</Button>
        </div>
        <div class="subarea">
            <Table :columns="columns" :data="data" disabled-hover>
                <template slot-scope="{ row }" slot="name">
                    <Icon class="subarea-icon" type="ios-grid" />
                    <strong>{{ row.name }}</strong>
                    <Icon class="subarea-more" type="ios-arrow-dropright-circle" />
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
import {  } from "@/services/workGuideService.js";

export default {
  name: "fileCabinetList",
  data() {
    return {
      columns: [
          {
          title: "名称",
          slot: 'name'
        },{
          title: "权限",
          key: "content",
          width: 400
        },{
          title: "管理员",
          key: "menderName"
        },{
          title: "时间",
          key: "time"
        }
      ],
      data: [{name:'全员分区',content:'仅浏览',menderName:'merry',time:'17/7/27'}]
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

