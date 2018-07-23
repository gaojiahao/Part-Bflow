webpackJsonp([4],{Oi3f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),n=a("GIAq"),c={props:{listData:Array},data:function(){return{}},created:function(){},methods:{goAppSetting:function(t){this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})},deleteApplication:function(t,e){var a=this,s={uniqueId:e.uniqueId,status:0};s&&this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.d)(s).then(function(e){e.success&&(a.$Message.success(e.message),a.listData.splice(t,1))})}})}},mounted:function(){}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-list"},[a("Row",{staticClass:"app-container",attrs:{gutter:8}},t._l(t.listData,function(e,s){return a("Col",{key:s,staticClass:"app-col",attrs:{xs:24,sm:12,md:8,lg:6}},[a("Card",{staticClass:"app-card"},[a("img",{staticClass:"card-img",attrs:{src:e.icon}}),t._v(" "),a("b",{staticClass:"card-name"},[t._v(t._s(e.title))]),t._v(" "),a("span",{staticClass:"card-type"},[t._v(t._s(e.transType)+"\n                "),a("span",{staticClass:"card-admintrstor"},[a("Icon",{attrs:{type:"person"}}),t._v(t._s(e.administrator))],1)]),t._v(" "),a("span",{staticClass:"card-desc"},[t._v(t._s(e.comment))]),t._v(" "),a("a",{staticClass:"card-setting",attrs:{type:"text"},on:{click:function(a){t.goAppSetting(e)}}},[t._v("详情")]),t._v(" "),a("p",{staticClass:"card-delete",on:{click:function(a){t.deleteApplication(s,e)}}},[a("Tooltip",{attrs:{content:"删除应用",placement:"top"}},[a("Icon",{attrs:{type:"close-round"}})],1)],1)])],1)}))],1)},staticRenderFns:[]};var r={name:"applicationList",components:{AppCardList:a("VU/8")(c,o,!1,function(t){a("t6hc")},"data-v-12c89900",null).exports},data:function(){var t=this;return{isListAcive:!1,isViewCutFocus:!0,isCardAcive:!0,value1:"0",showDeleteAll:!1,modal1:!1,showAppList:!0,showTableList:!1,searchValue:"",columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"title"},{title:"类型",key:"transType"},{title:"应用大类",key:"type",render:function(t,e){return t("span",{},"business"===e.row.type?"业务应用":"obj"===e.row.type?"基础对象":"科目应用")}},{title:"管理员",key:"administrator"},{title:"创建时间",key:"createTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",width:150,render:function(t,e){return 1===e.row.publish?t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#00DB00"}},"●"),t("b",{},"已发布")]):t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#e4393c"}},"●"),t("b",{},"未发布")])}},{title:"操作",key:"action",width:150,align:"center",render:function(e,a){return e("div",[e("a",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.goDetail(a.row)}}},"设置"),e("span",{style:{height:"1rem",borderLeft:"1px solid #ddd",marginRight:"1rem",marginLeft:"0.7rem"}}),e("a",{props:{type:"error",size:"small"},on:{click:function(){t.deleteApplication(a.index,a.row.uniqueId)}}},"删除")])}}],tableData:[],sameTableData:[]}},methods:{isShowAppList:function(){this.showAppList=!1},deleteApplication:function(t,e){var a=this,s={uniqueId:e,status:0};s&&this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.d)(s).then(function(e){e.success&&(a.$Message.success(e.message),a.tableData.splice(t,1),a.sameTableData.splice(t,1))})}})},showListView:function(){this.showTableList=!0,this.isCardAcive=!1,this.isListAcive=!0},showCardView:function(){this.showTableList=!1,this.isCardAcive=!0,this.isListAcive=!1},goDetail:function(t){this.showAppList=!1,this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})}},watch:{searchValue:function(t){var e=[];t?(this.sameTableData.forEach(function(a,s){a.title.indexOf(t)>-1&&e.push(a)}),this.tableData=e):this.tableData=this.sameTableData}},mounted:function(){var t=this,e=i()([{operator:"ne",value:"template",property:"type"}]);Object(n.l)(e).then(function(e){t.tableData=e.tableContent,t.sameTableData=e.tableContent})}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.showAppList?a("div",[a("header",{staticClass:"top-head"},[a("router-link",{attrs:{to:"/application/add"}},[a("Button",{staticClass:"add-btn",attrs:{icon:"plus-round"},on:{click:t.isShowAppList}},[t._v("\n          添加应用")])],1),t._v(" "),a("div",{staticClass:"app-layout"},[a("div",{class:{"view-cut-focus":t.isViewCutFocus,active:t.isListAcive},on:{click:t.showListView}},[a("Tooltip",{attrs:{content:"列表视图",placement:"top"}},[a("Icon",{attrs:{type:"android-menu"}})],1)],1),t._v(" "),a("div",{class:{"view-cut-focus":t.isViewCutFocus,active:t.isCardAcive},on:{click:t.showCardView}},[a("Tooltip",{attrs:{content:"卡片视图",placement:"top"}},[a("Icon",{attrs:{type:"android-apps"}})],1)],1)]),t._v(" "),a("div",{staticClass:"top-head-search"},[a("Icon",{staticClass:"app-search-icon",attrs:{type:"search"}}),t._v(" "),a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"搜索"},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1)],1),t._v(" "),a("div",{staticClass:"app-body"},[t.showTableList?a("div",[a("Table",{attrs:{size:"small",stripe:!0,columns:t.columns,data:t.tableData,"no-data-text":"暂无数据"}})],1):a("div",[a("app-card-list",{attrs:{listData:t.tableData}})],1)])]):t._e()])},staticRenderFns:[]};var p=a("VU/8")(r,l,!1,function(t){a("wTRD")},"data-v-24b26cec",null);e.default=p.exports},mvHQ:function(t,e,a){t.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(t,e,a){var s=a("FeBl"),i=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},t6hc:function(t,e){},wTRD:function(t,e){}});
//# sourceMappingURL=4.a01ac11290db504ecfde.js.map