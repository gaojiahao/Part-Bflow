webpackJsonp([45],{"00A0":function(t,a){t.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"pad5"},n._l(n.companys,function(a,t){return e("Card",{key:t,staticClass:"radius0 rfd-card"},[e("Row",{staticClass:"rfd-card-container"},[e("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[e("img",{staticClass:"rfd-card-img",attrs:{src:a.groupPic||"resources/images/icon/defaultUserPhoto.png"},on:{click:function(t){n.goDetail(a)}}})]),n._v(" "),e("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[e("h5",{staticClass:"text-nowrap font14"},[n._v(n._s(a.groupName)+"\n      ")]),n._v(" "),e("p",[n._v(n._s(a.companyType)+"\n        "),e("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:a.status},expression:"{status:company.status}"}],staticClass:"fr radius10 color_fff"})],1),n._v(" "),e("p",[n._v(n._s(a.principal))])])],1)],1)}))},staticRenderFns:[]}},IVbt:function(t,a){},tw34:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("o32f"),s={name:"companyBoard",data:function(){return{companys:{}}},created:function(){},methods:{getCompanys:function(){var a=this,t=this.$route.query;Object(e.p)(t.limit,t.page,t.filterValue).then(function(t){a.companys=t.tableContent,window.top.getTotal=function(){return t.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/companyInfo/baseInfo/"+t.groupId)}},watch:{$route:function(t,a){this.getCompanys()}},mounted:function(){this.getCompanys()}},o=n("00A0"),i=n.n(o);var r=function(t){n("IVbt")},c=n("VU/8")(s,i.a,!1,r,"data-v-2229bad3",null);a.default=c.exports}});