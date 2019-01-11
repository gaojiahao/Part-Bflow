webpackJsonp([35],{"3HHx":function(t,e){},"5Lfs":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("GIAq"),l=a("oAV5"),o={name:"TaskLog",components:{},props:{listId:{type:String}},data:function(){return{transCode:"",logData:[],modalFormData:{logTitle:"",taskDate:Object(l.b)(new Date,"yyyy-MM-dd"),logDeclarationHours:1,comments:""},ruleValidate:{logTitle:[{required:!0,message:"不允许为空"}],logDeclarationHours:[{required:!0,message:"不允许为空",type:"number"}],taskDate:[{required:!0,message:"不允许为空"}]},currentPage:1,pageTotal:0,pageSize:6}},methods:{submitLog:function(t){var e=this,a=void 0;if(this.$refs.formValidate.validate(function(t){a=t}),a){var o=this.$currentUser,s={listId:"ee4ff0a1-c612-419d-afd7-471913d57a2a",wfParam:null,formData:{baseinfo:{handlerName:o.nickname,handlerUnitName:o.depts?o.depts[0].name:"",handlerRoleName:o.isSysRoleList[0].name,handler:o.userId,handlerUnit:o.depts?o.depts[0].id:"",handlerRole:o.isSysRoleList[0].id,creator:o.userId,modifer:o.userId,id:"",handlerEntity:o.entityId,biProcessStatus:null},jobLog:{logTitle:this.modalFormData.logTitle,taskDate:Object(l.b)(this.modalFormData.taskDate,"yyyy-MM-dd"),logDeclarationHours:this.modalFormData.logDeclarationHours,projectTaskName:"测试",projectTaskCode:this.transCode},comment:{biComment:this.modalFormData.comments}}};Object(r._5)(s).then(function(t){t.success&&(e.$Message.success(t.message),e.$refs.formValidate.resetFields(),e.getTaskLog(e.transCode))})}},getTaskLog:function(){var e=this;Object(r.U)(this.transCode,this.currentPage,this.pageSize).then(function(t){e.pageTotal=t.dataCount,e.logData=t.tableContent}).then(function(t){window.top.setTaskLogIframeHeight()})},changeCurrentPage:function(t){this.currentPage=t,this.getTaskLog()}},created:function(){this.transCode=this.$route.params.transCode,this.getTaskLog()}},s=a("y2W7"),n=a.n(s);var i=function(t){a("3HHx")},m=a("VU/8")(o,n.a,!1,i,"data-v-b56a433c",null);e.default=m.exports},y2W7:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,o=a._self._c||t;return o("div",{staticClass:"timeline-box"},[a._m(0),a._v(" "),o("div",{staticClass:"timeline-box-form"},[o("Form",{ref:"formValidate",attrs:{"label-width":120,model:a.modalFormData,rules:a.ruleValidate}},[o("FormItem",{attrs:{label:"标题:",prop:"logTitle",width:"300"}},[o("Input",{attrs:{placeholder:"请输入任务日志标题"},model:{value:a.modalFormData.logTitle,callback:function(t){a.$set(a.modalFormData,"logTitle",t)},expression:"modalFormData.logTitle"}})],1),a._v(" "),o("FormItem",{attrs:{label:"日期",prop:"taskDate"}},[o("DatePicker",{attrs:{type:"date",format:"yyyy-MM-dd"},model:{value:a.modalFormData.taskDate,callback:function(t){a.$set(a.modalFormData,"taskDate",t)},expression:"modalFormData.taskDate"}})],1),a._v(" "),o("FormItem",{attrs:{label:"工时:",prop:"logDeclarationHours"}},[o("InputNumber",{attrs:{min:.1,step:.1},model:{value:a.modalFormData.logDeclarationHours,callback:function(t){a.$set(a.modalFormData,"logDeclarationHours",t)},expression:"modalFormData.logDeclarationHours"}}),a._v(" "),o("span",{staticStyle:{"margin-left":"10px"}},[a._v("单位/时")])],1),a._v(" "),o("FormItem",{attrs:{label:"描述:",prop:"comments"}},[o("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5}},model:{value:a.modalFormData.comments,callback:function(t){a.$set(a.modalFormData,"comments",t)},expression:"modalFormData.comments"}})],1),a._v(" "),o("FormItem",[o("input",{staticClass:"timeline-box-form-submit",attrs:{type:"button",value:"提交"},on:{click:a.submitLog}})])],1)],1),a._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:0!==a.logData.length,expression:"logData.length===0?false:true"}],staticClass:"timeline-box-log"},[a._l(a.logData,function(t,e){return o("ul",{key:e,staticClass:"timeline-box-log-item"},[o("img",{staticClass:"head-portrait",attrs:{src:t.photo?t.photo:"resources/images/icon/defaultUserPhoto.png"}}),a._v(" "),o("ul",{staticClass:"timeline-item-content-ul"},[o("li",[o("span",[a._v(a._s(t.handlerName))]),a._v(" "),o("span",[a._v(a._s(t.taskDate))]),a._v(" "),o("span",[a._v(a._s(t.logDeclarationHours+" 小时"))])]),a._v(" "),o("li",[o("span",{staticStyle:{"font-weight":"600"}},[a._v(a._s(t.logTitle))])]),a._v(" "),o("li",[o("span",{domProps:{innerHTML:a._s(t.comment)}})])])])}),a._v(" "),o("div",{staticClass:"loading-more"},[o("Page",{attrs:{total:a.pageTotal,current:a.currentPage,"page-size":a.pageSize,"prev-text":"上一页","next-text":"下一页",size:"small"},on:{"on-change":a.changeCurrentPage}})],1)],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-resource-group-title"},[a("h3",[t._v("任务日志")])])}]}}});