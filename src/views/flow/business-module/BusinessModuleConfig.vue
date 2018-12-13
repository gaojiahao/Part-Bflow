<style lang="less">
.column-icon-delete{
    font-size: 16px;
    position: absolute;
    color: rgb(197, 200, 206);
    transition: color 0.2s ease-in-out 0s;
    cursor: pointer;
}

.column-icon-delete:hover{
    color: rgb(98, 100, 105);
}

.drawer-detail-save-submit{
  width: 100%;
  line-height: 1.5;
  border: 1px solid transparent;
  padding: 6px 15px;
  background-color: rgb(0, 150, 136);
  color:#fff;
  outline: none;
  font-weight: bold;
  cursor: pointer;
}

.drawer-detail-save-submit:hover{
  background-color: rgb(6, 132, 121);
}

.app-search {
  margin-bottom: 5px;
  .app-search-icon {
    font-size: 1rem;
    color: #39f;
    display: inline-block;
    cursor: pointer;
  }
}

.config-action {
  position: fixed;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #fff;
  border-top: 1px solid #ddd;

  &-submit{
    background-color: rgb(49, 85, 165);
    color:#fff;
    outline: none;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid transparent;
    padding: 6px 20px;
    line-height: 1.5;
  }

}

.page-selection-warp {
  width: 100%;
  height: 100%;
  min-height: 30px;
  background-color: #e6e6e6;
  margin-bottom: 10px;
  padding: 1px 5px;
}

</style>

<template>
    <div>
        <div class="" style="padding:20px;background-color:#fff">
            <div style="font-size:16px;width:30%">
               <Form :model="moduleFromItem" ref="moduleFromItem"  :rules="ruleValidate" :labelWidth="100">
                    <FormItem label="业务模块名称" style="font-size:16px" prop="moduleName" >
                        <Input v-model="moduleFromItem.moduleName" />
                    </FormItem>
                </Form>
            </div>
            <div>
                <Table :columns="columns" :data="columnDatas" size="small" border ></Table>
            </div>
        </div>
        <div class="config-action" @click="handleSubmitBoxs">
          <input type='submit' value="添加职位"  class="config-action-submit" id="addJob" />
          <input type='submit' value="添加阶段" class="config-action-submit" id="addProcess"  />
          <input type='submit' value="保存" style="background-color:rgb(0, 150, 136)" class="config-action-submit" id="save" />
          <input type='submit' value="返回" style="background-color:rgb(0, 150, 136)" class="config-action-submit" id="back" v-if="moduleId"/>
        </div>
        <Drawer title="节点详情" v-model="drawerVisable" :mask-closable="false" closable transfer>
          <Form :model="NodeDetailFrom" :labelWidth="60" ref="NodeDetailFrom" >
            <FormItem label="名称:" style="font-size:16px" prop="title">
                <Input v-model="NodeDetailFrom.title" disabled/>
            </FormItem>
            <FormItem label="下级节点" :labelWidth="60" prop="nextNode">
              <Select multiple v-model="NodeDetailFrom.nextNode" clearable>
                <Option v-for="item in appNodes" v-if="item.uniqueId !== NodeDetailFrom.uniqueId" :value="item.uniqueId" :key="item.uniqueId">{{item.title}}</Option>
              </Select>
            </FormItem>
          </Form>
          <div >
            <input type='submit' value="保存" class="drawer-detail-save-submit" @click="handleSaveNodeDetail"/>
          </div>
        </Drawer>
     

        <add-jobs-modal v-model="isShowAddJobsModal" width="360" footerBtnAlign="right" title="添加职位" @on-ok="addJobsZColumn">
            <div style="margin-top:10px;">
                <Form :model="jobsFormItem" :labelWidth="60" ref="jobsFormItem" prop="id">
                     <FormItem label="名称:" style="font-size:16px">
                        <Select  v-model="jobsFormItem.id" @on-change="handleJobModalNameChage" :label-in-value="true" multiple clearable transfer>
                          <Option v-for="item in joblist" :value="item.id" :key="item.id" :label="item.name" :disabled="item.disabled?true:false">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                </Form>
            </div>
        </add-jobs-modal>
        <add-process-modal v-model="isShowAddProcessModal" width="360" footerBtnAlign="right" title="添加阶段" @on-ok="addProcssColumn">
            <div style="margin-top:10px;">
                <Form :model="processFormItem" :labelWidth="60" ref="processFormItem">
                    <FormItem label="名称:" style="font-size:16px" prop="title">
                        <Input v-model="processFormItem.title" />
                    </FormItem>
                </Form>
            </div>
        </add-process-modal>

        <add-node-modal v-model="isShowAddNodeModal" width="720" footerBtnAlign="right" title="添加应用" @on-ok="handleAddNode">
            <div style="margin-top:10px;">
              <div class="app-search">
                <Input @on-search="handleAppNameFilter"  :search="true" v-model="searchValue" placeholder="搜索应用名称" style="width: 300px"></Input>
                <a class="app-search-icon">
                  <Button @click="handleAppNameFilter" type="primary" size="small">查询</Button>
                </a>
              </div>
              <Table 
                :loading="appListLoading" 
                :columns="appListColumns" 
                :data="appListData" 
                size='small' 
                ref="selection" 
                @on-select-all="onSelectAll" 
                @on-selection-change="handerSelectionChange" 
                @on-select-cancel="onSelectCancel"
                >
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page 
                    :total="appListPageTotal" 
                    :current="appListCurrentPage" 
                    :page-size="pageSize" 
                    size="small" 
                    show-total
                    show-elevator
                    @on-change="appListChangePage"  
                    >
                  </Page>
                </div>
              </div>
            </div>
            <div class="page-selection-warp" v-show="onPageSelection[0] ">
              <Tag 
                v-for="item in onPageSelection" 
                :key="item.uniqueId" 
                :uniqueId="item.uniqueId" 
                type="border" 
                color="primary" 
                size="small"
                :closable="true" 
                @on-close="deletePageSelection" 
                >
                  {{item.title}}
              </Tag>
            </div>
        </add-node-modal>
    </div>
