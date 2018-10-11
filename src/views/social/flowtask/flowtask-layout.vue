<style lang="less" scoped>
@import "./flowtask-layout.less";
</style>
<template>
    <div class="flowtask">
        <div class="flowtask-sider">
            <div class="flowtask-sider-header">工作流任务</div>
            <div class="flowtask-sider-list">
                <router-link :to="{ name:'todo'}">
                
                    <div class="flowtask-sider-list-item" v-bind:class="{ 'active':$route.name=='todo' }">
                        <Icon type="ios-cloud" color="#e76838" size=30 />
                        所有待办
                    </div>
                </router-link>

            

                <router-link :to="{ name:'done'}">
                    <div class="flowtask-sider-list-item" v-bind:class="{ 'active':$route.name=='done' }">
                        <Icon type="md-cloud-done" color="#00adb5" size=30 />
                        所有已办
                    </div>
                </router-link>


                <router-link :to="{ name:'all'}">
                    <div class="flowtask-sider-list-item" v-bind:class="{ 'active':$route.name=='all' }">
                        <Icon type="md-laptop" color="#1fe5bd" size=30 />
                        所有任务
                    </div>
                </router-link>

                <router-link :to="{ name:'reports'}">
                    <div class="flowtask-sider-list-item" v-bind:class="{ 'active':$route.name=='reports' }">
                        <Icon type="ios-pie" color="#53cde2" size=30 />
                        统计报表
                    </div>
                </router-link>

                <router-link :to="{ name:'draftbox'}">
                    <div class="flowtask-sider-list-item" v-bind:class="{ 'active':$route.name=='draftbox' }">
                        <Icon type="ios-folder-open" color="#f8b500" size=30 />
                        草稿箱
                    </div>
                </router-link>
            </div>
        </div>
        <div class="flowtask-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'FlowTaskLayout',
    data(){
        return {
        }
    },
    watch:{
        $route(to, from) {
        }
    },
    mounted(){
        // this.routeName = this.$route.name;
    }
}
</script>

