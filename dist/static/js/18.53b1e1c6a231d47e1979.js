webpackJsonp([18],{"9Qvy":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("3SZ7"),n=a.n(o),s=a("UzZq"),i={name:"FlowtaskToDo",data:function(){return{columns:[{title:"任务编号",key:"taskId",width:90,render:function(t,e){return t("div",[t("Badge",{props:{dot:!0},style:{marginRight:"5px",paddingBottom:"8px"}}),t("span",{},e.row.taskId)])}},{title:"交易号",key:"businessKey",width:140,render:function(t,e){return t("a",{on:{click:function(){window.open("/Form/index.html?data="+e.row.businessKey)}}},e.row.businessKey)}},{title:"操作名称",key:"nodeName",width:140},{title:"应用名称",key:"processName",width:140},{title:"发起人",key:"crtName",width:80},{title:"待办创建时间",key:"crtTime"}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1}},methods:{getFlowTodoTasks:function(){var t=this;Object(s.d)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(t){this.pageInfo.page=t,this.getFlowTodoTasks()},handlePageSizeChange:function(t){this.pageInfo.limit=t,this.getFlowTodoTasks()},handleSearch:function(){this.pageInfo.filter=n()([{operator:"like",value:this.searchkeywords,property:"businessKey"}]),this.getFlowTodoTasks()}},mounted:function(){var t=this;this.getFlowTodoTasks(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){t.tableHeight=document.body.clientHeight-200}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"todotask"},[a("div",{staticClass:"todotask-header"},[t._v("\n        所有待办任务\n    ")]),t._v(" "),a("div",{staticClass:"todotask-content"},[a("div",{staticClass:"todotask-content-container"},[a("div",{staticClass:"todotask-content-container-toolbar"},[a("Input",{staticClass:"todotask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号查询"},on:{"on-enter":t.handleSearch,"on-change":t.handleSearch},model:{value:t.searchkeywords,callback:function(e){t.searchkeywords=e},expression:"searchkeywords"}})],1),t._v(" "),a("Table",{staticClass:"todotask-content-table",attrs:{columns:t.columns,data:t.data,height:t.tableHeight}}),t._v(" "),a("Page",{staticClass:"todotask-content-page",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":t.handlePageSizeChange,"on-change":t.handlePageChange}})],1)])])},staticRenderFns:[]};var d=a("D8HT")(i,r,!1,function(t){a("O1Oj")},"data-v-6f69abd5",null);e.default=d.exports},O1Oj:function(t,e){}});