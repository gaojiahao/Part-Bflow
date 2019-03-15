webpackJsonp([11],{"2AJu":function(t,e){},DAYN:function(n,t,i){"use strict";var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function d(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}!function(){function t(i){function o(t){t.parentElement.removeChild(t)}function a(t,e,n){var i=0===n?t.children[0]:t.children[n-1].nextSibling;t.insertBefore(e,i)}function r(t,e){var n=this;this.$nextTick(function(){return n.$emit(t.toLowerCase(),e)})}var s=["Start","Add","Remove","Update","End"],c=["Choose","Sort","Filter","Clone"],n=["Move"].concat(s,c).map(function(t){return"on"+t}),l=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var e=this.$slots.default;if(e&&1===e.length){var n=e[0];n.componentOptions&&"transition-group"===n.componentOptions.tag&&(this.transitionMode=!0)}var i=e,o=this.$slots.footer;o&&(i=e?[].concat(d(e),d(o)):[].concat(d(o)));var a=null,r=function(t,e){var n,i,o;n=a,i=t,null==(o=e)||((n=null==n?{}:n)[i]=o),a=n};if(r("attrs",this.$attrs),this.componentData){var s=this.componentData,c=s.on,l=s.props;r("on",c),r("props",l)}return t(this.element,a,i)},mounted:function(){var n=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var e={};s.forEach(function(t){e["on"+t]=function(e){var n=this;return function(t){null!==n.realList&&n["onDrag"+e](t),r.call(n,e,t)}}.call(n,t)}),c.forEach(function(t){e["on"+t]=r.bind(n,t)});var t=u({},this.options,e,{onMove:function(t,e){return n.onDragMove(t,e)}});!("draggable"in t)&&(t.draggable=">*"),this._sortable=new i(this.rootContainer,t),this.computeIndexes()},beforeDestroy:function(){this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var e in t)-1==n.indexOf(e)&&this._sortable.option(e,t[e])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,e,n){if(!t)return[];var i=t.map(function(t){return t.elm}),o=[].concat(d(e)).map(function(t){return i.indexOf(t)});return n?o.filter(function(t){return-1!==t}):o}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var e,n,i=(e=this.getChildrenNodes()||[],n=t,e.map(function(t){return t.elm}).indexOf(n));return-1===i?null:{index:i,element:this.realList[i]}},getUnderlyingPotencialDraggableComponent:function(t){var e=t.__vue__;return e&&e.$options&&"transition-group"===e.$options._componentTag?e.$parent:e},emitChanges:function(t){var e=this;this.$nextTick(function(){e.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var e=[].concat(d(this.value));t(e),this.$emit("input",e)}},spliceList:function(){var e=arguments,t=function(t){return t.splice.apply(t,e)};this.alterList(t)},updatePosition:function(e,n){var t=function(t){return t.splice(n,0,t.splice(e,1)[0])};this.alterList(t)},getRelatedContextFromMoveEvent:function(t){var e=t.to,n=t.related,i=this.getUnderlyingPotencialDraggableComponent(e);if(!i)return{component:i};var o=i.realList,a={list:o,component:i};if(e!==n&&o&&i.getUnderlyingVm){var r=i.getUnderlyingVm(n);if(r)return u(r,a)}return a},getVmIndex:function(t){var e=this.visibleIndexes,n=e.length;return n-1<t?n:e[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),l=t.item},onDragAdd:function(t){var e=t.item._underlying_vm_;if(void 0!==e){o(t.item);var n=this.getVmIndex(t.newIndex);this.spliceList(n,0,e),this.computeIndexes();var i={element:e,newIndex:n};this.emitChanges({added:i})}},onDragRemove:function(t){if(a(this.rootContainer,t.item,t.oldIndex),this.isCloning)o(t.clone);else{var e=this.context.index;this.spliceList(e,1);var n={element:this.context.element,oldIndex:e};this.resetTransitionData(e),this.emitChanges({removed:n})}},onDragUpdate:function(t){o(t.item),a(t.from,t.item,t.oldIndex);var e=this.context.index,n=this.getVmIndex(t.newIndex);this.updatePosition(e,n);var i={element:this.context.element,oldIndex:e,newIndex:n};this.emitChanges({moved:i})},computeFutureIndex:function(t,e){if(!t.element)return 0;var n=[].concat(d(e.to.children)).filter(function(t){return"none"!==t.style.display}),i=n.indexOf(e.related),o=t.component.getVmIndex(i);return-1!=n.indexOf(l)||!e.willInsertAfter?o:o+1},onDragMove:function(t,e){var n=this.move;if(!n||!this.realList)return!0;var i=this.getRelatedContextFromMoveEvent(t),o=this.context,a=this.computeFutureIndex(i,t);return u(o,{futureIndex:a}),u(t,{relatedContext:i,draggedContext:o}),n(t,e)},onDragEnd:function(t){this.computeIndexes(),l=null}}}}Array.from||(Array.from=function(t){return[].slice.call(t)});var e=i("Lokx");n.exports=t(e)}()},Fc4D:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("mvHQ"),o=n.n(i),r=n("GIAq"),a={border:"none",borderBottom:"1px solid #c5c8ce",backgroundColor:"#fff",outline:"none",padding:"0 5px",height:"30px"},s={data:function(){var i=this;return{listId:this.$route.params.listId,type:"list",loading:!1,columns:[{title:"流程状态",key:"fieldValue",width:180,align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.fieldValue},style:a,on:{input:function(t){e.row.fieldValue=t.target.value}}}):t("div",e.row.fieldValue)}},{title:"排序",key:"sort",width:100,align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.sort},attrs:{type:"number",min:"1",max:"100"},style:a,on:{input:function(t){e.row.sort=t.target.value}}}):t("div",e.row.sort)}},{title:"标准周期(小时)",width:180,key:"delayHour",align:"center",render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.delayHour},attrs:{type:"number",min:"1",max:"100"},style:a,on:{input:function(t){e.row.delayHour=t.target.value}}}):t("div",e.row.delayHour)}},{title:"操作",key:"opt",align:"center",render:function(t,n){return t("div",{on:{click:function(t){var e=i;switch((t.target||t.srcElement).id){case"delete":e.delProcessStatus(n);break;case"edit":n.row.$isEdit?e.handleSave(n.row):e.handleEdit(n.row);break;case"focus":e.handleIsSubscribe(n.row)}}}},[t("a",{attrs:{id:"delete"},style:{display:i.isAdmin?"inline-block":"none"}},"删除"),t("span",{style:{height:"10px",borderLeft:"1px solid #39f",margin:"0px 5px",display:i.isAdmin?"inline-block":"none"}}),t("a",{attrs:{id:"edit"},style:{display:i.isAdmin?"inline-block":"none"}},n.row.$isEdit?"保存":"编辑"),t("span",{style:{height:"10px",borderLeft:"1px solid #39f",margin:"0px 5px",display:i.isAdmin?"inline-block":"none"}}),t("a",{attrs:{id:"focus"}},n.row.isSubscribe?"关注中":"关注")])}}],processData:[],dataTotal:0,pageIndex:1,pageSize:10,processValue:"",showModal:!1,serValue:"",processInfoItem:{fieldValue:"",fieldCode:"biProcessStatus",sort:""},ruleValidate:{fieldValue:[{required:!0,message:"流程状态不能为空",trigger:"blur"}],fieldCode:[{required:!0,message:"流程状态编码不能为空",trigger:"blur"}],sort:[{required:!0,message:"排序值不能为空",trigger:"blur"}]}}},props:{isAdmin:{type:Boolean,default:!1}},methods:{getProcessStatusByListId:function(){var e=this;this.loading=!0,Object(r.T)(this.listId,this.pageIndex,this.pageSize).then(function(t){e.loading=!1,e.processData=t.tableContent,e.dataTotal=t.dataCount})},onPageSizeChange:function(t){this.pageSize=t,this.getProcessStatusByListId()},pageChange:function(t){this.pageIndex=t,this.getProcessStatusByListId()},delProcessStatus:function(t){var e=this,n=[t.row];n[0].listId=this.$route.params.listId,this.$Modal.confirm({title:"确认",content:"确认删除此状态？",onOk:function(){Object(r.m)(n).then(function(t){!0===t.success?(e.getProcessStatusByListId(),e.$Message.info({content:t.message,duration:2})):e.$Message.error({content:t.message,duration:2})})}})},handleSave:function(t){var e=this;t.listId=this.$route.params.listId,Object(r._23)([t]).then(function(t){!0===t.success?e.$Message.info({content:"更新成功",duration:2}):e.$Message.error({content:t.message,duration:2}),e.getProcessStatusByListId()}),this.$set(t,"$isEdit",!1)},handleEdit:function(t){this.$set(t,"$isEdit",!0)},handleIsSubscribe:function(e){var n=this,t=e.id;e.isSubscribe?Object(r._17)(t).then(function(t){t.success&&(n.$Message.success(t.message),n.$set(e,"isSubscribe",0))}):Object(r._16)(t).then(function(t){t.success&&(n.$Message.success(t.message),n.$set(e,"isSubscribe",1))})},addProcessStatus:function(){var e=this;this.processInfoItem.listId=this.$route.params.listId,this.$refs.processInfoItem.validate(function(t){t?Object(r.c)([e.processInfoItem]).then(function(t){!0===t.success?(e.$Message.info("添加成功"),e.getProcessStatusByListId(),e.$refs.processInfoItem.resetFields(),e.processInfoItem.fieldValue="",e.processInfoItem.sort="",e.showModal=!1):e.$Message.error({content:t.message,duration:2})}):e.$Message.error({content:"请输入必填项",duration:2})})},addProcess:function(){this.showModal=!0,this.processInfoItem.fieldValue="",this.processInfoItem.sort=""},search:function(){var e=this;this.loading=!0;var t=[{property:"fieldValue",operator:"like",value:this.serValue}];Object(r._13)(this.listId,this.pageIndex,this.pageSize,o()(t)).then(function(t){e.loading=!1,e.processData=t.tableContent,e.dataTotal=t.dataCount})}},mounted:function(){this.getProcessStatusByListId()}},c=n("gV92"),l=n.n(c);var u=function(t){n("2AJu")},d=n("VU/8")(s,l.a,!1,u,"data-v-488e71ab",null).exports,p=n("oAV5"),f=n("TQvf"),h={name:"appApi",components:{},props:{},data:function(){return{listId:this.$route.params.listId,disabled:!1,collapseValue:"commit",commitApi:{},updateApi:{},viewApi:{},returnMsg:"",columns:[{title:"参数",key:"param",width:200,align:"center"},{title:"必须",key:"required",width:160,align:"center"},{title:"说明",key:"explain"}],viewColumns:[{title:"参数",key:"param",width:200,align:"center"},{title:"说明",key:"explain"}],columns1:[{title:"参数",key:"param1",width:160,align:"center"},{title:"说明",key:"explain1"}],commitData:[],viewData:[],updateData:[],msgData:[],msgText:""}},methods:{copy:function(){var e=new f(".tag-read");e.on("success",function(t){console.log("复制成功"),e.destroy()}),e.on("error",function(t){console.log("该浏览器不支持自动复制"),e.destroy()})},formatData:function(t){var e=void 0,n=void 0,i=[],o=void 0,a=JSON.parse(t).formData,r=a.disallowBlank;for(var s in i.push({explain:"备注",param:"biComment",required:"否"}),i.push({explain:"应用Id",param:"listId",required:"否"}),a)if(e={},"order"==s||"inPut"==s||"outPut"==s)for(var c in n=a[s])if(e={},"dataSet"!==c){for(var l in e.explain=n[c],e.param=c,r)l==c&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}else for(var u in o=n[c][0]){for(var l in(e={}).explain=o[u],e.param=u,r)l==u&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}else if("disallowBlank"!==s){for(var l in e.explain=a[s],e.param=s,r)l==s&&(e.required="是");e.hasOwnProperty("required")||(e.required="否"),i.push(e)}return i}},mounted:function(){var e=this;Object(r.q)(this.listId).then(function(t){t.commitApi&&t.commitUrl&&(e.commitApi=JSON.parse(t.commitUrl),e.commitApi.body=Object(p.a)(e.commitApi.body),e.commitApi.params=e.formatData(e.commitApi.body)),t.viewApi&&t.viewUrl&&(e.viewApi=JSON.parse(t.viewUrl),e.viewApi.body=Object(p.a)(e.viewApi.body),e.viewApi.params=e.formatData(e.viewApi.body)),t.updateApi&&t.updateUrl&&(e.updateApi=JSON.parse(t.updateUrl),e.updateApi.body=Object(p.a)(e.updateApi.body),e.updateApi.params=e.formatData(e.updateApi.body))}),this.returnMsg={sucess:!0,error:!1},this.msgText=o()(this.returnMsg),this.msgData=[{param1:"sucess",explain1:"请求成功"},{param1:"error",explain1:"请求失败"}]}},m=n("iyik"),v=n.n(m);var g=function(t){n("GA6O")},y=n("VU/8")(h,v.a,!1,g,null,null).exports,b={name:"appSubject",components:{},props:{isAdmin:Boolean,appTransType:String},data:function(){var o=this;return{listId:this.$route.params.listId,columns:[{title:"科目名称",key:"accountName",align:"left"},{title:"科目类型",key:"classify",align:"left",render:function(t,e){return 1===e.row.accountType?t("span",{},"会计类"):t("span",{},"非会计类")}},{title:"子科目",key:"calcRelName",align:"left"},{title:"子科目状态",key:"accountStatus",align:"left",render:function(t,e){return 0===e.row.accountStatus?t("span",{style:{"font-weight":"bold",color:"#adabab"}},"禁用"):t("span",{},"启用")}},{title:"数据归集",key:"dataCollection",align:"left",render:function(t,e){return 1===e.row.accountType?1===e.row.checkDirection?t("span",{},"借方"):t("span",{},"贷方"):1===e.row.checkDirection?t("span",{},"增加"):t("span",{},"减少")}},{title:"关系管理",key:"status",align:"left",render:function(t,e){var n=!1;return 0!==e.row.accountStatus&&1!==e.row.accountType||(n=!0),t("Checkbox",{props:{value:1===e.row.status,disabled:!o.isAdmin||n},on:{"on-change":function(t){o.updateAccountRelation(t,e,"relation")}}},"启用")}},{title:"核销方式",key:"matchType",align:"left",render:function(t,e){var n=!1;return 0!==e.row.accountStatus&&1!==e.row.accountType||(n=!0),t("Checkbox",{props:{value:2===e.row.matchType,disabled:!o.isAdmin||n},on:{"on-change":function(t){o.updateAccountRelation(t,e,"matchType")}}},"按单核销")}},{title:"余额校验",key:"allowedNegative",align:"left",render:function(e,n){var t=!1,i=[];return 0!==n.row.accountStatus&&1!==n.row.accountType||(t=!0),0===n.row.accountType&&1===n.row.checkDirection&&(t=!0),[{name:"允许大于余额",value:1},{name:"不允许大于余额",value:0},{name:"允许一次大于余额",value:-1}].forEach(function(t){i.push(e("Option",{props:{value:t.value}},t.name))}),e("div",[e("Select",{props:{value:n.row.allowedNegative,disabled:!o.isAdmin||t},on:{"on-change":function(t){o.updateAccountRelation(t,n,"allowedNegative")}}},i)])}},{title:"主动核销",key:"verification",align:"left",render:function(t,e){var n=!1;return 0!==e.row.accountStatus&&1!==e.row.accountType||(n=!0),0===e.row.accountType&&-1===e.row.checkDirection&&(n=!0),t("Checkbox",{props:{value:e.row.verification,disabled:!o.isAdmin||n},on:{"on-change":function(t){o.updateAccountRelation(t,e,"verification")}}},"启用")}}],subjects:[]}},watch:{},methods:{updateAccountRelation:function(t,e,n){var i=this,o={},a=void 0;switch(a=this.appTransType?this.appTransType:localStorage.getItem("appTransType"),o.calcRelCode=e.row.calcRelCode,o.componentId=e.row.componentId,o.transType=a,o.appId=this.listId,o.verification=e.row.verification,o.status=e.row.status,o.allowedNegative=e.row.allowedNegative,o.matchType=e.row.matchType,n){case"relation":o.status=t?1:0;break;case"matchType":o.matchType=t?2:1;break;case"verification":o.verification=t;break;case"allowedNegative":o.allowedNegative=t}Object(r._18)(o).then(function(t){t.success?(i.$Message.success(t.message),i.getAllAppSubjectData()):i.$Message.error(t.message)})},getAllAppSubjectData:function(){var e=this,t=void 0;t=this.appTransType?this.appTransType:localStorage.getItem("appTransType"),localStorage.setItem("appTransType",this.appTransType),Object(r.B)(this.listId,t).then(function(t){t.success?e.subjects=t.obj:e.$Message.error(t.message)})}},created:function(){this.getAllAppSubjectData()}},x=n("pkeh"),w=n.n(x);var _=function(t){n("UuQM")},S=n("VU/8")(b,w.a,!1,_,"data-v-884c4706",null).exports,A=n("DAYN"),k={name:"relatedApp",components:{draggable:n.n(A).a},props:{listId:{type:String},isAdmin:Boolean},data:function(){return{isDragging:!1,delayedDragging:!1,relatedApps:[]}},computed:{dragOptions:function(){return{animation:0,group:"description",disabled:!this.isAdmin,ghostClass:"ghost"}}},watch:{isDragging:function(t){var e=this;t?this.delayedDragging=!0:this.$nextTick(function(){e.delayedDragging=!1,e.saveAppData()})}},methods:{onMove:function(t){var e=t.relatedContext,n=t.draggedContext,i=e.element,o=n.element;return!(i&&i.fixed||o.fixed)},saveAppData:function(){var e=this,n=[];this.relatedApps.forEach(function(t){n.push(t.id)}),n&&Object(r._14)(n.join(",")).then(function(t){t.success&&e.$Message.success(t.message)})},changeAppStatus:function(t,e){var n=this;Object(r._1)(t.id).then(function(t){t.success&&n.$Message.success(t.message)}).catch(function(t){n.$Message.error(t.data.message)})},getRelatedAppData:function(){var e=this;Object(r.U)(this.$route.params.listId).then(function(t){e.relatedApps=t})}},created:function(){this.getRelatedAppData()}},I=n("rSA6"),T=n.n(I);var C=function(t){n("x4V7")},E={name:"ConnectionLayout",components:{AppSubject:S,RelatedApp:n("VU/8")(k,T.a,!1,C,"data-v-439016f8",null).exports,AppApi:y,Process:d},props:{listId:String,appType:String,appTransType:String,enabledForbidden:Number,isCompanyAdmin:Boolean,isAdmin:Boolean,isAddress:Boolean}},M=n("w+el"),$=n.n(M);var O=function(t){n("bMcS")},D=n("VU/8")(E,$.a,!1,O,"data-v-a43f5eb6",null);e.default=D.exports},GA6O:function(t,e){},TQvf:function(t,e,n){var i;i=function(){return function(n){var i={};function o(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=i,o.i=function(t){return t},o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t,e,n){var i,o,a,r;r=function(t,e){"use strict";var n,i=(n=e)&&n.__esModule?n:{default:n};var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var a=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),r=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),e}();t.exports=r},o=[t,n(7)],void 0===(a="function"==typeof(i=r)?i.apply(e,o):i)||(t.exports=a)},function(t,e,n){var p=n(6),f=n(5);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!p.string(e))throw new TypeError("Second argument must be a String");if(!p.fn(n))throw new TypeError("Third argument must be a Function");if(p.node(t))return u=e,d=n,(l=t).addEventListener(u,d),{destroy:function(){l.removeEventListener(u,d)}};if(p.nodeList(t))return r=t,s=e,c=n,Array.prototype.forEach.call(r,function(t){t.addEventListener(s,c)}),{destroy:function(){Array.prototype.forEach.call(r,function(t){t.removeEventListener(s,c)})}};if(p.string(t))return i=t,o=e,a=n,f(document.body,i,o,a);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var i,o,a,r,s,c,l,u,d}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var a=0,r=i.length;a<r;a++)i[a].fn!==e&&i[a].fn._!==e&&o.push(i[a]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},function(t,e,n){var i,o,a,r;r=function(t,e,n,i){"use strict";var o=s(e),a=s(n),r=s(i);function s(t){return t&&t.__esModule?t:{default:t}}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var l=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}();var u=function(t){function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return n.resolveOptions(e),n.listenClick(t),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(i,a.default),l(i,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===c(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,r.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new o.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return d("action",t)}},{key:"defaultTarget",value:function(t){var e=d("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return d("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),i}();function d(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=u},o=[t,n(0),n(2),n(1)],void 0===(a="function"==typeof(i=r)?i.apply(e,o):i)||(t.exports=a)},function(t,e){var n=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var i=Element.prototype;i.matches=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector}t.exports=function(t,e){for(;t&&t.nodeType!==n;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){var r=n(4);function a(t,e,n,i,o){var a=function(e,n,t,i){return function(t){t.delegateTarget=r(t.target,n),t.delegateTarget&&i.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,a,o),{destroy:function(){t.removeEventListener(n,a,o)}}}t.exports=function(t,e,n,i,o){return"function"==typeof t.addEventListener?a.apply(null,arguments):"function"==typeof n?a.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return a(t,e,n,i,o)}))}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}}])},t.exports=i()},UuQM:function(t,e){},bMcS:function(t,e){},gV92:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-process"},[n("Row",{staticClass:"app-process-title"},[n("h3",[e._v("流程状态管理")]),e._v(" "),n("span",{staticClass:"warning-color marlr"},[e._v("管理员用户可以管理状态\n      "),e.isAdmin?n("a",{on:{click:e.addProcess}},[e._v("添加")]):e._e()])]),e._v(" "),n("Row",{staticClass:"app-process-table"},[n("Modal",{attrs:{title:"新增流程状态"},on:{"on-ok":e.addProcessStatus},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[n("Form",{ref:"processInfoItem",attrs:{model:e.processInfoItem,"label-width":100,rules:e.ruleValidate}},[n("FormItem",{attrs:{label:"流程状态:",prop:"fieldValue"}},[n("Input",{model:{value:e.processInfoItem.fieldValue,callback:function(t){e.$set(e.processInfoItem,"fieldValue",t)},expression:"processInfoItem.fieldValue"}})],1),e._v(" "),n("FormItem",{attrs:{label:"排序:",prop:"sort"}},[n("Input",{model:{value:e.processInfoItem.sort,callback:function(t){e.$set(e.processInfoItem,"sort",t)},expression:"processInfoItem.sort"}})],1)],1),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:"text",size:"large"},on:{click:function(t){e.showModal=!1}}},[e._v("取消")]),e._v(" "),n("Button",{attrs:{type:"primary",size:"large"},on:{click:e.addProcessStatus}},[e._v("确定")])],1)],1),e._v(" "),n("div",{staticClass:"search"},[n("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入流程状态名称",search:!0},on:{"on-search":e.search},model:{value:e.serValue,callback:function(t){e.serValue=t},expression:"serValue"}}),e._v(" "),n("Button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("查询")])],1),e._v(" "),n("Table",{attrs:{loading:e.loading,columns:e.columns,data:e.processData,size:"small"}}),e._v(" "),n("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[n("div",{staticClass:"fr"},[n("Page",{attrs:{total:e.dataTotal,"show-elevator":"","show-sizer":"",current:e.pageIndex,"page-size":e.pageSize,size:"small","show-total":""},on:{"on-page-size-change":e.onPageSizeChange,"on-change":e.pageChange}})],1)])],1)],1)},staticRenderFns:[]}},iyik:function(t,e){t.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bg_ff"},[n("Row",{staticClass:"app-resource-group-title"},[n("h3",[e._v("API")])]),e._v(" "),n("section",[n("Collapse",{attrs:{simple:""},model:{value:e.collapseValue,callback:function(t){e.collapseValue=t},expression:"collapseValue"}},[n("Panel",{attrs:{name:"commit"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[e._v("提交")]),e._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求方式:")]),e._v("\n            "+e._s(e.commitApi.method)+"\n          ")]),e._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求地址：")]),e._v("\n            "+e._s(e.commitApi.address)+"\n          ")]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v("            "+e._s(e.commitApi.body)+"\n          ")]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.commitApi.body},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",[e._v("请求参数：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.columns,data:e.commitApi.params}}),e._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("返回结果：")])]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v(e._s(e.returnMsg))]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.msgText},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",{staticStyle:{color:"#333"}},[e._v("参数说明：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.columns1,data:e.msgData}})],1)],1)]),e._v(" "),n("Panel",{attrs:{name:"look"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[e._v("查看")]),e._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求方式:")]),e._v("\n            "+e._s(e.viewApi.method)+"\n          ")]),e._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求地址：")]),e._v("\n            "+e._s(e.viewApi.address)+"\n          ")]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v("            "+e._s(e.viewApi.body)+"\n          ")]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.viewApi.body},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",[e._v("请求参数：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.viewColumns,data:e.viewData}}),e._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("返回结果：")])]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v(e._s(e.returnMsg))]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.msgText},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",{staticStyle:{color:"#333"}},[e._v("参数说明：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.columns1,data:e.msgData}})],1)],1)]),e._v(" "),n("Panel",{attrs:{name:"update"}},[n("strong",{staticStyle:{"font-weight":"700","font-size":"14px",color:"#333"}},[e._v("更新")]),e._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求方式:")]),e._v("\n            "+e._s(e.updateApi.method)+"\n          ")]),e._v(" "),n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("请求地址：")]),e._v("\n            "+e._s(e.updateApi.address)+"\n          ")]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v("            "+e._s(e.updateApi.body)+"\n          ")]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"70px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.updateApi.body},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",{staticStyle:{color:"#333"}},[e._v("请求参数：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.columns,data:e.updateData}}),e._v(" "),n("div",{staticStyle:{position:"relative"}},[n("p",{staticStyle:{"font-size":"14px",color:"#333"}},[n("strong",{staticStyle:{"font-weight":"700"}},[e._v("返回结果：")])]),e._v(" "),n("pre",{staticClass:"api-code"},[e._v(e._s(e.returnMsg))]),e._v(" "),n("div",{staticClass:"tag-read",staticStyle:{position:"absolute",top:"40px",right:"20px",cursor:"pointer"},attrs:{"data-clipboard-text":e.msgText},on:{click:e.copy}},[n("Tooltip",{attrs:{placement:"top",content:"点击复制",disabled:e.disabled}},[n("Icon",{attrs:{type:"md-document",size:"24"}})],1)],1),e._v(" "),n("h3",{staticStyle:{color:"#333"}},[e._v("参数说明：")]),e._v(" "),n("Table",{attrs:{size:"small",columns:e.columns1,data:e.msgData}})],1)],1)])],1)],1)],1)},staticRenderFns:[]}},pkeh:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg_ff",staticStyle:{"margin-bottom":"20px"}},[n("Row",{staticClass:"app-resource-group-title"},[n("h3",[t._v("科目关系")])]),t._v(" "),n("Row",{staticClass:"subject-content"},[n("Table",{attrs:{columns:t.columns,data:t.subjects,size:"small"}})],1)],1)},staticRenderFns:[]}},rSA6:function(t,e){t.exports={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"bg_ff",staticStyle:{"margin-bottom":"20px"}},[i("Row",{staticClass:"app-resource-group-title"},[i("h3",[n._v("相关应用")])]),n._v(" "),i("Row",{staticClass:"related-app-content",attrs:{gutter:8}},[i("draggable",{attrs:{options:n.dragOptions,move:n.onMove},on:{start:function(t){n.isDragging=!0},end:function(t){n.isDragging=!1}},model:{value:n.relatedApps,callback:function(t){n.relatedApps=t},expression:"relatedApps"}},[i("transition-group",{attrs:{type:"transition",name:"flip-list"}},n._l(n.relatedApps,function(e){return i("Col",{key:e.sort,staticStyle:{"margin-bottom":"5px"},attrs:{xs:24,sm:12,md:8,lg:5}},[i("Card",{staticClass:"app-card"},[i("img",{staticClass:"card-img",attrs:{src:e.icon}}),n._v(" "),i("div",{staticClass:"card-right"},[i("p",{staticClass:"card-name"},[n._v(n._s(e.listName))]),n._v(" "),i("p",{staticClass:"card-type"},[n._v(n._s(e.appName))])]),n._v(" "),i("Checkbox",{staticClass:"card-check",attrs:{disabled:!n.isAdmin,value:1===e.STATUS},on:{"on-change":function(t){n.changeAppStatus(e,e.sort)}}})],1)],1)}))],1),n._v(" "),0===n.relatedApps.length?i("p",{staticStyle:{"text-align":"center"}},[n._v("暂无相关应用")]):n._e()],1)],1)},staticRenderFns:[]}},"w+el":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"connection-layout"},[t.isAddress||"business"!==t.appType?t._e():n("app-subject",{attrs:{isAdmin:t.isAdmin,appTransType:t.appTransType}}),t._v(" "),t.isAddress?t._e():n("related-app",{attrs:{isAdmin:t.isAdmin}}),t._v(" "),"obj"===t.appType||"subject"===t.appType||t.isAddress?t._e():n("process",{attrs:{isAdmin:t.isAdmin}}),t._v(" "),n("app-api")],1)},staticRenderFns:[]}},x4V7:function(t,e){}});