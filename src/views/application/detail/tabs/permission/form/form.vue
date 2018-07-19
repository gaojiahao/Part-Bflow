<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单</h3>
        </Row>
        <Row class="app-form-set">
            <a class="app-form-set-add">设置表单</a>
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
  methods: {},
  created() {},
  mounted() {}
};
</script>

