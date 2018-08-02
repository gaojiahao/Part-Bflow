<template>
    <div class="pad5">
      <Button @click="addUser">新增</Button>
        <Row  :gutter="8">
            <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(user, index) of users" :key="index" class="pad5 " >
              <div @click="goDetail(user)">
                <Card class="radius0">
                    <Row>
                        <Col span="4" class="marright5" >
                            <img src="resources/images/icon/contactor.png"  style="width:100%">
                        </Col>
                        <Col span="18">
                            <p>{{ user.nickname }}
                                 <Tag  color="blue" class="fr radius10">使用中</Tag>
                            </p>
                            <p>{{user.mobile}}</p>
                            <p>{{user.userCode}}</p>
                        </Col>
                    </Row>
                  </Card>
                </div>
            </Col>
        </Row>
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
        params: { userId: userItem.userId ,isEdit: 'edit'}
      });
    },
    addUser(){
      this.$router.push({ path: '/addressBook/user/add',params: { isEdit: 'add' }});
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
