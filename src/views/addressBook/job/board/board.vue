<style lang="less" scoped>
.orgCardItem{
    height:80px;
    min-width: 260px;
    margin: 5px;
    width: 16%;
    float: left;
}
.org-name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>

<template>
    <div class="pad5">
        <!-- <Row  :gutter="8"> -->
            <!-- <Col :xs="24" :sm="12" :md="8" :lg="5" v-for="(org, index) of orgs" :key="index" class="pad5 " > -->
                <Card  class="radius0 orgCardItem" v-for="(org, index) of orgs" :key="index" >
                    <Row  style="min-width: 260px;">
                        <Col span="3" class="marright5" style="min-width: 60px;">
                        <!-- principalPhoto -->
                            <img src="resources/images/icon/sales-order.png"  style="width:50px;">
                        </Col>
                        <Col span="17" style="min-width:180px;">
                            <h5 class="org-name">{{ org.groupName }}
                            </h5>
                            <p>{{org.groupType}}<Tag  color="blue" class="fr radius10">使用中</Tag></p>
                            <p>{{org.principalName}}</p>
                        </Col>
                    </Row>
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
