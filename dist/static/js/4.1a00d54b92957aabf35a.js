webpackJsonp([4],{HJza:function(e,t){},QAw9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("3SZ7"),n=a.n(s),i=a("o32f"),o=a("lZCD"),r=a("pX3c"),l={name:"job-member-info",components:{MemberModal:o.a,CustomTable:r.a},props:{jobId:{type:String}},data:function(){var e=this;return{memberInfoLoading:!1,searchValue:"",memberInfoParams:{roleId:this.jobId,page:1,limit:10},memberInfoColumns:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"},{title:"操作",key:"action",width:120,align:"center",render:function(t,a){return t("Button",{props:{type:"error",size:"small"},style:{cursor:"pointer"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除该成员？",onOk:function(){Object(i.m)(e.jobId,a.row.userId).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-member-info-change",!0))})}})}}},"删除")}}],memberInfoColumnsModel:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:10,onSelectionModal:[],selectDeleteMemberInfo:[],reload:!1}},methods:{onSelectionChange:function(e){e.length>0&&(this.selectDeleteMemberInfo=e)},onRefeshChange:function(e){e||(this.reload=e)},onSelectUserList:function(e){this.onSelectionModal=e},saveSelectionUser:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.userId)}),t&&Object(i.Y)(this.jobId,t.join(","),1).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowMemberModal=!1,e.$emit("on-member-info-change",!0))})},deleteMemberInfo:function(){var e=this,t=[];this.selectDeleteMemberInfo.forEach(function(e){t.push(e.userId)}),t&&Object(i.m)(this.jobId,t.join(","),0).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-member-info-change",!0))})},getListUsers:function(e,t,a){var s=this;this.listUserLoading=!0,Object(i.A)(t,e,a).then(function(e){e.tableContent[0]&&(s.listUserPageTotal=e.dataCount,s.listUserData=e.tableContent,s.listUserLoading=!1)})},listUserChangePage:function(e){var t=n()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(e,this.pageSize,t)},onPageSizeChange:function(e){this.pageSize=e;var t=n()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(1,e,t)},showMemberModal:function(){this.isShowMemberModal=!0,this.searchValue="",this.getListUsers(this.listUserCurrentPage,this.pageSize)},userFilter:function(){var e=n()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(this.listUserCurrentPage,this.pageSize,e)}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getRoleUser2Oneself",columns:e.memberInfoColumns,apiParams:e.memberInfoParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.showMemberModal}},[e._v("添加成员")]),e._v(" "),a("span",[e._v("-添加成员")]),e._v(" "),a("label",{on:{click:e.deleteMemberInfo}},[e._v("移除成员")]),e._v(" "),a("span",[e._v("-移除成员")])])]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionUser},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticClass:"app-search"},[a("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索工号或名称"},on:{"on-search":e.userFilter},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),e._v(" "),a("a",{staticClass:"app-search-icon",on:{click:e.userFilter}},[a("Button",{attrs:{type:"primary",size:"small"}},[e._v("查询")])],1)],1),e._v(" "),a("Table",{ref:"selection",attrs:{height:"400",loading:e.listUserLoading,columns:e.memberInfoColumnsModel,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var d=a("D8HT")(l,c,!1,function(e){a("V0Yv")},"data-v-628c401f",null).exports,m={name:"job-permission",components:{CustomTable:r.a,MemberModal:o.a},props:{jobId:{type:String}},data:function(){var e=this;return{permissionParams:{objectName:"role",objectId:this.jobId,page:1,limit:10,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{title:"id",key:"id",hidden:!0},{title:"名称",key:"name"},{title:"操作",key:"action",width:120,align:"center",render:function(t,a){return t("Button",{props:{type:"error",size:"small"},style:{cursor:"pointer"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除该权限？",onOk:function(){Object(i.r)(e.jobId,a.row.id).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-permission-change",!0))})}})}}},"删除")}}],isShowModal:!1,allPermissionData:[],selectPermissionNode:[],selectDeletePermission:[],reload:!1}},methods:{listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0,this.getAllPermissionData()},onRefeshChange:function(e){e||(this.reload=e)},deletePermission:function(){var e=this,t=[];this.selectDeletePermission.forEach(function(e){t.push(e.id)}),t&&Object(i.r)(this.jobId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.selectPermissionNode=[],e.reload=!0,e.$emit("on-permission-change",!0))})},onSelectionChange:function(e){e.length>0&&(this.selectDeletePermission=e)},onCheckChange:function(e){this.selectPermissionNode=e},savePermission:function(){var e=this,t=[];this.selectPermissionNode.forEach(function(e){t.push(e.id)}),t&&Object(i.h)(this.jobId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-permission-change",!0),e.isShowModal=!1)})},getAllPermissionData:function(){var e=this;0===this.allPermissionData.length&&Object(i.w)(0).then(function(t){t.tableContent.forEach(function(t){e.allPermissionData.push({title:t.name,id:t.id,loading:!1,children:[]})})})},loadData:function(e,t){Object(i.w)(e.id).then(function(e){var a=[];e.tableContent.forEach(function(e){"false"===e.leaf?a.push({title:e.name,id:e.id,loading:!1,children:[]}):a.push({title:e.name,id:e.id})}),t(a)})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:e.permissionColumns,apiParams:e.permissionParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.addPermission}},[e._v("添加权限")]),e._v(" "),a("span",[e._v("-添加权限")]),e._v(" "),a("label",{on:{click:e.deletePermission}},[e._v("移除权限")]),e._v(" "),a("span",[e._v("-移除权限")])])]),e._v(" "),a("member-modal",{attrs:{width:"600",footerBtnAlign:"right",title:"权限列表"},on:{"on-ok":e.savePermission},model:{value:e.isShowModal,callback:function(t){e.isShowModal=t},expression:"isShowModal"}},[a("div",{staticStyle:{"max-height":"350px",overflow:"auto"}},[a("Tree",{attrs:{data:e.allPermissionData,multiple:!0,"load-data":e.loadData},on:{"on-select-change":e.onCheckChange}})],1)])],1)},staticRenderFns:[]};var h=a("D8HT")(m,u,!1,function(e){a("hZQq")},"data-v-7ecc2e5c",null).exports,f={name:"job",components:{MemberModal:o.a,MemberInfo:d,Permission:h},data:function(){return{formItem:{name:"",type:"",describe:"",status:1},name:"",isEdit:!0,editBtnName:"编辑",statusRadio:[{name:"停用",value:-1},{name:"使用中",value:1},{name:"未使用",value:2},{name:"草稿",value:3}],actionBtn:[{label:"权限",type:"md-person",number:0,hidden:!1,id:"objectPermission"},{label:"成员信息",imgPath:"resources/images/icon/user.png",number:0,hidden:!1,id:"user"},{label:"基本信息",type:"ios-home",hidden:!1,id:"baseinfo"}],actionIndex:2,ruleValidate:{name:[{required:!0,message:"请输入职位名称",trigger:"blur"}],type:[{required:!0,message:"请选择职位类型",trigger:"change"}]},checkout:!0,jobId:this.$route.params.jobId}},methods:{handlerViewChange:function(e){this.actionIndex=e},cancle:function(){this.$Modal.confirm({title:"提示",content:"是否关闭当前页面",closable:!0,onOk:function(){location.href="/Site/index.html#page/jobs"}})},edit:function(){this.isEdit=!this.isEdit,this.editBtnName=this.isEdit?"编辑":"放弃编辑"},saveAndAdd:function(){var e=this;this.$refs.formItem.validate(function(t){t&&(!e.jobId&&e.checkout&&(delete e.formItem.id,Object(i._1)(e.formItem).then(function(t){t&&(e.$Message.success("保存成功"),e.$refs.formItem.resetFields(),e.formItem={name:"",type:"",describe:"",status:1})}).catch(function(t){e.$Message.errer(error.data.message)})),e.checkout||e.$Message.error("名称已经存在!"))})},save:function(){var e=this;this.$refs.formItem.validate(function(t){t&&(e.jobId?(e.formItem.id=e.jobId,Object(i._1)(e.formItem).then(function(t){t&&(e.$Message.success("保存成功"),window.location.reload())}).catch(function(t){e.$Message.errer(error.data.message)})):!e.jobId&&e.checkout&&(delete e.formItem.id,Object(i._1)(e.formItem).then(function(t){t&&(e.$Message.success("保存成功"),e.$router.push({path:"/addressBook/job/detail/"+t.id}),window.location.reload())}).catch(function(t){e.$Message.errer(error.data.message)})),e.checkout||e.$Message.error("名称已经存在!"))})},getObjDetailsCountByRoleId:function(e){var t=this;Object(i.N)(e).then(function(e){t.actionBtn.forEach(function(t){t.number=e[t.id]})})},handleChangeObjDetailsCount:function(e){e&&this.getObjDetailsCountByRoleId(this.jobId)},onGroupNameOutBlur:function(){var e=this,t={};this.isEdit||(t=this.jobId?[{filedName:"name",value:this.formItem.name,symbol:"="},{filedName:"id",symbol:"<>",value:this.jobId}]:[{filedName:"name",value:this.formItem.name,symbol:"="}],t=n()(t),Object(i.k)("sys_role",t).then(function(t){t.result>0?(e.checkout=!1,e.$Message.error("名称已经存在!")):e.checkout=!0}).catch(function(t){e.$Message.error(t.data.message)}))}},mounted:function(){var e=this,t=document.body.clientHeight-95;window.document.getElementsByClassName("job-wrap-tabs")[0].style.height=t+"px";var a=n()([{operator:"eq",value:this.jobId,property:"id"}]),s=this;this.jobId?(Object(i.x)(a).then(function(t){if(t.tableContent[0]){var a=t.tableContent[0];s.formItem.name=a.name,e.name=a.name,s.formItem.type=a.type,s.formItem.status=a.status,s.formItem.describe=a.describe}}),this.getObjDetailsCountByRoleId(this.jobId)):this.jobId||"add"!=this.$route.name||(this.isEdit=!1,this.actionBtn.forEach(function(e){"baseinfo"!==e.id&&(e.hidden=!0)}))}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"job-wrap"},[a("header",{staticClass:"job-wrap-header"},[a("span",{staticClass:"job-wrap-header-job"},[e._v("职位")]),e._v(" "),a("span",{staticClass:"job-wrap-header-others"},[e._v("/")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.jobId,expression:"jobId"}],staticClass:"job-wrap-header-others"},[e._v(e._s(e.name))]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.jobId,expression:"!jobId"}],staticClass:"job-wrap-header-others"},[e._v("创建")]),e._v(" "),a("Tag",{directives:[{name:"show",rawName:"v-show",value:e.jobId,expression:"jobId"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.formItem.status},expression:"{status:formItem.status}"}],staticClass:"radius10 marlr10 color_fff",staticStyle:{"margin-bottom":"7px"}})],1),e._v(" "),a("div",{staticClass:"job-wrap-action"},[a("ul",e._l(e.actionBtn,function(t,s){return t.hidden?e._e():a("li",{key:s,staticClass:"job-wrap-action-li",class:s===e.actionIndex?"job-wrap-action-li-active":"",on:{click:function(t){e.handlerViewChange(s)}}},[a("div",[t.type?a("Icon",{staticClass:"icon",attrs:{type:t.type}}):a("img",{staticClass:"job-wrap-action-li-img",attrs:{src:t.imgPath}}),e._v(" "),a("div",{staticClass:"left-content"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"undefine"!==t.number,expression:"item.number!=='undefine'"}]},[e._v(e._s(t.number))]),e._v(" "),a("h3",[e._v(e._s(t.label))])])],1)])}))]),e._v(" "),a("div",{staticClass:"job-wrap-tabs"},[2===e.actionIndex?a("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[a("Form",{ref:"formItem",class:{"is-required":e.isEdit},attrs:{model:e.formItem,labelWidth:120,rules:e.ruleValidate}},[a("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"职位名称:",prop:"name"}},[a("Input",{class:e.isEdit?"input-status-isedit":"",attrs:{readonly:e.isEdit},on:{"on-blur":e.onGroupNameOutBlur},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),a("FormItem",{attrs:{label:"职位类型",labelWidth:120,prop:"type"}},[a("Select",{class:e.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职位类型",disabled:e.isEdit},model:{value:e.formItem.type,callback:function(t){e.$set(e.formItem,"type",t)},expression:"formItem.type"}},[a("Option",{attrs:{value:"M"}},[e._v("管理类")]),e._v(" "),a("Option",{attrs:{value:"Y"}},[e._v("营销类")]),e._v(" "),a("Option",{attrs:{value:"J"}},[e._v("技术类")]),e._v(" "),a("Option",{attrs:{value:"Z"}},[e._v("专业类")]),e._v(" "),a("Option",{attrs:{value:"C"}},[e._v("操作类")])],1)],1),e._v(" "),a("div",{staticClass:"baseinfo-container-divider"}),e._v(" "),a("FormItem",{staticStyle:{"margin-top":"20px"},attrs:{label:"职位状态",labelWidth:120}},[a("Select",{class:e.isEdit?"input-status-isedit":"",attrs:{disabled:e.isEdit},model:{value:e.formItem.status,callback:function(t){e.$set(e.formItem,"status",t)},expression:"formItem.status"}},e._l(e.statusRadio,function(t,s){return a("Option",{key:s,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1)],1),e._v(" "),a("div",{staticClass:"baseinfo-container-action"},[a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"关闭"},on:{click:e.cancle}}),e._v(" "),e.jobId?a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit"},domProps:{value:e.editBtnName},on:{click:e.edit}}):e._e(),e._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:!e.isEdit,expression:"!isEdit"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存"},on:{click:e.save}}),e._v(" "),e.jobId?e._e():a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存并新建"},on:{click:e.saveAndAdd}})])],1):e._e(),e._v(" "),1===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("member-info",{attrs:{jobId:e.jobId},on:{"on-member-info-change":e.handleChangeObjDetailsCount}})],1):e._e(),e._v(" "),0===e.actionIndex?a("section",{staticClass:"permission-container rfd-tab-container-common"},[a("permission",{attrs:{jobId:e.jobId},on:{"on-permission-change":e.handleChangeObjDetailsCount}})],1):e._e()])])},staticRenderFns:[]};var b=a("D8HT")(f,p,!1,function(e){a("HJza")},null,null);t.default=b.exports},V0Yv:function(e,t){},hZQq:function(e,t){},"o/4Y":function(e,t){},pX3c:function(e,t,a){"use strict";var s=a("o32f"),n={name:"CustomTable",props:{columns:{type:Array},apiUrl:{type:String},apiParams:{type:Object},value:{type:Boolean,default:!1},isHiddenPage:{type:Boolean,default:!1}},data:function(){return{pageTotal:0,currentPage:1,pageSize:10,loading:!1,columnsData:[]}},watch:{value:function(e){e&&this.getTableData(this.apiParams)}},methods:{changeCurrentPage:function(e){var t=this.apiParams;t.page=e,this.getTableData(t)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},onPageSizeChange:function(e){var t=this.apiParams;t.limit=e,this.getTableData(t)},getTableData:function(e){var t=this;this.loading=!0,Object(s.R)(this.apiUrl,e).then(function(e){t.pageTotal=e.dataCount?e.dataCount:e.summary.total,t.columnsData=e.tableContent,t.value&&t.$emit("on-refesh-change",!1),t.loading=!1})}},mounted:function(){this.getTableData(this.apiParams)}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rfd-cs"},[a("header",{staticClass:"rfd-cs-header"},[e._t("header")],2),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.columnsData},on:{"on-selection-change":e.onSelectionChange}})],1),e._v(" "),e.isHiddenPage?e._e():a("div",{staticClass:"rfd-cs-table"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changeCurrentPage,"on-page-size-change":e.onPageSizeChange}})],1)]),e._v(" "),a("footer",{staticClass:"rfd-cs-footer"},[e._t("footer")],2)])},staticRenderFns:[]};var o=a("D8HT")(n,i,!1,function(e){a("o/4Y")},null,null);t.a=o.exports}});
//# sourceMappingURL=4.1a00d54b92957aabf35a.js.map