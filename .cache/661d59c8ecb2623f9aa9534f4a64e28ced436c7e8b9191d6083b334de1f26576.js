{"source":"webpackJsonp([49],{\"4HqH\":function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=a(\"mvHQ\"),s=a.n(n),i=a(\"UzZq\"),o={name:\"FlowtaskAll\",data:function(){var a=this;return{columns:[{title:\"任务编号\",key:\"taskId\",width:90,render:function(e,t){var a=!0;return 1===t.row.type&&(a=!1),e(\"div\",[e(\"Badge\",{props:{dot:a},style:{marginRight:\"5px\",paddingBottom:\"8px\"}}),e(\"span\",{},t.row.taskId)])}},{title:\"交易号\",key:\"businessKey\",width:160,render:function(e,t){return e(\"a\",{on:{click:function(){window.open(\"/Form/index.html?data=\"+t.row.businessKey)}}},t.row.businessKey)}},{title:\"操作名称\",key:\"nodeName\",width:160},{title:\"应用名称\",key:\"processName\",width:160},{title:\"经办人\",key:\"handlerName2\",width:80},{title:\"发起人\",key:\"crtName\",width:80},{title:\"待办创建时间\",key:\"crtTime\",width:150},{title:\"已过时间\",key:\"crtTime\",width:150,render:function(e,t){return e(\"span\",{},a.calcLeadTime(t.row.startTime))}}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:\"\",tableHeight:1}},methods:{getFlowAllTasks:function(){var t=this;Object(i.c)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowAllTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowAllTasks()},handleSearch:function(){this.pageInfo.filter=s()([{operator:\"like\",value:this.searchkeywords,property:\"businessKey\"}]),this.getFlowAllTasks()},calcLeadTime:function(e){var t=new Date(e.replace(/-/g,\"/\")),a=(new Date).getTime()-t.getTime(),n=a%864e5,s=n%36e5,i=s%6e4;return Math.floor(a/864e5)+\"天\"+Math.floor(n/36e5)+\"时\"+Math.floor(s/6e4)+\"分\"+Math.round(i/1e3)+\"秒\"},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe(\"taskChange/\"+this.$currentUser.userId,function(e){t.getFlowAllTasks()})}},mounted:function(){var e=this;this.getFlowAllTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},l=a(\"L1iu\"),r=a.n(l);var c=function(e){a(\"p2tL\")},h=a(\"VU/8\")(o,r.a,!1,c,\"data-v-1025c524\",null);t.default=h.exports},L1iu:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"alltask\"},[a(\"div\",{staticClass:\"alltask-header\"},[t._v(\"\\n        所有任务\\n    \")]),t._v(\" \"),a(\"div\",{staticClass:\"alltask-content\"},[a(\"div\",{staticClass:\"alltask-content-container shadow\"},[a(\"div\",{staticClass:\"alltask-content-container-toolbar\"},[a(\"Input\",{staticClass:\"alltask-content-container-toolbar-search\",attrs:{search:\"\",placeholder:\"输入交易号查询\"},on:{\"on-enter\":t.handleSearch,\"on-change\":t.handleSearch},model:{value:t.searchkeywords,callback:function(e){t.searchkeywords=e},expression:\"searchkeywords\"}})],1),t._v(\" \"),a(\"Table\",{staticClass:\"alltask-content-table\",attrs:{columns:t.columns,data:t.data,height:t.tableHeight}}),t._v(\" \"),a(\"Page\",{staticClass:\"alltask-content-page\",attrs:{total:t.pageInfo.total,\"page-size\":t.pageInfo.limit,current:t.pageInfo.page,\"show-total\":\"\",size:\"small\",\"show-elevator\":\"\",\"show-sizer\":\"\",\"prev-text\":\"上一页\",\"next-text\":\"下一页\"},on:{\"on-page-size-change\":t.handlePageSizeChange,\"on-change\":t.handlePageChange}})],1)])])},staticRenderFns:[]}},p2tL:function(e,t){}});"}