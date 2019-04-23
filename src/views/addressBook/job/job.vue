<style lang="less">
@import "./job.less";
</style>

<template>
  <div class="job-wrap">
    <header class="job-wrap-header">
      <div class="l-info">
        <span @click="goRoleList" class="l-info-job">职位</span>
        <span class="l-info-others">/</span>
        <span v-show="jobId" class="l-info-others">{{name}}</span>
        <span v-show="!jobId" class="l-info-others">创建</span>
        <Tag v-show="jobId" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status}" style="margin-bottom: 7px;"></Tag>
      </div>
    
      <ul class="r-action">
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="r-action-li" v-bind:class="index===actionIndex?'r-action-li-active':''" @click="handlerViewChange(index)">
          <img v-if="!item.type" :src="item.imgPath" class="r-action-li-img" />
          <Icon v-else :type="item.type" class="icon" />
          <div class="left-content">
            <span v-show="item.number!=='undefine'">{{item.number}}</span>
            <p>{{item.label}}</p>
          </div>
        </li>
      </ul>
    </header>
    <div class="job-wrap-tabs">
      <!-- 基本信息 -->
      <section class="baseinfo-container rfd-tab-container-common" v-if="actionIndex===2">
        <Form :model="formItem" :labelWidth="120" ref="formItem" :rules="ruleValidate" :class="{'is-required':isEdit}">
          <FormItem label="职位名称:" style="font-size:16px" prop="name">
            <Input v-model="formItem.name" @on-blur="onGroupNameOutBlur" :readonly="isEdit" :class="isEdit?'input-status-isedit':''" />
          </FormItem>
          <FormItem label="职能类型:" :labelWidth="120" prop="functionType">
            <Select 
              v-model="formItem.functionType" 
              @on-change="onHandleFunctionValueChange"
              placeholder="请选择职能类型" 
              :disabled="isEdit" 
              :class="isEdit?'input-status-isedit':''"
              >
              <Option v-for="(type, index) in functionTypeList" :value="type.value" :key="index+'_'+type.value">{{type.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="职能:" :labelWidth="120" prop="function">
            <Select 
              v-model="formItem.function" 
              @on-open-change="getFunctionType($event,'function')"
              placeholder="请选择职能" 
              :disabled="isEdit" 
              :class="isEdit?'input-status-isedit':''"
              >
              <Option v-for="(type, index) in functionList" :value="type.value" :key="index+'_'+type.value">{{type.name}}</Option>
            </Select>
          </FormItem>
           <FormItem label="职级通道:" :labelWidth="120" prop="rankPass">
            <Select 
              v-model="formItem.rankPass" 
              @on-change="onHandleRankValueChange"
              placeholder="请选择职级通道" 
              :disabled="isEdit" 
              :class="isEdit?'input-status-isedit':''"
              >
                <Option v-for="(rankPass, index) in rankPassList" :value="rankPass.value" :key="index+'_'+rankPass.valeu">{{rankPass.name}}</Option>
            </Select>
           
          </FormItem>
            <FormItem label="职级:" :labelWidth="120" prop="rank">
             <Select 
              v-model="formItem.rank" 
              @on-open-change="getFunctionType($event,'rank')"
              placeholder="请选择职级" 
              :disabled="isEdit" 
              :class="isEdit?'input-status-isedit':''"
              >
                <Option v-for="(rank, index) in rankList" :value="rank.value" :key="index+'_'+rank.valeu">{{rank.name}}</Option>
            </Select>
          </FormItem>
            <FormItem :labelWidth="120" label="小时成本" prop="hourCost"  style="font-size:16px">
              <InputNumber v-model="formItem.hourCost" :step="0.1" :min="0.1" :readonly="isEdit"></InputNumber>
          </FormItem>
            <FormItem :labelWidth="120" label="职责描述" style="font-size:16px">
             <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="职责描述" :readonly="isEdit" ></Input>
          </FormItem>
          <div class="baseinfo-container-divider" v-if="jobId && isEdit"></div>
          <FormItem label="创建者:" v-if="jobId && isEdit">
            <span>{{ tableContent.creator}}</span>
          </FormItem>
          <FormItem label="创建时间:" v-if="jobId && isEdit">
            <span>{{ tableContent.crtTime }}</span>
          </FormItem>
          <FormItem label="修改者:" v-if="jobId && isEdit">
            <span>{{ tableContent.modifier}}</span>
          </FormItem>
          <FormItem label="修改时间:" v-if="jobId && isEdit">
            <span>{{ tableContent.modTime }}</span>
          </FormItem>
        </Form>
        <div class="baseinfo-container-action" @click="handleSubmitBoxs">
          <input type='submit' value="关闭" style="background-color:rgb(81, 90, 110)" class="baseinfo-container-action-submit" id="close" />
          <input type='submit' :value="editBtnName" class="baseinfo-container-action-submit" id="edit" v-if="jobId && isPermission" />
          <input type='submit' value="保存"  class="baseinfo-container-action-submit" id="save" v-show="!isEdit && formItem.status !== -2" />
          <input type='submit' value="归档" style="background-color:rgb(31, 94, 197)" class="baseinfo-container-action-submit" id="file" v-show="!isEdit && formItem.status === 1" />
          <input type='submit' value="还原" style="background-color:rgb(31, 94, 197)" class="baseinfo-container-action-submit" id="restore" v-show="!isEdit && formItem.status === -2" />
          <input type='submit' value="保存并新建" class="baseinfo-container-action-submit" id="saveAndAdd" v-if="!jobId"/>
          <input type='submit' value="保存草稿" class="baseinfo-container-action-submit" id="draft" v-show="(!isEdit && formItem.status === 0) || !jobId" />
        </div>
      </section>
      <!-- 成员信息 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
        <member-info :isPermission="isPermission" :jobId="jobId" @on-member-info-change='handleChangeObjDetailsCount'></member-info>
      </section>
      <!-- 权限 -->
      <section class="permission-container" v-if="actionIndex===0">
        <permission :target="target" :isPermission="isPermission" :jobId="jobId" @on-permission-change='handleChangeObjDetailsCount'></permission>
      </section>
    </div>

  </div>
</template>

<script>
import {
  getAllRole,
  saveRoleBaseInfo,
  updateRoleBaseInfo,
  getObjDetailsCountByRoleId,
  checkoutFieldIsOnly,
  getFunctionType,
  getListById
} from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";
import MemberInfo from "./instance/job-member-info";
import Permission from "../user/detail/instance/direct-permission";
export default {
  name: "job",

  components: {
    MemberModal,
    MemberInfo,
    Permission
  },

  data() {
    return {
      formItem: {
        name: "",
        functionType: "",
        function: "",
        rank:"",
        rankPass:"",
        hourCost:0.1,
        describe:"",
        status: -3
      },
      functionTypeList:[],  //职能类型
      functionList:[],  //职能
      rankPassList:[],  //职级通道
      rankList:[],  //职级


      tableContent:{},
      name: "",
      isEdit: true,
      editBtnName: "编辑",

      actionBtn: [
        {
          label: "权限",
          type: "md-person",
          number: 0,
          hidden: false,
          id: "objectPermission"
        },
        {
          label: "成员信息",
          imgPath: "resources/images/icon/user.png",
          number: 0,
          hidden: false,
          id: "user"
        },
        {
          label: "基本信息",
          type: "ios-home",
          hidden: false,
          id: "baseinfo"
        }
      ],
      actionIndex: 2,

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入职位名称",
            trigger: "blur"
          }
        ],
        functionType: [
          {
            required: true,
            message: "请选择职能类型",
            trigger: "change"
          }
        ],
        function: [
          {
            required: true,
            message: "请选择职能",
            trigger: "change"
          }
        ],
        rankPass: [
          {
            required: true,
            message: "请选择职级通道",
            trigger: "change"
          }
        ],
        rank: [
          {
            required: true,
            message: "请选择职级",
            trigger: "change"
          }
        ],
        hourCost: [
          {
            required: true,
            message: "请选择小时成本",
               type: "number"
          }
        ]
      },
      checkout: true,

      jobId: this.$route.params.jobId,
      isPermission: true,
      target: {
        type: 'role',
        targetId: this.$route.params.jobId
      }
    };
  },
  watch: {
    $route(to, from) {
      window.location.reload();
    }
  },
  methods: {
    goRoleList() {
        location.href = '/Site/index.html#page/jobs';
    },
    handlerViewChange(index) {
      this.actionIndex = index;
    },

    onHandleFunctionValueChange(value){
      if(!this.isEdit){
        this.formItem.function ="";
      }
    },
     onHandleRankValueChange(value){
      if(!this.isEdit){
        this.formItem.rank ="";
      }
     },

    //获取职能类型
    getFunctionType:function(value,type){
      if(!value){  //下拉框收起时
        return;
      }
      let action = new Map([
        ['function',()=>{return this.formItem.functionType}],
        ['rank',()=>{return this.formItem.rankPass}],
      ]);
      let params = action.get(type)();
      if(type==='function'&& !params){
        this.$Message.error('职能类型不能为空');
        return;
      }
       if(type==='rank'&& !params){
        this.$Message.error('职级通道不能为空');
        return;
      }


      if(params){
        getFunctionType(params).then(res=>{
          switch(type){
            case 'function':
              this.functionList = res; 
              break;
            case 'rank':
              this.rankList = res; 
              break;
          }
        })
      }
    },

    //按钮事件委托给父元素处理
    handleSubmitBoxs(event) {
      let target = event.target || event.srcElement;
      if (target.nodeName.toLocaleLowerCase() === "input") {
        switch (target.id) {
          case "close":
            this.$Modal.confirm({
              title: "提示",
              content: "是否关闭当前页面",
              closable: true,
              onOk: function() {
                location.href = "/Site/index.html#page/jobs";
              }
            });
            break;
          case "edit":
            this.isEdit = !this.isEdit;
            this.editBtnName = this.isEdit ? "编辑" : "放弃编辑";
            break;
          case "save":
            this.formItem.status = 1;
            this.save();
            break;
          case "saveAndAdd":
            this.formItem.status = 1;
            this.saveAndAdd();
            break;
          case "file":
            this.formItem.status = -2;
            this.save();
            break;
          case "draft":
            this.formItem.status = 0;
            this.save();
            break;
          case "restore":
            this.formItem.status = 1;
            this.save();
            break;
        }
      }
    },

    saveAndAdd() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (!this.jobId && this.checkout) {
            delete this.formItem.id;
            saveRoleBaseInfo(this.formItem)
              .then(res => {
                  this.$Message.success("保存成功");
                  this.$refs["formItem"].resetFields();
                  this.formItem = {
                    name: "",
                    type: "",
                    describe: "",
                    status: -3
                  };
              })
              .catch(errer => {
                this.$Message.errer(error.data.message);
              });
          }
          if (!this.checkout) {
            this.$Message.error("名称已经存在!");
          }
        }
      });
    },

    save() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          //判断是编辑,还是新增保存
          if (this.jobId) {
            this.formItem.id = this.jobId;
            updateRoleBaseInfo(this.formItem)
              .then(res => {
                if (res) {
                  this.$Message.success("更新成功");
                  window.location.reload();
                }
              })
              .catch(errer => {
                this.$Message.errer(error.data.message);
              });
          } else if (!this.jobId && this.checkout) {
            delete this.formItem.id;
            saveRoleBaseInfo(this.formItem)
              .then(res => {
                if (res) {
                  this.$Message.success("保存成功");
                  this.$router.push({
                    path: "/addressBook/job/detail/" + res.id
                  });
                }
              })
              .catch(errer => {
                this.$Message.errer(error.data.message);
              });
          }
          if (!this.checkout) {
            this.$Message.error("名称已经存在!");
          }
        }
      });
    },

    getObjDetailsCountByRoleId(jobId) {
      getObjDetailsCountByRoleId(jobId).then(res => {
        this.actionBtn.forEach(element => {
          element.number = res[element.id];
        });
      });
    },

    handleChangeObjDetailsCount(val) {
      if (val) {
        this.getObjDetailsCountByRoleId(this.jobId);
      }
    },

    //当职位名称失去焦点的是校验名称
    onGroupNameOutBlur() {
      let filter = {};
      if (!this.isEdit) {
        if (this.jobId) {
          filter = [
            {
              filedName: "name",
              value: this.formItem.name,
              symbol: "="
            },
            {
              filedName: "id",
              symbol: "<>",
              value: this.jobId
            }
          ];
        } else {
          filter = [
            {
              filedName: "name",
              value: this.formItem.name,
              symbol: "="
            }
          ];
        }
        filter = JSON.stringify(filter);
        //当groupId不存在时，校验名称是否唯一
        checkoutFieldIsOnly("sys_role", filter)
          .then(res => {
            if (res.result > 0) {
              this.checkout = false;
              this.$Message.error("名称已经存在!");
            } else {
              this.checkout = true;
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    }
  },

  mounted() {
    let tabsMaxHight = document.body.clientHeight - 95;
    window.document.getElementsByClassName("job-wrap-tabs")[0].style.height =
      tabsMaxHight + "px";

    let filter = JSON.stringify([
      { operator: "eq", value: this.jobId, property: "id" }
    ]);
    let that = this;
    if (this.jobId) {
      getAllRole(filter).then(res => {
        if (res.tableContent[0]) {
          let tableContent = res.tableContent[0];
          this.name = tableContent.name;
          that.formItem.name = tableContent.name;
          that.formItem.type = tableContent.type;
          that.formItem.status = tableContent.status;
          that.formItem.function = tableContent.function;
          that.formItem.functionType = tableContent.functionType;
          that.formItem.rank = tableContent.rank;
           that.formItem.rankPass = tableContent.rankPass;
          that.formItem.hourCost = tableContent.hourCost;
          that.formItem.describe = tableContent.describe;
          this.tableContent = tableContent;
          
          //获取职级
          getFunctionType(tableContent.functionType).then(res=>{
            this.functionList = res; 
          })
          //获取职能
          getFunctionType(tableContent.rankPass).then(res=>{
            this.rankList = res; 
          })
        }
      });
      this.getObjDetailsCountByRoleId(this.jobId);
    } else if (!this.jobId && this.$route.name == "job-add") {
      this.isEdit = false;
      this.actionBtn.forEach(element => {
        if (element.id !== "baseinfo") {
          element.hidden = true;
        }
      });
    }

    getListById('000003').then(res => {
        if(!res[0].action.update){
          this.isPermission = false;
        }
    });

    //获取职能类型
    getFunctionType('functionType').then(res=>{
      this.functionTypeList = res; 
    });

     //获取职级通道
    getFunctionType('rankPass').then(res=>{
      this.rankPassList = res; 
    })
  }
};
</script>
