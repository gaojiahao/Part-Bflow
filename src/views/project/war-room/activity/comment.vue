<template>
    <div>
        <userComments ref='taskComments' :allowAddSubscribeUsers='false' :commentUrl="'projectTask/info/comment'"></userComments>
    </div>
</template>

<script>
import userComments from "@/views/form/instance-comments";
export default {
    name:'WarRoomComment',
    components:{
        userComments
    }
}
</script>