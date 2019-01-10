<style  lang="less" scoped>
    .file-header{
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        line-height: 50px;
        padding: 0 18px;
        span{
            font-size: 16px;
            font-weight: bold;
        }
        .file-search{
            float: right;
        }
    }
</style>
<template>
    <div>
        <div class="file-header">
            <span>文件柜</span>
            <!-- <div class="file-search">
              <Input 
                @on-search="fileFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索" 
                style="width: 300px">
              </Input>
            </div> -->
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {  } from "@/services/workGuideService.js";

export default {
  name: "fileLayout",
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
      fileFilter() {}
  },
  mounted() {
  }
};
</script>