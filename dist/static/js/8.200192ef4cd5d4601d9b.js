webpackJsonp([8],{"/0jd":function(t,s){},"3ovf":function(t,s,e){"use strict";var a={props:{userInfo:Object,trigger:{type:String,default:"hover"}},data:function(){return{errorImg01:'this.src="'+e("aCT7")+'"'}},methods:{}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("Poptip",{attrs:{trigger:t.trigger,placement:"bottom",transfer:!0}},[t._t("userCard"),t._v(" "),e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"userInfo"},[e("div",{staticClass:"userInfo-top"},[e("img",{staticClass:"userInfo-img",attrs:{src:t.userInfo.photo,onerror:t.errorImg01}}),t._v(" "),e("div",{staticClass:"userInfo-right"},[e("b",{staticClass:"font14"},[t._v(t._s(t.userInfo.nickname))]),t._v(" "),e("i",{staticClass:"iconfont",staticStyle:{color:"#2d8cf0"}},[t._v("")]),t._v(" "),e("p",[e("span",{staticClass:"user-font"},[t._v(t._s(t.userInfo.groupName))])])])]),t._v(" "),e("div",{staticClass:"userInfo-bottom"},[e("p",[e("span",{staticClass:"user-font"},[t._v("手机")]),t._v(" "),e("span",{staticClass:"left-margin"},[t._v(t._s(t.userInfo.mobile))])]),t._v(" "),e("p",[e("span",{staticClass:"user-font"},[t._v("邮件")]),t._v(" "),e("span",{staticClass:"left-margin"},[t._v(t._s(t.userInfo.email))])]),t._v(" "),e("p",[e("span",{staticClass:"user-font"},[t._v("部门")]),t._v(" "),e("span",{staticClass:"left-margin"},[t._v(t._s(t.userInfo.groupName))])])])])])],2)},staticRenderFns:[]};var n=e("VU/8")(a,i,!1,function(t){e("Yyey"),e("/0jd")},"data-v-3ea32899",null);s.a=n.exports},EmBe:function(t,s){},ML0v:function(t,s){},Oi3f:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),i=e.n(a),n=e("GIAq"),o={components:{MyPopTip:e("3ovf").a},props:{listData:Array},data:function(){return{userInfo:{}}},created:function(){},methods:{focusChange:function(t){var s=this;t||(this.userInfo={}),Object(n.A)(t).then(function(t){s.userInfo=t.tableContent[0]})},goAppSetting:function(t){this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})},deleteApplication:function(t,s){var e=this,a={uniqueId:s.uniqueId,status:0};a&&this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.e)(a).then(function(s){s.success&&(e.$Message.success(s.message),e.listData.splice(t,1))})}})}},mounted:function(){}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"app-list"},[e("Row",{staticClass:"app-container",attrs:{gutter:8}},t._l(t.listData,function(s,a){return e("Col",{key:a,staticClass:"app-col",attrs:{xs:24,sm:12,md:8,lg:6}},[e("Card",{staticClass:"app-card"},[e("img",{staticClass:"card-img",attrs:{src:s.icon}}),t._v(" "),e("b",{staticClass:"card-name"},[t._v(t._s(s.title))]),t._v(" "),e("span",{staticClass:"card-type"},[t._v(t._s(s.transName)+"\n        "),s.administrator?e("my-pop-tip",{attrs:{userInfo:t.userInfo}},[e("span",{staticClass:"card-admintrstor",attrs:{slot:"userCard"},on:{mouseenter:function(e){t.focusChange(s.administratorId)}},slot:"userCard"},[e("Icon",{attrs:{type:"person"}}),t._v(t._s(s.administrator)+"\n          ")],1)]):t._e()],1),t._v(" "),e("span",{staticClass:"card-desc"},[t._v(t._s(s.comment))]),t._v(" "),e("a",{staticClass:"card-setting",attrs:{type:"text"},on:{click:function(e){t.goAppSetting(s)}}},[t._v("详情")]),t._v(" "),e("p",{staticClass:"card-delete",on:{click:function(e){t.deleteApplication(a,s)}}},[e("Tooltip",{attrs:{content:"删除应用",placement:"top"}},[e("Icon",{attrs:{type:"close-round"}})],1)],1)])],1)}))],1)},staticRenderFns:[]};var c={name:"applicationList",components:{AppCardList:e("VU/8")(o,r,!1,function(t){e("ML0v")},"data-v-0f1fb0ac",null).exports},data:function(){var t=this;return{isListAcive:!1,isViewCutFocus:!0,isCardAcive:!0,value1:"0",showDeleteAll:!1,modal1:!1,showAppList:!0,showTableList:!1,searchValue:"",columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"title"},{title:"类型",key:"transType"},{title:"应用大类",key:"type",render:function(t,s){return t("span",{},"business"===s.row.type?"业务应用":"obj"===s.row.type?"基础对象":"科目应用")}},{title:"管理员",key:"administrator",render:function(t,s){return[t("Icon",{props:{type:"person"}}),t("span",{},s.row.administrator)]}},{title:"创建时间",key:"createTime"},{title:"创建者",key:"creator"},{title:"状态",key:"status",width:150,render:function(t,s){return 1===s.row.publish?t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#00DB00"}},"●"),t("b",{},"已发布")]):t("div",[t("b",{style:{marginRight:"5px",fontSize:"1rem",color:"#e4393c"}},"●"),t("b",{},"未发布")])}},{title:"操作",key:"action",width:150,align:"center",render:function(s,e){return s("div",[s("a",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.goDetail(e.row)}}},"设置"),s("span",{style:{height:"1rem",borderLeft:"1px solid #ddd",marginRight:"1rem",marginLeft:"0.7rem"}}),s("a",{props:{type:"error",size:"small"},on:{click:function(){t.deleteApplication(e.index,e.row.uniqueId)}}},"删除")])}}],tableData:[],sameTableData:[]}},methods:{isShowAppList:function(){this.showAppList=!1},deleteApplication:function(t,s){var e=this,a={uniqueId:s,status:0};a&&this.$Modal.confirm({title:"确认",content:"确认删除此应用？",onOk:function(){Object(n.e)(a).then(function(s){s.success&&(e.$Message.success(s.message),e.tableData.splice(t,1),e.sameTableData.splice(t,1))})}})},showListView:function(){this.showTableList=!0,this.isCardAcive=!1,this.isListAcive=!0},showCardView:function(){this.showTableList=!1,this.isCardAcive=!0,this.isListAcive=!1},goDetail:function(t){this.showAppList=!1,this.$router.push({path:"/application/detail/"+t.uniqueId,params:{listId:t.uniqueId}})}},watch:{searchValue:function(t){var s=[];t?(this.sameTableData.forEach(function(e,a){e.title.indexOf(t)>-1&&s.push(e)}),this.tableData=s):this.tableData=this.sameTableData}},mounted:function(){var t=this,s=i()([{operator:"ne",value:"template",property:"type"}]);Object(n.p)(s).then(function(s){t.tableData=s.tableContent,t.sameTableData=s.tableContent})}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t.showAppList?e("div",[e("header",{staticClass:"top-head"},[e("router-link",{attrs:{to:"/application/add"}},[e("Button",{staticClass:"add-btn",attrs:{icon:"plus-round"},on:{click:t.isShowAppList}},[t._v("\n          添加应用")])],1),t._v(" "),e("div",{staticClass:"app-layout"},[e("div",{class:{"view-cut-focus":t.isViewCutFocus,active:t.isListAcive},on:{click:t.showListView}},[e("Tooltip",{attrs:{content:"列表视图",placement:"top"}},[e("Icon",{attrs:{type:"md-menu"}})],1)],1),t._v(" "),e("div",{class:{"view-cut-focus":t.isViewCutFocus,active:t.isCardAcive},on:{click:t.showCardView}},[e("Tooltip",{attrs:{content:"卡片视图",placement:"top"}},[e("Icon",{attrs:{type:"ios-apps"}})],1)],1)]),t._v(" "),e("div",{staticClass:"top-head-search"},[e("Icon",{staticClass:"app-search-icon",attrs:{type:"md-search"}}),t._v(" "),e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"搜索"},model:{value:t.searchValue,callback:function(s){t.searchValue=s},expression:"searchValue"}})],1)],1),t._v(" "),e("div",{staticClass:"app-body"},[t.showTableList?e("div",[e("Table",{attrs:{size:"small",stripe:!0,columns:t.columns,data:t.tableData,"no-data-text":"暂无数据"}})],1):e("div",[e("app-card-list",{attrs:{listData:t.tableData}})],1)])]):t._e()])},staticRenderFns:[]};var p=e("VU/8")(c,l,!1,function(t){e("EmBe")},"data-v-5808b2ac",null);s.default=p.exports},Yyey:function(t,s){},aCT7:function(t,s,e){t.exports=e.p+"static/img/login_bg.c2a5720.jpg"}});
//# sourceMappingURL=8.200192ef4cd5d4601d9b.js.map