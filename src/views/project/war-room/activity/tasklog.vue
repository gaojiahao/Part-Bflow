<template>
    <div>
         <taskLog :showAll="true" :allowAddLog="allowAddLog" :taskLogUrl="'projectTask/info/jobLog'"></taskLog>
    </div>
</template>

<script>
import taskLog from "@/views/form/modules/task-log";
export default {
    name:'WarRoomTaskLog',
    props:{
        allowAddLog:{
            type:Boolean,
            default(){
                return true;
            }
        }
    },
    components:{
        taskLog
    }
}
</script>