{"source":"webpackJsonp([44],{\"7fOD\":function(t,s){},BjBm:function(t,s,a){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var e=a(\"eV/a\"),i={name:\"wokdGuideStep\",data:function(){return{stepsData:{},total:0,stepValue:0}},methods:{goBack:function(){this.$router.push({path:\"/wokdGuide/view/\"+this.stepsData.id})},getStepsData:function(){var s=this;this.$route.params.id&&Object(e.c)(this.$route.params.id).then(function(t){s.stepsData=t,s.total=s.stepsData.workStepList.length}).catch(function(t){s.$Message.error(t.data.message)})}},created:function(){this.getStepsData()}},r=a(\"uLBF\"),o=a.n(r);var n=function(t){a(\"7fOD\")},c=a(\"VU/8\")(i,o.a,!1,n,\"data-v-1ae850c4\",null);s.default=c.exports},uLBF:function(t,s){t.exports={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a(\"div\",{staticClass:\"workguide\"},[a(\"Row\",{staticClass:\"workguide-title\"},[a(\"span\",[s._v(s._s(s.stepsData.title))])]),s._v(\" \"),a(\"Row\",{staticClass:\"workguide-type\"},[a(\"img\",{attrs:{src:s.stepsData.creatorImage}}),s._v(\" \"),a(\"span\",{staticClass:\"workguide-type-worktype\"},[s._v(s._s(s.stepsData.creatorName))]),s._v(\" \"),a(\"span\",{staticClass:\"workguide-type-crtTime\"},[s._v(s._s(s.stepsData.crtTime))])]),s._v(\" \"),a(\"Row\",{staticClass:\"workguide-step\"},[a(\"Carousel\",{attrs:{arrow:\"always\"},model:{value:s.stepValue,callback:function(t){s.stepValue=t},expression:\"stepValue\"}},s._l(s.stepsData.workStepList,function(t){return a(\"CarouselItem\",{key:t.id},[a(\"div\",{staticClass:\"demo-carousel\"},[a(\"div\",{staticClass:\"step-num\"},[a(\"span\",{staticClass:\"step-num-current\"},[s._v(s._s(s.stepValue+1))]),s._v(\" \"),a(\"span\",{staticClass:\"step-num-total\"},[s._v(\"/\"+s._s(s.total))]),s._v(\" \"),a(\"span\",{staticClass:\"step-num-title\"},[s._v(s._s(t.title))])]),s._v(\" \"),a(\"p\",[s._v(s._s(t.comment))]),s._v(\" \"),a(\"img\",{attrs:{src:t.image}})])])}))],1),s._v(\" \"),a(\"Row\",{staticClass:\"workguide-save\"},[a(\"span\",{staticClass:\"workguide-save-btn\",on:{click:s.goBack}},[s._v(\"返回\")])])],1)},staticRenderFns:[]}}});"}