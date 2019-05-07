webpackJsonp([43],{"5Lfs":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("GIAq"),o=e("7B+g"),r=e("oAV5"),s={name:"TaskLog",components:{},props:{listId:{type:String}},data:function(){var o=this;return{transCode:"",logData:[],helpPanelVisible:!1,logTypeList:[],modalFormData:{logTitle:"",taskDate:Object(r.b)(new Date,"yyyy-MM-dd"),logDeclarationHours:1,comments:"",logType:"",logStatus:"已办"},ruleValidate:{logTitle:[{required:!0,message:"不允许为空"},{type:"string",max:20,message:"标题不能超过20个字符"}],logType:[{required:!0,message:"不允许为空"}],logStatus:[{required:!0,message:"不允许为空"},{validator:function(t,a,e){o.modalFormData.taskDate<=new Date&&"已办"!=a?e(new Error("日期小于等于今日，日志类型应该为已办")):o.modalFormData.taskDate>new Date&&"待办"!=a&&e(new Error("日期大于今日，日志类型应该为待办")),e()}}],logDeclarationHours:[{required:!0,message:"不允许为空",type:"number"}],taskDate:[{required:!0,message:"不允许为空"}]},currentPage:1,pageTotal:0,pageSize:6}},methods:{submitLog:function(t){var a=this,e=void 0;if(this.$refs.formValidate.validate(function(t){e=t}),e){var o=this.$currentUser;this.modalFormData.comments.replace(/\r\n/g,"<br>").replace(/\n/g,"<br>").replace(/\s/g," ");var s={listId:"2750a13d-295d-4776-9673-290c51bfc568",wfParam:null,formData:{baseinfo:{handlerName:o.nickname,handlerUnitName:o.depts&&o.depts[0]?o.depts[0].name:"",handlerRoleName:o.isSysRoleList[0].name,handler:o.userId,handlerUnit:o.depts&&o.depts[0]?o.depts[0].id:"",handlerRole:o.isSysRoleList[0].id,creator:o.userId,modifer:o.userId,id:"",handlerEntity:o.entityId,biProcessStatus:null},jobLog:{logTitle:this.modalFormData.logTitle,taskDate:Object(r.b)(this.modalFormData.taskDate,"yyyy-MM-dd"),logDeclarationHours:this.modalFormData.logDeclarationHours,relTransCode:this.transCode,logType:this.modalFormData.logType,logStatus:this.modalFormData.logStatus},comment:{biComment:this.modalFormData.comments}}};Object(l._13)(s).then(function(t){t.success?(console.log(a),a.$refs.formValidate.resetFields(),a.getTaskLog(a.transCode)):window.top.Ext.toast(t.message)})}},getTaskLog:function(){var a=this;Object(l._1)(this.transCode,this.currentPage,this.pageSize).then(function(t){a.pageTotal=t.dataCount,a.logData=t.tableContent,a.logData.forEach(function(t){t.comment.replace(/<br>/g,"\r\n")})}).then(function(t){window.top.setTaskLogIframeHeight()})},changeCurrentPage:function(t){this.currentPage=t,this.getTaskLog()},handlerChangeLogStatus:function(t){Object(l._26)(t.jobLogId,t.logStatus).then(function(t){t.success&&console.log("修改成功")})},initLogTypeList:function(){var t,a=this;(t="logType",Object(o.a)("/H_roleplay-si/base/dict/getListByValue",{value:t})).then(function(t){a.logTypeList=t})}},created:function(){this.transCode=this.$route.params.transCode,this.initLogTypeList(),this.getTaskLog()}},n=e("l68C"),i=e.n(n);var m=function(t){e("PAQa")},c=e("VU/8")(s,i.a,!1,m,"data-v-4508d904",null);a.default=c.exports},PAQa:function(t,a){},l68C:function(t,a){t.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"timeline-box"},[o("Drawer",{attrs:{placement:"right",closable:!1,width:"400"},model:{value:e.helpPanelVisible,callback:function(t){e.helpPanelVisible=t},expression:"helpPanelVisible"}},[o("h3",[e._v("工作+进展")]),e._v(" "),o("br"),e._v("\n      今天研发任务已经完成了60%，比计划提前三天\n      "),o("Divider"),e._v(" "),o("h3",[e._v("工作+结果 ")]),e._v(" "),o("br"),e._v("\n      今天和客户谈了一个合同，成功拿到了500万订单\n      "),o("Divider"),e._v(" "),o("h3",[e._v("工作+策略 ")]),e._v(" "),o("br"),e._v("\n      通过与供应商争取到订单式生产的有利合同条款，解决了库存多的问题\n      "),o("Divider"),e._v(" "),o("h3",[e._v("问题+解决方案")]),e._v(" "),o("br"),e._v("\n      A客户不同意我们的合同条款，想邀请后天老板一起拜访\n       "),o("Divider"),e._v(" "),o("h3",[e._v("计划+目标")]),e._v(" "),o("br"),e._v("\n      明天，与质量部门开会，确认出厂产品的质量检验流程\n  ")],1),e._v(" "),o("div",{staticClass:"app-resource-group-title"},[o("span",{staticClass:"font16"},[e._v("工作日志  ")]),e._v(" "),o("span",{staticClass:"font12 info-color"},[e._v("不知道如何写日志？这里有模板哦!")]),e._v(" "),o("Button",{attrs:{size:"small"},on:{click:function(t){e.helpPanelVisible=!e.helpPanelVisible}}},[e._v("立即查看\n        "),o("Icon",{attrs:{type:"ios-arrow-forward"}})],1)],1),e._v(" "),o("div",{staticClass:"timeline-box-form"},[o("Form",{ref:"formValidate",attrs:{"label-width":120,model:e.modalFormData,rules:e.ruleValidate}},[o("Row",[o("Col",{attrs:{span:"24"}},[o("FormItem",{attrs:{label:"状态",prop:"logStatus"}},[o("Checkbox",{attrs:{size:"large","true-value":"已办","false-value":"待办"},model:{value:e.modalFormData.logStatus,callback:function(t){e.$set(e.modalFormData,"logStatus",t)},expression:"modalFormData.logStatus"}},[e._v("\n                "+e._s(e.modalFormData.logStatus)+"\n              ")])],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"24"}},[o("FormItem",{attrs:{label:"标题:",prop:"logTitle"}},[o("Input",{attrs:{placeholder:"请输入工作日志标题"},model:{value:e.modalFormData.logTitle,callback:function(t){e.$set(e.modalFormData,"logTitle",t)},expression:"modalFormData.logTitle"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"类型:",prop:"logType"}},[o("Select",{model:{value:e.modalFormData.logType,callback:function(t){e.$set(e.modalFormData,"logType",t)},expression:"modalFormData.logType"}},e._l(e.logTypeList,function(t){return o("Option",{key:t.name,attrs:{value:t.name}},[e._v(e._s(t.name))])}))],1)],1),e._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"日期:",prop:"taskDate"}},[o("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"date",format:"yyyy-MM-dd",clearable:!1},model:{value:e.modalFormData.taskDate,callback:function(t){e.$set(e.modalFormData,"taskDate",t)},expression:"modalFormData.taskDate"}})],1)],1),e._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"申报工时:",prop:"logDeclarationHours"}},[o("InputNumber",{attrs:{min:.1,step:.1},model:{value:e.modalFormData.logDeclarationHours,callback:function(t){e.$set(e.modalFormData,"logDeclarationHours",t)},expression:"modalFormData.logDeclarationHours"}}),e._v(" "),o("span",{staticStyle:{"margin-left":"10px"}},[e._v("单位/时")])],1)],1)],1),e._v(" "),o("Row"),e._v(" "),o("FormItem",{attrs:{label:"备注:",prop:"comments"}},[o("Input",{attrs:{type:"textarea",placeholder:"输入您特别想备注的信息"},model:{value:e.modalFormData.comments,callback:function(t){e.$set(e.modalFormData,"comments",t)},expression:"modalFormData.comments"}})],1),e._v(" "),o("FormItem",[o("input",{staticClass:"timeline-box-form-submit",attrs:{type:"button",value:"提交"},on:{click:e.submitLog}})])],1)],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:0!==e.logData.length,expression:"logData.length===0?false:true"}],staticClass:"timeline-box-log"},[e._l(e.logData,function(a,t){return o("ul",{key:t,staticClass:"timeline-box-log-item"},[o("img",{staticClass:"head-portrait",attrs:{src:a.photo?a.photo:"resources/images/icon/defaultUserPhoto.png"}}),e._v(" "),o("ul",{staticClass:"timeline-item-content-ul"},[o("li",[o("Checkbox",{attrs:{size:"large","true-value":"已办","false-value":"待办"},on:{"on-change":function(t){e.handlerChangeLogStatus(a)}},model:{value:a.logStatus,callback:function(t){e.$set(a,"logStatus",t)},expression:"item.logStatus"}}),e._v(" "),o("strong",[e._v(e._s(a.logTitle))])],1),e._v(" "),o("li",[o("span",[e._v(e._s(a.handlerName))]),e._v(" "),o("span",[e._v(e._s(a.taskDate))]),e._v(" "),o("span",{domProps:{innerHTML:e._s(a.logDeclarationHours+" 小时")}}),e._v(" "),o("span",[e._v(e._s(a.logType))])]),e._v(" "),o("li",[o("pre",[e._v(e._s(a.comment))])])])])}),e._v(" "),o("div",{staticClass:"loading-more"},[o("Page",{attrs:{total:e.pageTotal,current:e.currentPage,"page-size":e.pageSize,"prev-text":"上一页","next-text":"下一页",size:"small"},on:{"on-change":e.changeCurrentPage}})],1)],2)],1)},staticRenderFns:[]}}});