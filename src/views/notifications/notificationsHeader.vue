<template>
    <div class="notificas-layout-content-header">
        <div>
            <b>{{nav.listName}}</b> 
            【{{nav.transName}}】管理员:{{nav.administratorName}}
                <Icon class="fr" @click="handleExpend" type="ios-more" size="40" style="font-size: 40px;cursor: pointer;"/>
        </div>
        <p style="font-size: 12px;color: rgb(146, 154, 171);height: 20px;" v-html="nav.comment"></p>
        
    </div>
</template>

<script>
export default {
    name:'notificationsHeader',
    props:{
        nav:{
            type:Object,
            default:function() {
                return {};
            }
        },
        handleExpendHistory:{
            type:Function
        }
    },
    methods:{
        handleExpend:function () {
            this.expend = !this.expend;
            this.handleExpendHistory(this.expend);
        }
    },
    data(){
        return {
            expend:false
        }
    },
}
</script>

