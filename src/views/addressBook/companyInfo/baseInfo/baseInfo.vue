<style lang="less" scoped>
@import "./baseInfo.less";
</style>
<template>
  <div class="baseInfo">
    <div class="baseInfo-warp">
      <div class="baseInfo-body">
        <div class="baseInfo-body-content">
          <Form :model="baseInfoItem" :label-width="80">
            <FormItem label="公司名称">
              <Input v-model="baseInfoItem.groupName"></Input>
            </FormItem>
            <FormItem label="公司简称">
              <Input v-model="baseInfoItem.groupShortName"></Input>
            </FormItem>
            <FormItem label="公司类型">
              <RadioGroup v-model="baseInfoItem.depFunction">
                <Radio label='有限责任公司'></Radio>
                <Radio label='股份有限公司'></Radio>
                <Radio label='集团公司'></Radio>
                <Radio label='有限合伙'></Radio>
                <Radio label='普通合伙'></Radio>
                <Radio label='个人独资'></Radio>
                <Radio label='子公司'></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="公司状态">
              <Select v-model="baseInfoItem.status">
                <Option value="3">草稿</Option>
                <Option value="2">未使用</Option>
                <Option value="1">使用中</Option>
                <Option value="0">停用</Option>
              </Select>
            </FormItem>
            <FormItem label="公司说明">
              <Input v-model="baseInfoItem.comment" type="textarea" :rows="3"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <!-- <div class="buttons">
            <Button type="success" @click="saveCompanyInfo">保存</Button>
            <Button type="success">修改</Button>
            <Button type="success">删除</Button>
        </div> -->
    <Row class="info-btn">
      <Button @click="updateCompanyData" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">保存</Button>
      <Button @click="goCompanyList" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">取消</Button>
      <!-- <Button v-if="groupId?noShowSaveAddBtn:showSaveAddBtn" @click="saveAndAddUser" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">保存并继续添加</Button> -->
    </Row>
  </div>
</template>

<script>
import {
  saveCompanyInfo,
  updateCompanyInfo,
  getCompanyInfoByGroupId
} from "@/services/addressBookService.js";
export default {
  data() {
    return {
      baseInfoItem: {
        groupName: "",
        groupShortName: "",
        depFunction: "",
        status: "",
        comment: ""
      }
    };
  },
  methods: {
    //保存公司基本信息
    updateCompanyData() {
      let baseInfo = this.baseInfoItem;
      let data = {
        groupName: baseInfo.groupName,
        groupShortName: baseInfo.groupShortName,
        depFunction: baseInfo.depFunction,
        status: baseInfo.status,
        comment: baseInfo.comment,
        groupCode: this.guid()
      };
      //保存公司基本信息
      saveCompanyInfo(data).then(res => {
        let groupId =
          this.$route.name == "add"
            ? this.$route.name
            : this.$route.params.groupId;
        if (res.success) {
          this.$Message.info("保存成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //获取公司基本信息
    getCompanyInfo(groupId) {
      getCompanyInfoByGroupId(groupId).then(res => {
        this.baseInfoItem = res.tableContent[0];
        this.baseInfoItem.status = String(this.baseInfoItem.status);
      });
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    goCompanyList() {}
  },
  mounted() {
    let groupId =
      this.$route.name == "add" ? this.$route.name : this.$route.params.groupId;
    if ("add" == groupId) {
      return;
    }
    this.getCompanyInfo(groupId);
  }
};
</script>
