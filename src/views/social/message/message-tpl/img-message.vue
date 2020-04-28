<template>
    <div>
        <img class="paste-img" 
            @dblclick.native="handleViewImg" 
            :src="'/H_roleplay-si/ds/downloadById?id='+resourceId" 
          />
    </div>

</template>

<script>
export default {
    name:'ImgMessage',
    data:{
    },
    props:{
        resourceId:{
            type:String,
            default(){
                return '';
            }
        }
    },
    methods:{
        handleViewImg:function () {
            this.imgName = '/H_roleplay-si/ds/downloadById?id='+this.resourceId;
            this.imgModalVisible = true;
        }
    }
}
</script>