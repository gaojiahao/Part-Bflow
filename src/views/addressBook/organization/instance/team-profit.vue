<style lang="less" scoped>
    .profit{
      width: 80%;
      margin: 0 auto;
      padding: 0px 50px;
      box-shadow: 0px 1px 10px #ddd;
      position: relative;
      background-color: #fff;
      &-detail{
        padding: 15px 0px;
        .profit-date{
          margin-bottom: 5px;
        }
      }
  }
</style>

<template>
    <div class="profit">
        <div class="profit-detail">
            <div class="profit-date">
              开始：<DatePicker 
                      type="month" 
                      @on-change="onStartDateChange"
                      v-model="startDate" 
                      placeholder="请选择月份" 
                      style="width: 100px"></DatePicker>
              截至：<DatePicker 
                      type="month" 
                      @on-change="onEndDateChange" 
                      v-model="endDate" 
                      placeholder="请选择月份" 
                      style="width: 100px"></DatePicker>
            </div>
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
              <template slot-scope="{ row }" slot="profitSum">
                    <a v-if="row.isChild" @click="showModal(row)">{{ row.profitSum | toThousandFilter }}</a>
                    <span v-else>{{ row.profitSum | toThousandFilter }}</span>
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
import { toThousandFilter, getLastDay, getPreMonthDay } from "@/utils/utils";

