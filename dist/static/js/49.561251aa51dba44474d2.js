webpackJsonp([49],{"3NcB":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("HLrm"),o=e.n(a);var i=function(t){e("ggBH")},n=e("VU/8")({name:"FlowTaskLayout",data:function(){return{}},watch:{$route:function(t,s){}},mounted:function(){}},o.a,!1,i,"data-v-0894b3d6",null);s.default=n.exports},HLrm:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"flowtask"},[e("div",{staticClass:"flowtask-sider"},[e("div",{staticClass:"flowtask-sider-header"},[t._v("工作流任务\n            "),e("Tooltip",{attrs:{content:"消息"}},[e("router-link",{attrs:{to:{name:"message"}}},[e("Icon",{attrs:{type:"md-repeat",size:"24"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"flowtask-sider-list"},[e("router-link",{attrs:{to:{name:"todo"}}},[e("div",{staticClass:"flowtask-sider-list-item",class:{active:"todo"==t.$route.name}},[e("Icon",{attrs:{type:"ios-cloud",color:"#e76838",size:"30"}}),t._v("\n                    所有待办\n                ")],1)]),t._v(" "),e("router-link",{attrs:{to:{name:"done"}}},[e("div",{staticClass:"flowtask-sider-list-item",class:{active:"done"==t.$route.name}},[e("Icon",{attrs:{type:"md-cloud-done",color:"#00adb5",size:"30"}}),t._v("\n                    所有已办\n                ")],1)]),t._v(" "),e("router-link",{attrs:{to:{name:"all"}}},[e("div",{staticClass:"flowtask-sider-list-item",class:{active:"all"==t.$route.name}},[e("Icon",{attrs:{type:"md-laptop",color:"#1fe5bd",size:"30"}}),t._v("\n                    所有任务\n                ")],1)]),t._v(" "),e("router-link",{attrs:{to:{name:"draftbox"}}},[e("div",{staticClass:"flowtask-sider-list-item",class:{active:"draftbox"==t.$route.name}},[e("Icon",{attrs:{type:"ios-folder-open",color:"#f8b500",size:"30"}}),t._v("\n                    草稿箱\n                ")],1)])],1)]),t._v(" "),e("div",{staticClass:"flowtask-content"},[e("router-view")],1)])},staticRenderFns:[]}},ggBH:function(t,s){}});