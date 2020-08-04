<style lang="less" scoped>
@import "./files.less";
</style>
<template>
    <div class="files" id="fileHistory">
        <div class="files-header">
            <span 
                @mouseover="mouseoverSortItem(p);" 
                @mouseout="mouseoutSortItem(p)"
                @click="clickSortItem(p)"
                :class="{'files-header-sorting':p.key===sortProerty.property}" 
                v-for="(p,index) in fileProperty" :key="index">
                {{p.name}}
                <Icon type="ios-arrow-down" 
                    v-show="(p.key===sortProerty.property && sortProerty.direction==='DESC') 
                    || (p.key!=sortProerty.property && p.show)"/>
                <Icon type="ios-arrow-up" 
                    v-show="p.key===sortProerty.property && sortProerty.direction==='ASC'" />
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
                    <img class="flie-img" width="38" :src="m.content.content|fileTypeFilter">
                    <div class="files-container-item-content-info">
                        <div class="files-container-item-content-info-content">
                        {{m.content.content}}
                        <Time class="fr" :time="m.crtTime" />
                        </div>
                        <div class="files-container-item-content-info-other font12">
                            {{m.size}}KB|{{m.creatorName}}
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
                {name:'名称',key:'content'},
                {name:'大小',key:'size'},
                {name:'来源',key:'creator'},
                {name:'时间',key:'crtTime'}
            ],
            sortProerty:{
                property:'crtTime',
                direction:'DESC'
            },
            serchContent:'',
            selectdMsg:{}
        }
    },
     methods:{
        mouseoverSortItem(p){
            this.$set(p,'show',true);
        },
        mouseoutSortItem(p){
            p.show = false;
         },
         clickSortItem(p){
            if(p.key===this.sortProerty.property){
                this.sortProerty.direction= this.sortProerty.direction==='DESC'?'ASC':'DESC';
             }else{
                this.sortProerty  = {
                    property:p.key,
                    direction:'DESC'
                };
             }
           
            this.getMessages();
         },
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
                content:this.serchContent,
                sort:JSON.stringify([this.sortProerty]),
                imType:4
            }).then(res=>{
                res.map(r=>{
                    r.content = JSON.parse(r.content);
                });
                this.msgs = res;
            });
        }
    },
    mounted(){
        this.getMessages();
        Bus.$on('serchMessage',value=>{
            if(this.$route.name === 'files'){
                this.serchContent = value;
                this.getMessages();
            }
        })
    }
}
</script>

