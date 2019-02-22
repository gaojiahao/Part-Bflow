webpackJsonp([49],{"6p86":function(e,t){},"9Qvy":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Gu7T"),s=n.n(a),o=n("mvHQ"),i=n.n(o),c=n("UzZq"),l={name:"FlowtaskToDo",data:function(){var n=this;return{columns:[{type:"selection",width:60,align:"center",key:"unableEdit"},{title:"任务编号",key:"taskId",width:90,render:function(e,t){return e("div",[e("Badge",{props:{dot:!0},style:{marginRight:"5px",paddingBottom:"8px"}}),e("span",{},t.row.taskId)])}},{title:"交易号",key:"businessKey",width:165,render:function(e,t){return e("a",{on:{click:function(){window.open("/Form/index.html?data="+t.row.businessKey)}}},t.row.businessKey)}},{title:"操作名称",key:"nodeName",width:165},{title:"应用名称",key:"title",width:165},{title:"发起人",key:"crtName",width:80},{title:"待办创建时间",key:"crtTime",width:150},{title:"已过时间",key:"crtTime",width:150,render:function(e,t){return e("span",{},n.calcLeadTime(t.row.crtTime))}}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1,loading:!1,onPageSelection:[],batchComment:""}},methods:{getFlowTodoTasks:function(){var n=this;this.loading=!0,Object(c.f)(this.pageInfo).then(function(e){n.data=e.tableContent,n.pageInfo.total=e.dataCount,n.data.forEach(function(t){0<n.onPageSelection.length&&n.onPageSelection.forEach(function(e){e.taskId===t.taskId&&(t._checked=!0)}),t.unableEdit||(t._disabled=!0)}),n.loading=!1})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowTodoTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowTodoTasks()},handleSearch:function(){this.pageInfo.filter=i()([{operator:"like",value:this.searchkeywords,property:"businessKey"}]),this.getFlowTodoTasks()},calcLeadTime:function(e){var t=new Date(e.replace(/-/g,"/")),n=(new Date).getTime()-t.getTime(),a=n%864e5,o=a%36e5,s=o%6e4;return Math.floor(n/864e5)+"天"+Math.floor(a/36e5)+"时"+Math.floor(o/6e4)+"分"+Math.round(s/1e3)+"秒"},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe("taskChange/"+this.$currentUser.userId,function(e){t.getFlowTodoTasks()})},handleBatchApproval:function(){var n=this;this.batchComment="",this.$Modal.confirm({title:"系统提示",content:"<p>审批意见</p>",closable:!0,okText:"同意",cancelText:"不同意",render:function(e){return e("div",[e("label","审批意见: "),e("Input",{props:{value:n.batchComment,autofocus:!0},style:{width:"75%",marginLeft:"10px"},on:{input:function(e){n.batchComment=e}}})])},onOk:function(){var e=n.onPageSelection,t=[];e.forEach(function(e){t.push({taskId:e.taskId,transCode:e.businessKey,result:1,comment:n.batchComment})}),Object(c.a)(t).then(function(e){e.success?(n.getFlowTodoTasks(),n.onPageSelection=[],n.$Notice.success({title:"提示",desc:e.message})):n.$Notice.error({title:"提示",desc:e.message})})},onCancel:function(){var e=n.onPageSelection,t=[];e.forEach(function(e){t.push({taskId:e.taskId,transCode:e.businessKey,result:0,comment:n.batchComment})}),Object(c.a)(t).then(function(e){e.success?(n.getFlowTodoTasks(),n.onPageSelection=[],n.$Notice.success({title:"提示",desc:e.message})):n.$Notice.error({title:"提示",desc:e.message})})}})},onSelectAll:function(e){var t,n={};(t=this.onPageSelection).push.apply(t,s()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.taskId]&&(n[t.taskId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,n=this.onPageSelection;t.map(function(t){n=n.filter(function(e){return e.taskId!==t.taskId})}),this.onPageSelection=n}else{var a,o={};(a=this.onPageSelection).push.apply(a,s()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!o[t.taskId]&&(o[t.taskId]=e.push(t)),e},[])}},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.taskId!==t.taskId})}},mounted:function(){var e=this;this.getFlowTodoTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},r=n("SU7M"),d=n.n(r);var h=function(e){n("6p86")},u=n("VU/8")(l,d.a,!1,h,"data-v-1b3eb2a2",null);t.default=u.exports},SU7M:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"todotask"},[n("div",{staticClass:"todotask-header"},[t._v("\n        所有待办任务\n    ")]),t._v(" "),n("div",{staticClass:"todotask-content"},[n("div",{staticClass:"todotask-content-container shadow"},[n("div",{staticClass:"todotask-content-container-toolbar"},[n("Input",{staticClass:"todotask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号查询"},on:{"on-enter":t.handleSearch,"on-change":t.handleSearch},model:{value:t.searchkeywords,callback:function(e){t.searchkeywords=e},expression:"searchkeywords"}}),t._v(" "),n("Button",{staticStyle:{float:"right",height:"29px"},attrs:{type:"primary",disabled:0===t.onPageSelection.length},on:{click:t.handleBatchApproval}},[t._v("\n                    批量审批\n                ")])],1),t._v(" "),n("Table",{ref:"selection",staticClass:"todotask-content-table",attrs:{loading:t.loading,columns:t.columns,data:t.data,height:t.tableHeight},on:{"on-select-all":t.onSelectAll,"on-selection-change":t.handerSelectionChange,"on-select-cancel":t.onSelectCancel}}),t._v(" "),n("Page",{staticClass:"todotask-content-page",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":t.handlePageSizeChange,"on-change":t.handlePageChange}}),t._v(" "),n("i",{staticClass:"iconfont icon-refresh",on:{click:t.getFlowTodoTasks}},[t._v("")])],1)])])},staticRenderFns:[]}}});