</template>

<script>
import AddJobsModal from "@/components/modal/Modal";
import AddProcessModal from "@/components/modal/Modal";
import AddNodeModal from "@/components/modal/Modal";

import {getAllRoleData,getAllAppList,saveBusinessModule,getBusinessModuleById} from "@/services/flowService";
export default {
  name:'BusinessModuleConfig',

  components: {
    AddJobsModal,
    AddProcessModal,
    AddNodeModal
  },

  data() {
    return {
      isShowAddJobsModal: false,
      isShowAddProcessModal: false,
      isShowAddNodeModal: false,
      drawerVisable:false,
      moduleId:"", //应用模块ID

      moduleFromItem:{
        moduleName:''
      },
      ruleValidate: {
        moduleName: [
          {
            required: true,
            message: "请输入应用模板名称",
            trigger: "blur"
          }
        ],
      },

      NodeDetailFrom:{
        uniqueId:"",
        title:"",
        nextNode:[]
      },

      jobsFormItem: {
        id:[],
        name: []
      },

      processFormItem: {
        title: "",
        key: ""
      },

      searchValue:"",
      appListLoading:false,
      appListColumns:[{
        type: "selection",
        width: 60,
        align: "center"
      },{
        title: "id",
        key: "id"
      },{
        title: "应用名称",
        key: "title"
      },{
        title: "创建时间",
        key: "crtTime"
      }],
      appListData:[],
      appListPageTotal:0,
      appListCurrentPage:1,
      pageSize:8,
      withoutListId:"",
      onPageSelection:[],
     
      nodePositionId: "", //当前添加应用节点的职位ID
      nodeProcssId: "", //当前添加应用节点的阶段ID
      columns: [
        {
          title: " ",
          key: "positionName",
          columnId:"cacf-ool4-jbpj-wkx5-slj9-013e-psir-ak24",
          align: "center",
          fixed: "left",
          render:(h,params)=>{
            return h('div',[
                h("span",params.row.positionName),
                h('Icon',{
                    class:"column-icon-delete",
                    props:{
                        type:"md-trash"
                    },
                    on:{
                        click:()=>{
                            let positionId = params.row.positionId,
                                jobId = params.row.jobId;
                            this.handleRowDelete(positionId,jobId);
                        }
                    }
                }),

            ])
          }
        }
      ],
      columnDatas: [],

      appNodes:{},  //应用节点集合

      joblist:[]
    };
  },

  methods: {
    getRandomCode() {
      let length = 32;
      if (length > 0) {
        let data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let nums = "";
        for (let i = 1; i <= length; i++) {
          let r = parseInt(Math.random() * 35);
          nums += data[r];
          if (i % 4 === 0 && i != length) {
            nums += "-";
          }
        }
        return nums;
      } else {
        return false;
      }
    },

    //事件委托
    handleSubmitBoxs(event){
      let target = event.target || event.srcElement;
      if(target.nodeName.toLocaleLowerCase() === 'input'){
        switch(target.id){
          case 'addJob':
            this.isShowAddJobsModal = true;
            this.jobsFormItem.name =[];
            this.jobsFormItem.id = [];
            break;
          case 'addProcess':
            this.isShowAddProcessModal = true;
            this.$refs["processFormItem"].resetFields();
            break;
          case 'save':
            this.saveAppConfig();
            break;
          case 'back':
            this.$router.push({path:`/BusinessModuleGraph/${this.moduleId}`})
            break;
        }
      }
    },

    /** 
     * 保存配置信息
    */
    saveAppConfig(){
       this.$refs["moduleFromItem"].validate(valid => {
         if(valid){
            let configDetailData = {},
                nodeList = [],
                positionList = [],
                stageList = [];
      
            //构造列数据
            this.columns.forEach((column,index)=>{
              if(column.key !== "positionName"){
                let {columnId,key,title,editId} = column;
                if(editId){
                  stageList.push({
                    id:editId,
                    title:title,
                    key:key,
                    sort:index,
                    columnAnchorPoint:columnId
                  })
                }else{
                   stageList.push({
                    title:title,
                    key:key,
                    sort:index,
                    columnAnchorPoint:columnId
                  })  
                }
              }
            })

            //构造行数据
            this.columnDatas.forEach((data,index)=>{
              if(data.id){
                positionList.push({
                  title:data.positionName,
                  rowAnchorPoint:data.positionId,
                  sort:index,
                  id:data.id
                })
              }else{
                positionList.push({
                  title:data.positionName,
                  rowAnchorPoint:data.positionId,
                  sort:index
                })
              }
            })

            //构造应用节点数据
            for(let nodeId in this.appNodes){
              let nextNodeId = [];
              if(this.appNodes[nodeId].nextNode && this.appNodes[nodeId].nextNode.length>0){  //判断是否存在下级节点
                this.appNodes[nodeId].nextNode.forEach(next=>{
                  nextNodeId.push(next.id);
                })  
              }
              if(this.appNodes[nodeId].editId){
                nodeList.push({
                  id:this.appNodes[nodeId].editId,
                  name:this.appNodes[nodeId].title,
                  listKey:this.appNodes[nodeId].id,
                  nextNode:nextNodeId.join(','),
                  listId:this.appNodes[nodeId].uniqueId,
                  rowAnchorPoint:this.appNodes[nodeId].rowId,
                  columnAnchorPoint:this.appNodes[nodeId].columnId
                })
              }else{
                nodeList.push({
                  name:this.appNodes[nodeId].title,
                  listKey:this.appNodes[nodeId].id,
                  nextNode:nextNodeId.join(','),
                  listId:this.appNodes[nodeId].uniqueId,
                  rowAnchorPoint:this.appNodes[nodeId].rowId,
                  columnAnchorPoint:this.appNodes[nodeId].columnId
                })
              }
            }

            configDetailData['nodeList'] = nodeList;
            configDetailData['stageList'] = stageList;
            configDetailData['positionList'] = positionList;
            configDetailData['title'] = this.moduleFromItem.moduleName;
            configDetailData['configColumns'] = JSON.stringify(this.columns.slice(1));
            configDetailData['configColumnDatas'] = JSON.stringify(this.columnDatas);
            
            if(this.moduleId){
               configDetailData['id'] = this.moduleId;
            }
            saveBusinessModule(configDetailData).then(res=>{
              if(res.success){
                let seconde = 5;
                setTimeout(()=>{
                  this.$router.push({path:`/BusinessModuleGraph/${res.moduleId}`})
                },5000)
                this.$Message.success({
                  content:`${res.message}, ${seconde}秒后将自动离开当前页面`,
                  duration:1
                })
              }
            }).catch(error=>{
              this.$Message.error(error.data.message)
            });
         }else{

         }
       })


    },

    /** 
     * 构造模板列
    */
    columnTemplate(columnId, key, title) {
      return {
        columnId: columnId,
        key: key,
        title: title,
        align: "center",
        renderHeader:(h,p)=>{
            return h('div',[
                h('span',p.column.title.trim()),
                h('Icon',{
                    class:"column-icon-delete",
                    props:{
                        type:"md-trash"
                    },
                    on:{
                        click:()=>{
                            let columnId = p.column.columnId;
                            this.handleColumnDelete(columnId);
                        }
                    }
                })
            ])
        },
        render: (h, params) => {
          let rerderData = [];
          if (
            params.row[params.column.key] &&
            params.row[params.column.key].length > 0
          ) {
            params.row[params.column.key].forEach(item => {
              let pushdata = h(
                    "Tag",
                    {
                      attrs:{
                          uniqueId:item.uniqueId,
                          rowId:item.rowId,
                          columnId:item.columnId
                      },
                      props: {
                        color: "primary",
                        closable: true
                      },
                      on:{
                          "on-close":(event)=>{
                            let target = event.target.parentNode || event.srcElement.parentNode;
                            this.handleDeleteNode(target.getAttribute('uniqueId'),target.getAttribute('rowId'),target.getAttribute('columnId'));
                          }
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          on:{
                            click:(e)=>{
                              e.preventDefault();
                              let nodeId = e.target.parentNode.parentNode.getAttribute('uniqueId');
                              this.handleEditNode(nodeId)
                            }
                          },
                        },
                         item.title
                      )
                    ],
                  );  
              rerderData.push(pushdata);
            });
          };
          rerderData.push(h(
              "a",
              {
                on: {
                  click: e => {
                    let that = this,
                        unId =[];
                        that.nodePositionId = params.row.positionId;
                        that.nodeProcssId = params.column.columnId;

                      that.isShowAddNodeModal = true;
                      that.onPageSelection = [];
                      that.searchValue = "";
                      for(let keyId in that.appNodes){
                        unId.push(that.appNodes[keyId].id);
                      }
                      that.withoutListId = unId.join(',')

                      that.getAllAppList(that.appListCurrentPage,that.pageSize,that.withoutListId)
                   
                  }
                }
              },
              "添加"
            ))
          return h("div", rerderData);
        }
      };
    },

    /** 
     * 添加节点
    */
    handleAddNode(e) {
      let key = this.columns.filter(f => {
        return f.columnId === this.nodeProcssId;
      })[0].key;
      this.columnDatas.forEach(item => {
        if (item.positionId === this.nodePositionId) {
          let nodes =[],
              nodeItem=[];
          if(item[key] && item[key].length>0){  //判断当前区域是否存在添加的节点
              if(this.onPageSelection.length>0){
                this.onPageSelection.forEach(selection=>{
                  nodeItem.push({
                      title:selection.title,
                      id:selection.id,
                      uniqueId:selection.uniqueId,
                      rowId:this.nodePositionId,
                      columnId:this.nodeProcssId
                  })
                  this.appNodes[selection.uniqueId] = { //保存所以添加的节点
                      title:selection.title,
                      id:selection.id,
                      uniqueId:selection.uniqueId,
                      rowId:this.nodePositionId,
                      columnId:this.nodeProcssId
                  }; 
                })
                nodes = [...item[key],...nodeItem]
              }
          }else{
             if(this.onPageSelection.length>0){
                this.onPageSelection.forEach(selection=>{
                  nodes.push({
                      title:selection.title,
                      id:selection.id,
                      uniqueId:selection.uniqueId,
                      rowId:this.nodePositionId,
                      columnId:this.nodeProcssId
                  });
                  this.appNodes[selection.uniqueId] = { //保存所以添加的节点
                      title:selection.title,
                      id:selection.id,
                      uniqueId:selection.uniqueId,
                      rowId:this.nodePositionId,
                      columnId:this.nodeProcssId
                  }; 
                })
              }
          }
          this.$set(item, key,nodes);
        }
      });
     
      this.isShowAddNodeModal = false;
    },

    /** 
     * 添加职位-行
    */
    addJobsZColumn() {
      let name = this.jobsFormItem.name,
          jobId = this.jobsFormItem.id;
      for(let i =0;i<jobId.length;i++){
        this.columnDatas.push({
          jobId:jobId[i],
          positionId: this.getRandomCode(),
          positionName:name[i]
        });
        this.joblist.forEach(item=>{  //当职位已经被添加之后，下次不允许再次添加
          if(item.id === jobId[i]){
            this.$set(item,'disabled',true)
          }
        })
      }
      this.isShowAddJobsModal = false;
    },

    /** 
     * 保存职位信息
    */
    handleJobModalNameChage(value){
      if(value){
        let names =[];
        value.map(m=>{
          names.push(m.label)
        })
        this.jobsFormItem.name = names;
      }
    },

    /** 
     * 添加阶段-列
    */
    addProcssColumn() {
      let {title} = this.processFormItem;
      let key = 'column_'+this.getRandomCode();
      let column = this.columnTemplate(this.getRandomCode(), key, title, this);

      this.columns.push(column);
      this.isShowAddProcessModal = false;
    },

    /** 
     * 删除职位-行
    */
    handleRowDelete(positionId,jobId){
      let f = this.columnDatas.filter(f=>{
          return f.positionId != positionId;
      });
      this.columnDatas = f;

      this.joblist.forEach(item=>{  //取消已经被添加的职位禁用效果
        if(item.id === jobId){
          this.$set(item,'disabled',false)
        }
      })

      let deleteNodesId = []
      for(let nodeId in this.appNodes){
        let nextNodeId = [];
        if(this.appNodes[nodeId].rowId === positionId){  //判断是否存在下级节点
          deleteNodesId.push(this.appNodes[nodeId].uniqueId);
          delete this.appNodes[nodeId]  
        }
      }

      if(deleteNodesId.length>0){
        let ids = deleteNodesId.join(',');
        for(let nodeId in this.appNodes){
          let nextNodeArr = this.appNodes[nodeId].nextNode;
          if(nextNodeArr && nextNodeArr.length>0){  //判断是否存在下级节点
            this.appNodes[nodeId].nextNode = nextNodeArr.filter(f=>{
              return !(~ids.indexOf(f.uniqueId))
            })
          }
        }
      }
    },

    /** 
     * 删除流程-列
    */
    handleColumnDelete(columnId){
      let f = this.columns.filter(f=>{
          return f.columnId != columnId;
      });
      this.columns = f;

      let deleteNodesId = []
      for(let nodeId in this.appNodes){
        let nextNodeId = [];
        if(this.appNodes[nodeId].columnId === columnId){  //判断是否存在下级节点
          deleteNodesId.push(this.appNodes[nodeId].uniqueId);
          delete this.appNodes[nodeId]  
        }
      }

      if(deleteNodesId.length>0){
        let ids = deleteNodesId.join(',');
        for(let nodeId in this.appNodes){
          let nextNodeArr = this.appNodes[nodeId].nextNode;
          if(nextNodeArr && nextNodeArr.length>0){  //判断是否存在下级节点
            this.appNodes[nodeId].nextNode = nextNodeArr.filter(f=>{
              return !(~ids.indexOf(f.uniqueId))
            })
          }
        }
      }
    },

    /** 
     * 删除节点
    */
    handleDeleteNode(nodeId,rowId,columnId){
        let columnKey = this.columns.filter(f => {
        return f.columnId === columnId;
      })[0].key;

      this.columnDatas.forEach(item => {
        if (item.positionId == rowId) {
          let nodes =[];
          if(item[columnKey] && item[columnKey].length>0){
             let nodes = item[columnKey].filter(f =>{
               return f.uniqueId != nodeId
             })
             this.$set(item, columnKey,nodes);
          }
        }
      });
      let res = delete this.appNodes[nodeId]
      if(res){
        this.$Message.success('删除成功!')
      }
    },

    /** 
     * 编辑应用节点信息
    */
    handleEditNode(nodeId){
      this.drawerVisable = true;
      let nodeDetails = this.appNodes[nodeId];

      this.NodeDetailFrom.uniqueId = nodeDetails.uniqueId;
      this.NodeDetailFrom.title=nodeDetails.title;
      this.NodeDetailFrom.nextNode = [];
      if(nodeDetails.nextNode && nodeDetails.nextNode.length>0){
        nodeDetails.nextNode.map(item=>{
          this.NodeDetailFrom.nextNode.push(item.uniqueId)
        })
      }
    },

    /** 
     * 保存应用节点信息
    */
    handleSaveNodeDetail(event){
      let that = this;
      let nodeId = that.NodeDetailFrom.uniqueId;
       that.appNodes[nodeId].nextNode=[];
      if(that.NodeDetailFrom.nextNode[0]){
        that.NodeDetailFrom.nextNode.forEach(nextNodeId=>{
          that.appNodes[nodeId].nextNode.push(that.appNodes[nextNodeId])
        })
      }
      this.$Message.success('保存成功!')
      this.drawerVisable = false;
    },

    /** 
     * 根据应用名称过滤
    */
    handleAppNameFilter(value){
      this.getAllAppList(this.appListCurrentPage,this.pageSize,"",this.searchValue);
    },

    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.onPageSelection.push(...selection);
      //数组去重
      this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
        obj[next.uniqueId] ? "" : (obj[next.uniqueId] = true && cur.push(next));
        return cur;
      }, []);
    },

    //保存分页选中
    handerSelectionChange(selection) {
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.onPageSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.uniqueId !== item.uniqueId;
          });
        });
        this.onPageSelection = p;
      } else {
        let obj = {};
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
          obj[next.uniqueId] ? "" : (obj[next.uniqueId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },

    //单选取消
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.uniqueId !== row.uniqueId;
      });
    },

    /** 
     * 删除分页选择项 
    */
    deletePageSelection(){
      let uniqueId = event.target.parentElement.getAttribute("uniqueId");
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.uniqueId !== uniqueId;
      });

      this.$refs.selection.data.forEach((item, index) => {
        if (uniqueId === item.uniqueId) {
          this.$refs.selection.toggleSelect(index);
        }
      });
    },

    /** 
     * 应用列表分页加载
    */
    appListChangePage(currentPage) {
      // let filter = [
      //   { operator: "like", value: this.searchValue, property: "groupName" }
      // ];
      this.getAllAppList(currentPage,this.pageSize,this.withoutListId,this.searchValue);
    },

    /** 
     * 获取应用列表
    */
    getAllAppList(currentPage,pageSize,withoutListId,search){
      this.appListLoading = true;
      withoutListId=withoutListId?withoutListId:'-1';
      getAllAppList(currentPage,this.pageSize,withoutListId,search).then(res=>{
        this.appListPageTotal = res.dataCount;
        this.appListData = res.tableContent;
        if (this.onPageSelection.length > 0) {
          this.appListData.map(item => {
            this.onPageSelection.map(sel => {
              if (item.uniqueId === sel.uniqueId) {
                item._checked = true;
              }
            });
          });
        }
        this.appListLoading = false;
      }).catch(error=>{
        this.$Message.error(error.message)
      })  
    },

    getAllRoleData(){
      getAllRoleData().then(res=>{
        let that = this;
        this.joblist = res.tableContent;
        if(this.columnDatas.length>0){
          this.columnDatas.forEach(data=>{
          this.joblist.forEach(c=>{
                if(data.positionName === c.name){
                  this.$set(c,'disabled',true);
                }
            })
          })
        }
      })
    }
  },

  mounted(){
    this.moduleId = this.$route.params.moduleId;
    //判断是配置页面还是修改页面
    if(this.moduleId){
      getBusinessModuleById(this.moduleId).then(res => {
        let configColumns = JSON.parse(res.configColumns);
        configColumns.forEach(c=>{
          let editId = "";
          if(!c.editId){
            editId = res.stageList.filter(f=>{
              return f.columnAnchorPoint === c.columnId;
            })[0].id;
          }
          this.columns.push({
            align: c.align,
            columnId: c.columnId,
            key: c.key,
            title: c.title,
            editId:c.editId?c.editId:editId,
            renderHeader:(h,p)=>{
                return h('div',[
                    h('span',p.column.title.trim()),
                    h('Icon',{
                        class:"column-icon-delete",
                        props:{
                            type:"md-trash"
                        },
                        on:{
                            click:()=>{
                                let columnId = p.column.columnId;
                                this.handleColumnDelete(columnId);
                            }
                        }
                    })
                ])
            },
            render: (h, params) => {
              let rerderData = [];
              if (
                params.row[params.column.key] &&
                params.row[params.column.key].length > 0
              ) {
                params.row[params.column.key].forEach(item => {
                  let pushdata = h(
                        "Tag",
                        {
                          attrs:{
                              uniqueId:item.uniqueId,
                              rowId:item.rowId,
                              columnId:item.columnId
                          },
                          props: {
                            color: "primary",
                            closable: true
                          },
                          on:{
                              "on-close":(event)=>{
                                let target = event.target.parentNode || event.srcElement.parentNode;
                                this.handleDeleteNode(target.getAttribute('uniqueId'),target.getAttribute('rowId'),target.getAttribute('columnId'));
                              }
                          }
                        },
                        [
                          h(
                            "span",
                            {
                              on:{
                                click:(e)=>{
                                  e.preventDefault();
                                  let nodeId = e.target.parentNode.parentNode.getAttribute('uniqueId');
                                  this.handleEditNode(nodeId)
                                }
                              },
                            },
                            item.title
                          )
                        ],
                      );  
                  rerderData.push(pushdata);
                });
              };
              rerderData.push(h(
                  "a",
                  {
                    on: {
                      click: e => {
                        let that = this,
                            unId =[];
                            that.nodePositionId = params.row.positionId;
                            that.nodeProcssId = params.column.columnId;

                          that.isShowAddNodeModal = true;
                          that.onPageSelection = [];
                          that.searchValue = "";
                          for(let keyId in that.appNodes){
                            unId.push(that.appNodes[keyId].id);
                          }
                          that.withoutListId = unId.join(',')

                          that.getAllAppList(that.appListCurrentPage,that.pageSize,that.withoutListId)
                      
                      }
                    }
                  },
                  "添加"
                ))
              return h("div", rerderData);
            }
          })
        })
        res.nodeList.forEach(n=>{
          let nextNodeArr = [],
              nextNodeIdArr = [];
          if(n.nextNode){ //判断是否配置了下级节点
            nextNodeIdArr = n.nextNode.split(',');
            nextNodeIdArr.forEach(nextNodeId=>{
              let f = res.nodeList.filter(f=>{
                return f.listKey === nextNodeId;
              });
              if(f.length ===1){
                nextNodeArr.push({
                  title:f[0].name,
                  id:f[0].listKey,
                  uniqueId:f[0].listId,
                  rowId:f[0].rowAnchorPoint,
                  columnId:f[0].columnAnchorPoint,
                });
              }
            })
          }
          this.appNodes[n.listId] ={
            title:n.name,
            id:n.listKey,
            uniqueId:n.listId,
            rowId:n.rowAnchorPoint,
            columnId:n.columnAnchorPoint,
            nextNode:nextNodeArr,
            editId:n.id,
          }
        })
        this.columnDatas = JSON.parse(res.configColumnDatas);
        this.moduleFromItem.moduleName = res.title;

        this.getAllRoleData();
      })
    } else{
      this.getAllRoleData();
    }

  
  }
};
</script>

