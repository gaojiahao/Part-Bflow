<style lang="less" scoped>
@import "./message-layout.less";
</style>
<template>
    <div class="message">
        <div class="message-sider">
            <div class="message-sider-header">消息通知</div>
            <div class="message-sider-list ">
                <navigation></navigation>
            </div>
        </div>
        <div class="message-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Navigation from './navigation/navigation';
export default {
    name:'MessageLayout',
    components:{
        Navigation
    },
    data(){
        return {
        }
    },
    watch:{
       
    },
    mounted(){
        let activeNavigatioIdOfNotice = localStorage.getItem('activeNavigatioIdOfNotice');

        if(activeNavigatioIdOfNotice){
            this.$router.push('/social/message/list/' + activeNavigatioIdOfNotice);
        }
    }
}
</script>

