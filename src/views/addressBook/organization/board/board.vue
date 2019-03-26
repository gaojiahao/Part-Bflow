<style lang="less" scoped>
@import "./board.less";
</style>

<template>
    <div class="pad5">
        <Card  class="radius0 rfd-card" v-for="(org, index) of orgs" :key="index" >
            <Row  class="rfd-card-container">
                <Col span="3" class="rfd-card-left">
                    <img :src="org.principalPhoto || 'resources/images/icon/defaultUserPhoto.png'"  class="rfd-card-img" @click="goDetail(org)">
                </Col>
                <Col span="17" class="rfd-card-content">
                    <h5 class="text-nowrap font14">{{ org.groupName }}
                    </h5>
                    <p>{{org.groupType ==='M'?'管理层':org.groupType ==='A'?'事业部':org.groupType==='O'?'部门':'小组'}}<Tag  color="blue"  class="fr radius10 color_fff"  v-instanceStateDirective="{status:org.status}" ></Tag></p>
                    <p>{{org.principalName}}</p>
                </Col>
            </Row>
        </Card>
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
      let pageData = this.$route.query,filter;
      if(pageData.filterProperty === 'groupName'){
        filter = [{operator:"like",value:pageData.filterValue,property:"groupName"}];
      }
      getOrganizations(pageData.limit,pageData.page,JSON.stringify(filter)).then(res => {
        this.orgs = res.tableContent;
        window.top.getTotal = function () {
            return res.dataCount;
        }
      });
    },
     goDetail(org) {
      window.open('/dist/index.html#/addressBook/organization/detail/' + org.groupId);
    },
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
