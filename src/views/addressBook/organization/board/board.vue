<template>
    <div class="pad5">
        <Row  :gutter="8">
            <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(org, index) of orgs" :key="index" class="pad5 " >
                <Card  class="radius0">
                    <Row>
                        <Col span="4" class="marright5" >
                        <!-- principalPhoto -->
                            <img src="resources/images/icon/contactor.png"  style="width:100%">
                        </Col>
                        <Col span="18">
                            <p>{{ org.groupName }}
                                 <Tag  color="blue" class="fr radius10">使用中</Tag>
                            </p>
                            <p>{{org.groupType}}</p>
                            <p>{{org.principalName}}</p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
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
