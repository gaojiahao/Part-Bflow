webpackJsonp([14],{"2AJu":function(t,e){},"54Lz":function(t,e){},DAYN:function(t,e,n){"use strict";var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}!function(){function e(t){function e(t){t.parentElement.removeChild(t)}function n(t,e,n){var i=0===n?t.children[0]:t.children[n-1].nextSibling;t.insertBefore(e,i)}function r(t,e){var n=this;this.$nextTick(function(){return n.$emit(t.toLowerCase(),e)})}var s=["Start","Add","Remove","Update","End"],a=["Choose","Sort","Filter","Clone"],l=["Move"].concat(s,a).map(function(t){return"on"+t}),c=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var e=this.$slots.default;if(e&&1===e.length){var n=e[0];n.componentOptions&&"transition-group"===n.componentOptions.tag&&(this.transitionMode=!0)}var i=e,r=this.$slots.footer;r&&(i=e?[].concat(o(e),o(r)):[].concat(o(r)));var s=null,a=function(t,e){s=function(t,e,n){return void 0==n?t:((t=null==t?{}:t)[e]=n,t)}(s,t,e)};if(a("attrs",this.$attrs),this.componentData){var l=this.componentData,c=l.on,u=l.props;a("on",c),a("props",u)}return t(this.element,s,i)},mounted:function(){var e=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var n={};s.forEach(function(t){n["on"+t]=function(t){var e=this;return function(n){null!==e.realList&&e["onDrag"+t](n),r.call(e,t,n)}}.call(e,t)}),a.forEach(function(t){n["on"+t]=r.bind(e,t)});var o=i({},this.options,n,{onMove:function(t,n){return e.onDragMove(t,n)}});!("draggable"in o)&&(o.draggable=">*"),this._sortable=new t(this.rootContainer,o),this.computeIndexes()},beforeDestroy:function(){this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var e in t)-1==l.indexOf(e)&&this._sortable.option(e,t[e])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,e,n){if(!t)return[];var i=t.map(function(t){return t.elm}),r=[].concat(o(e)).map(function(t){return i.indexOf(t)});return n?r.filter(function(t){return-1!==t}):r}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var e=function(t,e){return t.map(function(t){return t.elm}).indexOf(e)}(this.getChildrenNodes()||[],t);return-1===e?null:{index:e,element:this.realList[e]}},getUnderlyingPotencialDraggableComponent:function(t){var e=t.__vue__;return e&&e.$options&&"transition-group"===e.$options._componentTag?e.$parent:e},emitChanges:function(t){var e=this;this.$nextTick(function(){e.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var e=[].concat(o(this.value));t(e),this.$emit("input",e)}},spliceList:function(){var t=arguments,e=function(e){return e.splice.apply(e,t)};this.alterList(e)},updatePosition:function(t,e){var n=function(n){return n.splice(e,0,n.splice(t,1)[0])};this.alterList(n)},getRelatedContextFromMoveEvent:function(t){var e=t.to,n=t.related,o=this.getUnderlyingPotencialDraggableComponent(e);if(!o)return{component:o};var r=o.realList,s={list:r,component:o};if(e!==n&&r&&o.getUnderlyingVm){var a=o.getUnderlyingVm(n);if(a)return i(a,s)}return s},getVmIndex:function(t){var e=this.visibleIndexes,n=e.length;return t>n-1?n:e[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),c=t.item},onDragAdd:function(t){var n=t.item._underlying_vm_;if(void 0!==n){e(t.item);var i=this.getVmIndex(t.newIndex);this.spliceList(i,0,n),this.computeIndexes();var o={element:n,newIndex:i};this.emitChanges({added:o})}},onDragRemove:function(t){if(n(this.rootContainer,t.item,t.oldIndex),this.isCloning)e(t.clone);else{var i=this.context.index;this.spliceList(i,1);var o={element:this.context.element,oldIndex:i};this.resetTransitionData(i),this.emitChanges({removed:o})}},onDragUpdate:function(t){e(t.item),n(t.from,t.item,t.oldIndex);var i=this.context.index,o=this.getVmIndex(t.newIndex);this.updatePosition(i,o);var r={element:this.context.element,oldIndex:i,newIndex:o};this.emitChanges({moved:r})},computeFutureIndex:function(t,e){if(!t.element)return 0;var n=[].concat(o(e.to.children)).filter(function(t){return"none"!==t.style.display}),i=n.indexOf(e.related),r=t.component.getVmIndex(i);return-1!=n.indexOf(c)||!e.willInsertAfter?r:r+1},onDragMove:function(t,e){var n=this.move;if(!n||!this.realList)return!0;var o=this.getRelatedContextFromMoveEvent(t),r=this.context,s=this.computeFutureIndex(o,t);return i(r,{futureIndex:s}),i(t,{relatedContext:o,draggedContext:r}),n(t,e)},onDragEnd:function(t){this.computeIndexes(),c=null}}}}Array.from||(Array.from=function(t){return[].slice.call(t)});var r=n("Lokx");t.exports=e(r)}()},Fc4D:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("mvHQ"),o=n.n(i),r=n("GIAq"),s={border:"none",borderBottom:"1px solid #c5c8ce",backgroundColor:"#fff",outline:"none",padding:"0 5px",height:"30px"},a={data:function(){var t=this;return{listId:this.$route.params.listId,type:"list",loading:!1,columns:[{title:"流程状态",key:"fieldValue",width:180,align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.fieldValue},style:s,on:{input:function(t){e.row.fieldValue=t.target.value}}}):t("div",e.row.fieldValue)}},{title:"排序",key:"sort",width:100,align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.sort},attrs:{type:"number",min:"1",max:"100"},style:s,on:{input:function(t){e.row.sort=t.target.value}}}):t("div",e.row.sort)}},{title:"标准周期(小时)",width:180,key:"delayHour",align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.delayHour},attrs:{type:"number",min:"1",max:"100"},style:s,on:{input:function(t){e.row.delayHour=t.target.value}}}):t("div",e.row.delayHour)}},{title:"操作",key:"opt",align:"center",render:function(e,n){return e("div",{on:{click:function(e){var i=t;switch((e.target||e.srcElement).id){case"delete":i.delProcessStatus(n);break;case"edit":n.row.$isEdit?i.handleSave(n.row):i.handleEdit(n.row);break;case"focus":i.handleIsSubscribe(n.row)}}}},[e("a",{attrs:{id:"delete"},style:{display:t.isAdmin?"inline-block":"none"}},"删除"),e("span",{style:{height:"10px",borderLeft:"1px solid #39f",margin:"0px 5px",display:t.isAdmin?"inline-block":"none"}}),e("a",{attrs:{id:"edit"},style:{display:t.isAdmin?"inline-block":"none"}},n.row.$isEdit?"保存":"编辑"),e("span",{style:{height:"10px",borderLeft:"1px solid #39f",margin:"0px 5px",display:t.isAdmin?"inline-block":"none"}}),e("a",{attrs:{id:"focus"}},n.row.isSubscribe?"关注中":"关注")])}}],processData:[],dataTotal:0,pageIndex:1,pageSize:10,processValue:"",showModal:!1,serValue:"",processInfoItem:{fieldValue:"",fieldCode:"biProcessStatus",sort:""},ruleValidate:{fieldValue:[{required:!0,message:"流程状态不能为空",trigger:"blur"}],fieldCode:[{required:!0,message:"流程状态编码不能为空",trigger:"blur"}],sort:[{required:!0,message:"排序值不能为空",trigger:"blur"}]}}},props:{isAdmin:{type:Boolean,default:!1}},methods:{getProcessStatusByListId:function(){var t=this;this.loading=!0,Object(r.N)(this.listId,this.pageIndex,this.pageSize).then(function(e){t.loading=!1,t.processData=e.tableContent,t.dataTotal=e.dataCount})},onPageSizeChange:function(t){this.pageSize=t,this.getProcessStatusByListId()},pageChange:function(t){this.pageIndex=t,this.getProcessStatusByListId()},delProcessStatus:function(t){var e=this,n=[t.row];n[0].listId=this.$route.params.listId,this.$Modal.confirm({title:"确认",content:"确认删除此状态？",onOk:function(){Object(r.k)(n).then(function(t){!0===t.success?(e.getProcessStatusByListId(),e.$Message.info({content:t.message,duration:2})):e.$Message.error({content:t.message,duration:2})})}})},handleSave:function(t){var e=this;t.listId=this.$route.params.listId,Object(r._11)([t]).then(function(t){!0===t.success?e.$Message.info({content:"更新成功",duration:2}):e.$Message.error({content:t.message,duration:2}),e.getProcessStatusByListId()}),this.$set(t,"$isEdit",!1)},handleEdit:function(t){this.$set(t,"$isEdit",!0)},handleIsSubscribe:function(t){var e=this,n=t.id;t.isSubscribe?Object(r._7)(n).then(function(n){n.success&&(e.$Message.success(n.message),e.$set(t,"isSubscribe",0))}):Object(r._6)(n).then(function(n){n.success&&(e.$Message.success(n.message),e.$set(t,"isSubscribe",1))})},addProcessStatus:function(){var t=this;this.processInfoItem.listId=this.$route.params.listId,this.$refs.processInfoItem.validate(function(e){e?Object(r.c)([t.processInfoItem]).then(function(e){!0===e.success?(t.$Message.info("添加成功"),t.getProcessStatusByListId(),t.$refs.processInfoItem.resetFields(),t.processInfoItem.fieldValue="",t.processInfoItem.sort="",t.showModal=!1):t.$Message.error({content:e.message,duration:2})}):t.$Message.error({content:"请输入必填项",duration:2})})},addProcess:function(){this.showModal=!0,this.processInfoItem.fieldValue="",this.processInfoItem.sort=""},search:function(){var t=this;this.loading=!0;var e=[{property:"fieldValue",operator:"like",value:this.serValue}];Object(r._4)(this.listId,this.pageIndex,this.pageSize,o()(e)).then(function(e){t.loading=!1,t.processData=e.tableContent,t.dataTotal=e.dataCount})}},mounted:function(){this.getProcessStatusByListId()}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-process"},[n("Row",{staticClass:"app-process-title"},[n("h3",[t._v("流程状态管理")]),t._v(" "),n("span",{staticClass:"warning-color marlr"},[t._v("管理员用户可以管理状态\n      "),t.isAdmin?n("a",{on:{click:t.addProcess}},[t._v("添加")]):t._e()])]),t._v(" "),n("Row",{staticClass:"app-process-table"},[n("Modal",{attrs:{title:"新增流程状态"},on:{"on-ok":t.addProcessStatus},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[n("Form",{ref:"processInfoItem",attrs:{model:t.processInfoItem,"label-width":100,rules:t.ruleValidate}},[n("FormItem",{attrs:{label:"流程状态:",prop:"fieldValue"}},[n("Input",{model:{value:t.processInfoItem.fieldValue,callback:function(e){t.$set(t.processInfoItem,"fieldValue",e)},expression:"processInfoItem.fieldValue"}})],1),t._v(" "),n("FormItem",{attrs:{label:"排序:",prop:"sort"}},[n("Input",{model:{value:t.processInfoItem.sort,callback:function(e){t.$set(t.processInfoItem,"sort",e)},expression:"processInfoItem.sort"}})],1)],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:"text",size:"large"},on:{click:function(e){t.showModal=!1}}},[t._v("取消")]),t._v(" "),n("Button",{attrs:{type:"primary",size:"large"},on:{click:t.addProcessStatus}},[t._v("确定")])],1)],1),t._v(" "),n("div",{staticClass:"search"},[n("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入流程状态名称",search:!0},on:{"on-search":t.search},model:{value:t.serValue,callback:function(e){t.serValue=e},expression:"serValue"}}),t._v(" "),n("Button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")])],1),t._v(" "),n("Table",{attrs:{loading:t.loading,columns:t.columns,data:t.processData,size:"small"}}),t._v(" "),n("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[n("div",{staticClass:"fr"},[n("Page",{attrs:{total:t.dataTotal,"show-elevator":"","show-sizer":"",current:t.pageIndex,"page-size":t.pageSize,size:"small","show-total":""},on:{"on-page-size-change":t.onPageSizeChange,"on-change":t.pageChange}})],1)])],1)],1)},staticRenderFns:[]};var c=n("VU/8")(a,l,!1,function(t){n("2AJu")},"data-v-488e71ab",null).exports,u=n("oAV5"),d=n("TQvf"),p={name:"appApi",components:{},props:{},data:function(){return{listId:this.$route.params.listId,disabled:!1,collapseValue:"commit",commitApi:{},updateApi:{},viewApi:{},returnMsg:"",columns:[{title:"参数",key:"param",width:200,align:"center"},{title:"必须",key:"required",width:160,align:"center"},{title:"说明",key:"explain"}],viewColumns:[{title:"参数",key:"param",width:200,align:"center"},{title:"说明",key:"explain"}],columns1:[{title:"参数",key:"param1",width:160,align:"center"},{title:"说明",key:"explain1"}],commitData:[],viewData:[],updateData:[],msgData:[],msgText:""}},methods:{copy:function(){var t=new d(".tag-read");t.on("success",function(e){console.log("复制成功"),t.destroy()}),t.on("error",function(e){console.log("该浏览器不支持自动复制"),t.destroy()})},formatData:function(t){var e=void 0,n=void 0,i=[],o=void 0,r=JSON.parse(t).formData,s=r.disallowBlank;for(var a in i.push({explain:"备注",param:"biComment",required:"否"}),i.push({explain:"应用Id",param:"listId",required:"否"}),r)if(e={},"order"==a||"inPut"==a||"outPut"==a)for(var l in n=r[a])if(e={},"dataSet"!==l){for(var c in e.explain=n[l],e.param=l,s)c==l&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}else for(var u in o=n[l][0]){for(var c in(e={}).explain=o[u],e.param=u,s)c==u&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}else if("disallowBlank"!==a){for(var c in e.explain=r[a],e.param=a,s)c==a&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}return i}},mounted:function(){var t=this;Object(r.o)(this.listId).then(function(e){e.commitApi&&e.commitUrl&&(t.commitApi=JSON.parse(e.commitUrl),t.commitApi.body=Object(u.a)(t.commitApi.body),t.commitApi.params=t.formatData(t.commitApi.body)),e.viewApi&&e.viewUrl&&(t.viewApi=JSON.parse(e.viewUrl),t.viewApi.body=Object(u.a)(t.viewApi.body),t.viewApi.params=t.formatData(t.viewApi.body)),e.updateApi&&e.updateUrl&&(t.updateApi=JSON.parse(e.updateUrl),t.updateApi.body=Object(u.a)(t.updateApi.body),t.updateApi.params=t.formatData(t.updateApi.body))}),this.returnMsg={sucess:!0,error:!1},this.msgText=o()(this.returnMsg),this.msgData=[{param1:"sucess",explain1:"请求成功"},{param1:"error",explain1:"请求失败"}]}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg_ff"},[n("Row",{staticClass:"app-resource-group-title"},[n("h3",[t._v("API")])]),t._v(" "),n("section",[n("Collapse",{attrs:{simple:""},model:{value:t.collapseValue,callback:function(e){t.collapseValue=e},expression:"collapseValue"}},[n("Panel",{attrs:{name:"commit"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[t._v("提交")]),t._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求方式:")]),t._v("\n            "+t._s(t.commitApi.method)+"\n          ")]),t._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求地址：")]),t._v("\n            "+t._s(t.commitApi.address)+"\n          ")]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v("            "+t._s(t.commitApi.body)+"\n          ")]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.commitApi.body},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",[t._v("请求参数：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.columns,data:t.commitApi.params}}),t._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("返回结果：")])]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v(t._s(t.returnMsg))]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.msgText},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",{staticStyle:{color:"#333"}},[t._v("参数说明：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.columns1,data:t.msgData}})],1)],1)]),t._v(" "),n("Panel",{attrs:{name:"look"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[t._v("查看")]),t._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求方式:")]),t._v("\n            "+t._s(t.viewApi.method)+"\n          ")]),t._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求地址：")]),t._v("\n            "+t._s(t.viewApi.address)+"\n          ")]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v("            "+t._s(t.viewApi.body)+"\n          ")]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.viewApi.body},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",[t._v("请求参数：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.viewColumns,data:t.viewData}}),t._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("返回结果：")])]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v(t._s(t.returnMsg))]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.msgText},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",{staticStyle:{color:"#333"}},[t._v("参数说明：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.columns1,data:t.msgData}})],1)],1)]),t._v(" "),n("Panel",{attrs:{name:"update"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[t._v("更新")]),t._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求方式:")]),t._v("\n            "+t._s(t.updateApi.method)+"\n          ")]),t._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("请求地址：")]),t._v("\n            "+t._s(t.updateApi.address)+"\n          ")]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v("            "+t._s(t.updateApi.body)+"\n          ")]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.updateApi.body},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",{staticStyle:{color:"#333"}},[t._v("请求参数：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.columns,data:t.updateData}}),t._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[t._v("返回结果：")])]),t._v(" "),n("pre",{staticClass:"api-code"},[t._v(t._s(t.returnMsg))]),t._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":t.msgText},on:{click:t.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:t.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),t._v(" "),n("h3",{staticStyle:{color:"#333"}},[t._v("参数说明：")]),t._v(" "),n("Table",{attrs:{size:"small",columns:t.columns1,data:t.msgData}})],1)],1)])],1)],1)],1)},staticRenderFns:[]};var h=n("VU/8")(p,f,!1,function(t){n("GA6O")},null,null).exports,m={name:"appSubject",components:{},props:{isAdmin:Boolean},data:function(){return{listId:this.$route.params.listId,columns:[{title:"科目名称",key:"accountName",align:"left"},{title:"科目类型",key:"classify",align:"left",render:function(t,e){return 1===e.row.classify?t("span",{},"会计类"):t("span",{},"非会计类")}},{title:"数据归集",key:"dataCollection",align:"left",render:function(t,e){var n=[],i=e.row;if(i.calcRels.forEach(function(t){n.push(t.matchDirectionByDebit)}),1===i.classify){if(n.indexOf(1)>-1&&n.indexOf(-1)>-1)return t("span",{},"借方，贷方");if(n.indexOf(1)>-1)return t("span",{},"借方");if(n.indexOf(-1)>-1)return t("span",{},"贷方")}else{if(n.indexOf(1)>-1&&n.indexOf(-1)>-1)return t("span",{},"增加，减少");if(n.indexOf(1)>-1)return t("span",{},"增加");if(n.indexOf(-1)>-1)return t("span",{},"减少")}}}],subjects:[]}},watch:{},methods:{rerenderSubjectColumns:function(){var t=this;this.columns[this.columns.length-1].render=function(e,n){var i=!1,o=!1;return 1===n.row.classify&&(i=!0),1===n.row.calcRels[0].status&&(o=!0),e("Checkbox",{props:{disabled:i,value:o},on:{"on-change":function(e){t.renderMethod(e,n)}}})}},renderMethod:function(t,e){var n=this,i="";i=t?"确认启用该科目？":"确认禁用该科目？",this.$Modal.confirm({title:"确认",content:i,onOk:function(){e.row.calcRels.forEach(function(t){Object(r.T)(t.componentId).then(function(t){200===t.status&&n.$Message.success("更新成功！")})})},onCancel:function(){n.rerenderSubjectColumns()}})}},created:function(){var t=this;Object(r.y)(this.listId).then(function(e){200===e.status&&(t.subjects=e.data)})}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg_ff",staticStyle:{"margin-bottom":"20px"}},[e("Row",{staticClass:"app-resource-group-title"},[e("h3",[this._v("科目关系")])]),this._v(" "),e("Row",{staticClass:"subject-content"},[e("Table",{attrs:{columns:this.columns,data:this.subjects,size:"small"}})],1)],1)},staticRenderFns:[]};var g=n("VU/8")(m,v,!1,function(t){n("54Lz")},"data-v-514c6a67",null).exports,y=n("DAYN"),b={name:"relatedApp",components:{draggable:n.n(y).a},props:{listId:{type:String},isAdmin:Boolean},data:function(){return{isDragging:!1,delayedDragging:!1,relatedApps:[]}},computed:{dragOptions:function(){return{animation:0,group:"description",disabled:!this.isAdmin,ghostClass:"ghost"}}},watch:{isDragging:function(t){var e=this;t?this.delayedDragging=!0:this.$nextTick(function(){e.delayedDragging=!1,e.saveAppData()})}},methods:{onMove:function(t){var e=t.relatedContext,n=t.draggedContext,i=e.element,o=n.element;return!(i&&i.fixed||o.fixed)},saveAppData:function(){var t=this,e=[];this.relatedApps.forEach(function(t){e.push(t.id)}),e&&Object(r._5)(e.join(",")).then(function(e){e.success&&t.$Message.success(e.message)})},changeAppStatus:function(t,e){var n=this;Object(r.U)(t.id).then(function(t){t.success&&n.$Message.success(t.message)}).catch(function(t){n.$Message.error(t.data.message)})},getRelatedAppData:function(){var t=this;Object(r.O)(this.$route.params.listId).then(function(e){t.relatedApps=e})}},created:function(){this.getRelatedAppData()}},x={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg_ff",staticStyle:{"margin-bottom":"20px"}},[n("Row",{staticClass:"app-resource-group-title"},[n("h3",[t._v("相关应用")])]),t._v(" "),n("Row",{staticClass:"related-app-content",attrs:{gutter:8}},[n("draggable",{attrs:{options:t.dragOptions,move:t.onMove},on:{start:function(e){t.isDragging=!0},end:function(e){t.isDragging=!1}},model:{value:t.relatedApps,callback:function(e){t.relatedApps=e},expression:"relatedApps"}},[n("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.relatedApps,function(e,i){return n("Col",{key:i,staticStyle:{"margin-bottom":"5px"},attrs:{xs:24,sm:12,md:8,lg:5}},[n("Card",{staticClass:"app-card"},[n("img",{staticClass:"card-img",attrs:{src:e.icon}}),t._v(" "),n("div",{staticClass:"card-right"},[n("p",{staticClass:"card-name"},[t._v(t._s(e.listName))]),t._v(" "),n("p",{staticClass:"card-type"},[t._v(t._s(e.transName))])]),t._v(" "),n("Checkbox",{staticClass:"card-check",attrs:{disabled:!t.isAdmin,value:1===e.STATUS},on:{"on-change":function(n){t.changeAppStatus(e,i)}}})],1)],1)}))],1)],1)],1)},staticRenderFns:[]};var _={name:"ConnectionLayout",components:{AppSubject:g,RelatedApp:n("VU/8")(b,x,!1,function(t){n("utm0")},"data-v-018784e0",null).exports,AppApi:h,Process:c},props:{listId:String,appType:String,enabledForbidden:Number,isCompanyAdmin:Boolean,isAdmin:Boolean,isAddress:Boolean}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"connection-layout"},[t.isAddress?t._e():n("app-subject",{attrs:{isAdmin:t.isAdmin}}),t._v(" "),t.isAddress?t._e():n("related-app",{attrs:{isAdmin:t.isAdmin}}),t._v(" "),"obj"===t.appType||"subject"===t.appType||t.isAddress?t._e():n("process",{attrs:{isAdmin:t.isAdmin}}),t._v(" "),n("app-api")],1)},staticRenderFns:[]};var S=n("VU/8")(_,w,!1,function(t){n("fxN/")},"data-v-36b9d833",null);e.default=S.exports},GA6O:function(t,e){},TQvf:function(t,e,n){
/*!
 * clipboard.js v2.0.1
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
var i;i=function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){var i,o,r,s;s=function(t,e){"use strict";var n,i=(n=e)&&n.__esModule?n:{default:n};var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.resolveOptions(e),this.initSelection()}return r(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=s},o=[t,n(7)],void 0===(r="function"==typeof(i=s)?i.apply(e,o):i)||(t.exports=r)},function(t,e,n){var i=n(6),o=n(5);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!i.string(e))throw new TypeError("Second argument must be a String");if(!i.fn(n))throw new TypeError("Third argument must be a Function");if(i.node(t))return function(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}(t,e,n);if(i.nodeList(t))return function(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}(t,e,n);if(i.string(t))return function(t,e,n){return o(document.body,t,e,n)}(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var r=0,s=i.length;r<s;r++)i[r].fn!==e&&i[r].fn._!==e&&o.push(i[r]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},function(t,e,n){var i,o,r,s;s=function(t,e,n,i){"use strict";var o=a(e),r=a(n),s=a(i);function a(t){return t&&t.__esModule?t:{default:t}}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var u=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r.default),c(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===l(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,s.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new o.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return d("action",t)}},{key:"defaultTarget",value:function(t){var e=d("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return d("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}();function d(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=u},o=[t,n(0),n(2),n(1)],void 0===(r="function"==typeof(i=s)?i.apply(e,o):i)||(t.exports=r)},function(t,e){var n=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var i=Element.prototype;i.matches=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector}t.exports=function(t,e){for(;t&&t.nodeType!==n;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){var i=n(4);function o(t,e,n,o,r){var s=function(t,e,n,o){return function(n){n.delegateTarget=i(n.target,e),n.delegateTarget&&o.call(t,n)}}.apply(this,arguments);return t.addEventListener(n,s,r),{destroy:function(){t.removeEventListener(n,s,r)}}}t.exports=function(t,e,n,i,r){return"function"==typeof t.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return o(t,e,n,i,r)}))}},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}}])},t.exports=i()},"fxN/":function(t,e){},utm0:function(t,e){}});