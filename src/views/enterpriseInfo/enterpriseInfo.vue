<style lang="less" scoped>
@import "./enterpriseInfo.less";
</style>

<template>
  <div class="info-warp">
    <main class="info-warp-main">
      <section class="info-warp-main-section">
        <div class="select-logo">
          <label class="left-leble">企业LOGO</label>
          <div class="logo" >
            <Upload 
              v-if="$currentUser.isAdmin" 
              ref="upload" 
              :show-upload-list="false" 
              :on-success="handleSuccess" 
              :format="['jpg','jpeg','png']" 
              :max-size="2048" 
              :on-format-error="handleFormatError" 
              :on-exceeded-size="handleMaxSize" 
              type="drag" 
              action="/H_roleplay-si/ds/upload" 
              :headers="httpHeaders">
                <div style="width: 256px;height:64px;line-height: 64px;" v-if="!enterpriseInfo.logo">
                  <img v-if="enterpriseInfo.logo" :src="enterpriseInfo.logo">
                  <i v-if="!enterpriseInfo.logo" class="iconfont">&#xe63b;</i>
                </div>
                <div style="width: 256px;height:64px;line-height: 64px;" class="demo-upload-list" v-if="enterpriseInfo.logo">
                  <img :src="enterpriseInfo.logo">
                  <div class="demo-upload-list-cover">
                    <Icon type="camera" color="#fff" size="30"></Icon>
                  </div>
                </div>
            </Upload>
            <img v-else :src="enterpriseInfo.logo" />
            <p style="font-size: 12px;color:#999;margin-top: 5px;">推荐尺寸702*180</p>
          </div>
         
        </div>
        <div class="select-explain">
          <label class="left-leble">企业简称</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.nickname}}</span>
          <input v-else type="text" v-model="enterpriseInfo.nickname" class="input-common-att" />
          <a @click="handleEditName" v-if="$currentUser.isAdmin">{{edit}}</a>
        </div>
        <div class="select-explain">
          <label class="left-leble">企业全称</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.name}}</span>
          <input v-else type="text" v-model="enterpriseInfo.name" class="input-common-att" />
        </div>
        <div class="select-explain-textarea">
          <label class="left-leble">企业说明</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.instraction}}</span>
          <textarea rows="3" cols="20" v-else v-model="enterpriseInfo.instraction" type="textarea" class="select-explain-textarea-text"></textarea>
        </div>
      </section>

      <section class="info-warp-main-section">
        <div class="select-explain">
          <label class="left-leble">企业地址</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.address}}</span>
          <input v-else type="text" v-model="enterpriseInfo.address" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">联系电话</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.phone}}</span>
          <input v-else type="text" v-model="enterpriseInfo.phone" class="input-common-att" />
        </div>
      </section>

      <section class="info-warp-main-section">
        <div class="select-explain">
          <label class="left-leble">企业微信企业ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.qwCorpid}}</span>
          <input v-else type="text" v-model="enterpriseInfo.qwCorpid" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">企业微信应用代理ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.qwAppAgentId}}</span>
          <input v-else type="text" v-model="enterpriseInfo.qwAppAgentId" class="input-common-att" />
        </div>
         <div class="select-explain">
          <label class="left-leble">企业微信应用密钥</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.qwAppsecret}}</span>
          <input v-else type="text" v-model="enterpriseInfo.qwAppsecret" class="input-common-att" />
        </div>
         <div class="select-explain">
          <label class="left-leble">钉钉企业ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddCorpid}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddCorpid" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉信应用代理ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppAgentId}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppAgentId" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉应用ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppKey}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppKey" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉应用应用密钥</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppsecret}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppsecret" class="input-common-att" />
        </div>
         <div class="select-explain">
          <label class="left-leble">路塔实例详情资源地址</label>
          <a v-if="!editEnterpriseName" :href="enterpriseInfo.rtRedirectUrl" _blank="target"></a>
          <input v-else type="text" v-model="enterpriseInfo.rtRedirectUrl" class="input-common-att" />
        </div>
      </section>

      <section class="info-warp-main-section">
        <div>
          <label class="left-leble">
            企业管理员
          </label>

          <div class="user-container">
            <Tag v-for="item in enterpriseInfo.admins" :key="item.userId" :userId="item.userId" type="border" :closable="closable" color="blue" size="small" @on-close="deleteEnterpriseAdmin">
              {{item.nickname}}
            </Tag>
            <a @click="selectAdminModal" v-if="$currentUser.isAdmin" style="font-size:14px;">添加</a>
          </div>
        </div>
      </section>
      <section class="info-warp-main-section">
        <div>
          <label class="left-leble">网站登录页背景图</label>
          <div style="display: inline-block;vertical-align: middle;">
            <Upload v-if="$currentUser.isAdmin" :show-upload-list="false" :before-upload="handleUploadBefore" :on-success="handleBackgroundSuccess" action="/H_roleplay-si/ds/upload" :headers="httpHeaders">
              <Button icon="ios-cloud-upload-outline">选择背景图</Button>
            </Upload>
            <div v-if="enterpriseInfo.backgroundName">上传文件名称:
              <a :href="enterpriseInfo.backgroundImg" target="_blank">{{ enterpriseInfo.backgroundName }}</a>
              <Button v-if="$currentUser.isAdmin" type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <user-modal v-model="showAdminModal" title="选择用户" @on-ok="confirmModal" width="600">
      <div>
        <div class="app-search">
          <Input v-model="searchValue" placeholder="请输入用户名或用户ID" style="width: 300px" clearable @on-enter="adminFilter" @on-change="handleInputValueChange"></Input>
          <p class="app-search-icon">
            <Button @click="adminFilter" type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="selection" height="340" size="small" :columns="adminColumns" :data="columnsData" :loading="loading" @on-select-all="onSelectAll" @on-selection-change="handerSelectionChange" @on-select-cancel="onSelectCancel">
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" show-total show-elevator></Page>
          </div>
        </div>
      </div>
      <div class="page-selection-warp" v-show="onPageSelection[0] ">
        <Tag v-for="item in onPageSelection" :key="item.userId" :userId="item.userId" :closable="true" @on-close="deletePageSelection" type="border" color="primary" size="small">
          {{item.nickname}}
        </Tag>
      </div>
    </user-modal>
  </div>
