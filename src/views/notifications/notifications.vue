<style lang="less" scoped>
@import "./notifications.less";
</style>
<template>
    <div class="notificas">
        <div  class="notificas-content notificas-layout">
            <div  class="bg_ff notificas-layout-sider ">
                <notifi-layout-sider :handleAvtiveNav='handleAvtiveNav'></notifi-layout-sider>
             </div>
            <div  class="notificas-list bg_ff notificas-layout-content" >
                <notifications-header 
                    :nav='avtiveNav' 
                    :handleExpendHistory="handleExpendHistory">
                </notifications-header>
                <Row class="notificas-layout-content-notificwin" >
                    <Col :span="expendHistoryVisbible?'16':'24'" class="notificas-layout-content-notificwin-msg">
                       <notifilist 
                            ref='notifilist'  
                            :listId="avtiveNav.listId" 
                            v-if="avtiveNav.listId">
                        </notifilist>

                        <div v-if="!avtiveNav.listId" style="height: 100%;width: 100%;position: relative;">
                            <Icon style="font-size: 50px;position: absolute;left: 50%;top: 50%;" type="ios-notifications-outline" :size=60 />
                        </div>
                        
                    </Col>
                    <Col span="8" v-if="expendHistoryVisbible" class="notificas-layout-content-notificwin-orderlist" >
                        <notifi-history 
                            ref='noticeHistory'  
                            :listId="avtiveNav.listId" 
                            :expendVisbible="expendHistoryVisbible" 
                            v-if="avtiveNav.listId">
                        </notifi-history>
                    </Col>
                    
                </Row>
            </div>
           
        </div>
    </div>
</template>
<script>

import notifilist from "@/views/notifications/notifilist";
import notifiLayoutSider from "@/views/notifications/notifiLayoutSider";
import notifiHistory from "@/views/notifications/notifiHistory";
import notificationsHeader from "@/views/notifications/notificationsHeader";

export default {
    name:'notifications',
    components: {
        notifilist,
        notifiLayoutSider,
        notifiHistory,
        notificationsHeader
    },
    data(){
        return {
            avtiveNav:{},
            expendHistoryVisbible:false
        }
    },
    methods:{
       
        handleAvtiveNav(nav){
            this.$forceUpdate();
            this.avtiveNav = nav;

            if(this.$refs.notifilist){
                this.$refs.notifilist.navId = nav.listId;
                this.$refs.notifilist.params.page = 1;
                this.$refs.notifilist.isRolling = false;
                this.$refs.notifilist.refreshNotifics();
            }
            
        },
        handleExpendHistory(expendVisible){
            this.expendHistoryVisbible = expendVisible;
        }
    },
    mounted(){
    }
}
</script>
