webpackJsonp([5],{"Bo/i":function(t,e){},DAYN:function(o,t,i){"use strict";var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t};function u(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}return Array.from(t)}!function(){function t(i){function n(t){t.parentElement.removeChild(t)}function a(t,e,o){var i=0===o?t.children[0]:t.children[o-1].nextSibling;t.insertBefore(e,i)}function r(t,e){var o=this;this.$nextTick(function(){return o.$emit(t.toLowerCase(),e)})}var s=["Start","Add","Remove","Update","End"],l=["Choose","Sort","Filter","Clone"],o=["Move"].concat(s,l).map(function(t){return"on"+t}),d=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var e=this.$slots.default;if(e&&1===e.length){var o=e[0];o.componentOptions&&"transition-group"===o.componentOptions.tag&&(this.transitionMode=!0)}var i=e,n=this.$slots.footer;n&&(i=e?[].concat(u(e),u(n)):[].concat(u(n)));var a=null,r=function(t,e){var o,i,n;o=a,i=t,null==(n=e)||((o=null==o?{}:o)[i]=n),a=o};if(r("attrs",this.$attrs),this.componentData){var s=this.componentData,l=s.on,d=s.props;r("on",l),r("props",d)}return t(this.element,a,i)},mounted:function(){var o=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var e={};s.forEach(function(t){e["on"+t]=function(e){var o=this;return function(t){null!==o.realList&&o["onDrag"+e](t),r.call(o,e,t)}}.call(o,t)}),l.forEach(function(t){e["on"+t]=r.bind(o,t)});var t=c({},this.options,e,{onMove:function(t,e){return o.onDragMove(t,e)}});!("draggable"in t)&&(t.draggable=">*"),this._sortable=new i(this.rootContainer,t),this.computeIndexes()},beforeDestroy:function(){this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var e in t)-1==o.indexOf(e)&&this._sortable.option(e,t[e])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,e,o){if(!t)return[];var i=t.map(function(t){return t.elm}),n=[].concat(u(e)).map(function(t){return i.indexOf(t)});return o?n.filter(function(t){return-1!==t}):n}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var e,o,i=(e=this.getChildrenNodes()||[],o=t,e.map(function(t){return t.elm}).indexOf(o));return-1===i?null:{index:i,element:this.realList[i]}},getUnderlyingPotencialDraggableComponent:function(t){var e=t.__vue__;return e&&e.$options&&"transition-group"===e.$options._componentTag?e.$parent:e},emitChanges:function(t){var e=this;this.$nextTick(function(){e.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var e=[].concat(u(this.value));t(e),this.$emit("input",e)}},spliceList:function(){var e=arguments,t=function(t){return t.splice.apply(t,e)};this.alterList(t)},updatePosition:function(e,o){var t=function(t){return t.splice(o,0,t.splice(e,1)[0])};this.alterList(t)},getRelatedContextFromMoveEvent:function(t){var e=t.to,o=t.related,i=this.getUnderlyingPotencialDraggableComponent(e);if(!i)return{component:i};var n=i.realList,a={list:n,component:i};if(e!==o&&n&&i.getUnderlyingVm){var r=i.getUnderlyingVm(o);if(r)return c(r,a)}return a},getVmIndex:function(t){var e=this.visibleIndexes,o=e.length;return o-1<t?o:e[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),d=t.item},onDragAdd:function(t){var e=t.item._underlying_vm_;if(void 0!==e){n(t.item);var o=this.getVmIndex(t.newIndex);this.spliceList(o,0,e),this.computeIndexes();var i={element:e,newIndex:o};this.emitChanges({added:i})}},onDragRemove:function(t){if(a(this.rootContainer,t.item,t.oldIndex),this.isCloning)n(t.clone);else{var e=this.context.index;this.spliceList(e,1);var o={element:this.context.element,oldIndex:e};this.resetTransitionData(e),this.emitChanges({removed:o})}},onDragUpdate:function(t){n(t.item),a(t.from,t.item,t.oldIndex);var e=this.context.index,o=this.getVmIndex(t.newIndex);this.updatePosition(e,o);var i={element:this.context.element,oldIndex:e,newIndex:o};this.emitChanges({moved:i})},computeFutureIndex:function(t,e){if(!t.element)return 0;var o=[].concat(u(e.to.children)).filter(function(t){return"none"!==t.style.display}),i=o.indexOf(e.related),n=t.component.getVmIndex(i);return-1!=o.indexOf(d)||!e.willInsertAfter?n:n+1},onDragMove:function(t,e){var o=this.move;if(!o||!this.realList)return!0;var i=this.getRelatedContextFromMoveEvent(t),n=this.context,a=this.computeFutureIndex(i,t);return c(n,{futureIndex:a}),c(t,{relatedContext:i,draggedContext:n}),o(t,e)},onDragEnd:function(t){this.computeIndexes(),d=null}}}}Array.from||(Array.from=function(t){return[].slice.call(t)});var e=i("Lokx");o.exports=t(e)}()},sxbC:function(t,e){t.exports={render:function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{staticClass:"workguide"},[n("Row",{staticClass:"workguide-title"},[n("span",[n("b",{staticStyle:{color:"#e4393c","margin-left":"-9px"}},[i._v("*")]),i._v("标题：")]),i._v(" "),n("Input",{staticStyle:{width:"300px"},model:{value:i.workGuideData.title,callback:function(t){i.$set(i.workGuideData,"title",t)},expression:"workGuideData.title"}})],1),i._v(" "),this.$route.params.id?n("Row",{staticClass:"workguide-type"},[n("img",{attrs:{src:i.workGuideData.creatorImage?i.workGuideData.creatorImage:"resources/images/icon/defaultUserPhoto.png"},on:{error:i.errorimg}}),i._v(" "),n("span",{staticClass:"workguide-type-worktype"},[i._v(i._s(i.workGuideData.creatorName))]),i._v(" "),n("span",{staticClass:"workguide-type-crtTime"},[i._v(i._s(i.workGuideData.crtTime))])]):i._e(),i._v(" "),n("Row",{staticClass:"workguide-desc"},[n("span",[i._v("描述：")]),i._v(" "),n("Input",{attrs:{type:"textarea"},model:{value:i.workGuideData.comment,callback:function(t){i.$set(i.workGuideData,"comment",t)},expression:"workGuideData.comment"}})],1),i._v(" "),n("Row",{staticClass:"workguide-read"},i._l(i.workGuideData.workStepList,function(t,e){return n("img",{key:e,attrs:{src:t.image},on:{click:function(t){i.goAnchor(e)}}})})),i._v(" "),n("Row",{staticClass:"workguide-content"},[n("div",{staticClass:"workguide-content-add"},[n("span",{staticClass:"workguide-content-add-btn",on:{click:i.addStep}},[i._v("添加步骤")]),i._v(" "),n("b",{directives:[{name:"show",rawName:"v-show",value:0<i.workGuideData.workStepList.length,expression:"workGuideData.workStepList.length>0"}]},[i._v("拖动下方列表可排序")])]),i._v(" "),n("Timeline",[n("draggable",{attrs:{options:i.dragOptions,move:i.onMove},model:{value:i.workGuideData.workStepList,callback:function(t){i.$set(i.workGuideData,"workStepList",t)},expression:"workGuideData.workStepList"}},i._l(i.workGuideData.workStepList,function(e,o){return n("TimelineItem",{key:o,attrs:{id:"anchor"+o}},[n("div",{class:{"step-num":!0,"step-num-anchor":o===i.isAnchor},attrs:{slot:"dot"},slot:"dot"},[i._v(i._s(o+1))]),i._v(" "),n("div",{staticClass:"step-detail"},[n("i",{}),i._v(" "),n("h4",[i._v(i._s(e.title))]),i._v(" "),n("div",{staticClass:"workguide-content-delete",on:{click:function(t){i.deleteStep(e,o)}}},[i._v("删除")]),i._v(" "),n("div",{staticClass:"workguide-content-delete",on:{click:function(t){i.editStep(e,o)}}},[i._v("修改")]),i._v(" "),n("div",{staticClass:"step-detail-comment"},[i._v(i._s(e.comment))]),i._v(" "),n("img",{attrs:{src:e.image}})])])}))],1)],1),i._v(" "),n("Row",{staticClass:"workguide-toolbar"},[n("span",{staticClass:"workguide-toolbar-btn",on:{click:function(t){i.saveWorkguide("save")}}},[i._v("保存")]),i._v(" "),n("span",{staticClass:"workguide-toolbar-btn",on:{click:i.saveWorkguide}},[i._v("保存并继续添加")]),i._v(" "),n("router-link",{attrs:{to:{name:"wokdGuideList"}}},[n("span",{staticClass:"workguide-toolbar-btn"},[i._v("返回")])])],1),i._v(" "),n("Modal",{attrs:{transfer:!1,title:"添加步骤"},model:{value:i.showModal,callback:function(t){i.showModal=t},expression:"showModal"}},[n("Form",{ref:"formValidate",attrs:{model:i.formValidate,rules:i.ruleValidate,"label-width":80}},[n("FormItem",{attrs:{label:"标题",prop:"title"}},[n("Input",{model:{value:i.formValidate.title,callback:function(t){i.$set(i.formValidate,"title",t)},expression:"formValidate.title"}})],1),i._v(" "),n("FormItem",{attrs:{label:"描述"}},[n("Input",{attrs:{type:"textarea"},model:{value:i.formValidate.comment,callback:function(t){i.$set(i.formValidate,"comment",t)},expression:"formValidate.comment"}})],1),i._v(" "),n("FormItem",{attrs:{label:"图片：","label-width":91}},[n("Upload",{ref:"upload",staticClass:"upload-img",attrs:{"show-upload-list":!1,"on-success":i.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":i.handleFormatError,"on-exceeded-size":i.handleMaxSize,type:"drag",action:"/H_roleplay-si/ds/upload",headers:i.httpHeaders}},[i.formValidate.logo?i._e():n("div",{staticClass:"upload-img-first"},[i.formValidate.logo?n("img",{attrs:{src:i.formValidate.logo}}):i._e(),i._v(" "),i.formValidate.logo?i._e():n("i",{staticClass:"iconfont"},[i._v("")])]),i._v(" "),i.formValidate.logo?n("div",{staticClass:"demo-upload-list"},[n("img",{attrs:{src:i.formValidate.logo}}),i._v(" "),n("div",{staticClass:"demo-upload-list-cover"},[n("Icon",{attrs:{type:"ios-eye-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),i.handleView(t)}}}),i._v(" "),n("Icon",{attrs:{type:"ios-trash-outline",color:"#fff",size:"30"},on:{click:function(t){return t.stopPropagation(),i.handleRemove(t)}}})],1)]):i._e()]),i._v(" "),n("Modal",{attrs:{title:"查看头像"},model:{value:i.visible,callback:function(t){i.visible=t},expression:"visible"}},[i.visible?n("img",{staticStyle:{width:"100%"},attrs:{src:i.formValidate.logo}}):i._e(),i._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"})])],1)],1),i._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:"primary"},on:{click:i.confirmAdd}},[i._v("确定")]),i._v(" "),n("Button",{attrs:{type:"default"},on:{click:i.cancelAdd}},[i._v("取消")])],1)],1)],1)},staticRenderFns:[]}},"x4+L":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("eV/a"),n=o("oAV5"),a=o("DAYN"),r={name:"wokdGuideDetail",components:{draggable:o.n(a).a},data:function(){return{workguideId:this.$route.params.id,showModal:!1,visible:!1,isAnchor:-1,httpHeaders:{Authorization:Object(n.c)()},formValidate:{title:"",comment:"",logo:""},ruleValidate:{title:[{required:!0,message:"请输入标题",trigger:"blur"}]},workGuideData:{title:"",comment:"",workStepList:[]}}},computed:{dragOptions:function(){return{animation:500,group:"description",disabled:!1,handle:".step-detail",ghostClass:"ghost"}}},methods:{errorimg:function(){this.workGuideData.creatorImage="resources/images/icon/defaultUserPhoto.png"},onMove:function(t){var e=t.relatedContext,o=t.draggedContext,i=e.element,n=o.element;return!(i&&i.fixed||n.fixed)},saveWorkguide:function(e){var o=this;this.workguideId?""===this.workGuideData.title?this.$Message.error("请输入标题！"):Object(i.e)(this.workGuideData).then(function(t){t.success&&(o.$Message.success(t.message),"save"===e?o.$router.push({path:"/wokdGuide/list"}):(o.$router.push({path:"/wokdGuide/add"}),window.location.reload()))}).catch(function(t){o.$Message.error(t.data.message)}):""===this.workGuideData.title?this.$Message.error("请输入标题！"):Object(i.d)(this.workGuideData).then(function(t){t.success&&(o.$Message.success(t.message),"save"===e?o.$router.push({path:"/wokdGuide/list"}):o.workGuideData={title:"",comment:"",workStepList:[]})}).catch(function(t){o.$Message.error(t.data.message)})},getKnowledgeDataById:function(){var e=this;getKnowledgeTypeDataById(this.knowledgeId).then(function(t){e.knowledgeForm=t}).catch(function(t){e.$Message.error(t.data.message)})},addStep:function(){this.showModal=!0,this.$refs.formValidate.resetFields(),this.formValidate.logo="",this.formValidate.comment="",this.formValidate.edit=!1},deleteStep:function(t,e){this.workGuideData.workStepList.splice(e,1)},editStep:function(t,e){this.showModal=!0,this.formValidate.title=t.title,this.formValidate.comment=t.comment,this.formValidate.logo=t.image,this.formValidate.currentIndex=e,this.formValidate.edit=!0},cancelAdd:function(){this.showModal=!1},confirmAdd:function(){var e=this;this.$refs.formValidate.validate(function(t){t&&(e.formValidate.edit?(e.workGuideData.workStepList[e.formValidate.currentIndex].title=e.formValidate.title,e.workGuideData.workStepList[e.formValidate.currentIndex].comment=e.formValidate.comment,e.workGuideData.workStepList[e.formValidate.currentIndex].image=e.formValidate.logo):e.workGuideData.workStepList.push({title:e.formValidate.title,comment:e.formValidate.comment,image:e.formValidate.logo}),e.showModal=!1)})},handleSuccess:function(t,e){this.formValidate.logo="/H_roleplay-si/ds/download?width=300&height=300&url="+t.data[0].attacthment},handleMaxSize:function(t){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(t){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})},handleView:function(){this.visible=!0},handleRemove:function(){this.formValidate.logo="",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},getWorkGuideDataById:function(){var e=this;Object(i.c)(this.$route.params.id).then(function(t){e.workGuideData=t}).catch(function(t){e.$Message.error(t.data.message)})},goAnchor:function(t){this.isAnchor=t,document.querySelector(".workguide").scrollTop=this.$el.querySelector("#anchor"+t).offsetTop}},created:function(){this.$route.params.id&&this.getWorkGuideDataById()}},s=o("sxbC"),l=o.n(s);var d=function(t){o("Bo/i")},c=o("VU/8")(r,l.a,!1,d,"data-v-48268492",null);e.default=c.exports}});