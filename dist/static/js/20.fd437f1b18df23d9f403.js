webpackJsonp([20],{"/j90":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("mvHQ"),i=n.n(s),a=n("Gu7T"),r=n.n(a),o=n("7B+g"),l=function(e){var t=e.id,n=e.logo,s=e.nickname,i=e.name,a=e.instruction,r=e.address,l=e.phone,c=e.backgroundImg,d=e.backgroundName;return Object(o.a)("/H_roleplay-si/app/addOrUpdateEnterprise",{id:t,logo:n,nickname:s,name:i,instruction:a,address:r,phone:l,backgroundImg:c,backgroundName:d},"POST")},c=n("oAV5"),d={name:"enterpriseInfo",components:{UserModal:n("lZCD").a},data:function(){return{enterpriseInfo:{logo:"",nickname:"",name:"",instruction:"",address:"",phone:"",admins:[],backgroundImg:"",backgroundName:""},editEnterpriseName:!1,edit:"修改",httpHeaders:{Authorization:Object(c.c)()},loadingStatus:!1,showAdminModal:!1,onPageSelection:[],columnsData:[],adminColumns:[{type:"selection",width:60,align:"center"},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"}],closable:!1,searchValue:"",pageTotal:0,pageSize:8,currentPage:1,loading:!1}},methods:{selectAdminModal:function(){this.showAdminModal=!0,this.searchValue="",this.onPageSelection=[],this.getListUsers(this.currentPage,this.pageSize)},onSelectAll:function(e){var t,n={};(t=this.onPageSelection).push.apply(t,r()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.userId]&&(n[t.userId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,n=this.onPageSelection;t.map(function(e){n=n.filter(function(t){return t.userId!==e.userId})}),this.onPageSelection=n}else{var s,i={};(s=this.onPageSelection).push.apply(s,r()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!i[t.userId]&&(i[t.userId]=e.push(t)),e},[])}},deletePageSelection:function(e){var t=this,n=Number(e.target.parentElement.getAttribute("userId"));this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==n}),this.$refs.selection.data.forEach(function(e,s){n===e.userId&&t.$refs.selection.toggleSelect(s)})},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},confirmModal:function(){var e,t,n=this,s={},i=[];(e=this.enterpriseInfo.admins).push.apply(e,r()(this.onPageSelection)),this.enterpriseInfo.admins=this.enterpriseInfo.admins.reduce(function(e,t){return!s[t.userId]&&(s[t.userId]=e.push(t)),e},[]),this.onPageSelection.map(function(e){i.push(e.userId)}),(t=i.join(","),Object(o.a)("/H_roleplay-si/ps/updateRelation",{list:"sys_user_role",single:t,multi:1},"POST")).then(function(e){e.success?(n.$Message.info("添加成功！"),n.showAdminModal=!1):n.$Message.error(e.message)})},deleteEnterpriseAdmin:function(e){var t,n=this,s=Number(e.target.parentElement.getAttribute("userid"));this.enterpriseInfo.admins=this.enterpriseInfo.admins.filter(function(e){return s!==e.userId}),(t=s,Object(o.a)("/H_roleplay-si/ps/deleteRelation",{list:"sys_user_role",single:t,multi:1},"POST")).then(function(e){e.success?n.$Message.info("删除成功！"):n.$Message.error(e.message)})},changeCurrentPage:function(e){this.currentPage=e;var t=i()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.getListUsers(this.currentPage,this.pageSize,t)},adminFilter:function(){var e=i()([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}]);this.currentPage=1,this.getListUsers(this.currentPage,this.pageSize,e)},handleInputValueChange:function(e){this.searchValue||this.getListUsers(this.currentPage,this.pageSize)},getAdmintrstorData:function(){var e=this;Object(o.a)("/H_roleplay-si/app/getEnterpriseById").then(function(t){e.enterpriseInfo=t})},getListUsers:function(e,t,n){var s=this;this.loading=!0,function(e,t,n){return Object(o.a)("/H_roleplay-si/ds/getAllUsers",{page:t,limit:e,filter:n})}(t,e,n).then(function(e){s.pageTotal=e.dataCount,s.columnsData=e.tableContent,s.loading=!1,s.onPageSelection.length>0&&s.columnsData.map(function(e){s.onPageSelection.map(function(t){e.userId===t.userId&&(e._checked=!0)})})})},handleEditName:function(){var e=this;if(this.edit=this.editEnterpriseName?"修改":"保存",this.closable=!this.closable,this.editEnterpriseName){var t={id:this.enterpriseInfo.id,nickname:this.enterpriseInfo.nickname,name:this.enterpriseInfo.name,instruction:this.enterpriseInfo.instruction,address:this.enterpriseInfo.address,phone:this.enterpriseInfo.phone};l(t).then(function(t){t.success?e.$Message.info("保存成功"):e.$Message.error(t.message)})}this.editEnterpriseName=!this.editEnterpriseName},handleBackgroundSuccess:function(e,t){this.enterpriseInfo.backgroundImg="/H_roleplay-si/ds/download?url="+e.data[0].attacthment},handleUploadBefore:function(e){return this.handleMaxSize(e),this.handleFormatError(e),this.enterpriseInfo.backgroundName=e.name,!0},upload:function(){var e=this;this.loadingStatus=!0;var t={id:this.enterpriseInfo.id,backgroundImg:this.enterpriseInfo.backgroundImg,backgroundName:this.enterpriseInfo.backgroundName};l(t).then(function(t){t.success?(e.$Message.info("图片上传成功"),e.loadingStatus=!1):e.$Message.error(t.message)})},handleSuccess:function(e,t){var n=this;this.enterpriseInfo.logo="/H_roleplay-si/ds/download?width=256&height=64&url="+e.data[0].attacthment;var s={id:this.enterpriseInfo.id,logo:this.enterpriseInfo.logo};l(s).then(function(e){e.success?n.$Message.info("图片上传成功"):n.$Message.error(e.message)})},handleMaxSize:function(e){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(e){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})}},created:function(){this.getAdmintrstorData()}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"info-warp"},[n("main",{staticClass:"info-warp-main"},[n("section",{staticClass:"info-warp-main-section"},[n("div",{staticClass:"select-logo"},[n("label",{staticClass:"left-leble"},[e._v("企业LOGO")]),e._v(" "),e.$currentUser.isAdmin?n("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"256px","vertical-align":"middle"},attrs:{"show-upload-list":!1,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,type:"drag",action:"/H_roleplay-si/ds/upload",headers:e.httpHeaders}},[e.enterpriseInfo.logo?e._e():n("div",{staticStyle:{width:"256px",height:"64px","line-height":"64px"}},[e.enterpriseInfo.logo?n("img",{attrs:{src:e.enterpriseInfo.logo}}):e._e(),e._v(" "),e.enterpriseInfo.logo?e._e():n("i",{staticClass:"iconfont"},[e._v("")])]),e._v(" "),e.enterpriseInfo.logo?n("div",{staticClass:"demo-upload-list",staticStyle:{width:"256px",height:"64px","line-height":"64px"}},[n("img",{attrs:{src:e.enterpriseInfo.logo}}),e._v(" "),n("div",{staticClass:"demo-upload-list-cover"},[n("Icon",{attrs:{type:"camera",color:"#fff",size:"30"}})],1)]):e._e()]):n("img",{attrs:{src:e.enterpriseInfo.logo}})],1),e._v(" "),n("div",{staticClass:"select-explain"},[n("label",{staticClass:"left-leble"},[e._v("企业简称")]),e._v(" "),e.editEnterpriseName?e._e():n("span",[e._v(e._s(e.enterpriseInfo.nickname))]),e._v(" "),e.editEnterpriseName?n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterpriseInfo.nickname,expression:"enterpriseInfo.nickname"}],staticClass:"input-common-att",attrs:{type:"text"},domProps:{value:e.enterpriseInfo.nickname},on:{input:function(t){t.target.composing||e.$set(e.enterpriseInfo,"nickname",t.target.value)}}}):e._e(),e._v(" "),e.$currentUser.isAdmin?n("a",{on:{click:e.handleEditName}},[e._v(e._s(e.edit))]):e._e()]),e._v(" "),n("div",{staticClass:"select-explain"},[n("label",{staticClass:"left-leble"},[e._v("企业全称")]),e._v(" "),e.editEnterpriseName?e._e():n("span",[e._v(e._s(e.enterpriseInfo.name))]),e._v(" "),e.editEnterpriseName?n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterpriseInfo.name,expression:"enterpriseInfo.name"}],staticClass:"input-common-att",attrs:{type:"text"},domProps:{value:e.enterpriseInfo.name},on:{input:function(t){t.target.composing||e.$set(e.enterpriseInfo,"name",t.target.value)}}}):e._e()]),e._v(" "),n("div",{staticClass:"select-explain-textarea"},[n("label",{staticClass:"left-leble"},[e._v("企业说明")]),e._v(" "),e.editEnterpriseName?e._e():n("span",[e._v(e._s(e.enterpriseInfo.instruction))]),e._v(" "),e.editEnterpriseName?n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.enterpriseInfo.instruction,expression:"enterpriseInfo.instruction"}],staticClass:"select-explain-textarea-text",attrs:{rows:"3",cols:"20",type:"textarea"},domProps:{value:e.enterpriseInfo.instruction},on:{input:function(t){t.target.composing||e.$set(e.enterpriseInfo,"instruction",t.target.value)}}}):e._e()])]),e._v(" "),n("section",{staticClass:"info-warp-main-section"},[n("div",{staticClass:"select-explain"},[n("label",{staticClass:"left-leble"},[e._v("企业地址")]),e._v(" "),e.editEnterpriseName?e._e():n("span",[e._v(e._s(e.enterpriseInfo.address))]),e._v(" "),e.editEnterpriseName?n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterpriseInfo.address,expression:"enterpriseInfo.address"}],staticClass:"input-common-att",attrs:{type:"text"},domProps:{value:e.enterpriseInfo.address},on:{input:function(t){t.target.composing||e.$set(e.enterpriseInfo,"address",t.target.value)}}}):e._e()]),e._v(" "),n("div",{staticClass:"select-explain"},[n("label",{staticClass:"left-leble"},[e._v("联系电话")]),e._v(" "),e.editEnterpriseName?e._e():n("span",[e._v(e._s(e.enterpriseInfo.phone))]),e._v(" "),e.editEnterpriseName?n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterpriseInfo.phone,expression:"enterpriseInfo.phone"}],staticClass:"input-common-att",attrs:{type:"text"},domProps:{value:e.enterpriseInfo.phone},on:{input:function(t){t.target.composing||e.$set(e.enterpriseInfo,"phone",t.target.value)}}}):e._e()])]),e._v(" "),n("section",{staticClass:"info-warp-main-section"},[n("div",[n("label",{staticClass:"left-leble"},[e._v("\n          企业管理员\n        ")]),e._v(" "),n("div",{staticClass:"user-container"},[e._l(e.enterpriseInfo.admins,function(t){return n("Tag",{key:t.userId,attrs:{userId:t.userId,type:"border",closable:e.closable,color:"blue",size:"small"},on:{"on-close":e.deleteEnterpriseAdmin}},[e._v("\n            "+e._s(t.nickname)+"\n          ")])}),e._v(" "),e.$currentUser.isAdmin?n("a",{staticStyle:{"font-size":"14px"},on:{click:e.selectAdminModal}},[e._v("添加")]):e._e()],2)])]),e._v(" "),n("section",{staticClass:"info-warp-main-section"},[n("div",[n("label",{staticClass:"left-leble"},[e._v("网站登录页背景图")]),e._v(" "),n("div",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[e.$currentUser.isAdmin?n("Upload",{attrs:{"show-upload-list":!1,"before-upload":e.handleUploadBefore,"on-success":e.handleBackgroundSuccess,action:"/H_roleplay-si/ds/upload",headers:e.httpHeaders}},[n("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("选择背景图")])],1):e._e(),e._v(" "),e.enterpriseInfo.backgroundName?n("div",[e._v("上传文件名称:\n            "),n("a",{attrs:{href:e.enterpriseInfo.backgroundImg,target:"_blank"}},[e._v(e._s(e.enterpriseInfo.backgroundName))]),e._v(" "),e.$currentUser.isAdmin?n("Button",{attrs:{type:"text",loading:e.loadingStatus},on:{click:e.upload}},[e._v(e._s(e.loadingStatus?"上传中":"点击上传"))]):e._e()],1):e._e()],1)])])]),e._v(" "),n("user-modal",{attrs:{title:"选择用户",width:"600"},on:{"on-ok":e.confirmModal},model:{value:e.showAdminModal,callback:function(t){e.showAdminModal=t},expression:"showAdminModal"}},[n("div",[n("div",{staticClass:"app-search"},[n("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入用户名或用户ID",clearable:""},on:{"on-enter":e.adminFilter,"on-change":e.handleInputValueChange},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),e._v(" "),n("p",{staticClass:"app-search-icon"},[n("Button",{attrs:{type:"primary",size:"small"},on:{click:e.adminFilter}},[e._v("查询")])],1)],1),e._v(" "),n("Table",{ref:"selection",attrs:{height:"340",size:"small",columns:e.adminColumns,data:e.columnsData,loading:e.loading},on:{"on-select-all":e.onSelectAll,"on-selection-change":e.handerSelectionChange,"on-select-cancel":e.onSelectCancel}}),e._v(" "),n("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[n("div",{staticStyle:{float:"right"}},[n("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.changeCurrentPage}})],1)])],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},e._l(e.onPageSelection,function(t){return n("Tag",{key:t.userId,attrs:{userId:t.userId,closable:!0,type:"border",color:"primary",size:"small"},on:{"on-close":e.deletePageSelection}},[e._v("\n        "+e._s(t.nickname)+"\n      ")])}))])],1)},staticRenderFns:[]};var p=n("VU/8")(d,u,!1,function(e){n("Ww0u")},"data-v-c971782a",null);t.default=p.exports},Ww0u:function(e,t){}});