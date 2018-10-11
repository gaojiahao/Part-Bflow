<style lang="less" scoped>
@import "./message-layout.less";
</style>
<template>
    <div class="message">
        <div class="message-sider">
            <div class="message-sider-header">消息通知</div>
            <div class="message-sider-list">
                <router-link :to="{ name:'todo'}">
                
                    <div class="message-sider-list-item" v-bind:class="{ 'active':$route.name=='todo' }">
                        <Icon type="ios-cloud" color="#e76838" size=30 />
                        所有待办
                    </div>
                </router-link>
               
            </div>
        </div>
        <div class="message-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'MessageLayout',
    data(){
        return {
        }
    },
    watch:{
       
    },
    mounted(){
    }
}
</script>

