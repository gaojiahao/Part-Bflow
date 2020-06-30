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
   .message-search-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
        text-align: left;
    }
    .message-search-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .message-search-complete-group span{
        color: #999;
    }
    .message-search-complete-count{
        color: #999;
        font-weight: 200;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .message-search-complete-more{
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
            :clearable='true'
            @on-search="onSearch"
            @on-select="onSelect"
            style="width:205px">
            <div class="message-search-complete-item" v-for="(item,index) in data" :key="index">
                <div class="message-search-complete-group" v-if="item.children.length">
                    <span>{{ item.title }}</span>
                </div>
                <Option v-for="option in item.children" :value="option.id" :key="option.id">
                    <div>
                      <img :src="option.avatar" onerror="src='https://lab.roletask.com/resource/common-icon/male.png'"  width="45"  >
                      <div style="display: inline-table;
                        vertical-align: top;
                        padding-left: 5px;
                        line-height: 24px;">
                        <p>{{ option.name }}</p>
                        <p class="message-search-complete-count" v-if="option.type==='通讯录'">通讯录</p>
                        <p class="message-search-complete-count" v-if="option.type==='群聊'">包括：{{option.users}}</p>
                      </div>
                    </div>
                    
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
            data: []
        }
    },
    watch:{
      searchValue: function(value) {
        if(!value) {
          this.data = [];
          this.$refs["autoSearch"].$children[0].hideMenu()
        }
      } 
    },
    methods: {
        onSearch() {
          this.getSearchName();
        },
        onSelect(id) {
          let itemId = JSON.parse(id);
          if(itemId.groupId){
            this.$router.push({
              name: 'group',
              params: {groupId: itemId.groupId},
              query: {groupName: itemId.groupName,groupType: itemId.groupType}
            })
          }else{
            getGroupByUserId({userId: itemId.userId}).then(res => {
              res.message && this.$Message.success(res.message);
              Bus.$emit('updateGroupName');
              this.$router.push({
                name: 'group',
                params: {groupId: res.groupId},
                query: {groupName: res.groupName,groupType: res.groupType}
              })
            })
          }
          this.searchValue = "";
        },
        getSearchName() {
          if(this.searchValue){
            this.data = [ {
                    title: '联系人',
                    children: []
                },
                {
                    title: '群聊',
                    children: []
                }];
            getGroupsByName(this.searchValue).then(res => {
              res.forEach(item => {
                if(item.type === "群聊"){
                  this.data[1].children.push({
                    name: item.groupName,
                    users: item.users,
                    type: item.type,
                    avatar:item.groupIcon,
                    id: JSON.stringify({groupId: item.groupId,groupType: item.groupType,groupName: item.groupName,userId: item.userId})
                  })
                }else{
                  this.data[0].children.push({
                    name: item.nickname,
                    type: item.type,
                    avatar:item.groupIcon,
                    id: JSON.stringify({groupId: item.groupId,groupType: item.groupType,groupName: item.nickname,userId: item.userId})
                  })
                }
              })
            })
          }
        }
    },
    mounted(){
    }
}
</script>

