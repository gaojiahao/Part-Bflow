<style lang="less" scoped>
    .performance{
      &-detail{
        width: 30%;
        margin: 0 auto;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        position: relative;
      }
  }
</style>

<template>
    <div class="performance">
        <div class="performance-detail">
            <Table 
              border
              stripe
              size="small"
              :columns="columns" 
              :loading="loading" 
              :data="performanceData">
              <template slot-scope="{ row }" slot="account">
                    <a @click="showModal(row)">{{ row.account }}</a>
              </template>
            </Table>
        </div>
        <!-- 绩效分析modal -->
        <Modal v-model="showAccountDetail" :title="`员工绩效分析-${modalTitle}`">
            <Table 
              border
              :columns="modalColumns" 
              :data="modalData">
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import {  } from "@/services/addressBookService.js";

export default {
  name: "PerformanceAnalysis",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      loading: false,
      showAccountDetail: false,
      modalTitle: '',
      columns: [
        {
          title: "绩效类型",
          key: "performanceType"
        },
        {
          title: "金额",
          slot: "account",
          align: 'right'
        }
      ],
      performanceData: [
          {performanceType:'计件绩效',account:1050},
          {performanceType:'工时绩效',account:200},
          {performanceType:'销售佣金绩效',account:209},
          {performanceType:'项目利润分配',account:30000},
          {performanceType:'组织利润分配',account:0}
      ],
      modalColumns: [
          {
            title: "日期",
            key: "performanceType",
            align: 'right'
          },
          {
            title: "交易号",
            slot: "transCode"
          },
          {
            title: "应用名称",
            slot: "appName"
          },
          {
            title: "金额",
            slot: "account",
            align: 'right'
          }
      ],
      modalData: []
    };
  },
  methods: {
      showModal (row) {
          this.showAccountDetail = true;
          this.modalTitle = row.performanceType;
      },
    //获取绩效分析数据
    getPerformanceData() {
    //   if(this.userId){
    //     this.loading = true;
    //     getWorkFlowTaskByUserId(this.userId,this.currentPage,this.pageSize).then(res => {
    //       this.worlflowTaskData = res.tableContent;
    //       this.total = res.dataCount;
    //       this.loading = false;
    //     })
    //   }else{
    //       this.loading = false;
    //   }
    },
  },
  mounted() {
    this.getPerformanceData();
  }
};
</script>
