webpackJsonp([11],{"A1/K":function(t,e){},U18u:function(t,e,s){"use strict";s.d(e,"c",function(){return i}),s.d(e,"d",function(){return o}),s.d(e,"a",function(){return a}),s.d(e,"b",function(){return r});var n=s("7B+g"),i=function(t){return Object(n.a)("/H_roleplay-si/comment/subscribeApp",t,"POST")},o=function(t){return Object(n.a)("/H_roleplay-si/comment/unsubscribeAppByRelationKey",t,"POST")},a=function(t){return Object(n.a)("/H_roleplay-si/comment/getUserByRelationKey",t)},r=function(t){return Object(n.a)("/H_roleplay-si/comment/isSubscribeByRelationKey",t)}},WhJB:function(t,e){},axHO:function(t,e){},bJtM:function(t,e,s){"use strict";var n=s("GIAq"),i=s("3ovf"),o=s("ejmB"),a=s("woOf"),r=s.n(a),c=s("mvHQ"),l=s.n(c),u={name:"praises",components:{MyPopTip:i.a},props:{comment:{type:Object,default:function(){return{}}}},data:function(){return{praises:[],userInfo:{},pageInfo:{commentId:this.comment.id,limit:20,page:1,sort:l()([{property:"crtTime",direction:"DESC"}])}}},methods:{refreshPraises:function(){var t=this;Object(n.B)(this.pageInfo).then(function(e){t.praises=e.tableContent,t.comment.praiseNum=e.dataCount})},showUserInfo:function(t){var e=this;Object(n.N)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},handlePre:function(){this.pageInfo.page--,this.refreshPraises()},handleNext:function(){this.pageInfo.page++,this.refreshPraises()}},mounted:function(){this.refreshPraises()}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"praises"},[s("p",[t._v("共"),s("b",[t._v(t._s(t.comment.praiseNum))]),t._v("人点赞")]),t._v(" "),s("div",{staticClass:"praises-content"},[s("span",[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},t._l(t.praises,function(e,n){return s("img",{key:n,attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:e.photo?e.photo:"resources/images/icon/defaultUserPhoto.jpg",width:"40"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"})}))],1)]),t._v(" "),s("div",{staticClass:"pageBar"},[t.pageInfo.page>1?s("Button",{on:{click:t.handlePre}},[t._v("上一页")]):t._e(),t._v(" "),t.pageInfo.page<Math.ceil(t.comment.praiseNum/20)?s("Button",{on:{click:t.handleNext}},[t._v("下一页")]):t._e()],1)])},staticRenderFns:[]};var h=s("VU/8")(u,m,!1,function(t){s("A1/K")},"data-v-795b20c3",null).exports,p={name:"childComments",components:{MyPopTip:i.a,commentPublish:o.a,praises:h},props:{superComment:{type:Object,default:function(){return{}}},isInIframe:{type:Boolean,default:!1}},data:function(){return{userInfo:{},comments:[],childPage:{limit:10,page:1,sort:l()([{property:"crtTime",direction:"ASC"}])},showloadMore:!1}},methods:{handleLoadMore:function(){this.childPage.limit=(this.childPage.page+1)*this.childPage.limit,this.refreshComments()},handlerShowThumbsUpInfo:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showPraises=!1),t.showReply=!1}),t.showPraises=!t.showPraises},handleThumbsUp:function(t){var e=this;this.$forceUpdate();var s=t.id;Object(n.f)({commentId:s}).then(function(s){s.success?(e.$refs.praises&&e.$refs.praises.length>0&&e.$refs.praises[0].refreshPraises(),t.isPraise=!0,t.praiseNum++):e.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowReply:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1),t.showPraises=!1}),t.showReply=!t.showReply},handleReplyPublish:function(t,e,s,i){var o=this;this.$forceUpdate();var a={type:s.type,content:t,relationKey:s.relationKey,parentId:s.id,commentAttachments:e,commentAndReply:i};Object(n.U)(a).then(function(t){t.success?(a.showReply=!1,o.refreshComments()):o.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},showUserInfo:function(t){var e=this;Object(n.N)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})},refreshComments:function(){var t=this;this.$forceUpdate();var e={parentId:this.superComment.id};e=r()(e,this.childPage),Object(n.D)(e).then(function(e){t.comments=e.tableContent,t.superComment.childCommentNum=e.dataCount,t.comments.length<e.dataCount&&(t.showloadMore=!0)}).then(function(e){t.isInIframe&&window.top.setInstaceCommentsIframeHeight()})}},mounted:function(){this.refreshComments()}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"child-comments font14"},[t._l(t.comments,function(e,n){return s("div",{key:n,staticClass:"child-comments-item"},[s("p",[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"},[t._v(t._s(e.creatorName)+"\n                ")])]),t._v(" "),e.parentId!=t.superComment.id?s("span",[t._v(":回复")]):t._e(),t._v(" "),e.parentId!=t.superComment.id?s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("span",{staticClass:"child-comments-user",attrs:{slot:"userCard"},on:{click:function(s){t.showUserInfo(e.replyUserId)}},slot:"userCard"},[s("span",{staticClass:"child-comments-user"},[t._v("@")]),t._v(t._s(e.replyUserName)+"\n                    ")])]):t._e(),t._v(" "),s("span",[t._v(":")]),t._v(" "),s("span",{domProps:{innerHTML:t._s(e.content)}})],1),t._v(" "),s("p",[s("span",[t._v("\n                "+t._s(e.times+" 前")+"\n            ")]),t._v(" "),s("span",{staticClass:"fr"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowReply(e)}}},[t._v("回复")]),t._v(" "),s("span",{staticClass:"cursor-pointer",class:{"comment-isPraise":e.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},on:{click:function(s){t.handleThumbsUp(e)}}}),t._v("\n                    "+t._s(e.praiseNum)+"\n                ")],1),t._v(" "),e.praiseNum>0?s("span",{staticClass:"cursor-pointer"},[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},on:{click:function(s){t.handlerShowThumbsUpInfo(e)}}})],1):t._e()])]),t._v(" "),e.showReply?s("commentPublish",{staticClass:"reply",attrs:{handlePublish:t.handleReplyPublish,superComment:e,allowFile:!1,ischild:!0}}):t._e(),t._v(" "),e.showPraises?s("praises",{ref:"praises",refInFor:!0,attrs:{comment:e}}):t._e()],1)}),t._v(" "),t.showloadMore?s("div",{staticClass:"load-more",on:{click:t.handleLoadMore}},[t._v(" 查看更多 \n        "),s("Icon",{attrs:{type:"ios-arrow-down",size:"18"}})],1):t._e()],2)},staticRenderFns:[]};var f=s("VU/8")(p,d,!1,function(t){s("axHO")},null,null).exports,b={name:"comments",components:{commentPublish:o.a,MyPopTip:i.a,childComments:f,praises:h},props:{comments:{type:Array,default:function(){return[]}},allowReply:{type:Boolean,default:!0},isInIframe:{type:Boolean,default:!1}},data:function(){return{userInfo:{},imgName:"",imgModalVisible:!1}},watch:{},methods:{handlerShowThumbsUpInfo:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showPraises=!1),t.showReply=!1,t.showChilds=!1}),t.showPraises=!t.showPraises},handleThumbsUp:function(t){var e=this;this.$forceUpdate(),t.isPraise?Object(n.d)(t.id).then(function(s){s.success?(e.$refs.praises&&e.$refs.praises.length>0&&e.$refs.praises[0].refreshPraises(),t.isPraise=!1,t.praiseNum--):e.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})}):Object(n.f)({commentId:t.id}).then(function(s){s.success?(e.$refs.praises&&e.$refs.praises.length>0&&e.$refs.praises[0].refreshPraises(),t.isPraise=!0,t.praiseNum++):e.$Notice.warning({title:"系统提示",desc:"点赞,您可以尝试再次点赞或者联系企业管理员哦!"})})},handleShowChilds:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1,e.showChilds=!1),e.showPraises=!1}),t.showChilds=!t.showChilds},handleShowReply:function(t){this.$forceUpdate(),this.comments.map(function(e){e.id!=t.id&&(e.showReply=!1),e.showPraises=!1,e.showChilds=!1}),window.top.setInstaceCommentsIframeHeight&&window.top.setInstaceCommentsIframeHeight(),t.showReply=!t.showReply},handleReplyPublish:function(t,e,s,i){var o=this;this.$forceUpdate();var a={type:s.type,content:t,relationKey:s.relationKey,parentId:s.id,commentAttachments:e,commentAndReply:i};s.showChilds=!0,Object(n.U)(a).then(function(t){t.success?(s.showReply=!1,o.$refs.childComments[0].handleLoadMore()):o.$Notice.warning({title:"系统提示",desc:"添加回复,请联系企业管理员!"})})},handleViewImg:function(t){window.top.viewInsCommentsImg?window.top.viewInsCommentsImg(t):(this.imgName=t,this.imgModalVisible=!0)},handleViewFile:function(t){window.open(t.attachment)},showUserInfo:function(t){var e=this;Object(n.N)(t).then(function(t){t.dataCount&&(e.userInfo=t.tableContent[0])})}},created:function(){},mounted:function(){}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"comments"},[s("div",{staticClass:"commnets-content"},t._l(t.comments,function(e,n){return s("Row",{key:n,staticClass:"comments-content-item"},[s("Col",{staticClass:"comments-content-item-user",attrs:{span:"2"}},[s("my-pop-tip",{attrs:{userInfo:t.userInfo,trigger:"click"}},[s("img",{attrs:{slot:"userCard",onerror:"src='resources/images/icon/defaultUserPhoto.jpg'",src:e.photo?e.photo:"resources/images/icon/contactor.png"},on:{click:function(s){t.showUserInfo(e.creator)}},slot:"userCard"})])],1),t._v(" "),s("Col",{staticClass:"comments-content-item-content",attrs:{span:"22"}},[s("p",[s("b",[t._v(t._s(e.creatorName))])]),t._v(" "),s("div",{staticClass:"comments-content-item-content-text",domProps:{innerHTML:t._s(e.content)}}),t._v(" "),e.commentAttachments.length>0?s("div",{staticClass:"comments-content-item-img"},t._l(e.commentAttachments,function(e,n){return"image"===e.type?s("div",{key:n,staticClass:"comimg"},[s("img",{attrs:{src:e.attachment?e.attachment:"resources/images/icon/defaultUserPhoto.png"}}),t._v(" "),s("div",{staticClass:"comimg-cover"},[s("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(s){t.handleViewImg(e.attachment)}}})],1)]):t._e()})):t._e(),t._v(" "),e.commentAttachments.length>0?s("div",{staticClass:"comments-content-item-file"},t._l(e.commentAttachments,function(e,n){return"file"===e.type?s("p",{key:n},[s("a",{on:{click:function(s){t.handleViewFile(e)}}},[t._v(t._s(e.name)+"\r\n                        ")])]):t._e()})):t._e(),t._v(" "),s("div",{staticClass:"comments-content-item-content-bar"},[s("span",{staticClass:"comments-content-item-content-bar-left"},[s("span",[t._v("\r\n                            "+t._s(e.times+" 前")+"\r\n                        ")]),t._v(" "),e.childCommentNum>0?s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowChilds(e)}}},[t._v("| 查看"),s("strong",[t._v(" "+t._s(e.childCommentNum))]),t._v("条回复\r\n                            ")]):t._e()]),t._v(" "),s("span",{staticClass:"comments-content-item-content-bar-right"},[s("span",{staticClass:"cursor-pointer",on:{click:function(s){t.handleShowReply(e)}}},[t._v(" 回复")]),t._v(" "),s("span",{class:{"comment-isPraise":e.isPraise}},[s("Icon",{attrs:{type:"md-thumbs-up",size:"18"},nativeOn:{click:function(s){t.handleThumbsUp(e)}}}),t._v("\r\n                            "+t._s(e.praiseNum)+"\r\n                        ")],1),t._v(" "),e.praiseNum>0?s("span",[s("Icon",{attrs:{type:"ios-arrow-down",size:"18"},nativeOn:{click:function(s){t.handlerShowThumbsUpInfo(e)}}})],1):t._e()])]),t._v(" "),e.showReply||e.showChilds?s("div",{staticClass:"comments-content-item-content-reply"},[e.showReply?s("commentPublish",{attrs:{handlePublish:t.handleReplyPublish,superComment:e,ischild:!0,allowFile:!1}}):t._e(),t._v(" "),e.showChilds?s("child-comments",{ref:"childComments",refInFor:!0,staticClass:"martop5",attrs:{superComment:e,isInIframe:t.isInIframe}}):t._e()],1):t._e(),t._v(" "),e.showPraises?s("praises",{ref:"praises",refInFor:!0,attrs:{comment:e}}):t._e()],1)],1)})),t._v(" "),s("Modal",{attrs:{title:"查看图片",width:"80%"},model:{value:t.imgModalVisible,callback:function(e){t.imgModalVisible=e},expression:"imgModalVisible"}},[t.imgModalVisible?s("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])],1)},staticRenderFns:[]};var _=s("VU/8")(b,v,!1,function(t){s("WhJB")},"data-v-d451c398",null);e.a=_.exports},c72o:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("woOf"),i=s.n(n),o=s("mvHQ"),a=s.n(o),r=s("GIAq"),c=s("U18u"),l=s("bJtM"),u=s("ejmB"),m={name:"userComments",components:{comments:l.a,commentPublish:u.a},props:{},data:function(){return{transCode:this.$route.params.transCode,type:"instance",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},methods:{handlePublish:function(t,e){var s=this,n={type:this.type,content:t,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:e};Object(r.U)(n).then(function(t){t.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var t=this,e={relationKey:this.transCode,sort:a()([{property:"crtTime",direction:"DESC"}])};e=i()(e,this.pageInfo),Object(r.C)(e).then(function(e){t.comments=e.tableContent,t.pageInfo.total=e.dataCount}).then(function(t){window.top.setInstaceCommentsIframeHeight()})},handlePageChange:function(t){this.pageInfo.page=t,this.refreshComments()},handleSubscribeApp:function(){var t=this;Object(c.c)({type:"instance",relationKey:this.transCode}).then(function(e){t.subscribeInfo.isSubscribe=1,t.refreshSubscribeInfo()})},handleUnsubscribeApp:function(t){var e=this;Object(c.d)({relationKey:this.transCode}).then(function(t){e.subscribeInfo.isSubscribe=0,e.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var t=this;this.$forceUpdate(),Object(c.a)({relationKey:this.transCode,limit:10,page:1}).then(function(e){t.subscribeInfo.subscribeUsers=e.tableContent,t.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(t){var e=this;Object(c.b)({relationKey:this.transCode}).then(function(t){e.subscribeInfo.isSubscribe=t})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg_ff "},[s("Row",{staticClass:"app-resource-group-title"},[s("h3",[t._v("评论 \n              "),s("b",{staticClass:"fr subscribe-bar"},[s("span",[1==t.subscribeInfo.isSubscribe&&t.subcribeVisible?s("span",{staticClass:"subcribeing",on:{mouseover:function(e){t.unsubcribeVisible=!0,t.subcribeVisible=!1},mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[s("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),t._v("正在关注中\n                      ")],1):t._e(),t._v(" "),1==t.subscribeInfo.isSubscribe&&t.unsubcribeVisible?s("span",{staticClass:"unsubcribe",on:{click:t.handleUnsubscribeApp,mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[s("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),t._v("取消关注\n                      ")],1):t._e(),t._v(" "),0==t.subscribeInfo.isSubscribe?s("span",{staticClass:"subcribe",on:{click:t.handleSubscribeApp}},[t._v("关注")]):t._e(),t._v(" "),s("span",[s("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),t._v(" "),s("span",[s("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{placement:"bottom-end",trigger:"click"}},[s("Icon",{attrs:{type:"md-person",size:"18"}}),t._v(" "+t._s(t.subscribeInfo.subscribeNum)+"\n                      "),s("DropdownMenu",{attrs:{slot:"list"},slot:"list"},t._l(t.subscribeInfo.subscribeUsers,function(e,n){return s("DropdownItem",{key:n},[t._v("\n                             "+t._s(e.nickname)+"\n                          ")])}))],1)],1)])])]),t._v(" "),s("Row",{staticClass:"comments"},[s("commentPublish",{attrs:{handlePublish:t.handlePublish}}),t._v(" "),t.comments.length>0?s("div",{staticClass:"comments-header martop10"},[s("strong",[t._v("最新评论("+t._s(t.pageInfo.total)+")")])]):t._e(),t._v(" "),s("comments",{attrs:{isInIframe:!0,comments:t.comments,refreshRootComments:t.refreshComments}}),t._v(" "),t.pageInfo.total>0?s("Page",{staticClass:"pad20",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":t.handlePageChange}}):t._e()],1)],1)},staticRenderFns:[]};var p=s("VU/8")(m,h,!1,function(t){s("f/nA")},"data-v-a9af891c",null);e.default=p.exports},ejmB:function(t,e,s){"use strict";var n=s("oAV5"),i={name:"coment-publish",props:{discContent:{type:Object,default:function(){return{txt:""}}},handlePublish:{type:Function},comments:{type:Array,default:function(){return[]}},superComment:{type:Object,default:function(){return{}}},allowFile:{type:Boolean,default:!0},ischild:{type:Boolean,default:!1}},data:function(){return{innerText:this.discContent.txt,lock:!1,httpHeaders:{Authorization:Object(n.c)()},faces:[],defaultList:[],defaultFileList:[],imgName:"",visible:!1,uploadList:[],uploadFileList:[],commentAndReply:!1,faceVisible:!1}},watch:{discContent:{handler:function(t,e){this.lock||(this.innerText=this.discContent.txt)},deep:!0}},methods:{choice_face:function(t){this.discContent.txt=this.discContent.txt+'<img src="'+t+'" width="20">',this.faceVisible=!1},changeTxt:function(t){this.discContent.txt=t.target.innerHTML},handleSend:function(){var t=this.uploadList.map(function(t){return{attachment:t.url,type:"image"}}),e=this.uploadFileList.map(function(t){return{attachment:t.url,type:"file"}});e=e.concat(t),this.handlePublish(this.discContent.txt,e,this.superComment,this.commentAndReply),this.innerText="",this.discContent.txt="",this.$refs.publishContent.innerText="",this.$refs.upload.clearFiles(),this.$refs.uploadFile.clearFiles(),this.uploadList=this.$refs.upload.fileList,this.uploadFileList=this.$refs.uploadFile.fileList},handleView:function(t){this.imgName=t,this.visible=!0},handleRemove:function(t){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1)},handleSuccess:function(t,e){e.url="/H_roleplay-si/ds/download?url="+t.data[0].attacthment,e.name=t.data[0].attacthment},handleFileSuccess:function(t,e){e.url="/H_roleplay-si/ds/download?url="+t.data[0].attacthment},handleFormatError:function(t){this.$Notice.warning({title:"系统提示",desc:"图片 "+t.name+"格式不支持, 请选择格式为jpg或者png的图片"})},handleMaxSize:function(t){this.$Notice.warning({title:"超过文件大小限制",desc:"文件  "+t.name+"太大,最多支持2M."})},handleBeforeImgUpload:function(){var t=this.uploadList.length<9;return t||this.$Notice.warning({title:"您最多可以上传九张图片。 "}),t},handleBeforeFileUpload:function(){var t=this.uploadFileList.length<9;return t||this.$Notice.warning({title:"您最多可以上传九分文件。 "}),t},handleClearImg:function(){this.$refs.upload.clearFiles(),this.uploadList=this.$refs.upload.fileList},handleClearFile:function(){this.$refs.uploadFile.clearFiles(),this.uploadFileList=this.$refs.uploadFile.fileList}},created:function(){for(var t=1;t<=141;t++)t<10?this.faces.push("resources/images/face/00"+t.toString()+"@2x.png"):t<=99?this.faces.push("resources/images/face/0"+t.toString()+"@2x.png"):this.faces.push("resources/images/face/"+t.toString()+"@2x.png")},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.uploadFileList=this.$refs.uploadFile.fileList}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"publish"},[s("Row",{staticClass:"publish-container"},[s("div",{ref:"publishContent",staticClass:"publish-container-content",attrs:{contenteditable:"true"},domProps:{innerHTML:t._s(t.innerText)},on:{input:t.changeTxt,focus:function(e){t.lock=!0},blur:function(e){t.lock=!1}}})]),t._v(" "),s("br"),t._v(" "),s("Row",{staticClass:"publish-bar"},[s("Col",{staticClass:"publish-bar-left",attrs:{span:"12"}},[s("Poptip",{attrs:{placement:"bottom-start",width:"350"},model:{value:t.faceVisible,callback:function(e){t.faceVisible=e},expression:"faceVisible"}},[s("Icon",{staticClass:"choice-face",attrs:{type:"ios-happy-outline",size:"24"}}),t._v("表情\n                    "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},t._l(t.faces,function(e){return s("img",{key:e,staticStyle:{float:"left",margin:"2px",cursor:"pointer"},attrs:{src:e,width:"24"},on:{click:function(s){t.choice_face(e)}}})}))],1),t._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:t.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start",width:"230"}},[s("Icon",{staticClass:"choice-img",attrs:{type:"md-images",size:"24"}}),t._v("图片\n                    "),t.uploadList.length>0?s("span",[t._v("("+t._s(t.uploadList.length)+")")]):t._e(),t._v(" "),s("div",{staticClass:"api",attrs:{slot:"content"},slot:"content"},[s("p",{staticClass:"lh25 marbottom10"},[s("span",[t._v("共"+t._s(t.uploadList.length)+"张,您还能上传"+t._s(9-t.uploadList.length)+"张")]),t._v(" "),t.uploadList.length>0?s("Button",{staticClass:"fr",attrs:{type:"warning"},on:{click:t.handleClearImg}},[t._v("清空全部")]):t._e()],1),t._v(" "),t._l(t.uploadList,function(e,n){return s("div",{key:n,staticClass:"comment-upload-list"},["finished"===e.status?[s("img",{attrs:{src:e.url}}),t._v(" "),s("div",{staticClass:"comment-upload-list-cover"},[s("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(s){t.handleView(e.name)}}}),t._v(" "),s("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(s){t.handleRemove(e)}}})],1)]:[e.showProgress?s("Progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()]],2)}),t._v(" "),s("Upload",{directives:[{name:"show",rawName:"v-show",value:t.uploadList.length<9,expression:"uploadList.length<9"}],ref:"upload",staticStyle:{display:"table",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":t.defaultList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,headers:t.httpHeaders,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeImgUpload,multiple:"",type:"drag",action:"/H_roleplay-si/ds/upload"}},[s("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[s("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),t._v(" "),s("Modal",{attrs:{title:"查看图片"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?s("img",{staticStyle:{width:"100%"},attrs:{src:"/H_roleplay-si/ds/download?url="+t.imgName}}):t._e()])],2)],1),t._v(" "),s("Poptip",{directives:[{name:"show",rawName:"v-show",value:t.allowFile,expression:"allowFile"}],attrs:{placement:"bottom-start"}},[s("Icon",{staticClass:"choice-file",attrs:{type:"md-attach",size:"24"}}),t._v("文件\n                 "),t.uploadFileList.length>0?s("span",[t._v("("+t._s(t.uploadFileList.length)+")")]):t._e(),t._v(" "),s("div",{attrs:{slot:"content"},slot:"content"},[s("p",{staticClass:"lh25 marbottom10",staticStyle:{"min-width":"230px"}},[s("span",[t._v("共"+t._s(t.uploadFileList.length)+"份,您还能上传"+t._s(9-t.uploadFileList.length)+"份")]),t._v(" "),t.uploadFileList.length>0?s("Button",{staticClass:"fr",attrs:{type:"warning"},on:{click:t.handleClearFile}},[t._v("清空全部")]):t._e()],1),t._v(" "),s("Upload",{ref:"uploadFile",attrs:{multiple:"",headers:t.httpHeaders,"on-success":t.handleFileSuccess,"default-file-list":t.defaultFileList,"before-upload":t.handleBeforeFileUpload,action:"/H_roleplay-si/ds/upload"}},[s("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传文件")])],1)],1)],1)],1),t._v(" "),s("Col",{staticClass:"publish-bar-right",attrs:{span:"12"}},[s("Button",{nativeOn:{click:function(e){return t.handleSend(e)}}},[t._v("发送")])],1)],1)],1)},staticRenderFns:[]};var a=s("VU/8")(i,o,!1,function(t){s("lnz1")},"data-v-1d50109e",null);e.a=a.exports},"f/nA":function(t,e){},lnz1:function(t,e){}});