webpackJsonp([1],{"0al4":function(e,t){},"2FEj":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("fZjL"),o=s.n(a),n=s("oAV5"),i=s("o32f"),r={name:"userInfo",components:{},props:{userInfo:{type:Object}},data:function(){return{httpHeaders:{Authorization:Object(n.b)()},showSaveAddBtn:!0,noShowSaveAddBtn:!1,logo:"",visible:!1,formItem:{userCode:"",nickname:"",mobile:"",officePhone:"",email:"",status:"1",gender:"1",termOfValidity:"",comment:""},ruleValidate:{userCode:[{required:!0,message:"请输入用户工号",trigger:"blur"}],nickname:[{required:!0,message:"请输入用户名称",trigger:"blur"}],mobile:[{required:!0,message:"手机号输入不合法",trigger:"blur",pattern:/^[1][3,4,5,7,8][0-9]{9}$/}],email:[{type:"email",message:"邮箱输入不合法",trigger:"blur"}]}}},watch:{userInfo:function(){o()(this.userInfo).length>0&&(this.formItem.userCode=this.userInfo.userCode,this.formItem.nickname=this.userInfo.nickname,this.formItem.mobile=this.userInfo.mobile,this.formItem.officePhone=this.userInfo.officePhone,this.formItem.email=this.userInfo.email,this.formItem.termOfValidity=this.userInfo.termOfValidity,this.formItem.comment=this.userInfo.comment,this.formItem.gender=String(this.userInfo.gender),this.formItem.status=String(this.userInfo.status),this.logo=this.userInfo.photo)}},methods:{handleSuccess:function(e,t){this.logo="/H_roleplay-si/ds/download?width=128&height=128&specify=true&url="+e.data[0].attacthment},handleView:function(){this.visible=!0},handleRemove:function(){this.logo="",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},handleMaxSize:function(e){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(e){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})},updateUserData:function(){var e=this;this.$refs.formItem.validate(function(t){t&&(e.formItem.photo=e.logo,e.formItem.termOfValidity&&(e.formItem.termOfValidity=e.formatDate(e.formItem.termOfValidity)),e.userInfo.userId?(e.formItem.userId=e.userInfo.userId,Object(i.Y)(e.formItem).then(function(t){t.success&&(e.$Message.success(t.message),e.$router.push({path:"/addressBook/user/board"}))}).catch(function(t){e.$Message.error(t.data.message)})):Object(i.i)(e.formItem).then(function(t){t.success&&(e.$Message.success(t.message),e.$router.push({path:"/addressBook/user/board"}))}).catch(function(t){e.$Message.error(t.data.message)}))})},saveAndAddUser:function(){var e=this;this.$refs.formItem.validate(function(t){t&&(e.formItem.photo=e.logo,e.formItem.termOfValidity&&(e.formItem.termOfValidity=e.formatDate(e.formItem.termOfValidity)),Object(i.i)(e.formItem).then(function(t){t.success&&(e.$Message.success(t.message),e.$refs.formItem.resetFields(),e.formItem.termOfValidity="",e.formItem.comment="",e.logo="",e.formItem.photo="",e.formItem.gender="1",e.formItem.status="1",e.comment="",e.$refs.upload.fileList.splice(0,e.$refs.upload.fileList.length))}).catch(function(t){e.$Message.error(t.data.message)}))})},goUserList:function(){this.$router.push({path:"/addressBook/user/board"})},formatDate:function(e){var t=new Date(e),s=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();return a>=1&&a<=9&&(a="0"+a),s+"-"+a+"-"+o}},mounted:function(){}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"info"},[s("Row",{staticClass:"info-detail"},[s("Col",{staticClass:"info-logo",attrs:{span:"4"}},[s("Upload",{ref:"upload",staticClass:"fr",staticStyle:{display:"inline-block",width:"128px","vertical-align":"middle"},attrs:{"show-upload-list":!1,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,type:"drag",action:"/H_roleplay-si/ds/upload",headers:e.httpHeaders}},[e.logo?e._e():s("div",{staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[e.logo?s("img",{attrs:{src:e.logo}}):e._e(),e._v(" "),e.logo?e._e():s("i",{staticClass:"iconfont"},[e._v("")])]),e._v(" "),e.logo?s("div",{staticClass:"demo-upload-list",staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[s("img",{attrs:{src:e.logo}}),e._v(" "),s("div",{staticClass:"demo-upload-list-cover"},[s("Icon",{attrs:{type:"ios-eye-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleView(t)}}}),e._v(" "),s("Icon",{attrs:{type:"ios-trash-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleRemove(t)}}})],1)]):e._e()]),e._v(" "),s("Modal",{attrs:{title:"查看头像"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?s("img",{staticStyle:{width:"100%"},attrs:{src:e.logo}}):e._e()])],1),e._v(" "),s("Col",{staticClass:"info-form",attrs:{span:"12"}},[s("Form",{ref:"formItem",attrs:{model:e.formItem,rules:e.ruleValidate,"label-width":85}},[s("FormItem",{attrs:{label:"工号：",prop:"userCode"}},[s("Input",{attrs:{placeholder:""},model:{value:e.formItem.userCode,callback:function(t){e.$set(e.formItem,"userCode",t)},expression:"formItem.userCode"}})],1),e._v(" "),s("FormItem",{attrs:{label:"姓名：",prop:"nickname"}},[s("Input",{attrs:{placeholder:""},model:{value:e.formItem.nickname,callback:function(t){e.$set(e.formItem,"nickname",t)},expression:"formItem.nickname"}})],1),e._v(" "),s("FormItem",{attrs:{label:"性别："}},[s("RadioGroup",{model:{value:e.formItem.gender,callback:function(t){e.$set(e.formItem,"gender",t)},expression:"formItem.gender"}},[s("Radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),s("Radio",{attrs:{label:"0"}},[e._v("女")])],1)],1),e._v(" "),s("FormItem",{attrs:{label:"手机：",prop:"mobile"}},[s("Input",{attrs:{placeholder:""},model:{value:e.formItem.mobile,callback:function(t){e.$set(e.formItem,"mobile",t)},expression:"formItem.mobile"}})],1),e._v(" "),s("FormItem",{attrs:{label:"座机："}},[s("Input",{attrs:{placeholder:""},model:{value:e.formItem.officePhone,callback:function(t){e.$set(e.formItem,"officePhone",t)},expression:"formItem.officePhone"}})],1),e._v(" "),s("FormItem",{attrs:{label:"邮箱：",prop:"email"}},[s("Input",{attrs:{placeholder:""},model:{value:e.formItem.email,callback:function(t){e.$set(e.formItem,"email",t)},expression:"formItem.email"}})],1),e._v(" "),s("FormItem",{attrs:{label:"账户有效期："}},[s("DatePicker",{attrs:{type:"date",placeholder:""},model:{value:e.formItem.termOfValidity,callback:function(t){e.$set(e.formItem,"termOfValidity",t)},expression:"formItem.termOfValidity"}})],1),e._v(" "),s("FormItem",{attrs:{label:"状态："}},[s("Select",{model:{value:e.formItem.status,callback:function(t){e.$set(e.formItem,"status",t)},expression:"formItem.status"}},[s("Option",{attrs:{value:"1"}},[e._v("使用中")]),e._v(" "),s("Option",{attrs:{value:"3"}},[e._v("草稿")]),e._v(" "),s("Option",{attrs:{value:"0"}},[e._v("停用")]),e._v(" "),s("Option",{attrs:{value:"2"}},[e._v("未使用")])],1)],1),e._v(" "),s("FormItem",{attrs:{label:"说明："}},[s("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:""},model:{value:e.formItem.comment,callback:function(t){e.$set(e.formItem,"comment",t)},expression:"formItem.comment"}})],1)],1)],1)],1),e._v(" "),s("Row",{staticClass:"info-btn"},[s("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.goUserList}},[e._v("取消")]),e._v(" "),s("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.updateUserData}},[e._v("保存")]),e._v(" "),(e.userInfo.userId?e.noShowSaveAddBtn:e.showSaveAddBtn)?s("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.saveAndAddUser}},[e._v("保存并继续添加")]):e._e()],1)],1)},staticRenderFns:[]};var c={name:"higherUser",components:{},props:{},data:function(){var e=this;return{userId:this.$route.params.userId,highUser:{total:0,currentPage:1,usertotal:0,usercurrentPage:1,pageSize:10,allUserpageSize:10},loading:!0,userLoading:!0,showModal:!1,columns:[{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{},1===t.row.gender?"男":"女")}},{title:"手机号",key:"mobile",width:130},{title:"部门",key:"dept",width:200},{title:"小组",key:"dept",width:200},{title:"职位",key:"role",width:150},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}},{title:"操作",key:"action",width:80,align:"center",render:function(t,s){return t("span",{props:{type:"md-close"},style:{cursor:"pointer",color:"#39f","font-weight":"bold"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此用户？",onOk:function(){Object(i.q)(e.userId).then(function(t){t.success&&(e.$Message.success(t.message),e.getHigherUserData(),e.$emit("changeInstance"))})}})}}},"删除")}}],userColumns:[{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{},1===t.row.gender?"男":"女")}},{title:"手机号",key:"mobile",width:100},{title:"部门",key:"dept"},{title:"小组",key:"dept"},{title:"职位",key:"role",width:150},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}}],higherUserData:[],userData:[]}},methods:{getHigherUserData:function(){var e=this;this.userId?(this.loading=!0,Object(i.D)(this.userId,this.highUser.pageSize,this.highUser.currentPage).then(function(t){e.higherUserData=t.tableContent,e.highUser.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.highUser.currentPage=e,this.getHigherUserData()},onPageSizeChange:function(e){this.highUser.pageSize=e,this.getHigherUserData()},onAllUserPageSizeChange:function(e){this.highUser.allUserpageSize=e,this.getAllUsersData()},onUserPageChange:function(e){this.highUser.usercurrentPage=e,this.getAllUsersData()},onDbClick:function(e,t){var s=this,a=e.userId;a&&this.userId&&Object(i.X)(this.userId,a).then(function(e){e.success&&(s.showModal=!1,s.$Message.success(e.message),s.getHigherUserData(),s.$emit("changeInstance"))})},showUserModal:function(){this.showModal=!0,this.getAllUsersData()},getAllUsersData:function(){var e=this;this.userLoading=!0,Object(i.x)(this.highUser.allUserpageSize,this.highUser.usercurrentPage).then(function(t){e.userData=t.tableContent,e.highUser.usertotal=t.dataCount,e.userLoading=!1})}},mounted:function(){this.getHigherUserData()}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"higher-user"},[s("div",{staticClass:"higher-user-detail",attrs:{id:"cliHeight"}},[s("b",{staticClass:"higher-user-detail-btn",on:{click:e.showUserModal}},[e._v("上级用户")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择上级用户")]),e._v(" "),s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.higherUserData}})],1),e._v(" "),s("Modal",{attrs:{title:"选择用户","footer-hide":!0,width:"1000",draggable:!0},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.userLoading,columns:e.userColumns,data:e.userData},on:{"on-row-dblclick":e.onDbClick}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticClass:"fr"},[s("Page",{attrs:{total:e.highUser.usertotal,"show-elevator":"","show-sizer":"",current:e.highUser.usercurrentPage,"page-size":e.highUser.allUserpageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllUserPageSizeChange,"on-change":e.onUserPageChange}})],1)])],1)],1)},staticRenderFns:[]};var h={name:"lowerUser",components:{},props:{},data:function(){var e=this;return{userId:this.$route.params.userId,lowUser:{total:0,usertotal:0,currentPage:1,usercurrentPage:1,pageSize:10,allUserpageSize:10},loading:!0,userLoading:!0,showModal:!1,columns:[{type:"selection",width:60,align:"center"},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{},1===t.row.gender?"男":"女")}},{title:"手机号",key:"mobile",width:130},{title:"部门",key:"dept",width:200},{title:"小组",key:"dept",width:200},{title:"职位",key:"role",width:150},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}},{title:"操作",key:"action",width:80,align:"center",render:function(t,s){return t("span",{props:{type:"md-close"},style:{cursor:"pointer",color:"#39f","font-weight":"bold"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此用户？",onOk:function(){Object(i.q)(s.row.userId).then(function(t){e.$Message.success(t.message),e.getLowerUserData(),e.$emit("changeInstance")})}})}}},"删除")}}],userColumns:[{type:"selection",width:60,align:"center"},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{},1===t.row.gender?"男":"女")}},{title:"手机号",key:"mobile",width:130},{title:"部门",key:"dept"},{title:"小组",key:"dept"},{title:"职位",key:"role",width:130},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}}],lowerUserData:[],userData:[],selectUserData:[],selectLowUserData:[]}},methods:{getLowerUserData:function(){var e=this;this.userId?(this.loading=!0,Object(i.G)(this.userId,this.lowUser.pageSize,this.lowUser.currentPage).then(function(t){e.lowerUserData=t.tableContent,e.lowUser.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.lowUser.currentPage=e,this.getLowerUserData()},onPageSizeChange:function(e){this.lowUser.pageSize=e,this.getLowerUserData()},onAllUserPageSizeChange:function(e){this.lowUser.allUserpageSize=e,this.getAllUsersData()},onUserPageChange:function(e){this.lowUser.usercurrentPage=e,this.getAllUsersData()},selectLowUser:function(e){this.selectLowUserData=e},addLowUser:function(){var e=this,t=[];this.selectUserData.length>0?this.selectUserData.forEach(function(e){t.push(e.userId)}):this.$Message.warning("请选择至少一个用户！"),t&&this.userId?Object(i.X)(t.join(","),this.userId).then(function(t){t.success&&(e.$Message.success(t.message),e.getLowerUserData(),e.$emit("changeInstance"))}):this.$Message.warning("无用户ID，请先保存用户再进行编辑！")},deleteLowUser:function(){var e=this,t=[];0===this.selectLowUserData.length?this.$Message.warning("请先选择要删除的用户！"):(this.selectLowUserData.forEach(function(e){t.push(e.userId)}),this.$Modal.confirm({title:"确认",content:"确认删除选择的用户？",onOk:function(){Object(i.q)(t.join(",")).then(function(t){e.selectLowUserData=[],e.$Message.success(t.message),e.getLowerUserData(),e.$emit("changeInstance")})}}))},onSelectionChange:function(e){this.selectUserData=e},showUserModal:function(){this.showModal=!0,this.getAllUsersData()},getAllUsersData:function(){var e=this;this.userLoading=!0,Object(i.x)(this.lowUser.allUserpageSize,this.lowUser.usercurrentPage).then(function(t){e.userData=t.tableContent,e.lowUser.usertotal=t.dataCount,e.userLoading=!1})}},mounted:function(){this.getLowerUserData()}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"lower-user"},[s("div",{staticClass:"lower-user-detail",attrs:{id:"lowHeight"}},[s("b",{staticClass:"lower-user-detail-btn",on:{click:e.showUserModal}},[e._v("下级用户")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择下级用户")]),e._v(" "),s("b",{staticClass:"lower-user-detail-btn",on:{click:e.deleteLowUser}},[e._v("删除")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除下级用户")]),e._v(" "),s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.lowerUserData},on:{"on-selection-change":e.selectLowUser}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.lowUser.total,"show-elevator":"","show-sizer":"",current:e.lowUser.currentPage,"page-size":e.lowUser.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),s("Modal",{attrs:{title:"选择用户",width:"1000"},on:{"on-ok":e.addLowUser},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("Table",{ref:"selection",attrs:{height:"400",loading:e.userLoading,columns:e.userColumns,data:e.userData},on:{"on-selection-change":e.onSelectionChange}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.lowUser.usertotal,"show-elevator":"","show-sizer":"",current:e.lowUser.usercurrentPage,"page-size":e.lowUser.allUserpageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllUserPageSizeChange,"on-change":e.onUserPageChange}})],1)])],1)],1)},staticRenderFns:[]};var g={name:"departmentMember",components:{},props:{},data:function(){var e=this;return{userId:this.$route.params.userId,total:0,currentPage:1,pageSize:10,loading:!0,showModal:!1,columns:[{type:"selection",width:60,align:"center"},{title:"类型",key:"groupType",render:function(e,t){var s="";switch(t.row.groupType){case"O":s="部门";break;case"A":s="事业部";break;case"R":s="岗位";break;case"M":s="主体";break;case"C":s="公司"}return e("span",{},s)}},{title:"名称",key:"groupName",width:200},{title:"标签",key:"tag"},{title:"负责人",key:"principalName"},{title:"加入时间",key:"joinTime"},{title:"离开时间",key:"leaveTime"},{title:"操作",key:"action",width:150,align:"center",render:function(t,s){return t("span",{props:{type:"md-close"},style:{cursor:"pointer",color:"#39f","font-weight":"bold"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此部门？",onOk:function(){Object(i.m)("sys_group_user",s.row.groupId,e.userId).then(function(t){t.success&&(e.$Message.success(t.message),e.getDepartmentData(),e.$emit("changeInstance"))})}})}}},"删除")}}],departmentData:[],groupData:[],selectGroup:[],selectDeleteGroupData:[]}},methods:{getDepartmentData:function(){var e=this;this.userId?(this.loading=!0,Object(i.A)(this.userId,this.pageSize,this.currentPage).then(function(t){e.departmentData=t.tableContent,e.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.currentPage=e,this.getDepartmentData()},onPageSizeChange:function(e){this.pageSize=e,this.getDepartmentData()},showGroupModal:function(){this.showModal=!0,this.groupData=[],this.getAllGroupData(6)},deleteGroup:function(){var e=this,t=[];0===this.selectDeleteGroupData.length?this.$Message.warning("请先选择要删除的用户部门！"):(this.selectDeleteGroupData.forEach(function(e){t.push(e.groupId)}),this.$Modal.confirm({title:"确认",content:"确认删除选择的用户部门？",onOk:function(){Object(i.m)("sys_group_user",t.join(","),e.userId).then(function(t){t.success&&(e.selectDeleteGroupData=[],e.$Message.success(t.message),e.getDepartmentData(),e.$emit("changeInstance"))})}}))},selectDeleteGroup:function(e){this.selectDeleteGroupData=e},addDepartment:function(){var e=this;if(this.selectGroup&&this.userId){var t=[];this.selectGroup.forEach(function(e){t.push(e.groupId)}),Object(i.e)("sys_group_user",t.join(","),this.userId).then(function(t){t.success&&(e.selectGroup=[],e.$Message.success(t.message),e.getDepartmentData(),e.$emit("changeInstance"))})}},getAllGroupData:function(e){var t=this;0===this.groupData.length&&Object(i.C)(e).then(function(e){e.tableContent.forEach(function(e){t.groupData.push({title:e.groupName,groupId:e.groupId,loading:!1,children:[]})})})},loadData:function(e,t){Object(i.C)(e.groupId).then(function(e){var s=[];e.tableContent.forEach(function(e){0===e.leaf?s.push({title:e.groupName,groupId:e.groupId,loading:!1,children:[]}):s.push({title:e.groupName,groupId:e.groupId})}),t(s)})},selectNode:function(e){this.selectGroup=e}},mounted:function(){this.getDepartmentData()}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"department"},[s("div",{staticClass:"department-detail",attrs:{id:"depHeight"}},[s("b",{staticClass:"department-detail-btn",attrs:{type:"info"},on:{click:e.showGroupModal}},[e._v("部门")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择用户部门")]),e._v(" "),s("b",{staticClass:"department-detail-btn",attrs:{type:"info"},on:{click:e.deleteGroup}},[e._v("删除")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除用户部门")]),e._v(" "),s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.departmentData},on:{"on-selection-change":e.selectDeleteGroup}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.total,"show-elevator":"","show-sizer":"",current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),s("Modal",{attrs:{title:"选择部门",width:"300"},on:{"on-ok":e.addDepartment},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("Tree",{staticClass:"dep-tree",attrs:{multiple:!0,data:e.groupData,"load-data":e.loadData},on:{"on-select-change":e.selectNode}})],1)],1)},staticRenderFns:[]};var f={name:"roleMember",components:{},props:{},data:function(){var e=this;return{userId:this.$route.params.userId,rolePage:{total:0,roletotal:0,currentPage:1,rolecurrentPage:1,pageSize:10,allRolepageSize:10},loading:!0,roleLoading:!0,showModal:!1,columns:[{type:"selection",width:60,align:"center"},{title:"职位名称",key:"name"},{title:"职位类型",key:"type",render:function(e,t){var s="";switch(t.row.type){case"Y":s="营销类";break;case"C":s="操作类";break;case"J":s="技术类";break;case"M":s="管理类";break;case"Z":s="专职类"}return e("span",{},s)}},{title:"说明",key:"describe"},{title:"操作",key:"action",width:150,align:"center",render:function(t,s){return t("span",{props:{type:"md-close"},style:{cursor:"pointer",color:"#39f","font-weight":"bold"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此职位？",onOk:function(){Object(i.m)("sys_user_role",e.userId,s.row.id).then(function(t){t.success&&(e.$Message.success(t.message),e.getRoleData(),e.$emit("changeInstance"))})}})}}},"删除")}}],RoleColumns:[{type:"selection",width:60,align:"center"},{title:"职位名称",key:"name"},{title:"职位类型",key:"type",render:function(e,t){var s="";switch(t.row.type){case"Y":s="营销类";break;case"C":s="操作类";break;case"J":s="技术类";break;case"M":s="管理类";break;case"Z":s="专职类"}return e("span",{},s)}},{title:"说明",key:"describe"}],roleData:[],selectRoleData:[],allRoleData:[],selectDeleteRoleData:[]}},methods:{getRoleData:function(){var e=this;this.userId?(this.loading=!0,Object(i.L)(this.userId,this.rolePage.pageSize,this.rolePage.currentPage).then(function(t){e.roleData=t.tableContent,e.rolePage.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.rolePage.currentPage=e,this.getRoleData()},onPageSizeChange:function(e){this.rolePage.pageSize=e,this.getRoleData()},onAllRolePageSizeChange:function(e){this.rolePage.allRolepageSize=e,this.getAllRoleData()},onRolePageChange:function(e){this.rolePage.rolecurrentPage=e,this.getAllRoleData()},selectDeleteRole:function(e){this.selectDeleteRoleData=e},deleteUserRole:function(){var e=this,t=[];0===this.selectDeleteRoleData.length?this.$Message.warning("请先选择要删除的用户职位！"):(this.selectDeleteRoleData.forEach(function(e){t.push(e.id)}),this.$Modal.confirm({title:"确认",content:"确认删除选择的用户职位？",onOk:function(){Object(i.m)("sys_user_role",e.userId,t.join(",")).then(function(t){t.success&&(e.selectDeleteRoleData=[],e.$Message.success(t.message),e.getRoleData(),e.$emit("changeInstance"))})}}))},addRole:function(){var e=this,t=[];this.selectRoleData.length>0?this.selectRoleData.forEach(function(e){t.push(e.id)}):this.$Message.warning("请选择至少一个职位！"),t&&this.userId?Object(i.e)("sys_user_role",this.userId,t.join(",")).then(function(t){t.success&&(e.$Message.success(t.message),e.getRoleData(),e.$emit("changeInstance"))}):this.$Message.warning("无用户ID，请先保存用户再进行编辑！")},onSelectionChange:function(e){this.selectRoleData=e},showRoleModal:function(){this.showModal=!0,this.getAllRoleData()},getAllRoleData:function(){var e=this;this.roleLoading=!0,Object(i.v)(this.rolePage.allRolepageSize,this.rolePage.rolecurrentPage).then(function(t){e.allRoleData=t.tableContent,e.rolePage.roletotal=t.dataCount,e.roleLoading=!1})}},mounted:function(){this.getRoleData()}},p={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"role"},[s("div",{staticClass:"role-detail",attrs:{id:"roleHeight"}},[s("b",{staticClass:"role-detail-btn",on:{click:e.showRoleModal}},[e._v("职位")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择用户职位")]),e._v(" "),s("b",{staticClass:"role-detail-btn",on:{click:e.deleteUserRole}},[e._v("删除")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除用户职位")]),e._v(" "),s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.roleData},on:{"on-selection-change":e.selectDeleteRole}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.rolePage.total,"show-elevator":"","show-sizer":"",current:e.rolePage.currentPage,"page-size":e.rolePage.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),s("Modal",{attrs:{title:"选择用户",width:"1000"},on:{"on-ok":e.addRole},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("Table",{ref:"selection",attrs:{height:"400",loading:e.roleLoading,columns:e.RoleColumns,data:e.allRoleData},on:{"on-selection-change":e.onSelectionChange}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.rolePage.roletotal,"show-elevator":"","show-sizer":"",current:e.rolePage.rolecurrentPage,"page-size":e.rolePage.allRolepageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllRolePageSizeChange,"on-change":e.onRolePageChange}})],1)])],1)],1)},staticRenderFns:[]};var v={name:"directPermission",components:{},props:{},data:function(){var e=this;return{userId:this.$route.params.userId,total:0,currentPage:1,pageSize:10,loading:!0,showModal:!1,columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"name"},{title:"操作",key:"action",width:150,align:"center",render:function(t,s){return t("span",{props:{type:"md-close"},style:{cursor:"pointer",color:"#39f","font-weight":"bold"},on:{click:function(){e.$Modal.confirm({title:"确认",content:"确认删除此权限？",onOk:function(){Object(i.l)(e.userId,s.row.id).then(function(t){t.success&&(e.$Message.success(t.message),e.getDirPermissionData(),e.$emit("changeInstance"))})}})}}},"删除")}}],dirPermissionData:[],allPermissionData:[],selectPermissionNode:[],selectDeletePermission:[]}},methods:{getDirPermissionData:function(){var e=this;this.userId?(this.loading=!0,Object(i.B)(this.userId,this.pageSize,this.currentPage).then(function(t){e.dirPermissionData=t.tableContent,e.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.currentPage=e,this.getDirPermissionData()},onPageSizeChange:function(e){this.pageSize=e,this.getDirPermissionData()},onSelectionChange:function(e){this.selectDeletePermission=e},showAddPermission:function(){this.showModal=!0,this.allPermissionData=[],this.getAllPermissionDatas()},onCheckChange:function(e){this.selectPermissionNode=e},addPermission:function(){var e=this,t=[];this.selectPermissionNode.forEach(function(e){t.push(e.id)}),t&&this.userId&&Object(i.c)(this.userId,t.join(",")).then(function(t){t.success&&(e.selectPermissionNode=[],e.$Message.success(t.message),e.getDirPermissionData(),e.$emit("changeInstance"))})},deletePermission:function(){var e=this,t=[];0===this.selectDeletePermission.length?this.$Message.warning("请先选择要删除的权限！"):(this.selectDeletePermission.forEach(function(e){t.push(e.id)}),t&&this.userId&&this.$Modal.confirm({title:"确认",content:"确认删除已选的权限？",onOk:function(){Object(i.l)(e.userId,t.join(",")).then(function(t){t.success&&(e.selectDeletePermission=[],e.$Message.success(t.message),e.getDirPermissionData(),e.$emit("changeInstance"))})}}))},getAllPermissionDatas:function(){var e=this;0===this.allPermissionData.length&&Object(i.t)(0).then(function(t){t.tableContent.forEach(function(t){e.allPermissionData.push({title:t.name,id:t.id,loading:!1,children:[]})})})},loadData:function(e,t){Object(i.t)(e.id).then(function(e){var s=[];e.tableContent.forEach(function(e){"false"===e.leaf?s.push({title:e.name,id:e.id,loading:!1,children:[]}):s.push({title:e.name,id:e.id})}),t(s)})}},mounted:function(){this.getDirPermissionData()}},w={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"direct"},[s("div",{staticClass:"direct-detail",attrs:{id:"directHeight"}},[s("b",{staticClass:"direct-detail-btn",on:{click:e.showAddPermission}},[e._v("添加权限")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-添加直接权限")]),e._v(" "),s("b",{staticClass:"direct-detail-btn",on:{click:e.deletePermission}},[e._v("删除权限")]),e._v(" "),s("span",{staticStyle:{color:"#7a7676"}},[e._v("-删除直接权限")]),e._v(" "),s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.dirPermissionData},on:{"on-selection-change":e.onSelectionChange}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.total,"show-elevator":"","show-sizer":"",current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),s("Modal",{attrs:{title:"选择权限",width:"400"},on:{"on-ok":e.addPermission},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("Tree",{staticClass:"app-tree",attrs:{data:e.allPermissionData,multiple:!0,"load-data":e.loadData},on:{"on-select-change":e.onCheckChange}})],1)],1)},staticRenderFns:[]};var I={name:"indirectPermission",components:{},props:{},data:function(){return{userId:this.$route.params.userId,total:0,currentPage:1,pageSize:10,loading:!0,columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"name"},{title:"权限来源",key:"origin"}],indirPermissionData:[]}},methods:{getIndirPermissionData:function(){var e=this;this.userId?(this.loading=!0,Object(i.E)(this.userId,this.pageSize,this.currentPage).then(function(t){e.indirPermissionData=t.tableContent,e.total=t.dataCount,e.loading=!1})):this.loading=!1},onPageChange:function(e){this.currentPage=e,this.getIndirPermissionData()},onPageSizeChange:function(e){this.pageSize=e,this.getIndirPermissionData()}},mounted:function(){this.getIndirPermissionData()}},b={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"indirect"},[s("div",{staticClass:"indirect-detail",attrs:{id:"indirectHeight"}},[s("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.loading,data:e.indirPermissionData}}),e._v(" "),s("div",{staticClass:"user-page"},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:e.total,"show-elevator":"","show-sizer":"",current:e.currentPage,"page-size":e.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1)])},staticRenderFns:[]};var D={name:"detail",components:{UserInfo:s("VU/8")(r,l,!1,function(e){s("pdrv")},null,null).exports,HigherUser:s("VU/8")(c,u,!1,function(e){s("l61n")},null,null).exports,LowerUser:s("VU/8")(h,d,!1,function(e){s("Bz59")},null,null).exports,DepartmentMember:s("VU/8")(g,m,!1,function(e){s("AbXD")},null,null).exports,RoleMember:s("VU/8")(f,p,!1,function(e){s("h2MA")},null,null).exports,DirectPermission:s("VU/8")(v,w,!1,function(e){s("6iZP")},"data-v-99cb6d3a",null).exports,IndirectPermission:s("VU/8")(I,b,!1,function(e){s("Cu9Y")},null,null).exports},props:{},data:function(){return{userId:this.$route.params.userId,showTag:!0,whichShow:{userinfo:!0,highuser:!1,lowuser:!1,dep:!1,role:!1,dirper:!1,indirper:!1},userInformation:{},relativeInstance:[{name:"间接权限",showName:"indirper",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/1_4.png"},{name:"直接权限",showName:"dirper",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/1_4.png"},{name:"用户职位",showName:"role",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/job.png"},{name:"用户部门",showName:"dep",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/organization.png"},{name:"下级用户",showName:"lowuser",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/user.png"},{name:"上级用户",showName:"highuser",isShow:!0,isShowAcive:!1,relativeNum:1,imgUrl:"resources/images/icon/user.png"},{name:"用户信息",showName:"userinfo",isShow:!0,isShowAcive:!0,imgUrl:"resources/images/icon/user.png"}]}},created:function(){},methods:{onClickTab:function(e){var t=this;this.relativeInstance.forEach(function(s,a){e===a?(s.isShowAcive=!0,t.whichShow[s.showName]=!0):(s.isShowAcive=!1,t.whichShow[s.showName]=!1)})},getUserInfoData:function(){var e=this;this.userId&&Object(i.N)(this.userId).then(function(t){e.userInformation=t.tableContent[0]})},goBack:function(){this.$router.push({path:"/addressBook/user/board"})},getInstanceCount:function(){var e=this;this.userId&&Object(i.F)(this.userId).then(function(t){e.relativeInstance[0].relativeNum=t.SysPermission,e.relativeInstance[1].relativeNum=t.objectPermission,e.relativeInstance[2].relativeNum=t.role,e.relativeInstance[3].relativeNum=t.group,e.relativeInstance[4].relativeNum=t.subordinate,e.relativeInstance[5].relativeNum=t.superior})}},mounted:function(){this.getUserInfoData(),this.getInstanceCount();var e=document.body.clientHeight-165;window.document.getElementsByClassName("detail-content")[0].style.height=e+"px"}},C={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Row",{staticClass:"detail"},[s("Row",{staticClass:"detail-header"},[s("Breadcrumb",{staticClass:"detail-header-bread"},[s("BreadcrumbItem",{attrs:{to:"/addressBook/user/board"}},[e._v("用户")]),e._v(" "),s("BreadcrumbItem",[e._v(e._s(e.userInformation.nickname?e.userInformation.nickname:"待添加"))]),e._v(" "),s("BreadcrumbItem",[e._v(e._s(e.userInformation.userCode?e.userInformation.userCode:"创建"))])],1),e._v(" "),s("Tag",{directives:[{name:"show",rawName:"v-show",value:e.userInformation.status?e.showTag:!e.showTag,expression:"userInformation.status?showTag:!showTag"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.userInformation.status,color:"#eb2f96"},expression:"{status:userInformation.status,color:'#eb2f96'}"}],staticClass:"radius10 marlr10 color_fff"})],1),e._v(" "),s("Row",{staticClass:"detail-header"},[s("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.goBack}},[e._v("返回")])],1),e._v(" "),s("Row",{staticClass:"detail-tabs"},e._l(e.relativeInstance,function(t,a){return(e.userInformation.userId?t.isShow:t.isShowAcive)?s("div",{key:a,class:{"detail-tabs-child":!0,active:t.isShowAcive},on:{click:function(t){e.onClickTab(a)}}},[s("img",{attrs:{src:t.imgUrl}}),e._v(" "),s("div",{staticClass:"detail-tabs-child-right"},[s("span",[e._v(e._s(t.relativeNum))]),e._v(" "),s("p",[e._v(e._s(t.name))])])]):e._e()})),e._v(" "),s("Row",{staticClass:"detail-content"},[s("user-info",{directives:[{name:"show",rawName:"v-show",value:e.whichShow.userinfo,expression:"whichShow.userinfo"}],attrs:{userInfo:e.userInformation}}),e._v(" "),e.whichShow.highuser?s("higher-user",{on:{changeInstance:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.lowuser?s("lower-user",{on:{changeInstance:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.dep?s("department-member",{on:{changeInstance:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.role?s("role-member",{on:{changeInstance:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.dirper?s("direct-permission",{on:{changeInstance:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.indirper?s("indirect-permission",{on:{changeInstance:e.getInstanceCount}}):e._e()],1)],1)},staticRenderFns:[]};var _=s("VU/8")(D,C,!1,function(e){s("0al4")},null,null);t.default=_.exports},"6iZP":function(e,t){},AbXD:function(e,t){},Bz59:function(e,t){},Cu9Y:function(e,t){},h2MA:function(e,t){},l61n:function(e,t){},pdrv:function(e,t){}});
//# sourceMappingURL=1.6fd7d862661406b8eb65.js.map