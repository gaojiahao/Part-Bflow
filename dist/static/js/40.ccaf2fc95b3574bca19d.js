webpackJsonp([40],{KBHf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),o=a("UzZq"),i={name:"FlowtaskDone",data:function(){return{columns:[{title:"任务编号",key:"taskId",width:90},{title:"交易号",slot:"transId",width:160},{title:"往来",key:"dealerName",width:140},{title:"操作名称",key:"nodeName",width:160},{title:"应用名称",key:"title",width:160},{title:"经办人",key:"handlerName",width:80},{title:"发起人",key:"creatorName",width:80},{title:"待办创建时间",key:"crtTime",width:150},{title:"任务处理时间",key:"endTime",width:150}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1}},methods:{getFlowDoneTasks:function(){var t=this;this.pageInfo.filter=s()([{link:"or",operator_1:"like",value_1:this.searchkeywords,property_1:"transId",operator_2:"like",value_2:this.searchkeywords,property_2:"dealerName"}]),Object(o.e)(this.pageInfo).then(function(e){t.data=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.getFlowDoneTasks()},handlePageSizeChange:function(e){this.pageInfo.limit=e,this.getFlowDoneTasks()},handleSearch:function(){this.pageInfo.page=1,this.getFlowDoneTasks()},subscribeMessage:function(){var t=this;this.$deepstream.event.subscribe("taskChange/"+this.$currentUser.userId,function(e){t.getFlowDoneTasks()})}},mounted:function(){var e=this;this.getFlowDoneTasks(),this.subscribeMessage(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){e.tableHeight=document.body.clientHeight-200}}},r=a("YZEJ"),l=a.n(r);var d=function(e){a("yPWF")},c=a("VU/8")(i,l.a,!1,d,"data-v-582e59af",null);t.default=c.exports},YZEJ:function(e,t){e.exports={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"donetask"},[n("div",{staticClass:"donetask-header"},[a._v("\n        我的已办\n    ")]),a._v(" "),n("div",{staticClass:"donetask-content"},[n("div",{staticClass:"donetask-content-container shadow"},[n("div",{staticClass:"donetask-content-container-toolbar"},[n("Input",{staticClass:"donetask-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号或往来对象查询"},on:{"on-enter":a.handleSearch,"on-change":a.handleSearch},model:{value:a.searchkeywords,callback:function(e){a.searchkeywords=e},expression:"searchkeywords"}})],1),a._v(" "),n("Table",{staticClass:"donetask-content-table",attrs:{columns:a.columns,data:a.data,height:a.tableHeight},scopedSlots:a._u([{key:"transId",fn:function(e){var t=e.row;return[n("a",{attrs:{href:"/Form/index.html?data="+t.transId,target:"_blank"}},[a._v(a._s(t.transId))])]}}])}),a._v(" "),n("Page",{staticClass:"donetask-content-page",attrs:{total:a.pageInfo.total,"page-size":a.pageInfo.limit,current:a.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":a.handlePageSizeChange,"on-change":a.handlePageChange}})],1)])])},staticRenderFns:[]}},yPWF:function(e,t){}});