webpackJsonp([41],{TEZF:function(t,e){},YtYD:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Gu7T"),n=i.n(a),l=i("a8xa"),s={name:"Files",data:function(){return{isRolling:!1,files:[],listId:"",wordParams:{page:1,limit:20,total:0,listId:this.$route.params.listId,type:"file"}}},methods:{handleScroll:function(){var t=document.getElementById("fileHistory"),e=this;t.addEventListener("scroll",function(){Math.ceil(t.clientHeight+t.scrollTop)+2>=t.scrollHeight&&e.wordParams.total>e.files.length&&(e.wordParams.page++,e.isRolling=!0,e.refreshFiles())})},refreshFiles:function(){var t=this;Object(l.c)(this.wordParams).then(function(e){var i;(t.wordParams.total=e.dataCount,t.isRolling)?t.files=(i=t.files).concat.apply(i,n()(e.tableContent)):t.files=e.tableContent;t.files.map(function(t){/.jpg|.png|.PNG/.test(t.attachmentName)&&(t.icon="image.png"),/.xlsx/.test(t.attachmentName)&&(t.icon="excel.png"),/.docx/.test(t.attachmentName)&&(t.icon="word.png"),/.txt/.test(t.attachmentName)&&(t.icon="txt.png"),t.icon||(t.icon="word.png")})})},downLoadfiles:function(t){window.open(t)}},mounted:function(){this.listId=this.$route.params.listId,this.refreshFiles(),this.handleScroll()}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"files messagescrollbar",attrs:{id:"fileHistory"}},t._l(t.files,function(e,a){return i("li",{key:a,staticClass:"files-item"},[i("img",{attrs:{width:"40",src:"resources/images/file/"+e.icon}}),t._v(" "),i("div",{staticStyle:{display:"inline-table","vertical-align":"top","line-height":"22px"}},[i("div",[i("a",{on:{click:function(i){t.downLoadfiles(e.attachment)}}},[t._v(t._s(e.attachmentName)+" ")])]),t._v(" "),i("div",[t._v(t._s(e.creatorName))])]),t._v(" "),i("div",{staticStyle:{display:"inline-table","vertical-align":"top","line-height":"22px",float:"right"}},[i("div",[t._v(t._s(e.crtTime))])])])}))},staticRenderFns:[]};var r=i("VU/8")(s,o,!1,function(t){i("TEZF")},"data-v-61fb002e",null);e.default=r.exports}});