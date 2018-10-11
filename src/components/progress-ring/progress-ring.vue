<template>
    <svg 
        :height="radius * 2" 
        :width="radius * 2" 
    >
        <circle 
            :stroke="bottomColor" 
            fill="transparent" 
            :stroke-width="strokeWidth" 
            :r="normalizedRadius" 
            :cx="radius" 
            :cy="radius" 
        /> 

         <circle 
            :stroke="progressColor" 
            fill="transparent" 
            :stroke-dasharray="circumference + ' ' + circumference" 
            :style="{ strokeDashoffset }" 
            :stroke-width="strokeWidth" 
            :r="normalizedRadius" 
            :cx="radius" 
            :cy="radius" 
        />  
        <text :x="radius " :dy="radius-3" style="fill: gray;font-weight: 600; text-anchor: middle; baseline-shift: sub; font-family: sans-serif;" >{{progress}}%</text>
    </svg>
</template>

<script>

export default {
    name: "ProgressRing",
    props: {
        //进度环直径
        radius: Number,
        //进度,比例
        progress: Number,
        //进度换宽度
        strokeWidth: Number,
        //进度环底色
        bottomColor:{
            default:function () {
                return '#f0f0f0';
            }
        },
        //进度环填充色
        progressColor:{
            default:function (params) {
                return 'green';
            }
        }

    },
    computed: { 
        strokeDashoffset() { 
            return this.circumference - this.percent / 100 * this.circumference;
        } 
    },

    watch:{
        progress(){
            this.percent = 0;
            const interval = setInterval(() => {
                this.percent += 1;
                if (this.progress === this.percent){
                    clearInterval(interval);
                }else if(this.progress === 0){
                    clearInterval(interval);
                }
            }, 10);
        }
    },
    data() {
        const normalizedRadius = this.radius - this.strokeWidth * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const percent = 0;
        return { normalizedRadius, circumference, percent };
    },
    mounted(){
        this.percent = 0;

        //实现动画效果
        const interval = setInterval(() => {
            this.percent += 1;
            if (this.progress === this.percent){
                clearInterval(interval);
            }else if(this.progress === 0){
                clearInterval(interval);
            }
        }, 10);
    }
};
</script>
