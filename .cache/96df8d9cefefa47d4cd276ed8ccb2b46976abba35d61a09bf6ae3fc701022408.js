{"source":"webpackJsonp([14],{\"2s6e\":function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"incrementalanalysis shadow\"},[a(\"div\",{staticClass:\"incrementalanalysis-header\"},[a(\"strong\",[e._v(\"\\n            查看范围:\\n        \")]),e._v(\" \"),a(\"DatePicker\",{staticStyle:{width:\"100px\"},attrs:{type:\"month\",placeholder:\"选择月份\",format:\"yyyy-MM\",clearable:!1},model:{value:e.month,callback:function(t){e.month=t},expression:\"month\"}}),e._v(\" \"),a(\"div\",{staticClass:\"incrementalanalysis-header-daterange\"},[a(\"span\",{staticClass:\"customs-tag\",class:{\"customs-tag-active\":\"week\"===e.periodicType},on:{click:function(t){e.handleChangePeriodicType(\"week\")}}},[e._v(\"周\")]),e._v(\" \"),a(\"span\",{staticClass:\"customs-tag\",class:{\"customs-tag-active\":\"day\"===e.periodicType},on:{click:function(t){e.handleChangePeriodicType(\"day\")}}},[e._v(\"天\")])])],1),e._v(\" \"),a(\"div\",{staticStyle:{width:\"100%\",height:\"100%\"},attrs:{id:\"data_source_con\"}})])},staticRenderFns:[]}},CwxW:function(t,e,a){\"use strict\";var s={name:\"ProgressRing\",props:{radius:Number,progress:Number,strokeWidth:Number,bottomColor:{default:function(){return\"#f0f0f0\"}},progressColor:{default:function(t){return\"green\"}}},computed:{strokeDashoffset:function(){return this.circumference-this.percent/100*this.circumference}},watch:{progress:function(){var t=this;if(this.percent=0,this.progress)var e=setInterval(function(){t.percent+=1,t.progress===t.percent?clearInterval(e):0===t.progress&&clearInterval(e)},10);else this.progress=0}},data:function(){var t=this.radius-2*this.strokeWidth;return{normalizedRadius:t,circumference:2*t*Math.PI,percent:0}},mounted:function(){var t=this;this.percent=0;var e=setInterval(function(){t.percent+=1,t.progress===t.percent?clearInterval(e):0===t.progress&&clearInterval(e)},10)}},i=a(\"ilE3\"),n=a.n(i),r=a(\"VU/8\")(s,n.a,!1,null,null,null).exports;e.a=r},KsPN:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"reports\"},[a(\"div\",{staticClass:\"reports-header\"},[t._v(\"\\n        统计报表\\n    \")]),t._v(\" \"),a(\"div\",{staticClass:\"reports-content\"},[a(\"task-statistics\"),t._v(\" \"),a(\"task-incremental-analysis\")],1)])},staticRenderFns:[]}},Ny0i:function(t,e){},YFG3:function(t,e){},ilE3:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"svg\",{attrs:{height:2*t.radius,width:2*t.radius}},[a(\"circle\",{attrs:{stroke:t.bottomColor,fill:\"transparent\",\"stroke-width\":t.strokeWidth,r:t.normalizedRadius,cx:t.radius,cy:t.radius}}),t._v(\" \"),a(\"circle\",{style:{strokeDashoffset:t.strokeDashoffset},attrs:{stroke:t.progressColor,fill:\"transparent\",\"stroke-dasharray\":t.circumference+\" \"+t.circumference,\"stroke-width\":t.strokeWidth+1,r:t.normalizedRadius,cx:t.radius,cy:t.radius}}),t._v(\" \"),a(\"text\",{staticStyle:{fill:\"gray\",\"font-weight\":\"600\",\"text-anchor\":\"middle\",\"baseline-shift\":\"sub\",\"font-family\":\"sans-serif\"},attrs:{x:t.radius,dy:t.radius-3}},[t._v(t._s(t.progress)+\"%\")])])},staticRenderFns:[]}},\"jN7+\":function(t,e){},munN:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"statistics shadow\"},[a(\"div\",{staticClass:\"statistics-item\"},[a(\"div\",{staticClass:\"statistics-item-txt\"},[t._v(\"待办任务\")]),t._v(\" \"),a(\"router-link\",{attrs:{to:{name:\"todo\"}}},[a(\"div\",{staticClass:\"statistics-item-count todotask\"},[t._v(t._s(t.todo))])])],1),t._v(\" \"),a(\"div\",{staticClass:\"statistics-item\"},[a(\"div\",{staticClass:\"statistics-item-txt\"},[t._v(\"已办任务\")]),t._v(\" \"),a(\"router-link\",{attrs:{to:{name:\"done\"}}},[a(\"div\",{staticClass:\"statistics-item-count donetask\"},[t._v(t._s(t.done))])])],1),t._v(\" \"),a(\"div\",{staticClass:\"statistics-item\"},[a(\"div\",{staticClass:\"statistics-item-txt\"},[t._v(\"所有任务\")]),t._v(\" \"),a(\"router-link\",{attrs:{to:{name:\"all\"}}},[a(\"div\",{staticClass:\"statistics-item-count\"},[t._v(t._s(t.all))])])],1),t._v(\" \"),a(\"Divider\",{staticStyle:{height:\"7em\"},attrs:{type:\"vertical\"}}),t._v(\" \"),a(\"div\",{staticClass:\"statistics-item\"},[a(\"i-circle\",{attrs:{percent:t.completionratio,size:100,\"trail-width\":4,\"stroke-width\":8,\"stroke-linecap\":\"square\",\"stroke-color\":\"#1fe5bd\"}},[a(\"div\",{staticClass:\"demo-Circle-custom\"},[a(\"p\",{staticStyle:{\"font-size\":\"1rem!important\",color:\"#aaa\"}},[t._v(\"完成率\")]),t._v(\" \"),a(\"p\",{staticStyle:{\"font-size\":\"2.5em\",\"font-family\":\"lcletter\",color:\"#1fe5bd\"}},[t._v(t._s(t.completionratio)+\"%\")])])])],1)],1)},staticRenderFns:[]}},rLxg:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var s=a(\"UzZq\"),i=a(\"CwxW\"),n={name:\"TaskStatistics\",data:function(){return{todo:0,done:0,all:0,pageInfo:{limit:30,page:1,total:0},completionratio:0}},methods:{getData:function(){var e=this;Object(s.f)(this.pageInfo).then(function(t){e.todo=t.dataCount,Object(s.d)(e.pageInfo).then(function(t){e.done=t.dataCount,e.all=e.todo+e.done,0!==e.done&&0!==e.all?e.completionratio=parseInt(e.done/e.all*100):e.completionratio=0})})}},mounted:function(){this.getData()}},r=a(\"munN\"),o=a.n(r);var c=function(t){a(\"jN7+\")},l=a(\"VU/8\")(n,o.a,!1,c,\"data-v-e0bc4f92\",null).exports,d=a(\"oAV5\"),u=a(\"XLwt\"),p={name:\"TaskIncrementalAnalysis\",data:function(){return{periodicType:\"week\",month:new Date}},watch:{month:function(t){this.renderReport()},periodicType:function(t){this.renderReport()}},methods:{handleChangePeriodicType:function(t){this.periodicType=t},getFlowTaskStatisticsData:function(){return Object(s.e)({date:Object(d.b)(this.month,\"yyyy/MM/dd\"),type:this.periodicType}).then(function(t){var e=[],a={name:\"待办任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[]},s={name:\"已办任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[]},i={name:\"所有任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[]};return t.map(function(t){e.push(t.xAxis),a.data.push(t.todo),s.data.push(t.done),i.data.push(t.todo+t.done)}),{xAxis:e,series:[a,s,i]}})},initOption:function(t,e){return{tooltip:{trigger:\"axis\",axisPointer:{type:\"cross\",label:{backgroundColor:\"#6a7985\"}}},title:{text:\"任务增量分析\"},legend:{data:[\"待办任务\",\"已办任务\",\"所有任务\"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:\"3%\",right:\"4%\",bottom:\"3%\",containLabel:!0},xAxis:[{type:\"category\",boundaryGap:!1,data:t}],yAxis:[{type:\"value\"}],series:e}},renderReport:function(){var a=this;this.getFlowTaskStatisticsData().then(function(t){var e=u.init(document.getElementById(\"data_source_con\"));e.setOption(a.initOption(t.xAxis,t.series)),window.addEventListener(\"resize\",function(){e.resize()})})}},mounted:function(){this.renderReport()}},f=a(\"2s6e\"),m=a.n(f);var v=function(t){a(\"Ny0i\")},h=a(\"VU/8\")(p,m.a,!1,v,\"data-v-3de42a9c\",null).exports,y={name:\"Reports\",components:{ProgressRing:i.a,TaskStatistics:l,TaskIncrementalAnalysis:h},data:function(){return{active:!1,month:\"\"}},methods:{handleSelectDataRange:function(t){}},mounted:function(){this.$nextTick(function(){var t=echarts.init(document.getElementById(\"data_source_con\"));t.setOption({tooltip:{trigger:\"axis\",axisPointer:{type:\"cross\",label:{backgroundColor:\"#6a7985\"}}},legend:{selectedMode:!1,x:30,y:8,data:[\"待办任务\",\"已办任务\",\"所有任务\"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:\"3%\",right:\"4%\",bottom:\"3%\",containLabel:!0},xAxis:[{type:\"category\",boundaryGap:!1,data:[\"周一\",\"周二\",\"周三\",\"周四\",\"周五\",\"周六\",\"周日\"]}],yAxis:[{type:\"value\"}],series:[{name:\"待办任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[120,132,101,134,90,230,210]},{name:\"已办任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[220,182,191,234,290,330,310]},{name:\"所有任务\",type:\"line\",stack:\"总量\",areaStyle:{},data:[150,232,201,154,190,330,410]}]}),window.addEventListener(\"resize\",function(){t.resize()})})}},g=a(\"KsPN\"),_=a.n(g);var k=function(t){a(\"YFG3\")},x=a(\"VU/8\")(y,_.a,!1,k,\"data-v-29c55375\",null);e.default=x.exports}});"}