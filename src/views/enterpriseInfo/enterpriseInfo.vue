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
              v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" 
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
          <a @click="handleEditName" v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin">{{edit}}</a>
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
        <div class="select-explain">
          <label class="left-leble">是否启用组织核算</label>
          <Checkbox :disabled="!editEnterpriseName" v-model="enterpriseInfo.depAccount">
            <span></span>
          </Checkbox>
        </div>
      </section>

      <section class="info-warp-main-section">
        <div v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" :style="{marginBottom:'5px'}">
          <Button type="info" size="small" @click="showAddExchange">添加汇率</Button>
          <Button type="info" size="small" @click="deleteExchange">删除</Button>
        </div>
        <Table :columns="rateColumns" border :data="rateData" @on-selection-change="onSelectChange" width="600" size="small">
          <template slot-scope="{ row }" slot="currency">
              <span @click="editExchangeRate(row,'currencyEdit')" :class="{'cell-click':row.currencyValue !== 'rmb'}" v-if="!row.currencyEdit">{{ row.currency }}</span>
              <Select 
                v-else 
                v-model="row.currency" 
                style="width:150px"
                transfer
                label-in-value
                filterable
                @on-change="onCurrencyChange($event,row)">
                  <Option v-for="item in currencyList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>
          </template>
          <template slot-scope="{ row }" slot="exchangeRate">
              <span @click="editExchangeRate(row,'exchangeEdit')" :class="{'cell-click':row.currencyValue !== 'rmb'}" v-if="!row.exchangeEdit">{{ row.exchangeRate }}</span>
              <Input @on-blur="onExchangeRateBlur(row)" v-else v-model="row.exchangeRate"></Input>
          </template>
          <template slot-scope="{ row }" slot="localCurrency">
              <Radio @on-change="onLocalCurrencyChange($event,row)" :disabled="!$currentUser.isBusinessAdmin" :value="row.localCurrency===1?true:false"></Radio>
          </template>
      </Table>
      </section>

      <section class="info-warp-main-section">
        <div class="select-explain">
          <label class="left-leble">企业微信企业ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.qwCorpid}}</span>
          <input v-else type="text" v-model="enterpriseInfo.qwCorpid" class="input-common-att" />
          <Button 
            type="info" 
            shape="circle" 
            @click="handleSyncInfo" 
            v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" 
            :style="{marginLeft:'50px'}">
            同步第三方平台用户
          </Button>
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
          <label class="left-leble">钉钉应用ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppAgentId}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppAgentId" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉应用Key</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppKey}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppKey" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉应用密钥</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddAppsecret}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddAppsecret" class="input-common-att" />
        </div>
        <div class="select-explain">
          <label class="left-leble">钉钉扫码登录授权应用ID</label>
          <span v-if="!editEnterpriseName">{{enterpriseInfo.ddOauth2AppId}}</span>
          <input v-else type="text" v-model="enterpriseInfo.ddOauth2AppId" class="input-common-att" />
        </div>
         <div class="select-explain">
          <label class="left-leble">路塔实例详情资源地址</label>
             <span v-if="!editEnterpriseName">{{enterpriseInfo.rtRedirectUrl}}</span>
          <input v-else type="text" v-model="enterpriseInfo.rtRedirectUrl" class="input-common-att" />
        </div>
      </section>

      <section class="info-warp-main-section" v-if="$currentUser.isOperationAdmin">
        <div>
          <label class="left-leble">
            运营管理员
          </label>

          <div class="user-container">
            <Tag v-for="item in enterpriseInfo.operationsManager" :key="item.userId" :userId="item.userId" type="border" :closable="closable" color="blue" size="small" @on-close="deleteEnterpriseOperatorAdmin">
              {{item.nickname}}
            </Tag>
            <a @click="selectAdminModal('operator')" style="font-size:14px;">添加</a>
          </div>
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
            <a @click="selectAdminModal('admin')" v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" style="font-size:14px;">添加</a>
          </div>
        </div>
      </section>
      <section class="info-warp-main-section">
        <div>
          <label class="left-leble">网站登录页背景图</label>
          <div style="display: inline-block;vertical-align: middle;">
            <Upload v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" :show-upload-list="false" :before-upload="handleUploadBefore" :on-success="handleBackgroundSuccess" action="/H_roleplay-si/ds/upload" :headers="httpHeaders">
              <Button icon="ios-cloud-upload-outline">选择背景图</Button>
            </Upload>
            <div v-if="enterpriseInfo.backgroundName">上传文件名称:
              <a :href="enterpriseInfo.backgroundImg" target="_blank">{{ enterpriseInfo.backgroundName }}</a>
              <Button v-if="$currentUser.isBusinessAdmin || $currentUser.isOperationAdmin" type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <user-modal v-model="showAdminModal" title="选择用户" @on-ok="confirmModal" width="600">
      <div>
        <div class="app-search">
          <Input v-model="searchValue" placeholder="请输入姓名或编号" style="width: 300px" clearable @on-enter="adminFilter" @on-change="handleInputValueChange"></Input>
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
    <!-- 添加汇率modal -->
    <Modal v-model="showExchangeRateModal" title="新增汇率">
        <Form :model="exchangeRateInfo" ref="exchangeRateInfoItem" :label-width="100" :rules="ruleValidate">
          <FormItem label="币种:" prop="currency">
            <Select 
              @on-change="onModalCurrencyChange" 
              v-model="exchangeRateInfo.currency"
              filterable
              style="width:200px">
                  <Option v-for="item in currencyList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="默认汇率:" prop="exchangeRate">
            <InputNumber :min="0" v-model="exchangeRateInfo.exchangeRate"></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="small" @click="showExchangeRateModal=false">取消</Button>
          <Button type="primary" size="small" @click="addExchangeRate">保存</Button>
          <Button type="primary" size="small" @click="addExchangeRate('update')">保存并新建</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import {
  downloadImage,
  getEnterpriseById,
  addOrUpdateEnterprise,
  updateRelation,
  deleteRelation,
  getAllUsers,
  importThirdPlat,
  getExchangeRateData,
  addExchangeRateData,
  deleteExchangeRateData,
  updateExchangeRateData
} from "@/services/enterpriseService";
import { getDictByValue } from "@/services/commonService";
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
        depAccount: false, //是否启用组织核算
        qwCorpid:"",  //企业微信企业ID
        qwAppAgentId:"",    //企业微信应用代理ID
        qwAppsecret:"",    //企业微信应用密钥
        ddCorpid:"",    //钉钉企业ID
        ddAppAgentId:"",    //钉钉应用ID
        ddAppKey:"",    //钉钉应用Key
        ddAppsecret:"",    //钉钉应用应用密钥
        ddOauth2AppId:"",   //钉钉扫码登录授权应用ID
        rtRedirectUrl:"", //
        admins: [],   //企业管理员
        backgroundImg: "",
        backgroundName: ""
      },
      exchangeRateInfo: {
        currency: "",
        exchangeRate: 0,
      },
      ruleValidate: {
        currency: [
          {
            required: true,
            message: "币种不能为空",
            trigger: "change"
          }
        ],
        exchangeRate: [
          {
            required: true,
            message: "汇率不能为空",
            type: "number"
          }
        ]
      },
      editEnterpriseName: false,
      showExchangeRateModal: false,
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
          title: "编号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        }
      ],
      closable: false,

      rateColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "币种",
          slot: "currency",
          sortable: true
        },
        {
          title: "默认汇率",
          slot: "exchangeRate",
          sortable: true
        },
        {
          title: "是否本位币",
          align: 'center',
          slot: "localCurrency"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("Button",{
              props: {
                type: 'text',
                size: 'small',
                disabled: !this.$currentUser.isBusinessAdmin || params.row.currencyValue === 'rmb'
              },
              style: {
                color: '#39f'
              },
              on: {
                click: () => {
                  let deleteData = [];
                  deleteData.push(params.row.id);
                  this.deleteRateCommon(deleteData);
                }
              }
            },"删除");
          }
        }
      ],
      rateData: [],
      currencyList: [],

      searchValue: "",
      pageTotal: 0, //table总数
      pageSize: 8,
      currentPage: 1, //table当前页
      loading: false,
      hasNoCurrency: true,
      selectExchange: []
    };
  },

  methods: {
    //删除统一方法
    deleteRateCommon(deleteData) {
      this.$Modal.confirm({
            title: "确认",
            content: "确认删除所选汇率？",
            onOk: () => {
              deleteExchangeRateData(deleteData).then(res => {
                    if(res.success){
                      this.$Message.success(res.message);
                      this.getExchangeRateDatas();
                    }
                  })
              }
          });
    },
    showAddExchange() {
      this.showExchangeRateModal = true;
    },
    editExchangeRate(row, isEdit) {
      if(this.$currentUser.isBusinessAdmin){
        row.currencyValue !== 'rmb' && this.$set(row, isEdit, true);
      }
    },
    onCurrencyChange(value,row) {
      for(let item of this.rateData){
        if(item.currency === value.value){
          this.$Message.error('不可选择汇率已有币种！');
          this.hasNoCurrency = false;
          break;
        }else{
          this.hasNoCurrency = true;
        }
      }

      if(this.hasNoCurrency){
        if(row){
          row.currency = value.label;
          updateExchangeRateData(row).then(res => {
            if(res.success){
                this.$Message.success(res.message);
                this.getExchangeRateDatas();
              }else{
                this.$Message.error(res.message);
              }
          }).catch(error => {
            this.$Message.error(res.data.message);
          })
        }
      }
    },
    onSelectChange(selection) {
      this.selectExchange = selection;
    },
    //汇率添加币种唯一校验
    onModalCurrencyChange(value) {
      for(let item of this.rateData){
        if(item.currency === value){
          this.$Message.error('不可选择汇率已有币种！');
          break;
        }
      }
    },
    onExchangeRateBlur(row) {
      if(row){
        if(!isNaN(row.exchangeRate)){
          row.exchangeRate = Number(row.exchangeRate);
          updateExchangeRateData(row).then(res => {
            if(res.success){
                this.$Message.success(res.message);
                this.getExchangeRateDatas();
              }else{
                this.$Message.error(res.message);
              }
          }).catch(error => {
            this.$Message.error(res.data.message);
          })
        }else{
          this.$Message.error('请输入数字！');
        }
      }
    },
    onLocalCurrencyChange(status, row) {
      if(row){
        status ? row.localCurrency = 1 : row.localCurrency = 0;
        updateExchangeRateData(row).then(res => {
            if(res.success){
                this.$Message.success(res.message);
                this.getExchangeRateDatas();
              }else{
                this.$Message.error(res.message);
              }
          }).catch(error => {
            this.$Message.error(res.data.message);
          })
      }
    },
    //添加汇率
    addExchangeRate(type) {
      this.$refs["exchangeRateInfoItem"].validate(valid => {
        if(valid){
          addExchangeRateData(this.exchangeRateInfo).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.$refs["exchangeRateInfoItem"].resetFields();
              type !== 'update' && (this.showExchangeRateModal = false)
              this.getExchangeRateDatas();
            }else{
              this.$Message.error(res.message);
            }
          }).catch(error => {
            this.$Message.error(res.data.message);
          })
        }
      })
    },
    //删除汇率
    deleteExchange() {
      let deleteData = [];
      if(this.selectExchange.length > 0){
        for(let item of this.selectExchange){
          deleteData.push(item.id);
        }

        this.deleteRateCommon(deleteData);
      }else{
        this.$Message.error('请先选择要删除的选项！');
      }
    },
    //管理员选择modal展示
    selectAdminModal(type) {
      this.showAdminModal = true;
      this.searchValue = "";
      this.modalType = type;
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
          singleId = [],
          type = 1,
          typeName = 'admins';

      if(this.modalType !== 'admin'){
        typeName = 'operationsManager';
        type = -1;
      }

      this.enterpriseInfo[typeName].push(...this.onPageSelection);
      this.enterpriseInfo[typeName] = this.enterpriseInfo[typeName].reduce(
        (cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        },
        []
      );
      
      this.onPageSelection.map(item => {
        singleId.push(item.userId);
      });

      updateRelation(singleId.join(","),type).then(res => {
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

      deleteRelation(userId,1).then(res => {
        if (res.success) {
          this.$Message.info("删除成功！");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //删除运营管理员节点
    deleteEnterpriseOperatorAdmin(event) {
      let userId = Number(event.target.parentElement.getAttribute("userid"));
      this.enterpriseInfo["operationsManager"] = this.enterpriseInfo["operationsManager"].filter(
        f => {
          return userId !== f.userId;
        }
      );

      deleteRelation(userId,-1).then(res => {
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
        res.depAccount = res.depAccount == '1' ? true : false;
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
          depAccount: this.enterpriseInfo.depAccount ? 1 : 0,
          ddAppAgentId: this.enterpriseInfo.ddAppAgentId,
          ddAppKey: this.enterpriseInfo.ddAppKey,
          ddAppsecret: this.enterpriseInfo.ddAppsecret,
          ddOauth2AppId:this.enterpriseInfo.ddOauth2AppId,
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

    //同步
    handleSyncInfo(){
      let fontDDColor = '#8DE427',
          fontqywxColor = '#8DE427';
      importThirdPlat().then(res => {
        if(res.success){
          this.$Message.success('同步成功！');
        }else{
          res.dd.success && (fontqywxColor = '#E4393C');
          res.qywx.success && (fontDDColor = '#E4393C');
            
          this.$Message.info({
            content: `<div style="color:${fontDDColor}">${res.dd.message}</div>
                      <div style="color:${fontqywxColor}">${res.qywx.message}</div>`
          });
        }
      }).catch(err => {
        this.$Message.error(err.data.message);
      });
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
    },
    //获取币种数据
    getCurrencyDatas() {
      getDictByValue('fundCurrency').then(res => {
        if(res){
          for(let item of res) {
            this.currencyList.push({
              label: item.name,
              value: item.value
            });
          }
        }
      })
    },
    //获取汇率数据
    getExchangeRateDatas() {
      this.selectExchange = [];
      getExchangeRateData().then(res => {
        if(res.success){
          this.rateData = res.list;
          this.rateData.forEach(val => {
            val.currencyValue === 'rmb' && (val._disabled = true);
            val.exchangeEdit = false;
            val.currencyEdit = false;
          })
        }
      })
    }
  },
  created() {
    this.getAdmintrstorData();
    this.getCurrencyDatas()
    this.getExchangeRateDatas();
    this.modalType = 'admin';
  }
};
</script>

    
