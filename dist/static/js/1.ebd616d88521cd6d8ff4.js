webpackJsonp([1],{PrwJ:function(e,t){},QAw9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),i=a("o32f"),o=a("lZCD"),r=a("pX3c"),l={name:"job-member-info",components:{MemberModal:o.a,CustomTable:r.a},props:{jobId:{type:String}},data:function(){return{memberInfoLoading:!1,memberInfoParams:{roleId:this.jobId,page:1,limit:8},memberInfoColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",key:"gender",width:60,render:function(e,t){var a=t.row.gender;return e("span",1===a?"男":0===a?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"状态",width:60,key:"status",render:function(e,t){var a=t.row.status;return e("span",{style:{color:a?"#0279f6":"#f03707",cursor:"default"}},a?"在职":"离职")}},{title:"创建者",key:"creator",width:100},{title:"创建时间",key:"crtTime"},{title:"修改时间",key:"changeTime"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:8,onSelectionModal:[],selectDeleteMemberInfo:[],reload:!1}},methods:{onSelectionChange:function(e){e.length>0&&(this.selectDeleteMemberInfo=e)},onRefeshChange:function(e){e||(this.reload=e)},onSelectUserList:function(e){this.onSelectionModal=e},saveSelectionUser:function(){var e=this,t=[];this.onSelectionModal.forEach(function(e){t.push(e.userId)}),t&&Object(i.P)(this.jobId,t.join(","),1).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.isShowMemberModal=!1,e.$emit("on-member-info-change",!0))})},deleteMemberInfo:function(){var e=this,t=[];this.selectDeleteMemberInfo.forEach(function(e){t.push(e.userId)}),t&&Object(i.k)(this.jobId,t.join(","),0).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-member-info-change",!0))})},getListUsers:function(e,t){var a=this;this.listUserLoading=!0,Object(i.N)(e,t).then(function(e){e.tableContent[0]&&(a.listUserPageTotal=e.summary.total,a.listUserData=e.tableContent,a.listUserLoading=!1)})},listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},showMemberModal:function(){this.isShowMemberModal=!0,this.getListUsers(this.listUserCurrentPage,this.pageSize)},exportData:function(){this.$refs.table.exportCsv({filename:"成员信息"})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getRoleUser2Oneself",columns:e.memberInfoColumns,apiParams:e.memberInfoParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.showMemberModal}},[e._v("添加成员")]),e._v(" "),a("span",[e._v("-添加成员")]),e._v(" "),a("label",{on:{click:e.deleteMemberInfo}},[e._v("移除成员")]),e._v(" "),a("span",[e._v("-移除成员")]),e._v(" "),a("label",{staticClass:"permission-container-btn-export",on:{click:e.exportData}},[e._v("导出")])])]),e._v(" "),a("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":e.saveSelectionUser},model:{value:e.isShowMemberModal,callback:function(t){e.isShowMemberModal=t},expression:"isShowMemberModal"}},[a("div",[a("Table",{ref:"selection",attrs:{loading:e.listUserLoading,columns:e.memberInfoColumns,data:e.listUserData,size:"small"},on:{"on-selection-change":e.onSelectUserList}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.listUserPageTotal,current:e.listUserCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.listUserChangePage}})],1)])],1)])],1)},staticRenderFns:[]};var m=a("VU/8")(l,c,!1,function(e){a("bjir")},"data-v-247a9b72",null).exports,d={name:"job-permission",components:{CustomTable:r.a,MemberModal:o.a},props:{jobId:{type:String}},data:function(){return{permissionParams:{objectName:"role",objectId:this.jobId,page:1,limit:8,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"id",key:"id",hidden:!0},{title:"名称",key:"name"}],isShowModal:!1,allPermissionData:[],selectPermissionNode:[],selectDeletePermission:[],reload:!1}},methods:{listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0,this.getAllPermissionData()},onRefeshChange:function(e){e||(this.reload=e)},deletePermission:function(){var e=this,t=[];this.selectDeletePermission.forEach(function(e){t.push(e.id)}),t&&Object(i.p)(this.jobId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-permission-change",!0))})},onSelectionChange:function(e){e.length>0&&(this.selectDeletePermission=e)},onCheckChange:function(e){this.selectPermissionNode=e},savePermission:function(){var e=this,t=[];this.selectPermissionNode.forEach(function(e){t.push(e.id)}),t&&Object(i.h)(this.jobId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.reload=!0,e.$emit("on-permission-change",!0),e.isShowModal=!1)})},getAllPermissionData:function(){var e=this;0===this.allPermissionData.length&&Object(i.s)(0).then(function(t){t.tableContent.forEach(function(t){e.allPermissionData.push({title:t.name,id:t.id,loading:!1,children:[]})})})},loadData:function(e,t){Object(i.s)(e.id).then(function(e){var a=[];e.tableContent.forEach(function(e){"false"===e.leaf?a.push({title:e.name,id:e.id,loading:!1,children:[]}):a.push({title:e.name,id:e.id})}),t(a)})}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:e.permissionColumns,apiParams:e.permissionParams},on:{"on-selection-change":e.onSelectionChange,"on-refesh-change":e.onRefeshChange},model:{value:e.reload,callback:function(t){e.reload=t},expression:"reload"}},[a("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[a("label",{on:{click:e.addPermission}},[e._v("添加权限")]),e._v(" "),a("span",[e._v("-添加权限")]),e._v(" "),a("label",{on:{click:e.deletePermission}},[e._v("移除权限")]),e._v(" "),a("span",[e._v("-移除权限")])])]),e._v(" "),a("member-modal",{attrs:{width:"600",footerBtnAlign:"right",title:"权限列表"},on:{"on-ok":e.savePermission},model:{value:e.isShowModal,callback:function(t){e.isShowModal=t},expression:"isShowModal"}},[a("div",{staticStyle:{"max-height":"350px",overflow:"auto"}},[a("Tree",{attrs:{data:e.allPermissionData,multiple:!1,"load-data":e.loadData,"show-checkbox":""},on:{"on-check-change":e.onCheckChange}})],1)])],1)},staticRenderFns:[]};var u=a("VU/8")(d,h,!1,function(e){a("lCWN")},"data-v-0111ea7f",null).exports,f={name:"job",components:{MemberModal:o.a,MemberInfo:m,Permission:u},data:function(){return{formItem:{name:"",type:"",describe:"",status:""},statusRadio:[{name:"停用",value:0},{name:"使用中",value:1},{name:"未使用",value:2},{name:"草稿",value:3}],actionBtn:[{label:"权限",imgPath:"resources/images/icon/0_0.png",number:0,hidden:!1,id:"objectPermission"},{label:"成员信息",imgPath:"resources/images/icon/0_1.png",number:0,hidden:!1,id:"user"},{label:"基本信息",imgPath:"resources/images/icon/0_5.png",hidden:!1,id:"baseinfo"}],actionIndex:2,jobId:this.$route.params.jobId}},methods:{handlerViewChange:function(e){this.actionIndex=e},cancle:function(){this.$router.push({path:"/addressBook/job/board"})},saveAndAdd:function(){var e=this;this.jobId||saveBaseinfo(this.formItem).then(function(t){t.success&&(e.$Message.success("保存成功"),e.$refs.formItem.resetFields())})},saveBaseinfo:function(){var e=this;this.jobId||Object(i.S)(this.formItem).then(function(t){t.success&&e.$Message.success("保存成功")})},getObjDetailsCountByRoleId:function(e){var t=this;Object(i.H)(e).then(function(e){t.actionBtn.forEach(function(t){t.number=e[t.id]})})},handleChangeObjDetailsCount:function(e){e&&this.getObjDetailsCountByRoleId(this.jobId)}},mounted:function(){var e=document.body.clientHeight-95;window.document.getElementsByClassName("job-wrap-tabs")[0].style.height=e+"px";var t=s()([{operator:"eq",value:this.jobId,property:"id"}]),a=this;this.jobId?(Object(i.t)(t).then(function(e){if(e.tableContent[0]){var t=e.tableContent[0];a.formItem.name=t.name,a.formItem.type=t.type,a.formItem.status=t.status,a.formItem.describe=t.describe}}),this.getObjDetailsCountByRoleId(this.jobId)):this.jobId||"add"!=this.$route.name||this.actionBtn.forEach(function(e){"baseinfo"!==e.id&&(e.hidden=!0)})}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"job-wrap"},[a("header",{staticClass:"job-wrap-header"},[e.jobId?a("h2",[a("span",{staticStyle:{color:"#4CAF50"}},[e._v(e._s(e.formItem.name))]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v("/")]),e._v(" "),a("span",{staticStyle:{color:"#808080","margin-left":"10px"}},[e._v(e._s(e.jobId))]),e._v(" "),a("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.formItem.status,color:"#eb2f96"},expression:"{status:formItem.status,color:'#eb2f96'}"}],staticClass:"radius10 marlr10 color_fff"})],1):e._e(),e._v(" "),e.jobId?e._e():a("h2",[a("span",{staticStyle:{color:"#4CAF50"}},[e._v("添加职位")])])]),e._v(" "),a("div",{staticClass:"job-wrap-action"},[a("ul",e._l(e.actionBtn,function(t,n){return t.hidden?e._e():a("li",{key:n,staticClass:"job-wrap-action-li",class:n===e.actionIndex?"job-wrap-action-li-active":"",on:{click:function(t){e.handlerViewChange(n)}}},[a("div",{staticStyle:{padding:"5px 0"}},[a("img",{staticClass:"job-wrap-action-li-img",attrs:{src:t.imgPath}}),a("img"),e._v(" "),a("div",{staticClass:"left-content"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"undefine"!==t.number,expression:"item.number!=='undefine'"}]},[e._v(e._s(t.number))]),e._v(" "),a("h3",[e._v(e._s(t.label))])])])])}))]),e._v(" "),a("div",{staticClass:"job-wrap-tabs"},[2===e.actionIndex?a("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[a("Form",{attrs:{model:e.formItem,labelWidth:100}},[a("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"职位名称:"}},[a("Input",{model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),a("FormItem",{attrs:{label:"职位状态",labelWidth:100}},[a("Select",{model:{value:e.formItem.status,callback:function(t){e.$set(e.formItem,"status",t)},expression:"formItem.status"}},e._l(e.statusRadio,function(t,n){return a("Option",{key:n,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"职位类型",labelWidth:100}},[a("RadioGroup",{model:{value:e.formItem.type,callback:function(t){e.$set(e.formItem,"type",t)},expression:"formItem.type"}},[a("Radio",{attrs:{label:"M"}},[e._v("管理类")]),e._v(" "),a("Radio",{attrs:{label:"Y"}},[e._v("营销类")]),e._v(" "),a("Radio",{attrs:{label:"J"}},[e._v("技术类")]),e._v(" "),a("Radio",{attrs:{label:"Z"}},[e._v("专业类")]),e._v(" "),a("Radio",{attrs:{label:"C"}},[e._v("操作类")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"职位说明",labelWidth:100}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.formItem.describe,callback:function(t){e.$set(e.formItem,"describe",t)},expression:"formItem.describe"}})],1)],1),e._v(" "),a("div",{staticClass:"baseinfo-container-action"},[a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"取消"},on:{click:e.cancle}}),e._v(" "),a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存"},on:{click:e.saveBaseinfo}}),e._v(" "),e.jobId?e._e():a("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存并添加"},on:{click:e.saveAndAdd}})])],1):e._e(),e._v(" "),1===e.actionIndex?a("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[a("member-info",{attrs:{jobId:e.jobId},on:{"on-member-info-change":e.handleChangeObjDetailsCount}})],1):e._e(),e._v(" "),0===e.actionIndex?a("section",{staticClass:"permission-container rfd-tab-container-common"},[a("permission",{attrs:{jobId:e.jobId},on:{"on-permission-change":e.handleChangeObjDetailsCount}})],1):e._e()])])},staticRenderFns:[]};var g=a("VU/8")(f,b,!1,function(e){a("i1mh")},null,null);t.default=g.exports},bjir:function(e,t){},i1mh:function(e,t){},lCWN:function(e,t){},pX3c:function(e,t,a){"use strict";var n=a("o32f"),s={name:"CustomTable",props:{columns:{type:Array},apiUrl:{type:String},apiParams:{type:Object},value:{type:Boolean,default:!1}},data:function(){return{pageTotal:0,currentPage:1,pageSize:8,loading:!1,columnsData:[]}},watch:{value:function(e){e&&this.getTableData(this.apiParams)}},methods:{changeCurrentPage:function(e){var t=this.apiParams;t.page=e,this.getTableData(t)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},onPageSizeChange:function(e){var t=this.apiParams;t.limit=e,this.getTableData(t)},getTableData:function(e){var t=this;this.loading=!0,Object(n.L)(this.apiUrl,e).then(function(e){e.tableContent[0]&&(t.pageTotal=e.summary.total,t.columnsData=e.tableContent,t.value&&t.$emit("on-refesh-change",!1)),t.loading=!1})}},mounted:function(){this.getTableData(this.apiParams)}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rfd-cs"},[a("header",{staticClass:"rfd-cs-header"},[e._t("header")],2),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.columnsData},on:{"on-selection-change":e.onSelectionChange}})],1),e._v(" "),a("div",{staticClass:"rfd-cs-table"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changeCurrentPage,"on-page-size-change":e.onPageSizeChange}})],1)]),e._v(" "),a("footer",{staticClass:"rfd-cs-footer"},[e._t("footer")],2)])},staticRenderFns:[]};var o=a("VU/8")(s,i,!1,function(e){a("PrwJ")},null,null);t.a=o.exports}});
//# sourceMappingURL=1.ebd616d88521cd6d8ff4.js.map