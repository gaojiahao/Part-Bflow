webpackJsonp([28],{"6I65":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),o=a("UzZq"),i={name:"FlowtaskAll",data:function(){var a=this;return{columns:[{title:"任务编号",key:"taskId",width:90,render:function(e,t){var a=!0;return 1===t.row.type&&(a=!1),e("div",[e("Badge",{props:{dot:a},style:{marginRight:"5px",paddingBottom:"8px"}}),e("span",{},t.row.taskId)])}},{title:"交易号",slot:"businessKey",width:160},{title:"工作流节点名称",key:"nodeName",width:140},{title:"当前审批职位",key:"assigneeRoleName",width:160},{title:"当前审批人",key:"assigneeName",width:160},{title:"任务接收时间",key:"crtTime",width:150},{title:"已过小时数",key:"pastTimeHour",width:120,sortable:"custom",render:function(e,t){return e("span",{},a.calcLeadTime(t.row.crtTime,!0))}},{title:"已过时间",key:"pastTime",width:150,render:function(e,t){return e("span",{},a.calcLeadTime(t.row.crtTime))}},{title:"应用名称",key:"processName",width:150},{title:"经办人",key:"handlerName",width:80},{title:"发起人",key:"crtName",width:80}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},sortColumn:null,searchkeywords:"",tableHeight:1}},methods:{onSortChange:function(e){"normal"===e.order?(delete this.pageInfo.sort,this.sortColumn=null):this.sortColumn=[{property:e.key,direction:e.order}],this.getFlowAllTasks()},exportFlowtask:function(){var e,t=this,a=[];this.columns.forEach(function(e){a.push({text:e.title,dataIndex:e.key||e.slot,width:e.width})}),e={fileName:"所有工作流",columns:s()(a),filter:this.pageInfo.filter},Object(o.b)(e).then(function(e){if(e.success){var t=document.createElement("a");t.href=e.message,document.body.appendChild(t),t.click(),document.body.removeChild(t)}}).catch(function(e){t.$Message.error(e.data.message)})},getFlowAllTasks:function(){var t=this;this.pageInfo.filter=s()([{operator:"like",value:this.searchkeywords,property:"businessKey"}]),this.sortColumn&&(this.pageInfo.sort=s()(this.sortColumn)),Object(o.c)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowAllTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowAllTasks()},handleSearch:function(){this.pageInfo.page=1,this.getFlowAllTasks()},calcLeadTime:function(e,t){var a=new Date(e.replace(/-/g,"/")),n=(new Date).getTime()-a.getTime(),s=Math.floor(n/864e5),o=n%864e5,i=Math.floor(o/36e5),l=o%36e5,r=Math.floor(l/6e4),c=l%6e4,h=Math.round(c/1e3);return t?24*s+i+"小时":s+"天"+i+"时"+r+"分"+h+"秒"},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe("taskChange/"+this.$currentUser.userId,function(e){t.getFlowAllTasks()})}},mounted:function(){var e=this;this.getFlowAllTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},l=a("9ApD"),r=a.n(l);var c=function(e){a("LBOm")},h=a("VU/8")(i,r.a,!1,c,"data-v-d8066bfe",null);t.default=h.exports},"9ApD":function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"alltask"},[n("div",{staticClass:"alltask-header"},[a._v("\n        所有工作流任务\n    ")]),a._v(" "),n("div",{staticClass:"alltask-content"},[n("div",{staticClass:"alltask-content-container shadow"},[n("div",{staticClass:"alltask-content-container-toolbar"},[n("Input",{staticClass:"alltask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号查询"},on:{"on-enter":a.handleSearch,"on-change":a.handleSearch},model:{value:a.searchkeywords,callback:function(e){a.searchkeywords=e},expression:"searchkeywords"}}),a._v(" "),n("Button",{staticStyle:{float:"right"},attrs:{type:"info"},on:{click:a.exportFlowtask}},[a._v("导出")])],1),a._v(" "),n("Table",{ref:"flowTable",staticClass:"alltask-content-table",attrs:{columns:a.columns,data:a.data,height:a.tableHeight},on:{"on-sort-change":a.onSortChange},scopedSlots:a._u([{key:"businessKey",fn:function(e){var t=e.row;return[n("a",{attrs:{href:"/Form/index.html?data="+t.businessKey,target:"_blank"}},[a._v(a._s(t.businessKey))])]}}])}),a._v(" "),n("Page",{staticClass:"alltask-content-page",attrs:{total:a.pageInfo.total,"page-size":a.pageInfo.limit,current:a.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":a.handlePageSizeChange,"on-change":a.handlePageChange}})],1)])])},staticRenderFns:[]}},LBOm:function(e,t){}});