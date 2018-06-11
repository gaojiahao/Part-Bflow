<template>
   <rect :width="length" :height="length" 
        :x="xAxion" :y="yAxion" 
        stroke-width='0.5' 
        :fill="color" 
        :stroke="borderColor" 
        class='square'        
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

    props:['length','xAxion','yAxion','color','borderColor']
};
</script>

<style>
.square:hover{
    fill:#119581;
    cursor: pointer;
}
</style>
