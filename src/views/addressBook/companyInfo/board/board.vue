<style lang="less" scoped>
@import "../../organization/board/board.less";
</style>

<template>
  <div class="pad5">
    <Card class="radius0 rfd-card" v-for="(company, index) of companys" :key="index">
      <Row class="rfd-card-container">
        <Col span="3" class="rfd-card-left">
        <img :src="company.groupPic || 'resources/images/icon/defaultUserPhoto.png'" class="rfd-card-img" @click="goDetail(company)">
        </Col>
        <Col span="17" class="rfd-card-content">
        <h5 class="text-nowrap font14">{{ company.groupName }}
        </h5>
        <p>{{company.companyType}}
          <Tag class="fr radius10 color_fff" v-instanceStateDirective="{status:company.status}"></Tag>
        </p>
        <p>{{company.principal}}</p>
        </Col>
      </Row>
    </Card>
  </div>

</template>

<script>
import { getAllCompanys } from "@/services/addressBookService.js";

export default {
  name: "companyBoard",
  data() {
    return {
      companys: {}
    };
  },
  created() {},
  methods: {
    getCompanys: function() {
      let pageData = this.$route.query;
      getAllCompanys(pageData.limit, pageData.page, pageData.filterValue).then(
        res => {
          this.companys = res.tableContent;
          window.top.getTotal = function() {
            return res.dataCount;
          };
        }
      );
    },
    goDetail(company) {
      window.open(
        "/dist/index.html#/addressBook/companyInfo/baseInfo/" + company.groupId
      );
    }
  },
  watch: {
    $route(to, from) {
      this.getCompanys();
    }
  },
  mounted() {
    this.getCompanys();
  }
};
</script>
