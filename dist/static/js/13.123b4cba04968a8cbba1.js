webpackJsonp([13],{GXUG:function(e,t){},QQN6:function(e,t){},TRIB:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this.$createElement;return(this._self._c||e)("rect",{staticClass:"cirle",attrs:{width:this.width,height:this.height,rx:"8",ry:"8",x:this.xAxion,y:this.yAxion,"stroke-width":"2",fill:this.color,stroke:this.borderColor},on:{click:this.changeLineStyle}})},staticRenderFns:[]};var a=i("VU/8")({data:function(){return{}},methods:{changeLineStyle:function(){this.$emit("changeLineStyle")}},props:["shape","xAxion","yAxion","color","borderColor","width","height"]},r,!1,function(e){i("QQN6")},null,null).exports,o=i("K4CD"),s={name:"TechnologyGraph",components:{Shape:a},data:function(){return{prefixCls:"rfd-technology",processRouteCode:this.$route.params.processRouteCode,spinShow:!1,screenWidth:document.body.clientWidth,xAxion:50,yAxion:80,pointList:[],ProcessAndProcedureData:[],defaultxAxion:40,defaultyAxion:80,graphSpace:100,defaultShapeWidth:50,showNumber:9,cascaderData:[{value:"my",label:"我的任务",children:[{value:"done",label:"已完成",children:[{value:"overdue",label:"逾期"},{value:"no-overdue",label:"未逾期"}]},{value:"todo",label:"未完成",children:[{value:"overdue",label:"逾期"},{value:"no-overdue",label:"未逾期"}]}]},{value:"team",label:"团队任务",children:[{value:"done",label:"已完成",children:[{value:"overdue",label:"逾期"},{value:"no-overdue",label:"未逾期"}]},{value:"todo",label:"未完成",children:[{value:"overdue",label:"逾期"},{value:"no-overdue",label:"未逾期"}]}]}],cascaderValue:["my","done","overdue"]}},watch:{screenWidth:function(e){this.screenWidth=e,this.showNumber=Math.floor(e/(this.defaultShapeWidth+this.graphSpace)),this.pointList=[],this.drawGraph()}},methods:{drawGraph:function(){for(var e=this,t=this.graphSpace,i=this.defaultShapeWidth,r=0,a=0,o={},s=void 0,n=void 0,d=void 0,l=this.ProcessAndProcedureData,h=0;h<l.length;h++)h%this.showNumber==0&&0!==h&&r++,r%2==0?(l[h].pointX=this.defaultxAxion+a*(t+i),l[h].pointY=this.defaultyAxion+(this.defaultShapeWidth+t)*r,o[l[h].procedureCode]=l[h].pointX+","+l[h].pointY,a++):(l[h].pointX=this.defaultxAxion+(a-1)*(t+i),l[h].pointY=this.defaultyAxion+(this.defaultShapeWidth+t)*r,o[l[h].procedureCode]=l[h].pointX+","+l[h].pointY,a--);l.forEach(function(t,r){t.underProcedure&&t.underProcedure in o&&(s=o[t.underProcedure].split(","),n=Number(s[0]),d=Number(s[1]),n===t.pointX&&e.pointList.push({id:t.procedureCode,value:t.pointX+i/2+","+(t.pointY+e.defaultShapeWidth+20)+" "+(n+i/2)+","+(d-4)}),n<t.pointX&&d===t.pointY&&e.pointList.push({id:t.procedureCode,value:t.pointX+","+(t.pointY+e.defaultShapeWidth/2)+" "+(n+i+4)+","+(d+e.defaultShapeWidth/2)}),n>t.pointX&&d===t.pointY&&e.pointList.push({id:t.procedureCode,value:t.pointX+e.defaultShapeWidth+","+(t.pointY+e.defaultShapeWidth/2)+" "+(n-4)+","+(d+e.defaultShapeWidth/2)}))})},getProcessAndProcedure:function(e){var t=this;this.spinShow=!0,Object(o.k)(e).then(function(e){t.ProcessAndProcedureData=e,t.drawGraph(),t.spinShow=!1}).catch(function(e){t.$Message.error(e)})}},mounted:function(){var e=this,t=document.body.clientHeight-45;window.document.getElementsByClassName("rfd-technology-wrap-main")[0].style.height=t+"px",window.document.getElementsByClassName("rfd-technology-wrap-main")[0].style.maxHeight=t+"px",this.showNumber=Math.floor(document.body.clientWidth/(this.defaultShapeWidth+this.graphSpace)),window.onresize=function(){return window.screenWidth=document.body.clientWidth,void(e.screenWidth=window.screenWidth)},this.getProcessAndProcedure(this.processRouteCode)}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:[e.prefixCls+"-wrap"]},[e.spinShow?i("Spin",{attrs:{size:"large",fix:""}}):e._e(),e._v(" "),i("header",{class:[e.prefixCls+"-wrap-header"]},[i("label",{staticStyle:{"font-size":"14px"}},[e._v("任务过滤：")]),e._v(" "),i("Cascader",{class:[e.prefixCls+"-cascader"],attrs:{data:e.cascaderData,filterable:""},model:{value:e.cascaderValue,callback:function(t){e.cascaderValue=t},expression:"cascaderValue"}})],1),e._v(" "),i("main",{class:[e.prefixCls+"-wrap-main"]},[i("div",{staticClass:"svg-container"},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[i("defs",[i("filter",{attrs:{id:"f1",x:"0",y:"0",width:"200%",height:"200%"}},[i("feOffset",{attrs:{result:"offOut",in:"SourceGraphic",dx:"0",dy:"0"}}),e._v(" "),i("feColorMatrix",{attrs:{result:"matrixOut",in:"offOut",type:"matrix",values:"0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"}}),e._v(" "),i("feGaussianBlur",{attrs:{result:"blurOut",in:"matrixOut",stdDeviation:"5"}}),e._v(" "),i("feBlend",{attrs:{in:"SourceGraphic",in2:"blurOut",mode:"normal"}})],1)]),e._v(" "),i("defs",[i("marker",{attrs:{id:"arrow",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"#00ae9d"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),i("defs",[i("marker",{attrs:{id:"arrow1",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"#808695"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),i("defs",[i("marker",{attrs:{id:"arrow_hight_color",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"red"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),e._v(" "),i("defs",[i("linearGradient",{attrs:{id:"orange_red",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[i("stop",{staticStyle:{"stop-color":"#ffdfd9","stop-opacity":"1"},attrs:{offset:"0%"}}),e._v(" "),i("stop",{staticStyle:{"stop-color":"#ff8069 stop-opacity:1"},attrs:{offset:"100%"}})],1)],1),e._v(" "),e._l(e.ProcessAndProcedureData,function(t){return i("g",{key:t.procedureCode},[i("image",{attrs:{x:t.pointX,y:t.pointY,width:e.defaultShapeWidth,height:e.defaultShapeWidth,"xlink:href":t.photo,rx:"25"}}),e._v(" "),i("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"14px"},attrs:{x:t.pointX+e.defaultShapeWidth/2,y:t.pointY+e.defaultShapeWidth+5,fill:"#000"}},[e._v("\n            "+e._s(t.procedureName)+"\n          ")]),e._v(" "),i("circle",{attrs:{cx:t.pointX,cy:t.pointY,r:"12","stroke-width":"1",fill:"red"}}),e._v(" "),i("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"10px","font-weight":"bold"},attrs:{x:t.pointX,y:t.pointY-4,fill:"#fff"}},[e._v("\n            "+e._s(t.num>99?"99+":t.num)+"\n          ")])])}),e._v(" "),e._l(e.pointList,function(e,t){return i("g",{key:t},[i("polyline",{staticStyle:{fill:"none",stroke:"#808695","stroke-width":"2"},attrs:{points:e.value,"marker-end":"url(#arrow1)"}})])})],2)])])],1)},staticRenderFns:[]};var d=i("VU/8")(s,n,!1,function(e){i("GXUG")},null,null);t.default=d.exports}});