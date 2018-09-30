<style lang="less" scoped>
    .indirect{
      &-detail{
        background-color: #fff;
        width: 75%;
        margin: 0 auto;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        position: relative;
      }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div class="indirect">
        <div class="indirect-detail" id="indirectHeight">
            <Table 
              ref="selection" 
              :columns="columns" 
              :loading="loading" 
              :data="indirPermissionData">
            </Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page 
                    @on-page-size-change="onPageSizeChange" 
                    :total="total" 
                    show-elevator show-sizer 
                    :current="currentPage" 
                    :page-size="pageSize" 
                    @on-change="onPageChange" 
                    size="small" 
                    show-total>
                  </Page>
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
      userId: this.$route.params.userId,
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
      if(this.userId){
        this.loading = true;
        getIndirectPermissionData(this.userId,this.pageSize,this.currentPage).then(res => {
          this.indirPermissionData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getIndirPermissionData();
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getIndirPermissionData();
    }
  },
  mounted() {
    this.getIndirPermissionData();
  }
};
</script>
