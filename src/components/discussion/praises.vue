<style lang="less">
    @import "./praises.less";
</style>
<template>
   <div class="praises" >
        <p>共<b>{{praises.length}}</b>人点赞</p>
        <div class="praises-content">
            <span>
            <my-pop-tip 
                :userInfo="userInfo" 
                trigger="click"   >
                <img 
                    v-for="(p,index) in praises" 
                    :key="index"
                    @click="showUserInfo(p.creator)"
                    slot="userCard"
                    onerror="src='resources/images/icon/defaultUserPhoto.jpg'"
                    :src="p.photo?p.photo:'resources/images/icon/defaultUserPhoto.jpg'" 
                    width=40>
            </my-pop-tip>
        </span>
        </div>
    </div>
</template>

<script>
import { getCommentThumbaUps,getUserInfoByUserId} from "@/services/appService.js";
import MyPopTip from "@/components/poptip/MyPopTip";
export default {
    name:'praises',
    components:{
        MyPopTip
    },
    props:{
        comment:{
            type:Object,
            default:function () {
                return {}
            }
        }
    },
    data(){
        return {
            praises:[],
            userInfo:{}
        };
    },
    methods: {
        refreshPraises:function () {
            var params = {
                commentId:this.comment.id,  
                limit:50, 
                page:1, 
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
            }
            getCommentThumbaUps(params).then(res=>{
                this.praises = res.tableContent;
            });
        },
        showUserInfo(userId) {
            getUserInfoByUserId(userId).then(res => {
                if (res.dataCount) {
                this.userInfo = res.tableContent[0];
                }
            });
        }
    },
    mounted(){
        this.refreshPraises();
    }
}
</script>

