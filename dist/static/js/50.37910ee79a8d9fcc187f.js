webpackJsonp([50],{"19dG":function(t,e){t.exports={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"draftbox"},[n("div",{staticClass:"draftbox-header"},[a._v("\n        所有任务\n    ")]),a._v(" "),n("div",{staticClass:"draftbox-content"},[n("div",{staticClass:"draftbox-content-container shadow"},[n("div",{staticClass:"draftbox-content-container-toolbar"},[n("Input",{staticClass:"draftbox-content-container-toolbar-search",attrs:{search:"",placeholder:"输入交易号"},on:{"on-enter":a.handleSearch,"on-change":a.handleSearch},model:{value:a.searchkeywords,callback:function(t){a.searchkeywords=t},expression:"searchkeywords"}})],1),a._v(" "),n("Table",{staticClass:"draftbox-content-table",attrs:{columns:a.columns,data:a.data,height:a.tableHeight},scopedSlots:a._u([{key:"transCode",fn:function(t){var e=t.row;return[n("a",{attrs:{href:"/Form/index.html?data="+e.transCode,target:"_blank"}},[a._v(a._s(e.transCode))])]}}])}),a._v(" "),n("Page",{staticClass:"draftbox-content-page",attrs:{total:a.pageInfo.total,"page-size":a.pageInfo.limit,current:a.pageInfo.page,"show-total":"",size:"small","show-elevator":"","show-sizer":"","prev-text":"上一页","next-text":"下一页"},on:{"on-page-size-change":a.handlePageSizeChange,"on-change":a.handlePageChange}})],1)])])},staticRenderFns:[]}},"8t3q":function(t,e){},yiwx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("mvHQ"),o=a.n(n),i=a("UzZq"),r={name:"Draftbox",data:function(){return{columns:[{title:"交易号",slot:"transCode",width:140},{title:"应用名称",key:"transType",width:160},{title:"经办人",key:"handlerName",width:80},{title:"经办人组织",key:"handlerUnitName",width:120},{title:"经办人职位",key:"handlerRoleName",width:120},{title:"创建时间",key:"createdTime",width:150}],data:[],pageInfo:{limit:30,page:1,total:0,filter:[]},searchkeywords:"",tableHeight:1}},methods:{getDraftData:function(){var e=this;Object(i.d)(this.pageInfo).then(function(t){e.data=t.tableContent,e.pageInfo.total=t.dataCount})},handlePageChange:function(t){this.pageInfo.page=t,this.getDraftData()},handlePageSizeChange:function(t){this.pageInfo.limit=t,this.getDraftData()},handleSearch:function(){this.pageInfo.filter=o()([{operator:"like",value:this.searchkeywords,property:"transCode"}]),this.getDraftData()}},mounted:function(){var t=this;this.getDraftData(),this.tableHeight=document.body.clientHeight-200,window.onresize=function(){t.tableHeight=document.body.clientHeight-200}}},s=a("19dG"),l=a.n(s);var d=function(t){a("8t3q")},c=a("VU/8")(r,l.a,!1,d,"data-v-09cbec73",null);e.default=c.exports}});