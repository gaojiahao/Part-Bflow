webpackJsonp([4],{GedB:function(e,t){},"O+au":function(e,t){},QAw9:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("mvHQ"),a=s.n(n),i=s("ifoU"),o=s.n(i),r=s("o32f"),l=s("lZCD"),c=s("Gu7T"),u=s.n(c),m=s("pX3c"),d={name:"job-member-info",components:{MemberModal:l.a,CustomTable:m.a},props:{jobId:{type:String},isPermission:{type:Boolean}},data:function(){var s=this;return{memberInfoLoading:!1,searchValue:"",searchTableValue:"",memberInfoParams:{roleId:this.jobId,page:1,limit:10},memberInfoColumns:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo?t.row.photo:"resources/images/icon/defaultUserPhoto.jpg"}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var s=t.row.gender;return e("span",1===s?"男":0===s?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"},{title:"操作",key:"action",width:120,align:"center",render:function(e,t){return e("Button",{props:{type:"error",size:"small",disabled:!s.isPermission},style:{cursor:"pointer"},on:{click:function(){s.$Modal.confirm({title:"确认",content:"确认删除该成员？",onOk:function(){Object(r.k)(s.jobId,t.row.userId).then(function(e){e.success&&(s.$Message.success("删除成功!"),s.reload=!0,s.$emit("on-member-info-change",!0))}).catch(function(e){s.$Message.error(e.data.message)})}})}}},"删除")}}],memberInfoColumnsModel:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo?t.row.photo:"resources/images/icon/defaultUserPhoto.jpg"}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){var s=t.row.gender;return e("span",1===s?"男":0===s?"女":"未知")}},{title:"手机号",key:"mobile"},{title:"邮箱",key:"email"}],isShowMemberModal:!1,listUserLoading:!1,listUserData:[],listUserPageTotal:0,listUserCurrentPage:1,pageSize:10,onPageSelection:[],selectDeleteMemberInfo:[],reload:!1}},methods:{onSelectionChange:function(e){0<e.length&&(this.selectDeleteMemberInfo=e)},onRefeshChange:function(e){e||(this.reload=e)},onSelectAll:function(e){var t,s={};(t=this.onPageSelection).push.apply(t,u()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!s[t.userId]&&(s[t.userId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,s=this.onPageSelection;t.map(function(t){s=s.filter(function(e){return e.userId!==t.userId})}),this.onPageSelection=s}else{var n,a={};(n=this.onPageSelection).push.apply(n,u()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.userId]&&(a[t.userId]=e.push(t)),e},[])}},deletePageSelection:function(e){var s=this,n=Number(e.target.parentElement.getAttribute("userId"));this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==n}),this.$refs.selection.data.forEach(function(e,t){n===e.userId&&s.$refs.selection.toggleSelect(t)})},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},saveSelectionUser:function(){var t=this,s=[];this.onPageSelection.forEach(function(e){s.push(e.userId)}),s&&Object(r._0)(this.jobId,s.join(","),1).then(function(e){e.success&&(t.$Message.success(e.message),t.reload=!0,t.isShowMemberModal=!1,t.$emit("on-member-info-change",!0))})},deleteMemberInfo:function(){var t=this,s=[];this.selectDeleteMemberInfo.forEach(function(e){s.push(e.userId)}),0<s.length?Object(r.k)(this.jobId,s.join(","),0).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.reload=!0,t.$emit("on-member-info-change",!0))}).catch(function(e){t.$Message.error(e.data.message)}):this.$Message.error("请选择要移除的成员")},getListUsers:function(e,t,s){var n=this;this.listUserLoading=!0,Object(r.A)(t,e,s).then(function(e){n.listUserPageTotal=e.dataCount,n.listUserData=e.tableContent,n.listUserLoading=!1,0<n.onPageSelection.length&&n.listUserData.map(function(t){n.onPageSelection.map(function(e){t.userId===e.userId&&(t._checked=!0)})})})},listUserChangePage:function(e){var t=a()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(e,this.pageSize,t)},onPageSizeChange:function(e){this.pageSize=e;var t=a()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(1,e,t)},showMemberModal:function(){this.isShowMemberModal=!0,this.searchValue="",this.onPageSelection=[],this.getListUsers(this.listUserCurrentPage,this.pageSize)},userFilter:function(){var e=a()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(this.listUserCurrentPage,this.pageSize,e)},userTableFilter:function(){var e=a()([{operator_1:"like",value_1:this.searchTableValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchTableValue,property_2:"userCode"}]);this.memberInfoParams.filter=e,this.reload=!0}}},h=s("QnuS"),f=s.n(h);var p=function(e){s("iJXx")},b=s("VU/8")(d,f.a,!1,p,"data-v-4130fc91",null).exports,g=s("3zRX"),v={name:"job-permission",components:{CustomTable:m.a,PermissionModal:g.a},props:{jobId:{type:String},isPermission:{type:Boolean}},data:function(){var s=this;return{permissionParams:{objectName:"role",objectId:this.jobId,page:1,limit:10,start:0},permissionColumns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"name"},{title:"操作",key:"action",width:120,align:"center",render:function(e,t){return e("Button",{props:{type:"error",size:"small",disabled:!s.isPermission},style:{cursor:"pointer"},on:{click:function(){s.$Modal.confirm({title:"确认",content:"确认删除该权限？",onOk:function(){Object(r.q)(s.jobId,t.row.id).then(function(e){e.success&&(s.$Message.success("删除成功!"),s.reload=!0,s.$emit("on-permission-change",!0))}).catch(function(e){s.$Message.error(e.data.message)})}})}}},"删除")}}],isShowModal:!1,selectDeletePermission:[],reload:!1,searchValue:"",target:{type:"role",targetId:this.jobId}}},methods:{permissionChange:function(){this.reload=!0,this.$emit("on-permission-change",!0)},changeModalStatus:function(){this.isShowModal=!1},listUserChangePage:function(e){this.getListUsers(e,this.pageSize)},addPermission:function(){this.isShowModal=!0},onRefeshChange:function(e){e||(this.reload=e)},deletePermission:function(){var t=this,s=[];this.selectDeletePermission.forEach(function(e){s.push(e.id)}),s&&Object(r.q)(this.jobId,s.join(",")).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.selectPermissionNode=[],t.reload=!0,t.$emit("on-permission-change",!0))}).catch(function(e){t.$Message.error(e.data.message)})},onSelectionChange:function(e){0<e.length&&(this.selectDeletePermission=e)},onCheckChange:function(e){this.selectPermissionNode=e},permissionFilter:function(){var e=a()([{operator:"like",value:this.searchValue,property:"name"}]);this.permissionParams.filter=e,this.reload=!0}}},I=s("SdRk"),_=s.n(I);var k=function(e){s("O+au")},y=s("VU/8")(v,_.a,!1,k,"data-v-363aae39",null).exports,C={name:"job",components:{MemberModal:l.a,MemberInfo:b,Permission:y},data:function(){return{formItem:{name:"",functionType:"",function:"",rank:"",rankPass:"",hourCost:.1,describe:"",status:-3},functionTypeList:[],functionList:[],rankPassList:[],rankList:[],tableContent:{},name:"",isEdit:!0,editBtnName:"编辑",actionBtn:[{label:"权限",type:"md-person",number:0,hidden:!1,id:"objectPermission"},{label:"成员信息",imgPath:"resources/images/icon/user.png",number:0,hidden:!1,id:"user"},{label:"基本信息",type:"ios-home",hidden:!1,id:"baseinfo"}],actionIndex:2,ruleValidate:{name:[{required:!0,message:"请输入职位名称",trigger:"blur"}],functionType:[{required:!0,message:"请选择职能类型",trigger:"change"}],function:[{required:!0,message:"请选择职能",trigger:"change"}],rankPass:[{required:!0,message:"请选择职级通道",trigger:"change"}],rank:[{required:!0,message:"请选择职级",trigger:"change"}],hourCost:[{required:!0,message:"请选择小时成本",type:"number"}]},checkout:!0,jobId:this.$route.params.jobId,isPermission:!0}},methods:{goRoleList:function(){location.href="/Site/index.html#page/jobs"},handlerViewChange:function(e){this.actionIndex=e},onHandleFunctionValueChange:function(e){this.isEdit||(this.formItem.function="")},onHandleRankValueChange:function(e){this.isEdit||(this.formItem.rank="")},getFunctionType:function(e,t){var s=this;if(e){var n=new o.a([["function",function(){return s.formItem.functionType}],["rank",function(){return s.formItem.rankPass}]]).get(t)();"function"!==t||n?"rank"!==t||n?n&&Object(r.F)(n).then(function(e){switch(t){case"function":s.functionList=e;break;case"rank":s.rankList=e}}):this.$Message.error("职级通道不能为空"):this.$Message.error("职能类型不能为空")}},handleSubmitBoxs:function(e){var t=e.target||e.srcElement;if("input"===t.nodeName.toLocaleLowerCase())switch(t.id){case"close":this.$Modal.confirm({title:"提示",content:"是否关闭当前页面",closable:!0,onOk:function(){location.href="/Site/index.html#page/jobs"}});break;case"edit":this.isEdit=!this.isEdit,this.editBtnName=this.isEdit?"编辑":"放弃编辑";break;case"save":this.formItem.status=1,this.save();break;case"saveAndAdd":this.formItem.status=1,this.saveAndAdd();break;case"file":this.formItem.status=-2,this.save();break;case"draft":this.formItem.status=0,this.save()}},saveAndAdd:function(){var t=this;this.$refs.formItem.validate(function(e){e&&(!t.jobId&&t.checkout&&(delete t.formItem.id,Object(r._3)(t.formItem).then(function(e){t.$Message.success("保存成功"),t.$refs.formItem.resetFields(),t.formItem={name:"",type:"",describe:"",status:-3}}).catch(function(e){t.$Message.errer(error.data.message)})),t.checkout||t.$Message.error("名称已经存在!"))})},save:function(){var t=this;this.$refs.formItem.validate(function(e){e&&(t.jobId?(t.formItem.id=t.jobId,Object(r._9)(t.formItem).then(function(e){e&&(t.$Message.success("更新成功"),window.location.reload())}).catch(function(e){t.$Message.errer(error.data.message)})):!t.jobId&&t.checkout&&(delete t.formItem.id,Object(r._3)(t.formItem).then(function(e){e&&(t.$Message.success("保存成功"),t.$router.push({path:"/addressBook/job/detail/"+e.id}),window.location.reload())}).catch(function(e){t.$Message.errer(error.data.message)})),t.checkout||t.$Message.error("名称已经存在!"))})},getObjDetailsCountByRoleId:function(e){var s=this;Object(r.P)(e).then(function(t){s.actionBtn.forEach(function(e){e.number=t[e.id]})})},handleChangeObjDetailsCount:function(e){e&&this.getObjDetailsCountByRoleId(this.jobId)},onGroupNameOutBlur:function(){var t=this,e={};this.isEdit||(e=this.jobId?[{filedName:"name",value:this.formItem.name,symbol:"="},{filedName:"id",symbol:"<>",value:this.jobId}]:[{filedName:"name",value:this.formItem.name,symbol:"="}],e=a()(e),Object(r.i)("sys_role",e).then(function(e){0<e.result?(t.checkout=!1,t.$Message.error("名称已经存在!")):t.checkout=!0}).catch(function(e){t.$Message.error(e.data.message)}))}},mounted:function(){var s=this,e=document.body.clientHeight-95;window.document.getElementsByClassName("job-wrap-tabs")[0].style.height=e+"px";var t=a()([{operator:"eq",value:this.jobId,property:"id"}]),n=this;this.jobId?(Object(r.x)(t).then(function(e){if(e.tableContent[0]){var t=e.tableContent[0];s.name=t.name,n.formItem.name=t.name,n.formItem.type=t.type,n.formItem.status=t.status,n.formItem.function=t.function,n.formItem.functionType=t.functionType,n.formItem.rank=t.rank,n.formItem.rankPass=t.rankPass,n.formItem.hourCost=t.hourCost,n.formItem.describe=t.describe,s.tableContent=t,Object(r.F)(t.functionType).then(function(e){s.functionList=e}),Object(r.F)(t.rankPass).then(function(e){s.rankList=e})}}),this.getObjDetailsCountByRoleId(this.jobId)):this.jobId||"job-add"!=this.$route.name||(this.isEdit=!1,this.actionBtn.forEach(function(e){"baseinfo"!==e.id&&(e.hidden=!0)})),Object(r.M)("000003").then(function(e){e[0].action.update||(s.isPermission=!1)}),Object(r.F)("functionType").then(function(e){s.functionTypeList=e}),Object(r.F)("rankPass").then(function(e){s.rankPassList=e})}},j=s("SekA"),P=s.n(j);var w=function(e){s("GedB")},S=s("VU/8")(C,P.a,!1,w,null,null);t.default=S.exports},QnuS:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("custom-table",{attrs:{apiUrl:"/ds/getRoleUser2Oneself",columns:t.memberInfoColumns,apiParams:t.memberInfoParams},on:{"on-selection-change":t.onSelectionChange,"on-refesh-change":t.onRefeshChange},model:{value:t.reload,callback:function(e){t.reload=e},expression:"reload"}},[s("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[t.isPermission?s("div",{staticStyle:{display:"inline"}},[s("label",{on:{click:t.showMemberModal}},[t._v("添加成员")]),t._v(" "),s("span",[t._v("-添加成员")]),t._v(" "),s("label",{on:{click:t.deleteMemberInfo}},[t._v("移除成员")]),t._v(" "),s("span",[t._v("-移除成员")])]):t._e(),t._v(" "),s("div",{staticClass:"app-table-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索工号或名称"},on:{"on-search":t.userTableFilter},model:{value:t.searchTableValue,callback:function(e){t.searchTableValue=e},expression:"searchTableValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.userTableFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1)])]),t._v(" "),s("member-modal",{attrs:{width:"1000",footerBtnAlign:"right",title:"选择用户"},on:{"on-ok":t.saveSelectionUser},model:{value:t.isShowMemberModal,callback:function(e){t.isShowMemberModal=e},expression:"isShowMemberModal"}},[s("div",{staticStyle:{"margin-top":"10px"}},[s("div",{staticClass:"app-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索工号或名称"},on:{"on-search":t.userFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.userFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1),t._v(" "),s("Table",{ref:"selection",attrs:{height:"400",size:"small",loading:t.listUserLoading,columns:t.memberInfoColumnsModel,data:t.listUserData},on:{"on-select-all":t.onSelectAll,"on-selection-change":t.handerSelectionChange,"on-select-cancel":t.onSelectCancel}}),t._v(" "),s("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:t.listUserPageTotal,current:t.listUserCurrentPage,"page-size":t.pageSize,size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-page-size-change":t.onPageSizeChange,"on-change":t.listUserChangePage}})],1)])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},t._l(t.onPageSelection,function(e){return s("Tag",{key:e.userId,attrs:{userId:e.userId,closable:!0,type:"border",color:"primary",size:"small"},on:{"on-close":t.deletePageSelection}},[t._v("\n        "+t._s(e.nickname)+"\n      ")])}),1)])],1)},staticRenderFns:[]}},SdRk:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("custom-table",{attrs:{apiUrl:"/ds/getObjectPermission2Oneself",columns:t.permissionColumns,apiParams:t.permissionParams},on:{"on-selection-change":t.onSelectionChange,"on-refesh-change":t.onRefeshChange},model:{value:t.reload,callback:function(e){t.reload=e},expression:"reload"}},[s("div",{staticClass:"header-action",attrs:{slot:"header"},slot:"header"},[t.isPermission?s("div",{staticStyle:{display:"inline"}},[s("label",{on:{click:t.addPermission}},[t._v("添加权限")]),t._v(" "),s("span",[t._v("-添加权限")]),t._v(" "),s("label",{on:{click:t.deletePermission}},[t._v("移除权限")]),t._v(" "),s("span",[t._v("-移除权限")])]):t._e(),t._v(" "),s("div",{staticClass:"app-table-search"},[s("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索权限名称"},on:{"on-search":t.permissionFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),t._v(" "),s("a",{staticClass:"app-search-icon",on:{click:t.permissionFilter}},[s("Button",{attrs:{type:"primary",size:"small"}},[t._v("查询")])],1)],1)])]),t._v(" "),s("permission-modal",{attrs:{target:t.target,visible:t.isShowModal},on:{changeModalStatus:t.changeModalStatus,permissionChange:t.permissionChange}})],1)},staticRenderFns:[]}},SekA:function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("div",{staticClass:"job-wrap"},[n("header",{staticClass:"job-wrap-header"},[n("span",{staticClass:"job-wrap-header-job",on:{click:s.goRoleList}},[s._v("职位")]),s._v(" "),n("span",{staticClass:"job-wrap-header-others"},[s._v("/")]),s._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:s.jobId,expression:"jobId"}],staticClass:"job-wrap-header-others"},[s._v(s._s(s.name))]),s._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!s.jobId,expression:"!jobId"}],staticClass:"job-wrap-header-others"},[s._v("创建")]),s._v(" "),n("Tag",{directives:[{name:"show",rawName:"v-show",value:s.jobId,expression:"jobId"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:s.formItem.status},expression:"{status:formItem.status}"}],staticClass:"radius10 marlr10 color_fff",staticStyle:{"margin-bottom":"7px"}})],1),s._v(" "),n("div",{staticClass:"job-wrap-action"},[n("ul",s._l(s.actionBtn,function(e,t){return e.hidden?s._e():n("li",{key:t,staticClass:"job-wrap-action-li",class:t===s.actionIndex?"job-wrap-action-li-active":"",on:{click:function(e){s.handlerViewChange(t)}}},[n("div",[e.type?n("Icon",{staticClass:"icon",attrs:{type:e.type}}):n("img",{staticClass:"job-wrap-action-li-img",attrs:{src:e.imgPath}}),s._v(" "),n("div",{staticClass:"left-content"},[n("span",{directives:[{name:"show",rawName:"v-show",value:"undefine"!==e.number,expression:"item.number!=='undefine'"}]},[s._v(s._s(e.number))]),s._v(" "),n("h3",[s._v(s._s(e.label))])])],1)])}),0)]),s._v(" "),n("div",{staticClass:"job-wrap-tabs"},[2===s.actionIndex?n("section",{staticClass:"baseinfo-container rfd-tab-container-common"},[n("Form",{ref:"formItem",class:{"is-required":s.isEdit},attrs:{model:s.formItem,labelWidth:120,rules:s.ruleValidate}},[n("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"职位名称:",prop:"name"}},[n("Input",{class:s.isEdit?"input-status-isedit":"",attrs:{readonly:s.isEdit},on:{"on-blur":s.onGroupNameOutBlur},model:{value:s.formItem.name,callback:function(e){s.$set(s.formItem,"name",e)},expression:"formItem.name"}})],1),s._v(" "),n("FormItem",{attrs:{label:"职能类型:",labelWidth:120,prop:"functionType"}},[n("Select",{class:s.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职能类型",disabled:s.isEdit},on:{"on-change":s.onHandleFunctionValueChange},model:{value:s.formItem.functionType,callback:function(e){s.$set(s.formItem,"functionType",e)},expression:"formItem.functionType"}},s._l(s.functionTypeList,function(e,t){return n("Option",{key:t+"_"+e.value,attrs:{value:e.value}},[s._v(s._s(e.name))])}),1)],1),s._v(" "),n("FormItem",{attrs:{label:"职能:",labelWidth:120,prop:"function"}},[n("Select",{class:s.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职能",disabled:s.isEdit},on:{"on-open-change":function(e){s.getFunctionType(e,"function")}},model:{value:s.formItem.function,callback:function(e){s.$set(s.formItem,"function",e)},expression:"formItem.function"}},s._l(s.functionList,function(e,t){return n("Option",{key:t+"_"+e.value,attrs:{value:e.value}},[s._v(s._s(e.name))])}),1)],1),s._v(" "),n("FormItem",{attrs:{label:"职级通道:",labelWidth:120,prop:"rankPass"}},[n("Select",{class:s.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职位类型",disabled:s.isEdit},on:{"on-change":s.onHandleRankValueChange},model:{value:s.formItem.rankPass,callback:function(e){s.$set(s.formItem,"rankPass",e)},expression:"formItem.rankPass"}},s._l(s.rankPassList,function(e,t){return n("Option",{key:t+"_"+e.valeu,attrs:{value:e.value}},[s._v(s._s(e.name))])}),1)],1),s._v(" "),n("FormItem",{attrs:{label:"职级:",labelWidth:120,prop:"rank"}},[n("Select",{class:s.isEdit?"input-status-isedit":"",attrs:{placeholder:"请选择职位类型",disabled:s.isEdit},on:{"on-open-change":function(e){s.getFunctionType(e,"rank")}},model:{value:s.formItem.rank,callback:function(e){s.$set(s.formItem,"rank",e)},expression:"formItem.rank"}},s._l(s.rankList,function(e,t){return n("Option",{key:t+"_"+e.valeu,attrs:{value:e.value}},[s._v(s._s(e.name))])}),1)],1),s._v(" "),n("FormItem",{staticStyle:{"font-size":"16px"},attrs:{labelWidth:120,label:"小时成本",prop:"hourCost"}},[n("InputNumber",{attrs:{step:.1,min:.1,readonly:s.isEdit},model:{value:s.formItem.hourCost,callback:function(e){s.$set(s.formItem,"hourCost",e)},expression:"formItem.hourCost"}})],1),s._v(" "),n("FormItem",{staticStyle:{"font-size":"16px"},attrs:{labelWidth:120,label:"职责描述"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"职位描述",readonly:s.isEdit},model:{value:s.formItem.describe,callback:function(e){s.$set(s.formItem,"describe",e)},expression:"formItem.describe"}})],1),s._v(" "),s.jobId&&s.isEdit?n("div",{staticClass:"baseinfo-container-divider"}):s._e(),s._v(" "),s.jobId&&s.isEdit?n("FormItem",{attrs:{label:"创建者:"}},[n("span",[s._v(s._s(s.tableContent.creator))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?n("FormItem",{attrs:{label:"创建时间:"}},[n("span",[s._v(s._s(s.tableContent.crtTime))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?n("FormItem",{attrs:{label:"修改者:"}},[n("span",[s._v(s._s(s.tableContent.modifier))])]):s._e(),s._v(" "),s.jobId&&s.isEdit?n("FormItem",{attrs:{label:"修改时间:"}},[n("span",[s._v(s._s(s.tableContent.modTime))])]):s._e()],1),s._v(" "),n("div",{staticClass:"baseinfo-container-action",on:{click:s.handleSubmitBoxs}},[n("input",{staticClass:"baseinfo-container-action-submit",staticStyle:{"background-color":"rgb(81, 90, 110)"},attrs:{type:"submit",value:"关闭",id:"close"}}),s._v(" "),s.jobId&&s.isPermission?n("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",id:"edit"},domProps:{value:s.editBtnName}}):s._e(),s._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit,expression:"!isEdit"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存",id:"save"}}),s._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit&&1===s.formItem.status,expression:"!isEdit && formItem.status === 1"}],staticClass:"baseinfo-container-action-submit",staticStyle:{"background-color":"rgb(31, 94, 197)"},attrs:{type:"submit",value:"归档",id:"file"}}),s._v(" "),s.jobId?s._e():n("input",{staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存并新建",id:"saveAndAdd"}}),s._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:!s.isEdit||!s.jobId,expression:"!isEdit || !jobId"}],staticClass:"baseinfo-container-action-submit",attrs:{type:"submit",value:"保存草稿",id:"draft"}})])],1):s._e(),s._v(" "),1===s.actionIndex?n("section",{staticClass:"memberinfo-container rfd-tab-container-common"},[n("member-info",{attrs:{isPermission:s.isPermission,jobId:s.jobId},on:{"on-member-info-change":s.handleChangeObjDetailsCount}})],1):s._e(),s._v(" "),0===s.actionIndex?n("section",{staticClass:"permission-container rfd-tab-container-common"},[n("permission",{attrs:{isPermission:s.isPermission,jobId:s.jobId},on:{"on-permission-change":s.handleChangeObjDetailsCount}})],1):s._e()])])},staticRenderFns:[]}},iJXx:function(e,t){}});