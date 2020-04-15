<style lang="less" scoped>
.message-search /deep/ .ivu-input{
    border: 1px solid #dcdee2;
}
.message-search /deep/ .ivu-auto-complete.ivu-select-dropdown{
    max-height: 550px;
    min-width: 265px !important;
}
.message-search{
  display: inline-block;
   .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
        text-align: left;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #999;
    }
    .demo-auto-complete-count{
        color: #999;
        font-weight: 200;
        padding-top: 5px;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
}

/*滚动条样式*/
.message-search /deep/ .ivu-auto-complete.ivu-select-dropdown::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.message-search /deep/ .ivu-auto-complete.ivu-select-dropdown::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.message-search /deep/ .ivu-auto-complete.ivu-select-dropdown::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #e6ecf0;
}
</style>
<template>
    <div class="message-search">
        <AutoComplete
            v-model="searchValue"
            ref="autoSearch"
            icon="ios-search"
            placeholder="搜索"
            filter-method
            @on-search="onSearch"
            @on-select="onSelect"
            style="width:205px">
            <div class="demo-auto-complete-item" v-for="(item,index) in data" :key="index">
                <div class="demo-auto-complete-group">
                    <span>{{ item.title }}</span>
                </div>
                <Option v-for="option in item.children" :value="option.id" :key="option.id">
                    <span class="demo-auto-complete-title">{{ option.name }}</span>
                    <p class="demo-auto-complete-count">包括：王小英</p>
                </Option>
            </div>
        </AutoComplete>
    </div>
</template>
<script>
import { getGroupsByName,getGroupByUserId } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'NavSearch',
    data(){
        return {
            searchValue: "",
            data: [
                {
                    title: '联系人',
                    children: []
                },
                {
                    title: '群聊',
                    children: []
                }
            ]
        }
    },
    watch:{
      searchValue: function(value) {
        if(!value) {
          this.data[1].children = [];
          this.data[0].children = [];
          this.$refs["autoSearch"].$children[0].hideMenu()
        }
      } 
    },
    methods: {
        onSearch() {
          this.getSearchName();
        },
        onSelect(id) {
          // this.$router.push({
          //   name: 'group',
          //   params: {groupId: g.groupId},
          //   query: {groupName:g.groupName,groupType:g.groupType}
          // })
        },
        getSearchName() {
          this.data[1].children = [];
          this.data[0].children = [];
          getGroupsByName(this.searchValue).then(res => {
            res.forEach(item => {
              if(item.type === "群聊"){
                this.data[1].children.push({
                  name: item.groupName,
                  id: JSON.stringify({groupId: item.groupId,groupType: item.groupType,groupName: item.groupName,userId: item.userId})
                })
              }else{
                this.data[0].children.push({
                  name: item.nickname,
                  id: JSON.stringify({groupId: item.groupId,groupType: item.groupType,groupName: item.groupName,userId: item.userId})
                })
              }
            })
          })
        }
    },
    mounted(){
    }
}
</script>

