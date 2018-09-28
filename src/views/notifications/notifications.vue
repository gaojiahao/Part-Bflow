<style lang="less">
@import "./notifications.less";
</style>
<template>
    <div class="notificas">
        <Row type="flex" justify="center" class="notificas-content notificas-layout">

            <Col span="4" class="bg_ff notificas-layout-sider ">
                <notifi-layout-sider :handleAvtiveNav='handleAvtiveNav'></notifi-layout-sider>
             </Col>

            <Col span="16" class="notificas-list bg_ff notificas-layout-content" >
               
                <notifications-header 
                    :nav='avtiveNav' 
                    v-if="avtiveNav.listName" 
                    :handleExpendHistory="handleExpendHistory">
                </notifications-header>
                
                <Row class="notificas-layout-content-notificwin" >
                    <Col :span="expendHistoryVisbible?'16':'24'" class="notificas-layout-content-notificwin-msg">
                       <notifilist 
                            ref='notifilist'  
                            :listId="avtiveNav.listId" 
                            v-if="avtiveNav.listId">
                        </notifilist>
                    </Col>
                    <Col span="8" v-if="expendHistoryVisbible" class="notificas-layout-content-notificwin-orderlist" >
                        <notifi-history 
                            :listId="avtiveNav.listId" 
                            :expendVisbible="expendHistoryVisbible" 
                            v-if="avtiveNav.listId">
                        </notifi-history>
                    </Col>
                    
                </Row>
            </Col>
        </Row>


      
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
            this.avtiveNav = nav;
        },
        handleExpendHistory(expendVisible){
            this.expendHistoryVisbible = expendVisible;
        }
       
    },
    mounted(){
    }
}
</script>
