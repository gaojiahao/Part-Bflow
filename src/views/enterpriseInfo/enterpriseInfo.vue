<style lang="less" scoped>
@import "./enterpriseInfo.less";
</style>

<template>
    <div class="info-warp">
        <!-- <header class="info-warp-header">
            <h3>
                企业信息
                <a @click="handleEditName">{{edit}}</a>
            </h3>
        </header> -->
        <main class="info-warp-main">
            <section class="info-warp-main-section">
                <div class="select-logo">
                    <label class="left-leble">企业LOGO</label>
                    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" action="/H_roleplay-si/ds/upload" style="display: inline-block;width:128px;vertical-align: middle;" :headers="httpHeaders">
                        <div style="width: 128px;height:128px;line-height: 128px;" v-if="!enterpriseInfo.logo">
                            <img v-if="enterpriseInfo.logo" :src="enterpriseInfo.logo">
                            <i v-if="!enterpriseInfo.logo" class="iconfont">&#xe63b;</i>
                        </div>
                        <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="enterpriseInfo.logo">
                            <img :src="enterpriseInfo.logo">
                            <div class="demo-upload-list-cover">
                                <Icon type="camera" color="#fff" size="30"></Icon>
                            </div>
                        </div>
                    </Upload>
                </div>
                <div class="select-explain">
                    <label class="left-leble">企业简称</label>
                    <span v-if="!editEnterpriseName">{{enterpriseInfo.nickname}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.nickname" class="input-common-att" />
                     <a @click="handleEditName">{{edit}}</a>
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
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseInfo.address" style="width:400px" class="input-common-att" />
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
                        <!-- <b @click="selectAdminModal">
                            <Tooltip content="编辑" placement="top">
                                <Icon class="app-edit-icon" type="compose"></Icon>
                            </Tooltip>
                        </b> -->
                    </label>

                    <div class="user-container">
                        <Tag v-for="item in enterpriseInfo.admins" :key="item.userId" :userId="item.userId" type="border" :closable="closable" color="blue" size="small" @on-close="deleteEnterpriseAdmin">
                            {{item.nickname}}
                        </Tag>
                        <a  @click="selectAdminModal" style="font-size:14px;">添加</a>
                    </div>
                </div>
            </section>
            <section class="info-warp-main-section">
                <div>
                    <label class="left-leble">网占登录页背景图</label>
                    <div style="display: inline-block;vertical-align: middle;">
                        <Upload :show-upload-list="false" :before-upload="handleUploadBefore" :on-success="handleBackgroundSuccess" action="/H_roleplay-si/ds/upload" :headers="httpHeaders">
                            <Button type="ghost" icon="ios-cloud-upload-outline">选择背景图</Button>
                        </Upload>
                        <div v-if="enterpriseInfo.backgroundName">上传文件名称:
                            <a :href="enterpriseInfo.backgroundImg" target="_blank">{{ enterpriseInfo.backgroundName }}</a>
                            <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <user-modal v-model="showAdminModal" title="添加用户" @on-ok="confirmModal" @onVisibleChange="onModelVisibleChange">
            <div class="app-search">
                <Input v-model="searchValue" placeholder="搜索" style="width: 300px" clearable @on-enter="adminFilter" @on-change="handleInputValueChange"></Input>
                <p class="app-search-icon">
                    <Button @click="adminFilter" type="primary" size="small">查询</Button>
                </p>
            </div>
            <Table @on-selection-change="selectAdmin" ref="selection" height="340" :columns="adminColumns" size="small" :data="columnsData" :loading="loading"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" show-total show-elevator></Page>
                </div>
            </div>
        </user-modal>
    </div>
</template>

<script>
import {
  downloadImage,
  getAdminData,
  getEnterpriseById,
  addOrUpdateEnterprise,
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
        admins: [],
        backgroundImg: "",
        backgroundName: ""
      },
      editEnterpriseName: false,
      edit: "修改",

      httpHeaders: {
        Authorization: getToken()
      },

      loadingStatus: false,

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
      ],
      closable: false,

      searchValue: "",
      pageTotal: 0, //table总数
      pageSize: 8,
      currentPage: 1, //table当前页
      loading: false
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

    onModelVisibleChange(val) {
      if (!val) {
        this.searchValue = "";
      } else {
          this.getAdminData();
      }
    },

    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
      let filter = JSON.stringify([
        { operator: "like", value: this.searchValue, property: "nickname" }
      ]);
      this.getAdminData(filter);
    },

    //查询管理员
    adminFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchValue, property: "nickname" }
      ]);
      this.getAdminData(filter);
    },

    //清空输入框
    handleInputValueChange(event) {
      if (!this.searchValue) {
        this.getAdminData();
      }
    },

   
    getAdmintrstorData() {
      getEnterpriseById().then(res => {
        this.enterpriseInfo = res;
      });
    },

    //获取管理员数据
    getAdminData(filter){
        let groupId = 347;
      this.loading = true;
      getAdminData(groupId, filter, this.currentPage, this.pageSize).then(
        res => {
          this.pageTotal = res.dataCount;
          this.columnsData = res.tableContent;
          this.loading = false;
        }
      );
    },

    //编辑企业简称
    handleEditName() {
      this.edit = this.editEnterpriseName ? "修改" : "保存";
      this.closable = !this.closable;

      //保存修改的数据
      if (this.editEnterpriseName) {
        let data = {
          id: this.enterpriseInfo.id,
          nickname: this.enterpriseInfo.nickname,
          name: this.enterpriseInfo.name,
          instruction: this.enterpriseInfo.instruction,
          address: this.enterpriseInfo.address,
          phone: this.enterpriseInfo.phone
        };
        addOrUpdateEnterprise(data).then(res => {
          if (res.success) {
            this.$Message.info("保存成功");
          } else {
            this.$Message.error(res.message);
          }
        });
      }

      this.editEnterpriseName = !this.editEnterpriseName;
    },

    //上传
    handleBackgroundSuccess(res, file) {
      this.enterpriseInfo.backgroundImg =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;
    },

    handleUploadBefore(file) {
      this.handleMaxSize(file);
      this.handleFormatError(file);
      this.enterpriseInfo.backgroundName = file.name;
      return true;
    },

    upload() {
      this.loadingStatus = true;
      let data = {
        id: this.enterpriseInfo.id,
        backgroundImg: this.enterpriseInfo.backgroundImg,
        backgroundName: this.enterpriseInfo.backgroundName
      };
      addOrUpdateEnterprise(data).then(res => {
        if (res.success) {
          this.$Message.info("图片上传成功");
          this.loadingStatus = false;
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    handleSuccess(res, file) {
      this.enterpriseInfo.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;

      let data = { id: this.enterpriseInfo.id, logo: this.enterpriseInfo.logo };
      addOrUpdateEnterprise(data).then(res => {
        if (res.success) {
          this.$Message.info("图片上传成功");
        } else {
          this.$Message.error(res.message);
        }
      });
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

  created() {
    this.getAdmintrstorData();
  }
};
</script>

    
