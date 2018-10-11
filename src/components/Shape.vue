<template>
    <svg>
        <circle 
            :cx="xAxion" 
            :cy="yAxion"
            r="25"
            stroke="#03448a" 
            stroke-width='2' 
            :fill="color" 
            >
        </circle>  
        <text 
            :x="xAxion" 
            :y="yAxion-6" 
            fill="#fff" 
            style="font-size:14px;font-weight:bold" 
            class="svg-text-common-style">
                {{text}}
        </text> 
    </svg>
</template>

<script>
export default {
    props:['xAxion','yAxion','color','text']
};
</script>
