{"source":"webpackJsonp([35],{\"3C83\":function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(\"mvHQ\"),s=a.n(r),o=a(\"o32f\"),n={name:\"orgBoard\",data:function(){return{orgs:{}}},created:function(){},methods:{getOrgs:function(){var e=this,t=this.$route.query,a=void 0;\"groupName\"===t.filterProperty&&(a=[{operator:\"like\",value:t.filterValue,property:\"groupName\"}]),Object(o.Q)(t.limit,t.page,s()(a)).then(function(t){e.orgs=t.tableContent,window.top.getTotal=function(){return t.dataCount}})},goDetail:function(t){window.open(\"/dist/index.html#/addressBook/organization/detail/\"+t.groupId)}},watch:{$route:function(t,e){this.getOrgs()}},mounted:function(){this.getOrgs()}},i=a(\"TfaK\"),c=a.n(i);var u=function(t){a(\"eVM4\")},d=a(\"VU/8\")(n,c.a,!1,u,\"data-v-88d88f30\",null);e.default=d.exports},TfaK:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r(\"div\",{staticClass:\"pad5\"},a._l(a.orgs,function(e,t){return r(\"Card\",{key:t,staticClass:\"radius0 rfd-card\"},[r(\"Row\",{staticClass:\"rfd-card-container\"},[r(\"Col\",{staticClass:\"rfd-card-left\",attrs:{span:\"3\"}},[r(\"img\",{staticClass:\"rfd-card-img\",attrs:{src:e.principalPhoto||\"resources/images/icon/defaultUserPhoto.jpg\"},on:{click:function(t){a.goDetail(e)}}})]),a._v(\" \"),r(\"Col\",{staticClass:\"rfd-card-content\",attrs:{span:\"17\"}},[r(\"h5\",{staticClass:\"text-nowrap font14\"},[a._v(a._s(e.groupName)+\"\\n                \")]),a._v(\" \"),r(\"p\",[a._v(a._s(\"M\"===e.groupType?\"管理层\":\"A\"===e.groupType?\"事业部\":\"O\"===e.groupType?\"部门\":\"小组\")),r(\"Tag\",{directives:[{name:\"instanceStateDirective\",rawName:\"v-instanceStateDirective\",value:{status:e.status},expression:\"{status:org.status}\"}],staticClass:\"fr radius10 color_fff\",attrs:{color:\"blue\"}})],1),a._v(\" \"),r(\"p\",[a._v(a._s(e.principalName))])])],1)],1)}),1)},staticRenderFns:[]}},eVM4:function(t,e){}});"}