<style lang="less" scoped>
@import "./enterpriseInfo.less";
</style>

<template>
    <div class="info-warp">
        <header class="info-warp-header">
            <h3>
                企业信息
                <a @click="handleEditName">{{edit}}</a>
            </h3>
        </header>
        <main class="info-warp-main">
            <section class="info-warp-main-section">
                <div class="select-logo">
                    <label class="left-leble">企业LOGO</label>
                    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" action="/H_roleplay-si/ds/upload" style="display: inline-block;width:128px;vertical-align: middle;" :headers="httpHeaders">
                        <div style="width: 128px;height:128px;line-height: 128px;">
                            <img v-if="enterpriseInfo.logo" :src="enterpriseInfo.logo">
                            <i v-if="!enterpriseInfo.logo" class="iconfont">&#xe63b;</i>
                        </div>
                        <!-- <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="imageUrl">
                            <img :src="imageUrl">
                            <div class="demo-upload-list-cover">
                                <p class="iconfont" @click.native="handleRemove(item)">&#xe63b;</p>
                            </div>
                        </div> -->
                    </Upload>
                </div>
                <div class="select-explain">
                    <label class="left-leble">企业简称</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.nickname}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.nickname" class="input-common-att" />

                </div>
                <div class="select-explain">
                    <label class="left-leble">企业全称</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.name}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.name" class="input-common-att" />
                </div>
                <div class="select-explain-textarea">
                    <label class="left-leble">企业说明</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.instruction}}</span>
                    <textarea rows="3" cols="20" v-if="editEnterpriseName" v-model="enterpriseInfo.instruction" type="textarea" class="select-explain-textarea-text"></textarea>
                </div>
            </section>
            <section class="info-warp-main-section">
                <div class="select-explain">
                    <label class="left-leble">企业地址</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.address}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.address" class="input-common-att" />
                </div>
                <div class="select-explain">
                    <label class="left-leble">联系电话</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.phone}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.phone" class="input-common-att" />
                </div>
            </section>
            <section class="info-warp-main-section">
                <div>
                    <label class="left-leble">
                        企业管理员
                        <b @click="selectAdminModal">
                            <Tooltip content="编辑" placement="top">
                                <Icon class="app-edit-icon" type="compose"></Icon>
                            </Tooltip>
                        </b>
                    </label>

                    <div class="user-container">
                        <Tag v-for="item in enterpriseInfo.admins" :key="item.userId" :userId="item.userId" type="border" closable color="green" size="small" @on-close="deleteEnterpriseAdmin">
                            {{item.nickname}}
                        </Tag>
                    </div>
                </div>
            </section>

        </main>
        <user-modal v-model="showAdminModal" title="添加用户" @on-ok="confirmModal">
            <!-- <div class="app-search">
                <Icon class="app-search-icon" type="search"></Icon>
                <Input v-model="searchValue" placeholder="搜索" style="width: 300px" />
            </div> -->
            <Table @on-selection-change="selectAdmin" ref="selection" height="400" :columns="adminColumns" size="small" :data="columnsData"></Table>
        </user-modal>
    </div>
</template>

<script>
import {
  downloadImage,
  getAdminData,
  getEnterpriseById,
  updateRelation,
  deleteRelation
} from "@/services/enterpriseService";
import { getToken } from "@/utils/utils";
import UserModal from "@/components/modal/Modal";

export default {
  name: "enterpriseInfo",
  components: {
    UserModal
  },

  data() {
    return {
      enterpriseInfo: {
        logo: "",
        nickname: "",
        name: "",
        instruction: "",
        address: "",
        phone: "",
        admins: []
      },
      editEnterpriseName: false,
      edit: "修改",

      httpHeaders: {
        Authorization: "bc7cdfe127fc4c9183dff8633533ce91"
      },

      showAdminModal: false,
      selectEnterPriseAdmin: [],
      columnsData: [],
      adminColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        }
      ]
    };
  },

  methods: {
    //管理员选择modal展示
    selectAdminModal() {
      this.showAdminModal = true;
    },

    //存储选择的管理员
    selectAdmin(selection, row) {
      this.selectEnterPriseAdmin = selection;
    },

    //管理员选择确认
    confirmModal() {
      let obj = {},
        singleId = [];
      this.enterpriseInfo["admins"].push(...this.selectEnterPriseAdmin);
      this.enterpriseInfo["admins"] = this.enterpriseInfo["admins"].reduce(
        (cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        },
        []
      );

      this.selectEnterPriseAdmin.map(item => {
        singleId.push(item.userId);
      });

      updateRelation(singleId.join(",")).then(res => {
        if (res.success) {
          this.$Message.info("添加成功！");
        } else {
          this.$Message.error(res.message);
        }
      });

      this.selectEnterPriseAdmin = [];
      this.$refs.selection.selectAll(false); //清空选项
      this.showAdminModal = false;
    },

    //删除管理员节点
    deleteEnterpriseAdmin(event) {
      let userId = Number(event.target.parentElement.getAttribute("userid"));
      this.enterpriseInfo["admins"] = this.enterpriseInfo["admins"].filter(
        f => {
          return userId !== f.userId;
        }
      );

      deleteRelation(userId).then(res => {
        if (res.success) {
          this.$Message.info("删除成功！");
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    //获取管理员数据
    getAdmintrstorData() {
      let groupId = 347;
      getAdminData(groupId).then(res => {
        this.columnsData = res.tableContent;
      });

      getEnterpriseById().then(res => {
        this.enterpriseInfo = res;
      });
    },

    //编辑企业简称
    handleEditName() {
      this.edit = this.editEnterpriseName ? "修改" : "保存";

      //保存修改的数据
      if (this.editEnterpriseName) {
      }

      this.editEnterpriseName = !this.editEnterpriseName;
    },

    handleSuccess(res, file) {
      this.enterpriseInfo.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;
    },

    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出范围",
        desc: "文件大小最大为2M"
      });
    },

    //判断上传图片格式是否有误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: "请上传格式为png 或者 jpg 的图片"
      });
    }
  },

  mounted() {
    this.getAdmintrstorData();
  }
};
</script>

    
