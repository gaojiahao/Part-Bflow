<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单 <a v-if="isAdmin" @click="setForm">表单设置</a></h3>
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
      isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
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

