{"source":"webpackJsonp([32],{OsRJ:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var o=a(\"eV/a\"),r={name:\"wokdGuideView\",components:{UserComments:a(\"bpds\").a},data:function(){return{workguideId:this.$route.params.id,isAnchor:-1,workguideData:{}}},methods:{errorimg:function(){this.workguideData.creatorImage=\"resources/images/icon/defaultUserPhoto.png\"},getWorkGuideDataById:function(){var e=this;Object(o.c)(this.$route.params.id).then(function(t){e.workguideData=t}).catch(function(t){e.$Message.error(t.data.message)})},goAnchor:function(t){this.isAnchor=t,document.querySelector(\".workguide\").scrollTop=this.$el.querySelector(\"#anchor\"+t).offsetTop}},created:function(){this.getWorkGuideDataById()}},s=a(\"jvx4\"),i=a.n(s);var n=function(t){a(\"seXu\")},d=a(\"VU/8\")(r,i.a,!1,n,\"data-v-736507af\",null);e.default=d.exports},jvx4:function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,o=a._self._c||t;return o(\"div\",{staticClass:\"workguide\"},[o(\"Row\",{staticClass:\"workguide-title\"},[o(\"h2\",[a._v(a._s(a.workguideData.title))])]),a._v(\" \"),o(\"Row\",{staticClass:\"workguide-type\"},[o(\"img\",{attrs:{src:a.workguideData.creatorImage?a.workguideData.creatorImage:\"resources/images/icon/defaultUserPhoto.png\"},on:{error:a.errorimg}}),a._v(\" \"),o(\"span\",{staticClass:\"workguide-type-worktype\"},[a._v(a._s(a.workguideData.creatorName))]),a._v(\" \"),o(\"span\",{staticClass:\"workguide-type-crtTime\"},[a._v(a._s(a.workguideData.crtTime))])]),a._v(\" \"),o(\"Row\",{staticClass:\"workguide-desc\"},[o(\"p\",[a._v(a._s(a.workguideData.comment))])]),a._v(\" \"),o(\"Row\",{staticClass:\"workguide-read\"},[a._l(a.workguideData.workStepList,function(t,e){return o(\"img\",{key:e,attrs:{src:t.image},on:{click:function(t){a.goAnchor(e)}}})}),a._v(\" \"),o(\"router-link\",{attrs:{to:{name:\"wokdGuideStep\",params:{id:a.workguideData.id}}}},[o(\"div\",{staticClass:\"workguide-read-go\"},[a._v(\"\\n                步骤阅读\"),o(\"Icon\",{staticStyle:{\"font-size\":\"23px\",\"margin-bottom\":\"4px\"},attrs:{type:\"ios-arrow-forward\"}})],1)])],2),a._v(\" \"),o(\"Row\",{staticClass:\"workguide-content\"},[o(\"Timeline\",a._l(a.workguideData.workStepList,function(t,e){return o(\"TimelineItem\",{key:e,attrs:{id:\"anchor\"+e}},[o(\"div\",{class:{\"step-num\":!0,\"step-num-anchor\":e===a.isAnchor},attrs:{slot:\"dot\"},slot:\"dot\"},[a._v(a._s(e+1))]),a._v(\" \"),o(\"div\",{staticClass:\"step-detail\"},[o(\"h2\",[a._v(a._s(t.title))]),a._v(\" \"),o(\"div\",{staticClass:\"step-detail-comment\"},[a._v(a._s(t.comment))]),a._v(\" \"),o(\"img\",{attrs:{src:t.image}})])])}),1),a._v(\" \"),o(\"user-comments\",{attrs:{listId:a.workguideId,type:\"workGuide\"}})],1),a._v(\" \"),o(\"Row\",{staticClass:\"workguide-toolbar\"},[o(\"router-link\",{attrs:{to:{name:\"wokdGuideDetail\",params:{id:a.workguideData.id}}}},[o(\"span\",{staticClass:\"workguide-toolbar-btn\"},[a._v(\"编辑\")])]),a._v(\" \"),o(\"router-link\",{attrs:{to:{name:\"wokdGuideList\"}}},[o(\"span\",{staticClass:\"workguide-toolbar-btn\"},[a._v(\"返回\")])])],1)],1)},staticRenderFns:[]}},seXu:function(t,e){}});"}