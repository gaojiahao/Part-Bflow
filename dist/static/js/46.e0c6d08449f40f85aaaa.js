webpackJsonp([46],{HNWd:function(t,s){},kjkI:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("o32f"),n={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var s=this,t=this.$route.query;Object(a.Q)(t).then(function(t){s.orgs=t.tableContent,window.top.getTotal=function(){return t.dataCount}})}},watch:{$route:function(t,s){this.getOrgs()}},mounted:function(){this.getOrgs()}},r=e("sbks"),i=e.n(r);var o=function(t){e("HNWd")},c=e("VU/8")(n,i.a,!1,o,"data-v-38145dd4",null);s.default=c.exports},sbks:function(t,s){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pad5"},e._l(e.orgs,function(t,s){return a("Card",{key:s,staticClass:"radius0 orgCardItem"},[a("Row",{staticStyle:{"min-width":"260px"}},[a("Col",{staticClass:"marright5",staticStyle:{"min-width":"60px"},attrs:{span:"3"}},[a("img",{staticStyle:{width:"50px"},attrs:{src:"resources/images/icon/sales-order.png"}})]),e._v(" "),a("Col",{staticStyle:{"min-width":"180px"},attrs:{span:"17"}},[a("h5",{staticClass:"org-name"},[e._v(e._s(t.groupName)+"\n                          ")]),e._v(" "),a("p",[e._v(e._s(t.groupType)),a("Tag",{staticClass:"fr radius10",attrs:{color:"blue"}},[e._v("使用中")])],1),e._v(" "),a("p",[e._v(e._s(t.principalName))])])],1)],1)}),1)},staticRenderFns:[]}}});