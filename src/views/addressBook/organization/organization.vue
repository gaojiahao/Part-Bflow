<style lang="less">
@import "./organization.less";
</style>

<template>
  <div class="organization-wrap">
    <header class="organization-wrap-header shadow" >
      <div class="l-info">
        <span @click="goOrgList" class="l-info-org">组织</span>
        <span class="l-info-others">/</span>
        <span v-show="groupId" class="l-info-others">{{org.name}}</span>
        <span v-show="!groupId" class="l-info-others">创建</span>
        <Tag
          v-show="groupId"
          class="radius10 marlr10 color_fff"
          v-instanceStateDirective="{status:org.status}"
          style="margin-bottom: 7px; padding-right: 13px;"
        ></Tag>
      </div>

      <ul class="r-action">
        <router-link
          tag="li"
          :to="item.routeName"
          class="r-action-li"
          v-show="!item.hidden"
          v-for="(item,index) in actionBtn"
          :key="index"
        >
          <img v-if="!item.type" :src="item.imgPath" class="r-action-li-img">
          <Icon v-else :type="item.type" class="icon"/>
          <div class="left-content">
            <span v-show="item.number!=='undefine'">{{item.number}}</span>
            <p>{{item.label}}</p>
          </div>
        </router-link>
      </ul>
    </header>

    <div class="org-container">
      <router-view 
        :isPermission="isPermission" 
        :groupType="formItem.groupType" 
        :target="target" 
        ></router-view>
    </div>
  </div>
</template>

<script>
import {
  getOrgBaseInfo,
  getObjDetailsCountByGroupId,
  saveBaseinfo,
  updateBaseinfo,
  checkoutFieldIsOnly,
  getAllHigherGroupByGroupType,
  getAllUsers,
  getListById,
  getOrgById
} from "@/services/addressBookService.js";
export default {
  name: "organization",

  components: {
  },

  data() {
    return {
      org:{
        name:"",
        status: -3
      },
      formItem: {
        groupName: "",
        groupType: "",
        depFunction: "",
        status: -3,
        principal: "",
        principalName: "",
        highGroup: "",
        parentId: ""
      },
      tableContent: {},

      isEdit: true,
      editBtnName: "编辑",

      hiddenInput: false,

      actionBtn: [
        {
          label: "权限",
          type: "md-person",
          number: 0,
          hidden: this.$route.params.groupId==undefined,
          routeName: "permission",
          id: "objectPermission"
        },
        {
          label: "成员信息",
          imgPath: "https://lab.roletask.com/resource/app-icon/user.png",
          number: 0,
          hidden: this.$route.params.groupId==undefined,
          routeName: "memberinfo",
          id: "user"
        },
        {
          label: "负责人",
          imgPath: "https://lab.roletask.com/resource/app-icon/user.png",
          number: 0,
          hidden: this.$route.params.groupId==undefined,
          routeName: "principal",
          id: "groupPrincipal"
        },
        {
          label: "下级组织",
          imgPath:
            "https://lab.roletask.com/resource/app-icon/organization.png",
          number: 0,
          hidden: this.$route.params.groupId==undefined,
          routeName: "lowerOrg",
          id: "childGroup"
        },
        {
          label: "上级组织",
          imgPath:
            "https://lab.roletask.com/resource/app-icon/organization.png",
          number: 0,
          hidden: this.$route.params.groupId==undefined,
          routeName: "higherOrg",
          id: "parentGroup"
        },
        {
          label: "组织利润表",
          imgPath: "https://lab.roletask.com/resource/app-icon/team-profit.png",
          hidden: this.$route.params.groupId==undefined,
          routeName: "teamProfit",
          id: "teamProfit"
        },
        {
          label: "基本信息",
          type: "ios-home",
          hidden: false,
          routeName: "basic",
          id: "baseinfo"
        }
      ],

      actionIndex: 6,

      //上级组织模态框属性
      isShowMemberModal: false,
      highOrgModalLoading: true,
      //存放编辑时的上级组织
      editHighOrg: "",
      editHighOrgParentId: "",
      name: "",
      groupType: "",
      parentType: "",
      listUserData: [],
      highOrgColumnsModal: [
        {
          title: "组织名称",
          key: "groupName"
        },
        {
          title: "组织类型",
          key: "groupType",
          render: (h, params) => {
            let groupType = params.row.groupType;
            switch (groupType) {
              case "M":
                groupType = "管理层";
                break;
              case "A":
                groupType = "事业部";
                break;
              case "O":
                groupType = "部门";
                break;
              case "D":
                groupType = "直营店";
                break;
              case "J":
                groupType = "加盟店";
                break;
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "组织职能",
          key: "depFunction",
          render: (h, params) => {
            let depFunction = params.row.depFunction;
            switch (depFunction) {
              case "M":
                depFunction = "管理";
                break;
              case "S":
                depFunction = "销售";
                break;
              case "C":
                depFunction = "制造";
                break;
              case "R":
                depFunction = "研发";
                break;
              case "O":
                depFunction = "运营";
                break;
              case "E":
                depFunction = "工程";
                break;
            }
            return h("span", depFunction);
          }
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case -1:
                value = "已失效";
                break;
              case 1:
                value = "已生效";
                break;
              case 2:
                value = "进行中";
                break;
              case 0:
                value = "草稿";
                break;
              case -2:
                value = "已归档";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: status ? "#0279f6" : "#f03707",
                  cursor: "default"
                }
              },
              value
            );
          }
        }
      ],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 10,
      searchHighOrgValue: "",
      onSelectionModal: [],

      //负责人模态框参数
      isShowPrincipalModal: false,
      PrincipalModaLoading: false,
      principalData: [],
      principalPageTotal: 0,
      principalCurrentPage: 1,
      principalPageSize: 10,
      searchPrincipalValue: "",
      onSelectionPrincipal: [],
      principalColumnsModel: [
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
          render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "手机号",
          key: "mobile"
        }
      ],

      ruleValidate: {
        groupName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ],
        highGroup: [
          {
            required: true,
            message: "请选择上级组织",
            trigger: "change"
          }
        ],
        groupType: [
          {
            required: true,
            message: "请选择组织类型",
            trigger: "change"
          }
        ],
        depFunction: [
          {
            required: true,
            message: "请选择组织职能",
            trigger: "change"
          }
        ],
        principal: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "change"
          }
        ]
      },

      checkout: true,

      groupId: this.$route.params.groupId,
      isPermission: true,
      target: {
        type: "group",
        targetId: this.$route.params.groupId
      }
    };
  },

  computed: {
    formItemGroupType() {
      return this.formItem.groupType;
    }
  },

  watch: {
    formItemGroupType: function(oldValue, newValue) {
      if (oldValue !== newValue && !this.isEdit) {
        this.formItem.highGroup = "";
      }
    },
    $route(to, from) {
      // window.location.reload();
    }
  },

  methods: {
    goOrgList() {
      location.href = "/Site/index.html#page/origanizations";
    },
    /**
     * 获取相关实例数量
     * @param groupId 组织id
     */
    getObjDetailsCountByGroupId(groupId) {
      getObjDetailsCountByGroupId(groupId).then(res => {
        this.actionBtn.forEach((element, index) => {
          if (element.id !== "baseinfo" && element.id !== "teamProfit") {
            element.number = res[element.id] ? res[element.id] : 0;
          }
        });
      });
    }
  },

  mounted() {
    if(this.$route.params.groupId){
      this.getObjDetailsCountByGroupId(this.$route.params.groupId);
    }
    getListById("000002").then(res => {
      if (!res[0].action.update) {
        this.isPermission = false;
      }
    });
  }
};
</script>
