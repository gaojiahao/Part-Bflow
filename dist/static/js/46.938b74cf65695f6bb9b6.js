webpackJsonp([46],{KBHf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),o=a("UzZq"),i={name:"FlowtaskDone",data:function(){return{columns:[{title:"任务编号",key:"taskId",width:90},{title:"交易号",key:"transId",width:140,render:function(e,t){return e("a",{on:{click:function(){window.open("/Form/index.html?data="+t.row.transId)}}},t.row.transId)}},{title:"操作名称",key:"nodeName",width:140},{title:"应用名称",key:"title"},{title:"经办人",key:"handlerName"},{title:"发起人",key:"creatorName"},{title:"待办创建时间",key:"crtTime",width:150},{title:"任务处理时间",key:"endTime",width:150}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1}},methods:{getFlowDoneTasks:function(){var e=this;Object(o.d)(this.pageInfo).then(function(t){e.data=t.tableContent,e.pageInfo.total=t.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowDoneTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowDoneTasks()},handleSearch:function(){this.pageInfo.filter=s()([{operator:"like",value:this.searchkeywords,property:"transId"}]),this.getFlowDoneTasks()},subscribeMessage:function(){var e=this;this.$deepstream.event.subscribe("taskChange/"+this.$currentUser.userId,function(t){e.getFlowDoneTasks()})}},mounted:function(){var e=this;this.getFlowDoneTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"donetask"},[a("div",{staticClass:"donetask-header"},[e._v("\n        所有已办任务\n    ")]),e._v(" "),a("div",{staticClass:"donetask-content"},[a("div",{staticClass:"donetask-content-container shadow"},[a("div",{staticClass:"donetask-content-container-toolbar"},[a("Input",{staticClass:"donetask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号查询"},on:{"on-enter":e.handleSearch,"on-change":e.handleSearch},model:{value:e.searchkeywords,callback:function(t){e.searchkeywords=t},expression:"searchkeywords"}})],1),e._v(" "),a("Table",{staticClass:"donetask-content-table",attrs:{columns:e.columns,data:e.data,height:e.tableHeight}}),e._v(" "),a("Page",{staticClass:"donetask-content-page",attrs:{total:e.pageInfo.total,"page-size":e.pageInfo.limit,current:e.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":e.handlePageSizeChange,"on-change":e.handlePageChange}})],1)])])},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(e){a("S80n")},"data-v-21d772bf",null);t.default=l.exports},S80n:function(e,t){}});