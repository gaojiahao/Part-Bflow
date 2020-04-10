<style lang="less" scoped>
  .profit{
      width: 30%;
      margin: 0 auto;
  }
</style>

<template>
    <div class="profit">
        <div class="profit-detail">
            <Table 
              size="small"
              stripe
              border
              :columns="columns" 
              :loading="loading" 
              :data="profitData">
              <template slot-scope="{ row, index }" slot="account">
                  <span v-if="index < 2 || row.project === '可分配利润'">{{ row.account }}</span>
                  <a v-else  @click="showModal(row)">{{ row.account }}</a>
              </template>
            </Table>
        </div>
        <!-- 流水modal -->
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
import { getOrgDistributableProfit, getDistributableProfitDetail } from "@/services/addressBookService.js";
import { toThousandFilter } from "@/utils/utils";

export default {
  name: "DistributableProfit",
  components: {},
  props: {},
  data() {
    return {
      groupId: this.$route.params.groupId,
      loading: true,
      showAccountDetail: false,
      modalTitle: "",
      columns: [
        {
          title: "项目",
          key: "project"
        },
        {
          title: "金额",
          slot: "account",
          align: 'right'
        }
      ],
      profitData: [],
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
    //获取可分配利润数据
    getDistributableProfitData() {
      if(this.groupId){
        this.loading = true;
        getOrgDistributableProfit(this.groupId).then(res => {
          this.profitData = this.createData(res.tableContent[0]);
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    showModal (row) {
        this.showAccountDetail = true;
        this.modalTitle = row.project || "流水";

        getDistributableProfitDetail(this.groupId, row.project).then(res => {
          this.modalData = res.tableContent;
        });
    },
    createData(res) {
      let result = [];
      result = [
        {project: '结转利润',account: res.carryOverProfit || 0},
        {project: '已分配利润',account: res.distributedProfit || 0},
        {project: '未分配利润',account: res.notDistributedProfit || 0},
        {project: '组织存货',account: res.orgStock || 0},
        {project: '组织应收款',account: res.orgReceived || 0},
        {project: '组织应付款',account: res.orgPayable || 0},
        {project: '可分配利润',account: res.distributableProfit || 0}
      ];
      return result;
    }
  },
  mounted() {
    this.getDistributableProfitData();
    this.loading = false;
  }
};
</script>
