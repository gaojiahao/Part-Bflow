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
       .relation-page{
         margin-top: 5px;
         float: right;
       }
       .relation-toolbar{
         margin-bottom: 5px;
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
          <div class="relation-toolbar">
            <Button type="info" size="small" v-if="isAdmin" @click="addRelation">新增</Button>
            <Input 
              v-model="searchValue" 
              @on-search="relationFilter" 
              :search="true" 
              placeholder="搜索" 
              style="width: 300px">
            </Input>
          </div>
          <Table max-height=521 border stripe :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="value">
                <span v-if="!row.isEdit">{{ row.value }}</span>
                <Select 
                  v-else 
                  filterable 
                  size="small"
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
                  size="small"
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
                  size="small"
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
          <div class="relation-page">
            <Page 
              @on-change="onPageChange" 
              :current="currentPage"
              :page-size="pageSize"
              :total="total" 
              show-total />
          </div>
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
        isSave: true,
        saveError: '',
        searchValue: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        cashFlowList: [],
        dataList: [],
        appList: [],
        columns: [],
        data: [],
    };
  },
  watch: {
    
  },
  methods: {
      addRelation(){
        this.data.unshift({value: '',cashFlowName: '',cashFlowId: '',transName:'',listId:'',sort: this.data.length+1,isEdit:true});
      },
      relationFilter() {
        this.currentPage = 1;
        this.getData();
      },
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.getData();
      },
      onSelectChange(row,value) {
        let name = value && value.label
        this.$set(row, "cashFlowName", name);
      },
      onRelationSelectChange(row,value) {
        this.changePublicMethod(row,value);
      },
      onAppSelectChange(row,value) {
        let appNames = [];
        value.forEach(i => {
          appNames.push(i.label.replace(/[\r\n]/g,"").replace(/[ ]/g,""))
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
                app: item.listId
              });
            }
          }else{
            testRelationArray.push(item.value);
            testAppArray.push({
                relation: item.value,
                app: item.listId
              });
          }
        })
        if(this.apptype === 'dealer'){
          for(let i=0;i<testAppArray.length;i++){
            if(testAppArray[i].relation === row.value){
              for(let k = 0;k<row.listId.length;k++){
                  if(testAppArray[i].app.indexOf(row.listId[k]) > -1){
                    isCost = true;
                    this.saveError = `${this.appName}：<b>${row.value}</b>和选择的应用<b>${row.transName.split(',')[k]}</b>有重复存在的`;
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
              this.currentPage = 1;
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
            if(!row.value || !row.cashFlowId || !row.sort || !row.listId || row.listId.length === 0){
              this.$Message.error('有选择项未填！');
              return;
            }
          }else{
            if(!row.value || !row.cashFlowId || !row.sort){
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
                this.currentPage = 1;
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
          {title: this.appName,slot: 'value',width: 180},
          {title: '现金流项目',width: 350,slot: 'cashFlowId'},
          {title: '排序',slot: 'sort'}
        ];
        this.listId === 'c0375170-d537-4f23-8ed0-a79cf75f5b04' && columns.splice(2,0,{title: '应用名称',width: 250,slot: 'listId'})
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
        findCashFlowRelByType(this.apptype,this.currentPage,this.pageSize,this.searchValue).then(res => {
            if(res.tableContent){
              res.tableContent.forEach(item => {
                item.listId && (item.listId = item.listId.split(','));
              })
              this.data = res.tableContent;
              this.total = res.dataCount;
              this.copyData = JSON.stringify(res.tableContent);
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

