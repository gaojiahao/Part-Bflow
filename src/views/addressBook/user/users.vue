<style>

</style>

<template>
  <div class="pad5">
        <Row class="app-container" :gutter="8">
            <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(user, index) of users" :key="index" class="pad5 " >
                <Card  class="radius0">
                    <Row>
                        <Col span="4" class="marright5" ><img src="resources/images/icon/contactor.png"  style="width:100%"></Col>
                        <Col span="18">
                            <p>{{ user.nickname }} <Tag  color="blue" class="fr radius10">使用中</Tag></p>
                            <p>13713777064</p>
                            <p>rfd118</p>
                        </Col>
                    </Row>
         
                </Card>
            </Col>
        </Row>
  </div>

</template>

<script>
import { getAllUserData } from "@/services/appService.js";

export default {
  name: "users",
  components: {
  },
  props: {
  },
  data() {
    return {
      users: {}
    };
  },
  created() {},
  methods: {
      getUsers:function () {
           var pageData = this.$route.query;
           this.isloading = true;
            getAllUserData(pageData.page,pageData.limit).then(res=>{
                this.users = res.tableContent;
                this.isloading = false;
            });
      }
  },
  watch:{
      '$route' (to, from){
          this.getUsers();
      }
  },
  mounted() {
    this.getUsers();
      
  }
};
</script>