</template>

<script>
import {
  downloadImage,
  getEnterpriseById,
  addOrUpdateEnterprise,
  updateRelation,
  deleteRelation,
  getAllUsers
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
        logo: "",   //企业LOGO
        nickname: "",   //企业简称
        name: "",   //企业全称
        instraction: "",    //企业说明
        address: "",    //企业地址
        phone: "",    //联系电话
        qwCorpid:"",  //企业微信企业ID
        qwAppAgentId:"",    //企业微信应用代理ID
        qwAppsecret:"",    //企业微信应用密钥
        ddCorpid:"",    //钉钉企业ID
        ddAppAgentId:"",    //钉钉应用代理ID
        ddAppKey:"",    //钉钉应用ID
        ddAppsecret:"",    //钉钉应用应用密钥
        rtRedirectUrl:"", //
        admins: [],   //企业管理员
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
      onPageSelection: [],
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
      this.searchValue = "";
      this.onPageSelection = []; //清空选中的用户
      this.getListUsers(this.currentPage, this.pageSize);
    },

    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.onPageSelection.push(...selection);
      //数组去重
      this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },

    handerSelectionChange(selection) {
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.onPageSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.userId !== item.userId;
          });
        });
        this.onPageSelection = p;
      } else {
        let obj = {};
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //删除分页选中
    deletePageSelection(event) {
      let id = Number(event.target.parentElement.getAttribute("userId"));
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== id;
      });

      this.$refs.selection.data.forEach((item, index) => {
        if (id === item.userId) {
          this.$refs.selection.toggleSelect(index);
        }
      });
    },

    //单选取消
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== row.userId;
      });
    },

    //管理员选择确认
    confirmModal() {
      let obj = {},
        singleId = [];
      this.enterpriseInfo["admins"].push(...this.onPageSelection);
      this.enterpriseInfo["admins"] = this.enterpriseInfo["admins"].reduce(
        (cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        },
        []
      );
      this.onPageSelection.map(item => {
        singleId.push(item.userId);
      });

      updateRelation(singleId.join(",")).then(res => {
        if (res.success) {
          this.$Message.info("添加成功！");
          this.showAdminModal = false;
        } else {
          this.$Message.error(res.message);
        }
      });
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

    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchValue,
          property_2: "userCode"
        }
      ]);
      this.getListUsers(this.currentPage, this.pageSize, filter);
    },

    //查询管理员
    adminFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchValue,
          property_2: "userCode"
        }
      ]);
      this.currentPage = 1;
      this.getListUsers(this.currentPage, this.pageSize, filter);
    },

    //清空输入框
    handleInputValueChange(event) {
      if (!this.searchValue) {
        this.getListUsers(this.currentPage, this.pageSize);
      }
    },

    getAdmintrstorData() {
      getEnterpriseById().then(res => {
        this.enterpriseInfo = res;
      });
    },

    //获取用户列表
    getListUsers(currentPage, pageSize, filter) {
      this.loading = true;
      getAllUsers(pageSize, currentPage, filter).then(res => {
        this.pageTotal = res.dataCount;
        this.columnsData = res.tableContent;
        this.loading = false;
        if (this.onPageSelection.length > 0) {
          this.columnsData.map(item => {
            this.onPageSelection.map(sel => {
              if (item.userId === sel.userId) {
                item._checked = true;
              }
            });
          });
        }
      });
    },

    //编辑企业简称
    handleEditName() {
      this.edit = this.editEnterpriseName ? "修改" : "保存";
      this.closable = !this.closable;
   
      //保存修改的数据
      if (this.editEnterpriseName) {
        let values = {
          nickname: this.enterpriseInfo.nickname,
          name: this.enterpriseInfo.name,
          instraction: this.enterpriseInfo.instraction,
          address: this.enterpriseInfo.address,
          phone: this.enterpriseInfo.phone,
          qwCorpid: this.enterpriseInfo.qwCorpid,
          qwAppAgentId: this.enterpriseInfo.qwAppAgentId,
          qwAppsecret: this.enterpriseInfo.qwAppsecret,
          ddCorpid: this.enterpriseInfo.ddCorpid,
          ddAppAgentId: this.enterpriseInfo.ddAppAgentId,
          ddAppKey: this.enterpriseInfo.ddAppKey,
          ddAppsecret: this.enterpriseInfo.ddAppsecret,
          rtRedirectUrl:this.enterpriseInfo.rtRedirectUrl
        };
        let data = [];
        for(let key in values){
          data.push({
            "property":key,
            "value":values[key]
          })
        }

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
        "/H_roleplay-si/ds/download?url=" + res.data[0].attacthment;
    },

    handleUploadBefore(file) {
      this.handleMaxSize(file);
      this.handleFormatError(file);
      this.enterpriseInfo.backgroundName = file.name;
      return true;
    },

    upload() {
      this.loadingStatus = true;
      let data = [{
        "property":"backgroundImg",
        "value": this.enterpriseInfo.backgroundImg,
      },{
        "property":"backgroundName",
        "value":this.enterpriseInfo.backgroundName
      }];

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
        "/H_roleplay-si/ds/download?width=256&height=64&url=" +
        res.data[0].attacthment;

      let data = [{ 
        "property":"logo",
        "value":this.enterpriseInfo.logo 
      }];
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

    
