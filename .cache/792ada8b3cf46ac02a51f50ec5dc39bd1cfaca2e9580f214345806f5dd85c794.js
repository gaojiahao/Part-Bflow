{"source":"webpackJsonp([28],{\"5Edp\":function(t,a){t.exports={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i(\"div\",{staticClass:\"app-card\"},[i(\"header\",{staticClass:\"app-header\"},[i(\"Breadcrumb\",[i(\"BreadcrumbItem\",[a._v(\"首页\")]),a._v(\" \"),i(\"BreadcrumbItem\",[a._v(\"应用列表\")]),a._v(\" \"),i(\"BreadcrumbItem\",[a._v(a._s(a.appData.title))])],1)],1),a._v(\" \"),i(\"Row\",{staticClass:\"font14\"},[i(\"Col\",{staticClass:\"pad15\",attrs:{span:\"2\"}},[i(\"img\",{staticClass:\"appIcon\",attrs:{src:a.appData.icon}})]),a._v(\" \"),i(\"Col\",{staticClass:\"pad15\",attrs:{span:\"21\"}},[i(\"h3\",[i(\"span\",{staticClass:\"app-detail-title\",on:{click:a.goList}},[a._v(a._s(a.appData.title?a.appData.title:\"待加载\")+\"\\n          \")]),a._v(\"  - 应用详情\\n        \")]),a._v(\" \"),i(\"Row\",{staticClass:\"pad5\"},[i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"应用名称： \\n            \"),a.showAppEditAdmin?i(\"span\",[a._v(a._s(a.appData.title))]):i(\"Input\",{staticStyle:{width:\"120px\"},model:{value:a.appData.title,callback:function(t){a.$set(a.appData,\"title\",t)},expression:\"appData.title\"}}),a._v(\" \"),a.isCompanyAdmin?i(\"b\",{on:{click:a.editAppinfo}},[a.showEditBtn?i(\"Tooltip\",{attrs:{content:\"编辑\",placement:\"top\"}},[i(\"Icon\",{staticClass:\"app-edit-icon\",attrs:{type:\"ios-create-outline\"}})],1):i(\"Tooltip\",{attrs:{content:\"保存\",placement:\"top\"}},[i(\"b\",{staticClass:\"app-save-icon\"},[a._v(\"保存\")])])],1):a._e()],1),a._v(\" \"),i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"应用类型： \"),i(\"span\",[a._v(a._s(a.appData.TRANS_NAME))])]),a._v(\" \"),i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"应用管理员： \\n            \"),a.showAppEditAdmin?i(\"span\",[i(\"Icon\",{attrs:{type:\"person\"}}),a._v(a._s(a.appData.administrator)+\"\\n            \")],1):i(\"Input\",{staticStyle:{width:\"100px\"},attrs:{icon:\"md-arrow-dropdown\"},on:{\"on-click\":a.selectAdminModal,\"on-change\":a.clearAdmintrstor},model:{value:a.appData.administrator,callback:function(t){a.$set(a.appData,\"administrator\",t)},expression:\"appData.administrator\"}})],1)],1),a._v(\" \"),i(\"Row\",{staticClass:\"pad5\"},[i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"创建者： \"),i(\"span\",[a._v(a._s(a.appData.creator))])]),a._v(\" \"),i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"创建时间： \"),i(\"span\",[a._v(a._s(a.appData.crtTime))])]),a._v(\" \"),i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"修改者：\"+a._s(a.appData.modifer))]),a._v(\" \"),i(\"Col\",{attrs:{span:\"6\"}},[a._v(\"修改时间： \"),i(\"span\",[a._v(a._s(a.appData.modTime))])])],1),a._v(\" \"),i(\"Row\",{staticClass:\"pad5\"},[i(\"Col\",{attrs:{span:\"24\"}},[a._v(\"说明：\"),a.showAppEditAdmin?i(\"span\",{domProps:{innerHTML:a._s(a.appData.comment)}}):a._e(),a._v(\" \"),i(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:!a.showAppEditAdmin,expression:\"!showAppEditAdmin\"}],ref:\"infoeditor\"})])],1)],1),a._v(\" \"),i(\"Col\",{attrs:{span:\"1\"}},[i(\"Dropdown\",{staticClass:\"app-dropdown\",on:{\"on-click\":a.changeAppStatus}},[i(\"a\",{attrs:{href:\"javascript:void(0)\"}},[a._v(\"\\n                  操作\\n                  \"),i(\"Icon\",{attrs:{type:\"ios-arrow-down\"}})],1),a._v(\" \"),a.isAdmin?i(\"DropdownMenu\",{attrs:{slot:\"list\"},slot:\"list\"},[i(\"DropdownItem\",{attrs:{name:\"enabled\"}},[a._v(\"启用\")]),a._v(\" \"),i(\"DropdownItem\",{attrs:{name:\"forbidden\"}},[a._v(\"停用\")])],1):a._e()],1)],1)],1),a._v(\" \"),i(\"Modal\",{attrs:{title:\"请选择管理员\",width:\"800\"},on:{\"on-ok\":a.confirmModal},model:{value:a.showAdminModal,callback:function(t){a.showAdminModal=t},expression:\"showAdminModal\"}},[i(\"div\",{staticClass:\"app-search\"},[i(\"Input\",{staticStyle:{width:\"300px\"},attrs:{search:!0,placeholder:\"搜索名称或工号\"},on:{\"on-search\":a.adminFilter},model:{value:a.searchValue,callback:function(t){a.searchValue=t},expression:\"searchValue\"}}),a._v(\" \"),i(\"p\",{staticClass:\"app-search-icon\",on:{click:a.adminFilter}},[i(\"Button\",{attrs:{type:\"primary\",size:\"small\"}},[a._v(\"查询\")])],1)],1),a._v(\" \"),i(\"Table\",{attrs:{\"highlight-row\":!0,loading:a.adminLoading,height:\"300\",stripe:\"\",columns:a.adminColumns,size:\"small\",data:a.adminData},on:{\"on-row-dblclick\":a.dbclickConfirmModal,\"on-row-click\":a.selectAdmin}}),a._v(\" \"),i(\"div\",{staticClass:\"user-page\"},[i(\"div\",{staticStyle:{float:\"right\"}},[i(\"Page\",{attrs:{total:a.total,current:a.currentPage,\"page-size\":a.pageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-change\":a.onPageChange}})],1)])],1)],1)},staticRenderFns:[]}},\"75EL\":function(t,a,i){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var o=i(\"GIAq\"),n=i(\"mvHQ\"),r=i.n(n),e=i(\"sYY+\"),s=i.n(e),p={name:\"appInfo\",components:{},props:{listId:String,appData:Object,isAdmin:Boolean,isCompanyAdmin:Boolean},data:function(){return{showEditAppInfo:!0,showAppEditAdmin:!0,showEditBtn:!0,adminLoading:!0,showAdminModal:!1,searchValue:\"\",total:0,currentPage:1,pageSize:10,adminColumns:[{title:\"头像\",key:\"photo\",width:80,render:function(t,a){return t(\"div\",[t(\"img\",{attrs:{src:a.row.photo?a.row.photo:\"/resources/images/icon/defaultUserPhoto.jpg\"},style:{borderRadius:\"50%\",height:\"32px\",width:\"32px\"}})])}},{title:\"工号\",key:\"userCode\"},{title:\"姓名\",key:\"nickname\"},{title:\"手机\",key:\"mobile\"},{title:\"邮箱\",key:\"email\"}],adminData:[],selectAdminData:{}}},methods:{goList:function(){\"000001\"===this.appData.uniqueId?window.top.location.href=\"/Site/index.html#page/users\":\"000002\"===this.appData.uniqueId?window.top.location.href=\"/Site/index.html#page/origanizations\":\"000003\"===this.appData.uniqueId?window.top.location.href=\"/Site/index.html#page/jobs\":\"000004\"===this.appData.uniqueId?window.top.location.href=\"/Site/index.html#page/companys\":window.top.location.href=\"/Site/index.html#list/\"+this.appData.uniqueId},clearAdmintrstor:function(){\"\"===this.appData.administrator&&(this.appData.userId=\"\")},childHasPublished:function(t){this.appData.publish=1},editAppinfo:function(){var a=this;if(this.isAdmin&&(this.showEditAppInfo=!this.showEditAppInfo,this.infoeditor.txt.html(this.appData.comment)),this.isCompanyAdmin&&(this.showAppEditAdmin=!1),!this.showEditBtn){var t={uniqueId:this.appData.uniqueId,title:this.appData.title,administrator:this.appData.userId,comment:this.$refs.infoeditor?this.infoeditor.txt.html():\"\"};Object(o._2)(t).then(function(t){t.success&&(a.$Message.success(\"更新成功!\"),a.showAppEditAdmin=!0,a.$emit(\"reloadData\"),a.$emit(\"changeAdmin\"))})}this.showEditBtn=!this.showEditBtn},selectAdminModal:function(){this.showAdminModal=!0,this.searchValue=\"\",this.getAdmintrstorData()},confirmModal:function(){this.appData.administrator=this.selectAdminData.nickname,this.appData.userId=this.selectAdminData.userId},dbclickConfirmModal:function(t){this.appData.administrator=t.nickname,this.appData.userId=t.userId,this.showAdminModal=!1},selectAdmin:function(t,a){this.selectAdminData=t},getAdmintrstorData:function(t){var a=this;this.adminLoading=!0,Object(o.r)(t,this.currentPage,this.pageSize).then(function(t){a.adminData=t.tableContent,a.total=t.dataCount,a.adminLoading=!1,a.infoeditor||a.createEditor()})},changeAppStatus:function(a){var i=this,t=this.listId,n=r()([{operator:\"eq\",value:\"操作\",property:\"type\"}]),e=[],s=[];Object(o.u)(t,n).then(function(t){t.tableContent.forEach(function(t){e.push(t.id),\"查看\"!=t.name&&s.push(t.id)}),\"enabled\"===a?Object(o.o)(e.join(\",\")).then(function(t){t.success&&(i.$Message.success(t.message),i.$emit(\"enabledForbiddenAppPermission\"))}):Object(o.o)(null,s.join(\",\")).then(function(t){t.success&&(i.$Message.success(t.message),i.$emit(\"enabledForbiddenAppPermission\"))})})},onPageChange:function(t){this.currentPage=t;var a=r()([{operator_1:\"like\",value_1:this.searchValue,property_1:\"nickname\",link:\"or\",operator_2:\"like\",value_2:this.searchValue,property_2:\"userCode\"}]);this.getAdmintrstorData(a)},adminFilter:function(){var t=r()([{operator_1:\"like\",value_1:this.searchValue,property_1:\"nickname\",link:\"or\",operator_2:\"like\",value_2:this.searchValue,property_2:\"userCode\"}]);this.getAdmintrstorData(t)},createEditor:function(){var a=this;this.infoeditor=new s.a(this.$refs.infoeditor),this.infoeditor.customConfig.onchange=function(t){a.appData.comment=t},this.infoeditor.customConfig.zIndex=100,this.infoeditor.customConfig.menus=[\"head\",\"bold\",\"fontSize\",\"fontName\",\"italic\",\"underline\",\"strikeThrough\",\"foreColor\",\"backColor\",\"link\",\"list\",\"justify\",\"quote\",\"emoticon\",\"code\",\"undo\",\"redo\"],this.infoeditor.create(),this.infoeditor.txt.html(\"<div></div>\")}},mounted:function(){this.listId;this.getAdmintrstorData()}},d=i(\"5Edp\"),l=i.n(d);var c=function(t){i(\"ZBrj\")},m={name:\"detail\",components:{AppInfo:i(\"VU/8\")(p,l.a,!1,c,\"data-v-0ab4545a\",null).exports},data:function(){return{listId:this.$route.params.listId,appData:{},enforData:[],isAdmin:!1,isCompanyAdmin:!1,isAddress:!1,appType:\"\",appTransType:\"\",enabledForbidden:-1}},methods:{enabledForbiddenAppPermission:function(){this.enabledForbidden++},changeAdmin:function(){this.getAppInfoDatas()},getAppInfoDatas:function(){var a=this,t=this.listId,i=this.$currentUser,n=[];Object(o.Q)(t).then(function(t){a.appData=t[0],a.appType=a.appData.type,a.appTransType=a.appData.transType,i.isSysRoleList.forEach(function(t){n.push(t.id)}),a.appData.administrator?i.nickname===a.appData.administrator&&-1<n.indexOf(1)?(a.isAdmin=!0,a.isCompanyAdmin=!0):i.nickname==a.appData.administrator?a.isAdmin=!0:-1<n.indexOf(1)?(a.isCompanyAdmin=!0,a.isAdmin=!1):(a.isAdmin=!1,a.isCompanyAdmin=!1):-1<n.indexOf(1)?(a.isAdmin=!0,a.isCompanyAdmin=!0):(a.isAdmin=!1,a.isCompanyAdmin=!1),\"hr\"===a.appData.type&&(a.isAddress=!0)})},reloadData:function(){this.getAppInfoDatas()}},created:function(){this.getAppInfoDatas()}},h=i(\"JGZV\"),u=i.n(h);var f=function(t){i(\"TIA3\")},v=i(\"VU/8\")(m,u.a,!1,f,\"data-v-026c96f6\",null);a.default=v.exports},JGZV:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i(\"div\",{staticClass:\"app-details\"},[i(\"app-info\",{attrs:{listId:this.$route.params.listId,enforData:t.enforData,isAdmin:t.isAdmin,isCompanyAdmin:t.isCompanyAdmin,appData:t.appData},on:{reloadData:t.reloadData,changeAdmin:t.changeAdmin,enabledForbiddenAppPermission:t.enabledForbiddenAppPermission}}),t._v(\" \"),i(\"Menu\",{attrs:{mode:\"horizontal\",theme:\"light\",\"active-name\":t.$route.name}},[i(\"router-link\",{attrs:{to:{name:\"change-log\"}}},[i(\"MenuItem\",{attrs:{name:\"change-log\"}},[t._v(\"\\n        更新日志\\n      \")])],1),t._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"analysis\"}}},[i(\"MenuItem\",{attrs:{name:\"analysis\"}},[t._v(\"\\n        数据分析\\n      \")])],1),t._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"interaction\"}}},[i(\"MenuItem\",{attrs:{name:\"interaction\"}},[t._v(\"\\n        互动评论\\n      \")])],1),t._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"permission\"}}},[i(\"MenuItem\",{attrs:{name:\"permission\"}},[t._v(\"\\n        资源授权\\n      \")])],1),t._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"connection\",params:{appTransType:t.appTransType}}}},[i(\"MenuItem\",{attrs:{name:\"connection\"}},[t._v(\"\\n        连接&API\\n      \")])],1)],1),t._v(\" \"),i(\"div\",{staticClass:\"detail-content\"},[i(\"router-view\",{attrs:{listId:this.$route.params.listId,isAdmin:t.isAdmin,isAddress:t.isAddress,appType:t.appType,appTransType:t.appTransType,isCompanyAdmin:t.isCompanyAdmin,enabledForbidden:t.enabledForbidden}})],1)],1)},staticRenderFns:[]}},TIA3:function(t,a){},ZBrj:function(t,a){}});"}