webpackJsonp([6],{"2UiN":function(t,e){},BLn5:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Sxqw"),a=i.n(n),s=i("3SZ7"),o=i.n(s),c={name:"flowTaskNotice",props:{data:{}},methods:{handleViewDetail:function(){this.data.tempContent.transCode&&window.open("/Form/index.html?data="+this.data.tempContent.transCode)}},mounted:function(){}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"msg-comment"},[i("div",{staticClass:"msg-comment-title"},[i("Icon",{attrs:{type:"ios-notifications-outline",size:18,color:"red"}}),t._v(" "),"taskCreate"==t.data.noticeSource?i("span",[t._v(" 工作流-新任务通知")]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?i("span",[t._v("工作流-转办任务通知")]):t._e(),t._v(" "),t.data.noticeSource.includes("taskComplete")?i("span",[t._v("工作流-任务已办通知")]):t._e(),t._v(" "),"taskRetract"==t.data.noticeSource||"taskStop"==t.data.noticeSource?i("span",[t._v("工作流-任务取消通知")]):t._e()],1),t._v(" "),i("div",{staticClass:"msg-comment-content"},[i("p",[t._v("实例编码:"+t._s(t.data.tempContent.transCode))]),t._v(" "),i("p",[t._v("节点名称:"+t._s(t.data.tempContent.name))]),t._v(" "),i("p",[t._v("任务编码:"+t._s(t.data.relationKey))]),t._v(" "),"taskComplete"==t.data.noticeSource||"taskRetract"==t.data.noticeSource||"taskStop"==t.data.noticeSource?i("p",[t._v("操作名称:"+t._s(t.data.tempContent.operation))]):t._e(),t._v(" "),"taskTransfer"!=t.data.noticeSource?i("p",[t._v("执行者:"+t._s(t.data.tempContent.executor))]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?i("p",[t._v("转出者:"+t._s(t.data.tempContent.executor))]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?i("p",[t._v("执行者:"+t._s(t.data.tempContent.transfer))]):t._e(),t._v(" "),i("p",[t._v("任务创建时间:"+t._s(t.data.tempContent.taskCrtTime))]),t._v(" "),t.data.noticeSource.includes("taskComplete")||t.data.noticeSource.includes("taskRetract")?i("p",[t._v("\n            任务截至时间:"+t._s(t.data.tempContent.cplTime)+"\n           \n        ")]):t._e(),t._v(" "),t.data.noticeSource.includes("taskComplete")||t.data.noticeSource.includes("taskRetract")?i("p",[t._v("\n            任务历时: "),i("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{startTime:t.data.tempContent.taskCrtTime,endTime:t.data.tempContent.cplTime},expression:"{startTime:data.tempContent.taskCrtTime, endTime:data.tempContent.cplTime}"}]})]):t._e(),t._v(" "),i("p",[t._v("实例创建者:"+t._s(t.data.tempContent.starter))]),t._v(" "),i("p",[t._v("实例创建时间:"+t._s(t.data.tempContent.startTime))])]),t._v(" "),i("div",{staticClass:"msg-comment-href"},[i("a",{on:{click:t.handleViewDetail}},[t._v("详情 "),i("Icon",{staticClass:"fr",attrs:{type:"ios-arrow-forward"}})],1)])])},staticRenderFns:[]};var l=i("D8HT")(c,r,!1,function(t){i("2UiN")},"data-v-35fd6ca8",null).exports,d={name:"commentNoticeTpl",props:{data:{}},methods:{handleViewDetail:function(){var t=void 0;switch(this.data.sourceContent.type){case"list":t="/Site/index.html#appSetting/"+this.data.sourceContent.relationKey;break;case"instance":t="/Form/index.html?data="+this.data.sourceContent.relationKey}t&&window.open(t)}},mounted:function(){},beforeMount:function(){}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"msg-comment"},[i("div",{staticClass:"msg-comment-title"},[i("Icon",{attrs:{type:"ios-notifications-outline",size:18,color:"#3AA373"}}),t._v(" "),"instance"===t.data.sourceContent.type?i("span",[t._v("\n            实例\n        ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?i("span",[t._v("\n            应用\n        ")]):t._e(),t._v(" "),i("span",[t._v("评论")]),t._v(" "),t.data.noticeSource.includes("commentRelpy")?i("span",[t._v("回复")]):t._e(),t._v(" "),i("span",[t._v("通知")])],1),t._v(" "),i("div",{staticClass:"msg-comment-content"},["list"==t.data.sourceContent.type||"instance"===t.data.sourceContent.type?i("span",{staticClass:"notice-creator"},[t._v("\n            "+t._s(t.data.creatorName)+"\n        ")]):t._e(),t._v("\n        :\n        "),"instance"===t.data.sourceContent.type||"list"===t.data.sourceContent.type?i("span",[t.data.noticeSource.includes("commentRelpy")?[t._v("\n               发表了评论:\n               "),i("span",{staticClass:"notice-container",domProps:{innerHTML:t._s(t.data.tempContent)}}),t._v(" "),i("div",{staticClass:"notice-container-relpy"},[i("div",{staticClass:"notice-container-relpy-content"},[i("span",{staticClass:"notice-creator"},[t._v("@"+t._s(t.data.sourceContent.objCreator))]),t._v(":\n                        "),"instance"===t.data.sourceContent.type?i("span",{staticClass:"notice-relationKey"},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v(":\n                        "),i("span",{staticClass:"notice-container",domProps:{innerHTML:t._s(t.data.sourceContent.objContent)}})])])]:["instance"===t.data.sourceContent.type?i("span",[t._v("对实例 ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?i("span",[t._v("对应用")]):t._e(),t._v(" "),"instance"===t.data.sourceContent.type?i("span",{staticClass:"notice-relationKey"},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v("\n                发表了评论\n                "),i("div",{staticClass:"notice-container-comment"},[i("div",{staticClass:"notice-container-comment-content"},[i("span",{staticClass:"notice-container",domProps:{innerHTML:t._s(t.data.tempContent)}})])])]],2):t._e()]),t._v(" "),i("div",{staticClass:"msg-comment-href"},[i("a",{on:{click:t.handleViewDetail}},[t._v("详情 "),i("Icon",{staticClass:"fr",attrs:{type:"ios-arrow-forward"}})],1)])])},staticRenderFns:[]};var f=i("D8HT")(d,v,!1,function(t){i("DZgL")},"data-v-aad04492",null).exports,u={name:"praiseNoticeTpl",props:{data:{}},methods:{handleViewDetail:function(){var t=void 0;switch(this.data.sourceContent.type){case"list":t="/Site/index.html#appSetting/"+this.data.sourceContent.relationKey;break;case"instance":t="/Form/index.html?data="+this.data.sourceContent.relationKey}t&&window.open(t)}},mounted:function(){},beforeMount:function(){}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"msg-comment"},[i("div",{staticClass:"msg-comment-title"},[i("Icon",{attrs:{type:"ios-notifications-outline",size:18,color:"#3AA373"}}),t._v(" "),"instance"===t.data.sourceContent.type?i("span",[t._v("\n            实例\n        ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?i("span",[t._v("\n            应用\n        ")]):t._e(),t._v(" "),i("span",[t._v("评论点赞")]),t._v(" "),i("span",[t._v("通知")])],1),t._v(" "),i("div",{staticClass:"msg-comment-content"},["list"==t.data.sourceContent.type||"instance"===t.data.sourceContent.type?i("span",{staticClass:"notice-creator"},[t._v("\n            "+t._s(t.data.creatorName)+"\n        ")]):t._e(),t._v("\n        :\n        "),"instance"===t.data.sourceContent.type||"list"===t.data.sourceContent.type?i("span",["instance"===t.data.sourceContent.type?i("span",[t._v("对实例 ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?i("span",[t._v("对应用")]):t._e(),t._v(" "),"instance"===t.data.sourceContent.type?i("span",{staticClass:"notice-relationKey"},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v("\n            的评论发表了态度: \n            "),i("Icon",{attrs:{type:"md-thumbs-up",size:"18",color:"#FF5722"}}),t._v(" "),i("div",{staticClass:"notice-container-comment"},[i("div",{staticClass:"notice-container-comment-content"},[i("span",{staticClass:"notice-creator"},[t._v("@"+t._s(t.data.sourceContent.creator))]),t._v(":\n                    "),i("span",{domProps:{innerHTML:t._s(t.data.tempContent)}})])])],1):t._e()]),t._v(" "),i("div",{staticClass:"msg-comment-href"},[i("a",{on:{click:t.handleViewDetail}},[t._v("详情 "),i("Icon",{staticClass:"fr",attrs:{type:"ios-arrow-forward"}})],1)])])},staticRenderFns:[]};var p=i("D8HT")(u,m,!1,function(t){i("GsjB")},"data-v-271b3c12",null).exports,_=i("7B+g"),h=function(t){return Object(_.a)("/H_roleplay-si/comment/getAttachmentByListId",t)},C={name:"notifilist",components:{flowTaskTpl:l,commentNoticeTpl:f,praiseNoticeTpl:p},props:{list:"",listId:{type:String,default:""}},watch:{navId:{handler:function(t,e){t&&(this.listId=t)},deep:!0}},data:function(){return{params:{page:1,limit:10,filter:[]},notifications:[],isRolling:!1,navId:""}},methods:{hanleWindowNotification:function(t){var e=function(){var e=new Notification("Roletask【路塔】",{body:t,icon:"static/favicon.ico"});e.onclick=function(){console.log("点击"),window.self.focus(),e.close()}};if(window.Notification){var i=navigator.userAgent.toLowerCase();-1!=i.indexOf("safari")&&(i.indexOf("chrome")>-1?Notification.requestPermission().then(function(t){"granted"==t?e():(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}):Notification.requestPermission(function(t){"granted"==t||(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}))}else console.log("不支持Notification")},subscribeMessage:function(){var t=this,e=this.$deepstream,i=this.$currentUser.userId;e.event.subscribe("commentMessage/"+i,function(e){t.refreshNotifics(),t.hanleWindowNotification("您有"+e.dataCount+"未读消息"),t.formatNotifications()})},handleScroll:function(){var t=document.getElementById("msgList"),e=this,i=void 0;t.addEventListener("scroll",function(){i=t.scrollTop,t.scrollHeight===t.clientHeight+i&&(e.params.page++,e.isRolling=!0,e.refreshNotifics())})},refreshNotifics:function(){var t,e=this,i=[{property:"listid",value:this.listId,operator:"eq"}];this.params.filter=o()(i),(t=this.params,Object(_.a)("/H_roleplay-si/comment/getCommentMessage",t)).then(function(t){var i;e.isRolling?(i=e.notifications).unshift.apply(i,a()(t.tableContent)):e.notifications=t.tableContent;e.formatNotifications()})},formatNotifications:function(){this.notifications.map(function(t){"comment"===t.type||"praise"===t.type?(t.tempContent=JSON.parse(t.content).content,t.sourceContent=JSON.parse(t.content)):t.tempContent=JSON.parse(t.content)})}},mounted:function(){this.handleScroll(),this.refreshNotifics()}},y={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notificas-layout-content-notificwin-msg-list notificasscrollbar",attrs:{id:"msgList"}},t._l(t.notifications,function(e,n){return i("div",{key:n,staticClass:"notificas-layout-content-notificwin-msg-list-item"},[i("div",{staticClass:"notice-time"},[t._v(t._s(e.crtTime))]),t._v(" "),"comment"==e.type?i("comment-notice-tpl",{attrs:{data:e}}):t._e(),t._v(" "),"praise"==e.type?i("praise-notice-tpl",{attrs:{data:e}}):t._e(),t._v(" "),"flowTask"==e.type?i("flow-task-tpl",{attrs:{data:e}}):t._e()],1)}))},staticRenderFns:[]};var g=i("D8HT")(C,y,!1,function(t){i("ohfq")},"data-v-2e00d200",null).exports,N={name:"notifiLayoutSider",props:{handleAvtiveNav:Function},data:function(){return{navs:{},params:{page:1,limit:100,filter:""},searchkeywords:"",searchResult:[]}},methods:{hanleWindowNotification:function(t){var e=function(){var e=new Notification("Roletask【路塔】",{body:t,icon:"static/favicon.ico"});e.onclick=function(){console.log("点击"),window.self.focus(),e.close()}};if(window.Notification){var i=navigator.userAgent.toLowerCase();-1!=i.indexOf("safari")&&(i.indexOf("chrome")>-1?Notification.requestPermission().then(function(t){"granted"==t?e():(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}):Notification.requestPermission(function(t){"granted"==t||(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}))}else console.log("不支持Notification")},refreshNavListByMessage:function(){var t,e=this,i=localStorage.getItem("activeNavigatioIdOfNotice"),n=void 0;(t=this.params,Object(_.a)("/H_roleplay-si/comment/getNavListByMessage",t)).then(function(t){e.navs=t.tableContent,0!==t.dataCount&&(i?e.navs.map(function(t){t.listId===i&&(t.isActive=!0,n=t)}):(e.navs[0].isActive=!0,n=e.navs[0]),n||(e.navs[0].isActive=!0,n=e.navs[0]),e.handleAvtiveNav(n))})},handleActiveNavigation:function(t){var e;this.$forceUpdate(),this.handleAvtiveNav(t),localStorage.setItem("activeNavigatioIdOfNotice",t.listId),this.navs.map(function(t){t.isActive=!1}),t.isActive=!0,(e=t.listId,Object(_.a)("/H_roleplay-si/comment/readNotice",{listId:e},"POST")).then(function(e){t.unreadNum=0})},subscribeMessage:function(){var t=this,e=this.$deepstream,i=this.$currentUser.userId;console.log("订阅"),e.event.subscribe("commentMessage/"+i,function(e){t.refreshNavListByMessage(),e.dataCount>0&&t.hanleWindowNotification("您有"+e.dataCount+"未读消息")})},handleSearch:function(t){var e=this;this.searchResult=this.navs.filter(function(t){return t.listName.includes(e.searchkeywords)})}},mounted:function(){this.refreshNavListByMessage(),this.subscribeMessage()}},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{height:"100%"}},[i("div",{staticClass:"notificas-layout-sider-search"},[i("AutoComplete",{attrs:{clearable:"",placeholder:"搜索"},on:{"on-search":t.handleSearch},model:{value:t.searchkeywords,callback:function(e){t.searchkeywords=e},expression:"searchkeywords"}},t._l(t.searchResult,function(e,n){return i("div",{key:n,staticClass:"notificas-layout-sider-item",class:{activeNav:e.isActive},on:{click:function(i){t.handleActiveNavigation(e)}}},[i("img",{attrs:{width:"50",src:e.icon}}),t._v(" "),i("div",{staticClass:"notificas-layout-sider-item-describe"},[i("div",{staticClass:"notificas-layout-sider-item-describe-title"},[t._v(t._s(e.listName))]),t._v(" "),i("div",{staticClass:"notificas-layout-sider-item-describe-txt"},[i("p",{domProps:{innerHTML:t._s(e.comment)}})])]),t._v(" "),e.unreadNum>0?i("div",{staticClass:"notificas-layout-sider-item-msgcount"},[t._v(t._s(e.unreadNum))]):t._e()])}))],1),t._v(" "),i("div",{staticClass:"notificas-layout-sider-navs notificasscrollbar"},[0==t.navs.length?i("div",{staticClass:"notificas-layout-sider-item"},[i("img",{attrs:{width:"50",src:"static/favicon.ico"}}),t._v(" "),t._m(0)]):t._e(),t._v(" "),t._l(t.navs,function(e,n){return i("div",{key:n,staticClass:"notificas-layout-sider-item",class:{activeNav:e.isActive},on:{click:function(i){t.handleActiveNavigation(e)}}},[i("img",{attrs:{width:"50",src:e.icon}}),t._v(" "),i("div",{staticClass:"notificas-layout-sider-item-describe"},[i("div",{staticClass:"notificas-layout-sider-item-describe-title"},[t._v(t._s(e.listName))]),t._v(" "),i("div",{staticClass:"notificas-layout-sider-item-describe-txt"},[i("p",{domProps:{innerHTML:t._s(e.comment)}})])]),t._v(" "),e.unreadNum>0?i("div",{staticClass:"notificas-layout-sider-item-msgcount"},[t._v(t._s(e.unreadNum))]):t._e()])})],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"notificas-layout-sider-item-describe"},[e("div",{staticClass:"notificas-layout-sider-item-describe-title"},[this._v("\n                    Roletask团队\n                ")]),this._v(" "),e("div",{staticClass:"notificas-layout-sider-item-describe-txt"},[e("p",[this._v("暂无通知...")])])])}]};var w=i("D8HT")(N,b,!1,function(t){i("IM/p")},"data-v-1500a983",null).exports,k={name:"notifiHistory",props:{list:"",listId:{type:String,default:""},expendVisbible:{type:Boolean,default:!1}},data:function(){return{images:[],imgName:"",imgModalVisible:!1,files:[]}},watch:{listId:{handler:function(t,e){this.refreshImages(),this.refreshFiles()},deep:!0}},methods:{refreshAllWorkFlowTasks:function(){var t,e=[{property:"listid",value:this.listId,operator:"eq"}];this.notiParams.filter=o()(e),(t=this.notiParams,Object(_.a)("/H_roleplay-si/ds/getMyTasks",t)).then(function(t){})},refreshFiles:function(){var t=this,e={page:1,limit:10,listId:this.listId,type:"file"};h(e).then(function(e){t.files=e.tableContent})},refreshImages:function(){var t=this,e={page:1,limit:10,listId:this.listId,type:"image"};h(e).then(function(e){t.images=e.tableContent})},handleViewImg:function(t){this.imgName=t,this.imgModalVisible=!0}},mounted:function(){this.refreshFiles(),this.refreshImages()}},I={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Tabs",[i("TabPane",{attrs:{label:"文档"}},t._l(t.files,function(e,n){return i("div",{key:n},[i("a",[t._v(t._s(e.attachmentName))])])})),t._v(" "),i("TabPane",{attrs:{label:"图片"}},t._l(t.images,function(e,n){return i("div",{key:n,staticClass:"comimg"},[i("img",{attrs:{width:"80",src:e.attachment}}),t._v(" "),i("div",{staticClass:"comimg-cover"},[i("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(i){t.handleViewImg(e.attachment)}}})],1)])}))],1),t._v(" "),i("Modal",{attrs:{title:"查看图片",width:"50%"},model:{value:t.imgModalVisible,callback:function(e){t.imgModalVisible=e},expression:"imgModalVisible"}},[t.imgModalVisible?i("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])],1)},staticRenderFns:[]};var T=i("D8HT")(k,I,!1,function(t){i("Bc4i")},"data-v-9c4ca5fc",null).exports,x={name:"notificationsHeader",props:{nav:{type:Object,default:function(){return{}}},handleExpendHistory:{type:Function}},methods:{handleExpend:function(){this.expend=!this.expend,this.handleExpendHistory(this.expend)},handleViewDetail:function(){window.open("/Site/index.html#appSetting/"+this.nav.listId)}},data:function(){return{expend:!1}}},S={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notificas-layout-content-header"},[t.nav.listName?i("div",[i("a",{attrs:{title:"查看应用详情"},on:{click:t.handleViewDetail}},[i("b",[t._v(t._s(t.nav.listName))])]),t._v("\n        【"+t._s(t.nav.transName)+"】管理员:"+t._s(t.nav.administratorName)+"\n            \n        ")]):t._e(),t._v(" "),t.nav.listName?t._e():i("div",{staticStyle:{"text-align":"center"}},[t._v("\n        暂无通知\n    ")]),t._v(" "),i("p",{staticClass:"nav-comment",domProps:{innerHTML:t._s(t.nav.comment)}})])},staticRenderFns:[]};var H={name:"notifications",components:{notifilist:g,notifiLayoutSider:w,notifiHistory:T,notificationsHeader:i("D8HT")(x,S,!1,function(t){i("V2zK")},"data-v-06fc5195",null).exports},data:function(){return{avtiveNav:{},expendHistoryVisbible:!1}},methods:{handleAvtiveNav:function(t){this.$forceUpdate(),this.avtiveNav=t,this.$refs.notifilist&&(this.$refs.notifilist.navId=t.listId,this.$refs.notifilist.params.page=1,this.$refs.notifilist.isRolling=!1,this.$refs.notifilist.refreshNotifics())},handleExpendHistory:function(t){this.expendHistoryVisbible=t}},mounted:function(){}},M={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notificas"},[i("div",{staticClass:"notificas-content notificas-layout"},[i("div",{staticClass:"bg_ff notificas-layout-sider "},[i("notifi-layout-sider",{attrs:{handleAvtiveNav:t.handleAvtiveNav}})],1),t._v(" "),i("div",{staticClass:"notificas-list bg_ff notificas-layout-content"},[i("notifications-header",{attrs:{nav:t.avtiveNav,handleExpendHistory:t.handleExpendHistory}}),t._v(" "),i("Row",{staticClass:"notificas-layout-content-notificwin"},[i("Col",{staticClass:"notificas-layout-content-notificwin-msg",attrs:{span:t.expendHistoryVisbible?"16":"24"}},[t.avtiveNav.listId?i("notifilist",{ref:"notifilist",attrs:{listId:t.avtiveNav.listId}}):t._e(),t._v(" "),t.avtiveNav.listId?t._e():i("div",{staticStyle:{height:"100%",width:"100%",position:"relative"}},[i("Icon",{staticStyle:{"font-size":"50px",position:"absolute",left:"50%",top:"50%"},attrs:{type:"ios-notifications-outline",size:60}})],1)],1),t._v(" "),t.expendHistoryVisbible?i("Col",{staticClass:"notificas-layout-content-notificwin-orderlist",attrs:{span:"8"}},[t.avtiveNav.listId?i("notifi-history",{ref:"noticeHistory",attrs:{listId:t.avtiveNav.listId,expendVisbible:t.expendHistoryVisbible}}):t._e()],1):t._e()],1)],1)])])},staticRenderFns:[]};var A=i("D8HT")(H,M,!1,function(t){i("aUCC")},"data-v-42047092",null);e.default=A.exports},Bc4i:function(t,e){},DZgL:function(t,e){},GsjB:function(t,e){},"IM/p":function(t,e){},V2zK:function(t,e){},aUCC:function(t,e){},ohfq:function(t,e){}});