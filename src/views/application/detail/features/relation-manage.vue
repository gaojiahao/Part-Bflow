<style lang="less" scoped>
  .relation-content{
    padding: 10px 30px 20px 30px;
    .relation-body{
       margin-top: 20px;
       .separate-line{
         height: 10px;
         border-left: 1px solid #39f;
         margin: 0px 5px;
       }
    }
 }

 .app-relation-title{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e8e8e8;
    padding: 0px 15px;
    background-color: #fff;
 }
</style>

<template>
<div class="bg_ff" :style="{marginBottom:'20px'}">

    <Row class="app-relation-title">
         <h3>关系管理</h3>
    </Row>
    <Row class="relation-content">
        <div class="relation-body">
          <Button type="info" size="small" v-if="isAdmin" @click="addRelation" style="margin-bottom:5px;">新增</Button>
          <Table border stripe :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="value">
                <span v-if="!row.isEdit">{{ row.value }}</span>
                <Select 
                  v-else 
                  filterable 
                  v-model="row.value"
                  @on-change="onAppSelectChange" 
                  transfer 
                  style="width:200px">
                    <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </template>
            <template slot-scope="{ row }" slot="cashFlowName">
                <span v-if="!row.isEdit">{{ row.cashFlowName }}</span>
                <Select 
                  v-else 
                  v-model="row.cashFlowName" 
                  filterable 
                  @on-change="onSelectChange(row,$event)" 
                  transfer 
                  style="width:200px">
                    <Option v-for="item in cashFlowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </template>
            <template slot-scope="{ row }" slot="action">
                <a @click="editRelation(row)" v-if="!row.isEdit">编辑</a>
                <a @click="saveRelation(row)" v-if="row.isEdit">保存</a>
                <span class="separate-line"></span>
                <a @click="deleteRelation(row)">删除</a>
            </template>
            <template slot-scope="{ row }" slot="sort">
                <span v-if="!row.isEdit">{{ row.sort }}</span>
                <InputNumber v-else :min="1" v-model="row.sort"></InputNumber>
            </template>
          </Table>
        </div>
    </Row>

  </div>
</template>

<script>
import { 
  findCashFlowRelByType, 
  getCostType, 
  deleteCashFlowRelById,
  updateCashFlowRel,
  getCashFlowItem,
  getObjDealerLabelSource,
  saveCashFlowRel } from "@/services/appService.js";

export default {
  name: "RelationManage",
  components: {},
  props: {
    isAdmin: Boolean,
    listId: String
  },
  data() {
    return {
        type: 'cost',
        cashFlowList: [],
        dataList: [],
        columns: [],
        data: []
    };
  },
  watch: {
    
  },
  methods: {
      addRelation(){
        this.data.push({value: '',cashFlowName: '',cashFlowId: '',sort: 1,isEdit:true});
      },
      onSelectChange(row,value) {
        for(let item of this.cashFlowList){
          if(item.value == value){
            this.$set(row, "cashFlowId", item.cashFlowId);
            return;
          }
        }
      },
      onAppSelectChange(value) {
        let testArray = [];
        this.dataList.forEach(item => {
          testArray.push(item.label);
        })
        if(testArray.indexOf(value) > -1){
          this.$Message.error(`${this.appName}：<b>${value}</b>已存在`);
          return;
        }
      },
      editRelation(row) {
        this.$set(row, "isEdit", true);
      },
      deleteRelation(row) {
        deleteCashFlowRelById(row.id).then(res =>{
          if(res.success){
            this.$Message.success(res.message);
            this.getData();
          }
        }).catch(err => {
          this.$Message.error(res.data.message);
        });;
      },
      saveRelation(row) {
        let params = {
            type: this.type,
            value: row.value,
            cashFlowName: row.cashFlowName,
            cashFlowId: row.cashFlowId,
            sort: row.sort
        },
        requestInterface = saveCashFlowRel;
        if(row.id){
          params.id = row.id;
          requestInterface = updateCashFlowRel
        }
        requestInterface(params).then(res => {
            if(res.success) {
              this.$Message.success(res.message);
              this.getData();
            }
        }).catch(err => {
          this.$Message.error(res.data.message);
        });
      },
      getCashFlowData() {
          getCashFlowItem().then(res => {
              res.tableContent.forEach(item => {
                  this.cashFlowList.push({
                    label: item.cashFlowItem,
                    value: item.cashFlowItem,
                    cashFlowId: item.cashFlowId
                  });
              });
          });
      },
      getDataList() {
          if (this.listId === 'c0375170-d537-4f23-8ed0-a79cf75f5b04'){
              getObjDealerLabelSource().then(res => {
                res.tableContent.forEach(item => {
                  this.dataList.push({
                    label: item.dealerLabelName,
                    value: item.dealerLabelName
                  });
                });
            });
          }else{
            getCostType().then(res => {
                res.tableContent.forEach(item => {
                  this.dataList.push({
                    label: item.type,
                    value: item.type
                  });
                });
            });
          }
      },
      createColumns() {
        let columns = [];
        this.appName = '费用子类';
        if(this.listId === 'c0375170-d537-4f23-8ed0-a79cf75f5b04') {
          this.appName = '关系标签';
          this.type = 'dealer';
        }
        columns = [
          {title: this.appName,slot: 'value'},
          {title: '现金流项目',slot: 'cashFlowName'},
          // {title: '现金流项目ID',key: 'cashFlowId'},
          {title: '排序',slot: 'sort'}
        ];
        this.isAdmin && columns.push({title: '动作',slot: 'action'});
        this.columns = columns;
      },
      getData() {
        findCashFlowRelByType(this.type).then(res => {
            if(res.data) this.data = res.data;
        });
      }
  },
  created() {
    this.createColumns();
    this.getCashFlowData();
    this.getDataList();
    this.getData();
  }
};
</script>

