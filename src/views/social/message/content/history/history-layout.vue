<style lang="less" scoped>
@import "./history-layout.less";
</style>
<template>
    <div class="message-history">
        
        <Row type="flex" justify="space-around" class="message-history-header" >
             <Col span="6">
                <router-link :to="{ name:'all'}">
                    <Button size=small  :type="$route.name=='all'?'primary':'text'" >全部</Button>
                </router-link>
            </Col>
            <Col span="6">
                <router-link :to="{ name:'files'}">
                    <Button size=small  :type="$route.name=='files'?'primary':'text'" >文件</Button>
                </router-link>
            </Col>
            <Col span="6">
                <router-link :to="{ name:'images'}">
                    <Button size=small :type="$route.name=='images'?'primary':'text'">图片/视频</Button>
                </router-link>
            </Col>
        </Row>

        <div class="message-history-content">
            <router-view></router-view>
        </div>
        
       
    </div>
</template>

<script>

export default {
    name:'MessageHistory',

    data(){
        return {
            msgs:[]
        }
    },
    methods:{
         init(){
           
        }
    },
    mounted(){
        this.init();
    }

}
</script>

