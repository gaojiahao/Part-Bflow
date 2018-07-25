<style lang="less" scoped>
    @import './form.less';
</style>

<template>
    <div class="app-form">
        <Row class="app-form-title">
            <h3>表单 <a v-if="isAdminTrue" @click="setForm">添加表单</a></h3>
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
      isAdminTrue: false,
    };
  },
  watch: {
    isAdmin: function(value) {
      if(value){
        this.isAdminTrue = true;
      }else{
        this.isAdminTrue = false;
      }
    }
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

