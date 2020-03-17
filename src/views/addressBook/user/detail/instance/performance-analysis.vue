<style lang="less" scoped>
    .performance{
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
    <div class="performance" ref="performance">
        <div class="performance-detail">
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
              <template slot-scope="{ row }" slot="profitSum">
                    <a @click="showModal(row)">{{ row.profitSum | toThousandFilter }}</a>
              </template>
              <template slot-scope="{ row }" slot="performanceType">
                    <b v-if="row.performanceType === '汇总'">{{ row.performanceType }}</b>
                    <span v-else>{{ row.performanceType }}</span>
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
              <template slot-scope="{ row }" slot="benefit">
                    <span>{{ row.benefit | toThousandFilter }}</span>
              </template>
              <div slot="footer">
                <b :style="{float:'right',marginRight:'35px'}">合计：{{modalSum  | toThousandFilter}}</b>
              </div>
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { getPerformanceData, getPerformanceDetail } from "@/services/addressBookService.js";
import { toThousandFilter, getLastDay, getPreMonthDay, toAdd } from "@/utils/utils";

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
      startDate: "",
      endDate: new Date(),
      modalSum: 0,
      columns: [],
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
            slot: "benefit",
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
                  return h('a',{
                    on: {
                      click: () => {
                        this.showModal(params,currentYear,currentMonth);
                      }
                    }
                  },realText);
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
                    return h('a',{
                      on: {
                        click: () => {
                          this.showModal(params,currentYear,currentMonth);
                        }
                      }
                    },realText);
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
                    return h('a',{
                      on: {
                        click: () => {
                          this.showModal(params,currentYear,currentMonth);
                        }
                      }
                    },realText);
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
                  return h('a',{
                    on: {
                      click: () => {
                        this.showModal(params,currentYear,currentMonth);
                      }
                    }
                  },realText);
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
        currentYear ? this.modalTitle = row.row.performanceType : row.performanceType;
        this.modalLoading = true;
        if(currentYear){
          let lastMonthDay = getLastDay(currentYear,currentMonth);
          startDate =  `${currentYear}-${currentMonth<=9?"0"+currentMonth:currentMonth}-01`;
          endDate =  `${currentYear}-${currentMonth<=9?"0"+currentMonth:currentMonth}-${lastMonthDay}`;
        }else{
          startDate =  `${this.formatDate(this.startDate)}-01`;
          endDate =  this.formatDate(this.endDate,true);
        }
        getPerformanceDetail(this.userId,this.modalTitle,startDate,endDate).then(res => {
          if(res.success){
            this.modalData = res.obj;
            if(res.obj.length > 0){
              currentYear ? this.modalSum = row.row[row.column.key] : this.modalSum = row.profitSum;
            }else{
              this.modalSum = 0;
            }
            this.modalLoading = false;
          }
        })
    },
    //获取绩效分析数据
    getPerformanceData(startDate,endDate) {
      let createColumn = [];
      if(this.userId){
        this.loading = true;
        createColumn = this.createColumns(startDate,endDate);
        if(createColumn.length > 0){
            createColumn.unshift({
              title: "绩效类型",
              slot: "performanceType",
              width: 150,
              fixed: 'left'
            });
            this.columns = createColumn;
            this.$nextTick(() => {
              if (this.columns.length < 7)
              this.$refs.performance.style.width = `${452 + (this.columns.length-2)*150}px`;
            });
        }
        getPerformanceData(this.userId,this.formatDate(startDate),this.formatDate(endDate)).then(res => {
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
          {performanceType:'计件绩效',key:'pieceBenefit'},
          {performanceType:'工时绩效',key:'workBenefit'},
          {performanceType:'销售佣金绩效',key:'saleBenefit'},
          {performanceType:'项目利润分配',key:'projectBenefit'},
          {performanceType:'组织利润分配',key:'groupBenefit'},
          {performanceType:'汇总',key:'monthSum'}
      ];

      data.map(val => {
        val['monthSum'] = 0;
        for(let k in val){
          if( k !== 'month' && k !== 'monthSum'){
            val['monthSum'] = toAdd(val[k], val['monthSum']);
          }
        }
      })
      performanceData.map(p => {
        data.map(k => {
          p[k.month] = k[p['key']];
        })
      });

      if(data.length === 2) {
        this.columns = [
            {
              title: "绩效类型",
              slot: "performanceType",
              fixed: 'left'
            },
            {
              title: "金额",
              slot: "profitSum",
              align: 'right'
            }
        ];
      }

      return performanceData;
    }
  },
  mounted() {
    let currentHalfMonth = getPreMonthDay(new Date(), 5);
    this.startDate = currentHalfMonth;
    this.getPerformanceData(this.startDate,this.formatDate(this.endDate));
  }
};
</script>
