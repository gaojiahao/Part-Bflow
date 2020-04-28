<template>
    <span v-html="formatToEmotion(msg.content)"></span>
</template>



<script>

export default {
    name:'TextMessage',
    props:{
        msg:{
            type:Object,
            default(){
                return {};
            }
        }
    }
}
</script>