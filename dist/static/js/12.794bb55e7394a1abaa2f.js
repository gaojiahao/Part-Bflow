webpackJsonp([12,16],{"+7Jr":function(t,e){},"7rXj":function(t,e){},RhMu:function(t,e){},T9Ja:function(t,e){},hQQw:function(t,e){},ll1Z:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),o=a.n(i),n=a("woOf"),s=a.n(n),r=a("ifoU"),l=a.n(r),c=a("5LsM"),d=a("K4CD"),p=a("oAV5"),u={name:"TaskModal",data:function(){return{columns:[{title:"交易号",key:"transCode",sortable:"custom",width:160,render:function(t,e){return t("a",{attrs:{href:"/Form/index.html?data="+e.row.transCode,target:"_blank"}},e.row.transCode)}},{title:"当前节点",key:"nodeName"},{title:"当前用户",key:"assigneeName",width:90},{title:"创建者",key:"creatorName",width:90},{title:"创建时间",key:"crtTime",sortable:"custom",width:160,render:function(t,e){return t("span",function(t){var e=new Date(t),a=e.getFullYear(),i=e.getMonth()+1;i=i<10?"0"+i:i;var o=e.getDate();o=o<10?"0"+o:o;var n=e.getHours();n=n<10?"0"+n:n;var s=e.getMinutes(),r=e.getSeconds();return a+"-"+i+"-"+o+" "+n+":"+(s=s<10?"0"+s:s)+":"+(r=r<10?"0"+r:r)}(e.row.crtTime))}}],columnData:[],loading:!0,pageTotal:0,pageSize:6,currentPage:1,modelState:!1,filterData:{transCode:"",creatorName:"",crtTime:[],assigneeName:"",nodeName:""},sort:"",expand:!1,expandValue:"展开",expandIcon:"&#xe617;"}},props:{listId:{type:String},modal:{type:Boolean},taskValue:{type:String},type:{type:String},orderCode:{type:String},projectName:{type:String}},watch:{listId:{handler:function(t,e){this.getTaskList()}},modal:function(t,e){this.modelState=t}},methods:{changeCurrentPage:function(t){this.currentPage=t,this.getAppTaskCount(this.sort,t)},handleSort:function(t,e,a){var i={};i[t.key]=t.order,this.sort=i,this.getAppTaskCount(i,this.currentPage)},modalVisibleChange:function(t){t||(this.$emit("emitModal",{modal:!1,listId:""}),this.filterData.transCode="",this.filterData.creatorName="",this.filterData.crtTime="",this.filterData.assigneeName="",this.filterData.nodeName="",this.expand=!1,this.sort="",this.currentPage=1,this.expandValue="展开")},clearInputValue:function(){this.filterData.transCode="",this.filterData.creatorName="",this.filterData.crtTime="",this.filterData.assigneeName="",this.filterData.nodeName="",this.filterTaskBtn()},getTaskList:function(){var t=this,e={type:this.type,page:this.currentPage,listId:this.listId,limit:this.pageSize,filter:{}};this.orderCode&&(e.filter.orderCode=this.orderCode),this.projectName&&(e.filter.projectName=this.projectName),e.filter=o()(e.filter),this.loading=!0,Object(d.a)(e).then(function(e){t.pageTotal=e.total,t.columnData=e.tableContent,t.loading=!1})},filterTaskBtn:function(t){this.currentPage=1,this.getAppTaskCount("",1)},getAppTaskCount:function(t,e){var a=this,i="";this.filterData.crtTime.length>0&&this.filterData.crtTime[0]&&(i=Object(p.b)(this.filterData.crtTime[0],"yyyy-MM-dd")+"/"+Object(p.b)(this.filterData.crtTime[1],"yyyy-MM-dd")),this.orderCode&&(this.filterData.orderCode=this.orderCode),this.projectName&&(this.filterData.projectName=this.projectName),this.filterData.crtTime=i;var n={type:this.type,page:e,listId:this.listId,limit:this.pageSize,filter:o()(this.filterData)};t&&(n.sort=o()(t)),this.loading=!0,Object(d.a)(n).then(function(t){a.pageTotal=t.total,a.columnData=t.tableContent,a.loading=!1})},expandCrtTime:function(){this.expand?(this.expand=!1,this.expandValue="展开",this.expandIcon="&#xe617;"):(this.expand=!0,this.expandValue="收起",this.expandIcon="&#xe618;")}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Modal",{attrs:{title:"任务列表 - "+t.taskValue,width:"660",closable:""},on:{"on-visible-change":t.modalVisibleChange},model:{value:t.modelState,callback:function(e){t.modelState=e},expression:"modelState"}},[a("div",{staticStyle:{position:"relative"}},[a("div",{staticClass:"input-filter-box"},[a("label",{staticClass:"input-filter-lebal"},[t._v("交易号:")]),t._v(" "),a("Input",{staticStyle:{width:"127px","margin-left":"12px"},attrs:{placeholder:"请输入交易号"},model:{value:t.filterData.transCode,callback:function(e){t.$set(t.filterData,"transCode",e)},expression:"filterData.transCode"}})],1),t._v(" "),a("div",{staticClass:"input-filter-box"},[a("label",{staticClass:"input-filter-lebal"},[t._v("创建者:")]),t._v(" "),a("Input",{staticStyle:{width:"127px","margin-left":"12px"},attrs:{placeholder:"请输入创建者"},model:{value:t.filterData.creatorName,callback:function(e){t.$set(t.filterData,"creatorName",e)},expression:"filterData.creatorName"}})],1),t._v(" "),a("div",{staticClass:"input-filter-box"},[a("label",{staticClass:"input-filter-lebal"},[t._v("当前用户:")]),t._v(" "),a("Input",{staticStyle:{width:"127px","margin-left":"12px"},attrs:{placeholder:"请输入审批者"},model:{value:t.filterData.assigneeName,callback:function(e){t.$set(t.filterData,"assigneeName",e)},expression:"filterData.assigneeName"}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.expand,expression:"expand"}],staticClass:"input-crttime"},[a("div",{staticClass:"input-filter-box"},[a("label",{staticClass:"input-filter-lebal"},[t._v("当前节点:")]),t._v(" "),a("Input",{staticStyle:{width:"127px","margin-left":"12px"},attrs:{placeholder:"请输入当前节点"},model:{value:t.filterData.nodeName,callback:function(e){t.$set(t.filterData,"nodeName",e)},expression:"filterData.nodeName"}})],1),t._v(" "),a("div",{staticClass:"input-filter-box"},[a("label",{staticClass:"input-filter-lebal"},[t._v("创建时间:")]),t._v(" "),a("DatePicker",{staticStyle:{width:"170px"},attrs:{format:"yyyy/MM/dd",type:"daterange",placement:"bottom-end",placeholder:"请输入创建时间"},model:{value:t.filterData.crtTime,callback:function(e){t.$set(t.filterData,"crtTime",e)},expression:"filterData.crtTime"}})],1)]),t._v(" "),a("div",{staticClass:"action-btn"},[a("Button",{attrs:{type:"primary",size:"small"},on:{click:t.filterTaskBtn}},[t._v("查询")]),t._v(" "),a("Button",{attrs:{size:"small"},on:{click:t.clearInputValue}},[t._v("重置")]),t._v(" "),a("span",{staticClass:"expand",on:{click:t.expandCrtTime}},[t._v("\n        "+t._s(t.expandValue)+"\n        "),a("i",{staticClass:"iconfont",domProps:{innerHTML:t._s(t.expandIcon)}})])],1)]),t._v(" "),a("Table",{attrs:{loading:t.loading,data:t.columnData,columns:t.columns,size:"small",stripe:""},on:{"on-sort-change":t.handleSort}}),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.pageTotal,current:t.currentPage,"page-size":t.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":t.changeCurrentPage}})],1)]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)},staticRenderFns:[]};var f=a("VU/8")(u,h,!1,function(t){a("vP1K")},"data-v-11809a4c",null).exports,m=a("Gu7T"),g=a.n(m),v=a("XLwt"),y={props:["caseId"],data:function(){return{nodes:[],links:[],groupLength:0,dataItem:[],title:""}},methods:{drawECharts:function(){var t=v.init(document.getElementById("circularGraph"));for(var e in t.on("click",this.redirectTo),this.nodes)delete this.nodes[e].symbol;var a=this.dataItem.map(function(t,e){return{name:t.name}});this.nodes.forEach(function(t){t.category=t.index,t.draggable=!0,t.symbol="image:///resources/images/icon/"+t.icon+".png"});var i={tooltip:{},clickable:!0,legend:[{data:a.map(function(t){return t.name})}],animationDuration:3e3,animationDurationUpdate:3e3,animationEasingUpdate:"quinticInOut",series:[{name:this.title,type:"graph",width:"400px",height:"400px",top:"80px",layout:"circular",circular:{rotateLabel:!0},data:this.nodes,links:this.links,categories:a,draggable:!0,edgeSymbol:["none","arrow"],label:{normal:{position:["50%","50%"],formatter:"{b}"}},lineStyle:{normal:{color:"source",curveness:.1}},force:{repulsion:12}}]};t.setOption(i)},redirectTo:function(t){if(void 0!==t.seriesIndex&&"click"==t.type){if("list"!==t.data.type)return;if(t.data.url){var e="appReport/"+t.data.url;window.top.postMessage({type:"redirect",url:e},"*")}}}},created:function(){var t=this,e=this;Object(d.p)(this.caseId).then(function(a){var i=[];t.groupLength=a.dataItem.length,t.dataItem=a.dataItem,t.title=a.title,a&&a.dataItem.map(function(t,e){for(var a=0;a<t.child.length;a++)t.child[a].index=e,t.child[a].icon=e+"_"+a;i=[].concat(g()(i),g()(t.child))}),console.log(i),i.map(function(e){t.nodes.push({name:e.value,id:e.id,index:e.index,icon:e.icon,value:10,url:e.url,type:e.type,symbol:"rect",label:{show:!0},itemStyle:{borderColor:"#ddd",shadowBlur:10,shadowOffsetX:2,shadowOffsetY:2}}),e.endNode.map(function(a){t.links.push({source:e.id,target:a.id})})}),e.drawECharts()})},mounted:function(){}},b={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"graph-box"},[e("div",{staticClass:"graph",attrs:{id:"circularGraph"}})])}]};var k=a("VU/8")(y,b,!1,function(t){a("T9Ja")},"data-v-73dead91",null).exports,C=a("bTqw"),_={data:function(){return{subReportUrl:"",subReportId:"",subReportModelTitle:"",subReportModel:!1,spinShow:!0,baseLength:45,graphSpace:65,circleFillColor:"#646b86",circleBorderColor:"#e0a527",squareFillColor:"#00ae9d",squareBorderColor:"#77b745",isActive:!1,arr:[],title:"",dataItem:[],pointList:[],transTypePointList:[],waterFlow:{},flowType:!0,businessItemWidth:"50px",ds:c("wss://192.168.3.160:6021/deepstream"),books$$:null,radioGroupLabel:"mytask",rodioGroupDoOrNot:"todo",doneortodo:"todo",taskType:"mytask",defaultDisplayTask:{},teamDone:{},teamTodo:{},myDone:{},myToDo:{},subjectTodo:{},modal:!1,taskValue:"",pageListId:"",type:"myToDo",subjectList:C.b,visible:!1,ordersLoading:!1,searchValue:"",orderCode:"",columnData:[],columns:[{title:"交易号",key:"transCode",align:"center"},{title:"创建者",key:"creatorName",align:"center",width:80},{title:"创建时间",key:"crtTime",align:"center"},{title:"生效时间",key:"effectiveTime",align:"center"}],pageTotal:0,currentPage:1,ordersPageSize:6,projectPopTipVisible:!1,projectLoading:!1,projectSearchValue:"",projectName:"",projectColumnData:[],projectColumns:[{title:"项目名称",key:"projectName",align:"center"},{title:"创建者",key:"creatorName",align:"center",width:80},{title:"创建时间",key:"crtTime",align:"center"},{title:"生效时间",key:"effectiveTime",align:"center"}],projectPageTotal:0,projectCurrentPage:1,projectPageSize:6}},components:{TaskModal:f,CircularGraph:k},props:["caseId"],methods:{draw:function(){for(var t=this.baseLength,e=this.graphSpace,a=this.dataItem,i={},o=void 0,n=void 0,s=void 0,r=0;r<a.length;r++){var l=170+170*r;if(a[r].point="0,"+l+" 2100,"+l,a[r].child.length>0)for(var c=0;c<a[r].child.length;c++){this.dataItem[r].child[c].pointX=40+(t+e)*a[r].child[c].sort,this.dataItem[r].child[c].pointY=50+t/2+170*r,i[this.dataItem[r].child[c].id]=this.dataItem[r].child[c].pointX+","+this.dataItem[r].child[c].pointY;var d=a[r].child[c];d.teamDone>0&&(this.teamDone[d.listId]=d.teamDone>99?"99+":d.teamDone),d.teamTodo>0&&(this.teamTodo[d.listId]=d.teamTodo>99?"99+":d.teamTodo),d.myDone>0&&(this.myDone[d.listId]=d.myDone>99?"99+":d.myDone),d.myToDo>0&&(this.myToDo[d.listId]=d.myToDo>99?"99+":d.myToDo),d.subjectTodo>0&&(this.subjectTodo[d.id]=d.subjectTodo>99?"99+":d.subjectTodo)}}var p=this;a.forEach(function(a,r){a.child.forEach(function(r,l){r.relevantNode&&r.relevantNode.length>0&&r.relevantNode.forEach(function(l,c){l.id in i&&(o=i[l.id].split(","),n=Number(o[0]),s=Number(o[1]),l.groupIndex<a.index?p.transTypePointList.push({id:r.id+"_"+l.id,value:r.pointX+t/2+","+(r.pointY-t/2)+" "+(n+t/2)+","+(s+t/2+20)}):l.groupIndex>a.index?p.transTypePointList.push({id:r.id+"_"+l.id,value:r.pointX+t/2+","+(r.pointY+t/2+20)+" "+(n+t/2)+","+(s-t/2-4.3)}):r.pointX<n-40-t-e?p.transTypePointList.push({id:r.id+"_"+l.id,value:r.pointX+t/2+","+(r.pointY-t/2)+" "+(r.pointX+t/2)+","+(r.pointY-t/2-20)+" "+(n+t/2)+","+(s-t/2-20)+" "+(n+t/2)+","+(s-t/2-4.3)}):p.transTypePointList.push({id:r.id+"_"+l.id,value:r.pointX+t+","+r.pointY+" "+(n-4.3)+","+s}))}),r.endNode&&r.endNode.length>0&&r.endNode.forEach(function(l,c){if(l.id in i)if(o=i[l.id].split(","),n=Number(o[0]),s=Number(o[1]),l.groupIndex<a.index){var d=(n-r.pointX)/(t+e)*8.5;p.pointList.push({id:r.id+"_"+l.id,value:r.pointX+t/2+","+(r.pointY-t/2)+" "+(n+t/2-d)+","+(s+t/2+20)})}else if(l.groupIndex>a.index){var u=(n-r.pointX)/(t+e)*8.5;p.pointList.push({id:r.id+"_"+l.id,value:r.pointX+t/2+","+(r.pointY+t/2+20)+" "+(n+t/2-u)+","+(s-t/2-4.3)})}})})})},calcSvgWidth:function(t){var e=0;if(t.length>0){e=t[0].child.length;for(var a=1;a<t.length;a++)e<t[a].child.length&&(e=t[a].child.length)}var i=e*(30+this.baseLength+this.graphSpace)+50;return document.body.clientWidth>i?document.body.clientWidth:i},calcSvgHeight:function(t){var e=t.length>0?171*t.length+79:215;return document.body.clientHeight>e?document.body.clientHeight:e},doAction:function(t,e){if(this.waterFlow={},t.endNode&&t.endNode.length>0)for(var a=0;a<t.endNode.length;a++)this.waterFlow[t.id+"_"+t.endNode[a].id]=t.endNode[a];if(t.lastNode&&t.lastNode.length>0)for(var i=0;i<t.lastNode.length;i++)this.waterFlow[t.lastNode[i].id+"_"+t.id]=t.lastNode[i]},outBlur:function(t){this.waterFlow={}},redirectTo:function(t,e){var a=t.url,i=window.top.document.getElementById("frame1").getAttribute("nr");"_blank"===t.target?window.open(t.url,"_blank"):(i||(a=~a.indexOf("outlink")?t.url:~a.indexOf("app")?"appReport/"+a:"report/"+a),window.top.postMessage({type:"redirect",url:a},"*"))},subscribeMessage:function(){var t=Object(p.c)();this.ds.event.subscribe("taskChange/"+t,function(t){})},radioGroupChange:function(t){var e=this;this.taskType=t;var a=new l.a([["teamtask_done",function(){return"teamDone"}],["teamtask_todo",function(){return"teamTodo"}],["mytask_done",function(){return"myDone"}],["mytask_todo",function(){return"myToDo"}]]);if(this.type=a.get(this.taskType+"_"+this.doneortodo)(),this.orderCode||this.projectName){var i=this.type;Object(d.i)(i,this.projectName,this.orderCode).then(function(t){e.defaultDisplayTask={},e.defaultDisplayTask=t})}else{switch(this.type){case"teamDone":this.defaultDisplayTask=this.teamDone;break;case"teamTodo":this.defaultDisplayTask=this.teamTodo;break;case"myDone":this.defaultDisplayTask=this.myDone;break;case"myToDo":this.defaultDisplayTask=this.myToDo}this.defaultDisplayTask=s()(this.defaultDisplayTask,this.subjectTodo)}},radioGroupChangeDoneOrTodo:function(t){var e=this;this.doneortodo=t;var a=new l.a([["teamtask_done",function(){return"teamDone"}],["teamtask_todo",function(){return"teamTodo"}],["mytask_done",function(){return"myDone"}],["mytask_todo",function(){return"myToDo"}]]);if(this.type=a.get(this.taskType+"_"+this.doneortodo)(),this.orderCode||this.projectName){var i=this.type;Object(d.i)(i,this.projectName,this.orderCode).then(function(t){e.defaultDisplayTask={},e.defaultDisplayTask=t})}else{switch(this.type){case"teamDone":this.defaultDisplayTask=this.teamDone;break;case"teamTodo":this.defaultDisplayTask=this.teamTodo;break;case"myDone":this.defaultDisplayTask=this.myDone;break;case"myToDo":this.defaultDisplayTask=this.myToDo}this.defaultDisplayTask=s()(this.defaultDisplayTask,this.subjectTodo)}},opentask:function(t){"subject"===t.type?(this.subReportId=t.url.split("/")[1],this.subReportUrl="/Site/index.html?window=dialog#subject/"+this.subReportId,this.subReportModelTitle=t.value,this.subReportModel=!0):(this.modal=!0,this.pageListId=event.target.getAttribute("listId"),this.taskValue=event.target.getAttribute("taskValue"))},emitModal:function(t,e){this.pageListId=t.listId,this.modal=!1},changeCurrentPage:function(t){var e=this,a={type:this.type,page:t,listId:this.pageListId,limit:this.pageSize};this.loading=!0,Object(d.a)(a).then(function(t){t.tableContent.length>0&&(e.columnData=t.tableContent,e.loading=!1)})},onHandleClearOrderTag:function(){var t=this;this.orderCode="",this.projectName?Object(d.i)(this.type,this.projectName).then(function(e){t.defaultDisplayTask={},t.defaultDisplayTask=e}):this.defaultDisplayTask=s()(this[this.type],this.subjectTodo)},onHandleFilterByCode:function(){var t=this,e=[];this.searchValue&&(e=o()([{operator:"like",value:this.searchValue,property:"transCode"}])),this.currentPage=1,this.ordersLoading=!0,Object(d.j)(this.currentPage,e).then(function(e){t.pageTotal=e.dataCount,t.columnData=e.tableContent,t.ordersLoading=!1})},getSaleOrderList:function(){var t=this;this.searchValue="",this.currentPage=1,this.ordersLoading=!0,Object(d.j)(this.currentPage).then(function(e){t.pageTotal=e.dataCount,t.columnData=e.tableContent,t.ordersLoading=!1})},orderPageChange:function(t){var e=this,a=[];this.searchValue&&(a=o()([{operator:"like",value:this.searchValue,property:"transCode"}])),this.currentPage=t,this.ordersLoading=!0,Object(d.j)(this.currentPage,a).then(function(t){e.pageTotal=t.dataCount,e.columnData=t.tableContent,e.ordersLoading=!1})},handleDblclick:function(t,e){var a=this,i=this.type;this.orderCode=t.transCode,Object(d.i)(i,this.projectName,this.orderCode).then(function(t){a.defaultDisplayTask={},a.visible=!1,a.defaultDisplayTask=t})},onHandleClearProjectTag:function(){var t=this;this.projectName="",this.orderCode?Object(d.i)(this.type,"",this.orderCode).then(function(e){t.defaultDisplayTask={},t.defaultDisplayTask=e}):this.defaultDisplayTask=s()(this[this.type],this.subjectTodo)},onHandleFilterByProjectName:function(){var t=this,e=[];this.projectSearchValue&&(e=o()([{operator:"like",value:this.projectSearchValue,property:"projectName"}])),this.projectCurrentPage=1,this.projectLoading=!0,Object(d.m)(this.currentPage,e).then(function(e){t.projectPageTotal=e.dataCount,t.projectColumnData=e.tableContent,t.projectLoading=!1})},getProjectList:function(){var t=this;this.projectSearchValue="",this.projectCurrentPage=1,this.projectLoading=!0,Object(d.m)(this.projectCurrentPage).then(function(e){t.projectPageTotal=e.dataCount,t.projectColumnData=e.tableContent,t.projectLoading=!1})},projectPageChange:function(t){var e=this,a=[];this.projectSearchValue&&(a=o()([{operator:"like",value:this.projectSearchValue,property:"projectName"}])),this.projectCurrentPage=t,this.projectLoading=!0,Object(d.m)(this.projectCurrentPage,a).then(function(t){e.projectPageTotal=t.dataCount,e.projectColumnData=t.tableContent,e.projectLoading=!1})},handleDbSelectProject:function(t,e){var a=this,i=this.type;this.projectName=t.projectName,Object(d.i)(i,this.projectName,this.orderCode).then(function(t){a.defaultDisplayTask={},a.projectPopTipVisible=!1,a.defaultDisplayTask=t})},refreshData:function(){var t=this,e=this;Object(d.p)(this.caseId).then(function(a){a.dataItem.map(function(e){e.child&&e.child.map(function(e){var a,i;"subject"===e.type&&e.value&&(e.icon="resources/images/icon/"+(a=e.value,i="",t.subjectList.map(function(t){t.name===a&&(i=t.icon)}),i))})}),e.title=a.title,e.dataItem=a.dataItem;var i=e.calcSvgWidth(a.dataItem)>1400?e.calcSvgWidth(a.dataItem):1400,o=e.calcSvgHeight(a.dataItem);window.document.getElementById("flow-box")&&(window.document.getElementById("flow-box").style.width=i+"px",window.document.getElementById("flow-box").style.height=o+"px",e.draw(),t.defaultDisplayTask=s()(t.myToDo,t.subjectTodo),e.spinShow=!1)}).catch(function(e){var a="<p>"+e+"</p>";t.$Modal.error({title:"提示",content:a,closable:!0})})}},created:function(){var t=this.$currentUser,e=[t.nickname,t.userId].join("|"),a=Object(p.c)();this.ds.login({token:a,username:e},function(t){console.log("connect success!")}),this.subscribeMessage()},mounted:function(){this.refreshData()}},T={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flow_container right_container"},[t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),a("div",{attrs:{id:"flow-box"}},[a("RadioGroup",{staticClass:"taskbtn",attrs:{size:"large"},on:{"on-change":t.radioGroupChange},model:{value:t.radioGroupLabel,callback:function(e){t.radioGroupLabel=e},expression:"radioGroupLabel"}},[a("Radio",{attrs:{label:"mytask"}},[a("span",[t._v("我的任务")])]),t._v(" "),a("Radio",{attrs:{label:"teamtask"}},[a("span",[t._v("团队任务")])]),t._v(" "),a("i",{staticClass:"vertical-divide"})],1),t._v(" "),a("RadioGroup",{staticClass:"taskbtn_1",attrs:{size:"large"},on:{"on-change":t.radioGroupChangeDoneOrTodo},model:{value:t.rodioGroupDoOrNot,callback:function(e){t.rodioGroupDoOrNot=e},expression:"rodioGroupDoOrNot"}},[a("Radio",{attrs:{label:"todo"}},[a("span",[t._v("未完成")])]),t._v(" "),a("Radio",{attrs:{label:"done"}},[a("span",[t._v("已完成")])]),t._v(" "),a("i",{staticClass:"vertical-divide"}),t._v(" "),a("Icon",{staticStyle:{cursor:"pointer"},attrs:{type:"md-refresh",size:"20"},on:{click:function(e){t.refreshData()}}})],1),t._v(" "),a("div",{staticClass:"app-dropdown-select"},[a("Poptip",{attrs:{title:"项目立项",width:"660",content:"content"},model:{value:t.projectPopTipVisible,callback:function(e){t.projectPopTipVisible=e},expression:"projectPopTipVisible"}},[a("span",{staticClass:"app-dropdown-select-item",on:{click:t.getProjectList}},[a("Tag",{attrs:{closable:"",color:"primary"},on:{"on-close":t.onHandleClearProjectTag}},[t._v(t._s(t.projectName?t.projectName:"项目立项"))]),t._v(" "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),t._v(" "),a("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"app-search"},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入项目名称",icon:"ios-close-circle"},on:{"on-enter":t.onHandleFilterByProjectName,"on-click":t.getProjectList},model:{value:t.projectSearchValue,callback:function(e){t.projectSearchValue=e},expression:"projectSearchValue"}}),t._v(" "),a("Button",{attrs:{type:"primary",size:"small"},on:{click:t.onHandleFilterByProjectName}},[t._v("查询")])],1),t._v(" "),a("Table",{attrs:{columns:t.projectColumns,data:t.projectColumnData,loading:t.projectLoading,size:"small"},on:{"on-row-dblclick":t.handleDbSelectProject}}),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.projectPageTotal,current:t.projectCurrentPage,size:"small","page-size":t.projectPageSize,"show-total":"","show-elevator":""},on:{"on-change":t.projectPageChange}})],1)])],1)]),t._v(" "),a("Poptip",{attrs:{title:"销售订单",content:"content",width:"560"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("span",{staticClass:"app-dropdown-select-item",staticStyle:{"margin-left":"10px"},on:{click:t.getSaleOrderList}},[a("Tag",{attrs:{closable:"",color:"primary"},on:{"on-close":t.onHandleClearOrderTag}},[t._v(t._s(t.orderCode?t.orderCode:"销售订单"))]),t._v(" "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),t._v(" "),a("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"app-search"},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入交易号",icon:"ios-close-circle"},on:{"on-enter":t.onHandleFilterByCode,"on-click":t.getSaleOrderList},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),t._v(" "),a("Button",{attrs:{type:"primary",size:"small"},on:{click:t.onHandleFilterByCode}},[t._v("查询")])],1),t._v(" "),a("Table",{attrs:{columns:t.columns,data:t.columnData,loading:t.ordersLoading,size:"small"},on:{"on-row-dblclick":t.handleDblclick}}),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.pageTotal,current:t.currentPage,size:"small","page-size":t.ordersPageSize,"show-total":"","show-elevator":""},on:{"on-change":t.orderPageChange}})],1)])],1)])],1),t._v(" "),a("div",{staticClass:"divide"}),t._v(" "),a("div",{staticClass:"business_item",staticStyle:{width:"50px"}},t._l(t.dataItem,function(t,e){return a("div",{key:e,staticClass:"left-name"},[a("span")])})),t._v(" "),a("div",{staticClass:"svg_box",on:{click:t.outBlur}},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[a("defs",[a("filter",{attrs:{id:"f1",x:"0",y:"0",width:"200%",height:"200%"}},[a("feOffset",{attrs:{result:"offOut",in:"SourceGraphic",dx:"0",dy:"0"}}),t._v(" "),a("feColorMatrix",{attrs:{result:"matrixOut",in:"offOut",type:"matrix",values:"0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"}}),t._v(" "),a("feGaussianBlur",{attrs:{result:"blurOut",in:"matrixOut",stdDeviation:"5"}}),t._v(" "),a("feBlend",{attrs:{in:"SourceGraphic",in2:"blurOut",mode:"normal"}})],1)]),t._v(" "),a("defs",[a("marker",{attrs:{id:"arrow",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[a("path",{staticStyle:{fill:"gray"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),a("defs",[a("marker",{attrs:{id:"arrow1",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[a("path",{staticStyle:{fill:"#fff",opacity:"0"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),a("defs",[a("marker",{attrs:{id:"arrow_hight_color",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[a("path",{staticStyle:{fill:"red"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),a("defs",[a("linearGradient",{attrs:{id:"orange_red",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[a("stop",{staticStyle:{"stop-color":"#ffdfd9","stop-opacity":"1"},attrs:{offset:"0%"}}),t._v(" "),a("stop",{staticStyle:{"stop-color":"#ff8069 stop-opacity:1"},attrs:{offset:"100%"}})],1)],1),t._v(" "),t._l(t.dataItem,function(e,i){return a("g",{key:i},t._l(e.child,function(e,o){return a("g",{key:o},[a("image",{staticClass:"svg-image-style",attrs:{x:40+(t.baseLength+t.graphSpace)*e.sort,y:50+170*i,width:t.baseLength,height:t.baseLength,"xlink:href":e.icon,rx:"10"},on:{mouseenter:function(a){t.doAction(e)}}}),t._v(" "),a("a",{staticClass:"svg-title-style",on:{click:function(a){t.redirectTo(e)}}},[a("text",{attrs:{x:40+t.baseLength/2+(t.baseLength+t.graphSpace)*e.sort,y:65+t.baseLength+170*i}},[t._v("\n                "+t._s(e.value)+"\n              ")])]),t._v(" "),(e.listId?e.listId:e.id)in t.defaultDisplayTask?a("circle",{attrs:{cx:40+(t.baseLength+t.graphSpace)*e.sort,cy:50+170*i,r:"12","stroke-width":"1",fill:"list"===e.type?"red":"#2d8cf0"}}):t._e(),t._v(" "),a("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"12px"},attrs:{x:40+(t.baseLength+t.graphSpace)*e.sort,y:45+170*i,fill:"#fff",listId:"subject"===e.type?e.id:e.listId,taskValue:e.value},on:{click:function(a){t.opentask(e)}}},[t._v("\n              "+t._s("subject"===e.type?t.defaultDisplayTask[e.id]:t.defaultDisplayTask[e.listId])+"\n            ")])])}))}),t._v(" "),t._l(t.pointList,function(e){return a("g",{key:e.id},[a("polyline",{class:void 0!==t.waterFlow[e.id]?"path":"",staticStyle:{fill:"none",stroke:"transparent","stroke-width":"1"},attrs:{points:e.value,"marker-end":void 0!==t.waterFlow[e.id]?"url(#arrow_hight_color)":"url(#arrow1)"}})])}),t._v(" "),t._l(t.transTypePointList,function(t){return a("g",{key:t.id},[a("polyline",{staticClass:"transTypeRel_style",attrs:{points:t.value,"marker-end":"url(#arrow)"}})])})],2)])],1),t._v(" "),a("Modal",{attrs:{scrollable:"",width:"80%","class-name":"subReportModel-modal",styles:{top:"20px",pandding:"0px"},title:t.subReportModelTitle},on:{"on-ok":t.refreshData},model:{value:t.subReportModel,callback:function(e){t.subReportModel=e},expression:"subReportModel"}},[a("iframe",{staticStyle:{height:"450px",border:"none"},attrs:{width:"100%",src:t.subReportUrl}})]),t._v(" "),a("task-modal",{attrs:{modal:t.modal,listId:t.pageListId,taskValue:t.taskValue,type:t.type,orderCode:t.orderCode,projectName:t.projectName},on:{emitModal:t.emitModal}})],1)},staticRenderFns:[]};var w=a("VU/8")(_,T,!1,function(t){a("RhMu")},null,null);e.default=w.exports},vFuF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Gu7T"),o=a.n(i),n=a("K4CD"),s=a("GIAq"),r={props:["appinfo","allTaskCount"],components:{MyPopTip:a("3ovf").a},data:function(){return{taskCount:0,type:this.appinfo.url.split("/")[0],columns:[{title:"交易号",key:"transCode",sortable:!0,width:160,align:"center",render:function(t,e){return t("a",{attrs:{href:"/Form/index.html?data="+e.row.transCode,target:"_blank"}},e.row.transCode)}},{title:"当前节点",key:"nodeName"},{title:"当前用户",key:"assigneeName",width:90},{title:"创建者",key:"creatorName",sortable:!0},{title:"任务创建时间",key:"crtTime",width:160,align:"center",sortable:!0,render:function(t,e){return t("span",function(t){var e=new Date(t),a=e.getFullYear(),i=e.getMonth()+1;i=i<10?"0"+i:i;var o=e.getDate();o=o<10?"0"+o:o;var n=e.getHours();n=n<10?"0"+n:n;var s=e.getMinutes(),r=e.getSeconds();return a+"-"+i+"-"+o+" "+n+":"+(s=s<10?"0"+s:s)+":"+(r=r<10?"0"+r:r)}(e.row.crtTime))}}],columnData:[],loading:!0,pageTotal:0,pageSize:10,currentPage:1,pageListId:"",userInfo:{}}},created:function(){~this.appinfo.icon.indexOf("/dist/")&&(this.appinfo.icon="/dist/"+this.appinfo.icon);var t=this.appinfo.url.split("/")[1],e=this.allTaskCount.filter(function(e){return e.listId===t});e.length>0&&(this.taskCount=e[0].total)},watch:{allTaskCount:{handler:function(t,e){var a=this.appinfo.url.split("/")[1],i=t.filter(function(t){return t.listId===a});i.length>0&&(this.taskCount=i[0].total)},deep:!0}},methods:{redirectTo:function(t){var e=t.url,a=window.top.document.getElementById("frame1").getAttribute("nr");"_blank"===t.target?window.open(e,"_blank"):(a||(e=~e.indexOf("outlink")?e:~t.url.indexOf("app")?"appReport/"+e:"report/"+e),window.top.postMessage({type:"redirect",url:e},"*"))},showUserInfo:function(){var t=this,e=this.appinfo.adminId;Object(s.N)(e).then(function(e){e.dataCount&&(t.userInfo=e.tableContent[0])})},popperShow:function(t){var e=this;this.pageListId=this.appinfo.url.split("/")[1];var a={type:"myToDo",page:this.currentPage,listId:this.pageListId,limit:this.pageSize};Object(n.a)(a).then(function(t){e.pageTotal=t.total,t.tableContent.length>0&&(e.columnData=t.tableContent,e.loading=!1)})},changeCurrentPage:function(t){var e=this,a={type:"myToDo",page:t,listId:this.pageListId,limit:this.pageSize};this.loading=!0,Object(n.a)(a).then(function(t){t.tableContent.length>0&&(e.columnData=t.tableContent,e.loading=!1)})},goAppSetting:function(t){var e="appSetting/"+t.listId;window.top.postMessage({type:"redirect",url:e},"*")},handlerAddInstance:function(){var t=this,e="";Object(n.d)(this.appinfo.listId).then(function(a){a.length>0?(e=a.filter(function(t){return"submit"===t.viewType})[0].uniqueId,window.open("/Form/index.html?model=new&view="+e+"&list="+t.appinfo.listId)):t.$Message.info("表单模板为空")})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card "},["subject"!==t.type?a("Poptip",{staticClass:"badge-custom",attrs:{width:"660",placement:"right-end",transfer:!0},on:{"on-popper-show":t.popperShow}},[a("Badge",{attrs:{count:t.taskCount}}),t._v(" "),a("div",{attrs:{slot:"title"},slot:"title"},[a("h3",[t._v(t._s(t.appinfo.text+" - 待办任务"))])]),t._v(" "),a("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[a("Table",{attrs:{columns:t.columns,data:t.columnData,size:"small"}}),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.pageTotal,current:t.currentPage,size:"small","page-size":t.pageSize,"show-total":""},on:{"on-change":t.changeCurrentPage}})],1)])],1)],1):t._e(),t._v(" "),a("div",{staticClass:"badge-custom",on:{click:function(e){t.redirectTo(t.appinfo)}}},["subject"===t.type?a("Badge",{attrs:{count:t.taskCount,type:"primary"}}):t._e()],1),t._v(" "),a("img",{class:"img-radius-"+this.appinfo.type,attrs:{src:t.appinfo.icon}}),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content-title"},[a("h5",{on:{click:function(e){t.redirectTo(t.appinfo)}}},[t._v(t._s(t.appinfo.text))]),t._v(" "),a("a",{staticClass:"content-title-detail",on:{click:function(e){e.stopPropagation(),t.goAppSetting(t.appinfo)}}},[t._v("详情")])]),t._v(" "),a("div",{staticClass:"content-instance"},[a("span",{staticClass:"content-instance-name"},[t._v(t._s((t.appinfo.administrator,t.appinfo.transName)))]),t._v(" "),a("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[a("div",{staticClass:"content-instance-admin",attrs:{slot:"userCard"},on:{click:t.showUserInfo},slot:"userCard"},[t._v(t._s(t.appinfo.administrator))])]),t._v(" "),a("Tooltip",{staticStyle:{"margin-left":"7px",float:"right"},attrs:{content:"创建实例",transfer:!0}},["obj"!==this.appinfo.type&&"business"!==this.appinfo.type||!this.appinfo.action.add?t._e():a("i",{staticClass:"iconfont content-instance-add",on:{click:t.handlerAddInstance}},[t._v("\n          \n        ")])])],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(r,l,!1,function(t){a("7rXj")},"data-v-05e48b86",null).exports,d={props:["menuItem","allTaskCount"],components:{CardItem:c},created:function(){}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("row",{staticClass:"menu-field-set",attrs:{gutter:16}},[a("label",[t._v(t._s(t.menuItem.text))]),t._v(" "),t._l(t.menuItem.children,function(e,i){return a("Col",{key:i,attrs:{span:"4"}},[a("card-item",{attrs:{appinfo:e,allTaskCount:t.allTaskCount}})],1)})],2)},staticRenderFns:[]};var u=a("VU/8")(d,p,!1,function(t){a("+7Jr")},"data-v-24ac7fc4",null).exports,h=a("oAV5"),f={components:{CardList:u,CardItem:c,PulseGraph:a("ll1Z").default},data:function(){return{spinShow:!0,cutView:!0,menuList:[],favoriteMenu:{leaf:!1,text:"常用应用",children:[]},caseId:"apps",pulseGraphLlistr:[],allTaskCount:[],books$$:null,isAdmin:this.$currentUser.isAdmin,model:"apps"}},mounted:function(){var t=this;this.subscribeMessage(),Object(n.h)().then(function(e){e.tableContent.length>0&&(t.favoriteMenu.children=e.tableContent)}),Object(n.b)().then(function(e){t.allTaskCount=e.tableContent,Object(n.g)().then(function(e){t.urlMd5(e),t.favoriteMenu.children.length>0?t.menuList=[t.favoriteMenu].concat(o()(e)):t.menuList=e,t.spinShow=!1})}),Object(n.o)().then(function(e){t.pulseGraphLlistr=e.tableContent})},methods:{changeView:function(t){t&&("apps"===t?(this.cutView=!0,this.caseId=t):(this.cutView=!1,this.caseId=Number(t)))},goAppManage:function(){window.top.location.hash="#page/AppSetting"},subscribeMessage:function(){var t=this,e=this.$deepstream;Object(h.c)();e.event.subscribe("taskChange/"+this.$currentUser.userId,function(e){t.allTaskCount=e.tableContent})},urlMd5:function(t){!function t(e){for(var a=e.length,i=void 0;a--;){if((i=e[a]).url&&"_iframe"==i.target){var o=i.url,n="outlink/"+window.top.MD5(o);i.url=n}i.children&&t(i.children)}}(t)}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap bg_ff"},[t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),a("div",{staticClass:"main-header bg_ff"},[a("div",{staticClass:"main-header-nav"},[a("Row",[a("Col",{attrs:{span:"24"}},[a("ButtonGroup",{staticClass:"fr"},[a("Icon",{attrs:{type:"apps"===t.model?"ios-apps":"md-share",size:"16"}}),t._v(" "),a("Select",{staticClass:"input-select",staticStyle:{width:"230px","font-size":"16px"},attrs:{placeholder:"请选择业务单元"},on:{"on-change":t.changeView},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[a("Option",{attrs:{value:"apps"}},[a("Icon",{attrs:{type:"ios-apps",size:"16"}}),t._v(" 所有应用看板\n            ")],1),t._v(" "),t._l(t.pulseGraphLlistr,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[a("Icon",{attrs:{type:"md-share",size:"16"}}),t._v(" "+t._s(e.name)+"\n            ")],1)})],2)],1)],1)],1)],1)]),t._v(" "),t.cutView&&"apps"===t.caseId?a("div",t._l(t.menuList,function(e,i){return a("section",{key:i,staticClass:"bg-white-lighter"},[a("row",{staticClass:"menu-group"},[a("row",[a("h3",{staticClass:"menu-group-title"},[t._v(t._s(e.text))])]),t._v(" "),a("row",{attrs:{gutter:16}},t._l(e.children,function(e,i){return e.leaf?a("Col",{key:i,attrs:{span:"4"}},[e.leaf?a("card-item",{attrs:{appinfo:e,allTaskCount:t.allTaskCount}}):t._e()],1):a("card-list",{attrs:{menuItem:e,index:i,allTaskCount:t.allTaskCount}})}))],1)],1)})):t._e(),t._v(" "),t._l(t.pulseGraphLlistr,function(e,i){return t.cutView||e.id!==t.caseId?t._e():a("div",{key:i},[a("pulse-graph",{attrs:{caseId:e.id}})],1)})],2)},staticRenderFns:[]};var g=a("VU/8")(f,m,!1,function(t){a("hQQw")},"data-v-6f40fd4a",null);e.default=g.exports},vP1K:function(t,e){}});