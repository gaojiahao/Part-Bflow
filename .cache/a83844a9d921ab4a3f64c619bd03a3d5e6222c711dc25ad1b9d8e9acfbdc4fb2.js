{"source":"webpackJsonp([3],{\"26o3\":function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"baseInfo\"},[a(\"div\",{staticClass:\"baseInfo-warp\"},[a(\"div\",{staticClass:\"baseInfo-body\"},[a(\"Form\",{ref:\"baseInfoItem\",class:{\"is-required\":t.isEdit},attrs:{model:t.baseInfoItem,\"label-width\":100,rules:t.ruleValidate}},[a(\"FormItem\",{attrs:{label:\"公司logo:\"}},[a(\"div\",{staticClass:\"uploadImg\"},[t.isEdit?a(\"img\",{attrs:{src:!!t.logo&&t.logo}}):a(\"Upload\",{ref:\"upload\",staticClass:\"uploadImg-upload\",attrs:{\"show-upload-list\":!1,\"on-success\":t.handleSuccess,format:[\"jpg\",\"jpeg\",\"png\"],\"max-size\":2048,\"on-format-error\":t.handleFormatError,\"on-exceeded-size\":t.handleMaxSize,multiple:\"\",type:\"drag\",action:\"/H_roleplay-si/ds/upload\",headers:t.httpHeaders}},[t.logo?t._e():a(\"div\",{staticClass:\"img-container\"},[t.logo?a(\"img\",{attrs:{src:t.logo}}):t._e(),t._v(\" \"),t.logo?t._e():a(\"i\",{staticClass:\"iconfont\"},[t._v(\"\")])]),t._v(\" \"),t.logo?a(\"div\",{staticClass:\"demo-upload-list\"},[a(\"img\",{staticClass:\"img-container\",attrs:{src:t.logo}}),t._v(\" \"),a(\"div\",{staticClass:\"demo-upload-list-cover\"},[a(\"Icon\",{attrs:{type:\"ios-eye-outline\",color:\"#fff\",size:\"30\"},on:{click:function(e){return e.stopPropagation(),t.handleView(e)}}}),t._v(\" \"),a(\"Icon\",{attrs:{type:\"ios-trash-outline\",color:\"#fff\",size:\"30\"},on:{click:function(e){return e.stopPropagation(),t.handleRemove(e)}}})],1)]):t._e()]),t._v(\" \"),a(\"Modal\",{attrs:{title:\"查看\"},model:{value:t.visible,callback:function(e){t.visible=e},expression:\"visible\"}},[t.visible?a(\"img\",{staticStyle:{width:\"100%\"},attrs:{src:t.logo}}):t._e()])],1)]),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"公司名称:\",prop:\"groupName\"}},[a(\"Input\",{class:{\"info-edit\":t.isEdit},attrs:{readonly:t.isEdit},model:{value:t.baseInfoItem.groupName,callback:function(e){t.$set(t.baseInfoItem,\"groupName\",e)},expression:\"baseInfoItem.groupName\"}})],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"公司简称:\",prop:\"groupShortName\"}},[a(\"Input\",{class:{\"info-edit\":t.isEdit},attrs:{readonly:t.isEdit},model:{value:t.baseInfoItem.groupShortName,callback:function(e){t.$set(t.baseInfoItem,\"groupShortName\",e)},expression:\"baseInfoItem.groupShortName\"}})],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"公司类型:\",prop:\"companyType\"}},[t.isEdit?a(\"span\",{staticStyle:{\"margin-left\":\"5px\"}},[t._v(t._s(t.baseInfoItem.companyType))]):a(\"Select\",{attrs:{disabled:t.isEdit},model:{value:t.baseInfoItem.companyType,callback:function(e){t.$set(t.baseInfoItem,\"companyType\",e)},expression:\"baseInfoItem.companyType\"}},[a(\"Option\",{attrs:{value:\"有限责任公司\"}},[t._v(\"有限责任公司\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"股份有限公司\"}},[t._v(\"股份有限公司\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"集团公司\"}},[t._v(\"集团公司\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"有限合伙\"}},[t._v(\"有限合伙\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"普通合伙\"}},[t._v(\"普通合伙\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"个人独资\"}},[t._v(\"个人独资\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"子公司\"}},[t._v(\"子公司\")]),t._v(\" \"),a(\"Option\",{attrs:{value:\"其他\"}},[t._v(\"其他\")])],1)],1)],1)],1),t._v(\" \"),t.isAdd&&t.isEdit?a(\"div\",{staticClass:\"info-person\"},[a(\"Form\",{attrs:{\"label-width\":80}},[a(\"FormItem\",{attrs:{label:\"创建者:\"}},[a(\"span\",{staticStyle:{\"margin-left\":\"5px\"}},[t._v(t._s(t.baseInfoItem.creator))])]),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"创建时间:\"}},[a(\"span\",{staticStyle:{\"margin-left\":\"5px\"}},[t._v(t._s(t.baseInfoItem.crtTime))])]),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"修改者:\"}},[a(\"span\",{staticStyle:{\"margin-left\":\"5px\"}},[t._v(t._s(t.baseInfoItem.modifier))])]),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"修改时间:\"}},[a(\"span\",{staticStyle:{\"margin-left\":\"5px\"}},[t._v(t._s(t.baseInfoItem.modTime))])])],1)],1):t._e()]),t._v(\" \"),a(\"Row\",{staticClass:\"info-btn\"},[a(\"Button\",{staticClass:\"radius0 close-company\",on:{click:t.toCompanyLst}},[t._v(\"关闭\")]),t._v(\" \"),t.isAdd&&t.isPermission?a(\"Button\",{staticClass:\"radius0 add-btn\",on:{click:t.isEditCompanyInfo}},[t._v(t._s(t.isEdit?\"编辑\":\"放弃编辑\"))]):t._e(),t._v(\" \"),t.isEdit?t._e():a(\"Button\",{staticClass:\"radius0 add-btn\",on:{click:t.addCompanyData}},[t._v(\"保存\")]),t._v(\" \"),t.isEdit||1!==t.baseInfoItem.status?t._e():a(\"Button\",{staticClass:\"radius0 add-btn\",on:{click:function(e){t.addCompanyData(\"file\")}}},[t._v(\"归档\")]),t._v(\" \"),t.groupId?t._e():a(\"Button\",{staticClass:\"radius0 add-btn\",on:{click:t.saveAndAddCompany}},[t._v(\"保存并新建\")]),t._v(\" \"),t.isEdit&&t.groupId?t._e():a(\"Button\",{staticClass:\"radius0 add-btn\",on:{click:function(e){t.addCompanyData(\"draft\")}}},[t._v(\"保存草稿\")])],1)],1)},staticRenderFns:[]}},\"3Zs4\":function(e,t){},EPey:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o(\"div\",{staticClass:\"member-wrap\"},[o(\"div\",{staticClass:\"member-wrap-table\"},[o(\"div\",{staticStyle:{overflow:\"hidden\",\"margin-bottom\":\"-8px\"}},[a.isPermission?o(\"div\",{staticStyle:{display:\"inline\"}},[o(\"b\",{staticClass:\"member-wrap-table-btn\",on:{click:a.showAllMember}},[a._v(\"添加成员\")]),a._v(\" \"),o(\"span\",{staticStyle:{color:\"#7a7676\"}},[a._v(\"-添加成员\")]),a._v(\" \"),o(\"b\",{staticClass:\"member-wrap-table-btn\",on:{click:a.delCompanyMember}},[a._v(\"移除成员\")]),a._v(\" \"),o(\"span\",{staticStyle:{color:\"#7a7676\"}},[a._v(\"-移除成员\")])]):a._e(),a._v(\" \"),o(\"div\",{staticClass:\"table-search\"},[o(\"Input\",{staticClass:\"search-btn\",attrs:{search:!0,placeholder:\"请输入工号或姓名\"},on:{\"on-search\":a.tableSearch},model:{value:a.searchTableValue,callback:function(e){a.searchTableValue=e},expression:\"searchTableValue\"}}),a._v(\" \"),o(\"Button\",{attrs:{type:\"primary\",size:\"small\"},on:{click:a.tableSearch}},[a._v(\"查询\")])],1)]),a._v(\" \"),o(\"Table\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{loading:a.memberLoading,columns:a.columns1,data:a.memberData},on:{\"on-selection-change\":a.onMemberSelectionChange}}),a._v(\" \"),o(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[o(\"div\",{staticClass:\"fr\",staticStyle:{\"padding-bottom\":\"5px\"}},[o(\"Page\",{attrs:{total:a.pageTotal,current:a.memberCurrentPage,\"page-size\":a.memberPageSize,size:\"small\",\"show-sizer\":\"\",\"show-elevator\":\"\",\"show-total\":\"\"},on:{\"on-page-size-change\":a.memberPageSizeChange,\"on-change\":a.pageChange}})],1)])],1),a._v(\" \"),o(\"Modal\",{attrs:{title:\"选择公司成员\",styles:{top:\"15px\"},width:\"870\"},on:{\"on-ok\":a.addCompanyMember},model:{value:a.showModal,callback:function(e){a.showModal=e},expression:\"showModal\"}},[o(\"div\",{staticClass:\"search\"},[o(\"Input\",{staticClass:\"search-btn\",attrs:{search:!0,placeholder:\"请输入工号或姓名\"},on:{\"on-search\":a.search},model:{value:a.searchValue,callback:function(e){a.searchValue=e},expression:\"searchValue\"}}),a._v(\" \"),o(\"Button\",{attrs:{type:\"primary\"},on:{click:a.search}},[a._v(\"搜索\")])],1),a._v(\" \"),o(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":!0,height:\"400\",loading:a.allMemberLoading,columns:a.columns2,data:a.allMemberData},on:{\"on-selection-change\":a.onSelectionChange,\"on-select-all\":a.onSelectAll,\"on-select-cancel\":a.onSelectCancel}}),a._v(\" \"),o(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[o(\"div\",{staticClass:\"fr\"},[o(\"Page\",{attrs:{total:a.allMemberTotal,\"show-elevator\":\"\",\"show-sizer\":\"\",current:a.allMemberCurrentPage,\"page-size\":a.allMemberPageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-page-size-change\":a.onAllMemberPageSizeChange,\"on-change\":a.onMemberPageChange}})],1)]),a._v(\" \"),o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.onPageSelection[0],expression:\"onPageSelection[0] \"}],staticClass:\"page-selection-warp\"},a._l(a.onPageSelection,function(t){return o(\"Tag\",{key:t.userId,attrs:{userId:t.userId,closable:\"\",type:\"border\",color:\"primary\",size:\"small\"},on:{\"on-close\":function(e){a.deleteSelectUser(t,a.index)}}},[a._v(\"\\n        \"+a._s(t.nickname)+\"\\n      \")])}),1)],1)],1)},staticRenderFns:[]}},H6bf:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"higher-company\"},[a(\"div\",{staticClass:\"higher-company-detail\",attrs:{id:\"cliHeight\"}},[t.isPermission?a(\"div\",{staticStyle:{display:\"inline\"}},[a(\"b\",{staticClass:\"higher-company-detail-btn\",on:{click:t.showCompanyModal}},[t._v(\"添加公司\")]),t._v(\" \"),a(\"span\",{staticStyle:{color:\"#7a7676\"}},[t._v(\"-选择上级公司\")])]):t._e(),t._v(\" \"),a(\"br\"),t._v(\" \"),a(\"Table\",{ref:\"selection\",attrs:{columns:t.columns1,loading:t.higherLoading,data:t.higherCompanyData}}),t._v(\" \"),a(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[a(\"div\",{staticClass:\"fr\",staticStyle:{\"padding-bottom\":\"5px\"}},[a(\"Page\",{attrs:{total:t.higherCompanyTotal,\"show-elevator\":\"\",\"show-sizer\":\"\",current:t.higherCompanyCurrentPage,\"page-size\":t.higherCompanyPageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-page-size-change\":t.onPageSizeChange,\"on-change\":t.onPageChange}})],1)])],1),t._v(\" \"),a(\"Modal\",{attrs:{title:\"选择上级公司\",styles:{top:\"15px\"},width:\"1200\"},on:{\"on-ok\":t.addHigherCompany},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:\"showModal\"}},[a(\"div\",{staticClass:\"search\"},[a(\"Input\",{staticStyle:{width:\"300px\"},attrs:{placeholder:\"请输入公司名称\",search:!0},on:{\"on-search\":t.search},model:{value:t.groupName,callback:function(e){t.groupName=e},expression:\"groupName\"}}),t._v(\" \"),a(\"Button\",{staticClass:\"search-btn\",attrs:{type:\"primary\",size:\"small\"},on:{click:t.search}},[t._v(\"查询\")])],1),t._v(\" \"),a(\"Table\",{ref:\"selection\",staticClass:\"rfd-principal-table\",attrs:{\"highlight-row\":!0,height:\"400\",loading:t.companyLoading,columns:t.columns,data:t.companyData},on:{\"on-row-click\":t.onSelectionChange,\"on-row-dblclick\":t.onRowdbclick}}),t._v(\" \"),a(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[a(\"div\",{staticClass:\"fr\"},[a(\"Page\",{attrs:{total:t.companyTotal,\"show-elevator\":\"\",\"show-sizer\":\"\",current:t.companyCurrentPage,\"page-size\":t.companyPageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-page-size-change\":t.onAllCompanyPageSizeChange,\"on-change\":t.onCompanyPageChange}})],1)])],1)],1)},staticRenderFns:[]}},Kts3:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o(\"div\",{staticClass:\"content-wrap\"},[o(\"Row\",{staticClass:\"detail-com-header\"},[o(\"div\",{staticClass:\"detail-com-header-bread\"},[o(\"span\",{staticClass:\"detail-com-header-bread-user\",on:{click:a.goCompanyList}},[a._v(\"公司\")]),a._v(\" \"),o(\"span\",{staticClass:\"detail-com-header-bread-others\"},[a._v(\"/\")]),a._v(\" \"),o(\"span\",{staticClass:\"detail-com-header-bread-others\"},[a._v(a._s(a.companyInformation&&a.companyInformation.groupName?a.companyInformation.groupName:\"创建\"))])]),a._v(\" \"),o(\"Tag\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.groupId,expression:\"groupId\"},{name:\"instanceStateDirective\",rawName:\"v-instanceStateDirective\",value:{status:a.companyInformation.status},expression:\"{status:companyInformation.status}\"}],staticClass:\"radius10 marlr10 color_fff\"})],1),a._v(\" \"),o(\"Row\",{staticClass:\"detail-tabs\"},a._l(a.relativeInstance,function(e,t){return(a.groupId?e.isShow:e.isShowAcive)?o(\"div\",{key:t,class:{\"detail-tabs-child\":!0,\"active-item\":e.isShowAcive},on:{click:function(e){a.onClickTab(t)}}},[e.type?o(\"Icon\",{staticClass:\"icon\",attrs:{type:e.type}}):o(\"img\",{attrs:{src:e.imgUrl}}),a._v(\" \"),o(\"div\",{staticClass:\"detail-tabs-child-right\"},[o(\"span\",[a._v(a._s(e.relativeNum))]),a._v(\" \"),o(\"p\",[a._v(a._s(e.name))])])],1):a._e()}),0),a._v(\" \"),o(\"Row\",{staticClass:\"detail-content\"},[a.whichShow.baseInfo?o(\"base-info\",{attrs:{isPermission:a.isPermission}}):a._e(),a._v(\" \"),a.whichShow.member?o(\"member-info\",{attrs:{isPermission:a.isPermission},on:{getInstanceCount:a.getInstanceCount}}):a._e(),a._v(\" \"),a.whichShow.higherCompany?o(\"higher-company\",{attrs:{isPermission:a.isPermission},on:{getInstanceCount:a.getInstanceCount}}):a._e(),a._v(\" \"),a.whichShow.lowerCompany?o(\"lower-company\",{attrs:{isPermission:a.isPermission},on:{getInstanceCount:a.getInstanceCount}}):a._e()],1)],1)},staticRenderFns:[]}},SFMC:function(e,t){},aEA8:function(e,t){},\"d+h3\":function(e,t){},dNzP:function(e,t){},lDxA:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var o=a(\"oAV5\"),i=a(\"o32f\"),n={props:{isPermission:{type:Boolean}},data:function(){return{groupId:this.$route.params.groupId,httpHeaders:{Authorization:Object(o.c)()},logo:\"\",visible:!1,isEdit:!0,isAdd:!0,cacheGroupName:\"\",cacheShortName:\"\",baseInfoItem:{groupName:\"\",groupShortName:\"\",companyType:\"\",status:-3},ruleValidate:{groupName:[{required:!0,validator:this.groupNameValidator,trigger:\"blur\"}],groupShortName:[{required:!0,validator:this.groupShortNameValidator,trigger:\"blur\"}],companyType:[{required:!0,message:\"请选择公司类型\",trigger:\"change\"}]}}},methods:{handleSuccess:function(e,t){this.logo=\"/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=\"+e.data[0].attacthment},handleView:function(){this.visible=!0},handleRemove:function(){this.logo=\"\",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},handleMaxSize:function(e){this.$Notice.warning({title:\"文件大小超出范围\",desc:\"文件大小最大为2M\"})},handleFormatError:function(e){this.$Notice.warning({title:\"文件格式不对\",desc:\"请上传格式为png 或者 jpg 的图片\"})},addCompanyData:function(e){var t=this,a=this.baseInfoItem,o=\"company-add\"==this.$route.name?\"add\":this.$route.params.groupId,n={groupName:a.groupName,groupShortName:a.groupShortName,companyType:a.companyType,status:a.status,groupPic:this.logo};n.status=\"draft\"===e?0:\"file\"===e?-2:1,this.groupId?n.groupId=o:n.groupCode=this.guid(),this.$refs.baseInfoItem.validate(function(e){e&&(t.groupId?Object(i._5)(n).then(function(e){e.success?(t.$Message.success(\"更新成功\"),window.location.reload()):t.$Message.error(e.message)}).catch(function(e){t.$Message.error(e.data.message)}):Object(i._0)(n).then(function(e){e[0].groupId?(t.$Message.success(\"保存成功\"),t.$router.push({path:\"/addressBook/companyInfo/baseInfo/\"+e[0].groupId}),window.location.reload()):t.$Message.error(e.message)}))})},getCompanyInfo:function(e){var t=this;Object(i.A)(e).then(function(e){0<e.length&&(t.baseInfoItem=e[0],t.logo=e[0].groupPic,t.cacheShortName=e[0].groupShortName,t.cacheGroupName=e[0].groupName,t.baseInfoItem.status=t.baseInfoItem.status)})},guid:function(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+\"-\"+e()+\"-\"+e()+\"-\"+e()+\"-\"+e()+e()+e()},isEditCompanyInfo:function(){this.isEdit=!this.isEdit},saveAndAddCompany:function(){var t=this,e=this.baseInfoItem,a={groupName:e.groupName,groupShortName:e.groupShortName,companyType:e.companyType,status:1,groupCode:this.guid(),groupPic:this.logo};this.$refs.baseInfoItem.validate(function(e){e&&Object(i._0)(a).then(function(e){\"company-add\"==t.$route.name||t.$route.params.groupId;e[0].groupId?(t.$Message.success(\"保存成功\"),t.$refs.baseInfoItem.resetFields(),t.logo=\"\",t.baseInfoItem.groupName=\"\",t.baseInfoItem.groupShortName=\"\",t.baseInfoItem.status=-3,t.baseInfoItem.companyType=\"\",t.$refs.upload.fileList.splice(0,t.$refs.upload.fileList.length)):t.$Message.error(e.message)}).catch(function(e){t.$Message.error(e.data.message)})})},groupNameValidator:function(e,t,a){var o=this;if(!t)return a(new Error(\"请输入公司名称\"));if(this.cacheGroupName!=t){var n={name:\"groupName\",value:t},s=\"company-add\"==this.$route.name?\"add\":this.$route.params.groupId;Object(i.h)(n,s).then(function(e){return 0==!e.result?(o.$Message.error(\"公司名称已存在！请重新输入\"),a(new Error(\" \"))):a()})}else a()},groupShortNameValidator:function(e,t,a){var o=this;if(!t)return this.$Message.error(\"请输入公司简称\"),a(new Error(\"请输入公司简称\"));if(this.cacheShortName!=t){var n={name:\"groupShortName\",value:t},s=\"company-add\"==this.$route.name?\"add\":this.$route.params.groupId;Object(i.h)(n,s).then(function(e){return 0==!e.result?(o.$Message.error(\"公司简称已存在！请重新输入\"),a(new Error(\" \"))):a()})}else a()},toCompanyLst:function(){this.$Modal.confirm({title:\"系统提示\",content:\"确认要关闭当前页面吗？\",onOk:function(){location.href=\"/Site/index.html#page/companys\"}})}},mounted:function(){this.groupId||(this.isEdit=!1,this.isAdd=!1),this.getCompanyInfo(this.groupId)}},s=a(\"26o3\"),r=a.n(s);var l=function(e){a(\"SFMC\")},c=a(\"VU/8\")(n,r.a,!1,l,null,null).exports,m=a(\"Gu7T\"),h=a.n(m),u=a(\"mvHQ\"),p=a.n(u),g={props:{isPermission:{type:Boolean}},data:function(){var a=this;return{columns1:[{type:\"selection\",width:60,align:\"center\"},{title:\"头像\",key:\"photo\",width:80,render:function(e,t){return e(\"div\",[e(\"Avatar\",{props:{src:t.row.photo?t.row.photo:\"resources/images/icon/defaultUserPhoto.jpg\"}})])}},{title:\"工号\",key:\"userCode\"},{title:\"姓名\",key:\"nickname\"},{title:\"性别\",key:\"gender\",render:function(e,t){return e(\"span\",{style:{color:\"#39f\"}},0===t.row.gender?\"女\":1===t.row.gender?\"男\":\"未知\")}},{title:\"手机\",key:\"mobile\"},{title:\"邮箱\",key:\"email\",width:180},{title:\"操作\",key:\"action\",width:150,align:\"center\",render:function(e,t){return e(\"div\",[e(\"Button\",{props:{type:\"error\",size:\"small\",disabled:!a.isPermission},on:{click:function(){a.delCompanyMemberOne(t.index)}}},\"删除\")])}}],columns2:[{type:\"selection\",width:60,align:\"center\"},{title:\"头像\",key:\"photo\",width:80,render:function(e,t){return e(\"div\",[e(\"Avatar\",{props:{src:t.row.photo?t.row.photo:\"resources/images/icon/defaultUserPhoto.jpg\"}})])}},{title:\"工号\",width:100,key:\"userCode\"},{title:\"姓名\",width:100,key:\"nickname\"},{title:\"性别\",width:100,key:\"gender\",render:function(e,t){return e(\"span\",{style:{color:\"#39f\"}},0===t.row.gender?\"女\":1===t.row.gender?\"男\":-1===t.row.gender?\"未知\":t.row.gender)}},{title:\"手机\",width:150,key:\"mobile\"},{title:\"邮箱\",key:\"email\",width:180}],groupId:this.$route.params.groupId,memberData:[],pageTotal:0,memberLoading:!1,memberCurrentPage:1,memberPageSize:10,showModal:!1,allMemberLoading:!1,allMemberTotal:0,allMemberCurrentPage:1,allMemberPageSize:10,allMemberData:[],target:4,memberSelectionData:[],nowMemberselectionData:[],searchValue:\"\",searchTableValue:\"\",onPageSelection:[]}},methods:{getAllUser:function(){var a=this,e=p()([{operator_1:\"like\",value_1:this.searchValue,property_1:\"nickname\",link:\"or\",operator_2:\"like\",value_2:this.searchValue,property_2:\"userCode\"}]);this.allMemberLoading=!0,Object(i.y)(this.allMemberCurrentPage,this.allMemberPageSize,e).then(function(e){e.tableContent[0]&&(a.allMemberData=e.tableContent,a.allMemberTotal=e.summary.total,a.allMemberLoading=!1,0<a.onPageSelection.length&&a.allMemberData.map(function(t){a.onPageSelection.map(function(e){t.userId===e.userId&&(t._checked=!0)})}))})},getCompanyMember:function(e){var t=this;this.memberLoading=!0,Object(i.G)(this.groupId,this.memberCurrentPage,this.memberPageSize,e).then(function(e){t.memberData=e.tableContent,t.pageTotal=e.dataCount,t.memberLoading=!1})},delCompanyMember:function(){var t=this,a=[];0<this.nowMemberselectionData.length?(this.nowMemberselectionData.forEach(function(e){a.push(e.userId)}),this.$Modal.confirm({title:\"确认\",content:\"确认批量删除成员？\",onOk:function(){Object(i.W)(a,t.groupId).then(function(e){e.success&&(t.$Message.success(\"删除成功!\"),t.$emit(\"getInstanceCount\"),t.getCompanyMember(t.searchTableValue))}).catch(function(e){t.$Message.error(e.data.message)})}})):this.$Message.warning(\"请选择至少一个成员！\")},delCompanyMemberOne:function(e){var t=this,a=[];a.push(this.memberData[e].userId),this.$Modal.confirm({title:\"确认\",content:\"确认删除此成员？\",onOk:function(){Object(i.W)(a,t.groupId).then(function(e){e.success&&(t.$Message.success(\"删除成功!\"),t.$emit(\"getInstanceCount\"),t.getCompanyMember(t.searchTableValue))}).catch(function(e){t.$Message.error(e.data.message)})}})},deleteSelectUser:function(a,e){var o=this;this.onPageSelection.splice(e,1),this.$refs.selection.data.forEach(function(e,t){a.userId===e.userId&&o.$refs.selection.toggleSelect(t)})},pageChange:function(e){this.memberCurrentPage=e,this.getCompanyMember(this.searchTableValue)},showAllMember:function(){this.showModal=!0,this.onPageSelection=[],this.searchValue=\"\",this.getAllUser()},onSelectAll:function(e){var t,a={};(t=this.onPageSelection).push.apply(t,h()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.userId]&&(a[t.userId]=e.push(t)),e},[])},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.userId!==t.userId})},onSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,a=this.onPageSelection;t.map(function(t){a=a.filter(function(e){return e.userId!==t.userId})}),this.onPageSelection=a}else{var o,n={};(o=this.onPageSelection).push.apply(o,h()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.userId]&&(n[t.userId]=e.push(t)),e},[])}this.memberSelectionData=this.onPageSelection},onMemberSelectionChange:function(e){this.nowMemberselectionData=e},onMemberPageChange:function(e){this.allMemberCurrentPage=e,this.getAllUser()},onAllMemberPageSizeChange:function(e){this.allMemberPageSize=e,this.getAllUser()},memberPageSizeChange:function(e){this.memberPageSize=e,this.getCompanyMember(this.searchTableValue)},addCompanyMember:function(){var t=this,a=[];0<this.memberSelectionData.length?(this.memberSelectionData.forEach(function(e){a.push(e.userId)}),Object(i.a)(a,this.groupId).then(function(e){e.success&&(t.$Message.success(\"更新成功\"),t.$emit(\"getInstanceCount\"),t.getCompanyMember(t.searchTableValue))}).catch(function(e){t.$Message.error(e.data.message)})):this.$Message.warning(\"请选择至少一个成员！\")},search:function(){this.getAllUser()},tableSearch:function(){this.getCompanyMember(this.searchTableValue)}},mounted:function(){this.getCompanyMember()}},d=a(\"EPey\"),f=a.n(d);var y=function(e){a(\"aEA8\")},v=a(\"VU/8\")(g,f.a,!1,y,\"data-v-7cad39b0\",null).exports,C=a(\"fZjL\"),b=a.n(C),w={props:{isPermission:{type:Boolean}},data:function(){var a=this;return{groupId:this.$route.params.groupId,higherLoading:!1,higherCompanyData:[],higherCompanyTotal:0,higherCompanyCurrentPage:1,higherCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{title:\"公司名称\",key:\"groupName\"},{title:\"公司简称\",key:\"groupShortName\"},{title:\"公司类型\",key:\"companyType\"},{title:\"创建者\",key:\"creator\"}],columns1:[{title:\"公司名称\",key:\"groupName\"},{title:\"公司简称\",key:\"groupShortName\"},{title:\"公司类型\",key:\"companyType\"},{title:\"创建者\",key:\"creator\"},{title:\"操作\",key:\"action\",width:150,align:\"center\",render:function(e,t){return e(\"div\",[e(\"Button\",{props:{type:\"error\",size:\"small\",disabled:!a.isPermission},on:{click:function(){a.delCompany(t.index)}}},\"删除\")])}}],selectCompanyData:{},showModal:!1,groupName:\"\"}},methods:{getAllCompanyList:function(){var t=this;this.companyLoading=!0,Object(i.B)(this.groupId,3,this.companyCurrentPage,this.companyPageSize,this.groupName).then(function(e){t.companyData=e.tableContent,t.companyTotal=e.dataCount,t.companyLoading=!1})},getHigherCompanyData:function(){var t=this;this.higherLoading=!0,Object(i.B)(this.groupId,1,this.higherCompanyCurrentPage,this.higherCompanyPageSize).then(function(e){t.higherCompanyData=e,t.higherCompanyTotal=e.length,t.higherLoading=!1})},onSelectionChange:function(e){this.selectCompanyData=e},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList()},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getHigherCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getHigherCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e,this.getAllCompanyList()},addHigherCompany:function(){var t=this,e=void 0;0<b()(this.selectCompanyData).length?(e=this.selectCompanyData.groupId,Object(i.b)(this.groupId,e).then(function(e){e.success&&(t.$Message.success(\"更新成功!\"),t.$emit(\"getInstanceCount\"),t.getHigherCompanyData())}).catch(function(e){t.$Message.error(e.data.message)})):this.$Message.warning(\"请选择至少一个公司！\")},delCompany:function(e){var t=this;this.$Modal.confirm({title:\"确认\",content:\"确认删除上级公司？\",onOk:function(){Object(i.V)([t.groupId]).then(function(e){e.success&&(t.$Message.success(\"删除成功!\"),t.$emit(\"getInstanceCount\"),t.getHigherCompanyData())}).catch(function(e){t.$Message.error(e.data.message)})}})},search:function(){this.getAllCompanyList()},onRowdbclick:function(e,t){var a=this,o=void 0;0<b()(e).length?(o=e.groupId,Object(i.b)(this.groupId,o).then(function(e){e.success&&(a.showModal=!1,a.$Message.success(\"更新成功!\"),a.$emit(\"getInstanceCount\"),a.getHigherCompanyData())}).catch(function(e){a.$Message.error(e.data.message)})):this.$Message.warning(\"请选择至少一个公司！\")}},mounted:function(){this.getHigherCompanyData()}},I=a(\"H6bf\"),S=a.n(I);var _=function(e){a(\"o+hx\")},P=a(\"VU/8\")(w,S.a,!1,_,null,null).exports,M={props:{isPermission:{type:Boolean}},data:function(){var a=this;return{groupId:this.$route.params.groupId,lowerLoading:!1,lowerCompanyData:[],lowerCompanyTotal:0,lowerCompanyCurrentPage:1,lowerCompanyPageSize:10,companyLoading:!1,companyTotal:0,companyCurrentPage:1,companyPageSize:10,companyData:[],columns:[{type:\"selection\",width:60,align:\"center\"},{title:\"公司名称\",key:\"groupName\"},{title:\"公司简称\",key:\"groupShortName\"},{title:\"公司类型\",key:\"companyType\"},{title:\"创建者\",key:\"creator\"},{title:\"操作\",key:\"action\",width:150,align:\"center\",render:function(e,t){return e(\"div\",[e(\"Button\",{props:{type:\"error\",size:\"small\",disabled:!a.isPermission},on:{click:function(){a.delLowerCompanyOne(t.index)}}},\"删除\")])}}],columns1:[{type:\"selection\",width:60,align:\"center\"},{title:\"公司名称\",key:\"groupName\"},{title:\"公司简称\",key:\"groupShortName\"},{title:\"公司类型\",key:\"companyType\"},{title:\"创建者\",key:\"creator\"}],selectCompanyData:{},deleteCompanyData:[],showModal:!1,groupName:\"\",onPageSelection:[]}},methods:{getAllCompanyList:function(){var t=this;this.companyLoading=!0,Object(i.B)(this.groupId,3,this.companyCurrentPage,this.companyPageSize,this.groupName).then(function(e){t.companyData=e.tableContent,t.companyTotal=e.dataCount,t.companyLoading=!1})},getlowerCompanyData:function(){var t=this;this.lowerLoading=!0,Object(i.B)(this.groupId,2,this.lowerCompanyCurrentPage,this.lowerCompanyPageSize).then(function(e){t.lowerCompanyData=e.tableContent,t.lowerCompanyTotal=e.dataCount,t.lowerLoading=!1})},onSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,a=this.onPageSelection;t.map(function(t){a=a.filter(function(e){return e.groupId!==t.groupId})}),this.onPageSelection=a}else{var o,n={};(o=this.onPageSelection).push.apply(o,h()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.groupId]&&(n[t.groupId]=e.push(t)),e},[])}this.selectCompanyData=this.onPageSelection},onSelectAll:function(e){var t,a={};(t=this.onPageSelection).push.apply(t,h()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.groupId]&&(a[t.groupId]=e.push(t)),e},[])},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.groupId!==t.groupId})},deleteSelectUser:function(a,e){var o=this;this.onPageSelection.splice(e,1),this.$refs.selection.data.forEach(function(e,t){a.groupId===e.groupId&&o.$refs.selection.toggleSelect(t)})},showCompanyModal:function(){this.showModal=!0,this.getAllCompanyList(),this.onPageSelection=[]},onPageSizeChange:function(e){this.highCompanyPageSize=e,this.getlowerCompanyData()},onPageChange:function(e){this.highCompanyCurrentPage=e,this.getlowerCompanyData()},onAllCompanyPageSizeChange:function(e){this.companyPageSize=e,this.getAllCompanyList()},onCompanyPageChange:function(e){this.companyCurrentPage=e,this.getAllCompanyList()},addlowerCompany:function(){var t=this,a=[];0<this.selectCompanyData.length?(this.selectCompanyData.forEach(function(e){a.push(e.groupId)}),Object(i.c)(a,this.groupId).then(function(e){e.success&&(t.$Message.success(\"更新成功\"),t.$emit(\"getInstanceCount\"),t.getlowerCompanyData())}).catch(function(e){t.$Message.error(e.data.message)})):this.$Message.warning(\"请选择至少一个公司！\")},delCompany:function(){var t=this,a=[];0<this.deleteCompanyData.length?(this.deleteCompanyData.forEach(function(e){a.push(e.groupId)}),this.$Modal.confirm({title:\"确认\",content:\"确认批量删除下级公司？\",onOk:function(){Object(i.V)(a).then(function(e){e.success&&(t.$Message.success(\"删除成功!\"),t.$emit(\"getInstanceCount\"),t.getlowerCompanyData())}).catch(function(e){t.$Message.error(e.data.message)})}})):this.$Message.warning(\"请选择至少一个公司！\")},delLowerCompanyOne:function(e){var t=this,a=[];a.push(this.lowerCompanyData[e].groupId),this.$Modal.confirm({title:\"确认\",content:\"确认删除此下级公司？\",onOk:function(){Object(i.V)(a).then(function(e){e.success&&(t.$Message.success(\"删除成功!\"),t.$emit(\"getInstanceCount\"),t.getlowerCompanyData())}).catch(function(e){t.$Message.error(e.data.message)})}})},delCompanyChange:function(e){this.deleteCompanyData=e},search:function(){this.getAllCompanyList()}},mounted:function(){this.getlowerCompanyData()}},k=a(\"wLmu\"),$=a.n(k);var N=function(e){a(\"dNzP\")},z={components:{BaseInfo:c,MemberInfo:v,HigherCompany:P,LowerCompany:a(\"VU/8\")(M,$.a,!1,N,null,null).exports},data:function(){return{groupId:this.$route.params.groupId,isPermission:!0,whichShow:{baseInfo:!0,higherCompany:!1,lowerCompany:!1,member:!1},companyInformation:{},relativeInstance:[{name:\"下级公司\",showName:\"lowerCompany\",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:\"resources/images/icon/company.png\"},{name:\"上级公司\",showName:\"higherCompany\",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:\"resources/images/icon/company.png\"},{name:\"公司成员\",showName:\"member\",isShow:!0,isShowAcive:!1,relativeNum:0,imgUrl:\"resources/images/icon/user.png\"},{name:\"基本信息\",showName:\"baseInfo\",isShow:!0,isShowAcive:!0,type:\"ios-home\"}]}},methods:{goCompanyList:function(){location.href=\"/Site/index.html#page/companys\"},onClickTab:function(a){var o=this;this.relativeInstance.forEach(function(e,t){o.whichShow[e.showName]=a===t?e.isShowAcive=!0:e.isShowAcive=!1})},getCompanyInfo:function(e){var t=this;Object(i.A)(e).then(function(e){t.companyInformation=e[0]})},getInstanceCount:function(){var t=this;Object(i.J)(this.groupId).then(function(e){t.relativeInstance[0].relativeNum=e.subord,t.relativeInstance[1].relativeNum=e.parent,t.relativeInstance[2].relativeNum=e.groupUser})}},mounted:function(){var t=this,e=document.body.clientHeight-120;window.document.getElementsByClassName(\"detail-content\")[0].style.height=e+\"px\";var a=\"company-add\"==this.$route.name?\"add\":this.$route.params.groupId;\"add\"!=a&&(this.getCompanyInfo(a),this.getInstanceCount(),Object(i.L)(\"000004\").then(function(e){e[0].action.update||(t.isPermission=!1)}))}},x=a(\"Kts3\"),D=a.n(x);var T=function(e){a(\"d+h3\"),a(\"3Zs4\")},A=a(\"VU/8\")(z,D.a,!1,T,\"data-v-12573ec6\",null);t.default=A.exports},\"o+hx\":function(e,t){},wLmu:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o(\"div\",{staticClass:\"lower-company\"},[o(\"div\",{staticClass:\"lower-company-detail\",attrs:{id:\"cliHeight\"}},[a.isPermission?o(\"div\",{staticStyle:{display:\"inline\"}},[o(\"b\",{staticClass:\"lower-company-detail-btn\",on:{click:a.showCompanyModal}},[a._v(\"添加公司\")]),a._v(\" \"),o(\"span\",{staticStyle:{color:\"#7a7676\"}},[a._v(\"-选择下级公司\")]),a._v(\" \"),o(\"b\",{staticClass:\"lower-company-detail-btn\",on:{click:a.delCompany}},[a._v(\"删除\")]),a._v(\" \"),o(\"span\",{staticStyle:{color:\"#7a7676\"}},[a._v(\"-批量删除下级公司\")])]):a._e(),a._v(\" \"),o(\"br\"),a._v(\" \"),o(\"Table\",{ref:\"selection\",attrs:{columns:a.columns,loading:a.lowerLoading,data:a.lowerCompanyData},on:{\"on-selection-change\":a.delCompanyChange}}),a._v(\" \"),o(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[o(\"div\",{staticClass:\"fr\",staticStyle:{\"padding-bottom\":\"5px\"}},[o(\"Page\",{attrs:{total:a.lowerCompanyTotal,\"show-elevator\":\"\",\"show-sizer\":\"\",current:a.lowerCompanyCurrentPage,\"page-size\":a.lowerCompanyPageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-page-size-change\":a.onPageSizeChange,\"on-change\":a.onPageChange}})],1)])],1),a._v(\" \"),o(\"Modal\",{attrs:{title:\"选择下级公司\",styles:{top:\"15px\"},width:\"1200\"},on:{\"on-ok\":a.addlowerCompany},model:{value:a.showModal,callback:function(e){a.showModal=e},expression:\"showModal\"}},[o(\"div\",{staticClass:\"search\"},[o(\"Input\",{staticStyle:{width:\"300px\"},attrs:{placeholder:\"请输入公司名称\",search:!0},on:{\"on-search\":a.search},model:{value:a.groupName,callback:function(e){a.groupName=e},expression:\"groupName\"}}),a._v(\" \"),o(\"Button\",{staticClass:\"search-btn\",attrs:{type:\"primary\",size:\"small\"},on:{click:a.search}},[a._v(\"查询\")])],1),a._v(\" \"),o(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":!0,height:\"400\",loading:a.companyLoading,columns:a.columns1,data:a.companyData},on:{\"on-selection-change\":a.onSelectionChange,\"on-select-all\":a.onSelectAll,\"on-select-cancel\":a.onSelectCancel}}),a._v(\" \"),o(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[o(\"div\",{staticClass:\"fr\",staticStyle:{\"padding-bottom\":\"5px\"}},[o(\"Page\",{attrs:{total:a.companyTotal,\"show-elevator\":\"\",\"show-sizer\":\"\",current:a.companyCurrentPage,\"page-size\":a.companyPageSize,size:\"small\",\"show-total\":\"\"},on:{\"on-page-size-change\":a.onAllCompanyPageSizeChange,\"on-change\":a.onCompanyPageChange}})],1)]),a._v(\" \"),o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.onPageSelection[0],expression:\"onPageSelection[0] \"}],staticClass:\"page-selection-warp\"},a._l(a.onPageSelection,function(t){return o(\"Tag\",{key:t.groupId,attrs:{groupId:t.groupId,closable:\"\",type:\"border\",color:\"primary\",size:\"small\"},on:{\"on-close\":function(e){a.deleteSelectUser(t,a.index)}}},[a._v(\"\\n        \"+a._s(t.groupName)+\"\\n      \")])}),1)],1)],1)},staticRenderFns:[]}}});"}