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
                <CarouselItem v-for="(list) of stepsData.workStepList" :key="list.id">
                    <div class="demo-carousel">
                        <div class="step-num">
                            <span class="step-num-current">{{ stepValue+1 }}</span>
                            <span class="step-num-total">/{{ total }}</span>
                            <span class="step-num-title">{{ list.title }}</span>
                        </div>
                        <p>{{ list.comment }}</p>
                        <img :src="list.image"/>
                    </div>
                </CarouselItem>
            </Carousel>
        </Row>
        <Row class="workguide-save">
            <span class="workguide-save-btn" @click="goBack">返回</span>
        </Row>
    </div>
</template>

<script>
import { getworkDataById } from '@/services/workGuideService.js';

export default {
  name: "wokdGuideStep",
  data() {
    return {
        stepsData: [],
        total: 0,
        stepValue: 0
    };
  },
  methods: {
      goBack() {
        history.go(-1);
      },
      getStepsData(){
          if(this.$route.params.id){
              getworkDataById(this.$route.params.id).then(res => {
                this.stepsData = res;
                this.total = this.stepsData.workStepList.length;
              }).catch(error => {
                this.$Message.error(error.data.message);
              });
          }
      }
  },
  created() {
      this.getStepsData();
  }
};
</script>

