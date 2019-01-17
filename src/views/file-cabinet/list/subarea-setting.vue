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
            <span>名称</span>
            <Input v-model="subareaDetail.name" disabled style="width: 300px" />
        </div>
        <div class="subareae-member">
            <div class="subareae-member-toolbar">
                <span>成员及权限</span>
            </div>
            <div class="app-search">
                <Button @click="addNewMember" size="small" type="primary" class="subareae-member-btn">添加成员</Button>
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
                    <template slot-scope="{ row, index }" slot="authority">
                        <div v-if="row.edit">
                            <Select :value="row.authorityValue" @on-change="onSelectChange" label-in-value style="width:100px">
                                <Option value="edit">可编辑</Option>
                                <Option value="view">仅浏览</Option>
                            </Select>
                            <span @click="confirmPermission(row,index)" class="app-edit-icon">
                                确定
                            </span>
                        </div>
                        <div v-else>
                            <span>{{ row.authority }}</span>
                            <span @click="editPermission(row,index)" class="app-edit-icon">
                                <Icon type="ios-create-outline"></Icon>
                            </span>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
      </Modal>
      <!-- 成员选择器 -->
      <member-selector ref="memberSelector"></member-selector>
    </div>
</template>

<script>
import { getSubareaAuthority } from "@/services/fileCabinetService.js";
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
      showModal: false,
      loading: false,
      columns: [
        { title: "成员", key: "name" },
        { title: "部门", key: "gname" },
        { title: "权限", slot: "authority"},
        { 
            title: "操作",
            key: "delete",
            render: (h,params) => {
                return h("div", [
                    h("a",{
                        on: {
                            click: () => {
                                let currentIndex;
                                this.data.splice(params.index,1);
                                this.searchData.forEach((val,index) =>{
                                    if(val.name === params.row.name){
                                        this.searchData.splice(index,1);
                                    }
                                });
                            }
                        }
                      },"移除")
                ]);
            }
        },
      ],
      data: [{ name:'merry',gname:'name',authority:'可编辑',authorityValue:'edit',edit: false},{ name:'merry1',gname:'name1',authority:'可编辑',authorityValue:'edit',edit: false}],
      searchData: [{ name:'merry',gname:'name',authority:'可编辑',authorityValue:'edit',edit: false},{ name:'merry1',gname:'name1',authority:'可编辑',authorityValue:'edit',edit: false}],
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
      }
  },
  methods: {
    confirm() {
        
    },
    addNewMember() {
        this.$refs['memberSelector'].showUserModal = true;
    },
    //权限选择change
    onSelectChange(currentValue) {
        this.selectData = currentValue;
    },
    //获取分区成员
    getSubareaMember(subareaId) {
        getSubareaAuthority(subareaId).then(res => {
            console.log(res);
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
    },
    editPermission(row,index) {
        this.data[index].edit = true;
        for(let val of this.searchData){
            if(val.name === row.name){
                val.edit = true;
                return;
            }
        }
    },
    confirmPermission(row,index) {
        this.data[index].edit = false;
        if(this.selectData.value){
            this.data[index].authority = this.selectData.label;
            this.data[index].authorityValue = this.selectData.value;
        }
        for(let val of this.searchData){
            if(val.name === row.name){
                val.edit = false;
                if(this.selectData.value){
                    val.authority = this.selectData.label;
                    val.authorityValue = this.selectData.value;
                }
                return;
            }
        }
        
    }
  },
  mounted() {}
};
</script>

