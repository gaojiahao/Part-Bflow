<style lang="less" scoped> 
@import "./publish.less";
</style>

<template>
 <div class="publish">
      <Row class="publish-bar">
        <Col class="publish-bar-left" span="12">
            <Poptip 
                placement="bottom-start" 
                v-model="faceVisible"
                @on-popper-show="onPopShow"
                width="300">
                    <Icon 
                        class="choice-face" 
                        type="ios-happy-outline"  
                        title="表情"
                        size=24 />
                        <div class="api-emotion" slot="content">
                            <img 
                                :src="n" 
                                width=24 v-for="n in faces" :key="n" 
                                @click="choice_face(n)"
                                style="float:left;margin: 2px;cursor: pointer;">
                        </div>
            </Poptip>
            
            <Upload
                v-show="uploadList.length<9"
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :headers="httpHeaders"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeImgUpload"
                multiple
                accept=".jpg,.png"
                action="/H_roleplay-si/ds/upload"
                style="display: inline-block;position: relative;">
                <Icon type="md-images" class="choice-img"  title="图片" size=24 />
            </Upload>
        
            <Upload
                multiple
                ref="uploadFile"
                :max-size="10240"
                :headers="httpHeaders"
                :show-upload-list='false'
                :on-success="handleFileSuccess"
                accept=".xls,.xlsx"
                :format="['ex','jpeg','png']"
                :on-exceeded-size="handleFileMaxSize"
                :default-file-list="defaultFileList"
                :before-upload="handleBeforeFileUpload"
                style="display: inline-block;position: relative;"
                action="/H_roleplay-si/ds/upload">
                <Icon type="ios-folder-open-outline" size=24 title="文件"  class="choice-file" />
            </Upload>
        </Col>
        <Col class="publish-bar-right" span="12">
            <slot name="rightBars"></slot>
        </Col>
    </Row>
    <Row class="publish-container">
        <div 
            class="publish-container-content" 
            id = "contentWrap"
            contenteditable="true" 
            ref="editor"
            v-html="innerText"
            @input="changeTxt"
            @blur="onPopperShow"
            @focus="lock=true" 
            @keydown="handleDOMRemoved"
            >
        </div>

        <div class="atwho-view" id="at-view-64" v-show="userListVisible" :style="{top:`${top}px`,left:`${left}px`}" >
            <ul class="atwho-view-ul" @click="handleSelectUser" >
               <li 
                    v-for="(item,index) in userList" 
                    :key="item.userId" 
                    :userId="item.userId" 
                    :class="{'at-high-light': index === currentWho.index}"
                    @mousedown="OnMouseDown"
                    @mouseover="handleMouseover(index)"
                 
                    >
                    {{item.nickname}}
                </li>
            </ul>
        </div>    
    </Row>
    <Row class="publish-bar">
        <Col class="publish-bar-right" span="24">
            <Button  @click.native="handleSend" >发送</Button>
        </Col>
    </Row>
</div>
</template>

