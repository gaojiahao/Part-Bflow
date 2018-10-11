webpackJsonp([14],{"73Op":function(e,t){},CwxW:function(e,t,r){"use strict";var o={name:"ProgressRing",props:{radius:Number,progress:Number,strokeWidth:Number,bottomColor:{default:function(){return"#f0f0f0"}},progressColor:{default:function(e){return"green"}}},computed:{strokeDashoffset:function(){return this.circumference-this.percent/100*this.circumference}},watch:{progress:function(){var e=this;this.percent=0;var t=setInterval(function(){e.percent+=1,e.progress===e.percent?clearInterval(t):0===e.progress&&clearInterval(t)},10)}},data:function(){var e=this.radius-2*this.strokeWidth;return{normalizedRadius:e,circumference:2*e*Math.PI,percent:0}},mounted:function(){var e=this;this.percent=0;var t=setInterval(function(){e.percent+=1,e.progress===e.percent?clearInterval(t):0===e.progress&&clearInterval(t)},10)}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("svg",{attrs:{height:2*e.radius,width:2*e.radius}},[r("circle",{attrs:{stroke:e.bottomColor,fill:"transparent","stroke-width":e.strokeWidth,r:e.normalizedRadius,cx:e.radius,cy:e.radius}}),e._v(" "),r("circle",{style:{strokeDashoffset:e.strokeDashoffset},attrs:{stroke:e.progressColor,fill:"transparent","stroke-dasharray":e.circumference+" "+e.circumference,"stroke-width":e.strokeWidth,r:e.normalizedRadius,cx:e.radius,cy:e.radius}}),e._v(" "),r("text",{staticStyle:{fill:"gray","font-weight":"600"},attrs:{x:e.radius-10,dy:e.radius+5}},[e._v(e._s(e.progress)+"%")])])},staticRenderFns:[]},i=r("D8HT")(o,a,!1,null,null,null).exports;t.a=i},TRIB:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("cfvZ"),a=r.n(o),i=r("3SZ7"),s=r.n(i),n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("svg",[r("circle",{attrs:{cx:e.xAxion,cy:e.yAxion,r:"25",stroke:"#03448a","stroke-width":"2",fill:e.color}}),e._v(" "),r("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"14px","font-weight":"bold"},attrs:{x:e.xAxion,y:e.yAxion-6,fill:"#fff"}},[e._v("\n            "+e._s(e.text)+"\n    ")])])},staticRenderFns:[]},d=r("D8HT")({props:["xAxion","yAxion","color","text"]},n,!1,null,null,null).exports,l=r("CwxW"),c=r("K4CD"),u={name:"TechnologyGraph",components:{Shape:d,ProgressRing:l.a},data:function(){return{prefixCls:"rfd-technology",processRouteCode:this.$route.params.processRouteCode,spinShow:!1,screenWidth:document.body.clientWidth,xAxion:50,yAxion:80,pointList:[],ProcessAndProcedureData:[],defaultxAxion:40,defaultyAxion:80,graphSpace:160,defaultShapeWidth:50,showNumber:9,radioGroupLabel:"mytask",rodioGroupDoOrNot:"todo",defaultDisplayTask:{},percent:{},taskType:"mytask",taskStatus:"todo",type:"myToDo",visible:!1,ordersLoading:!1,searchValue:"",orderCode:"",columnData:[],columns:[{title:"交易号",key:"transCode",align:"center"},{title:"创建者",key:"creatorName",align:"center",width:80},{title:"创建时间",key:"crtTime",align:"center"},{title:"生效时间",key:"effectiveTime",align:"center"}],pageTotal:0,currentPage:1,ordersPageSize:6}},watch:{screenWidth:function(e){this.screenWidth=e,this.showNumber=Math.floor(e/(this.defaultShapeWidth+this.graphSpace)),this.pointList=[],this.drawGraph()}},methods:{drawGraph:function(){var e=this,t=this.graphSpace,r=this.defaultShapeWidth,o=0,a=0,i={},s=void 0,n=void 0,d=void 0,l=this.ProcessAndProcedureData;if("start"!==l[0].procedureCode){var c={procedureCode:"start",procedureName:"开始",procedureStatus:1,underProcedure:l[0].procedureCode,sort:"0",myToDo:0,start:1};l.unshift(c)}if("end"!==l[l.length-1].procedureCode){var u={procedureCode:"end",procedureName:"结束",procedureStatus:1,myToDo:0,sort:l.length,start:1};l[l.length-1].underProcedure="end",l.push(u)}for(var p=0;p<l.length;p++)p%this.showNumber==0&&0!==p&&o++,o%2==0?(l[p].pointX=this.defaultxAxion+a*(t+r),l[p].pointY=this.defaultyAxion+(this.defaultShapeWidth+t)*o,i[l[p].procedureCode]=l[p].pointX+","+l[p].pointY,a++):("end"===l[p].procedureCode?l[p].pointX=this.defaultxAxion+(a-1)*(t+r)+60:l[p].pointX=this.defaultxAxion+(a-1)*(t+r),l[p].pointY=this.defaultyAxion+(this.defaultShapeWidth+t)*o,i[l[p].procedureCode]=l[p].pointX+","+l[p].pointY,a--),this.defaultDisplayTask[l[p].procedureCode]=l[p].myToDo;l.forEach(function(t,o){t.underProcedure&&t.underProcedure in i&&(s=i[t.underProcedure].split(","),n=Number(s[0]),d=Number(s[1]),n===t.pointX&&e.pointList.push({id:t.procedureCode,value:t.pointX+r/2+","+(t.pointY+e.defaultShapeWidth+20)+" "+(n+r/2)+","+(d-4)}),n<t.pointX&&d===t.pointY&&("end"===t.underProcedure?e.pointList.push({id:t.procedureCode,value:t.pointX+","+(t.pointY+e.defaultShapeWidth/2)+" "+(n+r+4)+","+(d+e.defaultShapeWidth/2)}):e.pointList.push({id:t.procedureCode,value:t.pointX+","+(t.pointY+e.defaultShapeWidth/2)+" "+(n+r+4+75)+","+(d+e.defaultShapeWidth/2)})),n>t.pointX&&d===t.pointY&&e.pointList.push({id:t.procedureCode,value:t.pointX+e.defaultShapeWidth+65+","+(t.pointY+e.defaultShapeWidth/2)+" "+(n-4)+","+(d+e.defaultShapeWidth/2)}))})},getProcessAndProcedure:function(e){var t=this,r={};this.spinShow=!0,Object(c.k)(e).then(function(e){t.ProcessAndProcedureData=e,e.forEach(function(e){0===e.mytask?r[e.procedureCode]=0:r[e.procedureCode]=100*(e.myToDo/e.mytask).toFixed(2)}),t.percent=r,t.drawGraph(),t.spinShow=!1}).catch(function(e){t.$Message.error(e)})},radioGroupChange:function(e){this.taskType=e,"teamtask"===e&&"done"===this.taskStatus?this.type="teamDone":"teamtask"===e&&"todo"===this.taskStatus?this.type="teamToDo":"mytask"===e&&"done"===this.taskStatus?this.type="myDone":"mytask"===e&&"todo"===this.taskStatus&&(this.type="myToDo"),this.getTaskCountFilter(this.type,this.orderCode)},radioGroupChangeDoneOrTodo:function(e){this.taskStatus=e,"teamtask"===this.taskType&&"done"===e?this.type="teamDone":"teamtask"===this.taskType&&"todo"===e?this.type="teamToDo":"mytask"===this.taskType&&"done"===e?this.type="myDone":"mytask"===this.taskType&&"todo"===e&&(this.type="myToDo"),this.getTaskCountFilter(this.type,this.orderCode)},getTaskCountFilter:function(e,t){var r=this,o=void 0;t&&(o=s()([{property:"t1.orderCode",value:t,operator:"eq"}])),Object(c.p)(e,this.processRouteCode,o).then(function(t){var o="",i={},s={};t[0]&&a()(t[0]).forEach(function(t){~e.toLowerCase().indexOf(t)&&(o=t)}),t.forEach(function(e){var t=e.todo+e.done;i[e.procedureCode]=0===t?0:100*(e[o]/t).toFixed(2),s[e.procedureCode]=e[o]}),r.percent=i,r.defaultDisplayTask=s})},getSaleOrderList:function(){var e=this;this.searchValue="",this.currentPage=1,this.ordersLoading=!0,Object(c.j)(this.currentPage).then(function(t){e.pageTotal=t.dataCount,e.columnData=t.tableContent,e.ordersLoading=!1})},onHandleClearOrderTag:function(){this.orderCode="",this.getTaskCountFilter(this.type,this.orderCode)},onHandleFilterByCode:function(){var e=this,t=[];this.searchValue&&(t=s()([{operator:"like",value:this.searchValue,property:"transCode"}])),this.currentPage=1,this.ordersLoading=!0,Object(c.j)(this.currentPage,t).then(function(t){e.pageTotal=t.dataCount,e.columnData=t.tableContent,e.ordersLoading=!1})},handleDblclick:function(e,t){var r=this,o=this.type;this.orderCode=e.transCode;var i=s()([{property:"t1.orderCode",value:e.transCode,operator:"eq"}]);Object(c.p)(o,this.processRouteCode,i).then(function(e){r.visible=!1;var t="",i={},s={};e[0]&&a()(e[0]).forEach(function(e){~o.toLowerCase().indexOf(e)&&(t=e)}),e.forEach(function(e){var r=e.todo+e.done;i[e.procedureCode]=0===r?0:100*(e[t]/r).toFixed(2),s[e.procedureCode]=e[t]}),r.percent=i,r.defaultDisplayTask=s})},orderPageChange:function(e){var t=this,r=[];this.searchValue&&(r=s()([{operator:"like",value:this.searchValue,property:"transCode"}])),this.currentPage=e,this.ordersLoading=!0,Object(c.j)(this.currentPage,r).then(function(e){t.pageTotal=e.dataCount,t.columnData=e.tableContent,t.ordersLoading=!1})}},mounted:function(){var e=this,t=document.body.clientHeight-45;window.document.getElementsByClassName("rfd-technology-wrap-main")[0].style.height=t+"px",window.document.getElementsByClassName("rfd-technology-wrap-main")[0].style.maxHeight=t+"px",this.showNumber=Math.floor(document.body.clientWidth/(this.defaultShapeWidth+this.graphSpace)),window.onresize=function(){return window.screenWidth=document.body.clientWidth,void(e.screenWidth=window.screenWidth)},this.getProcessAndProcedure(this.processRouteCode)}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:[e.prefixCls+"-wrap"]},[e.spinShow?r("Spin",{attrs:{size:"large",fix:""}}):e._e(),e._v(" "),r("header",{class:[e.prefixCls+"-wrap-header"]},[r("RadioGroup",{attrs:{size:"large"},on:{"on-change":e.radioGroupChange},model:{value:e.radioGroupLabel,callback:function(t){e.radioGroupLabel=t},expression:"radioGroupLabel"}},[r("Radio",{attrs:{label:"mytask"}},[r("span",[e._v("我的任务")])]),e._v(" "),r("Radio",{attrs:{label:"teamtask"}},[r("span",[e._v("团队任务")])]),e._v(" "),r("i",{staticClass:"vertical-divide"})],1),e._v(" "),r("RadioGroup",{attrs:{size:"large"},on:{"on-change":e.radioGroupChangeDoneOrTodo},model:{value:e.rodioGroupDoOrNot,callback:function(t){e.rodioGroupDoOrNot=t},expression:"rodioGroupDoOrNot"}},[r("Radio",{attrs:{label:"todo"}},[r("span",[e._v("未完成")])]),e._v(" "),r("Radio",{attrs:{label:"done"}},[r("span",[e._v("已完成")])])],1),e._v(" "),r("div",{class:[e.prefixCls+"-dropdown-select"]},[r("Poptip",{attrs:{title:"销售订单",content:"content",width:"560"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("span",{class:[e.prefixCls+"dropdown-select-item"],staticStyle:{"margin-left":"10px"},on:{click:e.getSaleOrderList}},[r("Tag",{attrs:{closable:"",color:"primary"},on:{"on-close":e.onHandleClearOrderTag}},[e._v(e._s(e.orderCode?e.orderCode:"销售订单"))]),e._v(" "),r("Icon",{attrs:{type:"ios-arrow-down"}})],1),e._v(" "),r("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[r("div",{class:[e.prefixCls+"dropdown-select-search"]},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入交易号",icon:"ios-close-circle"},on:{"on-enter":e.onHandleFilterByCode,"on-click":e.getSaleOrderList},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),e._v(" "),r("Button",{attrs:{type:"primary",size:"small"},on:{click:e.onHandleFilterByCode}},[e._v("查询")])],1),e._v(" "),r("Table",{attrs:{columns:e.columns,data:e.columnData,loading:e.ordersLoading,size:"small"},on:{"on-row-dblclick":e.handleDblclick}}),e._v(" "),r("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[r("div",{staticStyle:{float:"right"}},[r("Page",{attrs:{total:e.pageTotal,current:e.currentPage,size:"small","page-size":e.ordersPageSize,"show-total":"","show-elevator":""},on:{"on-change":e.orderPageChange}})],1)])],1)])],1)],1),e._v(" "),r("main",{class:[e.prefixCls+"-wrap-main"]},[r("div",{staticClass:"svg-container"},[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[r("defs",[r("filter",{attrs:{id:"f1",x:"0",y:"0",width:"200%",height:"200%"}},[r("feOffset",{attrs:{result:"offOut",in:"SourceGraphic",dx:"0",dy:"0"}}),e._v(" "),r("feColorMatrix",{attrs:{result:"matrixOut",in:"offOut",type:"matrix",values:"0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"}}),e._v(" "),r("feGaussianBlur",{attrs:{result:"blurOut",in:"matrixOut",stdDeviation:"5"}}),e._v(" "),r("feBlend",{attrs:{in:"SourceGraphic",in2:"blurOut",mode:"normal"}})],1)]),e._v(" "),r("defs",[r("marker",{attrs:{id:"arrow",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[r("path",{staticStyle:{fill:"#00ae9d"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),r("defs",[r("marker",{attrs:{id:"arrow1",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[r("path",{staticStyle:{fill:"#808695"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),r("defs",[r("marker",{attrs:{id:"arrow_hight_color",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[r("path",{staticStyle:{fill:"red"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),r("defs",[r("linearGradient",{attrs:{id:"orange_red",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[r("stop",{staticStyle:{"stop-color":"#ffdfd9","stop-opacity":"1"},attrs:{offset:"0%"}}),e._v(" "),r("stop",{staticStyle:{"stop-color":"#ff8069 stop-opacity:1"},attrs:{offset:"100%"}})],1)],1),e._v(" "),e._l(e.ProcessAndProcedureData,function(t){return r("g",{key:t.procedureCode},["start"===t.procedureCode?r("g",[r("shape",{attrs:{xAxion:t.pointX+80,yAxion:t.pointY+25,color:"#038a03",text:t.procedureName}})],1):"end"===t.procedureCode?r("g",[r("shape",{attrs:{xAxion:t.pointX+25,yAxion:t.pointY+25,color:"#ff0000",text:t.procedureName}})],1):r("g",[r("ProgressRing",{attrs:{x:t.pointX+60,y:t.pointY,radius:25,progress:e.percent[t.procedureCode],strokeWidth:2,progressColor:"#9C27B0"}}),e._v(" "),r("image",{attrs:{x:t.pointX,y:t.pointY,width:e.defaultShapeWidth,height:e.defaultShapeWidth,"xlink:href":t.photo,rx:"25"}}),e._v(" "),r("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"14px"},attrs:{x:t.pointX+e.defaultShapeWidth/2,y:t.pointY+e.defaultShapeWidth+5,fill:"#000"}},[e._v("\n              "+e._s(t.procedureName)+"\n            ")])],1),e._v(" "),e.defaultDisplayTask[t.procedureCode]>0?r("g",[r("circle",{attrs:{cx:t.pointX,cy:t.pointY,r:"12","stroke-width":"1",fill:"red"}}),e._v(" "),r("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"10px","font-weight":"bold"},attrs:{x:t.pointX,y:t.pointY-4,fill:"#fff"}},[e._v("\n              "+e._s(e.defaultDisplayTask[t.procedureCode])+"\n            ")])]):e._e()])}),e._v(" "),e._l(e.pointList,function(e,t){return r("g",{key:t},[r("polyline",{staticStyle:{fill:"none",stroke:"#808695","stroke-width":"2"},attrs:{points:e.value,"marker-end":"url(#arrow1)"}})])})],2)])])],1)},staticRenderFns:[]};var h=r("D8HT")(u,p,!1,function(e){r("73Op")},null,null);t.default=h.exports}});