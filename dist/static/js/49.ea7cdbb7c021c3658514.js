webpackJsonp([49],{"7fOD":function(t,s){},BjBm:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("eV/a"),i={name:"wokdGuideStep",data:function(){return{stepsData:{},total:0,stepValue:0}},methods:{goBack:function(){this.$router.push({path:"/wokdGuide/view/"+this.stepsData.id})},getStepsData:function(){var t=this;this.$route.params.id&&Object(e.c)(this.$route.params.id).then(function(s){t.stepsData=s,t.total=t.stepsData.workStepList.length}).catch(function(s){t.$Message.error(s.data.message)})}},created:function(){this.getStepsData()}},r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"workguide"},[a("Row",{staticClass:"workguide-title"},[a("span",[t._v(t._s(t.stepsData.title))])]),t._v(" "),a("Row",{staticClass:"workguide-type"},[a("img",{attrs:{src:t.stepsData.creatorImage}}),t._v(" "),a("span",{staticClass:"workguide-type-worktype"},[t._v(t._s(t.stepsData.creatorName))]),t._v(" "),a("span",{staticClass:"workguide-type-crtTime"},[t._v(t._s(t.stepsData.crtTime))])]),t._v(" "),a("Row",{staticClass:"workguide-step"},[a("Carousel",{attrs:{arrow:"always"},model:{value:t.stepValue,callback:function(s){t.stepValue=s},expression:"stepValue"}},t._l(t.stepsData.workStepList,function(s){return a("CarouselItem",{key:s.id},[a("div",{staticClass:"demo-carousel"},[a("div",{staticClass:"step-num"},[a("span",{staticClass:"step-num-current"},[t._v(t._s(t.stepValue+1))]),t._v(" "),a("span",{staticClass:"step-num-total"},[t._v("/"+t._s(t.total))]),t._v(" "),a("span",{staticClass:"step-num-title"},[t._v(t._s(s.title))])]),t._v(" "),a("p",[t._v(t._s(s.comment))]),t._v(" "),a("img",{attrs:{src:s.image}})])])}))],1),t._v(" "),a("Row",{staticClass:"workguide-save"},[a("span",{staticClass:"workguide-save-btn",on:{click:t.goBack}},[t._v("返回")])])],1)},staticRenderFns:[]};var o=a("VU/8")(i,r,!1,function(t){a("7fOD")},"data-v-1ae850c4",null);s.default=o.exports}});