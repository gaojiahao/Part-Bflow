webpackJsonp([39],{QDEL:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"knowledge"},[o("Row",{staticClass:"knowledge-title"},[o("span",[e._v(e._s(e.knowledgeForm.title))])]),e._v(" "),o("Row",{staticClass:"knowledge-desc"},[o("img",{attrs:{src:e.knowledgeForm.photo?e.knowledgeForm.photo:"resources/images/icon/defaultUserPhoto.png"},on:{error:e.errorimg}}),e._v(" "),o("span",{staticClass:"knowledge-desc-type"},[e._v(e._s(e.knowledgeForm.typeName))]),e._v(" "),o("span",{staticClass:"knowledge-desc-creator"},[e._v(e._s(e.knowledgeForm.creator))]),e._v(" "),o("span",{staticClass:"knowledge-desc-crtTime"},[e._v(e._s(e.knowledgeForm.crtTime))])]),e._v(" "),o("Row",{staticClass:"knowledge-content"},[o("div",{ref:"toolbar",staticStyle:{display:"none"}}),e._v(" "),o("div",{ref:"text",staticStyle:{display:"none"}}),e._v(" "),o("div",{staticClass:"w-e-text",domProps:{innerHTML:e._s(e.knowledgeForm.content)}}),e._v(" "),o("user-comments",{attrs:{listId:e.knowledgeId,type:"knowledge"}})],1),e._v(" "),o("Row",{staticClass:"knowledge-toolbar"},[o("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.editKnowledge}},[e._v("编辑")]),e._v(" "),o("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.goBack}},[e._v("返回")])])],1)},staticRenderFns:[]}},g6Ys:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("JUNF"),s=o("bpds"),a=o("sYY+"),r=o.n(a),i={name:"KnowledgeView",components:{UserComments:s.a},data:function(){return{knowledgeId:this.$route.params.id,knowledgeForm:{title:"",type:"",content:"",creator:"",crtTime:""}}},methods:{errorimg:function(){this.knowledgeForm.photo="resources/images/icon/defaultUserPhoto.png"},goBack:function(){this.$router.push({path:"/knowledge/list"})},editKnowledge:function(){this.$router.push({name:"knowledgeDetail",path:"/knowledge/detail/"+this.$route.params.id,params:{id:this.$route.params.id}})},getKnowledgeDataById:function(){var t=this;Object(n.e)(this.knowledgeId).then(function(e){t.knowledgeForm=e,t.editor=new r.a(t.$refs.toolbar,t.$refs.text),t.editor.create()})}},created:function(){this.getKnowledgeDataById()}},d=o("QDEL"),l=o.n(d);var c=function(e){o("whBB")},g=o("VU/8")(i,l.a,!1,c,"data-v-3d95f275",null);t.default=g.exports},whBB:function(e,t){}});