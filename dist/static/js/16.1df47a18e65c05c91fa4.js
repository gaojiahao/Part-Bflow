webpackJsonp([16],{"/zxX":function(t,e){},kjkI:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("o32f"),r={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var t=this,e=this.$route.query;Object(a.P)(e).then(function(e){t.orgs=e.tableContent,window.top.getTotal=function(){return e.dataCount}})}},watch:{$route:function(t,e){this.getOrgs()}},mounted:function(){this.getOrgs()}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pad5"},t._l(t.orgs,function(e,a){return s("Card",{key:a,staticClass:"radius0 orgCardItem"},[s("Row",{staticStyle:{"min-width":"260px"}},[s("Col",{staticClass:"marright5",staticStyle:{"min-width":"60px"},attrs:{span:"3"}},[s("img",{staticStyle:{width:"50px"},attrs:{src:"resources/images/icon/sales-order.png"}})]),t._v(" "),s("Col",{staticStyle:{"min-width":"180px"},attrs:{span:"17"}},[s("h5",{staticClass:"org-name"},[t._v(t._s(e.groupName)+"\n                          ")]),t._v(" "),s("p",[t._v(t._s(e.groupType)),s("Tag",{staticClass:"fr radius10",attrs:{color:"blue"}},[t._v("使用中")])],1),t._v(" "),s("p",[t._v(t._s(e.principalName))])])],1)],1)}))},staticRenderFns:[]};var i=s("VU/8")(r,n,!1,function(t){s("/zxX")},"data-v-51e8b592",null);e.default=i.exports}});
//# sourceMappingURL=16.1df47a18e65c05c91fa4.js.map