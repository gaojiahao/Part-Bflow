<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单</h3>
        </Row>
        <Row class="app-form-set">
            <a class="app-form-set-add" @click="setForm">设置表单</a>
        </Row>
    </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "formSource",
  components: {},
  props: {
    listId: String
  },
  data() {
    return {
      
    };
  },
  methods: {
      setForm() {
          window.open("/Form/index.html?viewDesign=true&list=" + this.listId);
      }
  },
  created() {},
  mounted() {}
};
</script>

