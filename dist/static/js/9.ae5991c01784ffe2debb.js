webpackJsonp([9,25],{"6GJN":function(t,e){},"7ofF":function(t,e){},Iogl:function(t,e){},LX0K:function(t,e){},SzbO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Sxqw"),s=a.n(n),i=a("3SZ7"),o=a.n(i),c={name:"flowTaskNotice",props:{data:{}},methods:{handleViewDetail:function(){this.data.tempContent.transCode&&window.open("/Form/index.html?data="+this.data.tempContent.transCode)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"msg-comment"},[a("div",{staticClass:"msg-comment-title"},[a("Icon",{attrs:{type:"ios-notifications-outline",size:18,color:"red"}}),t._v(" "),"taskCreate"==t.data.noticeSource?a("span",[t._v(" 工作流-新任务通知")]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?a("span",[t._v("工作流-转办任务通知")]):t._e(),t._v(" "),t.data.noticeSource.includes("taskComplete")?a("span",[t._v("工作流-任务已办通知")]):t._e(),t._v(" "),"taskRetract"==t.data.noticeSource||"taskStop"==t.data.noticeSource?a("span",[t._v("工作流-任务取消通知")]):t._e()],1),t._v(" "),a("div",{staticClass:"msg-comment-content"},[a("p",[t._v("实例编码:"),a("a",{on:{click:t.handleViewDetail}},[t._v(t._s(t.data.tempContent.transCode))])]),t._v(" "),a("p",[t._v("节点名称:"+t._s(t.data.tempContent.name))]),t._v(" "),a("p",[t._v("任务编码:"+t._s(t.data.relationKey))]),t._v(" "),"taskComplete"==t.data.noticeSource||"taskRetract"==t.data.noticeSource||"taskStop"==t.data.noticeSource?a("p",[t._v("操作名称:"+t._s(t.data.tempContent.operation))]):t._e(),t._v(" "),"taskTransfer"!=t.data.noticeSource?a("p",[t._v("执行者:"+t._s(t.data.tempContent.executor))]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?a("p",[t._v("转出者:"+t._s(t.data.tempContent.executor))]):t._e(),t._v(" "),"taskTransfer"==t.data.noticeSource?a("p",[t._v("执行者:"+t._s(t.data.tempContent.transfer))]):t._e(),t._v(" "),a("p",[t._v("任务创建时间:"+t._s(t.data.tempContent.taskCrtTime))]),t._v(" "),t.data.noticeSource.includes("taskComplete")||t.data.noticeSource.includes("taskRetract")||t.data.noticeSource.includes("taskStop")?a("p",[t._v("\n            任务截至时间:"+t._s(t.data.tempContent.cplTime)+"\n           \n        ")]):t._e(),t._v(" "),t.data.noticeSource.includes("taskComplete")||t.data.noticeSource.includes("taskRetract")||t.data.noticeSource.includes("taskStop")?a("p",[t._v("\n            任务历时: "),a("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{startTime:t.data.tempContent.taskCrtTime,endTime:t.data.tempContent.cplTime},expression:"{startTime:data.tempContent.taskCrtTime, endTime:data.tempContent.cplTime}"}]})]):t._e(),t._v(" "),a("p",[t._v("实例创建者:"+t._s(t.data.tempContent.starter))]),t._v(" "),a("p",[t._v("实例创建时间:"+t._s(t.data.tempContent.startTime))])])])},staticRenderFns:[]};var l=a("D8HT")(c,r,!1,function(t){a("6GJN")},"data-v-0df59a8c",null).exports,d={name:"commentNoticeTpl",props:{data:{}},data:function(){return{imgModalVisible:!1,imgName:""}},methods:{handleViewDetail:function(){var t=void 0;switch(this.data.sourceContent.type){case"list":t="/Site/index.html#appSetting/"+this.data.sourceContent.relationKey;break;case"instance":t="/Form/index.html?data="+this.data.sourceContent.relationKey}t&&window.open(t)},handleViewImg:function(t){this.imgName=t,this.imgModalVisible=!0},handleViewFile:function(t){window.open(t.attachment)}},mounted:function(){},beforeMount:function(){}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.creatorName===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.crtTime))]),t._v(" "),a("div",[t.data.sourceContent.objContent||t.data.sourceContent.objAttachment?[a("div",{staticClass:"message-container-content"},[a("div",{staticClass:"message-container-creator"},[a("span",{staticClass:"notice-creator"},[t._v(t._s(t.data.creatorName))]),t._v("\n                    回复了\n                    "),"instance"===t.data.sourceContent.type?a("span",[t._v("实例")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?a("span",[t._v("应用")]):t._e(),t._v("\n                    的评论:\n                ")]),t._v(" "),a("span",{staticClass:"notice-container",domProps:{innerHTML:t._s(t.data.tempContent)}}),t._v(" "),a("div",{staticClass:"notice-container-relpy"},[a("div",{staticClass:"notice-container-relpy-content"},[a("span",{staticClass:"notice-creator"},[t._v("@"+t._s(t.data.sourceContent.objCreator))]),t._v(":\n                        "),"instance"===t.data.sourceContent.type?a("a",{staticClass:"notice-relationKey",on:{click:t.handleViewDetail}},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v(":\n                        "),a("span",{staticClass:"notice-container",domProps:{innerHTML:t._s(t.data.sourceContent.objContent)}}),t._v(" "),t._l(t.data.sourceContent.objAttachment,function(e,n){return"image"===e.type?a("div",{key:n,staticClass:"comimg"},[a("img",{attrs:{src:e.attachment?e.attachment:"resources/images/icon/defaultUserPhoto.png"}}),t._v(" "),a("div",{staticClass:"comimg-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){t.handleViewImg(e.attachment)}}})],1)]):t._e()}),t._v(" "),a("div",t._l(t.data.sourceContent.objAttachment,function(e,n){return"file"===e.type?a("p",{key:n},[a("a",{on:{click:function(a){t.handleViewFile(e)}}},[t._v(t._s(e.name)+"\n                                ")])]):t._e()}))],2)])])]:[a("div",{staticClass:"message-container-content"},[a("div",{staticClass:"message-container-creator "},[a("span",{staticClass:"notice-creator"},[t._v(t._s(t.data.creatorName)+":")]),t._v(" "),"instance"===t.data.sourceContent.type?a("span",[t._v("对实例 ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?a("span",[t._v("对"),a("a",{on:{click:t.handleViewDetail}},[a("strong",[t._v("应用")])])]):t._e(),t._v(" "),"instance"===t.data.sourceContent.type?a("a",{staticClass:"notice-relationKey",on:{click:t.handleViewDetail}},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v("\n                发表了评论\n            ")]),t._v(" "),a("div",{domProps:{innerHTML:t._s(t.data.tempContent)}}),t._v(" "),a("div",{staticClass:"notice-comment-images"},t._l(t.data.sourceContent.attachment,function(e,n){return"image"===e.type?a("div",{key:n,staticClass:"comimg"},[a("img",{attrs:{src:e.attachment?e.attachment:"resources/images/icon/defaultUserPhoto.png"}}),t._v(" "),a("div",{staticClass:"comimg-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){t.handleViewImg(e.attachment)}}})],1)]):t._e()})),t._v(" "),a("div",{staticClass:"notice-comment-files"},t._l(t.data.sourceContent.attachment,function(e,n){return"file"===e.type?a("p",{key:n},[a("a",{on:{click:function(a){t.handleViewFile(e)}}},[t._v(t._s(e.name)+"\n                        ")])]):t._e()}))])]],2),t._v(" "),a("Modal",{attrs:{title:"查看图片",width:"60%"},model:{value:t.imgModalVisible,callback:function(e){t.imgModalVisible=e},expression:"imgModalVisible"}},[t.imgModalVisible?a("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])],1)},staticRenderFns:[]};var p=a("D8HT")(d,m,!1,function(t){a("lGxv")},"data-v-0aecb5ca",null).exports,v={name:"praiseNoticeTpl",props:{data:{}},data:function(){return{imgModalVisible:!1,imgName:""}},methods:{handleViewDetail:function(){var t=void 0;switch(this.data.sourceContent.type){case"list":t="/Site/index.html#appSetting/"+this.data.sourceContent.relationKey;break;case"instance":t="/Form/index.html?data="+this.data.sourceContent.relationKey}t&&window.open(t)},handleViewImg:function(t){this.imgName=t,this.imgModalVisible=!0},handleViewFile:function(t){window.open(t.attachment)}},mounted:function(){},beforeMount:function(){}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.creatorName===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.crtTime))]),t._v(" "),a("div",{staticClass:"message-container-content"},[a("span",{staticClass:"notice-creator"},[t._v("\n            "+t._s(t.data.creatorName)+"\n        ")]),t._v("\n        :\n        "),a("span",["instance"===t.data.sourceContent.type?a("span",[t._v("对实例 ")]):t._e(),t._v(" "),"list"===t.data.sourceContent.type?a("span",[t._v("对应用")]):t._e(),t._v(" "),"instance"===t.data.sourceContent.type?a("a",{staticClass:"notice-relationKey",on:{click:t.handleViewDetail}},[t._v(t._s(t.data.sourceContent.relationKey))]):t._e(),t._v("\n            的评论发表了态度\n            "),a("Icon",{attrs:{type:"md-thumbs-up",size:"18",color:"#FF5722"}}),t._v(" "),a("div",{staticClass:"notice-container-comment"},[a("div",{staticClass:"notice-container-comment-content"},[a("span",{staticClass:"notice-creator"},[t._v("@"+t._s(t.data.sourceContent.creator))]),t._v(":\n                "),a("span",{domProps:{innerHTML:t._s(t.data.tempContent)}}),t._v(" "),a("div",{staticClass:"notice-comment-images"},t._l(t.data.sourceContent.attachment,function(e,n){return"image"===e.type?a("div",{key:n,staticClass:"comimg"},[a("img",{attrs:{src:e.attachment?e.attachment:"resources/images/icon/defaultUserPhoto.png"}}),t._v(" "),a("div",{staticClass:"comimg-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){t.handleViewImg(e.attachment)}}})],1)]):t._e()})),t._v(" "),a("div",{staticClass:"notice-comment-files"},t._l(t.data.sourceContent.attachment,function(e,n){return"file"===e.type?a("p",{key:n},[a("a",{on:{click:function(a){t.handleViewFile(e)}}},[t._v(t._s(e.name)+"\n                        ")])]):t._e()}))])])],1)]),t._v(" "),a("Modal",{attrs:{title:"查看图片",width:"60%"},model:{value:t.imgModalVisible,callback:function(e){t.imgModalVisible=e},expression:"imgModalVisible"}},[t.imgModalVisible?a("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])],1)},staticRenderFns:[]};var u=a("D8HT")(v,_,!1,function(t){a("UR/K")},"data-v-0907e2e4",null).exports,h={name:"ProStatusTpl",props:{data:""},methods:{handleViewDetail:function(){var t="/Form/index.html?data="+this.data.tempContent.transCode;window.open(t)}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.creatorName===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.crtTime))]),t._v(" "),a("div",[a("span",{staticClass:"message-container-content"},["processStatusChange"==t.data.noticeSource?a("span",{staticClass:"message-container-creator notice-creator"},[t._v(t._s(t.data.creatorName))]):t._e(),t._v(" "),"processStatusOvertime"==t.data.noticeSource?a("span",{staticClass:"message-container-creator notice-creator"},[t._v("路塔")]):t._e(),t._v("\n            :\n            "),a("a",{on:{click:t.handleViewDetail}},[t._v(t._s(t.data.tempContent.transCode))]),t._v("实例\n            "),"processStatusOvertime"==t.data.noticeSource?a("span",[t._v("有"+t._s(t.data.tempContent.delayHour)+"小时未更新状态,当前状态")]):t._e(),t._v(" "),a("strong",[t._v(t._s(t.data.tempContent.processStatus))])])])])},staticRenderFns:[]};var C=a("D8HT")(h,f,!1,function(t){a("7ofF")},"data-v-1fa938ab",null).exports,g={name:"instanceCreateNotice",props:{data:""},methods:{handleViewDetail:function(){var t="/Form/index.html?data="+this.data.tempContent.transCode;window.open(t)}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.tempContent.creator===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.tempContent.crtTime))]),t._v(" "),a("div",[a("span",{staticClass:"message-container-content"},[a("span",{staticClass:"message-container-creator notice-creator"},[t._v("路塔")]),t._v(" "),a("span",[t._v(":您有新的经办实例")]),t._v(" "),a("a",{on:{click:t.handleViewDetail}},[t._v(t._s(t.data.tempContent.transCode))]),t._v(" "),a("span",[t._v("当前状态")]),t._v(" "),a("strong",[t._v(t._s(t.data.tempContent.status))])])])])},staticRenderFns:[]};var w=a("D8HT")(g,y,!1,function(t){a("YL9H")},"data-v-3994b42a",null).exports,k={name:"changeLogNotice",props:{data:""},methods:{handleViewDetail:function(){window.open("/Site/index.html#appSetting/"+this.data.listId)}}},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.tempContent.creator===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.tempContent.crtTime))]),t._v(" "),a("div",[a("span",{staticClass:"message-container-content"},[a("span",{staticClass:"message-container-creator notice-creator"},[t._v(t._s(t.data.tempContent.creator))]),t._v(" "),a("span",[t._v(":应用有更新,点击")]),t._v(" "),a("a",{on:{click:t.handleViewDetail}},[t._v("了解")]),t._v("更多\n        ")])])])},staticRenderFns:[]};var T=a("D8HT")(k,S,!1,function(t){a("i8n+")},"data-v-d77fd9b0",null).exports,b={name:"InstanceChangeNotice",props:{data:""},methods:{handleViewDetail:function(){var t="/Form/index.html?data="+this.data.tempContent.transCode;window.open(t)}}},I={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-container",class:{noticefromme:t.data.tempContent.creator===t.$currentUser.nickname}},[a("div",[t._v(t._s(t.data.tempContent.crtTime))]),t._v(" "),a("div",[a("span",{staticClass:"message-container-content"},[a("span",{staticClass:"message-container-creator notice-creator"},[t._v("路塔")]),t._v(" "),a("span",[t._v(":您有经办实例")]),t._v(" "),a("a",{on:{click:t.handleViewDetail}},[t._v(t._s(t.data.tempContent.transCode))]),t._v(" "),a("span",[t._v("状态从")]),t._v(" "),a("strong",[t._v(t._s(t.data.tempContent.oldStatus))]),t._v(" "),a("span",[t._v("变为")]),t._v(" "),a("strong",[t._v(t._s(t.data.tempContent.newStatus))])])])])},staticRenderFns:[]};var x=a("D8HT")(b,I,!1,function(t){a("Iogl")},"data-v-b0d216ae",null).exports,N=a("xeiT"),V=a("a8xa"),D=a("GIAq"),M={name:"Content",components:{flowTaskTpl:l,commentNoticeTpl:p,praiseNoticeTpl:u,ProStatusTpl:C,InstanceCreateNotice:w,ChangeLogNotice:T,InstanceChangeNotice:x,Messageistory:N.default},data:function(){return{params:{page:1,limit:10,filter:[],total:0},notifications:[],isRolling:!1,listId:"",appInfo:{},expendHistoryVisible:!1}},methods:{handleScroll:function(){var t=document.getElementById("msgList"),e=this,a=void 0;t.addEventListener("scroll",function(){a=t.scrollTop,Math.ceil(t.clientHeight+a)+2>=t.scrollHeight&&e.params.total>e.notifications.length&&(e.params.page++,e.isRolling=!0,e.refreshNotifics())})},refreshNotifics:function(){var t=this,e=[{property:"listid",value:this.listId,operator:"eq"}];this.params.filter=o()(e),Object(V.b)(this.params).then(function(e){var a;(t.params.total=e.dataCount,t.isRolling)?t.notifications=(a=t.notifications).concat.apply(a,s()(e.tableContent)):t.notifications=e.tableContent;t.formatNotifications()})},formatNotifications:function(){this.notifications.map(function(t){"comment"===t.type||"praise"===t.type?(t.tempContent=JSON.parse(t.content).content,t.sourceContent=JSON.parse(t.content)):t.tempContent=JSON.parse(t.content)})},refreshAppInfo:function(){var t=this;Object(D.G)(this.listId).then(function(e){t.appInfo=e[0]})},handleViewDetail:function(){window.open("/Site/index.html#appSetting/"+this.listId)},handleExpend:function(){"list"===this.$route.name?this.$router.push({name:"history"}):this.$router.push({name:"list"})}},watch:{$route:function(t,e){this.params.page=1,this.isRolling=!1,this.listId=this.$route.params.listId,this.handleScroll(),this.refreshAppInfo(),this.refreshNotifics(),localStorage.setItem("activeNavigatioIdOfNotice",this.listId)}},mounted:function(){this.listId=this.$route.params.listId,this.handleScroll(),this.refreshAppInfo(),this.refreshNotifics()}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"content-header"},[t.appInfo.title?a("div",{staticClass:"content-header-title"},[a("a",{on:{click:t.handleViewDetail}},[t._v(t._s(t.appInfo.title))]),t._v("\n            【"+t._s(t.appInfo.TRANS_NAME)+"】\n            "),t.appInfo.administrator?a("span",[t._v("管理员:"+t._s(t.appInfo.administrator))]):t._e(),t._v(" "),a("Icon",{staticClass:"fr",staticStyle:{"font-size":"40px",cursor:"pointer"},attrs:{type:"ios-more",size:"40"},on:{click:t.handleExpend}})],1):t._e(),t._v(" "),a("p",{staticClass:"content-header-comment",domProps:{innerHTML:t._s(t.appInfo.comment)}})]),t._v(" "),a("Row",{staticClass:"content-container"},[a("Col",{staticClass:"content-container-msglist messagescrollbar",attrs:{span:"list"!=t.$route.name?"16":"24",id:"msgList"}},t._l(t.notifications,function(e,n){return a("div",{key:n,staticClass:"content-container-msglist-item",class:{createbyme:e.creatorName===t.$currentUser.nickname}},["comment"==e.type?a("comment-notice-tpl",{class:{"notice-unread":!e.isRead},attrs:{data:e}}):t._e(),t._v(" "),"praise"==e.type?a("praise-notice-tpl",{class:{"notice-unread":!e.isRead},attrs:{data:e}}):t._e(),t._v(" "),"flowTask"==e.type?a("flow-task-tpl",{class:{"notice-unread":!e.isRead},attrs:{data:e}}):t._e(),t._v(" "),"processStatus"==e.type?a("pro-status-tpl",{attrs:{data:e}}):t._e(),t._v(" "),"instanceCreate"==e.type?a("instance-create-notice",{attrs:{data:e}}):t._e(),t._v(" "),"appChangeLog"==e.type?a("change-log-notice",{attrs:{data:e}}):t._e(),t._v(" "),"instanceStatusChange"==e.type?a("instance-change-notice",{attrs:{data:e}}):t._e()],1)})),t._v(" "),"list"!=t.$route.name?a("Col",{staticClass:"content-container-history",attrs:{span:"8"}},[a("router-view")],1):t._e()],1)],1)},staticRenderFns:[]};var $=a("D8HT")(M,R,!1,function(t){a("LX0K")},"data-v-ffc502b2",null);e.default=$.exports},"UR/K":function(t,e){},YL9H:function(t,e){},"i8n+":function(t,e){},lGxv:function(t,e){},xDRx:function(t,e){},xeiT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("3SZ7"),s=a.n(n),i=a("a8xa"),o={name:"MessageHistory",data:function(){return{files:[]}},methods:{refreshAllWorkFlowTasks:function(){var t=[{property:"listid",value:this.listId,operator:"eq"}];this.notiParams.filter=s()(t),Object(i.a)(this.notiParams).then(function(t){})}},mounted:function(){this.listId=this.$route.params.listId}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-history"},[e("Row",{staticClass:"message-history-header",attrs:{type:"flex",justify:"space-around"}},[e("Col",{attrs:{span:"6"}},[e("router-link",{attrs:{to:{name:"files"}}},[e("Button",{attrs:{size:"small",type:"files"==this.$route.name?"primary":"text"}},[this._v("文档")])],1)],1),this._v(" "),e("Col",{attrs:{span:"6"}},[e("router-link",{attrs:{to:{name:"images"}}},[e("Button",{attrs:{size:"small",type:"images"==this.$route.name?"primary":"text"}},[this._v("图片")])],1)],1)],1),this._v(" "),e("div",{staticClass:"message-history-content"},[e("router-view")],1)],1)},staticRenderFns:[]};var r=a("D8HT")(o,c,!1,function(t){a("xDRx")},"data-v-84acf8d6",null);e.default=r.exports}});