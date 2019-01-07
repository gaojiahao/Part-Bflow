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
  .app-table-search{
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #fff;
      display: inline-block;
      cursor: pointer;
    }
}
</style>

<template>
    <div class="indirect">
        <div class="indirect-detail">
            <div class="app-table-search">
              <Input 
                @on-search="permissionFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索权限名称" 
                style="width: 300px">
              </Input>
              <a @click="permissionFilter" class="app-search-icon">
                <Button type="primary" size="small">查询</Button>
              </a>
            </div>
            <Table 
              ref="selection" 
              :columns="columns" 
              :loading="loading" 
              :data="indirPermissionData">
            </Table>
            <div class="user-page">
                <div style="float: right;padding-bottom: 5px;">
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
      searchValue: "",
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
    getIndirPermissionData(search) {
      if(this.userId){
        this.loading = true;
        getIndirectPermissionData(this.userId,this.pageSize,this.currentPage,search).then(res => {
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
      this.getIndirPermissionData(this.searchValue);
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getIndirPermissionData(this.searchValue);
    },
    //权限过滤
    permissionFilter() {
      this.currentPage = 1;
      this.getIndirPermissionData(this.searchValue);
    }
  },
  mounted() {
    this.getIndirPermissionData();
  }
};
</script>
