webpackJsonp([46],{OsRJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("eV/a"),i={name:"wokdGuideView",components:{},data:function(){return{workguideId:this.$route.params.id,workguideData:{}}},methods:{getWorkGuideDataById:function(){var t=this;Object(s.c)(this.$route.params.id).then(function(e){t.workguideData=e}).catch(function(e){t.$Message.error(e.data.message)})}},created:function(){this.getWorkGuideDataById()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"workguide"},[a("Row",{staticClass:"workguide-title"},[a("h2",[t._v(t._s(t.workguideData.title))])]),t._v(" "),a("Row",{staticClass:"workguide-type"},[a("img",{attrs:{src:t.workguideData.creatorImage}}),t._v(" "),a("span",{staticClass:"workguide-type-worktype"},[t._v(t._s(t.workguideData.creatorName))]),t._v(" "),a("span",{staticClass:"workguide-type-crtTime"},[t._v(t._s(t.workguideData.crtTime))])]),t._v(" "),a("Row",{staticClass:"workguide-desc"},[a("p",[t._v(t._s(t.workguideData.comment))])]),t._v(" "),a("Row",{staticClass:"workguide-read"},[t._l(t.workguideData.workStepList,function(t,e){return a("img",{key:e,attrs:{src:t.image}})}),t._v(" "),a("router-link",{attrs:{to:{name:"wokdGuideStep",params:{id:t.workguideData.id}}}},[a("div",{staticClass:"workguide-read-go"},[t._v("\n                步骤阅读"),a("Icon",{staticStyle:{"font-size":"23px","margin-bottom":"4px"},attrs:{type:"ios-arrow-forward"}})],1)])],2),t._v(" "),a("Row",{staticClass:"workguide-content"},[a("Timeline",t._l(t.workguideData.workStepList,function(e,s){return a("TimelineItem",{key:s},[a("div",{staticClass:"step-num",attrs:{slot:"dot"},slot:"dot"},[t._v(t._s(s+1))]),t._v(" "),a("div",{staticClass:"step-detail"},[a("h2",[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"step-detail-comment"},[t._v(t._s(e.comment))]),t._v(" "),a("img",{attrs:{src:e.image}})])])}))],1),t._v(" "),a("Row",{staticClass:"workguide-save"},[a("router-link",{attrs:{to:{name:"wokdGuideDetail",params:{id:t.workguideData.id}}}},[a("span",{staticClass:"workguide-save-btn"},[t._v("编辑")])]),t._v(" "),a("router-link",{attrs:{to:{name:"wokdGuideList"}}},[a("span",{staticClass:"workguide-save-btn"},[t._v("返回")])])],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,r,!1,function(t){a("yrUH")},"data-v-1b56e500",null);e.default=o.exports},yrUH:function(t,e){}});