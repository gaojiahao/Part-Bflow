<style lang="less" scoped>
    
</style>

<template>
    <div class="profit">
        <Modal 
            v-model="showObjWater" 
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
        <project-water-modal 
          ref="projectWaterModal" 
          :modalTitle="modalTitle" 
          :waterType="waterType"
          :objCode="objCode">
        </project-water-modal>
    </div>
</template>

<script>
import { getProjectDistributiveProfitObjBalance } from "@/services/projectService.js";
import { toThousandFilter } from "@/utils/utils";
import ProjectWaterModal from "./projectWaterModal";

export default {
  name: "ProjectObjWaterModal",
  components: {
    ProjectWaterModal
  },
  data() {
    return {
      loading: false,
      showObjWater: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      waterType: "Z",
      objCode: "",
      columns: [
        {
            title: "对象编码",
            key: "objCode"
          },
          {
            title: "对象名称",
            key: "objName"
          },
          {
            title: "对象余额",
            key: "amount",
            render: (h, params) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      if(!params.row.amount) return;
                      this.waterType = 'Z';
                      this.objCode = params.row.objCode;
                      this.$refs['projectWaterModal'].showProjectWater = true;
                    }
                  }
                },
                toThousandFilter(params.row.amount)
              );
            }
          }
      ],
      data: []
    };
  },
  props: {
    modalTitle: {
      type: String,
      default: "流水"
    }
  },
  watch: {
    showObjWater: function(value){
      if(value){
        this.start = 0;
        this.currentPage = 1;
        this.getProjectObjWaterData();
      } 
    }
  },
  methods: {
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.start = (currentPage - 1) * this.pageSize;
        this.getProjectObjWaterData();
      },
      getProjectObjWaterData(){
        let params = {
          transCode: this.$route.params.transCode,
          classify: this.modalTitle,
          start: this.start,
          page: this.currentPage,
          limit: this.pageSize
        }
        getProjectDistributiveProfitObjBalance(params).then(res => {
          this.total = res.dataCount;
          this.data = res.tableContent;
        })
      }
  },
  mounted() {
    
  }
};
</script>
