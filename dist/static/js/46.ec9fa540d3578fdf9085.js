webpackJsonp([46],{"5LkP":function(t,a){t.exports={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{staticClass:"pad5"},n._l(n.companys,function(a,t){return s("Card",{key:t,staticClass:"radius0 rfd-card"},[s("Row",{staticClass:"rfd-card-container"},[s("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[s("img",{staticClass:"rfd-card-img",attrs:{src:a.groupPic||"resources/images/icon/defaultUserPhoto.jpg"},on:{click:function(t){n.goDetail(a)}}})]),n._v(" "),s("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[s("h5",{staticClass:"text-nowrap font14"},[n._v(n._s(a.groupName)+"\n      ")]),n._v(" "),s("p",[n._v(n._s(a.companyType)+"\n        "),s("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:a.status},expression:"{status:company.status}"}],staticClass:"fr radius10 color_fff"})],1),n._v(" "),s("p",[n._v(n._s(a.principal))])])],1)],1)}),1)},staticRenderFns:[]}},tw34:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=n("o32f"),e={name:"companyBoard",data:function(){return{companys:{}}},created:function(){},methods:{getCompanys:function(){var a=this,t=this.$route.query;Object(s.s)(t.limit,t.page,t.filterValue).then(function(t){a.companys=t.tableContent,window.top.getTotal=function(){return t.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/companyInfo/baseInfo/"+t.groupId)}},watch:{$route:function(t,a){this.getCompanys()}},mounted:function(){this.getCompanys()}},o=n("5LkP"),i=n.n(o);var r=function(t){n("znhB")},c=n("VU/8")(e,i.a,!1,r,"data-v-25018b8c",null);a.default=c.exports},znhB:function(t,a){}});