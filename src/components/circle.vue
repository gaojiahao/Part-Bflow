<template>
   <rect :width="length" :height="length" 
        :rx="rx" 
        :x="xAxion" :y="yAxion" stroke-width='0.5' 
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

    props:['length','xAxion','yAxion','color','borderColor','rx']
};
</script>

<style>
.cirle:hover{
    fill:#4c5261;
    cursor: pointer;
}
</style>
