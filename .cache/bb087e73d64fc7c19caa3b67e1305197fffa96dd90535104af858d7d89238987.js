{"source":"webpackJsonp([28],{\"0sw/\":function(e,t){},KBHf:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=a(\"mvHQ\"),s=a.n(n),o=a(\"UzZq\"),i={name:\"FlowtaskDone\",data:function(){return{columns:[{title:\"任务编号\",key:\"taskId\",width:90},{title:\"交易号\",slot:\"transId\",width:160},{title:\"操作名称\",key:\"nodeName\",width:160},{title:\"应用名称\",key:\"title\",width:160},{title:\"经办人\",key:\"handlerName\",width:80},{title:\"发起人\",key:\"creatorName\",width:80},{title:\"待办创建时间\",key:\"crtTime\",width:150},{title:\"任务处理时间\",key:\"endTime\",width:150}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:\"\",tableHeight:1}},methods:{getFlowDoneTasks:function(){var t=this;Object(o.d)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowDoneTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowDoneTasks()},handleSearch:function(){this.pageInfo.filter=s()([{operator:\"like\",value:this.searchkeywords,property:\"transId\"}]),this.getFlowDoneTasks()},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe(\"taskChange/\"+this.$currentUser.userId,function(e){t.getFlowDoneTasks()})}},mounted:function(){var e=this;this.getFlowDoneTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},r=a(\"XE7N\"),l=a.n(r);var c=function(e){a(\"0sw/\")},d=a(\"VU/8\")(i,l.a,!1,c,\"data-v-8e42f732\",null);t.default=d.exports},XE7N:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n(\"div\",{staticClass:\"donetask\"},[n(\"div\",{staticClass:\"donetask-header\"},[a._v(\"\\n        所有已办任务\\n    \")]),a._v(\" \"),n(\"div\",{staticClass:\"donetask-content\"},[n(\"div\",{staticClass:\"donetask-content-container shadow\"},[n(\"div\",{staticClass:\"donetask-content-container-toolbar\"},[n(\"Input\",{staticClass:\"donetask-content-container-toolbar-search\",attrs:{search:\"\",placeholder:\"输入交易号查询\"},on:{\"on-enter\":a.handleSearch,\"on-change\":a.handleSearch},model:{value:a.searchkeywords,callback:function(e){a.searchkeywords=e},expression:\"searchkeywords\"}})],1),a._v(\" \"),n(\"Table\",{staticClass:\"donetask-content-table\",attrs:{columns:a.columns,data:a.data,height:a.tableHeight},scopedSlots:a._u([{key:\"transId\",fn:function(e){var t=e.row;return[n(\"a\",{attrs:{href:\"/Form/index.html?data=\"+t.transId,target:\"_blank\"}},[a._v(a._s(t.transId))])]}}])}),a._v(\" \"),n(\"Page\",{staticClass:\"donetask-content-page\",attrs:{total:a.pageInfo.total,\"page-size\":a.pageInfo.limit,current:a.pageInfo.page,\"show-total\":\"\",size:\"small\",\"show-elevator\":\"\",\"show-sizer\":\"\",\"prev-text\":\"上一页\",\"next-text\":\"下一页\"},on:{\"on-page-size-change\":a.handlePageSizeChange,\"on-change\":a.handlePageChange}})],1)])])},staticRenderFns:[]}}});"}