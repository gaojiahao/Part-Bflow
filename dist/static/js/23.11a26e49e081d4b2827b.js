webpackJsonp([23],{"7/hj":function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"check-list"},[a("div",{staticClass:"check-list-toolbar"},[a("span",{staticClass:"check-list-btn",attrs:{type:"primary"},on:{click:t.goAddCheckSheet}},[t._v("\n            新增")]),t._v(" "),a("div",{staticClass:"check-list-toolbar-search"},[a("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索点检表名称"},on:{"on-search":t.checkSheetFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1)]),t._v(" "),a("div",{staticClass:"check-list-table"},[a("Table",{attrs:{columns:t.columns,height:t.tableHeight,data:t.data,size:"small"}}),t._v(" "),a("div",{staticClass:"user-page"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.total,current:t.currentPage,"page-size":t.pageSize,size:"small","show-elevator":"","show-sizer":""},on:{"on-page-size-change":t.onPageSizeChange,"on-change":t.onPageChange}})],1)])],1),t._v(" "),a("Modal",{attrs:{title:"检查项",width:"1000",styles:{top:"20px"}},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[a("Table",{staticStyle:{"margin-top":"5px"},attrs:{columns:t.itemColumns,data:t.itemData,size:"small",height:"500"}}),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)},staticRenderFns:[]}},"Ev9+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),c=a.n(n),i=a("p1MO"),o={name:"checkSheet",components:{},data:function(){var a=this;return{currentPage:1,pageSize:20,total:0,tableHeight:0,showModal:!1,searchValue:"",itemColumns:[{type:"index",width:80},{title:"检查项目",key:"title"},{title:"检查内容",key:"content",width:400},{title:"修改者",key:"menderName"},{title:"修改时间",key:"modTime"}],itemData:[],columns:[{type:"index",width:80},{title:"点检表名称",key:"name",width:140,render:function(e,t){return e("a",{on:{click:function(){a.$router.push({name:"checkSheetDetail",path:"/checkSheet/detail/"+t.row.id,params:{id:t.row.id}})}}},t.row.name)}},{title:"描述",key:"comment",width:390},{title:"检查项",key:"comment",render:function(e,t){return e("a",{on:{click:function(){a.showModal=!0,a.getCheckSheetItemData(t.row.id)}}},t.row.num)}},{title:"修改者",key:"menderName"},{title:"修改时间",key:"modTime",width:160},{title:"操作",key:"action",render:function(e,t){return e("div",[e("a",{on:{click:function(){a.deleteCheckSheetData(t)}}},"删除")])}}],data:[]}},methods:{getCheckSheetItemData:function(e){var t=this;Object(i.c)(e,1,1e3).then(function(e){t.itemData=e.tableContent})},checkSheetFilter:function(){var e=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.currentPage=1,this.getCheckSheetData(e)},onPageChange:function(e){var t=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.currentPage=e,this.getCheckSheetData(t)},onPageSizeChange:function(e){var t=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.pageSize=e,this.getCheckSheetData(t)},goAddCheckSheet:function(){this.$router.push({path:"/checkSheet/add"})},deleteCheckSheetData:function(e){var t=this;this.$Modal.confirm({title:"确认",content:"确认删除<b style=color:#e4393c;>"+e.row.name+"</b>么？",onOk:function(){Object(i.b)(e.row.id).then(function(e){e.success&&(t.$Message.success(e.message),t.getCheckSheetData())}).catch(function(e){t.$Message.error(e.data.message)})}})},getCheckSheetData:function(e){var t=this;Object(i.d)(this.currentPage,this.pageSize,e).then(function(e){t.data=e.tableContent,t.total=e.dataCount})}},mounted:function(){var e=this;this.getCheckSheetData(),this.tableHeight=document.body.clientHeight-150,window.onresize=function(){e.tableHeight=document.body.clientHeight-150}}},r=a("7/hj"),l=a.n(r);var s=function(e){a("vTFp")},h=a("VU/8")(o,l.a,!1,s,"data-v-44ba4dcf",null);t.default=h.exports},p1MO:function(e,t,a){"use strict";a.d(t,"d",function(){return n}),a.d(t,"c",function(){return i}),a.d(t,"e",function(){return o}),a.d(t,"g",function(){return r}),a.d(t,"b",function(){return l}),a.d(t,"f",function(){return s}),a.d(t,"h",function(){return h}),a.d(t,"a",function(){return u});var c=a("7B+g"),n=function(e,t,a){return Object(c.a)("/H_roleplay-si/check/listCheckTable",{page:e,limit:t,filter:a})},i=function(e,t,a,n){return Object(c.a)("/H_roleplay-si/check/listCheckItem",{checkTableId:e,page:t,limit:a,filter:n})},o=function(e){return Object(c.a)("/H_roleplay-si/check/saveCheckTableAndCheckItem",{},"POST",e)},r=function(e){return Object(c.a)("/H_roleplay-si/check/updateCheckTable",{},"POST",e)},l=function(e){return Object(c.a)("/H_roleplay-si/check/deleteCheckTable",{checkTableId:e},"POST")},s=function(e){return Object(c.a)("/H_roleplay-si/check/saveCheckItem",{},"POST",e)},h=function(e){return Object(c.a)("/H_roleplay-si/check/updateCheckContent",{},"POST",e)},u=function(e){return Object(c.a)("/H_roleplay-si/check/deleteCheckItem",{checkItemId:e},"POST")}},vTFp:function(e,t){}});