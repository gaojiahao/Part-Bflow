{"source":"webpackJsonp([50],{\"1uTj\":function(e,t){},nZ2P:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=a(\"mvHQ\"),i=a.n(s),o=a(\"7B+g\"),l=function(e,t,a){return Object(o.a)(\"/H_roleplay-si/filing/query\",{folderPath:e,dir:t,search:a})},n=a(\"oAV5\"),r={name:\"fileCabinetList\",data:function(){return{httpHeaders:{Authorization:Object(n.c)()},fileName:\"\",filePath:\"\",renamePath:\"\",searchValue:\"\",waitPath:\"\",modalTitle:\"重命名\",showModal:!1,isAdd:!0,showSubareaModal:!1,showActionModal:!1,isCopy:!0,columns:[{title:\"名称\",slot:\"name\",width:400},{title:\"权限\",key:\"authority\"},{title:\"管理员\",key:\"creator\"},{title:\"时间\",key:\"crtTime\"}],data:[],actionData:[],breadHeader:[],subareaInformation:{},selectTreeItem:{},iconData:[{src:\"resources/images/file/excel.png\",suffix:\"xls\"},{src:\"resources/images/file/excel.png\",suffix:\"xlsx\"},{src:\"resources/images/file/word.png\",suffix:\"doc\"},{src:\"resources/images/file/word.png\",suffix:\"docx\"},{src:\"resources/images/file/txt.png\",suffix:\"txt\"}]}},methods:{goBack:function(){var e=\"\";this.breadHeader.splice(this.breadHeader.length-1,1),e=0===this.breadHeader.length?\"root\":this.breadHeader[this.breadHeader.length-1].path,this.getAllFileData(e)},fileFilter:function(){\"\"===this.searchValue?this.getAllFileData(this.filePath):this.getAllFileData(\"\",this.searchValue)},openFile:function(e){e.isFile?this.downloadFiles(e):(this.columns[1]={title:\"大小\",key:\"size\",render:function(e,t){return t.row.size?e(\"span\",{},t.row.size):e(\"span\",{},\"- -\")}},this.columns[2]={title:\"来源\",key:\"creator\"},this.getAllFileData(e.path),this.breadHeader.push({path:e.path,name:e.name}),this.filePath=e.path,this.$router.push({path:\"/fileCabinet/list\",query:{path:e.path}}),sessionStorage.setItem(\"breadHeaderData\",i()(this.breadHeader)))},goClickFile:function(e,t){this.breadHeader.splice(t+1,this.breadHeader.length-1),this.getAllFileData(e.path),this.filePath=e.path,sessionStorage.setItem(\"breadHeaderData\",i()(this.breadHeader)),this.$router.push({path:\"/fileCabinet/list\",query:{path:row.path}})},goSubarea:function(){this.columns[1]={title:\"权限\",key:\"authority\"},this.columns[2]={title:\"管理员\",key:\"creator\"},this.filePath=\"root\",this.getAllFileData(this.filePath),this.breadHeader=[],this.$router.push({path:\"/fileCabinet/list\"})},handleSuccess:function(e,t){e.success&&(this.$Message.success(e.message),this.getAllFileData(this.filePath))},renameFile:function(e){this.showModal=!0,this.fileName=e.name,this.modalTitle=\"重命名\",this.isAdd=!1,this.renamePath=e.path},subareaInfo:function(e){this.subareaInformation=e,this.showSubareaModal=!0},addNewFile:function(){this.showModal=!0,this.fileName=\"\",this.modalTitle=\"新建\",this.isAdd=!0},confirmRename:function(){var e,t,a,s=this,i=\"\";this.fileName&&(this.isAdd?(i=\"root\"===this.filePath?this.fileName:this.filePath+\"/\"+this.fileName,(a=i,Object(o.a)(\"/H_roleplay-si/filing/mkdir\",{folderPath:a},\"POST\")).then(function(e){e.success&&(s.$Message.success(e.message),s.getAllFileData(s.filePath))}).catch(function(e){s.$Message.error(e.data.message)})):(e=this.renamePath,t=this.fileName,Object(o.a)(\"/H_roleplay-si/filing/rename\",{srcPath:e,newName:t},\"POST\")).then(function(e){e.success&&(s.$Message.success(e.message),s.getAllFileData(s.filePath))}).catch(function(e){s.$Message.error(e.data.message)}))},deleteFiles:function(t){var a=this;t.path&&this.$Modal.confirm({title:\"确认\",content:\"确认删除\"+t.name+\"？\",onOk:function(){var e;(e=t.path,Object(o.a)(\"/H_roleplay-si/filing/delete\",{path:e},\"POST\")).then(function(e){e.success&&(a.$Message.success(e.message),a.getAllFileData(a.filePath))}).catch(function(e){a.$Message.error(e.data.message)})}})},copyFiles:function(e){this.showActionModal=!0,this.selectTreeItem={},this.getActionFileData(\"root\"),this.isCopy=!0,this.waitPath=e.path},moveFiles:function(e){this.showActionModal=!0,this.selectTreeItem={},this.getActionFileData(\"root\"),this.isCopy=!1,this.waitPath=e.path},copyMoveFile:function(){var e,t,a,s,i=this;this.selectTreeItem.path&&(this.isCopy?(a=this.waitPath,s=this.selectTreeItem.path,Object(o.a)(\"/H_roleplay-si/filing/copy\",{path:a,toPath:s},\"POST\")).then(function(e){e.success&&i.$Message.success(e.message)}).catch(function(e){i.$Message.error(e.data.message)}):(e=this.waitPath,t=this.selectTreeItem.path,Object(o.a)(\"/H_roleplay-si/filing/move\",{path:e,toPath:t},\"POST\")).then(function(e){e.success&&(i.$Message.success(e.message),i.getAllFileData(i.filePath))}).catch(function(e){i.$Message.error(e.data.message)}))},getActionFileData:function(e,t){var a=this,s=[];l(e,!0).then(function(e){e.forEach(function(e){s.push({title:e.name,path:e.path,loading:!1,children:[]})}),t?t(s):a.actionData=s})},loadData:function(e,t){this.getActionFileData(e.path,t)},onSelectChange:function(e,t){this.selectTreeItem=t},downloadFiles:function(e){e.path&&window.open(\"/H_roleplay-si/filing/download?path=\"+e.path)},getAllFileData:function(e,t){var a=this;l(e,!1,t).then(function(e){a.data=e}).catch(function(e){a.$Message.error(e.data.message)})}},mounted:function(){this.$route.query.path?(this.filePath=this.$route.query.path,this.breadHeader=JSON.parse(sessionStorage.getItem(\"breadHeaderData\"))):this.filePath=\"root\",this.getAllFileData(this.filePath)}},c=a(\"sAV8\"),h=a.n(c);var u=function(e){a(\"1uTj\")},d=a(\"VU/8\")(r,h.a,!1,u,\"data-v-16ebacda\",null);t.default=d.exports},sAV8:function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,i=s._self._c||e;return i(\"div\",{staticClass:\"file\"},[i(\"div\",{staticClass:\"file-header\"},[i(\"span\",[s._v(\"文件柜\")]),s._v(\" \"),i(\"div\",{staticClass:\"file-search\"},[i(\"Input\",{staticStyle:{width:\"300px\"},attrs:{search:!0,placeholder:\"搜索\"},on:{\"on-search\":s.fileFilter},model:{value:s.searchValue,callback:function(e){s.searchValue=e},expression:\"searchValue\"}})],1)]),s._v(\" \"),i(\"div\",{staticClass:\"toolbar\"},[i(\"span\",{staticClass:\"toolbar-bread\"},[0<s.breadHeader.length?i(\"span\",[i(\"span\",{staticClass:\"toolbar-back\",on:{click:s.goBack}},[i(\"Icon\",{attrs:{type:\"md-arrow-round-back\"}})],1),s._v(\" \"),i(\"span\",{staticClass:\"toolbar-line\"},[s._v(\" | \")])]):s._e(),s._v(\" \"),i(\"span\",{staticClass:\"toolbar-subarea\",on:{click:s.goSubarea}},[s._v(\"分区\")]),s._v(\" \"),s._l(s.breadHeader,function(t,a){return i(\"span\",{key:a},[i(\"span\",[s._v(\" > \")]),s._v(\" \"),s.breadHeader.length-1!==a?i(\"span\",{staticClass:\"bread-title\",on:{click:function(e){s.goClickFile(t,a)}}},[s._v(\" \"+s._s(t.name)+\" \")]):i(\"span\",{staticClass:\"current-title\"},[s._v(\" \"+s._s(t.name)+\" \")])])})],2),s._v(\" \"),\"root\"===s.filePath?i(\"Button\",{staticClass:\"toolbar-btn\",on:{click:s.addNewFile}},[s._v(\"新建分区\")]):s._e(),s._v(\" \"),\"root\"!==s.filePath?i(\"Button\",{staticClass:\"toolbar-btn\",on:{click:s.addNewFile}},[s._v(\"新建文件夹\")]):s._e(),s._v(\" \"),\"root\"!==s.filePath?i(\"Upload\",{staticClass:\"toolbar-btn\",attrs:{action:\"/H_roleplay-si/filing/upload?directory=\"+s.filePath+\"&cover=false\",\"show-upload-list\":!1,\"on-success\":s.handleSuccess,headers:s.httpHeaders}},[i(\"Button\",{attrs:{type:\"info\",icon:\"ios-cloud-upload-outline\"}},[s._v(\"上传\")])],1):s._e()],1),s._v(\" \"),i(\"div\",{staticClass:\"subarea\"},[i(\"Table\",{attrs:{columns:s.columns,data:s.data,\"highlight-row\":\"\"},on:{\"on-row-dblclick\":s.openFile},scopedSlots:s._u([{key:\"name\",fn:function(e){var a=e.row;return[a.isSubregion?i(\"Icon\",{staticClass:\"subarea-icon\",attrs:{type:\"ios-grid\"}}):s._e(),s._v(\" \"),a.isFile||a.isSubregion?s._e():i(\"Icon\",{staticClass:\"subarea-file-icon\",attrs:{type:\"md-albums\"}}),s._v(\" \"),a.isFile&&null===a.suffix?i(\"Icon\",{staticClass:\"subarea-icon\",attrs:{type:\"md-document\"}}):s._e(),s._v(\" \"),s._l(s.iconData,function(e,t){return i(\"span\",{key:t},[a.isFile&&a.suffix===e.suffix?i(\"img\",{attrs:{src:e.src}}):s._e()])}),s._v(\" \"),i(\"label\",[s._v(s._s(a.name))]),s._v(\" \"),i(\"Poptip\",{staticStyle:{float:\"right\"},attrs:{trigger:\"hover\",placement:\"right-start\"}},[i(\"span\",{staticClass:\"subarea-more\"},[i(\"Icon\",{attrs:{type:\"ios-arrow-dropright-circle\"}})],1),s._v(\" \"),i(\"div\",{attrs:{slot:\"content\"},slot:\"content\"},[i(\"ul\",{staticClass:\"subarea-menu\"},[a.isFile?s._e():i(\"li\",{on:{click:function(e){s.openFile(a)}}},[s._v(\"打开\")]),s._v(\" \"),a.isSubregion?s._e():i(\"li\",{on:{click:function(e){s.downloadFiles(a)}}},[s._v(\"下载\")]),s._v(\" \"),a.isSubregion?s._e():i(\"li\",{on:{click:function(e){s.copyFiles(a)}}},[s._v(\"复制到...\")]),s._v(\" \"),i(\"li\",{on:{click:function(e){s.renameFile(a)}}},[s._v(\"重命名\")]),s._v(\" \"),a.isSubregion?s._e():i(\"li\",{on:{click:function(e){s.moveFiles(a)}}},[s._v(\"移动到...\")]),s._v(\" \"),i(\"li\",{on:{click:function(e){s.subareaInfo(a)}}},[s._v(\"详情...\")]),s._v(\" \"),i(\"li\",{on:{click:function(e){s.deleteFiles(a)}}},[s._v(\"删除\")])])])]),s._v(\" \"),a.isFile?i(\"div\",{staticClass:\"subarea-download\",on:{click:function(e){s.downloadFiles(a)}}},[i(\"Icon\",{attrs:{type:\"md-cloud-download\"}})],1):s._e()]}}])})],1),s._v(\" \"),i(\"Modal\",{attrs:{title:s.modalTitle},on:{\"on-ok\":s.confirmRename},model:{value:s.showModal,callback:function(e){s.showModal=e},expression:\"showModal\"}},[i(\"span\",[i(\"b\",{staticStyle:{color:\"#e4393c\"}},[s._v(\"*\")]),s._v(\"名称：\")]),s._v(\" \"),i(\"Input\",{staticStyle:{width:\"300px\"},attrs:{placeholder:\"请输入名称\",autofocus:\"\"},model:{value:s.fileName,callback:function(e){s.fileName=e},expression:\"fileName\"}})],1),s._v(\" \"),i(\"Modal\",{attrs:{width:\"300\",title:\"分区信息\"},model:{value:s.showSubareaModal,callback:function(e){s.showSubareaModal=e},expression:\"showSubareaModal\"}},[i(\"ul\",{staticClass:\"subarea-info\"},[i(\"li\",[s._v(\"分区名称：\"+s._s(s.subareaInformation.name))]),s._v(\" \"),i(\"li\",[s._v(\"大小：\"+s._s(s.subareaInformation.size))]),s._v(\" \"),i(\"li\",[s._v(\"可用空间：\"+s._s(s.subareaInformation.size))]),s._v(\" \"),i(\"li\",[s._v(\"权限：\"+s._s(s.subareaInformation.authority))])]),s._v(\" \"),i(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"})]),s._v(\" \"),i(\"Modal\",{attrs:{title:\"选择文件\",styles:{top:\"20px\"},height:\"600\",width:\"300\"},on:{\"on-ok\":s.copyMoveFile},model:{value:s.showActionModal,callback:function(e){s.showActionModal=e},expression:\"showActionModal\"}},[i(\"Tree\",{staticClass:\"file-tree\",attrs:{data:s.actionData,\"load-data\":s.loadData},on:{\"on-select-change\":s.onSelectChange}})],1)],1)},staticRenderFns:[]}}});"}