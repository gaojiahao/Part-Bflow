webpackJsonp([16],{"iFB+":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e("o32f"),a={name:"userBoard",data:function(){return{users:{}}},created:function(){},methods:{getUsers:function(){var t=this,s=this.$route.query;Object(r.g)(s.page,s.limit).then(function(s){t.users=s.tableContent,window.top.getTotal=function(){return s.dataCount}})}},watch:{$route:function(t,s){this.getUsers()}},mounted:function(){this.getUsers()}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"pad5"},[e("Row",{attrs:{gutter:8}},t._l(t.users,function(s,r){return e("Col",{key:r,staticClass:"pad5 ",attrs:{xs:24,sm:12,md:8,lg:6}},[e("Card",{staticClass:"radius0"},[e("Row",[e("Col",{staticClass:"marright5",attrs:{span:"4"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:"resources/images/icon/contactor.png"}})]),t._v(" "),e("Col",{attrs:{span:"18"}},[e("p",[t._v(t._s(s.nickname)+"\n                               "),e("Tag",{staticClass:"fr radius10",attrs:{color:"blue"}},[t._v("使用中")])],1),t._v(" "),e("p",[t._v(t._s(s.mobile))]),t._v(" "),e("p",[t._v(t._s(s.userCode))])])],1)],1)],1)}))],1)},staticRenderFns:[]},i=e("D8HT")(a,n,!1,null,null,null);s.default=i.exports}});
//# sourceMappingURL=16.bfd9251c60e54045783d.js.map