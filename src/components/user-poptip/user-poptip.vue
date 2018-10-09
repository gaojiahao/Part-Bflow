<template>
     <Poptip :trigger="trigger"  :transfer="true" >
        <slot name="triggerContent"></slot>
        <div slot="content">
           
        </div>
    </Poptip>
</template>

<script>
export default {
    name:'UserPoptip',
    props:{
        userId:{
            type:String,
            default:undefined
        },
        trigger:{
            type:String,
            default:'hover'
        }
    },
    data:{

    },
    methods:{
        refreshUserInfo:function () {
            
        }
    }
}
</script>

