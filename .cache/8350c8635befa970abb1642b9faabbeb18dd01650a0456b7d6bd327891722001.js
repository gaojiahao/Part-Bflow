{"source":"webpackJsonp([37],{\"Uk//\":function(t,e){},Wat2:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i(\"div\",{staticClass:\"timeline-box\"},[a._m(0),a._v(\" \"),a.isAdmin?i(\"div\",{staticClass:\"timeline-box-form\"},[i(\"Form\",{ref:\"formValidate\",attrs:{\"label-width\":120,model:a.modalFormData,rules:a.ruleValidate}},[i(\"FormItem\",{attrs:{label:\"更新范围:\",prop:\"scope\",width:\"300\"}},[i(\"Select\",{attrs:{multiple:\"\"},model:{value:a.modalFormData.scope,callback:function(t){a.$set(a.modalFormData,\"scope\",t)},expression:\"modalFormData.scope\"}},[i(\"Option\",{attrs:{value:\"表单\"}},[a._v(\"表单\")]),a._v(\" \"),i(\"Option\",{attrs:{value:\"科目关系\"}},[a._v(\"科目关系\")]),a._v(\" \"),i(\"Option\",{attrs:{value:\"报表\"}},[a._v(\"报表\")]),a._v(\" \"),i(\"Option\",{attrs:{value:\"工作流\"}},[a._v(\"工作流\")]),a._v(\" \"),i(\"Option\",{attrs:{value:\"权限\"}},[a._v(\"权限\")])],1)],1),a._v(\" \"),i(\"FormItem\",{attrs:{label:\"耗用时间:\",prop:\"spendTime\"}},[i(\"InputNumber\",{attrs:{min:0},model:{value:a.modalFormData.spendTime,callback:function(t){a.$set(a.modalFormData,\"spendTime\",t)},expression:\"modalFormData.spendTime\"}}),a._v(\" \"),i(\"span\",{staticStyle:{\"margin-left\":\"10px\"}},[a._v(\"单位/时\")])],1),a._v(\" \"),i(\"FormItem\",{attrs:{label:\"更新内容:\",prop:\"content\"}},[i(\"div\",{ref:\"logeditor\"})]),a._v(\" \"),i(\"FormItem\",[i(\"input\",{staticClass:\"timeline-box-form-submit\",attrs:{type:\"button\",value:\"提交\"},on:{click:a.submitLog}})])],1)],1):a._e(),a._v(\" \"),i(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:0!==a.logData.length,expression:\"logData.length===0?false:true\"}],staticClass:\"timeline-box-log\"},[a._l(a.logData,function(t,e){return i(\"div\",{key:e,staticClass:\"timeline-box-log-item\"},[i(\"div\",{staticClass:\"timeline-item-content-header\"},[i(\"div\",{staticClass:\"circle\"}),a._v(\" \"),i(\"span\",{staticClass:\"time\"},[a._v(a._s(t.VERSION))])]),a._v(\" \"),i(\"ul\",{staticClass:\"timeline-item-content-ul\"},[i(\"li\",[i(\"span\",[a._v(a._s(t.CREATOR_NAME))]),a._v(\" \"),i(\"span\",[a._v(a._s(t.CRT_TIME))]),a._v(\" \"),i(\"span\",[a._v(\"耗用时间:\"+a._s(t.TIME_CONSUMING))])]),a._v(\" \"),i(\"li\",[i(\"span\",[a._v(\"更新范围:\")]),a._v(\" \"),a._l(t.CHANGE_RANGE,function(t,e){return i(\"span\",{key:e,staticClass:\"customs-tag\"},[a._v(a._s(t))])})],2),a._v(\" \"),i(\"li\",[a._v(\"\\n          备注:\\n          \"),i(\"span\",{domProps:{innerHTML:a._s(t.CONTENT)}})])])])}),a._v(\" \"),10*a.currentPage<a.dataCount?i(\"div\",{staticClass:\"loading-more\"},[i(\"a\",{on:{click:a.handleLoadingMore}},[i(\"i\",{staticClass:\"iconfont\"},[a._v(\"\")]),a._v(\"\\n        点击加载更多\\n      \")])]):i(\"div\",{staticClass:\"loading-more\"},[a._v(\"\\n        没有更多数据了...\\n    \")])],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"app-resource-group-title\"},[a(\"h3\",[t._v(\"更新日志\")])])}]}},Yz4p:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(\"GIAq\"),i=a(\"sYY+\"),o=a.n(i),n={name:\"ChangeLog\",components:{},props:{listId:{type:String},isAdmin:{type:Boolean}},data:function(){return{isAdminTrue:!1,logData:[],modalFormData:{scope:[],spendTime:1,content:\"\"},ruleValidate:{scope:[{type:\"array\",required:!0,message:\"不允许为空\"}],spendTime:[{required:!0,message:\"不允许为空\",type:\"number\"}],content:[{required:!0,message:\" \"}]},dataCount:0,currentPage:1}},watch:{isAdmin:function(t){this.isAdminTrue=!!t}},methods:{submitLog:function(t){var e=this,a=void 0;if(\"<div></div>\"===this.logeditor.txt.html()?this.$Message.error(\"必填项请输入！\"):this.modalFormData.content=this.logeditor.txt.html(),this.$refs.formValidate.validate(function(t){a=t}),a){var i=this.listId,o=this.modalFormData.scope.join(\",\"),n=this.modalFormData.spendTime,s=this.modalFormData.content;Object(r.W)(i,o,n,s).then(function(t){t.success&&(e.$Message.success(t.message),e.logeditor.txt.html(\"<div></div>\"),e.$refs.formValidate.resetFields(),e.getChangeLog())})}},getChangeLog:function(){var e=this,t=this.listId;Object(r.B)(t).then(function(t){t.tableContent&&(t.tableContent.map(function(t){t.CHANGE_RANGE&&(t.CHANGE_RANGE=t.CHANGE_RANGE.split(\",\"))}),e.logData=t.tableContent,e.dataCount=t.dataCount),setTimeout(function(){e.createEditor()},10)})},handleLoadingMore:function(t){var e=this;this.currentPage++,Object(r.B)(this.listId,this.currentPage).then(function(t){t.tableContent&&t.tableContent.map(function(t){t.CHANGE_RANGE&&(t.CHANGE_RANGE=t.CHANGE_RANGE.split(\",\")),e.logData.push(t)})})},createEditor:function(){var e=this;this.logeditor=new o.a(this.$refs.logeditor),this.logeditor.customConfig.onchange=function(t){e.modalFormData.content=t},this.logeditor.customConfig.zIndex=100,this.logeditor.customConfig.menus=[\"head\",\"bold\",\"fontSize\",\"fontName\",\"italic\",\"underline\",\"strikeThrough\",\"foreColor\",\"backColor\",\"link\",\"list\",\"justify\",\"quote\",\"emoticon\",\"code\",\"undo\",\"redo\"],this.logeditor.create(),this.logeditor.txt.html(\"<div></div>\")}},created:function(){this.getChangeLog()}},s=a(\"Wat2\"),l=a.n(s);var c=function(t){a(\"Uk//\")},d=a(\"VU/8\")(n,l.a,!1,c,\"data-v-7f92eaee\",null);e.default=d.exports}});"}