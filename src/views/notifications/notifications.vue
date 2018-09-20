<style lang="less">
@import "./notifications.less";
</style>
<template>
    <div class="notificas">
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="8" class="bg_ff marlr10" style="min-width: 500px;">
                <div class="notificas-header">
                    <span class="marlr10">应用</span>
                    <span class="marlr10">实例</span>
                </div>
                <div class="notificas-item" v-for="(n,index) in  notifications" :key="index">
                    <img class="notificas-item-img" 
                        onerror="src='resources/images/icon/defaultUserPhoto.jpg'"
                        :src="n.photo">
                    <div class="notificas-item-content">
                        <div class="notificas-item-content-title">
                            {{n.creatorName}}
                        </div>
                        <div class="notificas-item-content-subtitle">
                            <p v-if="n.type=='listComment'">
                                <span>评论了您负责的应用</span>
                                <a>【销售订单】</a> 
                                <span v-overTimeDirective="{time:n.crtTime}"></span>
                            <p v-if="n.type=='instanceComment'">
                                <span>评论了您创建的实例</span>
                                <a>【WL1536231288652】</a> 
                                <span v-overTimeDirective="{time:n.crtTime}"></span>
                            <p v-if="n.type=='replyComment'">
                                <span>回复了您</span>
                                <a>【WL1536231288652】</a> 
                                <span v-overTimeDirective="{time:n.crtTime}"></span>
                            <p v-if="n.type=='praise'">
                                <span>给您点赞啦</span>
                                <span v-overTimeDirective="{time:n.crtTime}"></span>
                            </p>
                        </div>

                        <div class="notificas-item-content-txt" v-if="n.type!='praise'">
                            <div v-html="n.content"></div>
                        </div>
                    </div>
                </div>
                <div class="notificas-footer" v-if="visiblebuttom">我是有底线的</div>
            </Col>
        </Row>
    </div>
</template>
<script>
import {
  getAllnotifications
} from "@/services/notificationsService";
export default {
    name:'notifications',
    data(){
        return {
            notifications:[
            ],
            visiblebuttom:false,
            pageInfo:{
                page:1,
                limit:10,
            }
        }
    },
    methods:{
        resreshNotifics(){
            getAllnotifications(this.pageInfo).then(res =>{
                this.notifications =  this.notifications.concat(res.tableContent);
                if(this.notifications === res.dataCount){
                    this.visiblebuttom = true;
                }
            });
        },
        handleScroll () {
            
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if(document.body.scrollHeight  === (document.body.clientHeight+scrollTop)){
                this.pageInfo.page++;
                this.resreshNotifics();
            }
        },

        //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream;
            let userId = this.$currentUser.userId;
            //消息订阅
            deepstream.event.subscribe("commentMessage/" + userId, msg => {
                this.notifications.unshift(...msg.tableContent);
            });
        },
        
    },
    mounted(){
        this.resreshNotifics();
        this.subscribeMessage();
        window.addEventListener('scroll', this.handleScroll)
    }
}
</script>
