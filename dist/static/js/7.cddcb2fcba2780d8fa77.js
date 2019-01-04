webpackJsonp([7],{gmTg:function(e,t){},psz9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("JUNF"),o=a("sYY+"),n=a.n(o),l={name:"KnowledgeDetail",components:{},data:function(){return{knowledgeId:this.$route.params.id,isEdit:!1,showModal:!1,typeValidate:{name:"",value:""},typeRuleValidate:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},knowledgeForm:{title:"",type:"",content:""},typeList:[],ruleValidate:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],type:[{required:!0,message:"请选择分类",trigger:"change"}],content:[{required:!0,message:" ",trigger:"blur"}]}}},methods:{showAddTypeModal:function(){this.showModal=!0,this.$refs.typeValidate.resetFields(),this.typeValidate.edit=!1},cancelAdd:function(){this.showModal=!1},confirmAdd:function(){var e=this,t={};this.$refs.typeValidate.validate(function(a){a&&((t=e.typeValidate.edit?{name:e.typeValidate.name,value:"KnowledgeBaseType",id:e.typeValidate.id}:{name:e.typeValidate.name,value:"KnowledgeBaseType"})&&Object(s.g)(t).then(function(t){t.success&&(e.$Message.success(t.message),e.getAllKnowledgeTypeData())}).catch(function(t){e.$Message.error(t.data.message)}),e.showModal=!1)})},editType:function(e,t){this.$refs.typeSelect.hideMenu(),this.typeValidate.id=e.id,this.typeValidate.name=e.name,this.typeValidate.edit=!0,this.showModal=!0},deleteType:function(e,t){var a=this;this.$refs.typeSelect.hideMenu(),this.$Modal.confirm({title:"确认",content:"确认删除<b style=color:#e4393c;>"+e.name+"</b>么？",onOk:function(){Object(s.b)(e.id).then(function(t){t.success&&(a.$Message.success(t.message),a.knowledgeForm.type===e.value&&(a.knowledgeForm.type=""),a.getAllKnowledgeTypeData())}).catch(function(e){a.$Message.error(e.data.message)})}})},goBack:function(){this.knowledgeId?this.$router.push({path:"/knowledge/view/"+this.knowledgeId}):this.$router.push({path:"/knowledge/list"})},saveKnowledge:function(e){var t=this;"<p><br></p>"===this.editor.txt.html()?this.$Message.error("必填项请输入！"):this.knowledgeForm.content=this.editor.txt.html(),this.$refs.formValidate.validate(function(a){a&&(t.knowledgeId?(t.knowledgeForm.id=t.knowledgeId,Object(s.h)(t.knowledgeForm).then(function(a){a.success&&(t.$Message.success(a.message),"save"===e?t.$router.push({path:"/knowledge/list"}):(t.knowledgeId=!1,t.knowledgeForm.content="",t.$refs.formValidate.resetFields(),t.editor.txt.html("<span></span>")))}).catch(function(e){t.$Message.error(e.data.message)})):Object(s.f)(t.knowledgeForm).then(function(a){a.success&&(t.$Message.success(a.message),"save"===e?t.$router.push({path:"/knowledge/list"}):(t.knowledgeForm.content="",t.$refs.formValidate.resetFields(),t.editor.txt.html("<span></span>")))}).catch(function(e){t.$Message.error(e.data.message)}))})},getAllKnowledgeTypeData:function(){var e=this;Object(s.d)().then(function(t){e.typeList=t})},getKnowledgeDataById:function(){var e=this;this.knowledgeId&&Object(s.e)(this.knowledgeId).then(function(t){e.knowledgeForm.title=t.title,e.knowledgeForm.type=t.type,e.knowledgeForm.content=t.content,e.createEditor(t.content)})},createEditor:function(e){var t=this,a=e||"";this.editor=new n.a(this.$refs.editor),this.editor.customConfig.onchange=function(e){t.knowledgeForm.content=e},this.editor.customConfig.uploadImgShowBase64=!0,this.editor.customConfig.zIndex=100,this.editor.create(),this.editor.$textContainerElem[0].style.height="400px",this.editor.txt.html("<span>"+a+"</span>")}},mounted:function(){this.createEditor()},created:function(){this.getAllKnowledgeTypeData(),this.getKnowledgeDataById()}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"knowledge"},[a("Row",{staticClass:"knowledge-form"},[a("Form",{ref:"formValidate",attrs:{"label-width":120,model:e.knowledgeForm,rules:e.ruleValidate}},[a("FormItem",{attrs:{label:""}},[a("Row",[a("Col",{staticStyle:{"margin-left":"-121px"},attrs:{span:"12"}},[a("FormItem",{attrs:{prop:"title",label:"标题:"}},[a("Input",{staticStyle:{width:"300px"},model:{value:e.knowledgeForm.title,callback:function(t){e.$set(e.knowledgeForm,"title",t)},expression:"knowledgeForm.title"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{prop:"type",label:"分类:"}},[a("Select",{ref:"typeSelect",staticStyle:{width:"300px"},attrs:{transfer:!1},model:{value:e.knowledgeForm.type,callback:function(t){e.$set(e.knowledgeForm,"type",t)},expression:"knowledgeForm.type"}},[e._l(e.typeList,function(t,s){return a("Option",{key:t.id,attrs:{value:t.value}},[e._v("\n                          "+e._s(t.name)+"\n                          "),a("span",{staticClass:"type-edit",on:{click:function(a){a.stopPropagation(),e.deleteType(t,s)}}},[a("Icon",{attrs:{type:"md-close"}})],1)])}),e._v(" "),a("Option",{attrs:{value:"addType"}},[a("span",{staticClass:"add-type",on:{click:e.showAddTypeModal}},[a("Icon",{attrs:{type:"md-add"}})],1)])],2)],1)],1)],1)],1),e._v(" "),a("FormItem",{staticStyle:{"margin-bottom":"65px"},attrs:{label:"内容:",prop:"content"}},[a("div",{ref:"editor",staticClass:"knowledge-editor"})])],1)],1),e._v(" "),a("Row",{staticClass:"knowledge-save"},[a("span",{staticClass:"knowledge-save-btn",on:{click:function(t){e.saveKnowledge("save")}}},[e._v("保存")]),e._v(" "),a("span",{staticClass:"knowledge-save-btn",on:{click:e.saveKnowledge}},[e._v("保存并继续添加")]),e._v(" "),a("span",{staticClass:"knowledge-save-btn",on:{click:e.goBack}},[e._v("返回")])]),e._v(" "),a("Modal",{attrs:{title:"添加分类",styles:{top:"20px"},transfer:!1},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Form",{ref:"typeValidate",attrs:{model:e.typeValidate,rules:e.typeRuleValidate,"label-width":80}},[a("FormItem",{attrs:{label:"名称",prop:"name"}},[a("Input",{attrs:{autofocus:""},model:{value:e.typeValidate.name,callback:function(t){e.$set(e.typeValidate,"name",t)},expression:"typeValidate.name"}})],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{click:e.confirmAdd}},[e._v("确定")]),e._v(" "),a("Button",{attrs:{type:"default"},on:{click:e.cancelAdd}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var d=a("D8HT")(l,i,!1,function(e){a("gmTg")},null,null);t.default=d.exports}});