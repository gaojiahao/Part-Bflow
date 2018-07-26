<style lang="less" scoped>
@import "./card-list.less";
</style>
<template>
  <div class="app-list">
    <Row class="app-container" :gutter="8">
      <Col :xs="24" :sm="12" :md="8" :lg="6" class="app-col" v-for="(list, index) of listData" :key="index">
      <Card class="app-card">
        <img class="card-img" :src="list.icon" />
        <b class="card-name">{{ list.title }}</b>
        <span class="card-type">{{ list.transType }}
          <my-pop-tip :userInfo="userInfo" v-if="list.administrator">
            <span class="card-admintrstor" slot="userCard" @mouseenter="focusChange(list.administratorId)">
              <Icon type="person"></Icon>{{ list.administrator }}
            </span>
          </my-pop-tip>
        </span>
        <span class="card-desc">{{ list.comment }}</span>
        <a class="card-setting" type="text" @click="goAppSetting(list)">详情</a>
        <p @click="deleteApplication(index, list)" class="card-delete">
          <Tooltip content="删除应用" placement="top">
            <Icon type="close-round"></Icon>
          </Tooltip>
        </p>
      </Card>
      </Col>
    </Row>
  </div>

</template>

<script>
import { deleteApp, getUserInfoByUserId } from "@/services/appService.js";
import MyPopTip from "@/components/poptip/MyPopTip";
export default {
  components: {
    MyPopTip
  },
  props: {
    listData: Array
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {},
  methods: {
    focusChange: function(value) {
      if (!value){
        this.userInfo= {};
      }
      getUserInfoByUserId(value).then(res => {
        this.userInfo = res.tableContent[0];
      });
    },

    goAppSetting(list) {
      this.$router.push({
        path: `/application/detail/${list.uniqueId}`,
        params: { listId: list.uniqueId }
      });
    },
    //删除应用
    deleteApplication(index, list) {
      let params = {
        uniqueId: list.uniqueId,
        status: 0
      };
      if (params) {
        this.$Modal.confirm({
          title: "确认",
          content: "确认删除此应用？",
          onOk: () => {
            deleteApp(params).then(res => {
              if (res.success) {
                this.$Message.success(res.message);
                this.listData.splice(index, 1);
              }
            });
          }
        });
      }
    }
  },
  mounted() {}
};
</script>
