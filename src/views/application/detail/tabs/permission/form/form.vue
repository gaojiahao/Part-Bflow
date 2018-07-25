<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单 <a @click="setForm">设置表单</a></h3>
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
  data() {
    return {
      listId: this.$route.params.listId
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

