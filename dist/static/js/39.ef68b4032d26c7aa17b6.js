webpackJsonp([39],{Xn0E:function(t,n){t.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"pad5"},e._l(e.orgs,function(t,n){return s("Card",{key:n,staticClass:"radius0 orgCardItem"},[s("Row",{staticStyle:{"min-width":"260px"}},[s("Col",{staticClass:"marright5",staticStyle:{"min-width":"60px"},attrs:{span:"3"}},[s("img",{staticStyle:{width:"50px"},attrs:{src:"resources/images/icon/sales-order.png"}})]),e._v(" "),s("Col",{staticStyle:{"min-width":"180px"},attrs:{span:"17"}},[s("h5",{staticClass:"org-name"},[e._v(e._s(t.groupName)+"\n                          ")]),e._v(" "),s("p",[e._v(e._s(t.groupType)),s("Tag",{staticClass:"fr radius10",attrs:{color:"blue"}},[e._v("使用中")])],1),e._v(" "),s("p",[e._v(e._s(t.principalName))])])],1)],1)}))},staticRenderFns:[]}},kjkI:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("o32f"),a={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var n=this,t=this.$route.query;Object(s.Q)(t).then(function(t){n.orgs=t.tableContent,window.top.getTotal=function(){return t.dataCount}})}},watch:{$route:function(t,n){this.getOrgs()}},mounted:function(){this.getOrgs()}},r=e("Xn0E"),i=e.n(r);var o=function(t){e("wnyx")},c=e("VU/8")(a,i.a,!1,o,"data-v-51e8b592",null);n.default=c.exports},wnyx:function(t,n){}});