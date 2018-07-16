<style lang="less" scoped>
  .app-container{
    margin: 0px;
    padding: 10px 10px;
    width: 100%;
  }
  .app-col{
    margin-bottom: 10px;
    .app-card{
      height:100px;
      position: relative;
      .card-img{
        width: 65px;
      }
      .card-name{
        position: absolute;
        top:10%;
        left: 29%;
        font-size: 15px;
      }
      .card-type{
        position: absolute;
        top: 34%;
        left: 29%;
        font-size: 13px;
      }
      .card-admintrstor{
        color: #39f;
        margin-left: 8px;
      }
      .card-desc{
        position: absolute;
        top: 58%;
        left: 29%;
        font-size: 0.7rem;
        width: 238px;
        color: #867c7c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .card-setting{
        position: absolute;
        top: 33%;
        left: 72%;
        color: #39f;
      }
      .card-delete{
        position: absolute;
        top: 0px;
        left: 95%;
        font-size: 12px;
        display: none;
      }
      .card-delete:hover{
        color: #39f;
        cursor: pointer;
      }
    }
  }
  .app-card:hover{
    .card-delete{
      display: block;
    }
  }
  .ivu-icon{
    padding-right: 3px;
  }
</style>
<template>
  <div class="app-list">
     <Row class="app-container" :gutter="8">
        <Col :xs="24" :sm="12" :md="8" :lg="6" class="app-col" v-for="(list, index) of listData" :key="index">
            <Card class="app-card">
                <img class="card-img" :src="list.icon"/>
                <b class="card-name">{{ list.title }}</b>
                <span class="card-type">{{ list.transType }}
                  <span class="card-admintrstor"><Icon type="person"></Icon>{{ list.administrator }}</span>
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
import { deleteApp } from "@/services/appService.js";
export default {
  props: {
    listData: Array
  },
  data() {
    return {
    }
  },
  created() {},
  methods: {
    goAppSetting(list) {
      this.$router.push({path: `/app/detail/${list.uniqueId}`,params: {listId: list.uniqueId}});
    },
    //删除应用
    deleteApplication(index, list) {
      let params = {
        uniqueId: list.uniqueId,
        status: 0
      };
      if(params){
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除此应用？',
          onOk: () => {
            deleteApp(params).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                this.listData.splice(index,1);
              }
            })
          }
        })
      }
    }
  },
  mounted() {
  }
};
</script>
