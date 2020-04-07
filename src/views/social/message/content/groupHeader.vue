<style lang="less" scoped>
  .group-header /deep/ .ivu-input{
      border: 1px solid #dcdee2;
  }
  .group-title{
      font-size: 18px;
      padding: 5px;
  }
  .group-title:hover{
      background-color: #ddd;
  }
</style>
<template>
    <div class="group-header">
        <Input 
        v-if="isEdit"
        ref="inputGroup" 
        v-model="group.groupName" 
        placeholder="未知"
        @on-blur="onBlur"
        :style="{maxWidth:inputWidth}" />
        <b
            v-else 
            class="group-title"
            @click="editGroupName">
            {{group.groupName}}
        </b>
    </div>
</template>
<script>
import { setGroupName } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'groupHeader',
    data(){
        return {
            isEdit: false,
            inputWidth: '',
            initGroupName:'',
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
             this.initGroupName = this.$route.query.groupName;
        },
        editGroupName() {
            if(this.group.groupType !== 'G') return;

            this.isEdit = true;
            this.$nextTick(() => {
                this.$refs["inputGroup"].focus();
                this.inputWidth = this.group.groupName.length * 15 + "px";
            })
        },
        onBlur() {
            this.isEdit = false;
            if(this.initGroupName === this.group.groupName) return;

            setGroupName(this.group.groupId,this.group.groupName).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    Bus.$emit('updateGroupName');
                    this.initGroupName = this.group.groupName;
                }
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        }
    },
    mounted(){
        this.initGroupInfo();
    }
}
</script>