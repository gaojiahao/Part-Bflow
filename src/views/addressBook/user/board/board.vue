<style lang="less" scoped>
@import "../../organization/board/board.less";
</style>


<template>
    <div class="pad5">
        <Card  class="radius0 rfd-card" v-for="(user, index) of users" :key="index" >
            <Row  class="rfd-card-container">
                <Col span="3" class="marright5 rfd-card-left">
                    <img src="resources/images/icon/sales-order.png" class="rfd-card-img">
                </Col>
                <Col span="17" class="rfd-card-content">
                    <h5 class="text-nowrap font14">{{ user.nickname }}
                    </h5>
                    <p>{{user.mobile}}<Tag  color="blue" class="fr radius10" >使用中</Tag></p>
                    <p>{{user.userCode}}</p>
                </Col>
            </Row>
        </Card>
    </div>

</template>



<script>
import { getAllUsers } from "@/services/addressBookService.js";

export default {
  name: "userBoard",
  data() {
    return {
      users: {}
    };
  },
  created() {},
  methods: {
    getUsers: function() {
      let pageData = this.$route.query;
      getAllUsers( pageData.limit,pageData.page).then(res => {
        this.users = res.tableContent;
        window.top.getTotal = function () {
            return res.dataCount;
        }
      });
    },
    goDetail(userItem) {
      this.$router.push({
        path: `/addressBook/user/detail/${userItem.userId}`,
        params: { userId: userItem.userId }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
