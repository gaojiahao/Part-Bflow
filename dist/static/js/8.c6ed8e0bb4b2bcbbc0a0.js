webpackJsonp([8],{Fq3m:function(t,e){},REYt:function(t,e){},UUOy:function(t,e){},bJtM:function(t,e,s){"use strict";var n=s("3SZ7"),i=s.n(n),o=s("GIAq"),a=s("3ovf"),c=s("ejmB"),r={name:"childComments",components:{MyPopTip:a.a,commentPublish:c.a},props:{comments:{type:Array,default:function(){return[]}},superComment:{type:Object,default:function(){return{}}}},data:function(){return{userInfo:{},cmtsMap:{}}},methods:{handlerShowThumbsUpInfo:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showPraises=!1),t.showReply=!1}),t.showPraises=!t.showPraises},handleThumbsUp:function(t){var e=this,s=t.id;Object(o.e)({commentId:s}).then(function(n){if(n.success){var a={commentId:s,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};t.isPraise=!0,Object(o.x)(a).then(function(e){t.praises=e.tableContent})}else e.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowReply:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1),t.showPraises=!1}),t.showReply=!t.showReply},handleReplyPublish:function(t,e,s,n){var a=this,c={type:s.type,content:t,relationKey:s.relationKey,parentId:s.id,commentAttachments:e,commentAndReply:n};Object(o.M)(c).then(function(t){if(t.success){var e={parentId:a.superComment.id,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};a.getLowerComments(e,a.superComment)}else a.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},showUserInfo:function(t){var e=this;Object(o.F)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},getLowerComments:function(t,e){Object(o.z)(t).then(function(t){e.childComment=t.tableContent,e.childCommentNum=t.dataCount})}},mounted:function(){}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"child-comments"},t._l(t.comments,function(e,n){return s("div",{key:n,staticClass:"child-comments-item"},[s("p",[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"},[t._v(t._s(e.creatorName)+"\n            ")])]),t._v(" "),s("span",[t._v(":回复")]),t._v(" "),s("span",{staticClass:"child-comments-user"},[t._v("@")]),t._v(" "),s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){t.showUserInfo(e.replyUserId)}},slot:"userCard"},[t._v(t._s(e.replyUserName)+"\n                ")])]),t._v(" "),s("span",[t._v(":")]),t._v(" "),s("span",{domProps:{innerHTML:t._s(e.content)}})],1),t._v(" "),s("p",[s("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{time:e.crtTime},expression:"{time:comment.crtTime}"}]}),t._v(" "),s("span",{staticClass:"fr"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowReply(e)}}},[t._v("回复")]),t._v(" "),s("span",{staticClass:"cursor-pointer",class:{"comment-isPraise":e.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},on:{click:function(s){t.handleThumbsUp(e)}}}),t._v("\n                    "+t._s(e.praises.length)+"\n                ")],1),t._v(" "),e.praises.length>0?s("span",{staticClass:"cursor-pointer"},[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},on:{click:function(s){t.handlerShowThumbsUpInfo(e)}}})],1):t._e()])]),t._v(" "),e.showReply?s("commentPublish",{attrs:{handlePublish:t.handleReplyPublish,superComment:e,allowFile:!1,ischild:!0}}):t._e(),t._v(" "),e.showPraises?s("div",{staticClass:"list-content-item-praises"},[s("p",[t._v("共"),s("b",[t._v(t._s(e.praises.length))]),t._v("人点赞")]),t._v(" "),s("div",{staticClass:"list-content-item-praises-content"},[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},t._l(e.praises,function(e,n){return s("img",{key:n,attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:e.photo?e.photo:"resources/images/icon/defaultUserPhoto.jpg",width:"40"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"})}))],1)]):t._e()],1)}))},staticRenderFns:[]};var m=s("D8HT")(r,l,!1,function(t){s("UUOy")},null,null).exports,u={name:"thumbsup",props:{comment:{type:Object,default:function(){return{}}}},data:function(){return{}},methods:{handlerShowThumbsUpInfo:function(){this.$forceUpdate(),this.comment.showPraises=!this.comment.showPraises},handleThumbsUp:function(){var t=this,e=this.tempComment.id;Object(o.e)({commentId:e}).then(function(e){e.success?t.refreshThumbaUps():t.$Notice.warning({title:"系统提示",desc:e.message})})},refreshThumbaUps:function(){var t=this,e={commentId:this.tempComment.id,limit:50,page:1,sort:[{property:"crtTime",direction:"DESC"}]};this.tempComment.isPraise=!0,Object(o.x)(e).then(function(e){t.comment.praises=e.tableContent})}},mounted:function(){},created:function(){}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"thumbsup"},[t.comment.praises.length>0?s("span",[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},nativeOn:{click:function(e){return t.handlerShowThumbsUpInfo(e)}}})],1):t._e(),t._v(" "),s("span",{class:{"comment-isPraise":t.comment.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},nativeOn:{click:function(e){return t.handleThumbsUp(e)}}}),t._v("\n        "+t._s(t.comment.praises.length)+"\n    ")],1)])},staticRenderFns:[]};var p=s("D8HT")(u,h,!1,function(t){s("REYt")},null,null).exports,d={name:"comments",components:{commentPublish:c.a,comments:C,MyPopTip:a.a,childComments:m,thumbsup:p},props:{comments:{type:Array,default:function(){return[]}},allowReply:{type:Boolean,default:!0}},data:function(){return{userInfo:{}}},watch:{},methods:{handlerShowThumbsUpInfo:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showPraises=!1),t.showReply=!1,t.showChilds=!1}),t.showPraises=!t.showPraises;var e={commentId:t.id,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};t.isPraise=!0,Object(o.x)(e).then(function(e){t.praises=e.tableContent,t.praiseNum=e.dataCount})},handleThumbsUp:function(t){var e=this;Object(o.e)({commentId:t.id}).then(function(s){if(s.success){var n={commentId:t.id,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};t.isPraise=!0,Object(o.x)(n).then(function(e){t.praises=e.tableContent,t.praiseNum=e.dataCount})}else e.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowChilds:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1),t.showPraises=!1}),t.showChilds=!t.showChilds;var e={parentId:t.id,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};this.getLowerComments(e,t)},handleShowReply:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1),e.showPraises=!1,e.showChilds=!1}),t.showReply=!t.showReply,t.showReply&&t.childCommentNum},handleReplyPublish:function(t,e,s,n){var a=this;this.$forceUpdate();var c={type:s.type,content:t,relationKey:s.relationKey,parentId:s.id,commentAttachments:e,commentAndReply:n};s.showChilds=!0,Object(o.M)(c).then(function(t){if(t.success){var e={parentId:s.id,limit:50,page:1,sort:i()([{property:"crtTime",direction:"DESC"}])};a.getLowerComments(e,s)}else a.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},handleViewFile:function(t){window.open(t.attachment)},showUserInfo:function(t){var e=this;Object(o.F)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},getLowerComments:function(t,e){Object(o.z)(t).then(function(t){e.childComment=t.tableContent,e.childCommentNum=t.dataCount})}},created:function(){},mounted:function(){}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"discussion"},[s("div",{staticClass:"discussion-content"},[s("Row",{staticClass:"list"},[s("div",{staticClass:"list-content"},t._l(t.comments,function(e,n){return s("Row",{key:n,staticClass:"list-content-item"},[s("Col",{staticClass:"list-content-item-user",attrs:{span:"2"}},[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("img",{attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:e.photo?e.photo:"resources/images/icon/contactor.png"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"})])],1),t._v(" "),s("Col",{staticClass:"list-content-item-content",attrs:{span:"22"}},[s("p",[s("b",[t._v(t._s(e.creatorName))])]),t._v(" "),s("div",{staticClass:"list-content-item-content-text",domProps:{innerHTML:t._s(e.content)}}),t._v(" "),e.commentAttachments.length>0?s("div",{staticClass:"list-content-item-img"},t._l(e.commentAttachments,function(e,n){return"image"===e.type?s("img",{key:n,attrs:{src:e.attachment?e.attachment:"resources/images/icon/defaultUserPhoto.png",width:"100",height:"100"}}):t._e()})):t._e(),t._v(" "),e.commentAttachments.length>0?s("div",{staticClass:"list-content-item-file"},t._l(e.commentAttachments,function(e,n){return"file"===e.type?s("p",{key:n},[s("a",{on:{click:function(s){t.handleViewFile(e)}}},[t._v(t._s(e.name)+"\r\n                                ")])]):t._e()})):t._e(),t._v(" "),s("div",{staticClass:"list-content-item-content-bar"},[s("span",{staticClass:"list-content-item-content-bar-left"},[s("span",[s("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{time:e.crtTime},expression:"{time:comment.crtTime}"}]}),t._v("发布\r\n                                ")]),t._v(" "),e.childCommentNum>0?s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowChilds(e)}}},[t._v("| 查看"+t._s(e.childCommentNum)+"条回复\r\n                                    ")]):t._e()]),t._v(" "),s("span",{staticClass:"list-content-item-content-bar-right"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowReply(e)}}},[t._v(" 回复")]),t._v(" "),s("span",{class:{"comment-isPraise":e.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},nativeOn:{click:function(s){t.handleThumbsUp(e)}}}),t._v("\r\n                                    "+t._s(e.praiseNum)+"\r\n                                ")],1),t._v(" "),e.praises.length>0?s("span",[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},nativeOn:{click:function(s){t.handlerShowThumbsUpInfo(e)}}})],1):t._e()])]),t._v(" "),e.showReply||e.showChilds?s("div",{staticStyle:{"background-color":"rgb(240, 240, 240)",padding:"10px",border:"1px solid #ddd"}},[e.showReply?s("commentPublish",{attrs:{handlePublish:t.handleReplyPublish,superComment:e,ischild:!0,allowFile:!1}}):t._e(),t._v(" "),e.showChilds?s("child-comments",{attrs:{superComment:e,comments:e.childComment}}):t._e()],1):t._e(),t._v(" "),e.showPraises?s("div",{staticClass:"list-content-item-praises"},[s("p",[t._v("共"),s("b",[t._v(t._s(e.praiseNum))]),t._v("人点赞")]),t._v(" "),s("div",{staticClass:"list-content-item-praises-content"},[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},t._l(e.praises,function(e,n){return s("img",{key:n,attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:e.photo?e.photo:"resources/images/icon/defaultUserPhoto.jpg",width:"40"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"})}))],1)]):t._e()])],1)}))])],1)])},staticRenderFns:[]};var v=s("D8HT")(d,f,!1,function(t){s("qnnD")},null,null),C=e.a=v.exports},bqNN:function(t,e){},c72o:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("Edqs"),i=s.n(n),o=s("3SZ7"),a=s.n(o),c=s("GIAq"),r=s("bJtM"),l=s("ejmB"),m={name:"userComments",components:{comments:r.a,commentPublish:l.a},props:{},data:function(){return{transCode:this.$route.params.transCode,type:"instance",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0}}},methods:{handlePublish:function(t,e){var s=this,n={type:this.type,content:t,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:e};Object(c.M)(n).then(function(t){t.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var t=this,e={relationKey:this.transCode,sort:a()([{property:"crtTime",direction:"DESC"}])};e=i()(e,this.pageInfo),Object(c.y)(e).then(function(e){t.comments=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(t){this.pageInfo.page=t,this.refreshComments()}},mounted:function(){this.refreshComments()}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg_ff "},[s("Row",{staticClass:"app-resource-group-title"},[s("h3",[t._v("评论 ")])]),t._v(" "),s("Row",{staticClass:"comments"},[s("commentPublish",{attrs:{handlePublish:t.handlePublish}}),t._v(" "),t.comments.length>0?s("div",{staticClass:"comments-header martop10"},[s("strong",[t._v("最新评论("+t._s(t.pageInfo.total)+")")])]):t._e(),t._v(" "),s("comments",{attrs:{comments:t.comments,refreshRootComments:t.refreshComments}}),t._v(" "),t.pageInfo.total>0?s("Page",{staticClass:"pad20",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":t.handlePageChange}}):t._e()],1)],1)},staticRenderFns:[]};var h=s("D8HT")(m,u,!1,function(t){s("Fq3m")},"data-v-1c8182ba",null);e.default=h.exports},ejmB:function(t,e,s){"use strict";var n=s("oAV5"),i={name:"coment-publish",props:{discContent:{type:Object,default:function(){return{txt:""}}},handlePublish:{type:Function},comments:{type:Array,default:function(){return[]}},superComment:{type:Object,default:function(){return{}}},allowFile:{type:Boolean,default:!0},ischild:{type:Boolean,default:!1}},data:function(){return{innerText:this.discContent.txt,lock:!1,httpHeaders:{Authorization:Object(n.c)()},faces:[],defaultList:[],defaultFileList:[],imgName:"",visible:!1,uploadList:[],disabledSendBtn:!0,commentAndReply:!1}},watch:{discContent:{handler:function(t,e){this.lock||(this.innerText=this.discContent.txt),t.txt&&(this.disabledSendBtn=!1)},deep:!0}},methods:{choice_face:function(t){this.discContent.txt=this.discContent.txt+'<img src="'+t+'" width="20">'},changeTxt:function(t){this.discContent.txt=t.target.innerHTML},send:function(){var t=this.uploadList.map(function(t){return{attachment:t.url,type:"image"}}),e=this.uploadFileList.map(function(t){return{attachment:t.url,type:"file"}});e=e.concat(t),this.handlePublish(this.discContent.txt,e,this.superComment,this.commentAndReply),this.innerText="",this.discContent.txt="",this.$refs.upload.clearFiles(),this.$refs.uploadFile.clearFiles(),this.uploadList=[],this.uploadFileList=[]},handleView:function(t){this.imgName=t,this.visible=!0},handleRemove:function(t){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1)},handleSuccess:function(t,e){e.url="/H_roleplay-si/ds/download?url="+t.data[0].attacthment,e.name=t.data[0].attacthment},handleFileSuccess:function(t,e){e.url="/H_roleplay-si/ds/download?url="+t.data[0].attacthment},handleFormatError:function(t){this.$Notice.warning({title:"系统提示",desc:"图片 "+t.name+"格式不支持, 请选择格式为jpg或者png的图片"})},handleMaxSize:function(t){this.$Notice.warning({title:"超过文件大小限制",desc:"文件  "+t.name+"太大,最多支持2M."})},handleBeforeUpload:function(){var t=this.uploadList.length<9;return t||this.$Notice.warning({title:"最多可以上传九张图片。 "}),t}},created:function(){for(var t=1;t<=141;t++)t<10?this.faces.push("resources/images/face/00"+t.toString()+"@2x.png"):t<=99?this.faces.push("resources/images/face/0"+t.toString()+"@2x.png"):this.faces.push("resources/images/face/"+t.toString()+"@2x.png")},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.uploadFileList=this.$refs.uploadFile.fileList}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"publish"},[s("Row",{staticClass:"publish-container"},[s("div",{staticClass:"publish-container-content",attrs:{contenteditable:"true"},domProps:{innerHTML:t._s(t.innerText)},on:{input:t.changeTxt,focus:function(e){t.lock=!0},blur:function(e){t.lock=!1}}})]),t._v(" "),s("br"),t._v(" "),s("Row",{staticClass:"publish-bar"},[s("Col",{staticClass:"publish-bar-left",attrs:{span:"12"}},[s("Poptip",{attrs:{placement:"bottom-start",width:"400"}},[s("Icon",{staticClass:"choice-face",attrs:{type:"ios-happy-outline",size:"24"}}),t._v("表情\n                    "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},t._l(t.faces,function(e){return s("img",{key:e,staticStyle:{float:"left",margin:"2px",cursor:"pointer"},attrs:{src:e,width:"24"},on:{click:function(s){t.choice_face(e)}}})}))],1),t._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:t.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start",width:"230"}},[s("Icon",{staticClass:"choice-img",attrs:{type:"md-images",size:"24"}}),t._v("图片\n                    "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[s("p",{staticClass:"lh25"},[s("span",[s("b",[t._v("本地上传")])]),t._v(" "),s("span",{staticClass:"fr"},[t._v("共"+t._s(t.uploadList.length)+"张,还能上传"+t._s(9-t.uploadList.length)+"张")])]),t._v(" "),t._l(t.uploadList,function(e,n){return s("div",{key:n,staticClass:"comment-upload-list"},["finished"===e.status?[s("img",{attrs:{src:e.url}}),t._v(" "),s("div",{staticClass:"comment-upload-list-cover"},[s("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(s){t.handleView(e.name)}}}),t._v(" "),s("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(s){t.handleRemove(e)}}})],1)]:[e.showProgress?s("Progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()]],2)}),t._v(" "),s("Upload",{directives:[{name:"show",rawName:"v-show",value:t.uploadList.length<9,expression:"uploadList.length<9"}],ref:"upload",staticStyle:{display:"table",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":t.defaultList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,headers:t.httpHeaders,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:"",type:"drag",action:"/H_roleplay-si/ds/upload"}},[s("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[s("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),t._v(" "),s("Modal",{attrs:{title:"查看图片"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?s("img",{staticStyle:{width:"100%"},attrs:{src:"/H_roleplay-si/ds/download?url="+t.imgName}}):t._e()])],2)],1),t._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:t.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start"}},[s("Icon",{staticClass:"choice-file",attrs:{type:"md-attach",size:"24"}}),t._v("文件\n                "),s("div",{attrs:{slot:"content"},slot:"content"},[s("Upload",{ref:"uploadFile",attrs:{multiple:"",headers:t.httpHeaders,"on-success":t.handleFileSuccess,"default-file-list":t.defaultFileList,action:"/H_roleplay-si/ds/upload"}},[s("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传文件")])],1)],1)],1),t._v(" "),t.ischild?s("span",[s("Checkbox",{model:{value:t.commentAndReply,callback:function(e){t.commentAndReply=e},expression:"commentAndReply"}},[t._v("同时评论到此应用")])],1):t._e()],1),t._v(" "),s("Col",{staticClass:"publish-bar-right",attrs:{span:"12"}},[s("Button",{nativeOn:{click:function(e){return t.send(e)}}},[t._v("发送")])],1)],1)],1)},staticRenderFns:[]};var a=s("D8HT")(i,o,!1,function(t){s("bqNN")},null,null);e.a=a.exports},qnnD:function(t,e){}});
//# sourceMappingURL=8.c6ed8e0bb4b2bcbbc0a0.js.map