<style lang="less" scoped>

</style>
<template>
   <span  contenteditable="false" class="file-content" >
      <img class="flie-img" width="38" :src="file.content|fileTypeFilter">
      <div class="file-content-info">
        <p>
        <a :href="'/H_roleplay-si/ds/downloadById?id='+file.id">{{file.content}}</a>
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
       
    },
    mounted(){
        
    }
}
</script>