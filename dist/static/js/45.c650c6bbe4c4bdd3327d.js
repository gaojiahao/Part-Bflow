webpackJsonp([45],{"1F90":function(t,e){},"3C83":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("3SZ7"),s=a.n(r),o=a("o32f"),n={name:"orgBoard",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var t=this,e=this.$route.query,a=void 0;"groupName"===e.filterProperty&&(a=[{operator:"like",value:e.filterValue,property:"groupName"}]),Object(o.P)(e.limit,e.page,s()(a)).then(function(e){t.orgs=e.tableContent,window.top.getTotal=function(){return e.dataCount}})},goDetail:function(t){window.open("/dist/index.html#/addressBook/organization/detail/"+t.groupId)}},watch:{$route:function(t,e){this.getOrgs()}},mounted:function(){this.getOrgs()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pad5"},t._l(t.orgs,function(e,r){return a("Card",{key:r,staticClass:"radius0 rfd-card"},[a("Row",{staticClass:"rfd-card-container"},[a("Col",{staticClass:"rfd-card-left",attrs:{span:"3"}},[a("img",{staticClass:"rfd-card-img",attrs:{src:e.principalPhoto||"resources/images/icon/defaultUserPhoto.jpg"},on:{click:function(a){t.goDetail(e)}}})]),t._v(" "),a("Col",{staticClass:"rfd-card-content",attrs:{span:"17"}},[a("h5",{staticClass:"text-nowrap font14"},[t._v(t._s(e.groupName)+"\n                ")]),t._v(" "),a("p",[t._v(t._s("M"===e.groupType?"管理层":"A"===e.groupType?"事业部":"O"===e.groupType?"部门":"小组")),a("Tag",{directives:[{name:"instanceStateDirective",rawName:"v-instanceStateDirective",value:{status:e.status},expression:"{status:org.status}"}],staticClass:"fr radius10 color_fff",attrs:{color:"blue"}})],1),t._v(" "),a("p",[t._v(t._s(e.principalName))])])],1)],1)}))},staticRenderFns:[]};var c=a("D8HT")(n,i,!1,function(t){a("1F90")},"data-v-ea03cf4a",null);e.default=c.exports}});