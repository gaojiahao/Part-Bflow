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
                  @on-change="onRelationSelectChange(row,$event)" 
                  transfer >
                    <Option 
                      v-for="item in dataList" 
                      :value="item.value" 
                      :key="item.value">
                      {{ item.label }}
                    </Option>
                </Select>
            </template>
            <template slot-scope="{ row }" slot="cashFlowId">
                <span v-if="!row.isEdit">{{ row.cashFlowName }}</span>
                <Select 
                  v-else 
                  v-model="row.cashFlowId" 
                  filterable 
                  label-in-value
                  @on-change="onSelectChange(row,$event)" 
                  transfer>
                    <Option 
                      v-for="item in cashFlowList" 
                      :value="item.value" 
                      :key="item.value">
                      {{ item.label }}
                    </Option>
                </Select>
            </template>
            <template slot-scope="{ row }" slot="listId">
                <span v-if="!row.isEdit">{{ row.transName }}</span>
                <Select 
                  v-else 
                  v-model="row.listId" 
                  filterable 
                  label-in-value
                  multiple
                  @on-change="onAppSelectChange(row,$event)" 
                  transfer >
                    <Option 
                      v-for="item in appList" 
                      :value="item.value" 
                      :key="item.value">
                      {{ item.label }}
                    </Option>
                </Select>
            </template>
            <template slot-scope="{ row,index }" slot="action">
                <a @click="editRelation(row)" v-if="!row.isEdit">编辑</a>
                <a @click="saveRelation(row)" v-if="row.isEdit">保存</a>
                <span class="separate-line"></span>
                <a @click="deleteRelation(row,index)">删除</a>
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
  saveCashFlowRel,
  getAllListInfo } from "@/services/appService.js";

export default {
  name: "RelationManage",
  components: {},
  props: {
    isAdmin: Boolean,
    listId: String
  },
  data() {
    return {
        apptype: 'cost',
        cashFlowList: [],
        dataList: [],
        appList: [],
        columns: [],
        data: [],
        isSave: true,
        saveError: ''
    };
  },
  watch: {
    
  },
  methods: {
      addRelation(){
        this.data.push({value: '',cashFlowName: '',cashFlowId: '',transName:'',listId:'',sort: 1,isEdit:true});
      },
      onSelectChange(row,value) {
        this.$set(row, "cashFlowName", value.label);
      },
      onRelationSelectChange(row,value) {
        this.changePublicMethod(row,value);
      },
      onAppSelectChange(row,value) {
        let appNames = [];
        value.forEach(i => {
          appNames.push(i.label)
        });
        this.$set(row, "transName", appNames.join());
        this.changePublicMethod(row,value);
      },
      changePublicMethod(row,value) {
        let testRelationArray = [],
            testAppArray = [],
            isCost;
        
        JSON.parse(this.copyData).forEach((item) => {
          if(row.id){
            if(row.id !== item.id){
              testRelationArray.push(item.value);
              testAppArray.push({
                relation: item.value,
                app: item.listId.split(',')
              });
            }
          }else{
            testRelationArray.push(item.value);
            testAppArray.push({
                relation: item.value,
                app: item.listId.split(',')
              });
          }
        })
        if(this.apptype === 'dealer'){
          for(let i=0;i<testAppArray.length;i++){
            if(testAppArray[i].relation === row.value){
              for(let k = 0;k<row.listId.length;k++){
                  if(testAppArray[i].app.indexOf(row.listId[k]) > -1){
                    isCost = true;
                    this.saveError = `${this.appName}：<b>${row.value}</b>和选择的应用中有重复存在的`;
                    break;
                  }
              }
            }
          }
        }else{
          isCost = testRelationArray.indexOf(row.value) > -1;
          this.saveError = `${this.appName}：<b>${row.value}</b>已存在`;
        }
        if(isCost){
          this.isSave = false;
          this.$Message.error(this.saveError);
          return;
        }else{
          this.isSave = true;
        }
      },
      editRelation(row) {
        this.$set(row, "isEdit", true);
      },
      deleteRelation(row,index) {
        if(row.id){
          deleteCashFlowRelById(row.id).then(res =>{
            if(res.success){
              this.$Message.success(res.message);
              this.getData();
            }
          }).catch(err => {
            this.$Message.error(res.data.message);
          });
        }else{
          this.data.splice(index,1);
        }
      },
      saveRelation(row) {
        if(this.isSave){
          if(this.apptype === 'dealer'){
            if(!row.value || !row.cashFlowId || !row.listId || row.listId.length === 0){
              this.$Message.error('有选择项未填！');
              return;
            }
          }else{
            if(!row.value || !row.cashFlowId){
              this.$Message.error('有选择项未填！');
              return;
            }
          }
          let params = {
              type: this.apptype,
              value: row.value,
              cashFlowName: row.cashFlowName,
              cashFlowId: row.cashFlowId,
              sort: row.sort
          },
          requestInterface = saveCashFlowRel;
          if(this.apptype === 'dealer'){
            params.listId = row.listId.join();
          }
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
        }else{
          this.$Message.error(this.saveError);
        }
      },
      getCashFlowData() {
          getCashFlowItem().then(res => {
              res.tableContent.forEach(item => {
                  this.cashFlowList.push({
                    label: item.cashFlowItem,
                    value: item.cashFlowId
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
          this.apptype = 'dealer';
        }
        columns = [
          {title: this.appName,slot: 'value',width: 250},
          {title: '现金流项目',width: 450,slot: 'cashFlowId'},
          {title: '排序',slot: 'sort'}
        ];
        this.listId === 'c0375170-d537-4f23-8ed0-a79cf75f5b04' && columns.splice(2,0,{title: '应用名称',width: 300,slot: 'listId'})
        this.isAdmin && columns.push({title: '动作',slot: 'action'});
        this.columns = columns;
      },
      getAllAppData() {
        if (this.listId === 'c0375170-d537-4f23-8ed0-a79cf75f5b04'){
          getAllListInfo().then(res => {
            res.tableContent.forEach(item => {
                this.appList.push({
                  label: item.trasnName,
                  value: item.listId
                });
              });
          })
        }
      },
      getData() {
        findCashFlowRelByType(this.apptype).then(res => {
            if(res.data){
              this.data = res.data;
              this.copyData = JSON.stringify(res.data);
            } 
        });
      }
  },
  created() {
    this.createColumns();
    this.getCashFlowData();
    this.getDataList();
    this.getAllAppData();
    this.getData();
  }
};
</script>

