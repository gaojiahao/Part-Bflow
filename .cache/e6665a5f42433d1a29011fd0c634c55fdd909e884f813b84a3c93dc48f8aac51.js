{"source":"webpackJsonp([15],{\"1liT\":function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=a(\"Gu7T\"),o=a.n(n),s=a(\"JUNF\"),l=a(\"yqpi\"),i=a(\"uTVu\"),d={name:\"KnowledgeBase\",components:{AddModal:l.a},data:function(){return{currentPage:1,total:0,limit:10,isRolling:!1,currentIndex:0,searchValue:\"\",filter:!1,isFirst:!0,knowledgeData:[]}},methods:{errorimg:function(e,t){this.knowledgeData[t].photo=\"resources/images/icon/defaultUserPhoto.png\"},addKnowledge:function(){this.$refs.addModal.showKnowledgeModal=!0,this.$refs.addModal.knowledgeForm.content=\"\",this.$refs.addModal.editor.txt.html(\"<span></span>\"),this.$refs.addModal.$refs.formValidate.resetFields()},knowledgeFilter:function(){this.currentPage=1,this.filter=!0,this.isFirst=!0,this.getAllKnowledgeData()},handleScroll:function(){var e=this,t=document.getElementById(\"knowledgeList\");t.addEventListener(\"scroll\",function(){Math.ceil(t.clientHeight+t.scrollTop)+2>=t.scrollHeight&&(e.total>e.knowledgeData.length?(e.currentPage++,e.isRolling=!0,e.getAllKnowledgeData()):e.isRolling=!1)})},getAllKnowledgeData:function(){var a=this;Object(s.c)(this.currentPage,this.limit,this.searchValue).then(function(e){if(e.success){var t;if(a.filter)a.knowledgeData=e.tableContent,a.filter=!1;else if(a.isRolling)a.knowledgeData=(t=a.knowledgeData).concat.apply(t,o()(e.tableContent));else a.knowledgeData=e.tableContent;a.isFirst&&0<a.knowledgeData.length&&(a.$router.push({path:\"/knowledge/knowledgeList/view/\"+a.knowledgeData[0].id}),a.currentIndex=0,a.isFirst=!1),a.total=e.dataCount}})},addKnowledgeData:function(){this.$router.push({name:\"knowledgeAdd\",path:\"/knowledge/add\"})},editKnowledgeData:function(e,t){this.currentIndex=t,this.$router.push({path:\"/knowledge/knowledgeList/view/\"+e.id,params:{id:e.id}})}},mounted:function(){var t=this;this.handleScroll(),i.a.$on(\"refreshList\",function(){t.isFirst=!0,t.getAllKnowledgeData()}),i.a.$on(\"addUpdate\",function(e){t.isFirst=!0,t.getAllKnowledgeData()})},created:function(){this.getAllKnowledgeData()}},r=a(\"UDuo\"),c=a.n(r);var u=function(e){a(\"3Hlm\")},g={name:\"KnowledgeLayout\",components:{KnowledgeList:a(\"VU/8\")(d,c.a,!1,u,\"data-v-041d8c3e\",null).exports}},p=a(\"9LRj\"),f=a.n(p);var h=function(e){a(\"eaQs\")},w=a(\"VU/8\")(g,f.a,!1,h,\"data-v-ab5d1154\",null);t.default=w.exports},\"3Hlm\":function(e,t){},\"9LRj\":function(e,t){e.exports={render:function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"knowledge\"},[t(\"div\",{staticClass:\"knowledge-sider\"},[t(\"knowledge-list\")],1),this._v(\" \"),t(\"div\",{staticClass:\"knowledge-content\"},[t(\"router-view\")],1)])},staticRenderFns:[]}},JUNF:function(e,t,a){\"use strict\";a.d(t,\"c\",function(){return o}),a.d(t,\"d\",function(){return s}),a.d(t,\"e\",function(){return l}),a.d(t,\"f\",function(){return i}),a.d(t,\"h\",function(){return d}),a.d(t,\"a\",function(){return r}),a.d(t,\"g\",function(){return c}),a.d(t,\"b\",function(){return u});var n=a(\"7B+g\"),o=function(e,t,a){return Object(n.a)(\"/H_roleplay-si/kb/query\",{page:e,limit:t,search:a})},s=function(){return Object(n.a)(\"/H_roleplay-si/base/dict/getListByValue\",{value:\"KnowledgeBaseType\"})},l=function(e){return Object(n.a)(\"/H_roleplay-si/kb/queryById\",{id:e})},i=function(e){return Object(n.a)(\"/H_roleplay-si/kb/save\",{},\"POST\",e)},d=function(e){return Object(n.a)(\"/H_roleplay-si/kb/update\",{},\"POST\",e)},r=function(e){return Object(n.a)(\"/H_roleplay-si/kb/delete\",{},\"POST\",e)},c=function(e){return Object(n.a)(\"/H_roleplay-si/base/dict/saveByValue\",{},\"POST\",e)},u=function(e){return Object(n.a)(\"/H_roleplay-si/base/dict/delete\",{id:e},\"POST\")}},UDuo:function(e,t){e.exports={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o(\"div\",{staticClass:\"knowledge\"},[o(\"div\",{staticClass:\"knowledge-toolbar\"},[o(\"div\",{staticClass:\"first-bar\"},[o(\"span\",{staticClass:\"knowledge-toolbar-all\"},[n._v(\"所有知识\")]),n._v(\" \"),o(\"span\",{staticClass:\"knowledge-toolbar-add\",on:{click:n.addKnowledge}},[o(\"Icon\",{staticClass:\"add-icon\",attrs:{type:\"md-add-circle\"}}),n._v(\" \"),o(\"b\",[n._v(\"添加知识\")])],1)]),n._v(\" \"),o(\"div\",{staticClass:\"knowledge-toolbar-search\"},[o(\"Input\",{staticStyle:{width:\"259px\"},attrs:{search:!0,placeholder:\"搜索\"},on:{\"on-search\":n.knowledgeFilter},model:{value:n.searchValue,callback:function(e){n.searchValue=e},expression:\"searchValue\"}})],1)]),n._v(\" \"),o(\"div\",{staticClass:\"knowledge-list\",attrs:{id:\"knowledgeList\"}},[n._l(n.knowledgeData,function(t,a){return o(\"div\",{key:a,class:{\"knowledge-list-item\":!0,\"active-item\":a===n.currentIndex},on:{click:function(e){n.editKnowledgeData(t,a)}}},[o(\"div\",{staticClass:\"knowledge-img\"},[o(\"img\",{attrs:{src:t.photo?t.photo:\"resources/images/icon/defaultUserPhoto.png\"},on:{error:function(e){n.errorimg(t,a)}}})]),n._v(\" \"),o(\"div\",{staticClass:\"knowledge-list-desc\"},[o(\"div\",{staticClass:\"knowledge-list-title\"},[o(\"span\",[n._v(n._s(t.title))])]),n._v(\" \"),o(\"span\",[n._v(n._s(t.creator))]),n._v(\" \"),o(\"span\",[n._v(n._s(t.crtTime))])])])}),n._v(\" \"),o(\"add-modal\",{ref:\"addModal\",attrs:{modalTitle:\"添加知识\",knowledgeId:!1}})],2)])},staticRenderFns:[]}},eIY0:function(e,t){},eaQs:function(e,t){},tiqd:function(e,t){e.exports={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o(\"Modal\",{attrs:{fullscreen:\"\",title:n.modalTitle},model:{value:n.showKnowledgeModal,callback:function(e){n.showKnowledgeModal=e},expression:\"showKnowledgeModal\"}},[o(\"div\",{staticClass:\"knowledge\"},[o(\"Row\",{staticClass:\"knowledge-form\"},[o(\"Form\",{ref:\"formValidate\",attrs:{\"label-width\":120,model:n.knowledgeForm,rules:n.ruleValidate}},[o(\"FormItem\",{attrs:{label:\"\"}},[o(\"Row\",[o(\"Col\",{staticStyle:{\"margin-left\":\"-121px\"},attrs:{span:\"12\"}},[o(\"FormItem\",{attrs:{prop:\"title\",label:\"标题:\"}},[o(\"Input\",{staticStyle:{width:\"300px\"},model:{value:n.knowledgeForm.title,callback:function(e){n.$set(n.knowledgeForm,\"title\",e)},expression:\"knowledgeForm.title\"}})],1)],1),n._v(\" \"),o(\"Col\",{attrs:{span:\"12\"}},[o(\"FormItem\",{attrs:{prop:\"type\",label:\"分类:\"}},[o(\"Select\",{ref:\"typeSelect\",staticStyle:{width:\"300px\"},attrs:{transfer:!1},model:{value:n.knowledgeForm.type,callback:function(e){n.$set(n.knowledgeForm,\"type\",e)},expression:\"knowledgeForm.type\"}},[n._l(n.typeList,function(t,a){return o(\"Option\",{key:t.id,attrs:{value:t.value}},[n._v(\"\\n                            \"+n._s(t.name)+\"\\n                            \"),o(\"span\",{staticClass:\"type-edit\",on:{click:function(e){e.stopPropagation(),n.deleteType(t,a)}}},[o(\"Icon\",{attrs:{type:\"md-close\"}})],1)])}),n._v(\" \"),o(\"Option\",{attrs:{value:\"addType\"}},[o(\"span\",{staticClass:\"add-type\",on:{click:n.showAddTypeModal}},[o(\"Icon\",{attrs:{type:\"md-add\"}})],1)])],2)],1)],1)],1)],1),n._v(\" \"),o(\"FormItem\",{staticStyle:{\"margin-bottom\":\"65px\"},attrs:{label:\"内容:\",prop:\"content\"}},[o(\"div\",{ref:\"editor\",staticClass:\"knowledge-editor\"})])],1)],1),n._v(\" \"),o(\"Row\",{staticClass:\"knowledge-save\"},[o(\"span\",{staticClass:\"knowledge-save-btn\",on:{click:function(e){n.saveKnowledge(\"save\")}}},[n._v(\"保存\")]),n._v(\" \"),o(\"span\",{staticClass:\"knowledge-save-btn\",on:{click:n.saveKnowledge}},[n._v(\"保存并继续添加\")])]),n._v(\" \"),o(\"Modal\",{attrs:{title:\"添加分类\",styles:{top:\"20px\"},transfer:!1},model:{value:n.showModal,callback:function(e){n.showModal=e},expression:\"showModal\"}},[o(\"Form\",{ref:\"typeValidate\",attrs:{model:n.typeValidate,rules:n.typeRuleValidate,\"label-width\":80}},[o(\"FormItem\",{attrs:{label:\"名称\",prop:\"name\"}},[o(\"Input\",{attrs:{autofocus:\"\"},model:{value:n.typeValidate.name,callback:function(e){n.$set(n.typeValidate,\"name\",e)},expression:\"typeValidate.name\"}})],1)],1),n._v(\" \"),o(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[o(\"Button\",{attrs:{type:\"primary\"},on:{click:n.confirmAdd}},[n._v(\"确定\")]),n._v(\" \"),o(\"Button\",{attrs:{type:\"default\"},on:{click:n.cancelAdd}},[n._v(\"取消\")])],1)],1)],1),n._v(\" \"),o(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"})])},staticRenderFns:[]}},yqpi:function(e,t,a){\"use strict\";var n=a(\"JUNF\"),o=a(\"sYY+\"),s=a.n(o),l=a(\"uTVu\"),i={name:\"KnowledgeDetail\",components:{},props:{modalTitle:String,knowledgeId:{type:[String,Boolean]}},data:function(){return{isEdit:!1,showModal:!1,showKnowledgeModal:!1,copyKnowledgeId:this.knowledgeId,typeValidate:{name:\"\",value:\"\"},typeRuleValidate:{name:[{required:!0,message:\"请输入名称\",trigger:\"blur\"}]},knowledgeForm:{title:\"\",type:\"\",content:\"\"},typeList:[],ruleValidate:{title:[{required:!0,message:\"请输入标题\",trigger:\"blur\"}],type:[{required:!0,message:\"请选择分类\",trigger:\"change\"}],content:[{required:!0,message:\" \",trigger:\"blur\"}]}}},methods:{showAddTypeModal:function(){this.showModal=!0,this.$refs.typeValidate.resetFields(),this.typeValidate.edit=!1},cancelAdd:function(){this.showModal=!1},confirmAdd:function(){var t=this,a={};this.$refs.typeValidate.validate(function(e){e&&((a=t.typeValidate.edit?{name:t.typeValidate.name,value:\"KnowledgeBaseType\",id:t.typeValidate.id}:{name:t.typeValidate.name,value:\"KnowledgeBaseType\"})&&Object(n.g)(a).then(function(e){e.success&&(t.$Message.success(e.message),t.getAllKnowledgeTypeData())}).catch(function(e){t.$Message.error(e.data.message)}),t.showModal=!1)})},editType:function(e,t){this.$refs.typeSelect.hideMenu(),this.typeValidate.id=e.id,this.typeValidate.name=e.name,this.typeValidate.edit=!0,this.showModal=!0},deleteType:function(t,e){var a=this;this.$refs.typeSelect.hideMenu(),this.$Modal.confirm({title:\"确认\",content:\"确认删除<b style=color:#e4393c;>\"+t.name+\"</b>么？\",onOk:function(){Object(n.b)(t.id).then(function(e){e.success&&(a.$Message.success(e.message),a.knowledgeForm.type===t.value&&(a.knowledgeForm.type=\"\"),a.getAllKnowledgeTypeData())}).catch(function(e){a.$Message.error(e.data.message)})}})},saveKnowledge:function(t){var a=this;\"<p><br></p>\"===this.editor.txt.html()?this.$Message.error(\"必填项请输入！\"):this.knowledgeForm.content=this.editor.txt.html(),this.$refs.formValidate.validate(function(e){e&&(a.copyKnowledgeId?(a.knowledgeForm.id=a.knowledgeId,Object(n.h)(a.knowledgeForm).then(function(e){e.success&&(a.$Message.success(e.message),a.$emit(\"editUpdate\"),\"save\"===t?a.showKnowledgeModal=!1:(a.copyKnowledgeId=!1,a.knowledgeForm.content=\"\",a.$refs.formValidate.resetFields(),a.editor.txt.html(\"<span></span>\")))}).catch(function(e){a.$Message.error(e.data.message)})):Object(n.f)(a.knowledgeForm).then(function(e){e.success&&(a.$Message.success(e.message),l.a.$emit(\"addUpdate\"),\"save\"===t?a.showKnowledgeModal=!1:(a.knowledgeForm.content=\"\",a.$refs.formValidate.resetFields(),a.editor.txt.html(\"<span></span>\")))}).catch(function(e){a.$Message.error(e.data.message)}))})},getAllKnowledgeTypeData:function(){var t=this;Object(n.d)().then(function(e){t.typeList=e})},getKnowledgeDataById:function(){var t=this;this.knowledgeId&&Object(n.e)(this.knowledgeId).then(function(e){t.knowledgeForm.title=e.title,t.knowledgeForm.type=e.type,t.knowledgeForm.content=e.content,t.createEditor(e.content)})},createEditor:function(e){var t=this,a=e||\"\";this.editor=new s.a(this.$refs.editor),this.editor.customConfig.onchange=function(e){t.knowledgeForm.content=e},this.editor.customConfig.uploadImgShowBase64=!0,this.editor.customConfig.zIndex=100,this.editor.create(),this.editor.$textContainerElem[0].style.height=\"400px\",this.editor.txt.html(\"<span>\"+a+\"</span>\")}},mounted:function(){this.createEditor()},created:function(){this.getAllKnowledgeTypeData(),this.getKnowledgeDataById()}},d=a(\"tiqd\"),r=a.n(d);var c=function(e){a(\"eIY0\")},u=a(\"VU/8\")(i,r.a,!1,c,null,null);t.a=u.exports}});"}