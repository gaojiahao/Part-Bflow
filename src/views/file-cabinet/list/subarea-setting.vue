<style lang="less" scoped>
  .subareae-name{
      span{
          color: #a9a3a3;
          margin-right: 35px;
      }
  }
  .subareae-member{
      &-toolbar{
          overflow: hidden;
          height: 50px;
          line-height: 50px;
          margin-top: 10px;
          span{
            color: #a9a3a3;
            margin-right: 10px;
            }
      }
  }
  .app-search {
        overflow: hidden;
        .subareae-member-search{
            float: right;
        }
        .subareae-member-btn{
            margin-top: 8px;
        }
  }
  .app-edit-icon{
        cursor: pointer;
        color: #ee4b0a;
        font-size: 14px;
  }
</style>

<template>
    <div>
      <Modal 
        v-model="showModal" 
        title="分区设置" 
        :mask-closable="false" 
        width="800"
        :styles="{top: '15px'}" 
        @on-ok="confirm">
        <div class="subareae-name">
            <span><b style="color:#e4393c;">*</b>名称</span>
            <Input v-model="subareaName" :disabled="isEditSubarea" style="width: 300px" />
        </div>
        <div class="subareae-member">
            <div class="subareae-member-toolbar">
                <span>成员及权限</span>
            </div>
            <div class="app-search">
                <Button @click="addNewMember" size="small" type="primary" :disabled="isEditSubarea" class="subareae-member-btn">添加成员</Button>
                <Input 
                    class="subareae-member-search"
                    v-model="searchValue"
                    :search="true" 
                    placeholder="搜索成员" 
                    style="width: 300px">
                </Input>
            </div>
            <div>
                <Table stripe size="small" :loading="loading" :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="permission">
                        <div v-if="row.edit">
                            <Select :value="row.permission" @on-change="onSelectChange" label-in-value style="width:100px">
                                <Option value="可编辑">可编辑</Option>
                                <Option value="仅浏览">仅浏览</Option>
                            </Select>
                            <span @click="confirmPermission(row,index)" class="app-edit-icon">
                                确定
                            </span>
                        </div>
                        <div v-else>
                            <span>{{ row.permission }}</span>
                            <span v-if="!isEditSubarea" @click="editPermission(row,index)" class="app-edit-icon">
                                <Icon type="ios-create-outline"></Icon>
                            </span>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
      </Modal>
      <!-- 成员选择器 -->
      <member-selector ref="memberSelector" @memberModalData="memberModalData"></member-selector>
    </div>
</template>

<script>
import { getSubareaAuthority,saveSubareaPermission } from "@/services/fileCabinetService.js";
import MemberSelector from './member-selector';

export default {
  name: "SubareaSetting",
  components: {
      MemberSelector
  },
  props: {
     subareaDetail: {
         type: Object
     } 
  },
  data() {
    return {
      searchValue: "",
      subareaName: "",
      showModal: false,
      loading: false,
      isEditSubarea: false,
      columns: [],
      data: [],
      searchData: [],
      selectData: {}
    };
  },
  watch: {
      searchValue: function(value) {
          let searchDatas = [];
          for(let val of this.searchData){
              val.edit = false;
              if(val.name.indexOf(value) >= 0) searchDatas.push(val);
          }
          this.data = searchDatas;
      },
      subareaDetail: function(value) {
          let defaultColumn = [
                { title: "成员", key: "name" },
                { title: "部门", key: "gname" },
                { title: "权限", slot: "permission"}
            ],
              actionCoulmn = { 
                title: "操作",
                key: "delete",
                render: (h,params) => {
                    return h("div", [
                        h("a",{
                            on: {
                                click: () => {
                                    let currentIndex;
                                    this.data.splice(params.index,1);
                                    for(let i=0;i<this.searchData.length;i++){
                                        if(val.name === params.row.name) this.searchData.splice(index,1);
                                        return;
                                    }
                                }
                            }
                        },"移除")
                    ]);
                }
            };
          this.subareaName = value.name;
          if(value.add){
              defaultColumn.push(actionCoulmn)
              this.columns = defaultColumn;
              this.isEditSubarea = false;
              this.data = [];
              this.searchData = [];
          }else{
              if(this.$currentUser.userId !== value.adminId){
                this.isEditSubarea = true;
                this.columns = defaultColumn;
              }else{
                  this.isEditSubarea = false;
                defaultColumn.push(actionCoulmn)
                this.columns = defaultColumn;
              }
          }
      }
  },
  methods: {
    confirm() {
        if(this.subareaName) {
            let data = {
                subareaId: this.subareaDetail.id,
                subareaName: this.subareaName,
                authorith: this.searchData
            };
            saveSubareaPermission(data).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.$emit('refresh');
                }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
        }
    },
    addNewMember() {
        this.$refs['memberSelector'].showUserModal = true;
        this.$refs['memberSelector'].selectUserModal();
    },
    //选择的成员
    memberModalData(value) {
        for(let val of value){
            val.edit = false;
            val.permission = '仅浏览';
        }
        if(this.searchData.length > 0){
            let obj = {};
            this.searchData.push(...value);
            this.searchData = this.searchData.reduce((cur, next) => {
            obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
            return cur;
            }, []);
        }else{
            this.searchData = value;
        }
        this.data = this.searchData;
    },
    //权限选择change
    onSelectChange(currentValue) {
        this.selectData = currentValue;
    },
    //获取分区成员
    getSubareaMember(subareaId) {
        this.loading = true;
        getSubareaAuthority(subareaId).then(res => {
            this.loading = false;
            this.data = res;
            this.searchData = res;
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
    },
    editPermission(row,index) {
        this.$set(row,'edit',true);
        this.selectData = {};
    },
    confirmPermission(row,index) {
        this.$set(row,'edit',false);
        if(this.selectData.value){
            this.$set(row,'permission',this.selectData.label);
            for(let val of this.searchData){
                if(val.id === row.id){
                    if(this.selectData.value){
                        val.permission = this.selectData.label;
                    }
                    return;
                }
            }
        }
    }
  },
  mounted() {}
};
</script>

