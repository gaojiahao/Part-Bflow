{"source":"webpackJsonp([39],{\"0QUy\":function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,a=s._self._c||e;return a(\"div\",{staticStyle:{\"background-color\":\"#fff\"}},[a(\"div\",{staticClass:\"order\"},s._l(s.bigProcessNodes,function(e,t){return a(\"div\",{key:t,staticClass:\"n\"},[e.durationTime?a(\"div\",{staticClass:\"lines\"},[a(\"span\",{staticClass:\"dian_l\"},[s._v(\"•\")]),s._v(\" \"),a(\"span\",{staticClass:\"line\"}),s._v(\" \"),a(\"span\",{staticClass:\"txt\"},[s._v(s._s(e.durationTime))]),s._v(\" \"),a(\"span\",{staticClass:\"line\"}),s._v(\" \"),a(\"span\",{staticClass:\"dian_r\"},[s._v(\"•\")])]):s._e(),s._v(\" \"),a(\"div\",{staticClass:\"nodePro\"},[a(\"div\",{staticClass:\"appName\"},[a(\"strong\",[s._v(s._s(e.procedure))])]),s._v(\" \"),a(\"div\",{staticClass:\"schedule \",style:{backgroundColor:e.color}},[a(\"span\",[s._v(s._s(e.schedule))])]),s._v(\" \"),0<e.appInstances.length?a(\"div\",{staticClass:\"verticalbar\"}):s._e(),s._v(\" \"),0<e.appInstances.length?a(\"div\",{staticClass:\"trans\"},[a(\"div\",{staticClass:\"trans-kuan\"}),s._v(\" \"),s._l(e.appInstances,function(t,e){return a(\"div\",{key:e,staticClass:\"transitem\"},[a(\"p\",[a(\"a\",{staticStyle:{color:\"#1e88e5\"},on:{click:function(e){s.viewDetail(t.transCode)}}},[s._v(s._s(t.transCode))])]),s._v(\" \"),a(\"p\",[s._v(s._s(t.crtTime))])])})],2):s._e()])])}))])},staticRenderFns:[]}},DDXI:function(e,t,s){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=s(\"GIAq\"),c=s(\"oAV5\"),a={name:\"BigProcessa\",data:function(){return{bigProcessNodes:[]}},methods:{getBigProcessInfo:function(){var t=this,a=this;Object(n.A)(this.$route.params.orderCode).then(function(e){var s=e;s.map(function(e,t){switch(e.schedule=e.schedule+\"%\",e.procedure){case\"接单\":e.color=\"black\",e.schedule=\"\",e.appInstances=[];break;case\"计划\":e.color=\"#9C27B0\";break;case\"下单\":e.color=\"#03A9F4\";break;case\"验收\":e.color=\"#4CAF50\";break;case\"交付\":e.color=\"#e8630a\";break;case\"收款\":e.color=\"#235784\";break;case\"开票\":e.color=\"#red\",e.durationTime=\"\"}0===e.appInstances.length?e.durationTime=\"\":s[t-1].durationTime=a.calcTimeDiff(new Date(e.startTime),new Date(e.endTime)),e.appInstances.map(function(e){e.crtTime=Object(c.b)(new Date(e.crtTime),\"yyyy/MM/dd  hh:mm:ss\")})}),t.bigProcessNodes=s})},calcTimeDiff:function(e,t){var s=t.getTime()-e.getTime(),a=Math.floor(s/864e5),n=s%864e5,c=Math.floor(n/36e5),i=n%36e5,r=Math.floor(i/6e4),o=i%6e4;Math.round(o/1e3);return 0<a?a+\"天\"+c+\"小时\":c+\"小时\"+r+\"分\"},viewDetail:function(e){window.open(\"/Form/index.html?data=\"+e)}},created:function(){this.getBigProcessInfo()}},i=s(\"0QUy\"),r=s.n(i);var o=function(e){s(\"acn0\")},l=s(\"VU/8\")(a,r.a,!1,o,null,null);t.default=l.exports},acn0:function(e,t){}});"}