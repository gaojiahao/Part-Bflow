webpackJsonp([15],{"8egc":function(e,t){},iVf6:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("GIAq"),n=s("oAV5"),i={name:"BigProcessa",data:function(){return{bigProcessNodes:[]}},methods:{getBigProcessInfo:function(){var e=this,t=this;Object(a.v)(this.$route.params.orderCode).then(function(s){var a=s;a.map(function(e,s){switch(e.schedule=e.schedule+"%",e.procedure){case"接单":e.color="black",e.schedule="",e.appInstances=[];break;case"计划":e.color="#9C27B0";break;case"下单":e.color="#03A9F4";break;case"验收":e.color="#4CAF50";break;case"交付":e.color="#e8630a";break;case"收款":e.color="#235784";break;case"开票":e.color="#red",e.durationTime=""}0===e.appInstances.length?e.durationTime="":a[s-1].durationTime=t.calcTimeDiff(new Date(e.startTime),new Date(e.endTime)),e.appInstances.map(function(e){e.crtTime=Object(n.b)(new Date(e.crtTime),"yyyy/MM/dd  hh:mm:ss")})}),e.bigProcessNodes=a})},calcTimeDiff:function(e,t){var s=t.getTime()-e.getTime(),a=Math.floor(s/864e5),n=s%864e5,i=Math.floor(n/36e5),c=n%36e5,r=Math.floor(c/6e4),o=c%6e4;Math.round(o/1e3);return a>0?a+"天"+i+"小时":i+"小时"+r+"分"},viewDetail:function(e){window.open("/Form/index.html?data="+e)}},created:function(){this.getBigProcessInfo()}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{width:"100%",height:"100%"}},[s("div",{staticClass:"order"},e._l(e.bigProcessNodes,function(t,a){return s("div",{key:a,staticClass:"n"},[t.durationTime?s("div",{staticClass:"lines"},[s("span",{staticClass:"dian_l"},[e._v("•")]),e._v(" "),s("span",{staticClass:"line"}),e._v(" "),s("span",{staticClass:"txt"},[e._v(e._s(t.durationTime))]),e._v(" "),s("span",{staticClass:"line"}),e._v(" "),s("span",{staticClass:"dian_r"},[e._v("•")])]):e._e(),e._v(" "),s("div",{staticClass:"nodePro"},[s("div",{staticClass:"appName"},[s("strong",[e._v(e._s(t.procedure))])]),e._v(" "),s("div",{staticClass:"schedule ",style:{backgroundColor:t.color}},[s("span",[e._v(e._s(t.schedule))])]),e._v(" "),t.appInstances.length>0?s("div",{staticClass:"verticalbar"}):e._e(),e._v(" "),t.appInstances.length>0?s("div",{staticClass:"trans"},[s("div",{staticClass:"trans-kuan"}),e._v(" "),e._l(t.appInstances,function(t,a){return s("div",{key:a,staticClass:"transitem"},[s("p",[s("a",{staticStyle:{color:"#1e88e5"},on:{click:function(s){e.viewDetail(t.transCode)}}},[e._v(e._s(t.transCode))])]),e._v(" "),s("p",[e._v(e._s(t.crtTime))])])})],2):e._e()])])}))])},staticRenderFns:[]};var r=s("VU/8")(i,c,!1,function(e){s("8egc")},null,null);t.default=r.exports}});
//# sourceMappingURL=15.a9794db410118ab6b0fe.js.map