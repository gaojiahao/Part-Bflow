webpackJsonp([12],{"1dEt":function(t,i){},"7wE8":function(t,i){},DoUj:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("l/Op"),s=e.n(a),n={name:"salePie",data:function(){return{}},mounted:function(){this.$nextTick(function(){var t=s.a.init(document.getElementById("data_source_con"));t.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"right",data:["ios","android","pc","web","others"]},series:[{name:"访问来源",type:"pie",radius:"66%",center:["50%","60%"],data:[{value:2103456,name:"ios",itemStyle:{normal:{color:"#9bd598"}}},{value:1305923,name:"android",itemStyle:{normal:{color:"#ffd58f"}}},{value:543250,name:"pc",itemStyle:{normal:{color:"#abd5f2"}}},{value:798403,name:"web",itemStyle:{normal:{color:"#ab8df2"}}},{value:302340,name:"others",itemStyle:{normal:{color:"#e14f60"}}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}),window.addEventListener("resize",function(){t.resize()})})}},r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"data_source_con"}})},staticRenderFns:[]},l={name:"dashboard",components:{salepie:e("D8HT")(n,r,!1,null,null,null).exports}},o={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"dashboard",attrs:{id:"dashboard"}},[i("div",{staticClass:"wrapper"},[this._m(0),this._v(" "),i("div",{staticClass:"wrapper-container"},[i("div",{staticClass:"ivu-row"},[this._m(1),this._v(" "),i("div",{staticClass:"ivu-col ivu-col-span-20"},[i("div",{staticClass:"wrapper-content ivu-article"},[i("Row",{attrs:{gutter:10}},[i("Col",{style:{marginBottom:"10px"},attrs:{md:24,lg:8}},[i("Card",[i("p",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[i("Icon",{attrs:{type:"ios-pulse-strong"}}),this._v("\n                                      数据来源统计\n                                  ")],1),this._v(" "),i("div",{staticClass:"data-source-row"},[i("salepie")],1)])],1)],1)],1)])])])]),this._v(" "),i("router-view")],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"wrapper-header"},[i("ul",{staticClass:"ivu-menu ivu-menu-light ivu-menu-horizontal"},[i("div",{staticClass:"wrapper-header-nav"},[i("a",{staticClass:"wrapper-header-nav-logo router-link-active",attrs:{href:"/"}},[i("img",{attrs:{src:"static/logo.ico"}})]),this._v(" "),i("div",{staticClass:"wrapper-header-nav-list"},[i("li",{staticClass:"ivu-menu-item ivu-menu-item-active ivu-menu-item-selected"},[i("i",{staticClass:"ivu-icon ivu-icon-chatbubble-working"}),this._v("\n                          指南\n                      ")]),this._v(" "),i("li",{staticClass:"ivu-menu-item "},[i("i",{staticClass:"ivu-icon ivu-icon-android-laptop"}),this._v("\n                          应用中心\n                      ")]),this._v(" "),i("li",{staticClass:"ivu-menu-item "},[i("i",{staticClass:"ivu-icon ivu-icon-ios-information-outline"}),this._v("\n                          帮助\n                      ")])])])])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"wrapper-navigate ivu-col ivu-col-span-4"},[i("div",{staticClass:"navigate"},[i("div",{staticClass:"ivu-menu ivu-menu-light ivu-menu-vertical"},[i("li",{staticClass:"ivu-menu-item ivu-menu-item-active ivu-menu-item-selected"},[this._v("介绍")]),this._v(" "),i("li",{staticClass:"ivu-menu-item "},[this._v("介绍")])])])])}]};var c=e("D8HT")(l,o,!1,function(t){e("7wE8"),e("1dEt")},null,null);i.default=c.exports}});
//# sourceMappingURL=12.eb04565090c31ed66d06.js.map