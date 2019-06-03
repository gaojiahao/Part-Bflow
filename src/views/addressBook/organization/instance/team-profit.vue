<style lang="less" scoped>
    .profit{
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
                    <a v-if="row.isChild" @click="showModal(row)">{{ row.account }}</a>
                    <span v-else>{{ row.account }}</span>
              </template>
            </Table>
        </div>
        <!-- 项目modal -->
        <Modal v-model="showAccountDetail" :title="modalTitle">
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
      performanceData: [
          {project:'收入(小计)',account:1050},
          {project:'销售收入',account:200,isChild: true},
          {project:'项目任务收入',account:209,isChild: true},
          {project:'其他收入',account:30000,isChild: true},
          {project:'成本(小计)',account:0},
          {project:'标准用料',account:209,isChild: true},
          {project:'直接人工',account:30000,isChild: true}
      ],
      modalColumns: [
          {
            title: "实例编码",
            key: "performanceType",
            align: 'right'
          },
          {
            title: "生效时间",
            slot: "transCode"
          },
          {
            title: "应用名称",
            slot: "appName"
          },
          {
            title: "增加金额",
            slot: "addAccount",
            align: 'right'
          },
          {
            title: "减少金额",
            slot: "minusAccount",
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
