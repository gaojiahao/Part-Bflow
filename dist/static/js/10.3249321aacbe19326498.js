webpackJsonp([10],{AmxS:function(t,e){},TRIB:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={render:function(){var t=this.$createElement;return(this._self._c||t)("rect",{staticClass:"cirle",attrs:{width:this.width,height:this.height,rx:"8",ry:"8",x:this.xAxion,y:this.yAxion,"stroke-width":"2",fill:this.color,stroke:this.borderColor},on:{click:this.changeLineStyle}})},staticRenderFns:[]};var o=i("D8HT")({data:function(){return{}},methods:{changeLineStyle:function(){this.$emit("changeLineStyle")}},props:["shape","xAxion","yAxion","color","borderColor","width","height"]},r,!1,function(t){i("AmxS")},null,null).exports,s=i("K4CD"),n={name:"TechnologyGraph",components:{Shape:o},data:function(){return{processRouteCode:this.$route.params.processRouteCode,spinShow:!1,screenWidth:document.body.clientWidth,xAxion:50,yAxion:80,pointList:[],ProcessAndProcedureData:[],defaultxAxion:40,defaultyAxion:80,graphSpace:100,defaultShapeWidth:50,showNumber:9}},watch:{screenWidth:function(t){this.screenWidth=t,this.showNumber=Math.floor(t/(this.defaultShapeWidth+this.graphSpace)),this.pointList=[],this.drawGraph()}},methods:{drawGraph:function(){for(var t=this,e=this.graphSpace,i=this.defaultShapeWidth,r=0,o=0,s={},n=void 0,a=void 0,d=void 0,h=this.ProcessAndProcedureData,c=0;c<h.length;c++)c%this.showNumber==0&&0!==c&&r++,r%2==0?(h[c].pointX=this.defaultxAxion+o*(e+i),h[c].pointY=this.defaultyAxion+(this.defaultShapeWidth+e)*r,s[h[c].procedureCode]=h[c].pointX+","+h[c].pointY,o++):(h[c].pointX=this.defaultxAxion+(o-1)*(e+i),h[c].pointY=this.defaultyAxion+(this.defaultShapeWidth+e)*r,s[h[c].procedureCode]=h[c].pointX+","+h[c].pointY,o--);h.forEach(function(e,r){e.underProcedureCode&&e.underProcedureCode in s&&(n=s[e.underProcedureCode].split(","),a=Number(n[0]),d=Number(n[1]),a===e.pointX&&t.pointList.push({id:e.procedureCode,value:e.pointX+i/2+","+(e.pointY+t.defaultShapeWidth+20)+" "+(a+i/2)+","+(d-4)}),a<e.pointX&&d===e.pointY&&t.pointList.push({id:e.procedureCode,value:e.pointX+","+(e.pointY+t.defaultShapeWidth/2)+" "+(a+i+4)+","+(d+t.defaultShapeWidth/2)}),a>e.pointX&&d===e.pointY&&t.pointList.push({id:e.procedureCode,value:e.pointX+t.defaultShapeWidth+","+(e.pointY+t.defaultShapeWidth/2)+" "+(a-4)+","+(d+t.defaultShapeWidth/2)}))})},getProcessAndProcedure:function(t){var e=this;this.spinShow=!0,Object(s.g)(t).then(function(t){e.ProcessAndProcedureData=t,e.drawGraph(),e.spinShow=!1}).catch(function(t){e.$Message.error(t)})}},mounted:function(){var t=this,e=document.body.clientHeight-45;window.document.getElementsByClassName("rfd-tetechnology-warp-main")[0].style.height=e+"px",window.document.getElementsByClassName("rfd-tetechnology-warp-main")[0].style.maxHeight=e+"px",this.showNumber=Math.floor(document.body.clientWidth/(this.defaultShapeWidth+this.graphSpace)),window.onresize=function(){return window.screenWidth=document.body.clientWidth,void(t.screenWidth=window.screenWidth)},this.getProcessAndProcedure(this.processRouteCode)}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rfd-tetechnology-warp"},[t.spinShow?i("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),i("header",{staticClass:"rfd-tetechnology-warp-header"}),t._v(" "),i("main",{staticClass:"rfd-tetechnology-warp-main"},[i("div",{staticClass:"svg-container"},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[i("defs",[i("filter",{attrs:{id:"f1",x:"0",y:"0",width:"200%",height:"200%"}},[i("feOffset",{attrs:{result:"offOut",in:"SourceGraphic",dx:"0",dy:"0"}}),t._v(" "),i("feColorMatrix",{attrs:{result:"matrixOut",in:"offOut",type:"matrix",values:"0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"}}),t._v(" "),i("feGaussianBlur",{attrs:{result:"blurOut",in:"matrixOut",stdDeviation:"5"}}),t._v(" "),i("feBlend",{attrs:{in:"SourceGraphic",in2:"blurOut",mode:"normal"}})],1)]),t._v(" "),i("defs",[i("marker",{attrs:{id:"arrow",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"#00ae9d"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),i("defs",[i("marker",{attrs:{id:"arrow1",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"#808695"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),i("defs",[i("marker",{attrs:{id:"arrow_hight_color",markerUnits:"userSpaceOnUse",markerWidth:"15",markerHeight:"15",viewBox:"0 0 15 15",refX:"6",refY:"6",orient:"auto"}},[i("path",{staticStyle:{fill:"red"},attrs:{d:"M2,0 L10,6 L2,12 L6,6 L2,0"}})])]),t._v(" "),i("defs",[i("linearGradient",{attrs:{id:"orange_red",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}},[i("stop",{staticStyle:{"stop-color":"#ffdfd9","stop-opacity":"1"},attrs:{offset:"0%"}}),t._v(" "),i("stop",{staticStyle:{"stop-color":"#ff8069 stop-opacity:1"},attrs:{offset:"100%"}})],1)],1),t._v(" "),t._l(t.ProcessAndProcedureData,function(e){return i("g",{key:e.procedureCode},[i("image",{attrs:{x:e.pointX,y:e.pointY,width:t.defaultShapeWidth,height:t.defaultShapeWidth,"xlink:href":e.photo,rx:"25"}}),t._v(" "),i("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"14px"},attrs:{x:e.pointX+t.defaultShapeWidth/2,y:e.pointY+t.defaultShapeWidth+5,fill:"#000"}},[t._v("\n                        "+t._s(e.spName)+"\n                    ")]),t._v(" "),i("circle",{attrs:{cx:e.pointX,cy:e.pointY,r:"12","stroke-width":"1",fill:"red"}}),t._v(" "),i("text",{staticClass:"svg-text-common-style",staticStyle:{"font-size":"10px","font-weight":"bold"},attrs:{x:e.pointX,y:e.pointY-4,fill:"#fff"}},[t._v("\n                        12\n                    ")])])}),t._v(" "),t._l(t.pointList,function(t,e){return i("g",{key:e},[i("polyline",{staticStyle:{fill:"none",stroke:"#808695","stroke-width":"2"},attrs:{points:t.value,"marker-end":"url(#arrow1)"}})])})],2)])])],1)},staticRenderFns:[]};var d=i("D8HT")(n,a,!1,function(t){i("mN/1")},null,null);e.default=d.exports},"mN/1":function(t,e){}});
//# sourceMappingURL=10.3249321aacbe19326498.js.map