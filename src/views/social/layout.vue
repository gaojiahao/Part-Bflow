<style lang="less" scoped>
@import "./layout.less";
</style>
<template>
    <div class="social">
        <!-- <div class="social-sider"> -->
            <!-- <div class="social-sider-item">
                <Icon type="md-menu" color="#fff" size=26  />
            </div>

            <router-link :to="{ name:'message'}">
                <div class="social-sider-item" v-bind:class="{ 'active':$route.path.includes('message') }">
                    <Icon type="ios-chatbubbles-outline"  color="#fff" size=26 />
                </div>
            </router-link>
            
            <router-link :to="{ name:'flowtask'}">
                <div class="social-sider-item" v-bind:class="{ 'active':$route.path.includes('flowtask') }">
                    <Icon type="md-clipboard" color="#fff" size=26 />
                </div>
            </router-link> -->
            
            <!-- <div class="social-sider-item">
                //同事圈
                <Icon type="ios-help-buoy"  color="#fff" size=26 />
            </div>

            <div class="social-sider-item">
                //文件柜
                <Icon type="ios-folder-outline"  color="#fff" size=26 />
            </div>

            <div class="social-sider-item">
                //知识库
                <Icon type="ios-school-outline"  color="#fff" size=30 />
            </div> -->
        <!-- </div> -->
        <div class="social-content">
             <router-view></router-view>
        </div>
    </div>
</template>
<script>

import notifications from  '@/views/notifications/notifications.vue'
export default {
    name:"SocialLayout",
    components:{
        notifications
    }
    
}
</script>
