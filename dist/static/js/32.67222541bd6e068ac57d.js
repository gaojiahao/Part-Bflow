webpackJsonp([32],{DSYt:function(t,s){},xeiT:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),i=e.n(a),r=e("a8xa"),n={name:"MessageHistory",data:function(){return{files:[]}},methods:{refreshAllWorkFlowTasks:function(){var t=[{property:"listid",value:this.listId,operator:"eq"}];this.notiParams.filter=i()(t),Object(r.a)(this.notiParams).then(function(t){})}},mounted:function(){this.listId=this.$route.params.listId}},o={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"message-history"},[s("Row",{staticClass:"message-history-header",attrs:{type:"flex",justify:"space-around"}},[s("Col",{attrs:{span:"6"}},[s("router-link",{attrs:{to:{name:"files"}}},[s("Button",{attrs:{size:"small",type:"files"==this.$route.name?"primary":"text"}},[this._v("文档")])],1)],1),this._v(" "),s("Col",{attrs:{span:"6"}},[s("router-link",{attrs:{to:{name:"images"}}},[s("Button",{attrs:{size:"small",type:"images"==this.$route.name?"primary":"text"}},[this._v("图片")])],1)],1)],1),this._v(" "),s("div",{staticClass:"message-history-content"},[s("router-view")],1)],1)},staticRenderFns:[]};var l=e("VU/8")(n,o,!1,function(t){e("DSYt")},"data-v-84acf8d6",null);s.default=l.exports}});