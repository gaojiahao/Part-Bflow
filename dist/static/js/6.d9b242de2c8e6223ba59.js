webpackJsonp([6],{"6pNb":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("header",{staticClass:"header"},[e._v("科目分录")]),e._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"main-form"},[a("Form",{attrs:{"label-position":"left",model:e.baseInfo,inline:"","label-width":75}},[a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"交易号:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.transCode,callback:function(t){e.$set(e.baseInfo,"transCode",t)},expression:"baseInfo.transCode"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"业务类型:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.transType,callback:function(t){e.$set(e.baseInfo,"transType",t)},expression:"baseInfo.transType"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"应用名称:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.appName,callback:function(t){e.$set(e.baseInfo,"appName",t)},expression:"baseInfo.appName"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"表单状态:"}},[a("Select",{model:{value:e.baseInfo.status.key,callback:function(t){e.$set(e.baseInfo.status,"key",t)},expression:"baseInfo.status.key"}},e._l(e.formStatus,function(t){return a("Option",{key:t.key,attrs:{value:t.key}},[e._v(e._s(t.value))])}))],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"生效时间:"}},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"date"},model:{value:e.baseInfo.effectiveTime,callback:function(t){e.$set(e.baseInfo,"effectiveTime",t)},expression:"baseInfo.effectiveTime"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"经办人:"}},[a("Select",{model:{value:e.baseInfo.status.key,callback:function(t){e.$set(e.baseInfo.status,"key",t)},expression:"baseInfo.status.key"}},e._l(e.formStatus,function(t){return a("Option",{key:t.key,attrs:{value:t.key}},[e._v(e._s(t.value))])}))],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"经办主体:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.handlerZhuTi,callback:function(t){e.$set(e.baseInfo,"handlerZhuTi",t)},expression:"baseInfo.handlerZhuTi"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"经办部门:"}},[a("Select",{model:{value:e.baseInfo.status.key,callback:function(t){e.$set(e.baseInfo.status,"key",t)},expression:"baseInfo.status.key"}},e._l(e.formStatus,function(t){return a("Option",{key:t.key,attrs:{value:t.key}},[e._v(e._s(t.value))])}))],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"经办职位:"}},[a("Select",{model:{value:e.baseInfo.status.key,callback:function(t){e.$set(e.baseInfo.status,"key",t)},expression:"baseInfo.status.key"}},e._l(e.formStatus,function(t){return a("Option",{key:t.key,attrs:{value:t.key}},[e._v(e._s(t.value))])}))],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"创建者:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.creatorName,callback:function(t){e.$set(e.baseInfo,"creatorName",t)},expression:"baseInfo.creatorName"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"修改者:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.modiferName,callback:function(t){e.$set(e.baseInfo,"modiferName",t)},expression:"baseInfo.modiferName"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"修改时间:"}},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"date"},model:{value:e.baseInfo.modTime,callback:function(t){e.$set(e.baseInfo,"modTime",t)},expression:"baseInfo.modTime"}})],1)],1)],1),e._v(" "),a("div",[a("div",[a("RadioGroup",{model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[a("Radio",{attrs:{label:"1"}},[a("span",[e._v("无辅助项")])]),e._v(" "),a("Radio",{attrs:{label:"2"}},[a("span",[e._v("项目计划")])]),e._v(" "),a("Radio",{attrs:{label:"3"}},[a("span",[e._v("内部主体")])])],1)],1),e._v(" "),a("Form",{attrs:{"label-position":"left",model:e.baseInfo,inline:"","label-width":75}},[a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"项目交易号:"}},[a("Select")],1),e._v(" "),a("FormItem",{staticStyle:{width:"22%"},attrs:{label:"项目名称:"}},[a("Input",{attrs:{type:"text"},model:{value:e.baseInfo.transType,callback:function(t){e.$set(e.baseInfo,"transType",t)},expression:"baseInfo.transType"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"main-tabs"},[a("Tabs",{attrs:{value:"name1"}},[a("TabPane",{attrs:{label:"会计类科目",name:"name1"}},[a("Table",{attrs:{columns:e.columns1,data:e.data1}})],1),e._v(" "),a("TabPane",{attrs:{label:"非会计类科目",name:"name2"}},[a("Table",{attrs:{columns:e.columns1,data:e.data1}})],1)],1)],1)])])},staticRenderFns:[]};var l=a("VU/8")({name:"SubjectForm",data:function(){return{baseInfo:{transCode:"0001",transType:"科目分录",appName:"",status:{value:"已生效",key:1},effectiveTime:"",handlerName:"",handlerZhuTi:"",handlerArea:"",handlerUnitName:"",creatorName:"",modiferName:"",modTime:""},formStatus:[{value:"已失效",key:-1},{value:"草稿",key:0},{value:"已生效",key:1},{value:"进行中",key:2}],type:"1",columns1:[{title:"摘要",key:"abstract"},{title:"管理科目",key:"manageSubject"},{title:"基础对象",key:"object"},{title:"增加金额",key:"addMoney"},{title:"减少金额",key:"decMoney"}],data1:[{abstract:"John Brown",manageSubject:18,object:"New York No. 1 Lake Park",addMoney:"2016-10-03",decMoney:""}]}}},s,!1,function(e){a("V2Rd")},null,null);t.default=l.exports},V2Rd:function(e,t){}});
//# sourceMappingURL=6.d9b242de2c8e6223ba59.js.map