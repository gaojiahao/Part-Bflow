webpackJsonp([22],{"Ev9+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),c=a.n(n),i=a("p1MO"),o={name:"checkSheet",components:{},data:function(){var e=this;return{currentPage:1,pageSize:10,total:0,showModal:!1,searchValue:"",itemColumns:[{type:"index",width:80},{title:"检查项目",key:"title"},{title:"检查内容",key:"content",width:400},{title:"修改者",key:"menderName"},{title:"修改时间",key:"modTime"}],itemData:[],columns:[{type:"index",width:80},{title:"点检表名称",key:"name",width:140,render:function(t,a){return t("a",{on:{click:function(){e.$router.push({name:"checkSheetDetail",path:"/checkSheet/detail",params:{id:a.row.id}})}}},a.row.name)}},{title:"描述",key:"comment",width:390},{title:"检查项",key:"comment",render:function(t,a){return t("a",{on:{click:function(){e.showModal=!0,e.getCheckSheetItemData(a.row.id)}}},a.row.num)}},{title:"修改者",key:"menderName"},{title:"修改时间",key:"modTime",width:160},{title:"操作",key:"action",render:function(t,a){return t("div",[t("a",{on:{click:function(){e.deleteCheckSheetData(a)}}},"删除")])}}],data:[]}},methods:{getCheckSheetItemData:function(e){var t=this;Object(i.b)(e,1,1e3).then(function(e){t.itemData=e.tableContent})},checkSheetFilter:function(){var e=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.currentPage=1,this.getCheckSheetData(e)},onPageChange:function(e){var t=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.currentPage=e,this.getCheckSheetData(t)},onPageSizeChange:function(e){var t=c()([{operator:"like",value:this.searchValue,property:"name"}]);this.pageSize=e,this.getCheckSheetData(t)},goAddCheckSheet:function(){this.$router.push({path:"/checkSheet/detail"})},deleteCheckSheetData:function(e){var t=this;this.$Modal.confirm({title:"确认",content:"确认删除<b style=color:#e4393c;>"+e.row.name+"</b>么？",onOk:function(){Object(i.a)(e.row.id).then(function(e){e.success&&(t.$Message.success(e.message),t.getCheckSheetData())}).catch(function(e){t.$Message.error(e.data.message)})}})},getCheckSheetData:function(e){var t=this;Object(i.c)(this.currentPage,this.pageSize,e).then(function(e){t.data=e.tableContent,t.total=e.dataCount})}},mounted:function(){this.getCheckSheetData()}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"check-list"},[a("Row",{staticClass:"check-list-table"},[a("div",{staticStyle:{"margin-bottom":"15px"}},[a("span",{staticClass:"check-list-btn",attrs:{type:"primary"},on:{click:e.goAddCheckSheet}},[e._v("\n          新增")]),e._v(" "),a("div",{staticClass:"app-search"},[a("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索点检表名称"},on:{"on-search":e.checkSheetFilter},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1)]),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.data,size:"small"}}),e._v(" "),a("div",{staticClass:"user-page"},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.total,current:e.currentPage,"page-size":e.pageSize,size:"small","show-elevator":"","show-sizer":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.onPageChange}})],1)])],1),e._v(" "),a("Modal",{attrs:{title:"检查项",width:"1000",styles:{top:"20px"}},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Table",{staticStyle:{"margin-top":"5px"},attrs:{columns:e.itemColumns,data:e.itemData,size:"small",height:"500"}}),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(o,r,!1,function(e){a("tKgn")},"data-v-dc23dba4",null);t.default=s.exports},p1MO:function(e,t,a){"use strict";a.d(t,"c",function(){return c}),a.d(t,"b",function(){return i}),a.d(t,"d",function(){return o}),a.d(t,"e",function(){return r}),a.d(t,"a",function(){return s});var n=a("7B+g"),c=function(e,t,a){return Object(n.a)("/H_roleplay-si/check/listCheckTable",{page:e,limit:t,filter:a})},i=function(e,t,a,c){return Object(n.a)("/H_roleplay-si/check/listCheckItem",{checkTableId:e,page:t,limit:a,filter:c})},o=function(e){return Object(n.a)("/H_roleplay-si/check/saveCheckTableAndCheckItem",{},"POST",e)},r=function(e){return Object(n.a)("/H_roleplay-si/check/updateCheckTableAndCheckItem",{},"POST",e)},s=function(e){return Object(n.a)("/H_roleplay-si/check/deleteCheckTable",{checkTableId:e},"POST")}},tKgn:function(e,t){}});