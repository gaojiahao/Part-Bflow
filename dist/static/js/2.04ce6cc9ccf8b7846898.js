webpackJsonp([2],{"2zKa":function(e,t){},"4/sj":function(e,t){},PG1l:function(e,t){},Sxbw:function(e,t){},ZGYE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("mvHQ"),n=a.n(o),s=a("o32f"),r=a("lZCD"),i={name:"CustomTable",props:{columns:{type:Array},apiUrl:{type:String},apiParams:{type:Object},value:{type:Boolean,default:!1}},data:function(){return{pageTotal:0,currentPage:1,pageSize:8,loading:!1,columnsData:[]}},watch:{value:function(e){e&&this.getTableData(this.apiParams)}},methods:{changeCurrentPage:function(e){var t=this.apiParams;t.page=e,this.getTableData(t)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},onPageSizeChange:function(e){var t=this.apiParams;t.limit=e,this.getTableData(t)},getTableData:function(e){var t=this;this.loading=!0,Object(s.A)(this.apiUrl,e).then(function(e){e.tableContent[0]&&(t.pageTotal=e.summary.total,t.columnsData=e.tableContent,t.$emit("on-refesh-change",!1)),t.loading=!1})}},mounted:function(){this.getTableData(this.apiParams)}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rfd-cs"},[a("header",{staticClass:"rfd-cs-header"},[e._t("header")],2),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.columnsData},on:{"on-selection-change":e.onSelectionChange}})],1),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changeCurrentPage,"on-page-size-change":e.onPageSizeChange}})],1)]),e._v(" "),a("footer",{staticClass:"rfd-cs-footer"},[e._t("footer")],2)])},staticRenderFns:[]};var c=a("VU/8")(i,l,!1,function(e){a("4/sj")},null,null).exports,u={name:"higher-organization",components:{CustomTable:c,MemberModal:r.a},props:{groupId:{type:String},groupType:{type:String}},data:function(){return{highOrganizationParams:{groupId:this.groupId,page:1,limit:8},highOrgColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType"},{title:"部门职能类型",key:"depFunction"},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],highOrgColumnsModal:[{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType"},{title:"部门职能类型",key:"depFunction"},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,reload:!1,onSelectionModal:[]}},methods:{listUserChangePage:function(e){this.getAllGroup(e,this.pageSize)},onSelectUserList:function(e,t){this.onSelectionModal=e},showMemberModal:function(){this.isShowMemberModal=!0,this.getListUsers(this.listUserCurrentPage,this.pageSize)},onRefeshChange:function(e){e||(this.reload=e)},showHighOrgModal:function(){this.isShowMemberModal=!0,this.getAllGroup()},saveSelectionHighOrg:function(){var e,t=this;e=this.onSelectionModal.groupId,Object(s.F)(e,this.groupId).then(function(e){e.success&&(t.$Message.success("保存成功"),t.isShowMemberModal=!1,t.reload=!0)})},getAllGroup:function(){var e=this;this.listUserLoading=!0;var t=[];if(this.groupType){switch(this.groupType){case"小组":t.push({operator:"ne",value:"岗位",property:"groupType"}),t.push({operator:"ne",value:"小组",property:"groupType"});break;case"部门":t.push({operator:"ne",value:"岗位",property:"groupType"}),t.push({operator:"ne",value:"小组",property:"groupType"}),t.push({operator:"ne",value:"部门",property:"groupType"});break;case"事业部":t.push({operator:"ne",value:"岗位",property:"groupType"}),t.push({operator:"ne",value:"小组",property:"groupType"}),t.push({operator:"ne",value:"部门",property:"groupType"}),t.push({operator:"ne",value:"事业部",property:"groupType"})}t=n()(t)}Object(s.k)(this.listUserCurrentPage,this.pageSize,t).then(function(t){t.tableContent[0]&&(e.listUserPageTotal=t.summary.total,e.listUserData=t.tableContent,e.listUserLoading=!1)})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getParentGroupByGroupId",columns:e.highOrgColumns,apiParams:e.highOrganizationParams},on:{"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("Button",{attrs:{icon:"md-add",type:"primary"},on:{click:e.showHighOrgModal}},[e._v("添加上级组织")])],1)]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionHighOrg},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",[a("Table",{ref:"currentRowTable",attrs:{loading:e.listUserLoading,columns:e.highOrgColumnsModal,data:e.listUserData,size:"small","highlight-row":""},on:{"on-current-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var d=a("VU/8")(u,p,!1,function(e){a("2zKa")},null,null).exports,m={name:"lower-organization",components:{CustomTable:c,MemberModal:r.a},props:{groupId:{type:String},groupType:{type:String}},data:function(){return{lowOrganizationParams:{filter:n()([{operator:"eq",value:this.groupId,property:"parentId"}]),page:1,limit:8},lowerOrgColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"组织名称",key:"groupName"},{title:"组织类型",key:"groupType"},{title:"部门职能类型",key:"depFunction"},{title:"组织状态",key:"status",render:function(e,t){var a=t.row.status,o="";switch(a){case 0:o="停用";break;case 1:o="使用中";break;case 2:o="未使用";break;case 3:o="草稿"}return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},o)}},{title:"组织说明",key:"comment"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,deleteBtnDisable:!0,reload:!1,onSelectionModal:[],selectDeleteLowerOrg:[]}},methods:{listUserChangePage:function(e){this.getAllGroup(e,this.pageSize)},onSelectLowerUser:function(e){this.onSelectionModal=e},onSelectionChange:function(e){e.length>0?(this.deleteBtnDisable=!1,this.selectDeleteLowerOrg=e):this.deleteBtnDisable=!0},onRefeshChange:function(e){e||(this.reload=e)},showLoverOrgModal:function(){this.isShowMemberModal=!0,this.getAllGroup()},saveSelectionLowerOrg:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.groupId)}),Object(s.D)(this.groupId,t.join(",")).then(function(t){t.success&&(e.$Message.success("保存成功"),e.isShowMemberModal=!1,e.reload=!0)})},deleteLoverOrg:function(){var e=this,t=[];this.selectDeleteLowerOrg.forEach(function(e){t.push(e.groupId)}),t&&Object(s.g)(t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0)})},getAllGroup:function(){var e=this;this.listUserLoading=!0;var t=[];if(this.groupType){switch(this.groupType){case"小组":t.push({operator:"ne",value:"小组",property:"groupType"}),t.push({operator:"ne",value:"部门",property:"groupType"}),t.push({operator:"ne",value:"事业部",property:"groupType"}),t.push({operator:"ne",value:"管理层",property:"groupType"});break;case"部门":t.push({operator:"ne",value:"部门",property:"groupType"}),t.push({operator:"ne",value:"事业部",property:"groupType"}),t.push({operator:"ne",value:"管理层",property:"groupType"});break;case"事业部":t.push({operator:"ne",value:"事业部",property:"groupType"}),t.push({operator:"ne",value:"管理层",property:"groupType"})}t=n()(t)}Object(s.k)(this.listUserCurrentPage,this.pageSize,t).then(function(t){t.tableContent[0]&&(e.listUserPageTotal=t.summary.total,e.listUserData=t.tableContent),e.listUserLoading=!1})}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getAllGroup",columns:e.lowerOrgColumns,apiParams:e.lowOrganizationParams},on:{"on-refesh-change":e.onRefeshChange,"on-selection-change":e.onSelectionChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("Button",{attrs:{icon:"md-add",type:"primary"},on:{click:e.showLoverOrgModal}},[e._v("添加下级组织")]),e._v(" "),a("Button",{attrs:{icon:"md-remove",type:"info",disabled:e.deleteBtnDisable},on:{click:e.deleteLoverOrg}},[e._v("移除下级组织")])],1)]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionLowerOrg},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",[a("Table",{ref:"selection",attrs:{loading:e.listUserLoading,columns:e.lowerOrgColumns,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectLowerUser}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var g=a("VU/8")(m,h,!1,function(e){a("ioS9")},null,null).exports,f={name:"member-info",components:{MemberModal:r.a,CustomTable:c},props:{groupId:{type:String}},data:function(){return{memberInfoLoading:!1,memberInfoParams:{groupId:this.groupId,page:1,limit:8},memberInfoColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",key:"gender",width:60,render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"状态",width:60,key:"status",render:function(e,t){var a=t.row.status;return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},a?"在职":"离职")}},{title:"创建者",key:"creator",width:100},{title:"创建时间",key:"crtTime"},{title:"修改时间",key:"changeTime"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,onSelectionModal:[],selectDeleteMemberInfo:[],deleteBtnDisable:!0,reload:!1}},methods:{onSelectionChange:function(e){e.length>0?(this.deleteBtnDisable=!1,this.selectDeleteMemberInfo=e):this.deleteBtnDisable=!0},onRefeshChange:function(e){e||(this.reload=e)},onSelectUserList:function(e){this.onSelectionModal=e},saveSelectionUser:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.userId)}),t&&Object(s.c)(this.groupId,t.join(","),1).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowMemberModal=!1)})},deleteMemberInfo:function(){var e=this,t=[];this.selectDeleteMemberInfo.forEach(function(e){t.push(e.userId)}),t&&Object(s.i)(this.groupId,t.join(","),0).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0)})},getListUsers:function(e,t){var a=this;this.listUserLoading=!0,Object(s.C)(e,t).then(function(e){e.tableContent[0]&&(a.listUserPageTotal=e.summary.total,a.listUserData=e.tableContent,a.listUserLoading=!1)})},listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},showMemberModal:function(){this.isShowMemberModal=!0,this.getListUsers(this.listUserCurrentPage,this.pageSize)},exportData:function(){this.$refs.table.exportCsv({filename:"成员信息"})}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getUsersByGroupId",columns:e.memberInfoColumns,apiParams:e.memberInfoParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("Button",{attrs:{icon:"md-add",type:"primary"},on:{click:e.showMemberModal}},[e._v("添加成员")]),e._v(" "),a("Button",{attrs:{icon:"md-remove",type:"info",disabled:e.deleteBtnDisable},on:{click:e.deleteMemberInfo}},[e._v("移除成员")]),e._v(" "),a("Button",{staticClass:"permission-container-btn-export",attrs:{icon:"ios-download-outline",type:"primary"},on:{click:e.exportData}},[e._v("导出")])],1)]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionUser},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",[a("Table",{ref:"selection",attrs:{loading:e.listUserLoading,columns:e.memberInfoColumns,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var b=a("VU/8")(f,v,!1,function(e){a("cs5E")},"data-v-a0129650",null).exports,y={name:"principal",components:{CustomTable:c},props:{groupId:{type:String}},data:function(){return{principalParams:{groupId:this.groupId,page:1,limit:8},principallumns:[{title:"名称",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"联系电话",key:"phone"}]}}},w={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("custom-table",{attrs:{apiUrl:"/ds/getPrincipalByGroupId",columns:this.principallumns,apiParams:this.principalParams}})],1)},staticRenderFns:[]};var _=a("VU/8")(y,w,!1,function(e){a("PG1l")},null,null).exports,C={name:"principal",components:{CustomTable:c,MemberModal:r.a},props:{groupId:{type:String}},data:function(){return{permissionParams:{objectName:"group",objectId:this.groupId,page:1,limit:8,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"id",key:"id",hidden:!0},{title:"名称",key:"name"}],deleteBtnDisable:!0,isShowModal:!1,allPermissionData:[],selectPermissionNode:[],selectDeletePermission:[],reload:!1}},methods:{listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0,this.getAllPermissionData()},deletePermission:function(){var e=this,t=[];this.selectDeletePermission.forEach(function(e){t.push(e.id)}),t&&Object(s.j)(this.groupId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowModal=!1,e.deleteBtnDisable=!0)})},onSelectionChange:function(e){e.length>0?(this.deleteBtnDisable=!1,this.selectDeletePermission=e):this.deleteBtnDisable=!0},onRefeshChange:function(e){e||(this.reload=e)},onCheckChange:function(e){this.selectPermissionNode=e},savePermission:function(){var e=this,t=[];this.selectPermissionNode.forEach(function(e){t.push(e.id)}),t&&Object(s.d)(this.groupId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowModal=!1)})},getAllPermissionData:function(){var e=this;0===this.allPermissionData.length&&Object(s.l)(0).then(function(t){t.tableContent.forEach(function(t){e.allPermissionData.push({title:t.name,id:t.id,loading:!1,children:[]})})})},loadData:function(e,t){Object(s.l)(e.id).then(function(e){var a=[];e.tableContent.forEach(function(e){"false"===e.leaf?a.push({title:e.name,id:e.id,loading:!1,children:[]}):a.push({title:e.name,id:e.id})}),t(a)})}}},I={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:e.permissionColumns,apiParams:e.permissionParams,reload:e.reload},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange}},[a("div",{staticClass:"permission-container-btn",attrs:{slot:"header"},slot:"header"},[a("Button",{attrs:{icon:"md-add",type:"primary"},on:{click:e.addPermission}},[e._v("添加权限")]),e._v(" "),a("Button",{attrs:{icon:"md-remove",type:"info",disabled:e.deleteBtnDisable},on:{click:e.deletePermission}},[e._v("移除权限")])],1)]),e._v(" "),a("member-modal",{attrs:{width:"600",footerBtnAlign:"right",title:"权限列表"},on:{"on-ok":e.savePermission},model:{value:e.isShowModal,callback:function(t){e.isShowModal=t},expression:"isShowModal"}},[a("div",{staticStyle:{"max-height":"350px",overflow:"auto"}},[a("Tree",{attrs:{data:e.allPermissionData,multiple:!1,"load-data":e.loadData,"show-checkbox":""},on:{"on-check-change":e.onCheckChange}})],1)])],1)},staticRenderFns:[]};var S=a("VU/8")(C,I,!1,function(e){a("dbr7")},null,null).exports,M={name:"organization",components:{MemberModal:r.a,HighOrganization:d,LowerOrganization:g,MemberInfo:b,Principal:_,Permission:S},data:function(){return{formItem:{groupName:"",groupType:"",depFunction:"",comment:"",status:""},statusRadio:[{name:"停用",value:0},{name:"使用中",value:1},{name:"未使用",value:2},{name:"草稿",value:3}],actionBtn:[{label:"权限",imgPath:"../../../resources/images/icon/0_0.png",number:0},{label:"成员信息",imgPath:"../../../resources/images/icon/0_1.png",number:0},{label:"负责人",imgPath:"../../../resources/images/icon/0_2.png",number:0},{label:"下级组织",imgPath:"../../../resources/images/icon/0_3.png",number:0},{label:"上级组织",imgPath:"../../../resources/images/icon/0_4.png",number:0},{label:"基本信息",imgPath:"../../../resources/images/icon/0_5.png",number:0}],actionIndex:5,groupId:this.$route.params.groupId}},methods:{handlerViewChange:function(e){this.actionIndex=e}},mounted:function(){var e=this,t=document.body.clientHeight-95;window.document.getElementsByClassName("organization-wrap-tabs")[0].style.height=t+"px",window.document.getElementsByClassName("organization-wrap-tabs")[0].style.maxHeight=t+"px";var a=n()([{operator:"eq",value:this.groupId,property:"groupId"}]);Object(s.x)(a).then(function(t){if(t.tableContent[0]){var a=t.tableContent[0];e.formItem.groupName=a.groupName,e.formItem.groupType=a.groupType,e.formItem.depFunction=a.depFunction,e.formItem.status=a.status,e.formItem.comment=a.comment}})}},P={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"organization-wrap"},[e._m(0),e._v(" "),a("div",{staticClass:"organization-wrap-action"},[a("ul",e._l(e.actionBtn,function(t,o){return a("li",{key:o,staticClass:"organization-wrap-action-li",class:o===e.actionIndex?"organization-wrap-action-li-active":"",on:{click:function(t){e.handlerViewChange(o)}}},[a("img",{attrs:{src:t.imgPath,height:"30px",width:"30px"}}),a("img"),e._v(" "),a("div",[a("span",[e._v(e._s(t.number))]),e._v(" "),a("h3",[e._v(e._s(t.label))])])])}))]),e._v(" "),a("div",{staticClass:"organization-wrap-tabs"},[5===e.actionIndex?a("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[a("Form",{attrs:{model:e.formItem,labelWidth:100}},[a("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"组织名称:"}},[a("Input",{model:{value:e.formItem.groupName,callback:function(t){e.$set(e.formItem,"groupName",t)},expression:"formItem.groupName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"组织状态",labelWidth:100}},[a("Select",{model:{value:e.formItem.status,callback:function(t){e.$set(e.formItem,"status",t)},expression:"formItem.status"}},e._l(e.statusRadio,function(t,o){return a("Option",{key:o,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"组织类型",labelWidth:100}},[a("RadioGroup",{model:{value:e.formItem.groupType,callback:function(t){e.$set(e.formItem,"groupType",t)},expression:"formItem.groupType"}},[a("Radio",{attrs:{label:"管理层"}},[e._v("管理层")]),e._v(" "),a("Radio",{attrs:{label:"事业部"}},[e._v("事业部")]),e._v(" "),a("Radio",{attrs:{label:"部门"}},[e._v("部门")]),e._v(" "),a("Radio",{attrs:{label:"小组"}},[e._v("小组")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"部门职能类型",labelWidth:100}},[a("RadioGroup",{model:{value:e.formItem.depFunction,callback:function(t){e.$set(e.formItem,"depFunction",t)},expression:"formItem.depFunction"}},[a("Radio",{attrs:{label:"管理"}},[e._v("管理")]),e._v(" "),a("Radio",{attrs:{label:"销售"}},[e._v("销售")]),e._v(" "),a("Radio",{attrs:{label:"制造"}},[e._v("制造")]),e._v(" "),a("Radio",{attrs:{label:"研发"}},[e._v("研发")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"组织说明",labelWidth:100}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.formItem.comment,callback:function(t){e.$set(e.formItem,"comment",t)},expression:"formItem.comment"}})],1)],1),e._v(" "),a("div",{staticClass:"baseinfo-container-action"},[a("Button",{attrs:{type:"success"}},[e._v("编辑")]),e._v(" "),a("Button",{attrs:{type:"success"}},[e._v("删除")]),e._v(" "),a("Button",{attrs:{type:"success"}},[e._v("保存")])],1)],1):e._e(),e._v(" "),4===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("high-organization",{attrs:{groupId:e.groupId,groupType:e.formItem.groupType}})],1):e._e(),e._v(" "),3===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("lower-organization",{attrs:{groupId:e.groupId,groupType:e.formItem.groupType}})],1):e._e(),e._v(" "),2===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("principal",{attrs:{groupId:e.groupId}})],1):e._e(),e._v(" "),1===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("member-info",{attrs:{groupId:e.groupId}})],1):e._e(),e._v(" "),0===e.actionIndex?a("section",{staticClass:"permission-container rfd-tab-container-common"},[a("permission",{attrs:{groupId:e.groupId}})],1):e._e()])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("header",{staticClass:"organization-wrap-header"},[t("h2",[t("span",[this._v("管理员")]),this._v(" "),t("span",[this._v("/岗位/")]),this._v(" "),t("span",[this._v("001")])])])}]};var k=a("VU/8")(M,P,!1,function(e){a("Sxbw")},null,null);t.default=k.exports},cs5E:function(e,t){},dbr7:function(e,t){},ioS9:function(e,t){}});
//# sourceMappingURL=2.04ce6cc9ccf8b7846898.js.map