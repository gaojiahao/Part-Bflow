{"source":"webpackJsonp([51],{\"/j90\":function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=n(\"mvHQ\"),i=n.n(s),a=n(\"Gu7T\"),r=n.n(a),o=n(\"7B+g\"),l=function(e){return Object(o.a)(\"/H_roleplay-si/app/updateEnterpriseProperty\",{},\"POST\",e)},p=n(\"oAV5\"),c={name:\"enterpriseInfo\",components:{UserModal:n(\"lZCD\").a},data:function(){return{enterpriseInfo:{logo:\"\",nickname:\"\",name:\"\",instraction:\"\",address:\"\",phone:\"\",qwCorpid:\"\",qwAppAgentId:\"\",qwAppsecret:\"\",ddCorpid:\"\",ddAppAgentId:\"\",ddAppKey:\"\",ddAppsecret:\"\",rtRedirectUrl:\"\",admins:[],backgroundImg:\"\",backgroundName:\"\"},editEnterpriseName:!1,edit:\"修改\",httpHeaders:{Authorization:Object(p.c)()},loadingStatus:!1,showAdminModal:!1,onPageSelection:[],columnsData:[],adminColumns:[{type:\"selection\",width:60,align:\"center\"},{title:\"工号\",key:\"userCode\"},{title:\"姓名\",key:\"nickname\"}],closable:!1,searchValue:\"\",pageTotal:0,pageSize:8,currentPage:1,loading:!1}},methods:{selectAdminModal:function(){this.showAdminModal=!0,this.searchValue=\"\",this.onPageSelection=[],this.getListUsers(this.currentPage,this.pageSize)},onSelectAll:function(e){var t,n={};(t=this.onPageSelection).push.apply(t,r()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.userId]&&(n[t.userId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,n=this.onPageSelection;t.map(function(t){n=n.filter(function(e){return e.userId!==t.userId})}),this.onPageSelection=n}else{var s,i={};(s=this.onPageSelection).push.apply(s,r()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!i[t.userId]&&(i[t.userId]=e.push(t)),e},[])}},deletePageSelection:function(e){var n=this,s=Number(e.target.parentElement.getAttribute(\"userId\"));this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==s}),this.$refs.selection.data.forEach(function(e,t){s===e.userId&&n.$refs.selection.toggleSelect(t)})},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},confirmModal:function(){var e,t,n=this,s={},i=[];(e=this.enterpriseInfo.admins).push.apply(e,r()(this.onPageSelection)),this.enterpriseInfo.admins=this.enterpriseInfo.admins.reduce(function(e,t){return!s[t.userId]&&(s[t.userId]=e.push(t)),e},[]),this.onPageSelection.map(function(e){i.push(e.userId)}),(t=i.join(\",\"),Object(o.a)(\"/H_roleplay-si/ps/updateRelation\",{list:\"sys_user_role\",single:t,multi:1},\"POST\")).then(function(e){e.success?(n.$Message.info(\"添加成功！\"),n.showAdminModal=!1):n.$Message.error(e.message)})},deleteEnterpriseAdmin:function(e){var t,n=this,s=Number(e.target.parentElement.getAttribute(\"userid\"));this.enterpriseInfo.admins=this.enterpriseInfo.admins.filter(function(e){return s!==e.userId}),(t=s,Object(o.a)(\"/H_roleplay-si/ps/deleteRelation\",{list:\"sys_user_role\",single:t,multi:1},\"POST\")).then(function(e){e.success?n.$Message.info(\"删除成功！\"):n.$Message.error(e.message)})},changeCurrentPage:function(e){this.currentPage=e;var t=i()([{operator_1:\"like\",value_1:this.searchValue,property_1:\"nickname\",link:\"or\",operator_2:\"like\",value_2:this.searchValue,property_2:\"userCode\"}]);this.getListUsers(this.currentPage,this.pageSize,t)},adminFilter:function(){var e=i()([{operator_1:\"like\",value_1:this.searchValue,property_1:\"nickname\",link:\"or\",operator_2:\"like\",value_2:this.searchValue,property_2:\"userCode\"}]);this.currentPage=1,this.getListUsers(this.currentPage,this.pageSize,e)},handleInputValueChange:function(e){this.searchValue||this.getListUsers(this.currentPage,this.pageSize)},getAdmintrstorData:function(){var t=this;Object(o.a)(\"/H_roleplay-si/app/getEnterpriseById\").then(function(e){t.enterpriseInfo=e})},getListUsers:function(e,t,n){var s,i,a,r=this;this.loading=!0,(s=t,i=e,a=n,Object(o.a)(\"/H_roleplay-si/ds/getAllUsers\",{page:i,limit:s,filter:a})).then(function(e){r.pageTotal=e.dataCount,r.columnsData=e.tableContent,r.loading=!1,0<r.onPageSelection.length&&r.columnsData.map(function(t){r.onPageSelection.map(function(e){t.userId===e.userId&&(t._checked=!0)})})})},handleEditName:function(){var t=this;if(this.edit=this.editEnterpriseName?\"修改\":\"保存\",this.closable=!this.closable,this.editEnterpriseName){var e={nickname:this.enterpriseInfo.nickname,name:this.enterpriseInfo.name,instraction:this.enterpriseInfo.instraction,address:this.enterpriseInfo.address,phone:this.enterpriseInfo.phone,qwCorpid:this.enterpriseInfo.qwCorpid,qwAppAgentId:this.enterpriseInfo.qwAppAgentId,qwAppsecret:this.enterpriseInfo.qwAppsecret,ddCorpid:this.enterpriseInfo.ddCorpid,ddAppAgentId:this.enterpriseInfo.ddAppAgentId,ddAppKey:this.enterpriseInfo.ddAppKey,ddAppsecret:this.enterpriseInfo.ddAppsecret},n=[];for(var s in e)n.push({property:s,value:e[s]});l(n).then(function(e){e.success?t.$Message.info(\"保存成功\"):t.$Message.error(e.message)})}this.editEnterpriseName=!this.editEnterpriseName},handleBackgroundSuccess:function(e,t){this.enterpriseInfo.backgroundImg=\"/H_roleplay-si/ds/download?url=\"+e.data[0].attacthment},handleUploadBefore:function(e){return this.handleMaxSize(e),this.handleFormatError(e),this.enterpriseInfo.backgroundName=e.name,!0},upload:function(){var t=this;this.loadingStatus=!0;var e=[{property:\"backgroundImg\",value:this.enterpriseInfo.backgroundImg},{property:\"backgroundName\",value:this.enterpriseInfo.backgroundName}];l(e).then(function(e){e.success?(t.$Message.info(\"图片上传成功\"),t.loadingStatus=!1):t.$Message.error(e.message)})},handleSuccess:function(e,t){var n=this;this.enterpriseInfo.logo=\"/H_roleplay-si/ds/download?width=256&height=64&url=\"+e.data[0].attacthment;var s=[{property:\"logo\",value:this.enterpriseInfo.logo}];l(s).then(function(e){e.success?n.$Message.info(\"图片上传成功\"):n.$Message.error(e.message)})},handleMaxSize:function(e){this.$Notice.warning({title:\"文件大小超出范围\",desc:\"文件大小最大为2M\"})},handleFormatError:function(e){this.$Notice.warning({title:\"文件格式不对\",desc:\"请上传格式为png 或者 jpg 的图片\"})}},created:function(){this.getAdmintrstorData()}},d=n(\"b7mG\"),u=n.n(d);var m=function(e){n(\"4CkW\")},f=n(\"VU/8\")(c,u.a,!1,m,\"data-v-04382a05\",null);t.default=f.exports},\"4CkW\":function(e,t){},b7mG:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"info-warp\"},[n(\"main\",{staticClass:\"info-warp-main\"},[n(\"section\",{staticClass:\"info-warp-main-section\"},[n(\"div\",{staticClass:\"select-logo\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业LOGO\")]),t._v(\" \"),n(\"div\",{staticClass:\"logo\"},[t.$currentUser.isAdmin?n(\"Upload\",{ref:\"upload\",attrs:{\"show-upload-list\":!1,\"on-success\":t.handleSuccess,format:[\"jpg\",\"jpeg\",\"png\"],\"max-size\":2048,\"on-format-error\":t.handleFormatError,\"on-exceeded-size\":t.handleMaxSize,type:\"drag\",action:\"/H_roleplay-si/ds/upload\",headers:t.httpHeaders}},[t.enterpriseInfo.logo?t._e():n(\"div\",{staticStyle:{width:\"256px\",height:\"64px\",\"line-height\":\"64px\"}},[t.enterpriseInfo.logo?n(\"img\",{attrs:{src:t.enterpriseInfo.logo}}):t._e(),t._v(\" \"),t.enterpriseInfo.logo?t._e():n(\"i\",{staticClass:\"iconfont\"},[t._v(\"\")])]),t._v(\" \"),t.enterpriseInfo.logo?n(\"div\",{staticClass:\"demo-upload-list\",staticStyle:{width:\"256px\",height:\"64px\",\"line-height\":\"64px\"}},[n(\"img\",{attrs:{src:t.enterpriseInfo.logo}}),t._v(\" \"),n(\"div\",{staticClass:\"demo-upload-list-cover\"},[n(\"Icon\",{attrs:{type:\"camera\",color:\"#fff\",size:\"30\"}})],1)]):t._e()]):n(\"img\",{attrs:{src:t.enterpriseInfo.logo}}),t._v(\" \"),n(\"p\",{staticStyle:{\"font-size\":\"12px\",color:\"#999\",\"margin-top\":\"5px\"}},[t._v(\"推荐尺寸702*180\")])],1)]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业简称\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.nickname,expression:\"enterpriseInfo.nickname\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.nickname},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"nickname\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.nickname))]),t._v(\" \"),t.$currentUser.isAdmin?n(\"a\",{on:{click:t.handleEditName}},[t._v(t._s(t.edit))]):t._e()]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业全称\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.name,expression:\"enterpriseInfo.name\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.name},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"name\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.name))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain-textarea\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业说明\")]),t._v(\" \"),t.editEnterpriseName?n(\"textarea\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.instraction,expression:\"enterpriseInfo.instraction\"}],staticClass:\"select-explain-textarea-text\",attrs:{rows:\"3\",cols:\"20\",type:\"textarea\"},domProps:{value:t.enterpriseInfo.instraction},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"instraction\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.instraction))])])]),t._v(\" \"),n(\"section\",{staticClass:\"info-warp-main-section\"},[n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业地址\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.address,expression:\"enterpriseInfo.address\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.address},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"address\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.address))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"联系电话\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.phone,expression:\"enterpriseInfo.phone\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.phone},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"phone\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.phone))])])]),t._v(\" \"),n(\"section\",{staticClass:\"info-warp-main-section\"},[n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业微信企业ID\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.qwCorpid,expression:\"enterpriseInfo.qwCorpid\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.qwCorpid},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"qwCorpid\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.qwCorpid))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业微信应用代理ID\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.qwAppAgentId,expression:\"enterpriseInfo.qwAppAgentId\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.qwAppAgentId},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"qwAppAgentId\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.qwAppAgentId))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"企业微信应用密钥\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.qwAppsecret,expression:\"enterpriseInfo.qwAppsecret\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.qwAppsecret},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"qwAppsecret\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.qwAppsecret))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"钉钉企业ID\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.ddCorpid,expression:\"enterpriseInfo.ddCorpid\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.ddCorpid},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"ddCorpid\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.ddCorpid))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"钉钉信应用代理ID\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.ddAppAgentId,expression:\"enterpriseInfo.ddAppAgentId\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.ddAppAgentId},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"ddAppAgentId\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.ddAppAgentId))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"钉钉应用ID\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.ddAppKey,expression:\"enterpriseInfo.ddAppKey\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.ddAppKey},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"ddAppKey\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.ddAppKey))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"钉钉应用应用密钥\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.ddAppsecret,expression:\"enterpriseInfo.ddAppsecret\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.ddAppsecret},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"ddAppsecret\",e.target.value)}}}):n(\"span\",[t._v(t._s(t.enterpriseInfo.ddAppsecret))])]),t._v(\" \"),n(\"div\",{staticClass:\"select-explain\"},[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"路塔实例详情资源地址\")]),t._v(\" \"),t.editEnterpriseName?n(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.enterpriseInfo.rtRedirectUrl,expression:\"enterpriseInfo.rtRedirectUrl\"}],staticClass:\"input-common-att\",attrs:{type:\"text\"},domProps:{value:t.enterpriseInfo.rtRedirectUrl},on:{input:function(e){e.target.composing||t.$set(t.enterpriseInfo,\"rtRedirectUrl\",e.target.value)}}}):n(\"a\",{attrs:{href:t.enterpriseInfo.rtRedirectUrl,_blank:\"target\"}})])]),t._v(\" \"),n(\"section\",{staticClass:\"info-warp-main-section\"},[n(\"div\",[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"\\n          企业管理员\\n        \")]),t._v(\" \"),n(\"div\",{staticClass:\"user-container\"},[t._l(t.enterpriseInfo.admins,function(e){return n(\"Tag\",{key:e.userId,attrs:{userId:e.userId,type:\"border\",closable:t.closable,color:\"blue\",size:\"small\"},on:{\"on-close\":t.deleteEnterpriseAdmin}},[t._v(\"\\n            \"+t._s(e.nickname)+\"\\n          \")])}),t._v(\" \"),t.$currentUser.isAdmin?n(\"a\",{staticStyle:{\"font-size\":\"14px\"},on:{click:t.selectAdminModal}},[t._v(\"添加\")]):t._e()],2)])]),t._v(\" \"),n(\"section\",{staticClass:\"info-warp-main-section\"},[n(\"div\",[n(\"label\",{staticClass:\"left-leble\"},[t._v(\"网站登录页背景图\")]),t._v(\" \"),n(\"div\",{staticStyle:{display:\"inline-block\",\"vertical-align\":\"middle\"}},[t.$currentUser.isAdmin?n(\"Upload\",{attrs:{\"show-upload-list\":!1,\"before-upload\":t.handleUploadBefore,\"on-success\":t.handleBackgroundSuccess,action:\"/H_roleplay-si/ds/upload\",headers:t.httpHeaders}},[n(\"Button\",{attrs:{icon:\"ios-cloud-upload-outline\"}},[t._v(\"选择背景图\")])],1):t._e(),t._v(\" \"),t.enterpriseInfo.backgroundName?n(\"div\",[t._v(\"上传文件名称:\\n            \"),n(\"a\",{attrs:{href:t.enterpriseInfo.backgroundImg,target:\"_blank\"}},[t._v(t._s(t.enterpriseInfo.backgroundName))]),t._v(\" \"),t.$currentUser.isAdmin?n(\"Button\",{attrs:{type:\"text\",loading:t.loadingStatus},on:{click:t.upload}},[t._v(t._s(t.loadingStatus?\"上传中\":\"点击上传\"))]):t._e()],1):t._e()],1)])])]),t._v(\" \"),n(\"user-modal\",{attrs:{title:\"选择用户\",width:\"600\"},on:{\"on-ok\":t.confirmModal},model:{value:t.showAdminModal,callback:function(e){t.showAdminModal=e},expression:\"showAdminModal\"}},[n(\"div\",[n(\"div\",{staticClass:\"app-search\"},[n(\"Input\",{staticStyle:{width:\"300px\"},attrs:{placeholder:\"请输入用户名或用户ID\",clearable:\"\"},on:{\"on-enter\":t.adminFilter,\"on-change\":t.handleInputValueChange},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:\"searchValue\"}}),t._v(\" \"),n(\"p\",{staticClass:\"app-search-icon\"},[n(\"Button\",{attrs:{type:\"primary\",size:\"small\"},on:{click:t.adminFilter}},[t._v(\"查询\")])],1)],1),t._v(\" \"),n(\"Table\",{ref:\"selection\",attrs:{height:\"340\",size:\"small\",columns:t.adminColumns,data:t.columnsData,loading:t.loading},on:{\"on-select-all\":t.onSelectAll,\"on-selection-change\":t.handerSelectionChange,\"on-select-cancel\":t.onSelectCancel}}),t._v(\" \"),n(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[n(\"div\",{staticStyle:{float:\"right\"}},[n(\"Page\",{attrs:{total:t.pageTotal,current:t.currentPage,\"page-size\":t.pageSize,size:\"small\",\"show-total\":\"\",\"show-elevator\":\"\"},on:{\"on-change\":t.changeCurrentPage}})],1)])],1),t._v(\" \"),n(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:t.onPageSelection[0],expression:\"onPageSelection[0] \"}],staticClass:\"page-selection-warp\"},t._l(t.onPageSelection,function(e){return n(\"Tag\",{key:e.userId,attrs:{userId:e.userId,closable:!0,type:\"border\",color:\"primary\",size:\"small\"},on:{\"on-close\":t.deletePageSelection}},[t._v(\"\\n        \"+t._s(e.nickname)+\"\\n      \")])}),1)])],1)},staticRenderFns:[]}}});"}