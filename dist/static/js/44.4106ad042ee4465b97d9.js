webpackJsonp([44],{Yz4p:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("GIAq"),o=a("sYY+"),s=a.n(o),n={name:"ChangeLog",components:{},props:{listId:{type:String},isAdmin:{type:Boolean}},data:function(){return{isAdminTrue:!1,logData:[],modalFormData:{scope:[],spendTime:1,content:""},ruleValidate:{scope:[{type:"array",required:!0,message:"不允许为空"}],spendTime:[{required:!0,message:"不允许为空",type:"number"}],content:[{required:!0,message:" "}]},dataCount:0,currentPage:1}},watch:{isAdmin:function(t){this.isAdminTrue=!!t}},methods:{submitLog:function(t){var e=this,a=void 0;if("<div></div>"===this.logeditor.txt.html()?this.$Message.error("必填项请输入！"):this.modalFormData.content=this.logeditor.txt.html(),this.$refs.formValidate.validate(function(t){a=t}),a){var o=this.listId,s=this.modalFormData.scope.join(","),n=this.modalFormData.spendTime,l=this.modalFormData.content;Object(i.W)(o,s,n,l).then(function(t){t.success&&(e.$Message.success(t.message),e.logeditor.txt.html("<div></div>"),e.$refs.formValidate.resetFields(),e.getChangeLog())})}},getChangeLog:function(){var t=this,e=this.listId;Object(i.B)(e).then(function(e){e.tableContent&&(e.tableContent.map(function(t){t.CHANGE_RANGE&&(t.CHANGE_RANGE=t.CHANGE_RANGE.split(","))}),t.logData=e.tableContent,t.dataCount=e.dataCount),setTimeout(function(){t.createEditor()},10)})},handleLoadingMore:function(t){var e=this;this.currentPage++,Object(i.B)(this.listId,this.currentPage).then(function(t){t.tableContent&&t.tableContent.map(function(t){t.CHANGE_RANGE&&(t.CHANGE_RANGE=t.CHANGE_RANGE.split(",")),e.logData.push(t)})})},createEditor:function(){var t=this;this.logeditor=new s.a(this.$refs.logeditor),this.logeditor.customConfig.onchange=function(e){t.modalFormData.content=e},this.logeditor.customConfig.zIndex=100,this.logeditor.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","code","undo","redo"],this.logeditor.create(),this.logeditor.txt.html("<div></div>")}},created:function(){this.getChangeLog()}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"timeline-box"},[t._m(0),t._v(" "),t.isAdmin?a("div",{staticClass:"timeline-box-form"},[a("Form",{ref:"formValidate",attrs:{"label-width":120,model:t.modalFormData,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"更新范围:",prop:"scope",width:"300"}},[a("Select",{attrs:{multiple:""},model:{value:t.modalFormData.scope,callback:function(e){t.$set(t.modalFormData,"scope",e)},expression:"modalFormData.scope"}},[a("Option",{attrs:{value:"表单"}},[t._v("表单")]),t._v(" "),a("Option",{attrs:{value:"科目关系"}},[t._v("科目关系")]),t._v(" "),a("Option",{attrs:{value:"报表"}},[t._v("报表")]),t._v(" "),a("Option",{attrs:{value:"工作流"}},[t._v("工作流")]),t._v(" "),a("Option",{attrs:{value:"权限"}},[t._v("权限")])],1)],1),t._v(" "),a("FormItem",{attrs:{label:"耗用时间:",prop:"spendTime"}},[a("InputNumber",{attrs:{min:0},model:{value:t.modalFormData.spendTime,callback:function(e){t.$set(t.modalFormData,"spendTime",e)},expression:"modalFormData.spendTime"}}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v("单位/时")])],1),t._v(" "),a("FormItem",{attrs:{label:"更新内容:",prop:"content"}},[a("div",{ref:"logeditor"})]),t._v(" "),a("FormItem",[a("Button",{staticClass:"timeline-box-form-submit",on:{click:t.submitLog}},[t._v("提交")])],1)],1)],1):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0!==t.logData.length,expression:"logData.length===0?false:true"}],staticClass:"timeline-box-log"},[t._l(t.logData,function(e,i){return a("div",{key:i,staticClass:"timeline-box-log-item"},[a("div",{staticClass:"timeline-item-content-header"},[a("div",{staticClass:"circle"}),t._v(" "),a("span",{staticClass:"time"},[t._v(t._s(e.VERSION))])]),t._v(" "),a("ul",{staticClass:"timeline-item-content-ul"},[a("li",[a("span",[t._v(t._s(e.CREATOR_NAME))]),t._v(" "),a("span",[t._v(t._s(e.CRT_TIME))]),t._v(" "),a("span",[t._v("耗用时间:"+t._s(e.TIME_CONSUMING))])]),t._v(" "),a("li",[a("span",[t._v("更新范围:")]),t._v(" "),t._l(e.CHANGE_RANGE,function(e,i){return a("span",{key:i,staticClass:"customs-tag"},[t._v(t._s(e))])})],2),t._v(" "),a("li",[t._v("\n          备注:\n          "),a("span",{domProps:{innerHTML:t._s(e.CONTENT)}})])])])}),t._v(" "),10*t.currentPage<t.dataCount?a("div",{staticClass:"loading-more"},[a("a",{on:{click:t.handleLoadingMore}},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n        点击加载更多\n      ")])]):a("div",{staticClass:"loading-more"},[t._v("\n        没有更多数据了...\n    ")])],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-resource-group-title"},[e("h3",[this._v("更新日志")])])}]};var r=a("VU/8")(n,l,!1,function(t){a("j/IL")},"data-v-4f623ed2",null);e.default=r.exports},"j/IL":function(t,e){}});