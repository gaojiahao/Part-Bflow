<style lang="less" scoped>
  @import "./view.less";
</style>

<template>
    <div class="workguide">
        <Row class="workguide-title">
            <h2>{{ workguideData.title }}</h2>
        </Row>
        <Row class="workguide-type">
            <img :src="workguideData.creatorImage"/>
            <span class="workguide-type-worktype">{{ workguideData.creatorName }}</span>
            <span class="workguide-type-crtTime">{{ workguideData.crtTime }}</span>
        </Row>
        <Row class="workguide-desc">
            <p>{{ workguideData.comment }}</p>
        </Row>
        <Row class="workguide-read">
            <img v-for="(list,index) of workguideData.workStepList" :key="index" :src="list.image"/>
            <div class="workguide-read-go" @click="goStep"><Icon type="ios-arrow-forward" />分布阅读</div>
        </Row>
        <Row class="workguide-content">
            <Timeline >
                <TimelineItem  v-for="(data,idx) of workguideData.workStepList" :key="idx">
                  <div class="step-detail">
                        <h2>{{ data.title }}</h2>
                        <div>{{ data.comment }}</div>
                        <img :src="data.image"/>
                  </div>
                </TimelineItem>
                
            </Timeline>
        </Row>
        <Row class="workguide-save">
            <span class="workguide-save-btn" @click="editKnowledge">编辑</span>
            <span class="workguide-save-btn" @click="goBack">返回</span>
        </Row>
    </div>
</template>

<script>
import { getworkDataById } from "@/services/workGuideService.js";

export default {
  name: "wokdGuideView",
  components: {},
  data() {
    return {
      workguideId: this.$route.params.id,
      workguideData: {}
    };
  },
  methods: {
    goStep() {
        this.$router.push({
            name: "wokdGuideStep",
            path:'/wokdGuide/step/'+this.$route.params.id,
            params: {id: this.$route.params.id}
        });
    },
    goBack() {
      this.$router.push({path:'/wokdGuide/list'});
    },
    editKnowledge() {
      this.$router.push({
        name: "wokdGuideDetail",
        path:'/wokdGuide/detail/'+this.$route.params.id,
        params: {id: this.$route.params.id}
      });
    },
    //查询作业指导数据
    getWorkGuideDataById() {
        getworkDataById(this.$route.params.id).then(res => {
            this.workguideData = res;
        })
    }
  },
  created() {
    this.getWorkGuideDataById();
  }
};
</script>

