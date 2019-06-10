<style lang="less" scoped>
    .performance{
      &-detail{
        width: 30%;
        margin: 0 auto;
        padding: 0px 50px;
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
        <Modal v-model="showAccountDetail" width="700" :title="`员工绩效分析-${modalTitle}`">
            <Table 
              border
              size="small"
              height="400"
              :loading="modalLoading"
              :columns="modalColumns" 
              :data="modalData">
              <div slot="footer">
                <b :style="{float:'right',marginRight:'35px'}">{{`合计：${modalSum}`}}</b>
              </div>
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { getPerformanceData, getPerformanceDetail } from "@/services/addressBookService.js";

export default {
  name: "PerformanceAnalysis",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      loading: false,
      modalLoading: false,
      showAccountDetail: false,
      modalTitle: '',
      modalSum: 0,
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
      performanceData: [],
      modalColumns: [
          {
            title: "日期",
            key: "crtTime",
            width: 150
          },
          {
            title: "交易号",
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
            title: "应用名称",
            key: "appName"
          },
          {
            title: "金额",
            key: "workBenefit",
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
          this.modalLoading = true;
          getPerformanceDetail(this.userId,row.performanceType).then(res => {
            if(res.success){
              this.modalData = res.obj;
              res.obj.length > 0 ? this.modalSum = row.account : this.modalSum = 0;
              this.modalLoading = false;
            }
          })
      },
    //获取绩效分析数据
    getPerformanceData() {
      if(this.userId){
        this.loading = true;
        getPerformanceData(this.userId).then(res => {
          if(res.success){
            this.performanceData = this.createPerformanceData(res.obj);
            this.loading = false;
          }
        })
      }
    },
    createPerformanceData(data) {
      let performanceData = [];
      performanceData = [
          {performanceType:'计件绩效',account:data[0].pieceBenefit},
          {performanceType:'工时绩效',account:data[0].workBenefit},
          {performanceType:'销售佣金绩效',account:data[0].saleBenefit},
          {performanceType:'项目利润分配',account:data[0].projectBenefit},
          {performanceType:'组织利润分配',account:data[0].groupBenefit}
      ];
      return performanceData;
    }
  },
  mounted() {
    this.getPerformanceData();
  }
};
</script>
