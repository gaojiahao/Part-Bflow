<style lang="less" scoped>
    .profit{
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
    <div class="profit">
        <div class="profit-detail">
            <Table 
              border
              stripe
              size="small"
              :columns="columns" 
              :loading="loading" 
              :data="performanceData">
              <template slot-scope="{ row }" slot="project">
                    <span v-if="row.isChild" :style="{paddingLeft:'15px'}">{{ row.project }}</span>
                    <b v-else>{{ row.project }}</b>
              </template>
              <template slot-scope="{ row }" slot="account">
                    <a v-if="row.isChild" @click="showModal(row)">{{ row.account | toThousandFilter }}</a>
                    <span v-else>{{ row.account | toThousandFilter }}</span>
              </template>
            </Table>
        </div>
        <!-- 项目modal -->
        <Modal v-model="showAccountDetail" width="800" :title="modalTitle">
            <Table 
              border
              size="small"
              height="400"
              :columns="modalColumns" 
              :data="modalData">
              <template slot-scope="{ row }" slot="dr">
                    <span>{{ row.dr | toThousandFilter }}</span>
              </template>
              <template slot-scope="{ row }" slot="cr">
                    <span>{{ row.cr | toThousandFilter }}</span>
              </template>
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { getTeamProfitData,getTeamProfitDetail } from "@/services/addressBookService.js";

export default {
  name: "TeamProfit",
  components: {},
  props: {
    groupId: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      showAccountDetail: false,
      modalTitle: '',
      columns: [
        {
          title: "项目",
          slot: "project"
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
      modalData: []
    };
  },
  methods: {
      showModal (row) {
          this.showAccountDetail = true;
          this.modalTitle = row.project;
          getTeamProfitDetail(this.groupId,row.project).then(res => {
            if(res.success){
              this.modalData = res.obj.data;
            }
          })
      },
    //获取绩效分析数据
    getPerformanceData() {
      if(this.groupId){
        this.loading = true;
        getTeamProfitData(this.groupId).then(res => {
          if(res.success){
            this.performanceData = this.createProfitData(res.obj);
            this.loading = false;
          }
        })
      }
    },
    createProfitData(data) {
      const profitData = [
        {project: '收入(小计)',account: data.income.incomeSum},
        {project: '销售收入',account: data.income.groupIncome,isChild: true},
        {project: '任务收入',account: data.income.taskIncome,isChild: true},
        {project: '其他收入',account: data.income.otherIncome,isChild: true},
        {project: '成本(小计)',account: data.productsCost.productsCostSum},
        {project: '标准用料',account: data.productsCost.material,isChild: true},
        {project: '直接人工',account: data.productsCost.artificial,isChild: true},
        {project: '制造费用',account: data.productsCost.madeCost,isChild: true},
        {project: '外部服务采购',account: data.productsCost.outsideServerPurchase,isChild: true},
        {project: '内部服务采购',account: data.productsCost.insideServerPurchase,isChild: true},
        {project: '费用(小计)',account: data.cost.costSum},
        {project: '超标用料',account: data.cost.overProof,isChild: true},
        {project: '报销费用',account: data.cost.claimingExpenses,isChild: true},
        {project: '资金费用',account: data.cost.fundCost,isChild: true},
        {project: '设备改造',account: data.cost.facilityReform,isChild: true},
        {project: '佣金',account: data.cost.commission,isChild: true},
        {project: '税金',account: data.cost.taxAmount,isChild: true},
        {project: '手续费',account: data.cost.transferCharge,isChild: true},
        {project: '利润额',account: data.profit},
        {project: '利润率',account: data.profitRate}
      ];
      return profitData;
    }
  },
  mounted() {
    this.getPerformanceData();
  }
};
</script>
