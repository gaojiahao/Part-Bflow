<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单</h3>
             <i class="app-form-title-add iconfont" @click="setForm">&#xe606;</i>
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

