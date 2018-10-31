<style lang="less" scoped>
  @import './related-app.less';
</style>

<template>
<div class="bg_ff" style="margin-bottom:20px;">

    <Row class="app-resource-group-title">
      <h3>相关应用</h3>
    </Row>
    <Row class="related-app-content" :gutter="8">
      <draggable v-model="relatedApps" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
        <Col :xs="24" :sm="12" :md="8" :lg="4" v-for="(app,index) of relatedApps" :key="index" style="margin-bottom:5px">
          <Card class="app-card">
            <img class="card-img" :src="app.icon" />
            <div class="card-right">
              <Checkbox @on-change="changeAppStatus(app,index)" class="card-check" :disabled="!isAdminTrue" :value="app.STATUS===1?true:false"></Checkbox>
              <p class="card-name">{{ app.listName }}</p>
              <p class="card-type">{{ app.transName }}</p>
            </div>
          </Card>
        </Col>
        </transition-group>
      </draggable>
    </Row>
  </div>
</template>

<script>
import { getRelatedApp,prohibitExampleDetails,sortExampleDetails } from "@/services/appService.js";
import draggable from "vuedraggable";

export default {
  name: "relatedApp",
  components: {
    draggable
  },
  props: {
    listId: {
      type: String
    },
    isAdmin: Boolean
  },
  data() {
    return {
      isDragging: false,
      delayedDragging: false,
      isAdminTrue: false,
      relatedApps: []
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.isAdminTrue,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    isAdmin: function(value) {
      if (value) {
        this.isAdminTrue = true;
      } else {
        this.isAdminTrue = false;
      }
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      //执行在dom更新之后
      this.$nextTick(() => {
        this.delayedDragging = false;
        this.saveAppData();
      });
    }
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    //相关应用排序保存
    saveAppData() {
      let sortIds = [];
      this.relatedApps.forEach(val => {
        sortIds.push(val.id);
      });
      if(sortIds){
        sortExampleDetails(sortIds.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
          }
        })
      }
    },
    //启用禁用相关应用
    changeAppStatus(app,index) {
      prohibitExampleDetails(app.id).then(res => {
        if(res.success){
          this.$Message.success(res.message);
        }
      }).catch(error => {
        this.$Message.error(error.data.message);
      });
    },
    //获取相关应用列表数据
    getRelatedAppData() {
      getRelatedApp(this.$route.params.listId).then(res => {
          this.relatedApps = res;
      });
    }
  },
  created() {
    this.getRelatedAppData();
  }
};
</script>

