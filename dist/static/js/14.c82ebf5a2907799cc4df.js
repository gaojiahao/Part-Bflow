webpackJsonp([14],{"3C83":function(t,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=a("o32f"),e={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var t=this,r=this.$route.query;Object(s.v)(r).then(function(r){t.orgs=r.tableContent,window.top.getTotal=function(){return r.dataCount}})}},watch:{$route:function(t,r){this.getOrgs()}},mounted:function(){this.getOrgs()}},n={render:function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"pad5"},t._l(t.orgs,function(r,s){return a("Card",{key:s,staticClass:"radius0 rfd-card"},[a("Row",{staticClass:"rfd-card-container"},[a("Col",{staticClass:"marright5 rfd-card-left",attrs:{span:"3"}},[a("img",{staticClass:"rfd-card-img",attrs:{src:"resources/images/icon/sales-order.png"}})]),t._v(" "),a("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[a("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(r.groupName)+"\n                ")]),t._v(" "),a("p",[t._v(t._s(r.groupType)),a("Tag",{staticClass:"fr radius10",attrs:{color:"blue"}},[t._v("使用中")])],1),t._v(" "),a("p",[t._v(t._s(r.principalName))])])],1)],1)}))},staticRenderFns:[]};var o=a("D8HT")(e,n,!1,function(t){a("oM4l")},"data-v-39ac699c",null);r.default=o.exports},oM4l:function(t,r){}});
//# sourceMappingURL=14.c82ebf5a2907799cc4df.js.map