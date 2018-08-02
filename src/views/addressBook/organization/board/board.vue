<style lang="less" scoped>
.userCardItem{
    height: 85px;
    min-width: 230px;
    width: 16%;
    float: left;
    margin: 5px;
}
.usertCardItem-content{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
</style>

<template>
    <div class="pad5">
        <!-- <Row  :gutter="8"> -->
            <!-- <Col :xs="24" :sm="12" :md="8" :lg="4" v-for="(org, index) of orgs" :key="index" class="pad5 " > -->
                <Card  class="radius0 userCardItem"  v-for="(org, index) of orgs" :key="index">
                    <div>
                        <div  class="marright5 fl" style="min-width: 70px;">
                        <!-- principalPhoto -->
                            <img src="resources/images/icon/contactor.png"  width="62px">
                        </div>
                        <div class="fl" style="width:160px;">
                            <h4 class="usertCardItem-content" style="width:100%">{{ org.groupName }}</h4>
                            <div>{{org.groupType}}<Tag  color="blue" class="fr radius10">使用中</Tag></div>
                            <div>{{org.principalName}}</div>
                        </div>
                    </div>
                </Card>
            <!-- </Col> -->
        <!-- </Row> -->
  </div>

</template>

<script>
import { getOrganizations } from "@/services/addressBookService.js";

export default {
  name: "orgBoard",
  data() {
    return {
      orgs: {}
    };
  },
  created() {},
  methods: {
    getOrgs: function() {
      let pageData = this.$route.query;
      getOrganizations(pageData).then(res => {
        this.orgs = res.tableContent;
        window.top.getTotal = function () {
            return res.dataCount;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getOrgs();
    }
  },
  mounted() {
    this.getOrgs();
  }
};
</script>
