webpackJsonp([4],{"2RcG":function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"job-wrap"},[a("header",{staticClass:"job-wrap-header"},[a("span",{staticClass:"job-wrap-header-job",on:{click:s.goRoleList}},[s._v("职位")]),s._v(" "),a("span",{staticClass:"job-wrap-header-others"},[s._v("/")]),s._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:s.jobId,expression:"jobId"}],staticClass:"job-wrap-header-others"},[s._v(s._s(s.name))]),s._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!s.jobId,expression:"!jobId"}],staticClass:"job-wrap-header-others"},[s._v("创建")]),s._v(" "),a("Tag",{directives:[{name:"show",rawName:"v-show",value:s.jobId,expression:"jobId"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:s.formItem.status},expression:"{status:formItem.status}"}],staticClass:"radius10 marlr10 color_fff",staticStyle:{"margin-bottom":"7px"}})],1),s._v(" "),a("div",{staticClass:"job-wrap-action"},[a("ul",s._l(s.actionBtn,function(e,t){return e.hidden?s._e():a("li",{key:t,staticClass:"job-wrap-action-li",class:t===s.actionIndex?"job-wrap-action-li-active":"",on:{click:function(e){s.handlerViewChange(t)}}},[a("div",[e.type?a("Icon",{staticClass:"icon",attrs:{type:e.type}}):a("img",{staticClass:"job-wrap-action-li-img",attrs:{src:e.imgPath}}),s._v(" "),a("div",{staticClass:"left-content"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"undefine"!==e.number,expression:"item.number!=='undefine'"}]},[s._v(s._s(e.number))]),s._v(" "),a("h3",[s._v(s._s(e.label))])])],1)])}),0)]),s._v(" "),a("div",{staticClass:"job-wrap-tabs"},[2===s.actionIndex?a("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[a("Form",{ref:"formItem",class:{"is-required":s.isEdit},attrs:{model:s.formItem,labelWidth:120,rules:s.ruleValidate}},[a("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"职位名称:",prop:"name"}},[a("Input",{class:s.isEdit?"input-status-isedit":"",attrs:{readonly:s.isEdit},on:{"on-blur":s.onGroupNameOutBlur},model:{value:s.formItem.name,callback:function(e){s.$set(s.formItem,"name",e)},expression:"formItem.name"}})],1),s._v(" "),a("FormItem",{attrs:{label:"职位类型",labelWidth:120,prop:"type"}},[a("Select",{class:s.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职位类型",disabled:s.isEdit},model:{value:s.formItem.type,callback:function(e){s.$set(s.formItem,"type",e)},expression:"formItem.type"}},[a("Option",{attrs:{value:"M"}},[s._v("管理类")]),s._v(" "),a("Option",{attrs:{value:"Y"}},[s._v("营销类")]),s._v(" "),a("Option",{attrs:{value:"J"}},[s._v("技术类")]),s._v(" "),a("Option",{attrs:{value:"Z"}},[s._v("专业类")]),s._v(" "),a("Option",{attrs:{value:"C"}},[s._v("操作类")])],1)],1),s._v(" "),s.jobId&&s.isEdit?a("div",{staticClass:"baseinfo-container-divider"}):s._e(),s._v(" "),s.jobId&&s.isEdit?a("FormItem",{attrs:{label:"创建者："}},[a("span",[s._v(s._s(s.tableContent.creator))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?a("FormItem",{attrs:{label:"创建时间："}},[a("span",[s._v(s._s(s.tableContent.crtTime))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?a("FormItem",{attrs:{label:"修改者："}},[a("span",[s._v(s._s(s.tableContent.modifier))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?a("FormItem",{attrs:{label:"修改时间："}},[a("span",[s._v(s._s(s.tableContent.modTime))])]):s._e()],1),s._v(" "),a("div",{staticClass:"baseinfo-container-action",on:{click:s.handleSubmitBoxs}},[a("input",{staticClass:"baseinfo-container-action-submit",staticStyle:{"background-color":"rgb(81, 90, 110)"},attrs:{type:"submit",value:"关闭",id:"close"}}),s._v(" "),s.jobId&&s.isPermission?a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",id:"edit"},domProps:{value:s.editBtnName}}):s._e(),s._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit,expression:"!isEdit"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存",id:"save"}}),s._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit&&1===s.formItem.status,expression:"!isEdit && formItem.status === 1"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"归档",id:"file"}}),s._v(" "),s.jobId?s._e():a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存并新建",id:"saveAndAdd"}}),s._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit||!s.jobId,expression:"!isEdit || !jobId"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存草稿",id:"draft"}})])],1):s._e(),s._v(" "),1===s.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("member-info",{attrs:{isPermission:s.isPermission,jobId:s.jobId},on:{"on-member-info-change":s.handleChangeObjDetailsCount}})],1):s._e(),s._v(" "),0===s.actionIndex?a("section",{staticClass:"permission-container rfd-tab-container-common"},[a("permission",{attrs:{isPermission:s.isPermission,jobId:s.jobId},on:{"on-permission-change":s.handleChangeObjDetailsCount}})],1):s._e()])])},staticRenderFns:[]}},"O+au":function(e,t){},QAw9:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("o32f"),o=s("lZCD"),r=s("Gu7T"),l=s.n(r),c=s("pX3c"),d={name:"job-member-info",components:{MemberModal:o.a,CustomTable:c.a},props:{jobId:{type:String},isPermission:{type:Boolean}},data:function(){var s=this;return{memberInfoLoading:!1,searchValue:"",searchTableValue:"",memberInfoParams:{roleId:this.jobId,page:1,limit:10},memberInfoColumns:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo?t.row.photo:"resources/images/icon/defaultUserPhoto.jpg"}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var s=t.row.gender;return e("span",1===s?"男":0===s?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"},{title:"操作",key:"action",width:120,align:"center",render:function(e,t){return e("Button",{props:{type:"error",size:"small",disabled:!s.isPermission},style:{cursor:"pointer"},on:{click:function(){s.$Modal.confirm({title:"确认",content:"确认删除该成员？",onOk:function(){Object(n.k)(s.jobId,t.row.userId).then(function(e){e.success&&(s.$Message.success("删除成功!"),s.reload=!0,s.$emit("on-member-info-change",!0))}).catch(function(e){s.$Message.error(e.data.message)})}})}}},"删除")}}],memberInfoColumnsModel:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo?t.row.photo:"resources/images/icon/defaultUserPhoto.jpg"}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var s=t.row.gender;return e("span",1===s?"男":0===s?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:10,onPageSelection:[],selectDeleteMemberInfo:[],reload:!1}},methods:{onSelectionChange:function(e){0<e.length&&(this.selectDeleteMemberInfo=e)},onRefeshChange:function(e){e||(this.reload=e)},onSelectAll:function(e){var t,s={};(t=this.onPageSelection).push.apply(t,l()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!s[t.userId]&&(s[t.userId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,s=this.onPageSelection;t.map(function(t){s=s.filter(function(e){return e.userId!==t.userId})}),this.onPageSelection=s}else{var a,i={};(a=this.onPageSelection).push.apply(a,l()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!i[t.userId]&&(i[t.userId]=e.push(t)),e},[])}},deletePageSelection:function(e){var s=this,a=Number(e.target.parentElement.getAttribute("userId"));this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==a}),this.$refs.selection.data.forEach(function(e,t){a===e.userId&&s.$refs.selection.toggleSelect(t)})},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},saveSelectionUser:function(){var t=this,s=[];this.onPageSelection.forEach(function(e){s.push(e.userId)}),s&&Object(n.Z)(this.jobId,s.join(","),1).then(function(e){e.success&&(t.$Message.success(e.message),t.reload=!0,t.isShowMemberModal=!1,t.$emit("on-member-info-change",!0))})},deleteMemberInfo:function(){var t=this,s=[];this.selectDeleteMemberInfo.forEach(function(e){s.push(e.userId)}),0<s.length?Object(n.k)(this.jobId,s.join(","),0).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.reload=!0,t.$emit("on-member-info-change",!0))}).catch(function(e){t.$Message.error(e.data.message)}):this.$Message.error("请选择要移除的成员")},getListUsers:function(e,t,s){var a=this;this.listUserLoading=!0,Object(n.A)(t,e,s).then(function(e){a.listUserPageTotal=e.dataCount,a.listUserData=e.tableContent,a.listUserLoading=!1,0<a.onPageSelection.length&&a.listUserData.map(function(t){a.onPageSelection.map(function(e){t.userId===e.userId&&(t._checked=!0)})})})},listUserChangePage:function(e){var t=i()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(e,this.pageSize,t)},onPageSizeChange:function(e){this.pageSize=e;var t=i()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(1,e,t)},showMemberModal:function(){this.isShowMemberModal=!0,this.searchValue="",this.onPageSelection=[],this.getListUsers(this.listUserCurrentPage,this.pageSize)},userFilter:function(){var e=i()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(this.listUserCurrentPage,this.pageSize,e)},userTableFilter:function(){var e=i()([{operator_1:"like",value_1:this.searchTableValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchTableValue,property_2:"userCode"}]);this.memberInfoParams.filter=e,this.reload=!0}}},u=s("QnuS"),m=s.n(u);var h=function(e){s("iJXx")},p=s("VU/8")(d,m.a,!1,h,"data-v-4130fc91",null).exports,f=s("3zRX"),b={name:"job-permission",components:{CustomTable:c.a,PermissionModal:f.a},props:{jobId:{type:String},isPermission:{type:Boolean}},data:function(){var s=this;return{permissionParams:{objectName:"role",objectId:this.jobId,page:1,limit:10,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"name"},{title:"操作",key:"action",width:120,align:"center",render:function(e,t){return e("Button",{props:{type:"error",size:"small",disabled:!s.isPermission},style:{cursor:"pointer"},on:{click:function(){s.$Modal.confirm({title:"确认",content:"确认删除该权限？",onOk:function(){Object(n.q)(s.jobId,t.row.id).then(function(e){e.success&&(s.$Message.success("删除成功!"),s.reload=!0,s.$emit("on-permission-change",!0))}).catch(function(e){s.$Message.error(e.data.message)})}})}}},"删除")}}],isShowModal:!1,selectDeletePermission:[],reload:!1,searchValue:"",target:{type:"role",targetId:this.jobId}}},methods:{permissionChange:function(){this.reload=!0,this.$emit("on-permission-change",!0)},changeModalStatus:function(){this.isShowModal=!1},listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0},onRefeshChange:function(e){e||(this.reload=e)},deletePermission:function(){var t=this,s=[];this.selectDeletePermission.forEach(function(e){s.push(e.id)}),s&&Object(n.q)(this.jobId,s.join(",")).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.selectPermissionNode=[],t.reload=!0,t.$emit("on-permission-change",!0))}).catch(function(e){t.$Message.error(e.data.message)})},onSelectionChange:function(e){0<e.length&&(this.selectDeletePermission=e)},onCheckChange:function(e){this.selectPermissionNode=e},permissionFilter:function(){var e=i()([{operator:"like",value:this.searchValue,property:"name"}]);this.permissionParams.filter=e,this.reload=!0}}},v=s("SdRk"),g=s.n(v);var I=function(e){s("O+au")},_=s("VU/8")(b,g.a,!1,I,"data-v-363aae39",null).exports,C={name:"job",components:{MemberModal:o.a,MemberInfo:p,Permission:_},data:function(){return{formItem:{name:"",type:"",describe:"",status:-3},tableContent:{},name:"",isEdit:!0,editBtnName:"编辑",actionBtn:[{label:"权限",type:"md-person",number:0,hidden:!1,id:"objectPermission"},{label:"成员信息",imgPath:"resources/images/icon/user.png",number:0,hidden:!1,id:"user"},{label:"基本信息",type:"ios-home",hidden:!1,id:"baseinfo"}],actionIndex:2,ruleValidate:{name:[{required:!0,message:"请输入职位名称",trigger:"blur"}],type:[{required:!0,message:"请选择职位类型",trigger:"change"}]},checkout:!0,jobId:this.$route.params.jobId,isPermission:!0}},methods:{goRoleList:function(){location.href="/Site/index.html#page/jobs"},handlerViewChange:function(e){this.actionIndex=e},handleSubmitBoxs:function(e){var t=e.target||e.srcElement;if("input"===t.nodeName.toLocaleLowerCase())switch(t.id){case"close":this.$Modal.confirm({title:"提示",content:"是否关闭当前页面",closable:!0,onOk:function(){location.href="/Site/index.html#page/jobs"}});break;case"edit":this.isEdit=!this.isEdit,this.editBtnName=this.isEdit?"编辑":"放弃编辑";break;case"save":this.formItem.status=1,this.save();break;case"saveAndAdd":this.formItem.status=1,this.saveAndAdd();break;case"file":this.formItem.status=-2,this.save();break;case"draft":this.formItem.status=0,this.save()}},saveAndAdd:function(){var t=this;this.$refs.formItem.validate(function(e){e&&(!t.jobId&&t.checkout&&(delete t.formItem.id,Object(n._2)(t.formItem).then(function(e){t.$Message.success("保存成功"),t.$refs.formItem.resetFields(),t.formItem={name:"",type:"",describe:"",status:-3}}).catch(function(e){t.$Message.errer(error.data.message)})),t.checkout||t.$Message.error("名称已经存在!"))})},save:function(){var t=this;this.$refs.formItem.validate(function(e){e&&(t.jobId?(t.formItem.id=t.jobId,Object(n._8)(t.formItem).then(function(e){e&&(t.$Message.success("更新成功"),window.location.reload())}).catch(function(e){t.$Message.errer(error.data.message)})):!t.jobId&&t.checkout&&(delete t.formItem.id,Object(n._2)(t.formItem).then(function(e){e&&(t.$Message.success("保存成功"),t.$router.push({path:"/addressBook/job/detail/"+e.id}),window.location.reload())}).catch(function(e){t.$Message.errer(error.data.message)})),t.checkout||t.$Message.error("名称已经存在!"))})},getObjDetailsCountByRoleId:function(e){var s=this;Object(n.O)(e).then(function(t){s.actionBtn.forEach(function(e){e.number=t[e.id]})})},handleChangeObjDetailsCount:function(e){e&&this.getObjDetailsCountByRoleId(this.jobId)},onGroupNameOutBlur:function(){var t=this,e={};this.isEdit||(e=this.jobId?[{filedName:"name",value:this.formItem.name,symbol:"="},{filedName:"id",symbol:"<>",value:this.jobId}]:[{filedName:"name",value:this.formItem.name,symbol:"="}],e=i()(e),Object(n.i)("sys_role",e).then(function(e){0<e.result?(t.checkout=!1,t.$Message.error("名称已经存在!")):t.checkout=!0}).catch(function(e){t.$Message.error(e.data.message)}))}},mounted:function(){var s=this,e=document.body.clientHeight-95;window.document.getElementsByClassName("job-wrap-tabs")[0].style.height=e+"px";var t=i()([{operator:"eq",value:this.jobId,property:"id"}]),a=this;this.jobId?(Object(n.x)(t).then(function(e){if(e.tableContent[0]){var t=e.tableContent[0];s.name=t.name,a.formItem.name=t.name,a.formItem.type=t.type,a.formItem.status=t.status,a.formItem.describe=t.describe,s.tableContent=t}}),this.getObjDetailsCountByRoleId(this.jobId)):this.jobId||"job-add"!=this.$route.name||(this.isEdit=!1,this.actionBtn.forEach(function(e){"baseinfo"!==e.id&&(e.hidden=!0)})),Object(n.L)("000003").then(function(e){e[0].action.update||(s.isPermission=!1)})}},y=s("2RcG"),j=s.n(y);var w=function(e){s("vo/H")},k=s("VU/8")(C,j.a,!1,w,null,null);t.default=k.exports},QnuS:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("custom-table",{attrs:{apiUrl:"/ds/getRoleUser2Oneself",columns:t.memberInfoColumns,apiParams:t.memberInfoParams},on:{"on-selection-change":t.onSelectionChange,"on-refesh-change":t.onRefeshChange},model:{value:t.reload,callback:function(e){t.reload=e},expression:"reload"}},[s("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[t.isPermission?s("div",{staticStyle:{display:"inline"}},[s("label",{on:{click:t.showMemberModal}},[t._v("添加成员")]),t._v(" "),s("span",[t._v("-添加成员")]),t._v(" "),s("label",{on:{click:t.deleteMemberInfo}},[t._v("移除成员")]),t._v(" "),s("span",[t._v("-移除成员")])]):t._e(),t._v(" "),s("div",{staticClass:"app-table-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索工号或名称"},on:{"on-search":t.userTableFilter},model:{value:t.searchTableValue,callback:function(e){t.searchTableValue=e},expression:"searchTableValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.userTableFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1)])]),t._v(" "),s("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":t.saveSelectionUser},model:{value:t.isShowMemberModal,callback:function(e){t.isShowMemberModal=e},expression:"isShowMemberModal"}},[s("div",{staticStyle:{"margin-top":"10px"}},[s("div",{staticClass:"app-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索工号或名称"},on:{"on-search":t.userFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.userFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1),t._v(" "),s("Table",{ref:"selection",attrs:{height:"400",size:"small",loading:t.listUserLoading,columns:t.memberInfoColumnsModel,data:t.listUserData},on:{"on-select-all":t.onSelectAll,"on-selection-change":t.handerSelectionChange,"on-select-cancel":t.onSelectCancel}}),t._v(" "),s("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:t.listUserPageTotal,current:t.listUserCurrentPage,"page-size":t.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-page-size-change":t.onPageSizeChange,"on-change":t.listUserChangePage}})],1)])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},t._l(t.onPageSelection,function(e){return s("Tag",{key:e.userId,attrs:{userId:e.userId,closable:!0,type:"border",color:"primary",size:"small"},on:{"on-close":t.deletePageSelection}},[t._v("\n        "+t._s(e.nickname)+"\n      ")])}),1)])],1)},staticRenderFns:[]}},SdRk:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:t.permissionColumns,apiParams:t.permissionParams},on:{"on-selection-change":t.onSelectionChange,"on-refesh-change":t.onRefeshChange},model:{value:t.reload,callback:function(e){t.reload=e},expression:"reload"}},[s("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[t.isPermission?s("div",{staticStyle:{display:"inline"}},[s("label",{on:{click:t.addPermission}},[t._v("添加权限")]),t._v(" "),s("span",[t._v("-添加权限")]),t._v(" "),s("label",{on:{click:t.deletePermission}},[t._v("移除权限")]),t._v(" "),s("span",[t._v("-移除权限")])]):t._e(),t._v(" "),s("div",{staticClass:"app-table-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索权限名称"},on:{"on-search":t.permissionFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.permissionFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1)])]),t._v(" "),s("permission-modal",{attrs:{target:t.target,visible:t.isShowModal},on:{changeModalStatus:t.changeModalStatus,permissionChange:t.permissionChange}})],1)},staticRenderFns:[]}},iJXx:function(e,t){},"vo/H":function(e,t){}});