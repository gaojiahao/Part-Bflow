<style lang="less" scoped>
  @import "./step.less";
</style>

<template>
    <div class="workguide">
        <Row class="workguide-title">
            <span>{{ stepsData.title }}</span>
        </Row>
        <Row class="workguide-type">
            <img :src="stepsData.creatorImage"/>
            <span class="workguide-type-worktype">{{ stepsData.creatorName }}</span>
            <span class="workguide-type-crtTime">{{ stepsData.crtTime }}</span>
        </Row>
        <Row class="workguide-step">
            <Carousel v-model="stepValue" arrow="always">
                <CarouselItem v-for="(list,index) of stepsData.workStepList" :key="index">
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
        </Row>
    </div>
</template>

<script>
import { getworkDataById } from '@/services/workGuideService.js';

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
              getworkDataById(this.$route.params.id).then(res => {
                this.stepsData = res;
                this.total = this.stepsData.workStepList.length;
              })
          }
      }
  },
  created() {
      this.getStepsData();
  }
};
</script>

