webpackJsonp([37],{YtYD:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Gu7T"),a=i.n(n),l=i("a8xa"),s={name:"Files",data:function(){return{isRolling:!1,files:[],listId:"",wordParams:{page:1,limit:20,total:0,listId:this.$route.params.listId,type:"file"}}},methods:{handleScroll:function(){var t=document.getElementById("fileHistory"),e=this;t.addEventListener("scroll",function(){Math.ceil(t.clientHeight+t.scrollTop)+2>=t.scrollHeight&&e.wordParams.total>e.files.length&&(e.wordParams.page++,e.isRolling=!0,e.refreshFiles())})},refreshFiles:function(){var i=this;Object(l.c)(this.wordParams).then(function(t){var e;(i.wordParams.total=t.dataCount,i.isRolling)?i.files=(e=i.files).concat.apply(e,a()(t.tableContent)):i.files=t.tableContent;i.files.map(function(t){/.jpg|.png|.PNG/.test(t.attachmentName)&&(t.icon="image.png"),/.xlsx/.test(t.attachmentName)&&(t.icon="excel.png"),/.docx/.test(t.attachmentName)&&(t.icon="word.png"),/.txt/.test(t.attachmentName)&&(t.icon="txt.png"),t.icon||(t.icon="word.png")})})},downLoadfiles:function(t){window.open(t)}},mounted:function(){this.listId=this.$route.params.listId,this.refreshFiles(),this.handleScroll()}},o=i("yr3Z"),r=i.n(o);var c=function(t){i("m74r")},d=i("VU/8")(s,r.a,!1,c,"data-v-45745a54",null);e.default=d.exports},m74r:function(t,e){},yr3Z:function(t,e){t.exports={render:function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("ul",{staticClass:"files messagescrollbar",attrs:{id:"fileHistory"}},i._l(i.files,function(e,t){return n("li",{key:t,staticClass:"files-item"},[n("img",{attrs:{width:"40",src:"resources/images/file/"+e.icon}}),i._v(" "),n("div",{staticStyle:{display:"inline-table","vertical-align":"top","line-height":"22px"}},[n("div",[n("a",{on:{click:function(t){i.downLoadfiles(e.attachment)}}},[i._v(i._s(e.attachmentName)+" ")])]),i._v(" "),n("div",[i._v(i._s(e.creatorName))])]),i._v(" "),n("div",{staticStyle:{display:"inline-table","vertical-align":"top","line-height":"22px",float:"right"}},[n("div",[i._v(i._s(e.crtTime))])])])}),0)},staticRenderFns:[]}}});