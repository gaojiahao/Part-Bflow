<style lang="less">
@import './user-info.less';
</style>

<template>
    <div class="info">
        <Row class="info-detail">
            <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="107" :class="{'is-required':isEdit}">
                <FormItem label="头像：">
                    <Upload v-if="!isEdit" ref="upload"  
                        :show-upload-list="false" 
                        :on-success="handleSuccess" 
                        :format="['jpg','jpeg','png']" 
                        :max-size="2048" 
                        :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        type="drag"
                        action="/H_roleplay-si/ds/upload" 
                        style="display: inline-block;width:128px;vertical-align: middle;" 
                        :headers="httpHeaders">
                        <div style="width: 128px;height:128px;line-height: 128px;" v-if="!logo">
                            <img v-if="logo" :src="logo">
                            <i v-if="!logo" class="iconfont">&#xe63b;</i>
                        </div>
                        <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="logo">
                            <img :src="logo">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" color="#fff" size="30" @click.stop="handleView"></Icon>
                                <Icon type="ios-trash-outline" color="#fff" size="30" @click.stop="handleRemove"></Icon>
                            </div>
                        </div>
                    </Upload>
                    <img v-else :src="logo?logo:false" style="width: 128px;height:128px;">
                    <Modal title="查看头像" v-model="visible">
                        <img :src="logo" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="工号：" prop="userCode">
                    <Input :class="{'info-edit':isAdd}" :readonly="isAdd" @on-blur="userCodeBlur" v-model="formItem.userCode" style="width:60%"></Input>
                </FormItem>
                <FormItem label="姓名：" prop="nickname">
                    <Input :class="{'info-edit':isEdit}" :readonly="isEdit" v-model="formItem.nickname" style="width:60%"></Input>
                </FormItem>
                <FormItem label="性别：">
                    <RadioGroup v-model="formItem.gender">
                        <Radio :disabled="isEdit" label="1">男</Radio>
                        <Radio :disabled="isEdit" label="0">女</Radio>
                    </RadioGroup>
                </FormItem>
                <div class="info-line"></div>
                <FormItem label="手机：" prop="mobile">
                    <Input :class="{'info-edit':isEdit}" :readonly="isEdit" v-model="formItem.mobile" style="width:60%"></Input>
                </FormItem>
                <FormItem label="座机：" prop="officePhone">
                    <Input :class="{'info-edit':isEdit}" :readonly="isEdit" v-model="formItem.officePhone" style="width:60%"></Input>
                </FormItem>
                <FormItem label="邮箱：" prop="email">
                    <Input :class="{'info-edit':isEdit}" :readonly="isEdit" v-model="formItem.email" style="width:60%"></Input>
                </FormItem>
                <div class="info-line"></div>
                <FormItem label="类型：">
                    <RadioGroup v-model="formItem.userType">
                        <Radio :disabled="isEdit" label="1">长期有效</Radio>
                        <Radio :disabled="isEdit" label="0">临时账户</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if="formItem.userType === '0'" label="账户有效期：" prop="termOfValidity">
                    <DatePicker :class="{'info-edit':isEdit}" :readonly="isEdit" type="date" placeholder="" v-model="formItem.termOfValidity"></DatePicker>
                </FormItem>
                <FormItem label="状态：">
                    <Select v-if="!isEdit" v-model="formItem.status" style="width:60%">
                        <Option value="1">使用中</Option>
                        <Option value="3">草稿</Option>
                        <Option value="-1">停用</Option>
                        <Option value="2">未使用</Option>
                    </Select>
                    <span v-else>{{ userInfo.statusText }}</span>
                </FormItem>
                <FormItem label="公司：" prop="entityName">
                    <Input @on-click="selectCompanyModal" v-model="formItem.entityName" :icon="isEdit?'':'md-arrow-dropdown'" :class="{'info-edit':isEdit}" :readonly="isEdit" style="width:60%"></Input>
                </FormItem>
                <FormItem v-if="hiddenInput" label="公司主体id" style="width:60%">
                    <Input v-model="formItem.entityId" />
                </FormItem>
                <div class="info-line"></div>
                <FormItem v-if="isAdd && isEdit" label="创建者：">
                    <span>{{ userInfo.creatorName }}</span>
                </FormItem>
                <FormItem v-if="isAdd && isEdit" label="创建时间：">
                    <span>{{ userInfo.crtTime }}</span>
                </FormItem>
                <FormItem v-if="isAdd && isEdit" label="修改者：">
                    <span>{{ userInfo.modifierName }}</span>
                </FormItem>
                <FormItem v-if="isAdd && isEdit" label="修改时间：">
                    <span>{{ userInfo.modTime }}</span>
                </FormItem>
            </Form>
        </Row>
        <Row class="info-btn">
            <Button @click="goUserList"  class="radius0" style="background-color: rgb(81, 90, 110) !important;color:#fff;font-weight:bold">关闭</Button>
            <Button v-if="isAdd" @click="editUserInfo"  class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold">{{ isEdit?'编辑':'放弃编辑'}}</Button>
            <Button v-if="!isEdit" @click="updateUserData"  class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold">保存</Button>
            <Button v-if="!isAdd" @click="saveAndAddUser" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold">保存并新建</Button>
        </Row>
        <Modal
            v-model="showCompanyModal"
            @on-ok="selectCompany"
            title="选择公司"
            :styles="{top: '20px'}"
            width="800">
            <div class="app-search">
              <Input @on-search="companyFilter" :search="true" v-model="searchValue" placeholder="搜索公司名称" style="width: 300px"></Input>
              <p @click="companyFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table class="rfd-principal-table" @on-row-dblclick="onDbClick" @on-row-click="onRowClick" ref="selection" :highlight-row="true" height="400" :loading="loading" :columns="companyColumns" :data="companyData"></Table>
            <div class="user-page">
                <div class="fr">
                  <Page @on-page-size-change="pageSizeChange" :total="companyTable.total" show-elevator show-sizer :current="companyTable.currentPage" :page-size="companyTable.pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getToken } from "@/utils/utils";
