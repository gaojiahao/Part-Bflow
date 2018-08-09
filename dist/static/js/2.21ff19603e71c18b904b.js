webpackJsonp([2],{"+q1O":function(e,t){},"9aVx":function(e,t){},PG1l:function(e,t){},PZCm:function(e,t){},PrwJ:function(e,t){},ZGYE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("mvHQ"),n=a.n(o),r=a("o32f"),i=a("lZCD"),s=a("pX3c"),l={name:"higher-organization",components:{CustomTable:s.a,MemberModal:i.a},props:{groupId:{type:String},groupType:{type:String}},data:function(){return{highOrganizationParams:{groupId:this.groupId,page:1,limit:8},highOrgColumns:[{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType",render:function(e,t){var a=t.row.groupType;switch(a){case"M":a="管理层";break;case"A":a="事业部";break;case"O":a="部门";break;case"G":a="小组"}return e("span",a)}},{title:"部门职能类型",key:"depFunction",render:function(e,t){var a=t.row.groupType;switch(a){case"M":a="管理";break;case"S":a="销售";break;case"C":a="制造";break;case"R":a="研发"}return e("span",a)}},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],highOrgColumnsModal:[{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType"},{title:"部门职能类型",key:"depFunction"},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,reload:!1,onSelectionModal:[]}},methods:{listUserChangePage:function(e){this.getAllGroup(e)},onSelectUserList:function(e,t){this.onSelectionModal=e},showMemberModal:function(){this.isShowMemberModal=!0,this.getListUsers(this.listUserCurrentPage,this.pageSize)},onRefeshChange:function(e){e||(this.reload=e)},showHighOrgModal:function(){this.isShowMemberModal=!0,this.getAllGroup(this.listUserCurrentPage)},saveSelectionHighOrg:function(){var e,t=this;e=this.onSelectionModal.groupId,Object(r.Z)(e,this.groupId).then(function(e){e.success&&(t.$Message.success("保存成功"),t.isShowMemberModal=!1,t.reload=!0,t.$emit("on-high-organization-change",!0))})},getAllGroup:function(e){var t=this;this.listUserLoading=!0;var a=[];if(this.groupType){switch(this.groupType){case"小组":a.push({operator:"ne",value:"岗位",property:"groupType"}),a.push({operator:"ne",value:"小组",property:"groupType"});break;case"部门":a.push({operator:"ne",value:"岗位",property:"groupType"}),a.push({operator:"ne",value:"小组",property:"groupType"}),a.push({operator:"ne",value:"部门",property:"groupType"});break;case"事业部":a.push({operator:"ne",value:"岗位",property:"groupType"}),a.push({operator:"ne",value:"小组",property:"groupType"}),a.push({operator:"ne",value:"部门",property:"groupType"}),a.push({operator:"ne",value:"事业部",property:"groupType"})}a=n()(a)}Object(r.t)(e,this.pageSize,a).then(function(e){e.tableContent[0]&&(t.listUserPageTotal=e.summary.total,t.listUserData=e.tableContent,t.listUserLoading=!1)})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getParentGroupByGroupId",columns:e.highOrgColumns,apiParams:e.highOrganizationParams},on:{"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.showHighOrgModal}},[e._v("上级组织")]),e._v(" "),a("span",[e._v("-选择上级用户")])])]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionHighOrg},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",{staticStyle:{"margin-top":"10px"}},[a("Table",{ref:"currentRowTable",attrs:{loading:e.listUserLoading,columns:e.highOrgColumnsModal,data:e.listUserData,size:"small","highlight-row":""},on:{"on-current-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var u=a("VU/8")(l,c,!1,function(e){a("+q1O")},"data-v-3f54c4fb",null).exports,p={name:"lower-organization",components:{CustomTable:s.a,MemberModal:i.a},props:{groupId:{type:String},groupType:{type:String}},data:function(){var e=this;return{lowOrganizationParams:{filter:n()([{operator:"eq",value:this.groupId,property:"parentId"}]),page:1,limit:8},lowerOrgColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType",render:function(e,t){var a=t.row.groupType;switch(a){case"M":a="管理层";break;case"A":a="事业部";break;case"O":a="部门";break;case"G":a="小组"}return e("span",a)}},{title:"部门职能类型",key:"depFunction",render:function(e,t){var a=t.row.depFunction;switch(a){case"M":a="管理层";break;case"A":a="事业部";break;case"O":a="部门";break;case"G":a="小组"}return e("span",a)}},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"},{title:"操作",key:"action",width:120,align:"center",render:function(t,a){return t("Button",{props:{type:"error",size:"small"},style:{cursor:"pointer"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此组织？",onOk:function(){var t={groupId:a.row.groupId,parentId:""};Object(r.j)(t).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-lower-organization-change",!0))})}})}}},"删除")}}],lowerOrgColumnsModel:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType",render:function(e,t){var a=t.row.groupType;switch(a){case"M":a="管理层";break;case"A":a="事业部";break;case"O":a="部门";break;case"G":a="小组"}return e("span",a)}},{title:"部门职能类型",key:"depFunction",render:function(e,t){var a=t.row.depFunction;switch(a){case"M":a="管理层";break;case"A":a="事业部";break;case"O":a="部门";break;case"G":a="小组"}return e("span",a)}},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,deleteBtnDisable:!0,reload:!1,onSelectionModal:[],selectDeleteLowerOrg:[]}},methods:{listUserChangePage:function(e){this.getAllGroup(e)},onSelectLowerUser:function(e){this.onSelectionModal=e},onSelectionChange:function(e){e.length>0?(this.deleteBtnDisable=!1,this.selectDeleteLowerOrg=e):this.deleteBtnDisable=!0},onRefeshChange:function(e){e||(this.reload=e)},showLoverOrgModal:function(){this.isShowMemberModal=!0,this.getAllGroup(this.listUserCurrentPage)},saveSelectionLowerOrg:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.groupId)}),Object(r.W)(this.groupId,t.join(",")).then(function(t){t.success&&(e.$Message.success("保存成功"),e.isShowMemberModal=!1,e.reload=!0,e.$emit("on-lower-organization-change",!0))})},deleteLoverOrg:function(){var e=this,t=[];this.selectDeleteLowerOrg.forEach(function(e){t.push({groupId:e.groupId,parentId:""})}),t&&Object(r.j)(t).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-lower-organization-change",!0))})},getAllGroup:function(e){var t=this;this.listUserLoading=!0;var a=[];if(this.groupType){switch(this.groupType){case"小组":a.push({operator:"ne",value:"小组",property:"groupType"}),a.push({operator:"ne",value:"部门",property:"groupType"}),a.push({operator:"ne",value:"事业部",property:"groupType"}),a.push({operator:"ne",value:"管理层",property:"groupType"});break;case"部门":a.push({operator:"ne",value:"部门",property:"groupType"}),a.push({operator:"ne",value:"事业部",property:"groupType"}),a.push({operator:"ne",value:"管理层",property:"groupType"});break;case"事业部":a.push({operator:"ne",value:"事业部",property:"groupType"}),a.push({operator:"ne",value:"管理层",property:"groupType"})}a=n()(a)}Object(r.t)(e,this.pageSize,a).then(function(e){e.tableContent[0]&&(t.listUserPageTotal=e.summary.total,t.listUserData=e.tableContent),t.listUserLoading=!1})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getAllGroup",columns:e.lowerOrgColumns,apiParams:e.lowOrganizationParams},on:{"on-refesh-change":e.onRefeshChange,"on-selection-change":e.onSelectionChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.showLoverOrgModal}},[e._v("添加下级组织")]),e._v(" "),a("span",[e._v("-添加下级组织")]),e._v(" "),a("label",{on:{click:e.deleteLoverOrg}},[e._v("删除下级组织")]),e._v(" "),a("span",[e._v("-删除下级组织")])])]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionLowerOrg},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",{staticStyle:{"margin-top":"10px"}},[a("Table",{ref:"selection",attrs:{loading:e.listUserLoading,columns:e.lowerOrgColumnsModel,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectLowerUser}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var g=a("VU/8")(p,d,!1,function(e){a("eFN1")},"data-v-11718010",null).exports,m={name:"member-info",components:{MemberModal:i.a,CustomTable:s.a},props:{groupId:{type:String}},data:function(){var e=this;return{memberInfoLoading:!1,memberInfoParams:{groupId:this.groupId,page:1,limit:8},memberInfoColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",key:"gender",width:60,render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"状态",width:60,key:"status",render:function(e,t){var a=t.row.status;return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},a?"在职":"离职")}},{title:"创建者",key:"creator",width:100},{title:"创建时间",key:"crtTime"},{title:"修改时间",key:"changeTime"},{title:"操作",key:"action",width:120,align:"center",render:function(t,a){return t("Button",{props:{type:"error",size:"small"},style:{cursor:"pointer"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除该成员？",onOk:function(){Object(r.n)(e.groupId,a.row.userId,0).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-member-info-change",!0))})}})}}},"删除")}}],memberInfoColumnsModel:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",key:"gender",width:60,render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"状态",width:60,key:"status",render:function(e,t){var a=t.row.status;return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},a?"在职":"离职")}},{title:"创建者",key:"creator",width:100},{title:"创建时间",key:"crtTime"},{title:"修改时间",key:"changeTime"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,onSelectionModal:[],selectDeleteMemberInfo:[],reload:!1}},methods:{onSelectionChange:function(e){e.length>0&&(this.selectDeleteMemberInfo=e)},onRefeshChange:function(e){e||(this.reload=e)},onSelectUserList:function(e){this.onSelectionModal=e},saveSelectionUser:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.userId)}),t&&Object(r.f)(this.groupId,t.join(","),1).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowMemberModal=!1,e.$emit("on-member-info-change",!0))})},deleteMemberInfo:function(){var e=this,t=[];this.selectDeleteMemberInfo.forEach(function(e){t.push(e.userId)}),t&&Object(r.n)(this.groupId,t.join(","),0).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-member-info-change",!0))})},getListUsers:function(e,t){var a=this;this.listUserLoading=!0,Object(r.S)(e,t).then(function(e){e.tableContent[0]&&(a.listUserPageTotal=e.summary.total,a.listUserData=e.tableContent,a.listUserLoading=!1)})},listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},showMemberModal:function(){this.isShowMemberModal=!0,this.getListUsers(this.listUserCurrentPage,this.pageSize)},exportData:function(){this.$refs.selection.exportCsv({filename:"成员信息"})}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getUsersByGroupId",columns:e.memberInfoColumns,apiParams:e.memberInfoParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.showMemberModal}},[e._v("添加成员")]),e._v(" "),a("span",[e._v("-添加成员")]),e._v(" "),a("label",{on:{click:e.deleteMemberInfo}},[e._v("移除成员")]),e._v(" "),a("span",[e._v("-移除成员")]),e._v(" "),a("label",{staticClass:"permission-container-btn-export",on:{click:e.exportData}},[e._v("导出")])])]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionUser},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",{staticStyle:{"margin-top":"10px"}},[a("Table",{ref:"selection",attrs:{loading:e.listUserLoading,columns:e.memberInfoColumnsModel,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var f=a("VU/8")(m,h,!1,function(e){a("9aVx")},"data-v-b0e23d42",null).exports,v={name:"principal",components:{CustomTable:s.a},props:{groupId:{type:String}},data:function(){return{principalParams:{groupId:this.groupId,page:1,limit:8},principallumns:[{title:"名称",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"联系电话",key:"phone"}]}}},b={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("custom-table",{attrs:{apiUrl:"/ds/getPrincipalByGroupId",columns:this.principallumns,apiParams:this.principalParams}})],1)},staticRenderFns:[]};var y=a("VU/8")(v,b,!1,function(e){a("PG1l")},null,null).exports,w={name:"principal",components:{CustomTable:s.a,MemberModal:i.a},props:{groupId:{type:String}},data:function(){var e=this;return{permissionParams:{objectName:"group",objectId:this.groupId,page:1,limit:8,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"id",key:"id",hidden:!0},{title:"名称",key:"name"},{title:"操作",key:"action",width:120,align:"center",render:function(t,a){return t("Button",{props:{type:"error",size:"small"},style:{cursor:"pointer"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除该权限？",onOk:function(){Object(r.o)(e.groupId,a.row.id).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowModal=!1,e.$emit("on-permission-change",!0))})}})}}},"删除")}}],isShowModal:!1,allPermissionData:[],selectPermissionNode:[],selectDeletePermission:[],reload:!1}},methods:{listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0,this.getAllPermissionData()},deletePermission:function(){var e=this,t=this,a=[];this.selectDeletePermission.forEach(function(e){a.push(e.id)}),a&&Object(r.o)(this.groupId,a.join(",")).then(function(a){a.success&&(t.$Message.success(a.message),t.reload=!0,t.isShowModal=!1,e.$emit("on-permission-change",!0))})},onSelectionChange:function(e){e.length>0&&(this.selectDeletePermission=e)},onRefeshChange:function(e){e||(this.reload=e)},onCheckChange:function(e){this.selectPermissionNode=e},savePermission:function(){var e=this,t=[];this.selectPermissionNode.forEach(function(e){t.push(e.id)}),t&&Object(r.g)(this.groupId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.selectPermissionNode=[],e.reload=!0,e.isShowModal=!1,e.$emit("on-permission-change",!0))})},getAllPermissionData:function(){var e=this;0===this.allPermissionData.length&&Object(r.u)(0).then(function(t){t.tableContent.forEach(function(t){e.allPermissionData.push({title:t.name,id:t.id,loading:!1,children:[]})})})},loadData:function(e,t){Object(r.u)(e.id).then(function(e){var a=[];e.tableContent.forEach(function(e){"false"===e.leaf?a.push({title:e.name,id:e.id,loading:!1,children:[]}):a.push({title:e.name,id:e.id})}),t(a)})}}},I={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:e.permissionColumns,apiParams:e.permissionParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.addPermission}},[e._v("添加权限")]),e._v(" "),a("span",[e._v("-添加权限")]),e._v(" "),a("label",{on:{click:e.deletePermission}},[e._v("移除权限")]),e._v(" "),a("span",[e._v("-移除权限")])])]),e._v(" "),a("member-modal",{attrs:{width:"600",footerBtnAlign:"right",title:"权限列表"},on:{"on-ok":e.savePermission},model:{value:e.isShowModal,callback:function(t){e.isShowModal=t},expression:"isShowModal"}},[a("div",{staticStyle:{"max-height":"350px",overflow:"auto"}},[a("Tree",{attrs:{data:e.allPermissionData,multiple:!0,"load-data":e.loadData},on:{"on-select-change":e.onCheckChange}})],1)])],1)},staticRenderFns:[]};var k=a("VU/8")(w,I,!1,function(e){a("parf")},"data-v-4b2080d2",null).exports,C={name:"organization",components:{MemberModal:i.a,HighOrganization:u,LowerOrganization:g,MemberInfo:f,Principal:y,Permission:k},data:function(){return{formItem:{groupName:"",groupType:"",depFunction:"",comment:"",status:1},groupType:"",statusRadio:[{name:"停用",value:0},{name:"使用中",value:1},{name:"未使用",value:2},{name:"草稿",value:3}],actionBtn:[{label:"权限",imgPath:"resources/images/icon/2_0.png",number:0,hidden:!1,id:"objectPermission"},{label:"成员信息",imgPath:"resources/images/icon/user.png",number:0,hidden:!1,id:"user"},{label:"负责人",imgPath:"resources/images/icon/user.png",number:0,hidden:!1,id:"groupPrincipal"},{label:"下级组织",imgPath:"resources/images/icon/organization.png",number:0,hidden:!1,id:"childGroup"},{label:"上级组织",imgPath:"resources/images/icon/organization.png",number:0,hidden:!1,id:"parentGroup"},{label:"基本信息",imgPath:"resources/images/icon/organization.png",hidden:!1,id:"baseinfo"}],actionIndex:5,groupId:this.$route.params.groupId}},methods:{handlerViewChange:function(e){this.actionIndex=e},cancle:function(){this.$router.push({path:"addressBook/organization/board"})},saveAndAdd:function(){var e=this;this.groupId||(delete this.formItem.groupId,"O"===this.formItem.groupType&&(this.formItem.depFunction=""),Object(r.V)(this.formItem).then(function(t){t&&(e.$Message.success("保存成功"),e.$refs.formItem.resetFields(),e.formItem={groupName:"",groupType:"",depFunction:"",comment:"",status:1})}))},save:function(){var e=this;"O"===this.formItem.groupType&&(this.formItem.depFunction=""),this.groupId?(this.formItem.groupId=this.groupId,Object(r._2)(this.formItem).then(function(t){t&&e.$Message.success("保存成功")})):(delete this.formItem.groupId,Object(r.V)(this.formItem).then(function(t){t&&(e.$Message.success("保存成功"),e.$router.push({path:"/addressBook/organization/detail/"+t.groupId}),window.loaction.reload())}))},getObjDetailsCountByGroupId:function(e){var t=this;Object(r.K)(e).then(function(e){t.actionBtn.forEach(function(t){t.number=e[t.id]})})},handleChangeObjDetailsCount:function(e){e&&this.getObjDetailsCountByGroupId(this.groupId)},goBack:function(){this.$router.push({path:"/addressBook/organization/board"})}},mounted:function(){var e=this,t=document.body.clientHeight-95;window.document.getElementsByClassName("organization-wrap-tabs")[0].style.height=t+"px",window.document.getElementsByClassName("organization-wrap-tabs")[0].style.maxHeight=t+"px";var a=n()([{operator:"eq",value:this.groupId,property:"groupId"}]);this.groupId?(Object(r.M)(a).then(function(t){if(t.tableContent[0]){var a=t.tableContent[0];switch(e.formItem.groupName=a.groupName,e.formItem.groupType=a.groupType,e.formItem.depFunction=a.depFunction,e.formItem.status=a.status,e.formItem.comment=a.comment,a.groupType){case"M":e.groupType="管理层";break;case"A":e.groupType="事业部";break;case"O":e.groupType="部门";break;case"G":e.groupType="小组"}}}),this.getObjDetailsCountByGroupId(this.groupId)):this.groupId||"add"!=this.$route.name||this.actionBtn.forEach(function(e){"baseinfo"!==e.id&&(e.hidden=!0)})}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"organization-wrap"},[a("header",{staticClass:"organization-wrap-header"},[e.groupId?a("h2",[a("span",{staticStyle:{color:"#4CAF50",cursor:"pointer"},on:{click:e.goBack}},[e._v("组织")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v("/")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v(e._s(e.formItem.groupName))]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v("/")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v(e._s(e.groupId))]),e._v(" "),a("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.formItem.status,color:"#eb2f96"},expression:"{status:formItem.status,color:'#eb2f96'}"}],staticClass:"radius10 marlr10 color_fff"})],1):e._e(),e._v(" "),e.groupId?e._e():a("h2",[a("span",{staticStyle:{color:"#4CAF50"}},[e._v("添加组织")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v("/")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v("创建")])])]),e._v(" "),a("div",{staticClass:"organization-wrap-action"},[a("ul",e._l(e.actionBtn,function(t,o){return t.hidden?e._e():a("li",{key:o,staticClass:"organization-wrap-action-li",class:o===e.actionIndex?"organization-wrap-action-li-active":"",on:{click:function(t){e.handlerViewChange(o)}}},[a("div",{staticStyle:{padding:"5px 0"}},[a("img",{staticClass:"organization-wrap-action-li-img",attrs:{src:t.imgPath}}),a("img"),e._v(" "),a("div",{staticClass:"left-content"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"undefine"!==t.number,expression:"item.number!=='undefine'"}]},[e._v(e._s(t.number))]),e._v(" "),a("h3",[e._v(e._s(t.label))])])])])}))]),e._v(" "),a("div",{staticClass:"organization-wrap-tabs"},[5===e.actionIndex?a("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[a("Form",{ref:"formItem",attrs:{model:e.formItem,labelWidth:100}},[a("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"组织名称:"}},[a("Input",{model:{value:e.formItem.groupName,callback:function(t){e.$set(e.formItem,"groupName",t)},expression:"formItem.groupName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"组织状态",labelWidth:100}},[a("Select",{model:{value:e.formItem.status,callback:function(t){e.$set(e.formItem,"status",t)},expression:"formItem.status"}},e._l(e.statusRadio,function(t,o){return a("Option",{key:o,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"组织类型",labelWidth:100}},[a("RadioGroup",{model:{value:e.formItem.groupType,callback:function(t){e.$set(e.formItem,"groupType",t)},expression:"formItem.groupType"}},[a("Radio",{attrs:{label:"M"}},[e._v("管理层")]),e._v(" "),a("Radio",{attrs:{label:"A"}},[e._v("事业部")]),e._v(" "),a("Radio",{attrs:{label:"O"}},[e._v("部门")]),e._v(" "),a("Radio",{attrs:{label:"G"}},[e._v("小组")])],1)],1),e._v(" "),"O"===e.formItem.groupType?a("FormItem",{attrs:{label:"部门职能类型",labelWidth:100}},[a("RadioGroup",{model:{value:e.formItem.depFunction,callback:function(t){e.$set(e.formItem,"depFunction",t)},expression:"formItem.depFunction"}},[a("Radio",{attrs:{label:"M"}},[e._v("管理")]),e._v(" "),a("Radio",{attrs:{label:"S"}},[e._v("销售")]),e._v(" "),a("Radio",{attrs:{label:"C"}},[e._v("制造")]),e._v(" "),a("Radio",{attrs:{label:"R"}},[e._v("研发")])],1)],1):e._e(),e._v(" "),a("FormItem",{attrs:{label:"组织说明",labelWidth:100}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.formItem.comment,callback:function(t){e.$set(e.formItem,"comment",t)},expression:"formItem.comment"}})],1)],1),e._v(" "),a("div",{staticClass:"baseinfo-container-action"},[a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"取消"},on:{click:e.cancle}}),e._v(" "),a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存"},on:{click:e.save}}),e._v(" "),e.groupId?e._e():a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存并添加"},on:{click:e.saveAndAdd}})])],1):e._e(),e._v(" "),4===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("high-organization",{attrs:{groupId:e.groupId,groupType:e.formItem.groupType},on:{"on-high-organization-change":e.handleChangeObjDetailsCount}})],1):e._e(),e._v(" "),3===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("lower-organization",{attrs:{groupId:e.groupId,groupType:e.formItem.groupType},on:{"on-lower-organization-change":e.handleChangeObjDetailsCount}})],1):e._e(),e._v(" "),2===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("principal",{attrs:{groupId:e.groupId}})],1):e._e(),e._v(" "),1===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("member-info",{attrs:{groupId:e.groupId},on:{"on-member-info-change":e.handleChangeObjDetailsCount}})],1):e._e(),e._v(" "),0===e.actionIndex?a("section",{staticClass:"permission-container rfd-tab-container-common"},[a("permission",{attrs:{groupId:e.groupId},on:{"on-permission-change":e.handleChangeObjDetailsCount}})],1):e._e()])])},staticRenderFns:[]};var M=a("VU/8")(C,_,!1,function(e){a("PZCm")},null,null);t.default=M.exports},eFN1:function(e,t){},pX3c:function(e,t,a){"use strict";var o=a("o32f"),n={name:"CustomTable",props:{columns:{type:Array},apiUrl:{type:String},apiParams:{type:Object},value:{type:Boolean,default:!1}},data:function(){return{pageTotal:0,currentPage:1,pageSize:8,loading:!1,columnsData:[]}},watch:{value:function(e){e&&this.getTableData(this.apiParams)}},methods:{changeCurrentPage:function(e){var t=this.apiParams;t.page=e,this.getTableData(t)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},onPageSizeChange:function(e){var t=this.apiParams;t.limit=e,this.getTableData(t)},getTableData:function(e){var t=this;this.loading=!0,Object(o.P)(this.apiUrl,e).then(function(e){e.tableContent[0]&&(t.pageTotal=e.summary.total,t.columnsData=e.tableContent,t.value&&t.$emit("on-refesh-change",!1)),t.loading=!1})}},mounted:function(){this.getTableData(this.apiParams)}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rfd-cs"},[a("header",{staticClass:"rfd-cs-header"},[e._t("header")],2),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.columnsData},on:{"on-selection-change":e.onSelectionChange}})],1),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changeCurrentPage,"on-page-size-change":e.onPageSizeChange}})],1)]),e._v(" "),a("footer",{staticClass:"rfd-cs-footer"},[e._t("footer")],2)])},staticRenderFns:[]};var i=a("VU/8")(n,r,!1,function(e){a("PrwJ")},null,null);t.a=i.exports},parf:function(e,t){}});
//# sourceMappingURL=2.21ff19603e71c18b904b.js.map