<template>
    <div>群成员
        <div  v-for="(m,index) in  members" :key="index">
           <img height="20" src="https://lab.roletask.com/resource/common-icon/male.png"> 
           {{m.nickname}}<span v-if="m.isOwner">.群主</span>
        </div>
    </div>
</template>

<script>
import {getMembers} from "@/services/imService";
export default {
    name:'groupMenber',
    data(){
        return{
            members:[]
        }
    },
    methods:{
        init(){
            getMembers(this.$route.params.groupId).then(res=>{
                this.members = res;
            });
        }
    },
     watch: {
        $route(to, from) {
            this.init();
        }
    },
    mounted(){
        this.$nextTick(()=>{
           this.init();
        })
    },
    updated: function () {
            // this.init();

        // this.$nextTick(function () {
        // })
    }
}
</script>