webpackJsonp([4],{"+eFw":function(t,e){},"7dt5":function(t,e){},AogY:function(t,e){},IKHU:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-wrap"},[e.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):e._e(),e._v(" "),n("div",{staticClass:"home-wrap-container"},e._l(e.menuTree,function(t){return n("menu-section",{key:t.id,attrs:{section:t,allTaskCount:e.allTaskCount}})}),1),e._v(" "),n("task-modal",{attrs:{width:"800",title:"待办任务",footerHide:!0},model:{value:e.isTaskModal,callback:function(t){e.isTaskModal=t},expression:"isTaskModal"}},[n("div",{staticStyle:{"margin-top":"10px"}},[n("Button",{staticStyle:{height:"28px","margin-bottom":"5px"},attrs:{type:"primary",disabled:0===e.onPageSelection.length},on:{click:e.handleBatchApproval}},[e._v("\n                    批量审批\n                ")]),e._v(" "),n("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.columnData,size:"small"},on:{"on-select-all":e.onSelectAll,"on-selection-change":e.handerSelectionChange,"on-select-cancel":e.onSelectCancel}}),e._v(" "),n("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[n("div",{staticStyle:{float:"right"}},[n("Page",{attrs:{total:e.pageTotal,current:e.currentPage,size:"small","page-size":e.pageSize,"show-total":""},on:{"on-change":e.changeCurrentPage}})],1)])],1)])],1)},staticRenderFns:[]}},iIfN:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"menu-section"},[e.section.leaf?e._e():n("div",[n("div",{staticClass:"menu-section-title"},[e._v(e._s(e.section.text))]),e._v(" "),n("div",{staticClass:"menu-section-list"},e._l(e.section.children,function(t){return n("div",{key:t.id,class:[t.leaf?"menu-section-list-item":"menu-section"]},[t.leaf?n("menu-item",{attrs:{menu:t,allTaskCount:e.allTaskCount}}):e._e(),e._v(" "),t.leaf?e._e():n("menu-section",{attrs:{section:t,allTaskCount:e.allTaskCount}})],1)}),0)])])},staticRenderFns:[]}},o5V9:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu-section-list-item-container"},["subject"===e.menu.type?n("div",{staticClass:"badge-custom",on:{click:function(t){e.redirectTo(e.menu)}}},[n("Badge",{attrs:{count:e.taskCount,type:"primary"}})],1):e._e(),e._v(" "),"subject"!==e.menu.type?n("div",{staticClass:"badge-custom",on:{click:e.showTaskCount}},[n("Badge",{staticClass:"task-badge",attrs:{count:e.taskCount}})],1):e._e(),e._v(" "),n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.handlerGetIcon(e.menu.icon),expression:"handlerGetIcon(menu.icon)"}],staticClass:"menu-section-list-item-icon",class:{"obj-icon":"obj"==e.menu.type||"hr"==e.menu.type,"subject-icon":"subject"==e.menu.type},attrs:{onerror:'this.lazy="resources/images/icon/img-loading-error.png"'}}),e._v(" "),n("div",{staticClass:"menu-section-list-item-info"},[n("div",{staticClass:"menu-section-list-item-info-base"},[n("Tooltip",{attrs:{content:e.menu.text,placement:"top-start"}},[n("div",{staticClass:"menu-section-list-item-info-base-name",on:{click:function(t){e.redirectTo(e.menu)}}},[e._v(e._s(e.menu.text)+" \n                ")])]),e._v(" "),"system"!==e.menu.type?n("a",{staticClass:"menu-section-list-item-info-base-detail",on:{click:function(t){return t.stopPropagation(),e.handlerViewDetail(t)}}},[e._v("详情\n            ")]):e._e()],1),e._v(" "),n("div",{staticClass:"menu-section-list-item-info-other"},[n("div",{staticClass:"menu-section-list-item-info-other-transtype"},[e._v(e._s(e.menu.transName))]),e._v(" "),n("my-pop-tip",{attrs:{userInfo:e.userInfo,trigger:"click"}},[n("a",{staticClass:"menu-section-list-item-info-other-user",attrs:{slot:"userCard"},on:{click:e.handlerShowUserInfo},slot:"userCard"},[e._v(" \n                "+e._s(e.menu.administrator)+"\n                ")])]),e._v(" "),"obj"!==e.menu.type&&"business"!==e.menu.type||!e.menu.action.add?e._e():n("Icon",{staticClass:"menu-section-list-item-info-other-addbutton",attrs:{type:"ios-add-circle-outline"},on:{click:e.handlerToAddingPage}})],1)])])},staticRenderFns:[]}},zKIK:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,i=n("Gu7T"),o=n.n(i),s=n("K4CD"),c=n("bOdI"),l=n.n(c),r=n("3ovf"),u=n("GIAq"),d=new(n("7+uW").default),m={name:"MenuItem",components:{MyPopTip:r.a},data:function(){return{userInfo:{},taskCount:0}},props:{menu:{type:Object,default:function(){return{}}},allTaskCount:{type:Object,default:function(){return{}}}},watch:{allTaskCount:{handler:function(t,e){this.taskCount=t[this.menu.listId]},deep:!0}},methods:(a={showTaskCount:function(){this.isTaskModal=!0},handlerViewDetail:function(){this.menu.listId&&window.top.postMessage({type:"redirect",url:"appSetting/"+this.menu.listId},"*")},handlerToAddingPage:function(){var e=this,n="";Object(s.d)(this.menu.listId).then(function(t){0<t.length?(n=t.filter(function(t){return"submit"===t.viewType})[0].uniqueId,window.open("/Form/index.html?model=new&view="+n+"&list="+e.menu.listId)):e.$Message.info("抱歉,当前点击的应用,表单模板为空,请联系企业管理员!")})},handlerShowUserInfo:function(){var e=this;Object(u.Z)(this.menu.adminId).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},redirectTo:function(t){var e=t.url,n=window.top.document.getElementById("frame1").getAttribute("nr");"_blank"===t.target?window.open(e,"_blank"):(n||(e=~e.indexOf("outlink")?e:~t.url.indexOf("app")?"appReport/"+e:"report/"+e),window.top.postMessage({type:"redirect",url:e},"*"))}},l()(a,"showTaskCount",function(t){d.$emit("showTaskEvent",this.menu.url.split("/")[1])}),l()(a,"handlerGetIcon",function(t){return t&&0===t.indexOf("resource")?"https://lab.roletask.com/resource/app-icon/"+t.split("/").pop():t}),a),mounted:function(){this.taskCount=this.allTaskCount[this.menu.listId]?this.allTaskCount[this.menu.listId]:0}},h=n("o5V9"),f=n.n(h);var p=function(t){n("+eFw")},g={name:"MenuSection",components:{MenuSection:b,MenuItem:n("VU/8")(m,f.a,!1,p,"data-v-a3794e00",null).exports},props:{section:{type:Object,default:function(){return{}}},allTaskCount:{type:Object,default:function(){return{}}}}},v=n("iIfN"),k=n.n(v);var C=function(t){n("AogY")},b=n("VU/8")(g,k.a,!1,C,"data-v-46cbf6e8",null).exports,I={name:"Home",components:{MenuSection:b,TaskModal:n("lZCD").a},data:function(){return{menuTree:[],allTaskCount:{},spinShow:!0,isTaskModal:!1,pageListId:"",onPageSelection:[],batchComment:"",columnData:[],loading:!1,pageTotal:0,pageSize:10,currentPage:1,columns:[{type:"selection",width:60,align:"center",key:"unableEdit"},{title:"交易号",key:"transCode",sortable:!0,width:160,align:"center",render:function(t,e){return t("a",{attrs:{href:"/Form/index.html?data="+e.row.transCode,target:"_blank"}},e.row.transCode)}},{title:"当前节点",key:"nodeName"},{title:"当前用户",key:"assigneeName",width:90},{title:"创建者",key:"creatorName",sortable:!0},{title:"任务创建时间",key:"crtTime",width:160,align:"center",sortable:!0,render:function(t,e){return t("span",function(t){var e=new Date(t),n=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var i=e.getDate();i=i<10?"0"+i:i;var o=e.getHours();o=o<10?"0"+o:o;var s=e.getMinutes(),c=e.getSeconds();return n+"-"+a+"-"+i+" "+o+":"+(s=s<10?"0"+s:s)+":"+(c=c<10?"0"+c:c)}(e.row.crtTime))}}]}},methods:{handlerSubscribeMsg:function(){var e=this,t=this.$deepstream;t.event&&t.event.subscribe("taskChange/"+this.$currentUser.userId,function(t){t.tableContent.map(function(t){e.$set(e.allTaskCount,t.listId,t.total)})})},onSelectAll:function(t){var e,n={};(e=this.onPageSelection).push.apply(e,o()(t)),this.onPageSelection=this.onPageSelection.reduce(function(t,e){return!n[e.taskId]&&(n[e.taskId]=t.push(e)),t},[])},handerSelectionChange:function(t){if(0===t.length){var e=this.$refs.selection.data,n=this.onPageSelection;e.map(function(e){n=n.filter(function(t){return t.taskId!==e.taskId})}),this.onPageSelection=n}else{var a,i={};(a=this.onPageSelection).push.apply(a,o()(t)),this.onPageSelection=this.onPageSelection.reduce(function(t,e){return!i[e.taskId]&&(i[e.taskId]=t.push(e)),t},[])}},onSelectCancel:function(t,e){this.onPageSelection=this.onPageSelection.filter(function(t){return t.taskId!==e.taskId})},changeCurrentPage:function(t){var n=this,e={type:"myToDo",page:t,listId:this.menu.listId,limit:this.pageSize};this.loading=!0,Object(s.a)(e).then(function(t){0<t.tableContent.length&&(n.columnData=t.tableContent,n.columnData.forEach(function(e){0<n.onPageSelection.length&&n.onPageSelection.forEach(function(t){t.taskId===e.taskId&&(e._checked=!0)}),e.unableEdit||(e._disabled=!0)}),n.loading=!1)})},handleBatchApproval:function(){var n=this;this.batchComment="",this.$Modal.confirm({title:"审批",content:"<p>审批意见</p>",closable:!0,okText:"同意",cancelText:"不同意",transfer:!0,render:function(t){return t("div",[t("label","审批意见: "),t("Input",{props:{value:n.batchComment,autofocus:!0},style:{width:"75%",marginLeft:"10px"},on:{input:function(t){n.batchComment=t}}})])},onOk:function(){var t=n.onPageSelection,e=[];t.forEach(function(t){e.push({taskId:t.taskId,transCode:t.transCode,result:1,comment:n.batchComment})}),commitBatchTask(e).then(function(t){n.onPageSelection=[],t.success?n.$Notice.success({title:"提示",desc:t.message}):n.$Notice.error({title:"提示",desc:t.message})})},onCancel:function(){var t=n.onPageSelection,e=[];t.forEach(function(t){e.push({taskId:t.taskId,transCode:t.transCode,result:0,comment:n.batchComment})}),commitBatchTask(e).then(function(t){n.onPageSelection=[],t.success?n.$Notice.success({title:"提示",desc:t.message}):n.$Notice.error({title:"提示",desc:t.message})})}})}},created:function(){this.$nextTick(function(t){var e=this,n=window.sessionStorage.getItem("roletask.com.r2.cache");this.spinShow=!0,n?(n=n?JSON.parse(n):{},this.menuTree=n["/ds/getMenu"],this.spinShow=!1):Object(s.g)().then(function(t){e.spinShow=!1,e.menuTree=t||[]})})},mounted:function(){var n=this;this.handlerSubscribeMsg(),Object(s.b)().then(function(t){t.tableContent.map(function(t){n.$set(n.allTaskCount,t.listId,t.total)})}),d.$on("showTaskEvent",function(t){n.pageListId=t,n.isTaskModal=!0,n.onPageSelection=[],n.loading=!0;var e={type:"myToDo",page:n.currentPage,listId:t,limit:n.pageSize};Object(s.a)(e).then(function(t){n.pageTotal=t.total,0<t.tableContent.length&&(n.columnData=t.tableContent,n.columnData.forEach(function(t){t.unableEdit||(t._disabled=!0)}),n.loading=!1)})})}},T=n("IKHU"),S=n.n(T);var w=function(t){n("7dt5")},y=n("VU/8")(I,S.a,!1,w,"data-v-1425ee3e",null);e.default=y.exports}});