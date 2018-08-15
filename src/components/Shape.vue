<template>
   <rect :width="width" :height="height"
        rx="8" 
        ry='8'
        :x="xAxion" :y="yAxion" stroke-width='2' 
        :fill="color" 
        :stroke="borderColor" 
        class='cirle'        
        @click='changeLineStyle'
        >
    </rect>   
</template>

<script>
export default {
    data(){
        return{}

    },

    methods:{
        changeLineStyle:function(){
            this.$emit('changeLineStyle')
        }
    },

    props:['shape','xAxion','yAxion','color','borderColor','width','height']
};
</script>

<style>
/* .cirle:hover{
    stroke:red;
    cursor: pointer;
} */
</style>
