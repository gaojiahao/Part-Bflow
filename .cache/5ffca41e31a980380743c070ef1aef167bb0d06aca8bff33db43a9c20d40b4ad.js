{"source":"webpackJsonp([14],{NpID:function(t,e){},ZsAX:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(\"div\",{staticClass:\"card \"},[\"subject\"!==e.type?n(\"Poptip\",{staticClass:\"badge-custom\",attrs:{width:\"720\",placement:\"right-end\"},on:{\"on-popper-show\":e.popperShow}},[n(\"Badge\",{attrs:{count:e.taskCount}}),e._v(\" \"),n(\"div\",{attrs:{slot:\"title\"},slot:\"title\"},[n(\"label\",[e._v(e._s(e.appinfo.text+\" - 待办任务\"))]),e._v(\" \"),n(\"Button\",{staticStyle:{height:\"28px\"},attrs:{type:\"primary\",disabled:0===e.onPageSelection.length},on:{click:e.handleBatchApproval}},[e._v(\"\\n          批量审批\\n      \")])],1),e._v(\" \"),n(\"div\",{staticClass:\"api\",attrs:{slot:\"content\"},slot:\"content\"},[n(\"Table\",{ref:\"selection\",attrs:{loading:e.loading,columns:e.columns,data:e.columnData,size:\"small\"},on:{\"on-select-all\":e.onSelectAll,\"on-selection-change\":e.handerSelectionChange,\"on-select-cancel\":e.onSelectCancel}}),e._v(\" \"),n(\"div\",{staticStyle:{margin:\"10px\",overflow:\"hidden\"}},[n(\"div\",{staticStyle:{float:\"right\"}},[n(\"Page\",{attrs:{total:e.pageTotal,current:e.currentPage,size:\"small\",\"page-size\":e.pageSize,\"show-total\":\"\"},on:{\"on-change\":e.changeCurrentPage}})],1)])],1)],1):e._e(),e._v(\" \"),n(\"div\",{staticClass:\"badge-custom\",on:{click:function(t){e.redirectTo(e.appinfo)}}},[\"subject\"===e.type?n(\"Badge\",{attrs:{count:e.taskCount,type:\"primary\"}}):e._e()],1),e._v(\" \"),n(\"img\",{class:\"img-radius-\"+this.appinfo.type,attrs:{src:e.appinfo.icon,onerror:'this.src=\"resources/images/icon/img-loading-error.png\"'}}),e._v(\" \"),n(\"div\",{staticClass:\"content\"},[n(\"div\",{staticClass:\"content-title\"},[n(\"Tooltip\",{attrs:{content:e.appinfo.text,placement:\"top-start\"}},[n(\"h5\",{on:{click:function(t){e.redirectTo(e.appinfo)}}},[e._v(e._s(e.appinfo.text))])]),e._v(\" \"),\"system\"!==this.appinfo.type?n(\"a\",{staticClass:\"content-title-detail\",on:{click:function(t){t.stopPropagation(),e.goAppSetting(e.appinfo)}}},[e._v(\"详情\")]):e._e()],1),e._v(\" \"),n(\"div\",{staticClass:\"content-instance\"},[n(\"span\",{staticClass:\"content-instance-name\"},[e._v(e._s((e.appinfo.administrator,e.appinfo.transName)))]),e._v(\" \"),n(\"my-pop-tip\",{attrs:{userInfo:e.userInfo,trigger:\"click\"}},[n(\"div\",{staticClass:\"content-instance-admin\",attrs:{slot:\"userCard\"},on:{click:e.showUserInfo},slot:\"userCard\"},[e._v(e._s(e.appinfo.administrator))])]),e._v(\" \"),n(\"Tooltip\",{staticStyle:{\"margin-left\":\"7px\",float:\"right\"},attrs:{content:\"创建实例\",transfer:!0}},[\"obj\"!==this.appinfo.type&&\"business\"!==this.appinfo.type||!this.appinfo.action.add?e._e():n(\"i\",{staticClass:\"iconfont content-instance-add\",on:{click:e.handlerAddInstance}},[e._v(\"\\n          \\n        \")])])],1)])],1)},staticRenderFns:[]}},bwee:function(t,e){},lw1s:function(t,e){t.exports={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i(\"div\",{staticClass:\"wrap\"},[n.spinShow?i(\"Spin\",{attrs:{size:\"large\",fix:\"\"}}):n._e(),n._v(\" \"),n._l(n.menu,function(t,e){return i(\"section\",{key:e,staticClass:\"bg-white-lighter\"},[i(\"row\",{staticClass:\"menu-group\"},[0<t.children.length?i(\"row\",[i(\"h3\",{staticClass:\"menu-group-title\"},[n._v(n._s(t.text))])]):n._e(),n._v(\" \"),i(\"row\",{attrs:{gutter:16}},n._l(t.children,function(t,e){return t.leaf?i(\"Col\",{key:e,attrs:{span:\"4\"}},[i(\"menu-item\",{attrs:{appinfo:t,allTaskCount:n.allTaskCount}})],1):i(\"menu-list\",{attrs:{menuItem:t,index:e,allTaskCount:n.allTaskCount}})}),1)],1)],1)})],2)},staticRenderFns:[]}},tNBv:function(t,e){},vFuF:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=n(\"Gu7T\"),a=n.n(i),o=n(\"K4CD\"),s=n(\"GIAq\"),c={name:\"MenuItem\",props:[\"appinfo\",\"allTaskCount\"],components:{MyPopTip:n(\"3ovf\").a},data:function(){return{taskCount:0,type:this.appinfo.url.split(\"/\")[0],onPageSelection:[],batchComment:\"\",columns:[{type:\"selection\",width:60,align:\"center\",key:\"unableEdit\"},{title:\"交易号\",key:\"transCode\",sortable:!0,width:160,align:\"center\",render:function(t,e){return t(\"a\",{attrs:{href:\"/Form/index.html?data=\"+e.row.transCode,target:\"_blank\"}},e.row.transCode)}},{title:\"当前节点\",key:\"nodeName\"},{title:\"当前用户\",key:\"assigneeName\",width:90},{title:\"创建者\",key:\"creatorName\",sortable:!0},{title:\"任务创建时间\",key:\"crtTime\",width:160,align:\"center\",sortable:!0,render:function(t,e){return t(\"span\",function(t){var e=new Date(t),n=e.getFullYear(),i=e.getMonth()+1;i=i<10?\"0\"+i:i;var o=e.getDate();o=o<10?\"0\"+o:o;var a=e.getHours();a=a<10?\"0\"+a:a;var s=e.getMinutes(),c=e.getSeconds();return n+\"-\"+i+\"-\"+o+\" \"+a+\":\"+(s=s<10?\"0\"+s:s)+\":\"+(c=c<10?\"0\"+c:c)}(e.row.crtTime))}}],columnData:[],loading:!1,pageTotal:0,pageSize:10,currentPage:1,pageListId:\"\",userInfo:{}}},created:function(){~this.appinfo.icon.indexOf(\"/dist/\")&&(this.appinfo.icon=\"/dist/\"+this.appinfo.icon);var e=this.appinfo.url.split(\"/\")[1],t=this.allTaskCount.filter(function(t){return t.listId===e});0<t.length&&(this.taskCount=t[0].total)},watch:{allTaskCount:{handler:function(t,e){var n=this.appinfo.url.split(\"/\")[1],i=t.filter(function(t){return t.listId===n});0<i.length&&(this.taskCount=i[0].total)},deep:!0}},methods:{redirectTo:function(t){var e=t.url,n=window.top.document.getElementById(\"frame1\").getAttribute(\"nr\");\"_blank\"===t.target?window.open(e,\"_blank\"):(n||(e=~e.indexOf(\"outlink\")?e:~t.url.indexOf(\"app\")?\"appReport/\"+e:\"report/\"+e),window.top.postMessage({type:\"redirect\",url:e},\"*\"))},showUserInfo:function(){var e=this,t=this.appinfo.adminId;Object(s.Z)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},popperShow:function(t){var e=this;this.pageListId=this.appinfo.url.split(\"/\")[1];var n={type:\"myToDo\",page:this.currentPage,listId:this.pageListId,limit:this.pageSize};this.onPageSelection=[],this.loading=!0,Object(o.b)(n).then(function(t){e.pageTotal=t.total,0<t.tableContent.length&&(e.columnData=t.tableContent,e.columnData.forEach(function(t){t.unableEdit||(t._disabled=!0)}),e.loading=!1)})},changeCurrentPage:function(t){var n=this,e={type:\"myToDo\",page:t,listId:this.pageListId,limit:this.pageSize};this.loading=!0,Object(o.b)(e).then(function(t){0<t.tableContent.length&&(n.columnData=t.tableContent,n.columnData.forEach(function(e){0<n.onPageSelection.length&&n.onPageSelection.forEach(function(t){t.taskId===e.taskId&&(e._checked=!0)}),e.unableEdit||(e._disabled=!0)}),n.loading=!1)})},goAppSetting:function(t){var e=\"appSetting/\"+t.listId;window.top.postMessage({type:\"redirect\",url:e},\"*\")},handlerAddInstance:function(){var e=this,n=\"\";Object(o.e)(this.appinfo.listId).then(function(t){0<t.length?(n=t.filter(function(t){return\"submit\"===t.viewType})[0].uniqueId,window.open(\"/Form/index.html?model=new&view=\"+n+\"&list=\"+e.appinfo.listId)):e.$Message.info(\"表单模板为空\")})},handleBatchApproval:function(){var n=this;this.batchComment=\"\",this.$Modal.confirm({title:\"审批\",content:\"<p>审批意见</p>\",closable:!0,okText:\"同意\",cancelText:\"不同意\",transfer:!0,render:function(t){return t(\"div\",[t(\"label\",\"审批意见: \"),t(\"Input\",{props:{value:n.batchComment,autofocus:!0},style:{width:\"75%\",marginLeft:\"10px\"},on:{input:function(t){n.batchComment=t}}})])},onOk:function(){var t=n.onPageSelection,e=[];t.forEach(function(t){e.push({taskId:t.taskId,transCode:t.transCode,result:1,comment:n.batchComment})}),Object(o.a)(e).then(function(t){n.onPageSelection=[],t.success?n.$Notice.success({title:\"提示\",desc:t.message}):n.$Notice.error({title:\"提示\",desc:t.message})})},onCancel:function(){var t=n.onPageSelection,e=[];t.forEach(function(t){e.push({taskId:t.taskId,transCode:t.transCode,result:0,comment:n.batchComment})}),Object(o.a)(e).then(function(t){n.onPageSelection=[],t.success?n.$Notice.success({title:\"提示\",desc:t.message}):n.$Notice.error({title:\"提示\",desc:t.message})})}})},onSelectAll:function(t){var e,n={};(e=this.onPageSelection).push.apply(e,a()(t)),this.onPageSelection=this.onPageSelection.reduce(function(t,e){return!n[e.taskId]&&(n[e.taskId]=t.push(e)),t},[])},handerSelectionChange:function(t){if(0===t.length){var e=this.$refs.selection.data,n=this.onPageSelection;e.map(function(e){n=n.filter(function(t){return t.taskId!==e.taskId})}),this.onPageSelection=n}else{var i,o={};(i=this.onPageSelection).push.apply(i,a()(t)),this.onPageSelection=this.onPageSelection.reduce(function(t,e){return!o[e.taskId]&&(o[e.taskId]=t.push(e)),t},[])}},onSelectCancel:function(t,e){this.onPageSelection=this.onPageSelection.filter(function(t){return t.taskId!==e.taskId})}}},l=n(\"ZsAX\"),r=n.n(l);var u=function(t){n(\"tNBv\")},d=n(\"VU/8\")(c,r.a,!1,u,\"data-v-703bb3f2\",null).exports,p={name:\"MenuList\",props:[\"menuItem\",\"allTaskCount\"],components:{MenuItem:d},created:function(){}},h=n(\"xGIO\"),m=n.n(h);var f=function(t){n(\"bwee\")},g=n(\"VU/8\")(p,m.a,!1,f,\"data-v-87a4971c\",null).exports,v=n(\"oAV5\"),b={components:{MenuList:g,MenuItem:d},data:function(){return{spinShow:!0,menuList:[],menu:[],favoriteMenu:{leaf:!1,text:\"常用应用\",children:[]},allTaskCount:[],books$$:null,isAdmin:this.$currentUser.isAdmin,model:\"apps\"}},created:function(){var e=this,t=window.sessionStorage.getItem(\"roletask.com.r2.cache\");t?(t=t?JSON.parse(t):{},this.menuList=t[\"/ds/getMenu\"],this.menu=this.menuList.slice(0,7),this.spinShow=!1):Object(o.h)().then(function(t){e.menuList=t,7<e.menuList.length?e.menu=e.menuList.slice(0,7):e.menu=menuList,e.spinShow=!1})},mounted:function(){var e=this;this.subscribeMessage(),Object(o.c)().then(function(t){e.allTaskCount=t.tableContent});var n=null,i=0;window.onscroll=function(){var t=300-(Date.now()-i);clearTimeout(n),t<=0?(e.loadMenuByScroll(),i=Date.now()):n=setTimeout(e.loadMenuByScroll,t)}},methods:{loadMenuByScroll:function(){if(this.menu.length<this.menuList.length){var t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),e=0;e=document.body.clientHeight&&document.documentElement.clientHeight?Math.min(document.body.clientHeight,document.documentElement.clientHeight):Math.max(document.body.clientHeight,document.documentElement.clientHeight);var n=0;if(document.documentElement&&document.documentElement.scrollTop?n=document.documentElement.scrollTop:document.body&&(n=document.body.scrollTop),t-150<n+e){var i=this.menuList.slice(this.menu.length,this.menu.length+1)[0];this.menu.push(i)}}},goAppManage:function(){window.top.location.hash=\"#page/AppSetting\"},subscribeMessage:function(){var e=this,t=this.$deepstream;Object(v.c)();this.spinShow=!1,t.event&&t.event.subscribe(\"taskChange/\"+this.$currentUser.userId,function(t){e.allTaskCount=t.tableContent})},urlMd5:function(t){!function t(e){for(var n=e.length,i=void 0;n--;){if((i=e[n]).url&&\"_iframe\"==i.target){var o=i.url,a=\"outlink/\"+window.top.MD5(o);i.url=a}i.children&&t(i.children)}}(t)}}},C=n(\"lw1s\"),k=n.n(C);var w=function(t){n(\"NpID\")},_=n(\"VU/8\")(b,k.a,!1,w,\"data-v-57efd8cb\",null);e.default=_.exports},xGIO:function(t,e){t.exports={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i(\"row\",{staticClass:\"menu-field-set\",attrs:{gutter:16}},[0<n.menuItem.children.length?i(\"label\",[n._v(n._s(n.menuItem.text))]):n._e(),n._v(\" \"),n._l(n.menuItem.children,function(t,e){return i(\"Col\",{key:e,attrs:{span:\"4\"}},[i(\"menu-item\",{attrs:{appinfo:t,allTaskCount:n.allTaskCount}})],1)})],2)},staticRenderFns:[]}}});"}