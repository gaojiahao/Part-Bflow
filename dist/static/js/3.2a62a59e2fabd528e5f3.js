webpackJsonp([3],{"5Nq0":function(e,t){},Et7m:function(e,t){},PhVx:function(e,t){},"Z6x+":function(e,t){},j2BI:function(e,t){},l6be:function(e,t){},lDxA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("oAV5"),n=a("o32f"),i={data:function(){return{httpHeaders:{Authorization:Object(o.b)()},logo:"",visible:!1,baseInfoItem:{groupName:"",groupShortName:"",depFunction:"",status:"",comment:""},ruleValidate:{groupName:[{required:!0,message:"请输入公司名称",trigger:"blur"}]}}},methods:{handleSuccess:function(e,t){this.logo="/H_roleplay-si/ds/download?width=128&height=128&specify=true&url="+e.data[0].attacthment},handleView:function(){this.visible=!0},handleRemove:function(){this.logo="",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},handleMaxSize:function(e){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(e){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})},addCompanyData:function(){var e=this,t=this.baseInfoItem,a={groupName:t.groupName,groupShortName:t.groupShortName,depFunction:t.depFunction,status:t.status,comment:t.comment,groupCode:this.guid(),groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n.X)(a).then(function(t){"add"==e.$route.name?e.$route.name:e.$route.params.groupId;t.success?(e.$Message.info("保存成功"),e.$router.push({path:"/addressBook/companyInfo/board"})):e.$Message.error(t.message)})})},getCompanyInfo:function(e){var t=this;Object(n.y)(e).then(function(e){t.baseInfoItem=e[0],t.logo=e[0].groupPic,t.baseInfoItem.status=String(t.baseInfoItem.status)})},guid:function(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},goCompanyList:function(){this.$router.push({path:"/addressBook/companyInfo/board"})},saveAndAddCompany:function(){var e=this,t=this.baseInfoItem,a={groupName:t.groupName,groupShortName:t.groupShortName,depFunction:t.depFunction,status:t.status,comment:t.comment,groupCode:this.guid(),groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n.X)(a).then(function(t){"add"==e.$route.name?e.$route.name:e.$route.params.groupId;t.success?(e.$Message.info("保存成功"),e.$refs.baseInfoItem.resetFields(),e.logo="",e.baseInfoItem.groupName="",e.baseInfoItem.groupShortName="",e.baseInfoItem.status="1",e.baseInfoItem.depFunction="",e.baseInfoItem.comment="",e.$refs.upload.fileList.splice(0,e.$refs.upload.fileList.length)):e.$Message.error(t.message)})})},updateCompanyData:function(){var e=this,t=this.baseInfoItem,a="add"==this.$route.name?this.$route.name:this.$route.params.groupId,o={groupName:t.groupName,groupShortName:t.groupShortName,depFunction:t.depFunction,status:t.status,comment:t.comment,groupId:a,groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n._0)(o).then(function(t){t.success?e.$Message.info("更新成功"):e.$Message.error(t.message)})})}},mounted:function(){var e="add"==this.$route.name?this.$route.name:this.$route.params.groupId;"add"!=e&&this.getCompanyInfo(e)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"baseInfo"},[a("div",{staticClass:"baseInfo-warp"},[a("div",{staticClass:"baseInfo-body"},[a("div",{staticClass:"uploadImg"},[a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"128px","vertical-align":"middle"},attrs:{"show-upload-list":!1,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,multiple:"",type:"drag",action:"/H_roleplay-si/ds/upload",headers:e.httpHeaders}},[e.logo?e._e():a("div",{staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[e.logo?a("img",{attrs:{src:e.logo}}):e._e(),e._v(" "),e.logo?e._e():a("i",{staticClass:"iconfont"},[e._v("")])]),e._v(" "),e.logo?a("div",{staticClass:"demo-upload-list",staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[a("img",{attrs:{src:e.logo}}),e._v(" "),a("div",{staticClass:"demo-upload-list-cover"},[a("Icon",{attrs:{type:"ios-eye-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleView(t)}}}),e._v(" "),a("Icon",{attrs:{type:"ios-trash-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleRemove(t)}}})],1)]):e._e()]),e._v(" "),a("Modal",{attrs:{title:"查看头像"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.logo}}):e._e()])],1),e._v(" "),a("Form",{ref:"baseInfoItem",attrs:{model:e.baseInfoItem,"label-width":80,rules:e.ruleValidate}},[a("FormItem",{attrs:{label:"公司名称",prop:"groupName"}},[a("Input",{model:{value:e.baseInfoItem.groupName,callback:function(t){e.$set(e.baseInfoItem,"groupName",t)},expression:"baseInfoItem.groupName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"公司简称"}},[a("Input",{model:{value:e.baseInfoItem.groupShortName,callback:function(t){e.$set(e.baseInfoItem,"groupShortName",t)},expression:"baseInfoItem.groupShortName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"公司类型"}},[a("RadioGroup",{model:{value:e.baseInfoItem.depFunction,callback:function(t){e.$set(e.baseInfoItem,"depFunction",t)},expression:"baseInfoItem.depFunction"}},[a("Radio",{attrs:{label:"有限责任公司"}}),e._v(" "),a("Radio",{attrs:{label:"股份有限公司"}}),e._v(" "),a("Radio",{attrs:{label:"集团公司"}}),e._v(" "),a("Radio",{attrs:{label:"有限合伙"}}),e._v(" "),a("Radio",{attrs:{label:"普通合伙"}}),e._v(" "),a("Radio",{attrs:{label:"个人独资"}}),e._v(" "),a("Radio",{attrs:{label:"子公司"}})],1)],1),e._v(" "),a("FormItem",{attrs:{label:"公司状态"}},[a("Select",{model:{value:e.baseInfoItem.status,callback:function(t){e.$set(e.baseInfoItem,"status",t)},expression:"baseInfoItem.status"}},[a("Option",{attrs:{value:"3"}},[e._v("草稿")]),e._v(" "),a("Option",{attrs:{value:"2"}},[e._v("未使用")]),e._v(" "),a("Option",{attrs:{value:"1"}},[e._v("使用中")]),e._v(" "),a("Option",{attrs:{value:"0"}},[e._v("停用")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"公司说明"}},[a("Input",{attrs:{type:"textarea",rows:3},model:{value:e.baseInfoItem.comment,callback:function(t){e.$set(e.baseInfoItem,"comment",t)},expression:"baseInfoItem.comment"}})],1)],1)],1)]),e._v(" "),a("Row",{staticClass:"info-btn"},[e.baseInfoItem.groupId?a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.updateCompanyData}},[e._v("更新")]):a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.addCompanyData}},[e._v("保存")]),e._v(" "),a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.goCompanyList}},[e._v("取消")]),e._v(" "),e.baseInfoItem.groupId?e._e():a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff"},on:{click:e.saveAndAddCompany}},[e._v("保存并继续添加")])],1)],1)},staticRenderFns:[]};var r=a("VU/8")(i,s,!1,function(e){a("5Nq0")},"data-v-0646c5aa",null).exports,l={data:function(){var e=this;return{columns1:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{style:{color:"#39f"}},0===t.row.gender?"女":1===t.row.gender?"男":"未知")}},{title:"手机",key:"mobile"},{title:"邮箱",key:"email"},{title:"修改时间",key:"modTime"},{title:"创建时间",key:"crtTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delCompanyMemberOne(a.index)}}},"删除")])}}],columns2:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",width:100,key:"gender"},{title:"手机",width:150,key:"mobile"},{title:"邮箱",width:150,key:"email"},{title:"创建时间",width:150,key:"crtTime"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}}],groupId:this.$route.params.groupId,memberData:[],pageTotal:0,memberLoading:!1,memberCurrentPage:1,pageSize:10,showModal:!1,allMemberLoading:!1,allMemberTotal:0,allMemberCurrentPage:1,allMemberPageSize:10,allMemberData:[],target:4,memberSelectionData:[],nowMemberselectionData:[]}},methods:{getAllUser:function(){var e=this;this.allMemberLoading=!0,Object(n.w)(this.allMemberCurrentPage,this.allMemberPageSize).then(function(t){t.tableContent[0]&&(e.allMemberData=t.tableContent,e.allMemberTotal=t.summary.total,e.allMemberLoading=!1)})},getCompanyMember:function(){var e=this;this.memberLoading=!0,Object(n.D)(this.groupId,this.allMemberCurrentPage,this.allMemberPageSize).then(function(t){e.memberData=t.tableContent,e.pageTotal=t.dataCount,e.memberLoading=!1})},delCompanyMember:function(){var e=this,t=[];this.nowMemberselectionData.length>0?(this.nowMemberselectionData.forEach(function(e){t.push(e.userId)}),this.$Modal.confirm({title:"确认",content:"确认批量删除成员？",onOk:function(){Object(n.T)(t,e.groupId).then(function(t){t.success&&(e.$Message.success("删除成功!"),e.getCompanyMember())})}})):this.$Message.warning("请选择至少一个成员！")},delCompanyMemberOne:function(e){var t=this,a=[];a.push(this.memberData[e].userId),this.$Modal.confirm({title:"确认",content:"确认删除此成员？",onOk:function(){Object(n.T)(a,t.groupId).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.getCompanyMember())})}})},pageChange:function(e){this.getCompanyMember(e,this.pageSize)},showAllMember:function(){this.showModal=!0,this.getAllUser()},onSelectionChange:function(e){this.memberSelectionData=e},onMemberSelectionChange:function(e){this.nowMemberselectionData=e},onMemberPageChange:function(e){this.allMemberCurrentPage=e,this.getAllUser()},onAllMemberPageSizeChange:function(e){this.allMemberPageSize=e,this.getAllUser()},addCompanyMember:function(){var e=this,t=[];this.memberSelectionData.length>0?(this.memberSelectionData.forEach(function(e){t.push(e.userId)}),Object(n.a)(t,this.groupId).then(function(t){t.success&&(e.$Message.success("新增成功!"),e.getCompanyMember())})):this.$Message.warning("请选择至少一个公司！")}},mounted:function(){this.getCompanyMember()}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-wrap"},[a("div",{staticClass:"member-wrap-table"},[a("b",{staticClass:"member-wrap-table-btn",on:{click:e.showAllMember}},[e._v("添加成员")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择成员")]),e._v(" "),a("b",{staticClass:"member-wrap-table-btn",on:{click:e.delCompanyMember}},[e._v("删除")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除成员")]),e._v(" "),a("br"),e._v(" "),a("Table",{attrs:{loading:e.memberLoading,columns:e.columns1,data:e.memberData},on:{"on-selection-change":e.onMemberSelectionChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.pageTotal,current:e.memberCurrentPage,"page-size":e.pageSize,size:"small","show-sizer":"","show-elevator":""},on:{"on-change":e.pageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择公司成员",width:"1000"},on:{"on-ok":e.addCompanyMember},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.allMemberLoading,columns:e.columns2,data:e.allMemberData},on:{"on-selection-change":e.onSelectionChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.allMemberTotal,"show-elevator":"","show-sizer":"",current:e.allMemberCurrentPage,"page-size":e.allMemberPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllMemberPageSizeChange,"on-change":e.onMemberPageChange}})],1)])],1)],1)},staticRenderFns:[]};var m=a("VU/8")(l,c,!1,function(e){a("l6be")},"data-v-3009b6ae",null).exports,u=a("fZjL"),h=a.n(u),g={data:function(){var e=this;return{groupId:this.$route.params.groupId,higherLoading:!1,higherCompanyData:[],higherCompanyTotal:0,higherCompanyCurrentPage:1,higherCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{type:"index",width:60,align:"center"},{title:"公司ID",key:"groupId"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"depFunction"},{title:"修改时间",key:"modTime"},{title:"创建时间",key:"crtTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}}],columns1:[{type:"index",width:60,align:"center"},{title:"公司ID",key:"groupId"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"depFunction"},{title:"修改时间",key:"modTime"},{title:"创建时间",key:"crtTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delCompany(a.index)}}},"删除")])}}],selectCompanyData:{},showModal:!1}},methods:{getAllCompanyList:function(){var e=this;this.companyLoading=!0,Object(n.z)(this.groupId,3,this.companyCurrentPage,this.companyPageSize).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount,e.companyLoading=!1})},getHigherCompanyData:function(){var e=this;this.higherLoading=!0,Object(n.z)(this.groupId,1,this.higherCompanyCurrentPage,this.higherCompanyPageSize).then(function(t){e.higherCompanyData=t,e.higherCompanyTotal=t.length,e.higherLoading=!1})},onSelectionChange:function(e){this.selectCompanyData=e},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList()},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getHigherCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getHigherCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e},addHigherCompany:function(){var e=this,t=void 0;h()(this.selectCompanyData).length>0?(t=this.selectCompanyData.groupId,Object(n.b)(this.groupId,t).then(function(t){t.success&&(e.$Message.success("新增成功!"),e.getHigherCompanyData())})):this.$Message.warning("请选择至少一个公司！")},delCompany:function(e){var t=this;this.$Modal.confirm({title:"确认",content:"确认删除上级公司？",onOk:function(){Object(n.S)([t.groupId]).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.getHigherCompanyData())})}})}},mounted:function(){this.getHigherCompanyData()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"higher-company"},[a("div",{staticClass:"higher-company-detail",attrs:{id:"cliHeight"}},[a("b",{staticClass:"higher-company-detail-btn",on:{click:e.showCompanyModal}},[e._v("添加公司")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择上级公司")]),e._v(" "),a("br"),e._v(" "),a("Table",{ref:"selection",attrs:{columns:e.columns1,loading:e.higherLoading,data:e.higherCompanyData}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.higherCompanyTotal,"show-elevator":"","show-sizer":"",current:e.higherCompanyCurrentPage,"page-size":e.higherCompanyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择用户",width:"1000"},on:{"on-ok":e.addHigherCompany},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.companyLoading,columns:e.columns,data:e.companyData},on:{"on-row-click":e.onSelectionChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.companyTotal,"show-elevator":"","show-sizer":"",current:e.companyCurrentPage,"page-size":e.companyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllCompanyPageSizeChange,"on-change":e.onCompanyPageChange}})],1)])],1)],1)},staticRenderFns:[]};var d={data:function(){var e=this;return{groupId:this.$route.params.groupId,lowerLoading:!1,lowerCompanyData:[],lowerCompanyTotal:0,lowerCompanyCurrentPage:1,lowerCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"公司ID",key:"groupId"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"depFunction"},{title:"修改时间",key:"modTime"},{title:"创建时间",key:"crtTime"},{title:"创建者",key:"principalInfo.nikeName"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delLowerCompanyOne(a.index)}}},"删除")])}}],columns1:[{type:"selection",width:60,align:"center"},{type:"index",width:60,align:"center"},{title:"公司ID",key:"groupId"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"depFunction"},{title:"修改时间",key:"modTime"},{title:"创建时间",key:"crtTime"},{title:"创建者",key:"principalInfo.nikeName"},{title:"状态",key:"status",render:function(e,t){return e("span",{style:{color:"#39f"}},1===t.row.status?"使用中":0===t.row.status?"停用":"未使用")}}],selectCompanyData:{},deleteCompanyData:[],showModal:!1}},methods:{getAllCompanyList:function(){var e=this;this.companyLoading=!0,Object(n.z)(this.groupId,3,this.companyCurrentPage,this.companyPageSize).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount,e.companyLoading=!1})},getlowerCompanyData:function(){var e=this;this.lowerLoading=!0,Object(n.z)(this.groupId,2,this.lowerCompanyCurrentPage,this.lowerCompanyPageSize).then(function(t){e.lowerCompanyData=t.tableContent,e.lowerCompanyTotal=t.dataCount,e.lowerLoading=!1})},onSelectionChange:function(e){this.selectCompanyData=e},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList()},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getlowerCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getlowerCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e},addlowerCompany:function(){var e=this,t=[];this.selectCompanyData.length>0?(this.selectCompanyData.forEach(function(e){t.push(e.groupId)}),Object(n.d)(t,this.groupId).then(function(t){t.success&&(e.$Message.success("新增成功"),e.getlowerCompanyData())})):this.$Message.warning("请选择至少一个公司！")},delCompany:function(){var e=this,t=[];this.deleteCompanyData.length>0?(this.deleteCompanyData.forEach(function(e){t.push(e.groupId)}),this.$Modal.confirm({title:"确认",content:"确认批量删除下级公司？",onOk:function(){Object(n.S)(t).then(function(t){t.success&&(e.$Message.success("删除成功!"),e.getlowerCompanyData())})}})):this.$Message.warning("请选择至少一个公司！")},delLowerCompanyOne:function(e){var t=this,a=[];a.push(this.lowerCompanyData[e].groupId),this.$Modal.confirm({title:"确认",content:"确认删除此下级公司？",onOk:function(){Object(n.S)(a).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.getlowerCompanyData())})}})},delCompanyChange:function(e){this.deleteCompanyData=e}},mounted:function(){this.getlowerCompanyData()}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"lower-company"},[a("div",{staticClass:"lower-company-detail",attrs:{id:"cliHeight"}},[a("b",{staticClass:"lower-company-detail-btn",on:{click:e.showCompanyModal}},[e._v("添加公司")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择下级公司")]),e._v(" "),a("b",{staticClass:"lower-company-detail-btn",on:{click:e.delCompany}},[e._v("删除")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除下级公司")]),e._v(" "),a("br"),e._v(" "),a("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.lowerLoading,data:e.lowerCompanyData},on:{"on-selection-change":e.delCompanyChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.lowerCompanyTotal,"show-elevator":"","show-sizer":"",current:e.lowerCompanyCurrentPage,"page-size":e.lowerCompanyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择下级公司",width:"1000"},on:{"on-ok":e.addlowerCompany},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.companyLoading,columns:e.columns1,data:e.companyData},on:{"on-selection-change":e.onSelectionChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.companyTotal,"show-elevator":"","show-sizer":"",current:e.companyCurrentPage,"page-size":e.companyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllCompanyPageSizeChange,"on-change":e.onCompanyPageChange}})],1)])],1)],1)},staticRenderFns:[]};var y={components:{BaseInfo:r,MemberInfo:m,HigherCompany:a("VU/8")(g,p,!1,function(e){a("Et7m")},null,null).exports,LowerCompany:a("VU/8")(d,f,!1,function(e){a("Z6x+")},null,null).exports},data:function(){return{groupId:this.$route.params.groupId,whichShow:{baseInfo:!0,higherCompany:!1,lowerCompany:!1,member:!1},companyInformation:{nickname:"",userCode:"",status:3},relativeInstance:[{name:"下级公司",showName:"lowerCompany",isShow:!0,isShowAcive:!1,imgUrl:"resources/images/icon/company.png"},{name:"上级公司",showName:"higherCompany",isShow:!0,isShowAcive:!1,imgUrl:"resources/images/icon/company.png"},{name:"公司成员",showName:"member",isShow:!0,isShowAcive:!1,imgUrl:"resources/images/icon/user.png"},{name:"公司信息",showName:"baseInfo",isShow:!0,isShowAcive:!0,imgUrl:"resources/images/icon/company.png"}]}},methods:{onClickTab:function(e){var t=this;this.relativeInstance.forEach(function(a,o){e===o?(a.isShowAcive=!0,t.whichShow[a.showName]=!0):(a.isShowAcive=!1,t.whichShow[a.showName]=!1)})},getCompanyInfo:function(e){var t=this;Object(n.y)(e).then(function(e){t.companyInformation=e[0]})},getInstanceCount:function(){var e=this;Object(n.G)(this.groupId).then(function(t){e.relativeInstance[2].relativeNum=t.groupUser,e.relativeInstance[0].relativeNum=t.subord})}},mounted:function(){var e=document.body.clientHeight-120;window.document.getElementsByClassName("detail-content")[0].style.height=e+"px";var t="add"==this.$route.name?this.$route.name:this.$route.params.groupId;"add"!=t&&(this.getCompanyInfo(t),this.getInstanceCount())}},C={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-wrap"},[a("Row",{staticClass:"detail-header"},[a("Breadcrumb",{staticClass:"detail-header-bread"},[a("BreadcrumbItem",{attrs:{to:"/addressBook/companyInfo/board"}},[e._v("公司")]),e._v(" "),a("BreadcrumbItem",[e._v(e._s(e.companyInformation.groupName?e.companyInformation.groupShortName:"待添加"))]),e._v(" "),a("BreadcrumbItem",[e._v(e._s(e.companyInformation.groupId?e.companyInformation.groupId:"创建"))])],1),e._v(" "),a("Tag",{directives:[{name:"show",rawName:"v-show",value:e.companyInformation.status,expression:"companyInformation.status"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.companyInformation.status,color:"#eb2f96"},expression:"{status:companyInformation.status,color:'#eb2f96'}"}],staticClass:"radius10 marlr10 color_fff"})],1),e._v(" "),a("Row",{staticClass:"detail-tabs"},e._l(e.relativeInstance,function(t,o){return(e.groupId?t.isShow:t.isShowAcive)?a("div",{key:o,class:{"detail-tabs-child":!0,active:t.isShowAcive},on:{click:function(t){e.onClickTab(o)}}},[a("img",{attrs:{src:t.imgUrl}}),e._v(" "),a("div",{staticClass:"detail-tabs-child-right"},[t.relativeNum?a("span",[e._v(e._s(t.relativeNum))]):a("span",[e._v(" ")]),e._v(" "),a("p",[e._v(e._s(t.name))])])]):e._e()})),e._v(" "),a("Row",{staticClass:"detail-content"},[e.whichShow.baseInfo?a("base-info"):e._e(),e._v(" "),e.whichShow.member?a("member-info"):e._e(),e._v(" "),e.whichShow.higherCompany?a("higher-company"):e._e(),e._v(" "),e.whichShow.lowerCompany?a("lower-company"):e._e()],1)],1)},staticRenderFns:[]};var b=a("VU/8")(y,C,!1,function(e){a("j2BI"),a("PhVx")},"data-v-c5acacca",null);t.default=b.exports}});
//# sourceMappingURL=3.2a62a59e2fabd528e5f3.js.map