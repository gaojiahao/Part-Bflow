webpackJsonp([40],{"4HqH":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),i=a("UzZq"),o={name:"FlowtaskAll",data:function(){var a=this;return{columns:[{title:"任务编号",key:"taskId",width:90,render:function(e,t){var a=!0;return 1===t.row.type&&(a=!1),e("div",[e("Badge",{props:{dot:a},style:{marginRight:"5px",paddingBottom:"8px"}}),e("span",{},t.row.taskId)])}},{title:"交易号",slot:"businessKey",width:160},{title:"操作名称",key:"nodeName",width:160},{title:"应用名称",key:"processName",width:160},{title:"经办人",key:"handlerName2",width:80},{title:"发起人",key:"crtName",width:80},{title:"待办创建时间",key:"crtTime",width:150},{title:"已过时间",key:"crtTime",width:150,render:function(e,t){return e("span",{},a.calcLeadTime(t.row.startTime))}}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1}},methods:{getFlowAllTasks:function(){var t=this;Object(i.c)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowAllTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowAllTasks()},handleSearch:function(){this.pageInfo.filter=s()([{operator:"like",value:this.searchkeywords,property:"businessKey"}]),this.getFlowAllTasks()},calcLeadTime:function(e){var t=new Date(e.replace(/-/g,"/")),a=(new Date).getTime()-t.getTime(),n=a%864e5,s=n%36e5,i=s%6e4;return Math.floor(a/864e5)+"天"+Math.floor(n/36e5)+"时"+Math.floor(s/6e4)+"分"+Math.round(i/1e3)+"秒"},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe("taskChange/"+this.$currentUser.userId,function(e){t.getFlowAllTasks()})}},mounted:function(){var e=this;this.getFlowAllTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},l=a("6t2N"),r=a.n(l);var c=function(e){a("Yz84")},h=a("VU/8")(o,r.a,!1,c,"data-v-3d003580",null);t.default=h.exports},"6t2N":function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"alltask"},[n("div",{staticClass:"alltask-header"},[a._v("\n        所有任务\n    ")]),a._v(" "),n("div",{staticClass:"alltask-content"},[n("div",{staticClass:"alltask-content-container shadow"},[n("div",{staticClass:"alltask-content-container-toolbar"},[n("Input",{staticClass:"alltask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号查询"},on:{"on-enter":a.handleSearch,"on-change":a.handleSearch},model:{value:a.searchkeywords,callback:function(e){a.searchkeywords=e},expression:"searchkeywords"}})],1),a._v(" "),n("Table",{staticClass:"alltask-content-table",attrs:{columns:a.columns,data:a.data,height:a.tableHeight},scopedSlots:a._u([{key:"businessKey",fn:function(e){var t=e.row;return[n("a",{attrs:{href:"/Form/index.html?data="+t.businessKey,target:"_blank"}},[a._v(a._s(t.businessKey))])]}}])}),a._v(" "),n("Page",{staticClass:"alltask-content-page",attrs:{total:a.pageInfo.total,"page-size":a.pageInfo.limit,current:a.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":a.handlePageSizeChange,"on-change":a.handlePageChange}})],1)])])},staticRenderFns:[]}},Yz84:function(e,t){}});