import { updateUser,addUser,checkoutFieldIsOnly,getAllCompanys } from "@/services/addressBookService.js";

export default {
  name: "userInfo",
  components: {},
  props: {
      userInfo: {
          type: Object
      }
  },
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      logo: "",
      searchValue: '',
      userId: this.$route.params.userId,
      hiddenInput: false,
      showCompanyModal: false,
      visible: false,
      checkout: true,
      isEdit: true,
      isAdd: true,
      loading: false,
      companyTable: {
          total: 0,
          currentPage: 1,
          pageSize: 10
      },
      companyColumns: [
          {
          title: "公司名称",
          key: "groupName"
        },
        {
          title: "公司简称",
          key: "groupShortName"
        },
        {
          title: "公司类型",
          key: "companyType"
        },
        {
          title: "创建者",
          key: "creator"
        }
      ],
      companyData: [],
      selectedCompanyData: {},
      formItem: {
        userCode: "",
        nickname: "",
        mobile: "",
        officePhone: "",
        email: "",
        status: "1",
        gender: "1",
        termOfValidity: "",
        userType: "1",
        entityId: '',
        entityName: ''
      },
      ruleValidate: {
          userCode: [
          {
            required: true,
            message: "请输入用户工号",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        entityName: [
          {
            required: true,
            message: "请选择公司主体",
            trigger: "blur"
          }
        ],
        termOfValidity: [
          {
            required: true,
            message: "请选择有效期"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号输入不合法",
            trigger: "blur",
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/
          }
        ],
        email: [
          { type: "email", message: "邮箱输入不合法", trigger: "blur" }
        ],
        officePhone: [
          { message: "电话输入不合法", trigger: "blur",pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/ }
        ]
      }
    };
  },
  watch: {
      userInfo: function(){
          if(Object.keys(this.userInfo).length > 0){
              console.log(this.userInfo);
                this.formItem.userCode = this.userInfo.userCode;
                this.formItem.nickname = this.userInfo.nickname;
                this.formItem.mobile = this.userInfo.mobile;
                this.formItem.officePhone = this.userInfo.officePhone;
                this.formItem.email = this.userInfo.email;
                this.formItem.termOfValidity = this.userInfo.termOfValidity;
                this.formItem.gender = String(this.userInfo.gender);
                this.formItem.status = String(this.userInfo.status);
                this.formItem.userType = String(this.userInfo.userType);
                this.logo = this.userInfo.photo;
                this.formItem.entityId = this.userInfo.entityId;
                this.formItem.entityName = this.userInfo.entityName;
          }
      }
  },
  methods: {
    //工号失去焦点验证唯一
    userCodeBlur() {
        let filter;
        if(this.userId){
            let value = this.formItem.userCode;
            filter = JSON.stringify([{filedName:"userCode",symbol:"=",value:value},{filedName:"userId",symbol:"<>",value:this.userId}]);
            checkoutFieldIsOnly('sys_user',filter).then(res => {
                if(res.result === 1){
                    this.checkout = false;
                    this.$Message.error('工号已存在，请重新输入！');
                }
            })
        }else{
            if(this.formItem.userCode){
                filter = JSON.stringify([{filedName:"userCode",symbol:"=",value:this.formItem.userCode}]);
                checkoutFieldIsOnly('sys_user',filter).then(res => {
                    if(res.result === 1){
                        this.checkout = false;
                        this.$Message.error('工号已存在，请重新输入！');
                    }
                })
            }
        }
    },
    handleSuccess(res, file) {
      this.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&url=" +
        res.data[0].attacthment;
    },

    //查看头像
    handleView() {
        this.visible = true;
    },
    //删除头像
    handleRemove() {
        this.logo = '';
        this.$refs['upload'].fileList.splice(0,this.$refs['upload'].fileList.length);
    },
    //判断上传头像大小
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
    editUserInfo() {
        this.isEdit = !this.isEdit;
    },
    //更新用户详情信息
    updateUserData() {
        this.$refs["formItem"].validate(valid => {
            if(valid){
                if(this.checkout){
                    this.formItem.photo = this.logo;
                    if(this.formItem.termOfValidity){
                        this.formItem.termOfValidity = this.formatDate(this.formItem.termOfValidity);
                    }
                    
                    if(this.userInfo.userId){
                        this.formItem.userId = this.userInfo.userId;
                        updateUser(this.formItem).then(res => {
                            if(res.success){
                                this.$Message.success('更新成功');
                                window.location.reload();
                            }
                        }).catch(error => {
                            this.$Message.error(error.data.message);
                        })
                    }else{
                    addUser(this.formItem).then(res => {
                        if(res){
                            this.$Message.success('保存成功');
                            this.$router.push({ path: '/addressBook/user/detail/'+res.user_id});
                            window.location.reload();
                        }
                    }).catch(error => {
                            this.$Message.error(error.data.message);
                        })
                    }
                }else{
                    this.$Message.error('工号已存在，请重新输入！');
                }
            }
        })
    },
    //展示公司modal
    selectCompanyModal() {
        this.showCompanyModal = true;
    },
    //双击选择公司
    onDbClick(selection,index) {
        this.formItem.entityId = selection.groupCode;
        this.formItem.entityName = selection.groupName;
        this.showCompanyModal = false;
    },
    //单击选择公司
    onRowClick(selection,index) {
        this.selectedCompanyData = selection;
    },
    //分页点击
    onPageChange(currentPage) {
        this.companyTable.currentPage = currentPage;
        this.getAllCompanysData(this.searchValue);
    },
    //每页条数改变
    pageSizeChange(size) {
        this.companyTable.pageSize = size;
        this.getAllCompanysData(this.searchValue);
    },
    //公司筛选
    companyFilter() {
        this.getAllCompanysData(this.searchValue);
    },
    //获取所有公司数据
    getAllCompanysData(searchText) {
        this.loading = true;
        getAllCompanys(this.companyTable.pageSize,this.companyTable.currentPage,searchText).then(res => {
            this.companyData = res.tableContent;
            this.companyTable.total = res.dataCount;
            this.loading = false;
        })
    },
    //确定选择的公司
    selectCompany() {
        this.formItem.entityId = this.selectedCompanyData.groupCode;
        this.formItem.entityName = this.selectedCompanyData.groupName;
    },
    //保存并继续添加用户
    saveAndAddUser() {
        this.userCodeBlur();
        this.$refs["formItem"].validate(valid => {
            if(valid){
                if(this.checkout){
                    this.formItem.photo = this.logo;
                    if(this.formItem.termOfValidity){
                        this.formItem.termOfValidity = this.formatDate(this.formItem.termOfValidity);
                    }
                    
                    if(this.userInfo.userId){
                    this.formItem.userId = this.userInfo.userId;
                        updateUser(this.formItem).then(res => {
                            if(res.success){
                                this.$Message.success(res.message);
                                this.$router.push({ path: '/addressBook/user/add'});
                                window.location.reload();
                            }
                        }).catch(error => {
                            this.$Message.error(error.data.message);
                        }) 
                    }else{
                        addUser(this.formItem).then(res => {
                            if(res){
                                this.$Message.success('新增成功！');
                                this.$refs["formItem"].resetFields();
                                this.formItem.termOfValidity = '';
                                this.logo = '';
                                this.formItem.photo = '';
                                this.formItem.gender = "1";
                                this.formItem.status = "1";
                                this.formItem.userType = "1";
                                this.$refs['upload'].fileList.splice(0,this.$refs['upload'].fileList.length);
                            }
                        }).catch(error => {
                            this.$Message.error(error.data.message);
                        })
                    }
                }
            }
        })
    },
    goUserList() {
        this.$Modal.confirm({
            title: '系统提示',
            content: '确认要关闭当前页面吗？',
            onOk: () => {
                location.href = '/Site/index.html#page/users';
            }
        });
    },
    //格式化日期方法
    formatDate(currentDate) {
      let date = new Date(currentDate),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          relDate;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      relDate = year + "-" + month + "-" + day;

      return relDate;
    }
  },
  mounted() {
      this.getAllCompanysData();
      if(!this.userId){
          this.isAdd = false;
          this.isEdit = false;
      }
  }
};
</script>
