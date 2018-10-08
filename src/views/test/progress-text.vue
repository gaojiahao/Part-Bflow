<template>
    <div style="background: #fff;">
        <progress-ring 
            :radius=30
            :progress="progress" 
            :strokeWidth=3 
            progressColor='#9C27B0'>
        </progress-ring>

       <progress-ring 
            :radius=30
            :progress="progress" 
            :strokeWidth=3 
            progressColor='#9C27B0'>
        </progress-ring>
    </div>
</template>

<script>
import ProgressRing from '@/components/progress-ring';
export default {
    name:'ProgressText',
    components: {
        'progress-ring': ProgressRing
    },
    data() {
    return { progress: 69 }
    },
    mounted() {
        // emulating progress
        // const interval = setInterval(() => {
        // this.progress += 10;
        // if (this.progress === 80)
        //     clearInterval(interval);
        // }, 100);
    },
}
</script>

