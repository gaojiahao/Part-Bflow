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
            <router-link :to="{ name:'wokdGuideStep',params:{id: workguideData.id}}">
                <div class="workguide-read-go">
                    步骤阅读<Icon type="ios-arrow-forward" style="font-size:23px;margin-bottom:4px;" />
                </div>
            </router-link>
        </Row>
        <Row class="workguide-content">
            <Timeline >
                <TimelineItem  v-for="(data,idx) of workguideData.workStepList" :key="idx">
                  <div class="step-num" slot="dot">{{idx+1}}</div>
                  <div class="step-detail">
                        <h2>{{ data.title }}</h2>
                        <div class="step-detail-comment">{{ data.comment }}</div>
                        <img :src="data.image"/>
                  </div>
                </TimelineItem>
                
            </Timeline>
        </Row>
        <Row class="workguide-toolbar">
            <router-link :to="{ name:'wokdGuideDetail',params:{id: workguideData.id}}">
                <span class="workguide-toolbar-btn">编辑</span>
            </router-link>
            <router-link :to="{ name:'wokdGuideList'}">
                <span class="workguide-toolbar-btn">返回</span>
            </router-link>
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
    //查询作业指导数据
    getWorkGuideDataById() {
        getworkDataById(this.$route.params.id).then(res => {
            this.workguideData = res;
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
    }
  },
  created() {
    this.getWorkGuideDataById();
  }
};
</script>

