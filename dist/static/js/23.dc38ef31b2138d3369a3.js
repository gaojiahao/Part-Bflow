webpackJsonp([23],{Oi3f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),n=a("GIAq"),o={components:{MyPopTip:a("3ovf").a},props:{listData:Array},data:function(){return{userInfo:{}}},created:function(){},methods:{focusChange:function(t){var e=this;t||(this.userInfo={}),Object(n.Z)(t).then(function(t){e.userInfo=t.tableContent[0]})},goAppSetting:function(t){this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})},deleteApplication:function(e,t){var a=this,s={uniqueId:t.uniqueId,status:0};this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.h)(s).then(function(t){t.success&&(a.$Message.success(t.message),a.listData.splice(e,1))})}})}},mounted:function(){}},r=a("vgTi"),c=a.n(r);var l=function(t){a("npyP")},p={name:"applicationList",components:{AppCardList:a("VU/8")(o,c.a,!1,l,"data-v-db5e511a",null).exports},data:function(){var a=this;return{isListAcive:!1,isViewCutFocus:!0,isCardAcive:!0,value1:"0",showDeleteAll:!1,modal1:!1,showAppList:!0,showTableList:!1,searchValue:"",columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"title"},{title:"类型",key:"transType"},{title:"应用大类",key:"type",render:function(t,e){return t("span",{},"business"===e.row.type?"业务应用":"obj"===e.row.type?"基础对象":"科目应用")}},{title:"管理员",key:"administrator",render:function(t,e){return[t("Icon",{props:{type:"person"}}),t("span",{},e.row.administrator)]}},{title:"创建时间",key:"createTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",width:150,render:function(t,e){return 1===e.row.publish?t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#00DB00"}},"●"),t("b",{},"已发布")]):t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#e4393c"}},"●"),t("b",{},"未发布")])}},{title:"操作",key:"action",width:150,align:"center",render:function(t,e){return t("div",[t("a",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){a.goDetail(e.row)}}},"设置"),t("span",{style:{height:"1rem",borderLeft:"1px solid #ddd",marginRight:"1rem",marginLeft:"0.7rem"}}),t("a",{props:{type:"error",size:"small"},on:{click:function(){a.deleteApplication(e.index,e.row.uniqueId)}}},"删除")])}}],tableData:[],sameTableData:[]}},methods:{isShowAppList:function(){this.showAppList=!1},deleteApplication:function(e,t){var a=this,s={uniqueId:t,status:0};this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.h)(s).then(function(t){t.success&&(a.$Message.success(t.message),a.tableData.splice(e,1),a.sameTableData.splice(e,1))})}})},showListView:function(){this.showTableList=!0,this.isCardAcive=!1,this.isListAcive=!0},showCardView:function(){this.showTableList=!1,this.isCardAcive=!0,this.isListAcive=!1},goDetail:function(t){this.showAppList=!1,this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})}},watch:{searchValue:function(a){var s=[];this.tableData=a?(this.sameTableData.forEach(function(t,e){-1<t.title.indexOf(a)&&s.push(t)}),s):this.sameTableData}},mounted:function(){var e=this,t=i()([{operator:"ne",value:"template",property:"type"}]);Object(n.z)(t).then(function(t){e.tableData=t.tableContent,e.sameTableData=t.tableContent})}},u=a("Wl+R"),d=a.n(u);var h=function(t){a("yoEJ")},f=a("VU/8")(p,d.a,!1,h,"data-v-a75c5e7e",null);e.default=f.exports},"Wl+R":function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.showAppList?a("div",[a("header",{staticClass:"top-head"},[a("div",{staticClass:"app-layout"},[a("div",{class:{"view-cut-focus":e.isViewCutFocus,active:e.isCardAcive},on:{click:e.showCardView}})]),e._v(" "),a("div",{staticClass:"top-head-search"},[a("Icon",{staticClass:"app-search-icon",attrs:{type:"md-search"}}),e._v(" "),a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"搜索"},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1)]),e._v(" "),a("div",{staticClass:"app-body"},[e.showTableList?a("div",[a("Table",{attrs:{size:"small",stripe:!0,columns:e.columns,data:e.tableData,"no-data-text":"暂无数据"}})],1):a("div",[a("app-card-list",{attrs:{listData:e.tableData}})],1)])]):e._e()])},staticRenderFns:[]}},npyP:function(t,e){},vgTi:function(t,e){t.exports={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"app-list"},[i("Row",{staticClass:"app-container",attrs:{gutter:8}},s._l(s.listData,function(e,a){return i("Col",{key:a,staticClass:"app-col",attrs:{xs:24,sm:12,md:8,lg:6}},[i("Card",{staticClass:"app-card"},[i("img",{staticClass:"card-img",attrs:{src:e.icon}}),s._v(" "),i("b",{staticClass:"card-name"},[s._v(s._s(e.title))]),s._v(" "),i("span",{staticClass:"card-type"},[s._v(s._s(e.transName)+"\n          "),e.administrator?i("my-pop-tip",{attrs:{userInfo:s.userInfo}},[i("span",{staticClass:"card-admintrstor",attrs:{slot:"userCard"},on:{mouseenter:function(t){s.focusChange(e.administratorId)}},slot:"userCard"},[i("Icon",{attrs:{type:"person"}}),s._v(s._s(e.administrator)+"\n            ")],1)]):s._e()],1),s._v(" "),i("span",{staticClass:"card-desc",domProps:{innerHTML:s._s(e.comment)}}),s._v(" "),i("a",{staticClass:"card-setting",attrs:{type:"text"},on:{click:function(t){s.goAppSetting(e)}}},[s._v("详情")]),s._v(" "),i("p",{staticClass:"card-delete",on:{click:function(t){s.deleteApplication(a,e)}}},[i("Tooltip",{attrs:{content:"删除应用",placement:"top"}},[i("Icon",{attrs:{type:"close-round"}})],1)],1)])],1)}),1)],1)},staticRenderFns:[]}},yoEJ:function(t,e){}});