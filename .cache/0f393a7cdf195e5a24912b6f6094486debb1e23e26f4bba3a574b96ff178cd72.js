{"source":"webpackJsonp([48],{\"3sPU\":function(e,s){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticStyle:{\"background-color\":\"#fff\"}},[a(\"div\",{staticClass:\"order\"},t._l(t.bigProcessNodes,function(e,s){return a(\"div\",{key:s,staticClass:\"n\"},[e.durationTime?a(\"div\",{staticClass:\"lines\"},[a(\"span\",{staticClass:\"dian_l\"},[t._v(\"•\")]),t._v(\" \"),a(\"span\",{staticClass:\"line\"}),t._v(\" \"),a(\"span\",{staticClass:\"txt\"},[t._v(t._s(e.durationTime))]),t._v(\" \"),a(\"span\",{staticClass:\"line\"}),t._v(\" \"),a(\"span\",{staticClass:\"dian_r\"},[t._v(\"•\")])]):t._e(),t._v(\" \"),a(\"div\",{staticClass:\"nodePro\"},[a(\"div\",{staticClass:\"appName\"},[a(\"strong\",[t._v(t._s(e.procedure))])]),t._v(\" \"),a(\"div\",{staticClass:\"schedule \",style:{backgroundColor:e.color}},[a(\"span\",[t._v(t._s(e.schedule))])]),t._v(\" \"),0<e.appInstances.length?a(\"div\",{staticClass:\"verticalbar\"}):t._e(),t._v(\" \"),0<e.appInstances.length?a(\"div\",{staticClass:\"trans\"},[a(\"div\",{staticClass:\"trans-kuan\"}),t._v(\" \"),t._l(e.appInstances,function(s,e){return a(\"div\",{key:e,staticClass:\"transitem\"},[a(\"p\",[a(\"a\",{staticStyle:{color:\"#1e88e5\"},on:{click:function(e){t.viewDetail(s.transCode)}}},[t._v(t._s(s.transCode))])]),t._v(\" \"),a(\"p\",[t._v(t._s(s.crtTime))])])})],2):t._e()])])}),0)])},staticRenderFns:[]}},DDXI:function(e,s,t){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var n=t(\"GIAq\"),i=t(\"oAV5\"),a={name:\"BigProcessa\",data:function(){return{bigProcessNodes:[]}},methods:{getBigProcessInfo:function(){var s=this,a=this;Object(n.C)(this.$route.params.orderCode).then(function(e){var t=e;t.map(function(e,s){switch(e.schedule=e.schedule+\"%\",e.procedure){case\"接单\":e.color=\"black\",e.schedule=\"\",e.appInstances=[];break;case\"计划\":e.color=\"#9C27B0\";break;case\"下单\":e.color=\"#03A9F4\";break;case\"验收\":e.color=\"#4CAF50\";break;case\"交付\":e.color=\"#e8630a\";break;case\"收款\":e.color=\"#235784\";break;case\"开票\":e.color=\"#red\",e.durationTime=\"\"}0===e.appInstances.length?e.durationTime=\"\":t[s-1].durationTime=a.calcTimeDiff(new Date(e.startTime),new Date(e.endTime)),e.appInstances.map(function(e){e.crtTime=Object(i.b)(new Date(e.crtTime),\"yyyy/MM/dd  hh:mm:ss\")})}),s.bigProcessNodes=t})},calcTimeDiff:function(e,s){var t=s.getTime()-e.getTime(),a=Math.floor(t/864e5),n=t%864e5,i=Math.floor(n/36e5),c=n%36e5,o=Math.floor(c/6e4),r=c%6e4;Math.round(r/1e3);return 0<a?a+\"天\"+i+\"小时\":i+\"小时\"+o+\"分\"},viewDetail:function(e){window.open(\"/Form/index.html?data=\"+e)}},created:function(){this.getBigProcessInfo()}},c=t(\"3sPU\"),o=t.n(c);var r=function(e){t(\"HjoM\")},l=t(\"VU/8\")(a,o.a,!1,r,null,null);s.default=l.exports},HjoM:function(e,s){}});"}