{"source":"webpackJsonp([42],{\"5sS/\":function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var i=n(\"Gu7T\"),a=n.n(i),l=n(\"JUNF\"),o=n(\"sYY+\"),s=n.n(o),d={name:\"KnowledgeBase\",components:{},data:function(){return{currentPage:1,total:0,limit:10,isRolling:!1,searchValue:\"\",filter:!1,knowledgeData:[]}},methods:{knowledgeFilter:function(){this.currentPage=1,this.filter=!0,this.getAllKnowledgeData()},handleScroll:function(){var e=this,t=document.getElementById(\"knowledgeList\");t.addEventListener(\"scroll\",function(){Math.ceil(t.clientHeight+t.scrollTop)+2>=t.scrollHeight&&(e.total>e.knowledgeData.length?(e.currentPage++,e.isRolling=!0,e.getAllKnowledgeData()):e.isRolling=!1)})},getAllKnowledgeData:function(){var n=this;Object(l.c)(this.currentPage,this.limit,this.searchValue).then(function(e){if(e.success){var t;if(n.filter)n.knowledgeData=e.tableContent,n.filter=!1;else if(n.isRolling)n.knowledgeData=(t=n.knowledgeData).concat.apply(t,a()(e.tableContent));else n.knowledgeData=e.tableContent;n.total=e.dataCount,n.knowledgeData.forEach(function(e){e.img||(e.img=n.getString(e.content),e.content=n.deleteImg(e.content))})}})},addKnowledgeData:function(){this.$router.push({name:\"knowledgeAdd\",path:\"/knowledge/add\"})},editKnowledgeData:function(e,t){this.$router.push({name:\"knowledgeView\",path:\"/knowledge/view/\"+e.id,params:{id:e.id}})},deleteKnowledge:function(e,t){var n=this,i=[];this.$Modal.confirm({title:\"确认\",content:\"确认删除<b style=color:#e4393c;>\"+e.title+\"</b>么？\",onOk:function(){i.push(e.id),Object(l.a)(i).then(function(e){e.success&&(n.$Message.success(e.message),n.currentPage=1,n.knowledgeData.splice(t,1))}).catch(function(e){n.$Message.error(e.data.message)})}})},getString:function(e){var t=void 0,n=void 0,i=void 0,a=void 0;return e&&(-1<e.indexOf(\"img\")?(t=e.indexOf(\"img\"),i=(n=e.slice(t+9)).indexOf('\"'),a=n.slice(0,i)):a=\"\"),a},deleteImg:function(e){var t=void 0,n=void 0,i=void 0,a=void 0;return e&&(-1<e.indexOf(\"img\")?(t=e.indexOf(\"img\"),i=(n=e.slice(t-1)).indexOf(\">\"),a=n.slice(0,i+1),a=e.replace(a,\"\"),this.deleteImg(a)):a=e),a}},mounted:function(){this.handleScroll(),this.editor=new s.a(this.$refs.toolbar,this.$refs.text),this.editor.create()},created:function(){this.getAllKnowledgeData()}},c=n(\"t4Jp\"),r=n.n(c);var g=function(e){n(\"V+kj\")},u=n(\"VU/8\")(d,r.a,!1,g,\"data-v-46ed6632\",null);t.default=u.exports},\"V+kj\":function(e,t){},t4Jp:function(e,t){e.exports={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a(\"div\",{staticClass:\"knowledge\"},[a(\"div\",{staticClass:\"knowledge-toolbar\"},[a(\"span\",{staticClass:\"knowledge-toolbar-add\",on:{click:i.addKnowledgeData}},[i._v(\"新增\")]),i._v(\" \"),a(\"div\",{staticClass:\"knowledge-toolbar-search\"},[a(\"Input\",{staticStyle:{width:\"300px\"},attrs:{search:!0,placeholder:\"搜索\"},on:{\"on-search\":i.knowledgeFilter},model:{value:i.searchValue,callback:function(e){i.searchValue=e},expression:\"searchValue\"}})],1)]),i._v(\" \"),a(\"div\",{ref:\"toolbar\",staticStyle:{display:\"none\"}}),i._v(\" \"),a(\"div\",{ref:\"text\",staticStyle:{display:\"none\"}}),i._v(\" \"),a(\"div\",{staticClass:\"knowledge-list\",attrs:{id:\"knowledgeList\"}},i._l(i.knowledgeData,function(t,n){return a(\"Row\",{key:n,staticClass:\"knowledge-list-item\",attrs:{gutter:8}},[a(\"Col\",{attrs:{span:t.img?\"22\":\"24\"}},[a(\"div\",{staticClass:\"knowledge-list-item-title\"},[a(\"b\",{on:{click:function(e){i.editKnowledgeData(t,n)}}},[i._v(i._s(t.title))]),i._v(\" \"),a(\"span\",{staticClass:\"knowledge-delete\",on:{click:function(e){i.deleteKnowledge(t,n)}}},[i._v(\"删除\")])]),i._v(\" \"),a(\"p\",{staticClass:\"w-e-text\",domProps:{innerHTML:i._s(t.content)}}),i._v(\" \"),a(\"span\",[i._v(i._s(t.creator))]),i._v(\" \"),a(\"span\",[i._v(i._s(t.crtTime))])]),i._v(\" \"),a(\"Col\",{attrs:{span:t.img?\"2\":\"0\"}},[a(\"div\",{staticClass:\"knowledge-img\"},[a(\"img\",{attrs:{src:t.img}})])])],1)}),1)])},staticRenderFns:[]}}});"}