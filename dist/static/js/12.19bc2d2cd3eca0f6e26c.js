webpackJsonp([12],{Qld8:function(t,a){},tw34:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=n("o32f"),e={name:"companyBoard",data:function(){return{companys:{}}},created:function(){},methods:{getCompanys:function(){var t=this;Object(s.u)().then(function(a){t.companys=a.tableContent,window.top.getTotal=function(){return a.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/companyInfo/baseInfo/"+t.groupId)}},watch:{$route:function(t,a){this.getCompanys()}},mounted:function(){this.getCompanys()}},o={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"pad5"},t._l(t.companys,function(a,s){return n("Card",{key:s,staticClass:"radius0 rfd-card"},[n("Row",{staticClass:"rfd-card-container"},[n("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[n("img",{staticClass:"rfd-card-img",attrs:{src:a.groupPic||"resources/images/icon/default_profile_bigger.png"},on:{click:function(n){t.goDetail(a)}}})]),t._v(" "),n("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[n("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(a.groupName)+"\n                ")]),t._v(" "),n("p",[t._v(t._s(a.depFunction)),n("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:a.status},expression:"{status:company.status}"}],staticClass:"fr radius10 color_fff"})],1),t._v(" "),n("p",[t._v(t._s(a.principal))])])],1)],1)}))},staticRenderFns:[]};var c=n("VU/8")(e,o,!1,function(t){n("Qld8")},"data-v-8dbb3fcc",null);a.default=c.exports}});
//# sourceMappingURL=12.19bc2d2cd3eca0f6e26c.js.map