webpackJsonp([15],{"3C83":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("o32f"),r={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var t=this,a=this.$route.query;Object(s.P)(a).then(function(a){t.orgs=a.tableContent,window.top.getTotal=function(){return a.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/organization/detail/"+t.groupId)}},watch:{$route:function(t,a){this.getOrgs()}},mounted:function(){this.getOrgs()}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pad5"},t._l(t.orgs,function(a,s){return e("Card",{key:s,staticClass:"radius0 rfd-card"},[e("Row",{staticClass:"rfd-card-container"},[e("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[e("img",{staticClass:"rfd-card-img",attrs:{src:a.principalPhoto||"resources/images/icon/default_profile_bigger.png"},on:{click:function(e){t.goDetail(a)}}})]),t._v(" "),e("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[e("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(a.groupName)+"\n                ")]),t._v(" "),e("p",[t._v(t._s(a.groupType)),e("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:a.status},expression:"{status:org.status}"}],staticClass:"fr radius10 color_fff",attrs:{color:"blue"}})],1),t._v(" "),e("p",[t._v(t._s(a.principalName))])])],1)],1)}))},staticRenderFns:[]};var i=e("D8HT")(r,n,!1,function(t){e("TWfp")},"data-v-56830541",null);a.default=i.exports},TWfp:function(t,a){}});
//# sourceMappingURL=15.7bf0760c42ced0ed819e.js.map