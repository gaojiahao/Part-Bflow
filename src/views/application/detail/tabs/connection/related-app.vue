<style lang="less" scoped>
  @import './related-app.less';
</style>

<template>
<div class="bg_ff martop20">

    <Row class="app-resource-group-title">
      <h3>相关应用
        <a @click="saveAppData">保存</a>
      </h3>
    </Row>
    <Row class="related-app-content" :gutter="8">
      <!-- <Table :columns="columns" :data="relatedApps" size="small"></Table> -->
      <draggable v-model="relatedApps" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
        <Col :xs="24" :sm="12" :md="6" :lg="4" v-for="(app,index) of relatedApps" :key="index" style="margin-bottom:5px">
          <Card class="app-card">
            <img class="card-img" :src="app.icon" />
            <span class="card-right">
              <b class="card-name">{{ app.relationAppName }}</b>
              <span class="card-type">{{ app.relationAppType }}</span>
              <Checkbox @on-change="changeAppStatus(app,index)" class="card-check" v-model="single"></Checkbox>
            </span>
          </Card>
        </Col>
        </transition-group>
      </draggable>
    </Row>

  </div>
</template>

<script>
import { getRelatedApp } from "@/services/appService.js";
import draggable from "vuedraggable";

export default {
  name: "relatedApp",
  components: {
    draggable
  },
  props: {
    listId: {
      type: String
    }
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
      single: true,
      columns: [
        {
          title: "应用名称",
          key: "relationAppName",
          align: "left"
        },
        {
          title: "应用类型",
          key: "relationAppType",
          align: "left"
        },
        {
          title: "关系类型",
          key: "relationType",
          align: "left",
        },
        {
          title: "关联应用字段",
          key: "relationAppField",
          align: "left",
        },{
          title: "本应用字段",
          key: "appField",
          align: "left",
        }
      ],
      relatedApps: []
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
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
      console.log(this.relatedApps);
    },
    //启用禁用相关应用
    changeAppStatus(app,index) {
      console.log(app,index);
    }
  },
  created() {
    getRelatedApp(this.$route.params.listId).then(res => {
        this.relatedApps = res.tableContent;
        //todo
        //提示用户，请求失败
    });
  }
};
</script>

