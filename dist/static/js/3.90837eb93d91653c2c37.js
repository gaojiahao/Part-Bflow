webpackJsonp([3],{"0G49":function(e,t){},FuCs:function(e,t){},JTFA:function(e,t){},P6Zr:function(e,t){},b8v0:function(e,t){},lDxA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("oAV5"),n=a("o32f"),i={data:function(){return{httpHeaders:{Authorization:Object(o.c)()},logo:"",visible:!1,isEdit:!0,isAdd:!0,cacheGroupName:"",cacheShortName:"",baseInfoItem:{groupName:"",groupShortName:"",companyType:"",status:"1"},ruleValidate:{groupName:[{required:!0,validator:this.groupNameValidator,trigger:"blur"}],groupShortName:[{required:!0,validator:this.groupShortNameValidator,trigger:"blur"}],companyType:[{required:!0,message:"请选择公司类型",trigger:"change"}]}}},methods:{handleSuccess:function(e,t){this.logo="/H_roleplay-si/ds/download?width=128&height=128&specify=true&url="+e.data[0].attacthment},handleView:function(){this.visible=!0},handleRemove:function(){this.logo="",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},handleMaxSize:function(e){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(e){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})},addCompanyData:function(){var e=this,t=this.baseInfoItem,a={groupName:t.groupName,groupShortName:t.groupShortName,companyType:t.companyType,status:t.status,groupCode:this.guid(),groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n._0)(a).then(function(t){"company-add"==e.$route.name||e.$route.params.groupId;t[0].groupId?(e.$Message.info("保存成功"),e.$router.push({path:"/addressBook/companyInfo/baseInfo/"+t[0].groupId}),window.location.reload()):e.$Message.error(t.message)})})},getCompanyInfo:function(e){var t=this;Object(n.C)(e).then(function(e){if(e.length>0)switch(t.baseInfoItem=e[0],t.logo=e[0].groupPic,t.cacheShortName=e[0].groupShortName,t.cacheGroupName=e[0].groupName,t.baseInfoItem.status=String(t.baseInfoItem.status),t.baseInfoItem.status){case"1":t.baseInfoItem.statusText="使用中";break;case"-1":t.baseInfoItem.statusText="停用";break;case"2":t.baseInfoItem.statusText="未使用";break;default:t.baseInfoItem.statusText="草稿"}})},guid:function(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},isEditCompanyInfo:function(){this.isEdit=!this.isEdit},saveAndAddCompany:function(){var e=this,t=this.baseInfoItem,a={groupName:t.groupName,groupShortName:t.groupShortName,companyType:t.companyType,status:t.status,groupCode:this.guid(),groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n._0)(a).then(function(t){"company-add"==e.$route.name||e.$route.params.groupId;t[0].groupId?(e.$Message.info("保存成功"),e.$refs.baseInfoItem.resetFields(),e.logo="",e.baseInfoItem.groupName="",e.baseInfoItem.groupShortName="",e.baseInfoItem.status="1",e.baseInfoItem.companyType="",e.$refs.upload.fileList.splice(0,e.$refs.upload.fileList.length)):e.$Message.error(t.message)})})},updateCompanyData:function(){var e=this,t=this.baseInfoItem,a="company-add"==this.$route.name?"add":this.$route.params.groupId,o={groupName:t.groupName,groupShortName:t.groupShortName,companyType:t.companyType,status:t.status,groupId:a,groupPic:this.logo};this.$refs.baseInfoItem.validate(function(t){t&&Object(n._6)(o).then(function(t){t.success?(e.$Message.success("更新成功"),window.location.reload()):e.$Message.error(t.message)})})},groupNameValidator:function(e,t,a){var o=this;if(!t)return a(new Error("请输入公司名称"));if(this.cacheGroupName!=t){var i={name:"groupName",value:t},s="company-add"==this.$route.name?"add":this.$route.params.groupId;Object(n.j)(i,s).then(function(e){return 0==!e.result?(o.$Message.error("公司名称已存在！请重新输入"),a(new Error(" "))):a()})}else a()},groupShortNameValidator:function(e,t,a){var o=this;if(!t)return this.$Message.error("请输入公司简称"),a(new Error("请输入公司简称"));if(this.cacheShortName!=t){var i={name:"groupShortName",value:t},s="company-add"==this.$route.name?"add":this.$route.params.groupId;Object(n.j)(i,s).then(function(e){return 0==!e.result?(o.$Message.error("公司简称已存在！请重新输入"),a(new Error(" "))):a()})}else a()},toCompanyLst:function(){this.$Modal.confirm({title:"系统提示",content:"确认要关闭当前页面吗？",onOk:function(){location.href="/Site/index.html#page/companys"}})}},mounted:function(){var e="company-add"==this.$route.name?"add":this.$route.params.groupId;if("add"==e)return this.isEdit=!1,void(this.isAdd=!1);this.getCompanyInfo(e)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"baseInfo"},[a("div",{staticClass:"baseInfo-warp"},[a("div",{staticClass:"baseInfo-body"},[a("Form",{ref:"baseInfoItem",class:{"is-required":e.isEdit},attrs:{model:e.baseInfoItem,"label-width":100,rules:e.ruleValidate}},[a("FormItem",{attrs:{label:"公司照片:"}},[a("div",{staticClass:"uploadImg"},[e.isEdit?a("img",{attrs:{src:!!e.logo&&e.logo}}):a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"128px","vertical-align":"middle"},attrs:{"show-upload-list":!1,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,multiple:"",type:"drag",action:"/H_roleplay-si/ds/upload",headers:e.httpHeaders}},[e.logo?e._e():a("div",{staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[e.logo?a("img",{attrs:{src:e.logo}}):e._e(),e._v(" "),e.logo?e._e():a("i",{staticClass:"iconfont"},[e._v("")])]),e._v(" "),e.logo?a("div",{staticClass:"demo-upload-list",staticStyle:{width:"128px",height:"128px","line-height":"128px"}},[a("img",{attrs:{src:e.logo}}),e._v(" "),a("div",{staticClass:"demo-upload-list-cover"},[a("Icon",{attrs:{type:"ios-eye-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleView(t)}}}),e._v(" "),a("Icon",{attrs:{type:"ios-trash-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),e.handleRemove(t)}}})],1)]):e._e()]),e._v(" "),a("Modal",{attrs:{title:"查看头像"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.logo}}):e._e()])],1)]),e._v(" "),a("FormItem",{attrs:{label:"公司名称:",prop:"groupName"}},[a("Input",{class:{"info-edit":e.isEdit},attrs:{readonly:e.isEdit},model:{value:e.baseInfoItem.groupName,callback:function(t){e.$set(e.baseInfoItem,"groupName",t)},expression:"baseInfoItem.groupName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"公司简称:",prop:"groupShortName"}},[a("Input",{class:{"info-edit":e.isEdit},attrs:{readonly:e.isEdit},model:{value:e.baseInfoItem.groupShortName,callback:function(t){e.$set(e.baseInfoItem,"groupShortName",t)},expression:"baseInfoItem.groupShortName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"公司类型:",prop:"companyType"}},[e.isEdit?a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.companyType))]):a("Select",{attrs:{disabled:e.isEdit},model:{value:e.baseInfoItem.companyType,callback:function(t){e.$set(e.baseInfoItem,"companyType",t)},expression:"baseInfoItem.companyType"}},[a("Option",{attrs:{value:"有限责任公司"}},[e._v("有限责任公司")]),e._v(" "),a("Option",{attrs:{value:"股份有限公司"}},[e._v("股份有限公司")]),e._v(" "),a("Option",{attrs:{value:"集团公司"}},[e._v("集团公司")]),e._v(" "),a("Option",{attrs:{value:"有限合伙"}},[e._v("有限合伙")]),e._v(" "),a("Option",{attrs:{value:"普通合伙"}},[e._v("普通合伙")]),e._v(" "),a("Option",{attrs:{value:"个人独资"}},[e._v("个人独资")]),e._v(" "),a("Option",{attrs:{value:"子公司"}},[e._v("子公司")]),e._v(" "),a("Option",{attrs:{value:"其他"}},[e._v("其他")])],1)],1)],1)],1),e._v(" "),a("div",{staticStyle:{"margin-top":"5px",background:"#fff",padding:"50px 110px 10px 118px"}},[a("Form",{attrs:{"label-width":80}},[a("FormItem",{attrs:{label:"公司状态:"}},[e.isEdit?a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.statusText))]):a("Select",{attrs:{disabled:e.isEdit},model:{value:e.baseInfoItem.status,callback:function(t){e.$set(e.baseInfoItem,"status",t)},expression:"baseInfoItem.status"}},[a("Option",{attrs:{value:"3"}},[e._v("草稿")]),e._v(" "),a("Option",{attrs:{value:"2"}},[e._v("未使用")]),e._v(" "),a("Option",{attrs:{value:"1"}},[e._v("使用中")]),e._v(" "),a("Option",{attrs:{value:"-1"}},[e._v("停用")])],1)],1),e._v(" "),e.isAdd&&e.isEdit?a("FormItem",{attrs:{label:"创建者:"}},[a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.creator))])]):e._e(),e._v(" "),e.isAdd&&e.isEdit?a("FormItem",{attrs:{label:"创建时间:"}},[a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.crtTime))])]):e._e(),e._v(" "),e.isAdd&&e.isEdit?a("FormItem",{attrs:{label:"修改者:"}},[a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.modifier))])]):e._e(),e._v(" "),e.isAdd&&e.isEdit?a("FormItem",{attrs:{label:"修改时间:"}},[a("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e.baseInfoItem.modTime))])]):e._e()],1)],1)]),e._v(" "),a("Row",{staticClass:"info-btn"},[a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(81, 90, 110) !important",color:"#fff","font-weight":"bold"},on:{click:e.toCompanyLst}},[e._v("关闭")]),e._v(" "),e.isAdd?a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff","font-weight":"bold"},on:{click:e.isEditCompanyInfo}},[e._v(e._s(e.isEdit?"编辑":"放弃编辑"))]):e._e(),e._v(" "),e.baseInfoItem.groupId&&!e.isEdit?a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff","font-weight":"bold"},on:{click:e.updateCompanyData}},[e._v("保存")]):e.isEdit||e.isAdd?e._e():a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff","font-weight":"bold"},on:{click:e.addCompanyData}},[e._v("保存")]),e._v(" "),e.baseInfoItem.groupId||e.isEdit||e.isAdd?e._e():a("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff","font-weight":"bold"},on:{click:e.saveAndAddCompany}},[e._v("保存并新建")])],1)],1)},staticRenderFns:[]};var r=a("D8HT")(i,s,!1,function(e){a("saZu")},null,null).exports,l=a("Sxqw"),c=a.n(l),m={data:function(){var e=this;return{columns1:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo}})])}},{title:"工号",key:"userCode"},{title:"姓名",key:"nickname"},{title:"性别",key:"gender",render:function(e,t){return e("span",{style:{color:"#39f"}},0===t.row.gender?"女":1===t.row.gender?"男":"未知")}},{title:"手机",key:"mobile"},{title:"邮箱",key:"email",width:180},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delCompanyMemberOne(a.index)}}},"删除")])}}],columns2:[{type:"selection",width:60,align:"center"},{title:"头像",key:"photo",width:80,render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.photo}})])}},{title:"工号",width:100,key:"userCode"},{title:"姓名",width:100,key:"nickname"},{title:"性别",width:100,key:"gender",render:function(e,t){return e("span",{style:{color:"#39f"}},0===t.row.gender?"女":1===t.row.gender?"男":-1===t.row.gender?"未知":t.row.gender)}},{title:"手机",width:150,key:"mobile"},{title:"邮箱",key:"email",width:180}],groupId:this.$route.params.groupId,memberData:[],pageTotal:0,memberLoading:!1,memberCurrentPage:1,memberPageSize:10,showModal:!1,allMemberLoading:!1,allMemberTotal:0,allMemberCurrentPage:1,allMemberPageSize:10,allMemberData:[],target:4,memberSelectionData:[],nowMemberselectionData:[],searchValue:"",onPageSelection:[]}},methods:{getAllUser:function(){var e=this;this.allMemberLoading=!0,Object(n.A)(this.allMemberCurrentPage,this.allMemberPageSize).then(function(t){t.tableContent[0]&&(e.allMemberData=t.tableContent,e.allMemberTotal=t.summary.total,e.allMemberLoading=!1,e.onPageSelection.length>0&&e.allMemberData.map(function(t){e.onPageSelection.map(function(e){t.userId===e.userId&&(t._checked=!0)})}))})},getCompanyMember:function(){var e=this;this.memberLoading=!0,Object(n.H)(this.groupId,this.memberCurrentPage,this.memberPageSize).then(function(t){e.memberData=t.tableContent,e.pageTotal=t.dataCount,e.memberLoading=!1})},delCompanyMember:function(){var e=this,t=[];this.nowMemberselectionData.length>0?(this.nowMemberselectionData.forEach(function(e){t.push(e.userId)}),this.$Modal.confirm({title:"确认",content:"确认批量删除成员？",onOk:function(){Object(n.W)(t,e.groupId).then(function(t){t.success&&(e.$Message.success("删除成功!"),e.$emit("getInstanceCount"),e.getCompanyMember())})}})):this.$Message.warning("请选择至少一个成员！")},delCompanyMemberOne:function(e){var t=this,a=[];a.push(this.memberData[e].userId),this.$Modal.confirm({title:"确认",content:"确认删除此成员？",onOk:function(){Object(n.W)(a,t.groupId).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.$emit("getInstanceCount"),t.getCompanyMember())})}})},deleteSelectUser:function(e,t){var a=this;this.onPageSelection.splice(t,1),this.$refs.selection.data.forEach(function(t,o){e.userId===t.userId&&a.$refs.selection.toggleSelect(o)})},pageChange:function(e){this.memberCurrentPage=e,this.getCompanyMember(e)},showAllMember:function(){this.showModal=!0,this.onPageSelection=[],this.searchValue="",this.getAllUser()},onSelectAll:function(e){var t,a={};(t=this.onPageSelection).push.apply(t,c()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.userId]&&(a[t.userId]=e.push(t)),e},[])},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},onSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,a=this.onPageSelection;t.map(function(e){a=a.filter(function(t){return t.userId!==e.userId})}),this.onPageSelection=a}else{var o,n={};(o=this.onPageSelection).push.apply(o,c()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.userId]&&(n[t.userId]=e.push(t)),e},[])}this.memberSelectionData=this.onPageSelection},onMemberSelectionChange:function(e){this.nowMemberselectionData=e},onMemberPageChange:function(e){this.allMemberCurrentPage=e,this.getAllUser()},onAllMemberPageSizeChange:function(e){this.allMemberPageSize=e,this.getAllUser()},memberPageSizeChange:function(e){this.memberPageSize=e,this.getCompanyMember()},addCompanyMember:function(){var e=this,t=[];this.memberSelectionData.length>0?(this.memberSelectionData.forEach(function(e){t.push(e.userId)}),Object(n.a)(t,this.groupId).then(function(t){t.success&&(e.$Message.success("更新成功"),e.$emit("getInstanceCount"),e.getCompanyMember())})):this.$Message.warning("请选择至少一个成员！")},search:function(){var e=this;Object(n.t)(this.searchValue).then(function(t){t&&(e.allMemberData=t,e.allMemberTotal=t.length)})}},mounted:function(){this.getCompanyMember()}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-wrap"},[a("div",{staticClass:"member-wrap-table"},[a("b",{staticClass:"member-wrap-table-btn",on:{click:e.showAllMember}},[e._v("添加成员")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-添加成员")]),e._v(" "),a("b",{staticClass:"member-wrap-table-btn",on:{click:e.delCompanyMember}},[e._v("移除成员")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-移除成员")]),e._v(" "),a("br"),e._v(" "),a("Table",{attrs:{loading:e.memberLoading,columns:e.columns1,data:e.memberData},on:{"on-selection-change":e.onMemberSelectionChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.pageTotal,current:e.memberCurrentPage,"page-size":e.memberPageSize,size:"small","show-sizer":"","show-elevator":"","show-total":""},on:{"on-page-size-change":e.memberPageSizeChange,"on-change":e.pageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择公司成员",styles:{top:"15px"},width:"870"},on:{"on-ok":e.addCompanyMember},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("div",{staticClass:"search"},[a("Input",{staticClass:"search-btn",attrs:{search:!0,placeholder:"请输入姓名"},on:{"on-search":e.search},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),e._v(" "),a("Button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.allMemberLoading,columns:e.columns2,data:e.allMemberData},on:{"on-selection-change":e.onSelectionChange,"on-select-all":e.onSelectAll,"on-select-cancel":e.onSelectCancel}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.allMemberTotal,"show-elevator":"","show-sizer":"",current:e.allMemberCurrentPage,"page-size":e.allMemberPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllMemberPageSizeChange,"on-change":e.onMemberPageChange}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},e._l(e.onPageSelection,function(t){return a("Tag",{key:t.userId,attrs:{userId:t.userId,closable:"",type:"border",color:"primary",size:"small"},on:{"on-close":function(a){e.deleteSelectUser(t,e.index)}}},[e._v("\n        "+e._s(t.nickname)+"\n      ")])}))],1)],1)},staticRenderFns:[]};var u=a("D8HT")(m,h,!1,function(e){a("0G49")},"data-v-1a22c285",null).exports,p=a("cfvZ"),g=a.n(p),d={data:function(){var e=this;return{groupId:this.$route.params.groupId,higherLoading:!1,higherCompanyData:[],higherCompanyTotal:0,higherCompanyCurrentPage:1,higherCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"companyType"},{title:"创建者",key:"creator"}],columns1:[{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"companyType"},{title:"创建者",key:"creator"},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delCompany(a.index)}}},"删除")])}}],selectCompanyData:{},showModal:!1,groupName:""}},methods:{getAllCompanyList:function(){var e=this;this.companyLoading=!0,Object(n.D)(this.groupId,3,this.companyCurrentPage,this.companyPageSize).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount,e.companyLoading=!1})},getHigherCompanyData:function(){var e=this;this.higherLoading=!0,Object(n.D)(this.groupId,1,this.higherCompanyCurrentPage,this.higherCompanyPageSize).then(function(t){e.higherCompanyData=t,e.higherCompanyTotal=t.length,e.higherLoading=!1})},onSelectionChange:function(e){this.selectCompanyData=e},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList()},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getHigherCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getHigherCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e,this.getAllCompanyList()},addHigherCompany:function(){var e=this,t=void 0;g()(this.selectCompanyData).length>0?(t=this.selectCompanyData.groupId,Object(n.b)(this.groupId,t).then(function(t){t.success&&(e.$Message.success("更新成功!"),e.$emit("getInstanceCount"),e.getHigherCompanyData())})):this.$Message.warning("请选择至少一个公司！")},delCompany:function(e){var t=this;this.$Modal.confirm({title:"确认",content:"确认删除上级公司？",onOk:function(){Object(n.V)([t.groupId]).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.$emit("getInstanceCount"),t.getHigherCompanyData())})}})},search:function(){var e=this;Object(n._3)(this.groupName).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount})},onRowdbclick:function(e,t){var a=this,o=void 0;g()(e).length>0?(o=e.groupId,Object(n.b)(this.groupId,o).then(function(e){e.success&&(a.showModal=!1,a.$Message.success("更新成功!"),a.$emit("getInstanceCount"),a.getHigherCompanyData())})):this.$Message.warning("请选择至少一个公司！")}},mounted:function(){this.getHigherCompanyData()}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"higher-company"},[a("div",{staticClass:"higher-company-detail",attrs:{id:"cliHeight"}},[a("b",{staticClass:"higher-company-detail-btn",on:{click:e.showCompanyModal}},[e._v("添加公司")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择上级公司")]),e._v(" "),a("br"),e._v(" "),a("Table",{ref:"selection",attrs:{columns:e.columns1,loading:e.higherLoading,data:e.higherCompanyData}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.higherCompanyTotal,"show-elevator":"","show-sizer":"",current:e.higherCompanyCurrentPage,"page-size":e.higherCompanyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择上级公司",styles:{top:"15px"},width:"1200"},on:{"on-ok":e.addHigherCompany},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("div",{staticClass:"search"},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称",search:!0},on:{"on-search":e.search},model:{value:e.groupName,callback:function(t){e.groupName=t},expression:"groupName"}}),e._v(" "),a("Button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("查询")])],1),e._v(" "),a("Table",{ref:"selection",staticClass:"rfd-principal-table",attrs:{"highlight-row":!0,height:"400",loading:e.companyLoading,columns:e.columns,data:e.companyData},on:{"on-row-click":e.onSelectionChange,"on-row-dblclick":e.onRowdbclick}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.companyTotal,"show-elevator":"","show-sizer":"",current:e.companyCurrentPage,"page-size":e.companyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllCompanyPageSizeChange,"on-change":e.onCompanyPageChange}})],1)])],1)],1)},staticRenderFns:[]};var y={data:function(){var e=this;return{groupId:this.$route.params.groupId,lowerLoading:!1,lowerCompanyData:[],lowerCompanyTotal:0,lowerCompanyCurrentPage:1,lowerCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{type:"selection",width:60,align:"center"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"companyType"},{title:"创建者",key:"creator"},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.delLowerCompanyOne(a.index)}}},"删除")])}}],columns1:[{type:"selection",width:60,align:"center"},{title:"公司名称",key:"groupName"},{title:"公司简称",key:"groupShortName"},{title:"公司类型",key:"companyType"},{title:"创建者",key:"creator"}],selectCompanyData:{},deleteCompanyData:[],showModal:!1,groupName:"",onPageSelection:[]}},methods:{getAllCompanyList:function(){var e=this;this.companyLoading=!0,Object(n.D)(this.groupId,3,this.companyCurrentPage,this.companyPageSize).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount,e.companyLoading=!1})},getlowerCompanyData:function(){var e=this;this.lowerLoading=!0,Object(n.D)(this.groupId,2,this.lowerCompanyCurrentPage,this.lowerCompanyPageSize).then(function(t){e.lowerCompanyData=t.tableContent,e.lowerCompanyTotal=t.dataCount,e.lowerLoading=!1})},onSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,a=this.onPageSelection;t.map(function(e){a=a.filter(function(t){return t.groupId!==e.groupId})}),this.onPageSelection=a}else{var o,n={};(o=this.onPageSelection).push.apply(o,c()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.groupId]&&(n[t.groupId]=e.push(t)),e},[])}this.selectCompanyData=this.onPageSelection},onSelectAll:function(e){var t,a={};(t=this.onPageSelection).push.apply(t,c()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.groupId]&&(a[t.groupId]=e.push(t)),e},[])},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.groupId!==t.groupId})},deleteSelectUser:function(e,t){var a=this;this.onPageSelection.splice(t,1),this.$refs.selection.data.forEach(function(t,o){e.groupId===t.groupId&&a.$refs.selection.toggleSelect(o)})},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList(),this.onPageSelection=[]},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getlowerCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getlowerCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e,this.getAllCompanyList()},addlowerCompany:function(){var e=this,t=[];this.selectCompanyData.length>0?(this.selectCompanyData.forEach(function(e){t.push(e.groupId)}),Object(n.d)(t,this.groupId).then(function(t){t.success&&(e.$Message.success("更新成功"),e.$emit("getInstanceCount"),e.getlowerCompanyData())})):this.$Message.warning("请选择至少一个公司！")},delCompany:function(){var e=this,t=[];this.deleteCompanyData.length>0?(this.deleteCompanyData.forEach(function(e){t.push(e.groupId)}),this.$Modal.confirm({title:"确认",content:"确认批量删除下级公司？",onOk:function(){Object(n.V)(t).then(function(t){t.success&&(e.$Message.success("删除成功!"),e.$emit("getInstanceCount"),e.getlowerCompanyData())})}})):this.$Message.warning("请选择至少一个公司！")},delLowerCompanyOne:function(e){var t=this,a=[];a.push(this.lowerCompanyData[e].groupId),this.$Modal.confirm({title:"确认",content:"确认删除此下级公司？",onOk:function(){Object(n.V)(a).then(function(e){e.success&&(t.$Message.success("删除成功!"),t.$emit("getInstanceCount"),t.getlowerCompanyData())})}})},delCompanyChange:function(e){this.deleteCompanyData=e},search:function(){var e=this;Object(n._3)(this.groupName).then(function(t){e.companyData=t.tableContent,e.companyTotal=t.dataCount})}},mounted:function(){this.getlowerCompanyData()}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"lower-company"},[a("div",{staticClass:"lower-company-detail",attrs:{id:"cliHeight"}},[a("b",{staticClass:"lower-company-detail-btn",on:{click:e.showCompanyModal}},[e._v("添加公司")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-选择下级公司")]),e._v(" "),a("b",{staticClass:"lower-company-detail-btn",on:{click:e.delCompany}},[e._v("删除")]),e._v(" "),a("span",{staticStyle:{color:"#7a7676"}},[e._v("-批量删除下级公司")]),e._v(" "),a("br"),e._v(" "),a("Table",{ref:"selection",attrs:{columns:e.columns,loading:e.lowerLoading,data:e.lowerCompanyData},on:{"on-selection-change":e.delCompanyChange}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.lowerCompanyTotal,"show-elevator":"","show-sizer":"",current:e.lowerCompanyCurrentPage,"page-size":e.lowerCompanyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"选择下级公司",styles:{top:"15px"},width:"1200"},on:{"on-ok":e.addlowerCompany},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("div",{staticClass:"search"},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称",search:!0},on:{"on-search":e.search},model:{value:e.groupName,callback:function(t){e.groupName=t},expression:"groupName"}}),e._v(" "),a("Button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("查询")])],1),e._v(" "),a("Table",{ref:"selection",attrs:{"highlight-row":!0,height:"400",loading:e.companyLoading,columns:e.columns1,data:e.companyData},on:{"on-selection-change":e.onSelectionChange,"on-select-all":e.onSelectAll,"on-select-cancel":e.onSelectCancel}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticClass:"fr"},[a("Page",{attrs:{total:e.companyTotal,"show-elevator":"","show-sizer":"",current:e.companyCurrentPage,"page-size":e.companyPageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onAllCompanyPageSizeChange,"on-change":e.onCompanyPageChange}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},e._l(e.onPageSelection,function(t){return a("Tag",{key:t.groupId,attrs:{groupId:t.groupId,closable:"",type:"border",color:"primary",size:"small"},on:{"on-close":function(a){e.deleteSelectUser(t,e.index)}}},[e._v("\n        "+e._s(t.groupName)+"\n      ")])}))],1)],1)},staticRenderFns:[]};var C={components:{BaseInfo:r,MemberInfo:u,HigherCompany:a("D8HT")(d,f,!1,function(e){a("JTFA")},null,null).exports,LowerCompany:a("D8HT")(y,v,!1,function(e){a("FuCs")},null,null).exports},data:function(){return{groupId:this.$route.params.groupId,whichShow:{baseInfo:!0,higherCompany:!1,lowerCompany:!1,member:!1},companyInformation:{},relativeInstance:[{name:"下级公司",showName:"lowerCompany",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:"resources/images/icon/company.png"},{name:"上级公司",showName:"higherCompany",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:"resources/images/icon/company.png"},{name:"公司成员",showName:"member",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:"resources/images/icon/user.png"},{name:"基本信息",showName:"baseInfo",isShow:!0,isShowAcive:!0,type:"ios-home"}]}},methods:{onClickTab:function(e){var t=this;this.relativeInstance.forEach(function(a,o){e===o?(a.isShowAcive=!0,t.whichShow[a.showName]=!0):(a.isShowAcive=!1,t.whichShow[a.showName]=!1)})},getCompanyInfo:function(e){var t=this;Object(n.C)(e).then(function(e){t.companyInformation=e[0]})},getInstanceCount:function(){var e=this;Object(n.K)(this.groupId).then(function(t){e.relativeInstance[0].relativeNum=t.subord,e.relativeInstance[1].relativeNum=t.parent,e.relativeInstance[2].relativeNum=t.groupUser})}},mounted:function(){var e=document.body.clientHeight-120;window.document.getElementsByClassName("detail-content")[0].style.height=e+"px";var t="company-add"==this.$route.name?"add":this.$route.params.groupId;"add"!=t&&(this.getCompanyInfo(t),this.getInstanceCount())}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-wrap"},[a("Row",{staticClass:"detail-header"},[a("div",{staticClass:"detail-header-bread"},[a("span",{staticClass:"detail-header-bread-user"},[e._v("公司")]),e._v(" "),a("span",{staticClass:"detail-header-bread-others"},[e._v("/")]),e._v(" "),a("span",{staticClass:"detail-header-bread-others"},[e._v(e._s(e.companyInformation&&e.companyInformation.groupName?e.companyInformation.groupName:"创建"))])]),e._v(" "),a("Tag",{directives:[{name:"show",rawName:"v-show",value:e.companyInformation.status,expression:"companyInformation.status"},{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.companyInformation.status},expression:"{status:companyInformation.status}"}],staticClass:"radius10 marlr10 color_fff"})],1),e._v(" "),a("Row",{staticClass:"detail-tabs"},e._l(e.relativeInstance,function(t,o){return(e.groupId?t.isShow:t.isShowAcive)?a("div",{key:o,class:{"detail-tabs-child":!0,active:t.isShowAcive},on:{click:function(t){e.onClickTab(o)}}},[t.type?a("Icon",{staticClass:"icon",attrs:{type:t.type}}):a("img",{attrs:{src:t.imgUrl}}),e._v(" "),a("div",{staticClass:"detail-tabs-child-right"},[a("span",[e._v(e._s(t.relativeNum))]),e._v(" "),a("p",[e._v(e._s(t.name))])])],1):e._e()})),e._v(" "),a("Row",{staticClass:"detail-content"},[e.whichShow.baseInfo?a("base-info"):e._e(),e._v(" "),e.whichShow.member?a("member-info",{on:{getInstanceCount:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.higherCompany?a("higher-company",{on:{getInstanceCount:e.getInstanceCount}}):e._e(),e._v(" "),e.whichShow.lowerCompany?a("lower-company",{on:{getInstanceCount:e.getInstanceCount}}):e._e()],1)],1)},staticRenderFns:[]};var I=a("D8HT")(C,b,!1,function(e){a("b8v0"),a("P6Zr")},"data-v-39d4e3ec",null);t.default=I.exports},saZu:function(e,t){}});
//# sourceMappingURL=3.90837eb93d91653c2c37.js.map