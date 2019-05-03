{"source":"webpackJsonp([34],{\"5Lfs\":function(a,e,t){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=t(\"GIAq\"),s=t(\"oAV5\"),o={name:\"TaskLog\",components:{},props:{listId:{type:String}},data:function(){var o=this;return{transCode:\"\",projectTaskId:\"\",logData:[],helpPanelVisible:!1,logTypeList:[{value:\"generally\",label:\"一般事项\"},{value:\"abnormal\",label:\"异常事项\"},{value:\"conference\",label:\"会议\"}],modalFormData:{logTitle:\"\",taskDate:Object(s.b)(new Date,\"yyyy-MM-dd\"),logDeclarationHours:1,comments:\"\",logType:\"generally\",logStatus:\"1\"},ruleValidate:{logTitle:[{required:!0,message:\"不允许为空\"},{type:\"string\",max:20,message:\"标题不能超过20个字符\"}],logType:[{required:!0,message:\"不允许为空\"}],logStatus:[{required:!0,message:\"不允许为空\"},{validator:function(a,e,t){o.modalFormData.taskDate<=new Date&&1!=e?t(new Error(\"日期小于等于今日，日志类型应该为已办\")):o.modalFormData.taskDate>new Date&&0!=e&&t(new Error(\"日期大于今日，日志类型应该为待办\")),t()}}],logDeclarationHours:[{required:!0,message:\"不允许为空\",type:\"number\"}],taskDate:[{required:!0,message:\"不允许为空\"}]},currentPage:1,pageTotal:0,pageSize:6}},methods:{submitLog:function(a){var e=this,t=void 0;if(this.$refs.formValidate.validate(function(a){t=a}),t){var o=this.$currentUser;this.modalFormData.comments.replace(/\\r\\n/g,\"<br>\").replace(/\\n/g,\"<br>\").replace(/\\s/g,\" \");var l={listId:\"2750a13d-295d-4776-9673-290c51bfc568\",wfParam:null,formData:{baseinfo:{handlerName:o.nickname,handlerUnitName:o.depts&&o.depts[0]?o.depts[0].name:\"\",handlerRoleName:o.isSysRoleList[0].name,handler:o.userId,handlerUnit:o.depts&&o.depts[0]?o.depts[0].id:\"\",handlerRole:o.isSysRoleList[0].id,creator:o.userId,modifer:o.userId,id:\"\",handlerEntity:o.entityId,biProcessStatus:null},jobLog:{logTitle:this.modalFormData.logTitle,taskDate:Object(s.b)(this.modalFormData.taskDate,\"yyyy-MM-dd\"),logDeclarationHours:this.modalFormData.logDeclarationHours,relTransCode:this.transCode,logType:this.modalFormData.logType,logStatus:this.modalFormData.logStatus},comment:{biComment:this.modalFormData.comments}}};Object(r._13)(l).then(function(a){a.success?(console.log(e),e.$refs.formValidate.resetFields(),e.getTaskLog(e.transCode)):window.top.Ext.toast(a.message)})}},getTaskLog:function(){var e=this;Object(r._1)(this.transCode,this.currentPage,this.pageSize).then(function(a){e.pageTotal=a.dataCount,e.logData=a.tableContent,e.logData.forEach(function(a){a.comment.replace(/<br>/g,\"\\r\\n\")})}).then(function(a){window.top.setTaskLogIframeHeight()})},changeCurrentPage:function(a){this.currentPage=a,this.getTaskLog()}},created:function(){this.transCode=this.$route.params.transCode,this.projectTaskId=this.$route.params.projectTaskId,this.getTaskLog()}},l=t(\"lTzZ\"),n=t.n(l);var i=function(a){t(\"Bpkm\")},m=t(\"VU/8\")(o,n.a,!1,i,\"data-v-76e692b7\",null);e.default=m.exports},Bpkm:function(a,e){},lTzZ:function(a,e){a.exports={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o(\"div\",{staticClass:\"timeline-box\"},[o(\"Drawer\",{attrs:{placement:\"right\",closable:!1,width:\"400\"},model:{value:t.helpPanelVisible,callback:function(a){t.helpPanelVisible=a},expression:\"helpPanelVisible\"}},[o(\"h3\",[t._v(\"工作+进展\")]),t._v(\" \"),o(\"br\"),t._v(\"\\n      今天研发任务已经完成了60%，比计划提前三天\\n      \"),o(\"Divider\"),t._v(\" \"),o(\"h3\",[t._v(\"工作+结果 \")]),t._v(\" \"),o(\"br\"),t._v(\"\\n      今天和客户谈了一个合同，成功拿到了500万订单\\n      \"),o(\"Divider\"),t._v(\" \"),o(\"h3\",[t._v(\"工作+策略 \")]),t._v(\" \"),o(\"br\"),t._v(\"\\n      通过与供应商争取到订单式生产的有利合同条款，解决了库存多的问题\\n      \"),o(\"Divider\"),t._v(\" \"),o(\"h3\",[t._v(\"问题+解决方案\")]),t._v(\" \"),o(\"br\"),t._v(\"\\n      A客户不同意我们的合同条款，想邀请后天老板一起拜访\\n       \"),o(\"Divider\"),t._v(\" \"),o(\"h3\",[t._v(\"计划+目标\")]),t._v(\" \"),o(\"br\"),t._v(\"\\n      明天，与质量部门开会，确认出厂产品的质量检验流程\\n  \")],1),t._v(\" \"),o(\"div\",{staticClass:\"app-resource-group-title\"},[o(\"span\",{staticClass:\"font16\"},[t._v(\"工作日志  \")]),t._v(\" \"),o(\"span\",{staticClass:\"font12 info-color\"},[t._v(\"不知道如何写日志？这里有模板哦!\")]),t._v(\" \"),o(\"Button\",{attrs:{size:\"small\"},on:{click:function(a){t.helpPanelVisible=!t.helpPanelVisible}}},[t._v(\"立即查看\\n        \"),o(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)],1),t._v(\" \"),o(\"div\",{staticClass:\"timeline-box-form\"},[o(\"Form\",{ref:\"formValidate\",attrs:{\"label-width\":120,model:t.modalFormData,rules:t.ruleValidate}},[o(\"Row\",[o(\"FormItem\",{attrs:{label:\"标题:\",prop:\"logTitle\"}},[o(\"Input\",{attrs:{placeholder:\"请输入工作日志标题\"},model:{value:t.modalFormData.logTitle,callback:function(a){t.$set(t.modalFormData,\"logTitle\",a)},expression:\"modalFormData.logTitle\"}})],1)],1),t._v(\" \"),o(\"Row\",[o(\"Col\",{attrs:{span:\"8\"}},[o(\"FormItem\",{attrs:{label:\"类型:\",prop:\"logType\"}},[o(\"Select\",{model:{value:t.modalFormData.logType,callback:function(a){t.$set(t.modalFormData,\"logType\",a)},expression:\"modalFormData.logType\"}},t._l(t.logTypeList,function(a){return o(\"Option\",{key:a.value,attrs:{value:a.value}},[t._v(t._s(a.label))])}))],1)],1),t._v(\" \"),o(\"Col\",{attrs:{span:\"8\"}},[o(\"FormItem\",{attrs:{label:\"日期:\",prop:\"taskDate\"}},[o(\"DatePicker\",{attrs:{type:\"date\",format:\"yyyy-MM-dd\",clearable:!1},model:{value:t.modalFormData.taskDate,callback:function(a){t.$set(t.modalFormData,\"taskDate\",a)},expression:\"modalFormData.taskDate\"}})],1)],1)],1),t._v(\" \"),o(\"Row\",[o(\"Col\",{attrs:{span:\"24\"}},[o(\"FormItem\",{attrs:{label:\"状态\",prop:\"logStatus\"}},[o(\"RadioGroup\",{model:{value:t.modalFormData.logStatus,callback:function(a){t.$set(t.modalFormData,\"logStatus\",a)},expression:\"modalFormData.logStatus\"}},[o(\"Radio\",{attrs:{label:\"1\"}},[t._v(\"已办\")]),t._v(\" \"),o(\"Radio\",{attrs:{label:\"0\"}},[t._v(\"待办\")])],1)],1)],1)],1),t._v(\" \"),o(\"FormItem\",{attrs:{label:\"申报工时:\",prop:\"logDeclarationHours\"}},[o(\"InputNumber\",{attrs:{min:.1,step:.1},model:{value:t.modalFormData.logDeclarationHours,callback:function(a){t.$set(t.modalFormData,\"logDeclarationHours\",a)},expression:\"modalFormData.logDeclarationHours\"}}),t._v(\" \"),o(\"span\",{staticStyle:{\"margin-left\":\"10px\"}},[t._v(\"单位/时\")])],1),t._v(\" \"),o(\"FormItem\",{attrs:{label:\"备注:\",prop:\"comments\"}},[o(\"Input\",{attrs:{type:\"textarea\",placeholder:\"输入您特别想备注的信息\"},model:{value:t.modalFormData.comments,callback:function(a){t.$set(t.modalFormData,\"comments\",a)},expression:\"modalFormData.comments\"}})],1),t._v(\" \"),o(\"FormItem\",[o(\"input\",{staticClass:\"timeline-box-form-submit\",attrs:{type:\"button\",value:\"提交\"},on:{click:t.submitLog}})])],1)],1),t._v(\" \"),o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:0!==t.logData.length,expression:\"logData.length===0?false:true\"}],staticClass:\"timeline-box-log\"},[t._l(t.logData,function(a,e){return o(\"ul\",{key:e,staticClass:\"timeline-box-log-item\"},[o(\"img\",{staticClass:\"head-portrait\",attrs:{src:a.photo?a.photo:\"resources/images/icon/defaultUserPhoto.png\"}}),t._v(\" \"),o(\"ul\",{staticClass:\"timeline-item-content-ul\"},[o(\"li\",[\"generally\"==a.logType?o(\"Tag\",{attrs:{color:\"primary\"}},[t._v(\"一般事项\")]):t._e(),t._v(\" \"),\"abnormal\"==a.logType?o(\"Tag\",{attrs:{color:\"error\"}},[t._v(\"异常事项\")]):t._e(),t._v(\" \"),\"conference\"==a.logType?o(\"Tag\",{attrs:{color:\"primary\"}},[t._v(\"会议事项\")]):t._e(),t._v(\" \"),\"0\"==a.logStatus?o(\"Tag\",{attrs:{color:\"red\"}},[t._v(\"待办\")]):t._e(),t._v(\" \"),\"1\"==a.logStatus?o(\"Tag\",{attrs:{color:\"green\"}},[t._v(\"已办\")]):t._e(),t._v(\" \"),o(\"strong\",[t._v(t._s(a.logTitle))])],1),t._v(\" \"),o(\"li\",[o(\"span\",[t._v(t._s(a.handlerName))]),t._v(\" \"),o(\"span\",[t._v(t._s(a.taskDate))]),t._v(\" \"),o(\"span\",{domProps:{innerHTML:t._s(a.logDeclarationHours+\" 小时\")}})]),t._v(\" \"),o(\"li\",[o(\"pre\",[t._v(t._s(a.comment))])])])])}),t._v(\" \"),o(\"div\",{staticClass:\"loading-more\"},[o(\"Page\",{attrs:{total:t.pageTotal,current:t.currentPage,\"page-size\":t.pageSize,\"prev-text\":\"上一页\",\"next-text\":\"下一页\",size:\"small\"},on:{\"on-change\":t.changeCurrentPage}})],1)],2)],1)},staticRenderFns:[]}}});"}