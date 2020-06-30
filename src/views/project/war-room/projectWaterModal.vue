<style lang="less" scoped>
    
</style>

<template>
    <div class="profit">
        <Modal 
            v-model="showProjectWater" 
            width="800" 
            footer-hide
            :styles="{top: '15px'}" 
            :title="modalTitle">
            <Table 
              border
              size="small"
              height="400"
              :columns="columns" 
              :data="data">
              <template slot-scope="{ row }" slot="dr">
                    <span>{{ row.dr | toThousandFilter }}</span>
              </template>
              <template slot-scope="{ row }" slot="cr">
                    <span>{{ row.cr | toThousandFilter }}</span>
              </template>
            </Table>
            <div style="overflow:hidden;margin:10px;">
              <div style="float: right;">
                <Page 
                  :total="total" 
                  :current="currentPage" 
                  :page-size="pageSize" 
                  @on-change="onPageChange" 
                  size="small" show-total></Page>
              </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getProjectProfitWater,getProjectDistributiveProfitWater } from "@/services/projectService.js";
import { toThousandFilter } from "@/utils/utils";

export default {
  name: "ProjectWaterModal",
  components: {},
  data() {
    return {
      loading: false,
      showProjectWater: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      columns: [
        {
            title: "实例编码",
            key: "transCode",
            width: 150,
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    href: "/Form/index.html?data=" + params.row.transCode,
                    target: "_blank"
                  }
                },
                params.row.transCode
              );
            }
          },
          {
            title: "生效时间",
            width: 150,
            key: "effectiveTime"
          },
          {
            title: "应用名称",
            key: "appTitle"
          },
          {
            title: "增加金额",
            slot: "dr",
            align: 'right'
          },
          {
            title: "减少金额",
            slot: "cr",
            align: 'right'
          }
      ],
      data: []
    };
  },
  props: {
    modalTitle: {
      type: String,
      default: "流水"
    },
    waterType: {
      type: String,
      default: 'L'
    },
    objCode: {
      type: String,
      default: ""
    }
  },
  watch: {
    showProjectWater: function(value){
      if(value){
        this.start = 0;
        this.currentPage = 1;
        this.getProjectWaterData();
      } 
    }
  },
  methods: {
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.start = (currentPage - 1) * this.pageSize;
        this.getProjectWaterData();
      },
      getProjectWaterData(){
        let request = getProjectProfitWater,
            params = {
              transCode: this.$route.params.transCode,
              classify: this.modalTitle,
              start: this.start,
              page: this.currentPage,
              limit: this.pageSize
            }
        if(this.waterType === 'Z'){
          request = getProjectDistributiveProfitWater;
          params.objCode = this.objCode;
        } 
        request(params).then(res => {
          this.total = res.dataCount || res.count;
          this.data = res.tableContent || res.data;
        })
      }
  },
  mounted() {
    
  }
};
</script>
