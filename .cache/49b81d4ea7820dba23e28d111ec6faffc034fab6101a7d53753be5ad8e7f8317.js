{"source":"webpackJsonp([37],{DSYt:function(t,e){},\"X+WA\":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s(\"div\",{staticClass:\"message-history\"},[s(\"Row\",{staticClass:\"message-history-header\",attrs:{type:\"flex\",justify:\"space-around\"}},[s(\"Col\",{attrs:{span:\"6\"}},[s(\"router-link\",{attrs:{to:{name:\"files\"}}},[s(\"Button\",{attrs:{size:\"small\",type:\"files\"==t.$route.name?\"primary\":\"text\"}},[t._v(\"文档\")])],1)],1),t._v(\" \"),s(\"Col\",{attrs:{span:\"6\"}},[s(\"router-link\",{attrs:{to:{name:\"images\"}}},[s(\"Button\",{attrs:{size:\"small\",type:\"images\"==t.$route.name?\"primary\":\"text\"}},[t._v(\"图片\")])],1)],1)],1),t._v(\" \"),s(\"div\",{staticClass:\"message-history-content\"},[s(\"router-view\")],1)],1)},staticRenderFns:[]}},xeiT:function(t,e,s){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var a=s(\"mvHQ\"),r=s.n(a),i=s(\"a8xa\"),n={name:\"MessageHistory\",data:function(){return{files:[]}},methods:{refreshAllWorkFlowTasks:function(){var t=[{property:\"listid\",value:this.listId,operator:\"eq\"}];this.notiParams.filter=r()(t),Object(i.a)(this.notiParams).then(function(t){})}},mounted:function(){this.listId=this.$route.params.listId}},o=s(\"X+WA\"),l=s.n(o);var u=function(t){s(\"DSYt\")},c=s(\"VU/8\")(n,l.a,!1,u,\"data-v-84acf8d6\",null);e.default=c.exports}});"}