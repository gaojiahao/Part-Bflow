webpackJsonp([6],{"0W92":function(e,t){},"43zf":function(e,t){},QrDQ:function(e,t){},U18u:function(e,t,s){"use strict";s.d(t,"c",function(){return i}),s.d(t,"d",function(){return o}),s.d(t,"a",function(){return a}),s.d(t,"b",function(){return r});var n=s("7B+g"),i=function(e){return Object(n.a)("/H_roleplay-si/comment/subscribeApp",e,"POST")},o=function(e){return Object(n.a)("/H_roleplay-si/comment/unsubscribeAppByRelationKey",e,"POST")},a=function(e){return Object(n.a)("/H_roleplay-si/comment/getUserByRelationKey",e)},r=function(e){return Object(n.a)("/H_roleplay-si/comment/isSubscribeByRelationKey",e)}},U7u3:function(e,t){},bJtM:function(e,t,s){"use strict";var n=s("GIAq"),i=s("3ovf"),o=s("ejmB"),a=s("woOf"),r=s.n(a),c=s("mvHQ"),l=s.n(c),u={name:"praises",components:{MyPopTip:i.a},props:{comment:{type:Object,default:function(){return{}}}},data:function(){return{praises:[],userInfo:{},pageInfo:{commentId:this.comment.id,limit:20,page:1,sort:l()([{property:"crtTime",direction:"DESC"}])}}},methods:{refreshPraises:function(){var e=this;Object(n.y)(this.pageInfo).then(function(t){e.praises=t.tableContent,e.comment.praiseNum=t.dataCount})},showUserInfo:function(e){var t=this;Object(n.G)(e).then(function(e){e.dataCount&&(t.userInfo=e.tableContent[0])})},handlePre:function(){this.pageInfo.page--,this.refreshPraises()},handleNext:function(){this.pageInfo.page++,this.refreshPraises()}},mounted:function(){this.refreshPraises()}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"praises"},[s("p",[e._v("共"),s("b",[e._v(e._s(e.comment.praiseNum))]),e._v("人点赞")]),e._v(" "),s("div",{staticClass:"praises-content"},[s("span",[s("my-pop-tip",{attrs:{userInfo:e.userInfo,trigger:"click"}},e._l(e.praises,function(t,n){return s("img",{key:n,attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:t.photo?t.photo:"resources/images/icon/defaultUserPhoto.jpg",width:"40"},on:{click:function(s){e.showUserInfo(t.creator)}},slot:"userCard"})}))],1)]),e._v(" "),s("div",{staticClass:"pageBar"},[e.pageInfo.page>1?s("Button",{on:{click:e.handlePre}},[e._v("上一页")]):e._e(),e._v(" "),e.pageInfo.page<Math.ceil(e.comment.praiseNum/20)?s("Button",{on:{click:e.handleNext}},[e._v("下一页")]):e._e()],1)])},staticRenderFns:[]};var h=s("VU/8")(u,m,!1,function(e){s("QrDQ")},"data-v-70ba077e",null).exports,p={name:"childComments",components:{MyPopTip:i.a,commentPublish:o.a,praises:h},props:{superComment:{type:Object,default:function(){return{}}},isInIframe:{type:Boolean,default:!1}},data:function(){return{userInfo:{},comments:[],childPage:{limit:10,page:1,sort:l()([{property:"crtTime",direction:"ASC"}])},showloadMore:!1}},methods:{handleLoadMore:function(){this.childPage.limit=(this.childPage.page+1)*this.childPage.limit,this.refreshComments()},handlerShowThumbsUpInfo:function(e){this.$forceUpdate(),this.comments.map(function(t){t.id!=e.id&&(t.showPraises=!1),e.showReply=!1}),e.showPraises=!e.showPraises},handleThumbsUp:function(e){var t=this;this.$forceUpdate();var s=e.id;Object(n.e)({commentId:s}).then(function(s){s.success?(t.$refs.praises&&t.$refs.praises.length>0&&t.$refs.praises[0].refreshPraises(),e.isPraise=!0,e.praiseNum++):t.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowReply:function(e){this.$forceUpdate(),this.comments.map(function(t){t.id!=e.id&&(t.showReply=!1),e.showPraises=!1}),e.showReply=!e.showReply},handleReplyPublish:function(e,t,s,i){var o=this;this.$forceUpdate();var a={type:s.type,content:e,relationKey:s.relationKey,parentId:s.id,commentAttachments:t,commentAndReply:i};Object(n.N)(a).then(function(e){e.success?(a.showReply=!1,o.refreshComments()):o.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},showUserInfo:function(e){var t=this;Object(n.G)(e).then(function(e){e.dataCount&&(t.userInfo=e.tableContent[0])})},refreshComments:function(){var e=this;this.$forceUpdate();var t={parentId:this.superComment.id};t=r()(t,this.childPage),Object(n.A)(t).then(function(t){e.comments=t.tableContent,e.superComment.childCommentNum=t.dataCount,e.comments.length<t.dataCount&&(e.showloadMore=!0)}).then(function(t){e.isInIframe&&window.top.setInstaceCommentsIframeHeight()})}},mounted:function(){this.refreshComments()}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"child-comments font14"},[e._l(e.comments,function(t,n){return s("div",{key:n,staticClass:"child-comments-item"},[s("p",[s("my-pop-tip",{attrs:{userInfo:e.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){e.showUserInfo(t.creator)}},slot:"userCard"},[e._v(e._s(t.creatorName)+"\n                ")])]),e._v(" "),t.parentId!=e.superComment.id?s("span",[e._v(":回复")]):e._e(),e._v(" "),t.parentId!=e.superComment.id?s("my-pop-tip",{attrs:{userInfo:e.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){e.showUserInfo(t.replyUserId)}},slot:"userCard"},[s("span",{staticClass:"child-comments-user"},[e._v("@")]),e._v(e._s(t.replyUserName)+"\n                    ")])]):e._e(),e._v(" "),s("span",[e._v(":")]),e._v(" "),s("span",{domProps:{innerHTML:e._s(t.content)}})],1),e._v(" "),s("p",[s("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{time:t.crtTime},expression:"{time:comment.crtTime}"}]}),e._v(" "),s("span",{staticClass:"fr"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){e.handleShowReply(t)}}},[e._v("回复")]),e._v(" "),s("span",{staticClass:"cursor-pointer",class:{"comment-isPraise":t.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},on:{click:function(s){e.handleThumbsUp(t)}}}),e._v("\n                    "+e._s(t.praiseNum)+"\n                ")],1),e._v(" "),t.praiseNum>0?s("span",{staticClass:"cursor-pointer"},[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},on:{click:function(s){e.handlerShowThumbsUpInfo(t)}}})],1):e._e()])]),e._v(" "),t.showReply?s("commentPublish",{staticClass:"reply",attrs:{handlePublish:e.handleReplyPublish,superComment:t,allowFile:!1,ischild:!0}}):e._e(),e._v(" "),t.showPraises?s("praises",{ref:"praises",refInFor:!0,attrs:{comment:t}}):e._e()],1)}),e._v(" "),e.showloadMore?s("div",{staticClass:"load-more",on:{click:e.handleLoadMore}},[e._v(" 查看更多 \n        "),s("Icon",{attrs:{type:"ios-arrow-down",size:"18"}})],1):e._e()],2)},staticRenderFns:[]};var f=s("VU/8")(p,d,!1,function(e){s("fgw4")},null,null).exports,b={name:"comments",components:{commentPublish:o.a,MyPopTip:i.a,childComments:f,praises:h},props:{comments:{type:Array,default:function(){return[]}},allowReply:{type:Boolean,default:!0},isInIframe:{type:Boolean,default:!1}},data:function(){return{userInfo:{},imgName:"",imgModalVisible:!1}},watch:{},methods:{handlerShowThumbsUpInfo:function(e){this.$forceUpdate(),this.comments.map(function(t){t.id!=e.id&&(t.showPraises=!1),e.showReply=!1,e.showChilds=!1}),e.showPraises=!e.showPraises},handleThumbsUp:function(e){var t=this;this.$forceUpdate(),Object(n.e)({commentId:e.id}).then(function(s){s.success?(t.$refs.praises&&t.$refs.praises.length>0&&t.$refs.praises[0].refreshPraises(),e.isPraise=!0,e.praiseNum++):t.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowChilds:function(e){this.$forceUpdate(),this.comments.map(function(t){t.id!=e.id&&(t.showReply=!1,t.showChilds=!1),t.showPraises=!1}),e.showChilds=!e.showChilds},handleShowReply:function(e){this.$forceUpdate(),this.comments.map(function(t){t.id!=e.id&&(t.showReply=!1),t.showPraises=!1,t.showChilds=!1}),e.showReply=!e.showReply},handleReplyPublish:function(e,t,s,i){var o=this;this.$forceUpdate();var a={type:s.type,content:e,relationKey:s.relationKey,parentId:s.id,commentAttachments:t,commentAndReply:i};s.showChilds=!0,Object(n.N)(a).then(function(e){e.success?(s.showReply=!1,o.$refs.childComments[0].handleLoadMore()):o.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},handleViewImg:function(e){this.imgName=e,this.imgModalVisible=!0},handleViewFile:function(e){window.open(e.attachment)},showUserInfo:function(e){var t=this;Object(n.G)(e).then(function(e){e.dataCount&&(t.userInfo=e.tableContent[0])})}},created:function(){},mounted:function(){}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"comments"},[s("div",{staticClass:"commnets-content"},e._l(e.comments,function(t,n){return s("Row",{key:n,staticClass:"comments-content-item"},[s("Col",{staticClass:"comments-content-item-user",attrs:{span:"2"}},[s("my-pop-tip",{attrs:{userInfo:e.userInfo,trigger:"click"}},[s("img",{attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:t.photo?t.photo:"resources/images/icon/contactor.png"},on:{click:function(s){e.showUserInfo(t.creator)}},slot:"userCard"})])],1),e._v(" "),s("Col",{staticClass:"comments-content-item-content",attrs:{span:"22"}},[s("p",[s("b",[e._v(e._s(t.creatorName))])]),e._v(" "),s("div",{staticClass:"comments-content-item-content-text",domProps:{innerHTML:e._s(t.content)}}),e._v(" "),t.commentAttachments.length>0?s("div",{staticClass:"comments-content-item-img"},e._l(t.commentAttachments,function(t,n){return"image"===t.type?s("div",{key:n,staticClass:"comimg"},[s("img",{attrs:{src:t.attachment?t.attachment:"resources/images/icon/defaultUserPhoto.png"}}),e._v(" "),s("div",{staticClass:"comimg-cover"},[s("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(s){e.handleViewImg(t.attachment)}}})],1)]):e._e()})):e._e(),e._v(" "),t.commentAttachments.length>0?s("div",{staticClass:"comments-content-item-file"},e._l(t.commentAttachments,function(t,n){return"file"===t.type?s("p",{key:n},[s("a",{on:{click:function(s){e.handleViewFile(t)}}},[e._v(e._s(t.name)+"\r\n                        ")])]):e._e()})):e._e(),e._v(" "),s("div",{staticClass:"comments-content-item-content-bar"},[s("span",{staticClass:"comments-content-item-content-bar-left"},[s("span",[s("span",{directives:[{name:"overTimeDirective",rawName:"v-overTimeDirective",value:{time:t.crtTime},expression:"{time:comment.crtTime}"}]}),e._v("发布\r\n                        ")]),e._v(" "),t.childCommentNum>0?s("span",{staticClass:"cursor-pointer",on:{click:function(s){e.handleShowChilds(t)}}},[e._v("| 查看"+e._s(t.childCommentNum)+"条回复\r\n                            ")]):e._e()]),e._v(" "),s("span",{staticClass:"comments-content-item-content-bar-right"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){e.handleShowReply(t)}}},[e._v(" 回复")]),e._v(" "),s("span",{class:{"comment-isPraise":t.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},nativeOn:{click:function(s){e.handleThumbsUp(t)}}}),e._v("\r\n                            "+e._s(t.praiseNum)+"\r\n                        ")],1),e._v(" "),t.praiseNum>0?s("span",[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},nativeOn:{click:function(s){e.handlerShowThumbsUpInfo(t)}}})],1):e._e()])]),e._v(" "),t.showReply||t.showChilds?s("div",{staticClass:"comments-content-item-content-reply"},[t.showReply?s("commentPublish",{attrs:{handlePublish:e.handleReplyPublish,superComment:t,ischild:!0,allowFile:!1}}):e._e(),e._v(" "),t.showChilds?s("child-comments",{ref:"childComments",refInFor:!0,staticClass:"martop5",attrs:{superComment:t,isInIframe:e.isInIframe}}):e._e()],1):e._e(),e._v(" "),t.showPraises?s("praises",{ref:"praises",refInFor:!0,attrs:{comment:t}}):e._e()],1)],1)})),e._v(" "),s("Modal",{attrs:{title:"查看图片"},model:{value:e.imgModalVisible,callback:function(t){e.imgModalVisible=t},expression:"imgModalVisible"}},[e.imgModalVisible?s("img",{staticStyle:{width:"100%"},attrs:{src:e.imgName}}):e._e()])],1)},staticRenderFns:[]};var _=s("VU/8")(b,v,!1,function(e){s("43zf")},"data-v-d3018674",null);t.a=_.exports},c72o:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("woOf"),i=s.n(n),o=s("mvHQ"),a=s.n(o),r=s("GIAq"),c=s("U18u"),l=s("bJtM"),u=s("ejmB"),m={name:"userComments",components:{comments:l.a,commentPublish:u.a},props:{},data:function(){return{transCode:this.$route.params.transCode,type:"instance",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},methods:{handlePublish:function(e,t){var s=this,n={type:this.type,content:e,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:t};Object(r.N)(n).then(function(e){e.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var e=this,t={relationKey:this.transCode,sort:a()([{property:"crtTime",direction:"DESC"}])};t=i()(t,this.pageInfo),Object(r.z)(t).then(function(t){e.comments=t.tableContent,e.pageInfo.total=t.dataCount}).then(function(e){window.top.setInstaceCommentsIframeHeight()})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var e=this;Object(c.c)({type:"instance",relationKey:this.transCode}).then(function(t){e.subscribeInfo.isSubscribe=1,e.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var t=this;Object(c.d)({relationKey:this.transCode}).then(function(e){t.subscribeInfo.isSubscribe=0,t.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var e=this;this.$forceUpdate(),Object(c.a)({relationKey:this.transCode,limit:10,page:1}).then(function(t){e.subscribeInfo.subscribeUsers=t.tableContent,e.subscribeInfo.subscribeNum=t.dataCount})},judgeIsSubscribeByRelationKey:function(e){var t=this;Object(c.b)({relationKey:this.transCode}).then(function(e){t.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},h={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"bg_ff "},[s("Row",{staticClass:"app-resource-group-title"},[s("h3",[e._v("评论 \n              "),s("b",{staticClass:"fr subscribe-bar"},[s("span",[1==e.subscribeInfo.isSubscribe&&e.subcribeVisible?s("span",{staticClass:"subcribeing",on:{mouseover:function(t){e.unsubcribeVisible=!0,e.subcribeVisible=!1},mouseout:function(t){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[s("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),e._v("正在关注中\n                      ")],1):e._e(),e._v(" "),1==e.subscribeInfo.isSubscribe&&e.unsubcribeVisible?s("span",{staticClass:"unsubcribe",on:{click:e.handleUnsubscribeApp,mouseout:function(t){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[s("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),e._v("取消关注\n                      ")],1):e._e(),e._v(" "),0==e.subscribeInfo.isSubscribe?s("span",{staticClass:"subcribe",on:{click:e.handleSubscribeApp}},[e._v("关注")]):e._e(),e._v(" "),s("span",[s("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),e._v(" "),s("span",[s("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{placement:"bottom-end",trigger:"click"}},[s("Icon",{attrs:{type:"md-person",size:"18"}}),e._v(" "+e._s(e.subscribeInfo.subscribeNum)+"\n                      "),s("DropdownMenu",{attrs:{slot:"list"},slot:"list"},e._l(e.subscribeInfo.subscribeUsers,function(t,n){return s("DropdownItem",{key:n},[e._v("\n                             "+e._s(t.nickname)+"\n                          ")])}))],1)],1)])])]),e._v(" "),s("Row",{staticClass:"comments"},[s("commentPublish",{attrs:{handlePublish:e.handlePublish}}),e._v(" "),e.comments.length>0?s("div",{staticClass:"comments-header martop10"},[s("strong",[e._v("最新评论("+e._s(e.pageInfo.total)+")")])]):e._e(),e._v(" "),s("comments",{attrs:{isInIframe:!0,comments:e.comments,refreshRootComments:e.refreshComments}}),e._v(" "),e.pageInfo.total>0?s("Page",{staticClass:"pad20",attrs:{total:e.pageInfo.total,"page-size":e.pageInfo.limit,current:e.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":e.handlePageChange}}):e._e()],1)],1)},staticRenderFns:[]};var p=s("VU/8")(m,h,!1,function(e){s("U7u3")},"data-v-a9af891c",null);t.default=p.exports},ejmB:function(e,t,s){"use strict";var n=s("oAV5"),i={name:"coment-publish",props:{discContent:{type:Object,default:function(){return{txt:""}}},handlePublish:{type:Function},comments:{type:Array,default:function(){return[]}},superComment:{type:Object,default:function(){return{}}},allowFile:{type:Boolean,default:!0},ischild:{type:Boolean,default:!1}},data:function(){return{innerText:this.discContent.txt,lock:!1,httpHeaders:{Authorization:Object(n.c)()},faces:[],defaultList:[],defaultFileList:[],imgName:"",visible:!1,uploadList:[],uploadFileList:[],commentAndReply:!1,faceVisible:!1}},watch:{discContent:{handler:function(e,t){this.lock||(this.innerText=this.discContent.txt)},deep:!0}},methods:{choice_face:function(e){this.discContent.txt=this.discContent.txt+'<img src="'+e+'" width="20">',this.faceVisible=!1},changeTxt:function(e){this.discContent.txt=e.target.innerHTML},handleSend:function(){var e=this.uploadList.map(function(e){return{attachment:e.url,type:"image"}}),t=this.uploadFileList.map(function(e){return{attachment:e.url,type:"file"}});t=t.concat(e),this.handlePublish(this.discContent.txt,t,this.superComment,this.commentAndReply),this.innerText="",this.discContent.txt="",this.$refs.publishContent.innerText="",this.$refs.upload.clearFiles(),this.$refs.uploadFile.clearFiles(),this.uploadList=this.$refs.upload.fileList,this.uploadFileList=this.$refs.uploadFile.fileList},handleView:function(e){this.imgName=e,this.visible=!0},handleRemove:function(e){var t=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(t.indexOf(e),1)},handleSuccess:function(e,t){t.url="/H_roleplay-si/ds/download?url="+e.data[0].attacthment,t.name=e.data[0].attacthment},handleFileSuccess:function(e,t){t.url="/H_roleplay-si/ds/download?url="+e.data[0].attacthment},handleFormatError:function(e){this.$Notice.warning({title:"系统提示",desc:"图片 "+e.name+"格式不支持, 请选择格式为jpg或者png的图片"})},handleMaxSize:function(e){this.$Notice.warning({title:"超过文件大小限制",desc:"文件  "+e.name+"太大,最多支持2M."})},handleBeforeImgUpload:function(){var e=this.uploadList.length<9;return e||this.$Notice.warning({title:"您最多可以上传九张图片。 "}),e},handleBeforeFileUpload:function(){var e=this.uploadFileList.length<9;return e||this.$Notice.warning({title:"您最多可以上传九分文件。 "}),e},handleClearImg:function(){this.$refs.upload.clearFiles(),this.uploadList=this.$refs.upload.fileList},handleClearFile:function(){this.$refs.uploadFile.clearFiles(),this.uploadFileList=this.$refs.uploadFile.fileList}},created:function(){for(var e=1;e<=141;e++)e<10?this.faces.push("resources/images/face/00"+e.toString()+"@2x.png"):e<=99?this.faces.push("resources/images/face/0"+e.toString()+"@2x.png"):this.faces.push("resources/images/face/"+e.toString()+"@2x.png")},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.uploadFileList=this.$refs.uploadFile.fileList}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"publish"},[s("Row",{staticClass:"publish-container"},[s("div",{ref:"publishContent",staticClass:"publish-container-content",attrs:{contenteditable:"true"},domProps:{innerHTML:e._s(e.innerText)},on:{input:e.changeTxt,focus:function(t){e.lock=!0},blur:function(t){e.lock=!1}}})]),e._v(" "),s("br"),e._v(" "),s("Row",{staticClass:"publish-bar"},[s("Col",{staticClass:"publish-bar-left",attrs:{span:"12"}},[s("Poptip",{attrs:{placement:"bottom-start",width:"400"},model:{value:e.faceVisible,callback:function(t){e.faceVisible=t},expression:"faceVisible"}},[s("Icon",{staticClass:"choice-face",attrs:{type:"ios-happy-outline",size:"24"}}),e._v("表情\n                    "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},e._l(e.faces,function(t){return s("img",{key:t,staticStyle:{float:"left",margin:"2px",cursor:"pointer"},attrs:{src:t,width:"24"},on:{click:function(s){e.choice_face(t)}}})}))],1),e._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:e.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start",width:"230"}},[s("Icon",{staticClass:"choice-img",attrs:{type:"md-images",size:"24"}}),e._v("图片\n                    "),e.uploadList.length>0?s("span",[e._v("("+e._s(e.uploadList.length)+")")]):e._e(),e._v(" "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[s("p",{staticClass:"lh25 marbottom10"},[s("span",[e._v("共"+e._s(e.uploadList.length)+"张,您还能上传"+e._s(9-e.uploadList.length)+"张")]),e._v(" "),e.uploadList.length>0?s("Button",{staticClass:"fr",attrs:{type:"warning"},on:{click:e.handleClearImg}},[e._v("清空全部")]):e._e()],1),e._v(" "),e._l(e.uploadList,function(t,n){return s("div",{key:n,staticClass:"comment-upload-list"},["finished"===t.status?[s("img",{attrs:{src:t.url}}),e._v(" "),s("div",{staticClass:"comment-upload-list-cover"},[s("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(s){e.handleView(t.name)}}}),e._v(" "),s("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(s){e.handleRemove(t)}}})],1)]:[t.showProgress?s("Progress",{attrs:{percent:t.percentage,"hide-info":""}}):e._e()]],2)}),e._v(" "),s("Upload",{directives:[{name:"show",rawName:"v-show",value:e.uploadList.length<9,expression:"uploadList.length<9"}],ref:"upload",staticStyle:{display:"table",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":e.defaultList,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,headers:e.httpHeaders,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,"before-upload":e.handleBeforeImgUpload,multiple:"",type:"drag",action:"/H_roleplay-si/ds/upload"}},[s("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[s("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),e._v(" "),s("Modal",{attrs:{title:"查看图片"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?s("img",{staticStyle:{width:"100%"},attrs:{src:"/H_roleplay-si/ds/download?url="+e.imgName}}):e._e()])],2)],1),e._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:e.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start"}},[s("Icon",{staticClass:"choice-file",attrs:{type:"md-attach",size:"24"}}),e._v("文件\n                 "),e.uploadFileList.length>0?s("span",[e._v("("+e._s(e.uploadFileList.length)+")")]):e._e(),e._v(" "),s("div",{attrs:{slot:"content"},slot:"content"},[s("p",{staticClass:"lh25 marbottom10",staticStyle:{"min-width":"230px"}},[s("span",[e._v("共"+e._s(e.uploadFileList.length)+"份,您还能上传"+e._s(9-e.uploadFileList.length)+"份")]),e._v(" "),e.uploadFileList.length>0?s("Button",{staticClass:"fr",attrs:{type:"warning"},on:{click:e.handleClearFile}},[e._v("清空全部")]):e._e()],1),e._v(" "),s("Upload",{ref:"uploadFile",attrs:{multiple:"",headers:e.httpHeaders,"on-success":e.handleFileSuccess,"default-file-list":e.defaultFileList,"before-upload":e.handleBeforeFileUpload,action:"/H_roleplay-si/ds/upload"}},[s("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传文件")])],1)],1)],1),e._v(" "),e.ischild?s("span",[s("Checkbox",{model:{value:e.commentAndReply,callback:function(t){e.commentAndReply=t},expression:"commentAndReply"}},[e._v("同时评论到此应用")])],1):e._e()],1),e._v(" "),s("Col",{staticClass:"publish-bar-right",attrs:{span:"12"}},[s("Button",{nativeOn:{click:function(t){return e.handleSend(t)}}},[e._v("发送")])],1)],1)],1)},staticRenderFns:[]};var a=s("VU/8")(i,o,!1,function(e){s("0W92")},"data-v-2029b7ef",null);t.a=a.exports},fgw4:function(e,t){}});
//# sourceMappingURL=6.5dd1ef0b06043136651d.js.map