webpackJsonp([19],{nqiv:function(t,a){},tw34:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("o32f"),s={name:"companyBoard",data:function(){return{companys:{}}},created:function(){},methods:{getCompanys:function(){var t=this,a=this.$route.query;Object(e.u)(a.limit,a.page,a.filterValue).then(function(a){t.companys=a.tableContent,window.top.getTotal=function(){return a.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/companyInfo/baseInfo/"+t.groupId)}},watch:{$route:function(t,a){this.getCompanys()}},mounted:function(){this.getCompanys()}},i={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"pad5"},t._l(t.companys,function(a,e){return n("Card",{key:e,staticClass:"radius0 rfd-card"},[n("Row",{staticClass:"rfd-card-container"},[n("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[n("img",{staticClass:"rfd-card-img",attrs:{src:a.groupPic||"resources/images/icon/default_profile_bigger.png"},on:{click:function(n){t.goDetail(a)}}})]),t._v(" "),n("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[n("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(a.groupName)+"\n      ")]),t._v(" "),n("p",[t._v(t._s(a.companyType)+"\n        "),n("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:a.status},expression:"{status:company.status}"}],staticClass:"fr radius10 color_fff"})],1),t._v(" "),n("p",[t._v(t._s(a.principal))])])],1)],1)}))},staticRenderFns:[]};var o=n("D8HT")(s,i,!1,function(t){n("nqiv")},"data-v-c92f31de",null);a.default=o.exports}});
//# sourceMappingURL=19.2e28826fbded08fd7307.js.map