webpackJsonp([14],{"iFB+":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("o32f"),n={name:"userBoard",data:function(){return{users:{}}},created:function(){},methods:{getUsers:function(){var t=this,e=this.$route.query;Object(a.A)(e.limit,e.page).then(function(e){t.users=e.tableContent,window.top.getTotal=function(){return e.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/user/detail/"+t.userId)},addUser:function(){window.open("/dist/index.html#/addressBook/user/add")}},watch:{$route:function(t,e){this.getUsers()}},mounted:function(){this.getUsers()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pad5"},t._l(t.users,function(e,a){return s("Card",{key:a,staticClass:"radius0 rfd-card"},[s("Row",{staticClass:"rfd-card-container"},[s("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[s("img",{staticClass:"rfd-card-img",attrs:{src:e.photo||"resources/images/icon/default_profile_bigger.png"},on:{click:function(s){t.goDetail(e)}}})]),t._v(" "),s("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[s("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(e.nickname)+"\n                ")]),t._v(" "),s("p",[t._v(t._s(e.mobile)),s("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.status},expression:"{status:user.status}"}],staticClass:"fr radius10 color_fff",attrs:{color:"blue"}})],1),t._v(" "),s("p",[t._v(t._s(e.userCode))])])],1)],1)}))},staticRenderFns:[]};var i=s("D8HT")(n,r,!1,function(t){s("nz2n")},"data-v-4794c1eb",null);e.default=i.exports},nz2n:function(t,e){}});
//# sourceMappingURL=14.f1e7ce594330c54baa8b.js.map