<script>
import { getToken } from "@/utils/utils";
import Bus from "@/assets/eventBus.js";
import {
  getDomValue, insertHtmlAtCaret, getCursortPosition
} from '@/utils/dom-utils'
import { 
    uploadImage,
    getAllUsers
} from "@/services/subscribeService";
export default {
    name:"coment-publish",
    props:{
        discContent:{
            type:Object,
            default:function(){
                return { txt:""}
            }
        },
        handlePublish:{
            type:Function
        },
        comments:{
            type:Array,
            default:function () {
                return [];
            }
        },
        superComment:{
            type:Object,
            default:function () {
                return {};
            }
        },
        allowFile:{
            type:Boolean,
            default:true
        },
        ischild:{
            type:Boolean,
            default:false
        },
        
    },
    data() {
        return {
            innerText: this.discContent.txt,
            lock:false,
            httpHeaders: {
                Authorization: getToken()
            },
            faces:[],
            defaultList: [
            ],
            defaultFileList:[],
            imgName: '',
            visible: false,
            uploadList: [],
            uploadFileList:[],
            commentAndReply:false,
            faceVisible:false,
            userList:[],
            userListVisible:false,
            left:0,
            top:0,
            isFilter:false,
            at_focusOffset:0,
            currentWho:'',
            //.currentWho.index:0,
            // currentUser:'',
            // 存放被@的用户列表
            atUsers: [],
            contentWrap:{},
            range:{}
        };
    },
    watch:{
        discContent:{
            handler(newValue, oldValue) {
                if(!this.lock) {
                    this.innerText=this.discContent.txt;
                }
        　　　},
        　　　deep:true
        },
    },
    methods: {
        OnMouseDown(e) {
            e.preventDefault()
        },

        handleMouseover(index){
            this.currentWho.index = index;
        },

        getAllUsers(filter=""){
            getAllUsers(8,1,filter).then(res=>{
                this.userList = res.tableContent;
                if(res.tableContent.length === 0){
                    this.userListVisible = false;
                }else{
                    let nickname = res.tableContent[0].nickname;
                    let userId = res.tableContent[0].userId;
                    this.currentWho = {
                        nickname:nickname,
                         userId:userId,
                        index:0
                    }
                }
            })
        },

        onPopperShow:function(){
            //点击表情时获取光标位置
            // 返回插入符号当前位置的selection对象
            let selection = window.getSelection();

            // 获取包含当前节点的文档片段
            this.range = selection.getRangeAt(0);
            this.userListVisible = false;
        },
        onPopShow () {
            this.$refs.editor.focus();
        },
        choice_face: function(n) {
            // 创建需追加到光标处节点的文档片段
            const range = this.range.cloneRange();
            let fragment = range.createContextualFragment('<img class="face" src="'+ n +'" width="20" paste="1">')
            // 将创建的文档片段插入到光标处
            this.range.insertNode(fragment.lastChild)
      
            this.faceVisible = false;
        },

        changeTxt:function(e){
            // 获取输入框中的值
            const fullText =this.contentWrap.innerText.replace(/\n/g, '');
            // 获取光标位置
            const end = getCursortPosition(this.contentWrap);
            // 获取离光标最近的一个@的位置
            if(e.data === '@'){
                this.at_focusOffset = end;   
                this.isFilter = true;
                this.userListVisible = true;
            }
            if(this.isFilter) {
                // 说明输入了@ 截取@到光标之间的字符串
                const targetText = fullText.slice(this.at_focusOffset ,end);
                const regx = /[^\u4e00-\u9fa5\w-]/ ;
                if(/^\s/.test(targetText) || targetText.match(regx)) {
                // 以空白符开头 或者包含不合法字符
                this.hidenUserPanel();
                } else {
                    // 合法的用户输入
                    this.showUserPanel(this.contentWrap,targetText);
                }
            } 
        },

        handleSelectUser(e){
           const nickname = e && e.target.innerText || this.currentWho.nickname;
           const userId = e && e.target.getAttribute('userId') || this.currentWho.userId;

             // 获取输入框中的值
            const fullText = this.contentWrap.innerText.replace(/\n/g, '')
            // 获取光标位置
            const end = getCursortPosition(this.contentWrap);
            // 获取离光标最近的一个@的位置
            const lastAtIndex = fullText.slice(0,end).lastIndexOf('@');
            const offset = end - lastAtIndex;
            // 删除之前的内容
            let selection = getSelection();
            let range =selection.getRangeAt(0);
            range.setStart(range.endContainer, range.endOffset - offset);
            range.deleteContents();
          
            // 插入选中的user
            let input = `<span contenteditable="false" style="color: #646b6b;font-style: italic;font-size:12px;cursor: pointer;">@${nickname}&nbsp;</span>`;
            insertHtmlAtCaret(input);
            // 添加用户
            this.atUsers.push({
                userId:userId,
                name:nickname
            });
            
            this.hidenUserPanel();
        },

           // 处理节点的删除
        handleDOMRemoved(e) {
            //删除
            if (e.keyCode === 8 ) {
                // 获取输入框中的值
                const fullText = this.contentWrap.innerText.replace(/\n/g, '');
                // 获取光标位置
                const end = getCursortPosition(this.contentWrap);
                // 光标之前用户名最大可能长度的文本
                const content = fullText.slice(end-30, end);
                // 获取离光标最近的一个@的位置
                const lastAtIndex = fullText.lastIndexOf('@');

                if(lastAtIndex+1 === end){
                    this.hidenUserPanel();
                }

                if (lastAtIndex > -1) {
                    // 如果存在 @
                    const user = fullText.slice(lastAtIndex, end).trim().replace(/@/, '');
                    for(let i=0;i<this.atUsers.length;i++){
                        if(this.atUsers[i].name === user){
                            this.atUsers.splice(i,1);
                            break;
                        }
                    }
                  
                }

               
            }

            if(this.currentWho){
                // ↑ ↓
                if (e.keyCode === 38 || e.keyCode === 40) {
                    if (!(e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleKeyBoardSelect(e);
                    }
                    return;
                }
                // 按下回车键
                if (e.keyCode === 13) {
                    this.handleSelectUser();
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        },

        handleKeyBoardSelect(e) {
            // 处理键盘的上下输入
            const offset = e.keyCode === 38 ? -1 : 1
            const { index } = this.currentWho
            // 循环的计算
            const next = Math.max(0, Math.min(index+offset,this.userList.length-1));
            
            const nickname = this.userList[next].nickname;
            const userId = this.userList[next].userId;

            this.currentWho = {
                nickname:nickname,
                userId:userId,
                index:next
            }
        },

        //隐藏用户列表
        hidenUserPanel(){
            this.userListVisible = false;
            this.isFilter = false;
            this.at_focusOffset = 0;
        },
        //隐藏用户列表
        showUserPanel(el,targetText=""){
           const func = () => {
                // top && left
                var sel = window.getSelection();
                if (sel) {
                    const range = sel.getRangeAt(0);
                    const textareaRect = el.getBoundingClientRect();
                    const rangeRect = range.getBoundingClientRect();
                    const top = rangeRect.y - textareaRect.y;
                    const left = rangeRect.x - textareaRect.x;
                    this.userListVisible = true ;
                    this.left = left;
                    this.top = top;
                    let atView = document.getElementById('at-view-64');
                    atView.focus();
                    const filter = JSON.stringify([{"operator":"like","value":targetText,"property":"nickname"}]);
                    this.getAllUsers(filter);
                }
            }
            func();
        },

        handleSend: function() {
            let  imgs= this.uploadList.map(img=>{
                    return {
                        attachment:img.url,
                        type:'image',
                    }
                }),files =  this.uploadFileList.map(img=>{
                    return {
                        attachment:img.url,
                        type:'file',
                    }
                });

            files = files.concat(imgs);
            let content =  this.$refs.editor.innerHTML;

            let obj = {};
            //数组去重
            let userIds = this.atUsers.reduce((cur, next) => {
                obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next.userId));
                return cur;
            }, []);

            this.handlePublish(content,files,userIds,this.superComment,this.commentAndReply,this);
        },
        handleView (name) {
            if(window.top.viewInsCommentsImg){
                window.top.viewInsCommentsImg('/H_roleplay-si/ds/download?url='+name);
            }else{
                this.imgName = name;
                this.visible = true;
            }
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
            file.name  =res.data[0].attacthment;
             // 创建需追加到光标处节点的文档片段
            const range = this.range.cloneRange();
            let fragment = range.createContextualFragment('<img class="paste-img" src="'+  file.url +'"  paste="1">');
            // 将创建的文档片段插入到光标处
            this.range.insertNode(fragment.lastChild)
      
            this.faceVisible = false;
        },
        handleFileSuccess(res, file){
            var getFileSize = function(fileByte) {
                var fileSizeByte = fileByte;
                var fileSizeMsg = "";
                if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
                else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
                else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
                else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
                else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
                else fileSizeMsg = "文件超过1TB";
                return fileSizeMsg;
            }

            file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
            file.name = res.data[0].attr1;
            if(/.jpg|.png|.PNG/.test(file.name)){
                file.icon = 'image.png';
            }

            if(/.xlsx/.test(file.name)){
                file.icon = 'excel.png';
            }

            if(/.docx/.test(file.name)){
                file.icon = 'word.png';
            }

            if(/.txt/.test(file.name)){
                file.icon = 'txt.png';
            }

            if(!file.icon){
                file.icon = 'word.png';
            }
            //  创建需追加到光标处节点的文档片段
            const range = this.range.cloneRange();
            let fragment = range.createContextualFragment('<span contenteditable="false" class="file-content">'+
                '<img class="flie-img" width="38" src="resources/images/file/'+ file.icon+'"  paste="1">'+
                '<div class="file-content-info"><p><a href="'+file.url+'">'+file.name+'</a></p><p>'+getFileSize(file.size)+'</p>'+
                '</div>'+
            '</span>');

            // 将创建的文档片段插入到光标处
            this.range.insertNode(fragment.lastChild);

        },
        handleFormatError (file) {
            window.top.limitNotice('系统提示','图片 ' + file.name + '格式不支持, 请选择格式为jpg或者png的图片');
        },
        handleMaxSize (file) {
            window.top.limitNotice('超过文件大小限制','文件  ' + file.name + '太大,最多支持2M.');
        },

        handleFileMaxSize (file) {
            window.top.limitNotice('超过文件大小限制','文件  ' + file.name + '太大,最多支持10M.');
        },

        handleBeforeImgUpload () {
            const check = this.uploadList.length < 9;
            if (!check) {
                this.$Notice.warning({
                    title: '您最多可以上传九张图片。 '
                });
                window.top.limitNotice('提示','您最多可以上传九张图片。');
            }
            return check;
        },
        handleBeforeFileUpload () {
            const check = this.uploadFileList.length < 9;
            if (!check) {
                window.top.limitNotice('提示','您最多可以上传九份文件。 ');
            }
            return check;
        },
        handleClearImg(){
            this.$refs.upload.clearFiles();
            this.uploadList = this.$refs.upload.fileList;
        },
        handleClearFile(){
            this.$refs.uploadFile.clearFiles();
            this.uploadFileList = this.$refs.uploadFile.fileList;
        },

        uploadImageByBase64(referenceID,file){
            let target = this.$refs.editor;
            uploadImage({
                     referenceId:referenceID,
                    file:file
            }).then(res=>{
                
                if(res.length>0){
                    let imgArr = Array.from(target.getElementsByTagName('img'));
                    let f = imgArr.filter(item=>{
                        return !item.getAttribute('paste');
                    });
                    if(f.length>0){
                         let img = document.createElement('img');  
                        img.setAttribute('src',`/H_roleplay-si/ds/download?url=${res[0].attacthment}`);
                        img.setAttribute('paste',1);
                        img.setAttribute('class','paste-img');
                        f[0].parentNode.replaceChild(img,f[0]);
                        this.discContent.txt =  target.innerHTML;
                    }else{
                        debugger
                         document.execCommand('insertImage', false, `/H_roleplay-si/ds/download?url=${res[0].attacthment}`) 
                    }
                }
            });
        },

        initEvent(){
            const that = this;
            this.$refs.editor.addEventListener("paste",  (e)=> {
                let clipboardData = e.clipboardData;
                let ua = window.navigator.userAgent
                if ( !(clipboardData && clipboardData.items) ) {
                    return;
                }
                if(clipboardData.items.length === 0){
                    return;
                }
                // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
                if(clipboardData.items && clipboardData.items.length === 2 && clipboardData.items[0].kind === "string" && clipboardData.items[1].kind === "file" &&
                    clipboardData.types && clipboardData.types.length === 2 && clipboardData.types[0] === "text/plain" && clipboardData.types[1] === "Files" &&
                    ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49){
                    return;
                }
            
                for (let i = 0, len = clipboardData.items.length; i < len; i++) {
                    let item = clipboardData.items[i];
                    if (item.kind === "file") {
                        let f= item.getAsFile();
                        let reader=new FileReader()
                        //读取完成
                        reader.onload= (e)=> {
                            that.uploadImageByBase64('ab',e.target.result);
                        
                        }
                        reader.readAsDataURL(f)
                    }
                }
            }, false);
        },

    },
    created(){
        var baseUrl = 'resources/images/face/';
        for(var i=1;i<=141;i++){
            if(i<10){
                this.faces.push('resources/images/face/00'+i.toString()+'@2x.png');
            }else if(i<=99){
                this.faces.push('resources/images/face/0'+i.toString()+'@2x.png');
            }else {
               this.faces.push('resources/images/face/'+i.toString()+'@2x.png');
            }
        }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
        this.uploadFileList = this.$refs.uploadFile.fileList;
      
        this.$nextTick(()=>{
            this.contentWrap = this.$refs.editor;
        })
        //初始化事件
        this.initEvent();
        let me = this;
        Bus.$on('setLinkMember',text => {
            this.$refs.editor.innerHTML = `${this.$refs.editor.innerHTML}${text}`;
        });
    },

};
</script>

