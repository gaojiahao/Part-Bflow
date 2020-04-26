<style lang="less" scoped>
@import "./files.less";
</style>
<template>
    <div class="files" id="fileHistory">
        <div class="files-header">
            <span 
                :class="{'files-header-sorting':p.key===sortProerty.key}" 
                v-for="(p,index) in fileProperty" :key="index">
                {{p.name}}
                <Icon type="ios-arrow-down" v-if="p.key===sortProerty.key && sortProerty.type==='Desc'"/>
                <Icon type="ios-arrow-up" v-if="p.key===sortProerty.key && sortProerty.type==='Asc'" />
            </span>

        </div>
        <div class="files-container compactscrollbar" ref="filesContainer ">
            <div 
                class="files-container-item" 
                :class="{'active':m.id === selectdMsg.id}"
                v-for="(m,index) in msgs" :key="index" 
                @mouseover="mouseover(m);" 
                @mouseout="mouseout(m);"
                @click="handlerSelectMsg(m)"
                >
                <div class="files-container-item-content">
                    <img class="flie-img" width="38" :src="m.content|filedTypeFilter">
                    <div class="files-container-item-content-info">
                        <div class="files-container-item-content-info-content">
                        <!-- <a :href="'/H_roleplay-si/ds/downloadById?id='+m.id" >{{m.content}}</a> -->
                        {{m.content}}
                        <Time class="fr" :time="m.crtTime" />
                        </div>
                        <div class="files-container-item-content-info-other font12">
                            {{m.size}}|{{m.creatorName}}
                            <a class="fr" @click=" goTop(m.id)" v-if="m.showResourceBtn">查看源消息</a>
                        </div>
                    </div>
                     
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import Bus from "@/assets/eventBus.js";
import {
  getAttachmentByListId
} from "@/services/notificationsService";
import { getMessagesByImType } from "@/services/imService";
export default {
    name:'Files',
    data(){
        return {
            pageParam:{
                page:1,
                limit:100
            },
            msgs:[],
            fileProperty:[
                {name:'类型',key:'type'},
                {name:'名称',key:'name'},
                {name:'大小',key:'size'},
                {name:'来源',key:'catraor'},
                {name:'时间',key:'ctrTime'}
            ],
            sortProerty:{
                key:'ctrTime',
                type:'Desc'
            },
            selectdMsg:{}
        }
    },
     methods:{
         goTop(id){
             Bus.$emit('toMessage',id);
         },
        mouseover(m){
            //一开始消息对象并没有showResourceBtn属性，所有执行$set函数
            this.$set(m,'showResourceBtn',true);
        },
        mouseout(m){
            m.showResourceBtn = false;
        },
        handlerSelectMsg(m){
            this.selectdMsg = m;
        },
        downLoadfiles(url) {
            window.open(url);
        },
        getMessages(){
            getMessagesByImType({
                 ...this.pageParam,
                groupId:this.$route.params.groupId,
                imType:4
            }).then(res=>{
                this.msgs = res;
            });
        }
    },
    mounted(){
        this.getMessages();
    }
}
</script>