export default {
  name: "TeamProfit",
  components: {},
  props: {
    // groupId: {
    //   type: String
    // }
  },
  data() {
    return {
      loading: false,
      showAccountDetail: false,
      modalTitle: "",
      startDate: "",
      endDate: new Date(),
      columns: [],
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
      onStartDateChange (date, dateType) {
        date && (this.startDate = new Date(date));
        if(this.startDate && this.endDate){
          if(this.startDate <= this.endDate){
            this.getPerformanceData(this.startDate,this.endDate);
          }else{
            this.$Message.error({
              content:'请重新选择开始日期或截止日期，截止日期应大于等于开始日期！',
              duration: 3
            });
          }
        }
      },
      onEndDateChange (date, dateType) {
        date && (this.endDate = new Date(date));
        if(this.startDate && this.endDate){
          if(this.startDate <= this.endDate){
            this.getPerformanceData(this.startDate,this.endDate);
          }else{
            this.$Message.error({
              content:'请重新选择开始日期或截止日期，截止日期应大于等于开始日期！',
              duration: 3
            });
          }
        }
      },
      createColumns (startDate, endDate) {
        let resultColumns = [],
            startYear = new Date(startDate).getFullYear(),
            endYear = new Date(endDate).getFullYear(),
            startMonth = new Date(startDate).getMonth(),
            endMonth = new Date(endDate).getMonth();
        if(endYear - startYear > 0){
          let viewYear = startYear;
          for(let i=0;i<=endYear - startYear;i++){
            if(viewYear === endYear){
              let viewMonth = 1;
              for(let k=0;k<endMonth+1;k++){
                let viewText = `${viewYear}年${viewMonth<=9?"0"+viewMonth:viewMonth}月`,
                    currentYear = `${viewYear}`,
                    currentMonth = `${viewMonth}`;
                resultColumns.push({
                  title: `${viewYear}年${viewMonth}月`,
                  key: viewText,
                  width: 150,
                  align: 'right',
                  render: (h, params) => {
                    let realText = toThousandFilter(params.row[viewText]);
                    if(params.row.isChild){
                      return h('a',{
                        on: {
                          click: () => {
                            this.showModal(params.row,currentYear,currentMonth);
                          }
                        }
                      },realText);
                    }else{
                      return h('span',{},realText)
                    }
                  }
                });
                viewMonth++;
              }
            }else{
              if(i===0){
                let viewMonth = startMonth;
                for(let k=0;k<12-startMonth;k++){
                  let viewText = `${viewYear}年${viewMonth+1<=9?"0"+(viewMonth+1):viewMonth+1}月`,
                      currentYear = `${viewYear}`,
                      currentMonth = `${viewMonth+1}`;
                  resultColumns.push({
                    title: `${viewYear}年${viewMonth+1}月`,
                    key: viewText,
                    width: 150,
                    align: 'right',
                    render: (h, params) => {
                      let realText = toThousandFilter(params.row[viewText]);
                      if(params.row.isChild){
                        return h('a',{
                          on: {
                            click: () => {
                              this.showModal(params.row,currentYear,currentMonth);
                            }
                          }
                        },realText);
                      }else{
                        return h('span',{},realText)
                      }
                    }
                  });
                  viewMonth++;
                }
              }else{
                let viewMonth = 1;
                for(let k=0;k<12;k++){
                  let viewText = `${viewYear}年${viewMonth<=9?"0"+viewMonth:viewMonth}月`,
                      currentYear = `${viewYear}`,
                      currentMonth = `${viewMonth}`;
                  resultColumns.push({
                    title: `${viewYear}年${viewMonth}月`,
                    key: viewText,
                    width: 150,
                    align: 'right',
                    render: (h, params) => {
                      let realText = toThousandFilter(params.row[viewText]);
                      if(params.row.isChild){
                        return h('a',{
                          on: {
                            click: () => {
                              this.showModal(params.row,currentYear,currentMonth);
                            }
                          }
                        },realText);
                      }else{
                        return h('span',{},realText)
                      }
                    }
                  });
                  viewMonth++;
                }
              }
            }
            viewYear++;
          }
        }else{
          if(startMonth === endMonth){
            resultColumns = [];
          }else{
            let viewMonth = startMonth;
            for(let i=-1;i<endMonth-startMonth;i++){
              let viewText = `${startYear}年${viewMonth+1<=9?"0"+(viewMonth+1):viewMonth+1}月`,
                  currentYear = `${startYear}`,
                  currentMonth = `${viewMonth+1}`;
              resultColumns.push({
                title: `${startYear}年${viewMonth+1}月`,
                key: viewText,
                width: 150,
                align: 'right',
                render: (h, params) => {
                  let realText = toThousandFilter(params.row[viewText]);
                    if(params.row.isChild){
                      return h('a',{
                        on: {
                          click: () => {
                            this.showModal(params.row,currentYear,currentMonth);
                          }
                        }
                      },realText);
                    }else{
                      return h('span',{},realText)
                    }
                  }
              });
              viewMonth++;
            }
          }
        }
        resultColumns.length > 0 && resultColumns.push({title: "汇总",slot: "profitSum",fixed: 'right',width: 200,align: 'right'});

        return resultColumns;
      },
      //格式化日期方法
    formatDate(currentDate,lastMonthDay) {
      let date = new Date(currentDate),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          lastDay = getLastDay(year,month),
          relDate;
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      lastMonthDay ? relDate = `${year}-${month}-${lastDay}` : relDate = `${year}-${month}`;

      return relDate;
    },
       
    showModal (row,currentYear,currentMonth) {
        let startDate, endDate; 
        this.showAccountDetail = true;
        this.modalTitle = row.project;
        if(currentYear){
          let lastMonthDay = getLastDay(currentYear,currentMonth);
          startDate =  `${currentYear}-${currentMonth<=9?"0"+currentMonth:currentMonth}-01`;
          endDate =  `${currentYear}-${currentMonth<=9?"0"+currentMonth:currentMonth}-${lastMonthDay}`;
        }else{
          startDate =  `${this.formatDate(this.startDate)}-01`;
          endDate =  this.formatDate(this.endDate,true);
        }
        getTeamProfitDetail(this.groupId,row.project,startDate,endDate).then(res => {
          if(res.success){
            this.modalData = res.obj.data;
          }
        })
    },
    //获取绩效分析数据
    getPerformanceData(startDate,endDate) {
      let createColumn = [];
      if(this.groupId){
        this.loading = true;
        createColumn = this.createColumns(startDate,endDate);
        if(createColumn.length > 0){
            createColumn.unshift({
              title: "项目",
              slot: "project",
              width: 150,
              fixed: 'left'
            });
            this.columns = createColumn;
        }
        
        getTeamProfitData(this.groupId,this.formatDate(startDate),this.formatDate(endDate)).then(res => {
          if(res.success){
            this.performanceData = this.createProfitData(res.obj);
            this.loading = false;
          }
        })
      }
    },
    createProfitData(data) {
      let profitData = [
        {project: '收入(小计)',keyone: 'income',key:'incomeSum'},
        {project: '销售收入',keyone: 'income',key:'groupIncome',isChild: true},
        {project: '任务收入',keyone: 'income',key:'taskIncome',isChild: true},
        {project: '其他收入',keyone: 'income',key:'otherIncome',isChild: true},
        {project: '成本(小计)',keyone: 'productsCost',key:'productsCostSum'},
        {project: '标准用料',keyone: 'productsCost',key:'material',isChild: true},
        {project: '直接人工',keyone: 'productsCost',key:'artificial',isChild: true},
        {project: '制造费用',keyone: 'productsCost',key:'madeCost',isChild: true},
        {project: '外部服务采购',keyone: 'productsCost',key:'outsideServerPurchase',isChild: true},
        {project: '费用(小计)',keyone: 'cost',key:'costSum'},
        {project: '工资与福利',keyone: 'cost',key:'wages',isChild: true},
        {project: '超标用料',keyone: 'cost',key:'overProof',isChild: true},
        {project: '报销费用',keyone: 'cost',key:'claimingExpenses',isChild: true},
        {project: '资金费用',keyone: 'cost',key:'fundCost',isChild: true},
        {project: '设备改造',keyone: 'cost',key:'facilityReform',isChild: true},
        {project: '佣金',keyone: 'cost',key:'commission',isChild: true},
        {project: '税金',keyone: 'cost',key:'taxAmount',isChild: true},
        {project: '手续费',keyone: 'cost',key:'transferCharge',isChild: true},
        {project: '利润额',key:'profit'},
        {project: '利润率',key:'profitRate'}
      ];
      profitData.map(p => {
        data.map(k => {
          if(p['keyone']){
            p[k.month] = k[p['keyone']][p['key']];
          }else{
            p[k.month] = k[p['key']];
          }
        })
      });
      if(data.length === 2) {
        this.columns = [
            {
              title: "项目",
              slot: "project",
              fixed: 'left'
            },
            {
              title: "金额",
              slot: 'profitSum',
              align: 'right'
            }
        ];
      }
      return profitData;
    }
  },
  mounted() {
    this.groupId = this.$route.params.groupId;
    let currentHalfMonth = getPreMonthDay(new Date(), 5);
    this.startDate = currentHalfMonth;
    this.getPerformanceData(this.startDate,this.formatDate(this.endDate));
  }
};
</script>
