<style lang="less" scoped>
.all-message{
    height: 100%;
    overflow-y: auto;
    border-top: 1px solid #ddd;
    &-item{
        margin: 18px 15px;
        word-wrap: break-word;

        /deep/ .paste-img{
            width: 100px;
        }

         /deep/ .file-content{
                display: inline-block;
                cursor: pointer;
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 5px;
                margin: 3px;
                background-color: white;

                &-info{
                    display: inline-table;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    p{
                    width: 145px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    }
                }
            }   
    }
}
.isMySelf{
    color: #2d8cf0;
}
</style>
<template>
    <div class="all-message compactscrollbar" ref="allMessage">
        <div class="all-message-item" v-for="(m,index) in msgs" :key="index">
            <div class="font12" v-bind:class="{isMySelf:m.isMySelf}">{{m.creatorName}} {{m.crtTime}}</div>
            <div class="all-mess-item-content">
                <!-- <p v-html="m.content"></p> -->
                <span v-if="m.imType===1" v-html="formatToEmotion(m.content)"></span>
                
                <span v-if="[2,3,4].includes(m.imType)" >
                  <span v-for="(c,index) in m.content" :key="index">
                    <span v-if="c.imType===1" v-html="c.content"></span>
                    <img class="paste-img" v-if="c.imType===2" :src="'/H_roleplay-si/ds/downloadById?id='+c.id" />
                    <br>
                    <span  contenteditable="false" class="file-content" v-if="c.imType===4" >
                      <img class="flie-img" width="38" :src="c.content|fileTypeFilter">
                      <div class="file-content-info">
                        <p>
                        <a :href="'/H_roleplay-si/ds/downloadById?id='+c.id">{{c.content}}</a>
                        </p>{{c.size}}<p>
                        </p>
                      </div>
                    </span>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {
  getMessagesByGroupId
} from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'allMessage',
    data(){
        return {
            msgs:[],
            pageParam:{
                page:1,
                limit:30
            },
            allLoad:false,
            serchContent:''
        }
    },
     watch: {
        $route(to, from) {
            this.getMessages();
        }
    },
    methods:{
         getMessages(){
            getMessagesByGroupId({
                ...this.pageParam,
                content:this.serchContent,
                groupId:this.$route.params.groupId
            }).then(res=>{
                if(res.length<this.pageParam.limit){
                    this.allLoad = true;
                }

                 res.msgs.map(m=>{
                    if([2,3,4].includes(m.imType)){
                        m.content = JSON.parse(m.content);
                    }
                });
                if(this.serchContent){
                    this.msgs= res.msgs;
                }else{
                    this.msgs.unshift(...res.msgs);
                }
            });
        },
        initEvents(){
            var that= this;
            this.$refs.allMessage.addEventListener('scroll', function() {
                if(arguments[0].target.scrollTop===0 && !that.allLoad && !that.serchContent){
                    that.pageParam.page++;
                    that.getMessages();
                }
            });

            Bus.$on('serchMessage',value=>{
                if(this.$route.name === 'all'){
                    this.pageParam.page=1;
                    this.serchContent = value;
                    this.getMessages();
                }
            })


        },
        scrollToBottom(){
            this.$nextTick(() => {
                if(this.pageParam.start===1){
                this.$refs.allMessage.scrollTop  = this.$refs.allMessage.scrollHeight;
                }else{
                this.$refs.allMessage.scrollTop  = 200;
                }
            });
        }
    },
    mounted(){
        this.getMessages();
        this.initEvents();
    },
     updated(){
        this.scrollToBottom();
    }
}
</script>