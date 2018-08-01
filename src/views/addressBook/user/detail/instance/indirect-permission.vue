<style lang="less">
    .indirect{
      &-detail{
        background-color: #fff;
        margin: 5px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 40px #ddd;
      }
  }
</style>

<template>
    <div class="indirect">
        <div class="indirect-detail" id="indirectHeight">
            <Table ref="selection" :columns="columns" :loading="loading" :data="indirPermissionData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page :total="total" :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getIndirectPermissionData } from "@/services/addressBookService.js";

export default {
  name: "indirectPermission",
  components: {},
  props: {},
  data() {
    return {
      clientHeight: document.body.clientHeight,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "权限来源",
          key: "origin"
        }
      ],
      indirPermissionData: []
    };
  },
  methods: {
    //获取间接权限数据
    getIndirPermissionData() {
      this.loading = true;
      getIndirectPermissionData(15383,this.pageSize,this.currentPage).then(res => {
        this.indirPermissionData = res;
        this.total = res.length;
        this.loading = false;
      })
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getIndirPermissionData();
    }
  },
  mounted() {
    let relHeight = document.body.clientHeight-190;
    this.getIndirPermissionData();
    document.getElementById('indirectHeight').style.minHeight = relHeight+'px';
  }
};
</script>
