<style lang="less" scoped>
  @import "./step.less";
</style>

<template>
    <div class="workguide">
        <div class="workguide-step">
            <Carousel v-model="stepValue" loop>
                <CarouselItem v-for="(list,index) of stepsData" :key="index">
                    <div class="demo-carousel">
                        <div class="step-num">
                            <span class="step-num-current">{{stepValue+1}}</span>
                            <span class="step-num-total">/{{total}}</span>
                        </div>
                        <h3>{{ list.title }}</h3>
                        <p>{{ list.comment }}</p>
                        <img :src="list.image"/>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    </div>
</template>

<script>
import { getworkGuideStepsById } from '@/services/workGuideService.js';

export default {
  name: "wokdGuideStep",
  components: {},
  data() {
    return {
        stepsData: [],
        total: 0,
        stepValue: 0
    };
  },
  methods: {
      getStepsData(){
          if(this.$route.params.id){
              getworkGuideStepsById(this.$route.params.id).then(res => {
                  if(res.success){
                      this.stepsData = res.tableContent;
                      this.total = res.dataCount;
                  }
              })
          }
      }
  },
  created() {
      this.getStepsData();
  }
};
</script>

