<template>
    <div>
        <img class="paste-img" 
            @dblclick="handleViewImg" 
            :src="'/H_roleplay-si/ds/downloadById?id='+resourceId" 
          />
    </div>

</template>

<script>
export default {
    name:'ImgMessage',
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
            this.getApp().showImgModal(`/H_roleplay-si/ds/downloadById?id=${this.resourceId}`);
        }
    }
}
</script>