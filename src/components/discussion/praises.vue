<style lang="less" scoped>
    @import "./praises.less";
</style>
<template>
   <div class="praises" >
        <p>共<b>{{comment.praiseNum}}</b>人点赞</p>
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
        <div class="pageBar">
            <Button  @click="handlePre" v-if="pageInfo.page>1">上一页</Button>
            <Button @click="handleNext" v-if="pageInfo.page<Math.ceil(comment.praiseNum/20)">下一页</Button>
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
            userInfo:{},
            pageInfo:{
                commentId:this.comment.id,  
                limit:20, 
                page:1, 
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
            }
        };
    },
    methods: {
        refreshPraises:function () {
            getCommentThumbaUps(this.pageInfo).then(res=>{
                this.praises = res.tableContent;
                this.comment.praiseNum = res.dataCount;
            });
        },
        showUserInfo(userId) {
            getUserInfoByUserId(userId).then(res => {
                if (res.dataCount) {
                    this.userInfo = res.tableContent[0];
                }
            });
        },
        handlePre:function () {
            this.pageInfo.page--;
            this.refreshPraises();
        },
        handleNext:function () {
            this.pageInfo.page++;
            this.refreshPraises();
        }
    },
    mounted(){
        this.refreshPraises();
    }
}
</script>

