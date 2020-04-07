<template>
    <h3>{{group.groupName}}
        <Icon class="fr" type="ios-more" size="40" style="font-size: 40px;cursor: pointer;"/>
    </h3>
</template>
<script>
export default {
    name:'groupHeader',
    data(){
        return {
            group:{
                groupName:'',
                groupId:'',
                groupType:''
            }
        }
    },
    watch: {
        $route(to, from) {
            this.initGroupInfo();
        },
    },
    methods:{
        initGroupInfo(){
             this.group = {
                groupId:this.$route.params.groupId,
                ...this.$route.query
            }
        }
    },
    mounted(){
        this.initGroupInfo();
    }
}
</script>