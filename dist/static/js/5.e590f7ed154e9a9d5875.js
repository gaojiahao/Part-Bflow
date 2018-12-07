webpackJsonp([5],{AYcD:function(t,e){},DAYN:function(t,e,i){"use strict";var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t};function n(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}!function(){function e(t){function e(t){t.parentElement.removeChild(t)}function i(t,e,i){var o=0===i?t.children[0]:t.children[i-1].nextSibling;t.insertBefore(e,o)}function a(t,e){var i=this;this.$nextTick(function(){return i.$emit(t.toLowerCase(),e)})}var r=["Start","Add","Remove","Update","End"],s=["Choose","Sort","Filter","Clone"],l=["Move"].concat(r,s).map(function(t){return"on"+t}),d=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var e=this.$slots.default;if(e&&1===e.length){var i=e[0];i.componentOptions&&"transition-group"===i.componentOptions.tag&&(this.transitionMode=!0)}var o=e,a=this.$slots.footer;a&&(o=e?[].concat(n(e),n(a)):[].concat(n(a)));var r=null,s=function(t,e){r=function(t,e,i){return void 0==i?t:((t=null==t?{}:t)[e]=i,t)}(r,t,e)};if(s("attrs",this.$attrs),this.componentData){var l=this.componentData,d=l.on,c=l.props;s("on",d),s("props",c)}return t(this.element,r,o)},mounted:function(){var e=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var i={};r.forEach(function(t){i["on"+t]=function(t){var e=this;return function(i){null!==e.realList&&e["onDrag"+t](i),a.call(e,t,i)}}.call(e,t)}),s.forEach(function(t){i["on"+t]=a.bind(e,t)});var n=o({},this.options,i,{onMove:function(t,i){return e.onDragMove(t,i)}});!("draggable"in n)&&(n.draggable=">*"),this._sortable=new t(this.rootContainer,n),this.computeIndexes()},beforeDestroy:function(){this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var e in t)-1==l.indexOf(e)&&this._sortable.option(e,t[e])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,e,i){if(!t)return[];var o=t.map(function(t){return t.elm}),a=[].concat(n(e)).map(function(t){return o.indexOf(t)});return i?a.filter(function(t){return-1!==t}):a}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var e=function(t,e){return t.map(function(t){return t.elm}).indexOf(e)}(this.getChildrenNodes()||[],t);return-1===e?null:{index:e,element:this.realList[e]}},getUnderlyingPotencialDraggableComponent:function(t){var e=t.__vue__;return e&&e.$options&&"transition-group"===e.$options._componentTag?e.$parent:e},emitChanges:function(t){var e=this;this.$nextTick(function(){e.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var e=[].concat(n(this.value));t(e),this.$emit("input",e)}},spliceList:function(){var t=arguments,e=function(e){return e.splice.apply(e,t)};this.alterList(e)},updatePosition:function(t,e){var i=function(i){return i.splice(e,0,i.splice(t,1)[0])};this.alterList(i)},getRelatedContextFromMoveEvent:function(t){var e=t.to,i=t.related,n=this.getUnderlyingPotencialDraggableComponent(e);if(!n)return{component:n};var a=n.realList,r={list:a,component:n};if(e!==i&&a&&n.getUnderlyingVm){var s=n.getUnderlyingVm(i);if(s)return o(s,r)}return r},getVmIndex:function(t){var e=this.visibleIndexes,i=e.length;return t>i-1?i:e[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),d=t.item},onDragAdd:function(t){var i=t.item._underlying_vm_;if(void 0!==i){e(t.item);var o=this.getVmIndex(t.newIndex);this.spliceList(o,0,i),this.computeIndexes();var n={element:i,newIndex:o};this.emitChanges({added:n})}},onDragRemove:function(t){if(i(this.rootContainer,t.item,t.oldIndex),this.isCloning)e(t.clone);else{var o=this.context.index;this.spliceList(o,1);var n={element:this.context.element,oldIndex:o};this.resetTransitionData(o),this.emitChanges({removed:n})}},onDragUpdate:function(t){e(t.item),i(t.from,t.item,t.oldIndex);var o=this.context.index,n=this.getVmIndex(t.newIndex);this.updatePosition(o,n);var a={element:this.context.element,oldIndex:o,newIndex:n};this.emitChanges({moved:a})},computeFutureIndex:function(t,e){if(!t.element)return 0;var i=[].concat(n(e.to.children)).filter(function(t){return"none"!==t.style.display}),o=i.indexOf(e.related),a=t.component.getVmIndex(o);return-1!=i.indexOf(d)||!e.willInsertAfter?a:a+1},onDragMove:function(t,e){var i=this.move;if(!i||!this.realList)return!0;var n=this.getRelatedContextFromMoveEvent(t),a=this.context,r=this.computeFutureIndex(n,t);return o(a,{futureIndex:r}),o(t,{relatedContext:n,draggedContext:a}),i(t,e)},onDragEnd:function(t){this.computeIndexes(),d=null}}}}Array.from||(Array.from=function(t){return[].slice.call(t)});var a=i("Lokx");t.exports=e(a)}()},"x4+L":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("eV/a"),n=i("oAV5"),a=i("DAYN"),r={name:"wokdGuideDetail",components:{draggable:i.n(a).a},data:function(){return{workguideId:this.$route.params.id,showModal:!1,visible:!1,httpHeaders:{Authorization:Object(n.c)()},formValidate:{title:"",comment:"",logo:""},ruleValidate:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],comment:[{required:!0,message:"请输入描述",trigger:"blur"}],logo:[{required:!0,message:" ",trigger:"blur"}]},workGuideData:{title:"",comment:"",workStepList:[]}}},computed:{dragOptions:function(){return{animation:500,group:"description",disabled:!1,handle:".step-detail",ghostClass:"ghost"}}},methods:{onMove:function(t){var e=t.relatedContext,i=t.draggedContext,o=e.element,n=i.element;return!(o&&o.fixed||n.fixed)},saveWorkguide:function(t){var e=this;this.workguideId?""===this.workGuideData.title?this.$Message.error("请输入标题！"):Object(o.e)(this.workGuideData).then(function(i){i.success&&(e.$Message.success(i.message),"save"===t?e.$router.push({path:"/wokdGuide/list"}):(e.$router.push({path:"/wokdGuide/add"}),window.location.reload()))}).catch(function(t){e.$Message.error(t.data.message)}):""===this.workGuideData.title?this.$Message.error("请输入标题！"):Object(o.d)(this.workGuideData).then(function(i){i.success&&(e.$Message.success(i.message),"save"===t?e.$router.push({path:"/wokdGuide/list"}):e.workGuideData={title:"",comment:"",workStepList:[]})}).catch(function(t){e.$Message.error(t.data.message)})},getKnowledgeDataById:function(){var t=this;getKnowledgeTypeDataById(this.knowledgeId).then(function(e){t.knowledgeForm=e}).catch(function(e){t.$Message.error(e.data.message)})},addStep:function(){this.showModal=!0,this.$refs.formValidate.resetFields(),this.formValidate.logo="",this.formValidate.edit=!1},deleteStep:function(t,e){this.workGuideData.workStepList.splice(e,1)},editStep:function(t,e){this.showModal=!0,this.formValidate.title=t.title,this.formValidate.comment=t.comment,this.formValidate.logo=t.image,this.formValidate.currentIndex=e,this.formValidate.edit=!0},cancelAdd:function(){this.showModal=!1},confirmAdd:function(){var t=this;""===this.formValidate.logo?this.$Message.error("请插入图片！"):this.$refs.formValidate.validate(function(e){e&&(t.formValidate.edit?(t.workGuideData.workStepList[t.formValidate.currentIndex].title=t.formValidate.title,t.workGuideData.workStepList[t.formValidate.currentIndex].comment=t.formValidate.comment,t.workGuideData.workStepList[t.formValidate.currentIndex].image=t.formValidate.logo):t.workGuideData.workStepList.unshift({title:t.formValidate.title,comment:t.formValidate.comment,image:t.formValidate.logo}),t.showModal=!1)})},handleSuccess:function(t,e){this.formValidate.logo="/H_roleplay-si/ds/download?width=300&height=300&url="+t.data[0].attacthment},handleMaxSize:function(t){this.$Notice.warning({title:"文件大小超出范围",desc:"文件大小最大为2M"})},handleFormatError:function(t){this.$Notice.warning({title:"文件格式不对",desc:"请上传格式为png 或者 jpg 的图片"})},handleView:function(){this.visible=!0},handleRemove:function(){this.formValidate.logo="",this.$refs.upload.fileList.splice(0,this.$refs.upload.fileList.length)},getWorkGuideDataById:function(){var t=this;Object(o.c)(this.$route.params.id).then(function(e){t.workGuideData=e}).catch(function(e){t.$Message.error(e.data.message)})}},created:function(){this.$route.params.id&&this.getWorkGuideDataById()}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"workguide"},[i("Row",{staticClass:"workguide-title"},[i("span",[i("b",{staticStyle:{color:"#e4393c","margin-left":"-9px"}},[t._v("*")]),t._v("标题：")]),t._v(" "),i("Input",{staticStyle:{width:"300px"},model:{value:t.workGuideData.title,callback:function(e){t.$set(t.workGuideData,"title",e)},expression:"workGuideData.title"}})],1),t._v(" "),this.$route.params.id?i("Row",{staticClass:"workguide-type"},[i("img",{attrs:{src:t.workGuideData.creatorImage}}),t._v(" "),i("span",{staticClass:"workguide-type-worktype"},[t._v(t._s(t.workGuideData.creatorName))]),t._v(" "),i("span",{staticClass:"workguide-type-crtTime"},[t._v(t._s(t.workGuideData.crtTime))])]):t._e(),t._v(" "),i("Row",{staticClass:"workguide-desc"},[i("span",[t._v("描述：")]),t._v(" "),i("Input",{attrs:{type:"textarea"},model:{value:t.workGuideData.comment,callback:function(e){t.$set(t.workGuideData,"comment",e)},expression:"workGuideData.comment"}})],1),t._v(" "),i("Row",{staticClass:"workguide-read"},t._l(t.workGuideData.workStepList,function(t,e){return i("img",{key:e,attrs:{src:t.image}})})),t._v(" "),i("Row",{staticClass:"workguide-content"},[i("div",{staticClass:"workguide-content-add"},[i("span",{staticClass:"workguide-content-add-btn",on:{click:t.addStep}},[t._v("添加步骤")]),t._v(" "),i("b",{directives:[{name:"show",rawName:"v-show",value:t.workGuideData.workStepList.length>0,expression:"workGuideData.workStepList.length>0"}]},[t._v("拖动下方列表可排序")])]),t._v(" "),i("Timeline",[i("draggable",{attrs:{options:t.dragOptions,move:t.onMove},model:{value:t.workGuideData.workStepList,callback:function(e){t.$set(t.workGuideData,"workStepList",e)},expression:"workGuideData.workStepList"}},t._l(t.workGuideData.workStepList,function(e,o){return i("TimelineItem",{key:o},[i("div",{staticClass:"step-num",attrs:{slot:"dot"},slot:"dot"},[t._v(t._s(o+1))]),t._v(" "),i("div",{staticClass:"step-detail"},[i("i",{}),t._v(" "),i("h4",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"workguide-content-delete",on:{click:function(i){t.deleteStep(e,o)}}},[t._v("删除")]),t._v(" "),i("div",{staticClass:"workguide-content-delete",on:{click:function(i){t.editStep(e,o)}}},[t._v("修改")]),t._v(" "),i("div",{staticClass:"step-detail-comment"},[t._v(t._s(e.comment))]),t._v(" "),i("img",{attrs:{src:e.image}})])])}))],1)],1),t._v(" "),i("Row",{staticClass:"workguide-save"},[i("span",{staticClass:"workguide-save-btn",on:{click:function(e){t.saveWorkguide("save")}}},[t._v("保存")]),t._v(" "),i("span",{staticClass:"workguide-save-btn",on:{click:t.saveWorkguide}},[t._v("保存并继续添加")]),t._v(" "),i("router-link",{attrs:{to:{name:"wokdGuideList"}}},[i("span",{staticClass:"workguide-save-btn"},[t._v("返回")])])],1),t._v(" "),i("Modal",{attrs:{transfer:!1,title:"添加步骤"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[i("Form",{ref:"formValidate",attrs:{model:t.formValidate,rules:t.ruleValidate,"label-width":80}},[i("FormItem",{attrs:{label:"标题",prop:"title"}},[i("Input",{model:{value:t.formValidate.title,callback:function(e){t.$set(t.formValidate,"title",e)},expression:"formValidate.title"}})],1),t._v(" "),i("FormItem",{attrs:{label:"描述",prop:"comment"}},[i("Input",{attrs:{type:"textarea"},model:{value:t.formValidate.comment,callback:function(e){t.$set(t.formValidate,"comment",e)},expression:"formValidate.comment"}})],1),t._v(" "),i("FormItem",{attrs:{label:"图片：",prop:"logo","label-width":91}},[i("Upload",{ref:"upload",staticClass:"upload-img",attrs:{"show-upload-list":!1,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,type:"drag",action:"/H_roleplay-si/ds/upload",headers:t.httpHeaders}},[t.formValidate.logo?t._e():i("div",{staticClass:"upload-img-first"},[t.formValidate.logo?i("img",{attrs:{src:t.formValidate.logo}}):t._e(),t._v(" "),t.formValidate.logo?t._e():i("i",{staticClass:"iconfont"},[t._v("")])]),t._v(" "),t.formValidate.logo?i("div",{staticClass:"demo-upload-list"},[i("img",{attrs:{src:t.formValidate.logo}}),t._v(" "),i("div",{staticClass:"demo-upload-list-cover"},[i("Icon",{attrs:{type:"ios-eye-outline",color:"#fff",size:"30"},on:{click:function(e){return e.stopPropagation(),t.handleView(e)}}}),t._v(" "),i("Icon",{attrs:{type:"ios-trash-outline",color:"#fff",size:"30"},on:{click:function(e){return e.stopPropagation(),t.handleRemove(e)}}})],1)]):t._e()]),t._v(" "),i("Modal",{attrs:{title:"查看头像"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?i("img",{staticStyle:{width:"100%"},attrs:{src:t.formValidate.logo}}):t._e(),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"})])],1)],1),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("Button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("确定")]),t._v(" "),i("Button",{attrs:{type:"default"},on:{click:t.cancelAdd}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(r,s,!1,function(t){i("AYcD")},"data-v-aff74346",null);e.default=l.exports}});