<style>
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

.drawer-add-next-node:hover{
  cursor:pointer;
  color: #ff0000;
}

</style>

<template>
    <div>
        <div class="" style="padding:20px">
            <div style="font-size:16px">
                <a @click="addJobs">添加职位</a>
                <a @click="addProcess">添加流程</a>
            </div>
            <div>
                <Table :columns="columns" :data="columnDatas" size="small" border ></Table>
            </div>
        </div>
        <Drawer title="节点详情" :closable="false" v-model="drawerVisable" transfer>
          <Form :model="NodeDetailFrom" :labelWidth="60" ref="NodeDetailFrom" >
            <FormItem label="名称:" style="font-size:16px" prop="title">
                <Input v-model="NodeDetailFrom.title" />
            </FormItem>
            <FormItem label="下级节点" :labelWidth="60" prop="nextNode">
              <Select  v-model="NodeDetailFrom.nextNode" >
                <Option value="M">管理层</Option>
                <Option value="A">事业部</Option>
                <Option value="O">部门</Option>
                <Option value="D">直营店</Option>
                <Option value="J">加盟店</Option>
                <Option value="G">小组</Option>
              </Select>
            </FormItem>
          </Form>
          <div style="text-align:center;font-size: 14px;">
            <span class="drawer-add-next-node">
              <i class="iconfont">&#xe719;</i>
              添加下级节点
            </span>
          </div>
        </Drawer>
     

        <add-jobs-modal v-model="isShowAddJobsModal" width="360" footerBtnAlign="right" title="添加职位" @on-ok="addJobsZColumn">
            <div style="margin-top:10px;">
                <Form :model="jobsFormItem" :labelWidth="60" ref="jobsFormItem" >
                    <FormItem label="名称:" style="font-size:16px" prop="name">
                        <Input v-model="jobsFormItem.name" />
                    </FormItem>
                </Form>
            </div>
        </add-jobs-modal>
        <add-process-modal v-model="isShowAddProcessModal" width="360" footerBtnAlign="right" title="添加流程" @on-ok="addProcssColumn">
            <div style="margin-top:10px;">
                <Form :model="processFormItem" :labelWidth="60" ref="processFormItem">
                    <FormItem label="key:" style="font-size:16px" prop="key">
                        <Input v-model="processFormItem.key" />
                    </FormItem>
                    <FormItem label="名称:" style="font-size:16px" prop="title">
                        <Input v-model="processFormItem.title" />
                    </FormItem>
                </Form>
            </div>
        </add-process-modal>

        <add-node-modal v-model="isShowAddNodeModal" width="360" footerBtnAlign="right" title="添加节点" @on-ok="handleAddNode">
            <div style="margin-top:10px;">
                <Form :model="nodeFormItem" :labelWidth="60" ref="nodeFormItem">
                    <FormItem label="名称:" style="font-size:16px" prop="title">
                        <Input v-model="nodeFormItem.title"/>
                    </FormItem>
                </Form>
            </div>
        </add-node-modal>
    </div>
</template>

<script>
import AddJobsModal from "@/components/modal/Modal";
import AddProcessModal from "@/components/modal/Modal";
import AddNodeModal from "@/components/modal/Modal";

export default {
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

      NodeDetailFrom:{
        title:"",
        nextNode:"A"
      },

      jobsFormItem: {
        name: ""
      },

      processFormItem: {
        title: "",
        key: ""
      },

      nodeFormItem: {
        title: ""
      },
      nodePositionId: "",
      nodeProcssId: "",

      columns: [
        {
          title: " ",
          key: "positionName",
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
                            let positionId = params.row.positionId;
                            this.handleRowDelete(positionId);
                        }
                    }
                }),

            ])
          }
        }
      ],
      columnDatas: []
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

    addJobs() {
      this.isShowAddJobsModal = true;
      this.$refs["jobsFormItem"].resetFields();
    },

    addProcess() {
      this.isShowAddProcessModal = true;
      this.$refs["processFormItem"].resetFields();
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
          let rerderData = [
            h(
              "a",
              {
                on: {
                  click: e => {
                    let that = this;
                    (that.nodePositionId = params.row.positionId),
                      (that.nodeProcssId = params.column.columnId);

                    that.isShowAddNodeModal = true;
                    that.$refs["nodeFormItem"].resetFields();
                  }
                }
              },
              "添加"
            )
          ];
          if (
            params.row[params.column.key] &&
            params.row[params.column.key].length > 0
          ) {
            params.row[params.column.key].forEach(item => {
              let pushdata = h(
                    "Tag",
                    {
                      attrs:{
                          id:item.id,
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
                            this.handleDeleteNode(target.getAttribute('id'),target.getAttribute('rowId'),target.getAttribute('columnId'));
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
                              let nodeId = e.target.parentNode.parentNode.getAttribute('id');
                              this.handleEditNode(nodeId)
                            }
                          },
                        },
                         item.title
                      )
                    ],
                )  
              rerderData.unshift(pushdata);
            });
          }
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
          let nodes =[];
          if(item[key] && item[key].length>0){
              nodes = [{
                    title:this.nodeFormItem.title,
                    id:this.getRandomCode(),
                    rowId:this.nodePositionId,
                    columnId:this.nodeProcssId
                  },...item[key]]
          }else{
              nodes.push({
                  title:this.nodeFormItem.title,
                  id:this.getRandomCode(),
                  rowId:this.nodePositionId,
                  columnId:this.nodeProcssId
              })
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
      let id = this.getRandomCode();
      this.columnDatas.push({
        positionId: id,
        positionName: this.jobsFormItem.name
      });
      this.isShowAddJobsModal = false;
    },

    /** 
     * 添加阶段-列
    */
    addProcssColumn() {
      let { key, title } = this.processFormItem;
      let column = this.columnTemplate(this.getRandomCode(), key, title, this);

      this.columns.push(column);
      this.isShowAddProcessModal = false;
    },

    /** 
     * 删除职位-行
    */
    handleRowDelete(positionId){
        let f = this.columnDatas.filter(f=>{
            return f.positionId !==positionId;
        });

        this.columnDatas = f;
    },

    /** 
     * 删除流程-列
    */
    handleColumnDelete(columnId){
        let f = this.columns.filter(f=>{
            return f.columnId !==columnId;
        });

        this.columns = f;
    },

    /** 
     * 删除节点
    */
    handleDeleteNode(nodeId,rowId,columnId){
        let columnKey = this.columns.filter(f => {
        return f.columnId === columnId;
      })[0].key;

      this.columnDatas.forEach(item => {
        if (item.positionId === rowId) {
          let nodes =[];
          if(item[columnKey] && item[columnKey].length>0){
             let nodes = item[columnKey].filter(f =>{
               return f.id !== nodeId
             })
             this.$set(item, columnKey,nodes);
          }
        }
      });
    },

    handleEditNode(nodeId){
      this.drawerVisable = true;
    }
  }
};
</script>

