<style lang="less">
@import "./organization.less";
</style>

<template>
  <div class="organization-wrap">
    <header class="organization-wrap-header shadow" >
      <div class="l-info">
        <span @click="goOrgList" class="l-info-org">组织</span>
        <span class="l-info-others">/</span>
        <span v-show="groupId" class="l-info-others">{{org.groupName}}</span>
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
        :target="target" 
        :formItem="org"
        @relevantInstChange="setRelevantInstCount"
        :groupType="org.groupType"
        >
      </router-view>
    </div>
  </div>
</template>

<script>
import {
  getOrgBaseInfo,
  getObjDetailsCountByGroupId,
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
        groupName: "",
        groupType: "",
        depFunction: "",
        status: 1,
        principal: "",
        principalName: "",
        highGroup: "",
        parentId: "",
        creator:"",
        crtTime:"",
        modifier:"",
        modTime:""
      },
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
          hidden: this.$route.params.groupId==undefined,
          routeName: "basic",
          id: "baseinfo"
        }
      ],
      groupId: this.$route.params.groupId,
      isPermission: true,
      target: {
        type: "group",
        targetId: this.$route.params.groupId
      }
    };
  },

  computed: {
    // formItemGroupType() {
    //   return this.formItem.groupType;
    // }
  },

  watch: {
    // formItemGroupType: function(oldValue, newValue) {
    //   if (oldValue !== newValue && !this.isEdit) {
    //     this.formItem.highGroup = "";
    //   }
    // },
    $route(to, from) {
     
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
    setRelevantInstCount() {
      getObjDetailsCountByGroupId(this.$route.params.groupId).then(res => {
        this.actionBtn.forEach((element, index) => {
          if (element.id !== "baseinfo" && element.id !== "teamProfit") {
            element.number = res[element.id] ? res[element.id] : 0;
          }
        });
      });
    },
        //设置组织信息
    setOrgInfo(){
        getOrgById(this.groupId).then(res => {
        if (res.length > 0) {
          let org = res[0];
          this.org.groupName = org.groupName;
          this.org.groupType = org.groupType;
          this.org.depFunction = org.depFunction;
          this.org.status = org.status;
          this.org.principal = org.principal; //负责人id
          this.org.principalName = org.principalName; //负责人名称
          this.org.highGroup = org.parentGroupName;
          this.org.parentId = org.parentId;

          this.org.creator = org.creatorName;
          this.org.crtTime = org.crtTime;
          this.org.modifier= org.modifierName;
          this.org.modTime = org.modTime;

          switch (org.groupType) {
            case "M":
              this.groupType = "管理层";
              break;
            case "A":
              this.groupType = "事业部";
              break;
            case "O":
              this.groupType = "部门";
              break;
            case "G":
              this.groupType = "小组";
              break;
          }
        }
      });
    }
  },

  mounted() {
    if(this.$route.params.groupId){
      this.setRelevantInstCount();
      this.setOrgInfo();
    }
    
    getListById("000002").then(res => {
      if (!res[0].action.update) {
        this.isPermission = false;
      }
    });
  }
};
</script>
