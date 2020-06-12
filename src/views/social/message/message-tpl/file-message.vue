<style lang="less" scoped>

</style>
<template>

   <span  contenteditable="false" class="file-content" >
      <img class="flie-img" width="38" :src="file.content|fileTypeFilter">
      <div class="file-content-info">
        <p>
        <a @click="downLoadFile(file.id)">{{file.content}}</a>
        </p>{{file.size}}KB<p>
        </p>
      </div>
    </span>
</template>

<script>
export default {
    name:'FileMessage',
    data(){
        return {
          
        }
    },
    props:{
       file:{
         type:Object,
         default(){
           return {};
         }
       }
    },
    methods:{
       downLoadFile(id){
          window.top.open(`/H_roleplay-si/ds/downloadById?id=${id}`)
       }

    },
    mounted(){
        
    }
}
</script>