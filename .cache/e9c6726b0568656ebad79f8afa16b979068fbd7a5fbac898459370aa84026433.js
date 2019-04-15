{"source":"webpackJsonp([39],{\"9Qvy\":function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var a=n(\"Gu7T\"),s=n.n(a),o=n(\"mvHQ\"),i=n.n(o),c=n(\"UzZq\"),l={name:\"FlowtaskToDo\",data:function(){var n=this;return{columns:[{type:\"selection\",width:60,align:\"center\",key:\"unableEdit\"},{title:\"任务编号\",key:\"taskId\",width:90,render:function(e,t){return e(\"div\",[e(\"Badge\",{props:{dot:!0},style:{marginRight:\"5px\",paddingBottom:\"8px\"}}),e(\"span\",{},t.row.taskId)])}},{title:\"交易号\",slot:\"businessKey\",width:165},{title:\"往来\",key:\"dealerName\",width:140},{title:\"操作名称\",key:\"nodeName\",width:165},{title:\"应用名称\",key:\"title\",width:165},{title:\"发起人\",key:\"crtName\",width:80},{title:\"待办创建时间\",key:\"crtTime\",width:150},{title:\"已过时间\",key:\"crtTime\",width:150,render:function(e,t){return e(\"span\",{},n.calcLeadTime(t.row.crtTime))}}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:\"\",tableHeight:1,loading:!1,onPageSelection:[],batchComment:\"\"}},methods:{getFlowTodoTasks:function(){var n=this;this.pageInfo.filter=i()([{link:\"or\",operator_1:\"like\",value_1:this.searchkeywords,property_1:\"businessKey\",operator_2:\"like\",value_2:this.searchkeywords,property_2:\"dealerName\"}]),this.loading=!0,Object(c.g)(this.pageInfo).then(function(e){n.data=e.tableContent,n.pageInfo.total=e.dataCount,n.data.forEach(function(t){0<n.onPageSelection.length&&n.onPageSelection.forEach(function(e){e.taskId===t.taskId&&(t._checked=!0)}),t.unableEdit||(t._disabled=!0)}),n.loading=!1})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowTodoTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowTodoTasks()},handleSearch:function(){this.pageInfo.page=1,this.getFlowTodoTasks()},calcLeadTime:function(e){var t=new Date(e.replace(/-/g,\"/\")),n=(new Date).getTime()-t.getTime(),a=n%864e5,o=a%36e5,s=o%6e4;return Math.floor(n/864e5)+\"天\"+Math.floor(a/36e5)+\"时\"+Math.floor(o/6e4)+\"分\"+Math.round(s/1e3)+\"秒\"},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe(\"taskChange/\"+this.$currentUser.userId,function(e){t.getFlowTodoTasks()})},handleBatchApproval:function(){var n=this;this.batchComment=\"\",this.$Modal.confirm({title:\"系统提示\",content:\"<p>审批意见</p>\",closable:!0,okText:\"同意\",cancelText:\"不同意\",render:function(e){return e(\"div\",[e(\"label\",\"审批意见: \"),e(\"Input\",{props:{value:n.batchComment,autofocus:!0},style:{width:\"75%\",marginLeft:\"10px\"},on:{input:function(e){n.batchComment=e}}})])},onOk:function(){var e=n.onPageSelection,t=[];e.forEach(function(e){t.push({taskId:e.taskId,transCode:e.businessKey,result:1,comment:n.batchComment})}),Object(c.a)(t).then(function(e){e.success?(n.getFlowTodoTasks(),n.onPageSelection=[],n.$Notice.success({title:\"提示\",desc:e.message})):n.$Notice.error({title:\"提示\",desc:e.message})})},onCancel:function(){var e=n.onPageSelection,t=[];e.forEach(function(e){t.push({taskId:e.taskId,transCode:e.businessKey,result:0,comment:n.batchComment})}),Object(c.a)(t).then(function(e){e.success?(n.getFlowTodoTasks(),n.onPageSelection=[],n.$Notice.success({title:\"提示\",desc:e.message})):n.$Notice.error({title:\"提示\",desc:e.message})})}})},onSelectAll:function(e){var t,n={};(t=this.onPageSelection).push.apply(t,s()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!n[t.taskId]&&(n[t.taskId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,n=this.onPageSelection;t.map(function(t){n=n.filter(function(e){return e.taskId!==t.taskId})}),this.onPageSelection=n}else{var a,o={};(a=this.onPageSelection).push.apply(a,s()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!o[t.taskId]&&(o[t.taskId]=e.push(t)),e},[])}},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.taskId!==t.taskId})}},mounted:function(){var e=this;this.getFlowTodoTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},r=n(\"vAGd\"),d=n.n(r);var h=function(e){n(\"xJ5q\")},u=n(\"VU/8\")(l,d.a,!1,h,\"data-v-595be89a\",null);t.default=u.exports},vAGd:function(e,t){e.exports={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a(\"div\",{staticClass:\"todotask\"},[a(\"div\",{staticClass:\"todotask-header\"},[n._v(\"\\n        我的待办\\n    \")]),n._v(\" \"),a(\"div\",{staticClass:\"todotask-content\"},[a(\"div\",{staticClass:\"todotask-content-container shadow\"},[a(\"div\",{staticClass:\"todotask-content-container-toolbar\"},[a(\"Input\",{staticClass:\"todotask-content-container-toolbar-search\",attrs:{search:\"\",placeholder:\"输入交易号或往来对象查询\"},on:{\"on-enter\":n.handleSearch,\"on-change\":n.handleSearch},model:{value:n.searchkeywords,callback:function(e){n.searchkeywords=e},expression:\"searchkeywords\"}}),n._v(\" \"),a(\"Button\",{staticStyle:{float:\"right\",height:\"29px\"},attrs:{type:\"primary\",disabled:0===n.onPageSelection.length},on:{click:n.handleBatchApproval}},[n._v(\"\\n                    批量审批\\n                \")])],1),n._v(\" \"),a(\"Table\",{ref:\"selection\",staticClass:\"todotask-content-table\",attrs:{loading:n.loading,columns:n.columns,data:n.data,height:n.tableHeight},on:{\"on-select-all\":n.onSelectAll,\"on-selection-change\":n.handerSelectionChange,\"on-select-cancel\":n.onSelectCancel},scopedSlots:n._u([{key:\"businessKey\",fn:function(e){var t=e.row;return[a(\"a\",{attrs:{href:\"/Form/index.html?data=\"+t.businessKey,target:\"_blank\"}},[n._v(n._s(t.businessKey))])]}}])}),n._v(\" \"),a(\"Page\",{staticClass:\"todotask-content-page\",attrs:{total:n.pageInfo.total,\"page-size\":n.pageInfo.limit,current:n.pageInfo.page,\"show-total\":\"\",size:\"small\",\"show-elevator\":\"\",\"show-sizer\":\"\",\"prev-text\":\"上一页\",\"next-text\":\"下一页\"},on:{\"on-page-size-change\":n.handlePageSizeChange,\"on-change\":n.handlePageChange}}),n._v(\" \"),a(\"i\",{staticClass:\"iconfont icon-refresh\",on:{click:n.getFlowTodoTasks}},[n._v(\"\")])],1)])])},staticRenderFns:[]}},xJ5q:function(e,t){}});"}