<style lang="less" scoped>
@import "./history-layout.less";
</style>
<template>
    <div class="message-history">
        
        <Row type="flex" justify="space-around" class="message-history-header" >
             <Col span="6">
                <router-link :to="{ name:'all',query:$route.query}">
                    <Button size=small  :type="$route.name=='all'?'primary':'default'" >全部</Button>
                </router-link>
            </Col>
            <Col span="6">
                <router-link :to="{ name:'files',query:$route.query}">
                    <Button size=small  :type="$route.name=='files'?'primary':'default'" >文件</Button>
                </router-link>
            </Col>
            <Col span="6">
                <router-link :to="{ name:'images' ,query:$route.query}">
                    <Button size=small :type="$route.name=='images'?'primary':'default'">图片</Button>
                </router-link>
            </Col>
        </Row>

        <div class="message-history-serch">
            <Select v-model="serchValue" 
                placeholder="搜索"
                filterable multiple  
                :clearable="true"    
                @on-query-change="onQueryChange" 
                @on-change="onChange" 
                @on-select="onSelect">
                <OptionGroup :label="groupLabel">
                    <Option v-for="item in serchItems" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </OptionGroup>        
            </Select>
        </div>

        <div class="message-history-content">
            <router-view></router-view>
        </div>
        
       
    </div>
</template>

<script>
import Bus from "@/assets/eventBus.js";
export default {
    name:'MessageHistory',

    data(){
        return {
            serchItems:[],
            serchValue:[],
            groupLabel:'聊天记录'
        }
    },
    methods:{
         onQueryChange(value){
            this.serchItems = [];
            this.serchItems.push({
                key:'content',
                value:value,
                label:'聊天记录'
              });
        },
        onSelect(item){
            item.label = `${this.groupLabel}:${item.label}`;
        },
        onChange(value){
            Bus.$emit('serchMessage',value.join(' '));
        }
    },
    mounted(){
    }

}
</script>

