<style lang="less" scoped> 
@import "./publish.less";
</style>

<template>
 <div class="publish" >
    <Row class="publish-bar" >
        <Col class="publish-bar-left" span="12" >
            <div @mouseenter="onLeftBarHover">
            <Poptip 
                placement="bottom-start" 
                v-model="faceVisible"
                width="300">
                    <Icon 
                        class="choice-face" 
                        type="ios-happy-outline"  
                        title="表情"
                        
                        size=24 />
                        <div class="api-emotion" slot="content">
                            <!-- <img 
                                :src="n" 
                                width=24 v-for="n in faces" :key="n" 
                                @click="choice_face(n)"
                                style="float:left;margin: 2px;cursor: pointer;"> -->
                                <rfd-emotion  @click.native="choice_face(item)" v-for="(item,index) in emotionList" :key="index">{{item}}</rfd-emotion>
                        </div>
            </Poptip>
               
            <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :headers="httpHeaders"
                :on-exceeded-size="handleMaxSize"
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
                accept=".xls,.xlsx,.docx,.txt,.vsd,.pdf,.apk,.zip,.mp3,.mp4,.png"
                :format="['xls','xlsx','docx','txt','vsd','pdf','apk','zip','mp3','mp4','png']"
                :on-exceeded-size="handleFileMaxSize"
                style="display: inline-block;position: relative;"
                action="/H_roleplay-si/ds/upload">
                <Icon type="ios-folder-open-outline" size=24 title="文件"  class="choice-file" />
            </Upload>
            Shift+Enter换行
            </div>
        </Col>
        <Col class="publish-bar-right" span="12">
            <slot name="rightBars"></slot>
        </Col>
    </Row>
    <Row class="publish-container">
        <div class="publish-container-reply" ref='replycontainer' contenteditable="false"></div>
        <div 
            class="publish-container-content compactscrollbar" 
            id = "contentWrap"
            contenteditable="true" 
            ref="editor"
            :style="contentStyle"
            v-html="innerText"
            @input="changeTxt"
            @focus="lock=true" 
            @keydown="handleDeydown"
            >
        </div>

        <div class="atwho-view compactscrollbar" id="at-view-64" v-show="userListVisible" :style="{top:`${top}px`,left:`${left}px`}" >
            <ul class="atwho-view-ul" >
               <li 
                    v-for="(item,index) in userList" 
                    :key="item.userId" 
                    :userId="item.userId" 
                    :id="`atuser-${item.userId}`"
                    :class="{'at-high-light': index === currentWho.index}"
                    @click="handleSelectUser(item)"
                    @mousedown="OnMouseDown"
                    @mouseover="handleMouseover(index)"
                    >
                    {{item.nickname}}
                    <span v-if="item.userId==='All'">({{userList.length}})</span>
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
import { EMOTION } from "@/utils/emotion";
import { getToken,getFileSize } from "@/utils/utils";
import Bus from "@/assets/eventBus.js";
import RfdEmotion from "@/components/emotion";
import {
  getDomValue, insertHtmlAtCaret, getCursortPosition
} from '@/utils/dom-utils'
import { 
    uploadImage,
    getAllUsers
} from "@/services/subscribeService";

const storage = window['sessionStorage'];
const MessionStore = 'MessionStore';

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
        sessionHandlePublish:{
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
        setAtUsers:{
            type:Function
        },
        groupId:{
            type:String,
            default:'',
        },
        contentStyle:{
            type:Object,
            default(){
                return {
                    height:'130px',
                    padding:'5px'
                }
            }
        }
        
    },
    components:{
        RfdEmotion
    },
    data() {
        return {
            emotionList: [...EMOTION],
            innerText: this.discContent.txt,
            lock:false,
            httpHeaders: {
                Authorization: getToken()
            },
            faces:[],
            imgName: '',
            visible: false,
            commentAndReply:false,
            faceVisible:false,
            userList:[],
            userListVisible:false,
            sourceUserList:[],
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
        //聊天窗口的监听
        $route: {
            handler: function(newVal, oldVal){
                if(newVal.params.groupId!=oldVal.params.groupId){
                    this.sessionHandleSend(oldVal.params.groupId);
                    this.userList = [];
                    this.sourceUserList = [];
                }
            },
            deep: true
        },
        groupId:{
            handler(newVal, oldVal){
                this.messionArr = JSON.parse(storage.getItem(MessionStore));
                if(this.messionArr){
                    this.$nextTick(() => {
                        this.$refs.editor.innerHTML = this.messionArr&&this.messionArr[newVal]&&JSON.parse(this.messionArr[newVal])&&JSON.parse(this.messionArr[newVal])['contentHtmls']||'';
                    });
                }
            }
        }
    },
    methods: {
        OnMouseDown(e) {
            e.preventDefault()
        },

        handleMouseover(index){
            this.currentWho.index = index;
        },

        getAllUsers(filter=""){
            getAllUsers(10000,1,filter).then(res=>{
                this.sourceUserList = res.tableContent;
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

        onLeftBarHover:function(){
            if(!this.$refs.editor.lastChild){
                this.$refs.editor.innerHTML= '&nbsp;';
               
            }

            this.$refs.editor.focus();
            let selection = window.getSelection();
            this.range = selection.getRangeAt(0);
            let lastChild = this.$refs.editor.lastChild?this.$refs.editor.lastChild:this.$refs.editor;
            this.range.setStartAfter(lastChild)
            this.range.collapse(false)
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(this.range)

            // let selection = window.getSelection();
            // // 获取包含当前节点的文档片段
            // this.range = selection.getRangeAt(0);
            
           
        },
        choice_face: function(v) {
            
            // 创建需追加到光标处节点的文档片段
            var index = this.emotionList.indexOf(v)
            const range = this.range.cloneRange();
            var el = document.createElement('div'),frag;
            el.innerHTML = `<img class='static-emotion-gif' index=${index} src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`
            frag = document.createDocumentFragment()
            var node,lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            if (lastNode) {
                range.setStartAfter(lastNode)
                range.collapse(false)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            }
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
                if(this.userList.length===0){
                    if(this.setAtUsers){
                        this.setAtUsers(this.groupId).then(res=>{
                            this.sourceUserList = res;
                            this.userList = res;
                            this.userListVisible = true;
                            this.currentWho = this.userList[0];
                            this.currentWho.index = 0;
                        });
                    }else{
                        this.getAllUsers();
                    }
                }
                
               
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

        handleSelectUser(u){


            const user = u || this.currentWho;
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
            let input = `<span contenteditable="false" class="atUser" style="color: #646b6b;font-style: italic;font-size:12px;cursor: pointer;">@${user.nickname}&nbsp;</span>`;
            insertHtmlAtCaret(input);
            // 添加用户
            this.atUsers.push(...user);
            
            this.hidenUserPanel();
          
           
        },

           // 处理节点的删除
        handleDeydown(e) {
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
    
                if(!this.contentWrap.innerText){
                    this.$refs.replycontainer.innerHTML = '';
                    this.$refs.editor.style.height='220px';
                    this.replayMsg = '';
                }

               
            }

            
            // ↑ ↓
            if (e.keyCode === 38 || e.keyCode === 40) {
                if (!(e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleKeyBoardSelect(e);
                }
                return;
            }

            if(!e.shiftKey && e.key ==='Enter' && !this.userListVisible){
                this.handleSend();
            }
            
            // 按下回车键
            if (e.keyCode === 13 && this.userListVisible) {
                this.handleSelectUser();
                e.preventDefault();
                e.stopPropagation();
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

            document.getElementById('atuser-'+userId).scrollIntoView(true);

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
                    if(this.sourceUserList.length){
                        this.userList = this.sourceUserList.filter(u=>{
                            return u.nickname.includes(targetText);
                        });

                        if(this.userList.length){
                            this.currentWho = {
                                userId:this.userList[0].userId,
                                nickname:this.userList[0].nickname,
                                index:0
                            }
                        }
                    }
                }
            }
            func();
        },

        handleSend: function() {
            let content =  this.$refs.editor.innerHTML;
            if(!this.$refs.editor.innerText.trim() && this.$refs.editor.lastChild.tagName === 'DIV'){
                return;
            }

            let obj = {};
            //数组去重
            let userIds = this.atUsers.reduce((cur, next) => {
                obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next.userId));
                return cur;
            }, []);

            this.handlePublish(content,[],userIds,this.superComment,this.commentAndReply,this);
        },
        
        sessionHandleSend(groupId) {
            let content =  this.$refs.editor.innerHTML;
            this.sessionHandlePublish(content,groupId);
        },
        handleView (name) {
            if(window.top.viewInsCommentsImg){
                window.top.viewInsCommentsImg('/H_roleplay-si/ds/download?url='+name);
            }else{
                this.imgName = name;
                this.visible = true;
            }
        },
       
        handleSuccess (res, file) {
             file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
             file.name = res.data[0].attr1;
             file.byte = (file.size / 1024).toFixed(2);
             file.id = res.data[0].id;
            // 创建需追加到光标处节点的文档片段
            const range = this.range.cloneRange();
            var el = document.createElement('div'),frag;
            el.innerHTML = `<img class="paste-img" src="${file.url}" attId="${file.id}" name="${file.name}"  size="${file.byte}">`
            frag = document.createDocumentFragment()
            var node,lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            if (lastNode) {
                range.setStartAfter(lastNode)
                range.collapse(false)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            }
        },
        handleFileSuccess(res, file){

            file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
            file.name = res.data[0].attr1;
            file.byte = (file.size / 1024).toFixed(2);
            file.id = res.data[0].id;
            file.icon = this.$options.filters.fileTypeFilter(file.name);
            // 创建需追加到光标处节点的文档片段
            const range = this.range.cloneRange();
            var el = document.createElement('div'),frag;
            el.innerHTML = '<span contenteditable="false" class="file-content" name="'+ file.name+'"  attid="'+ file.id+'" size="'+ file.byte+'"  >'+
                '<img class="flie-img" width="38" src="'+file.icon+'"  paste="1">'+
                '<div class="file-content-info"><p><a target="_blank" href="'+file.url+'">'+file.name+'</a></p><p>'+file.byte+'KB'+'</p>'+
                '</div>'+
            '</span>';
            frag = document.createDocumentFragment()
            var node,lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            if (lastNode) {
                range.setStartAfter(lastNode)
                range.collapse(true)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            }

        },
      
        handleMaxSize (file) {
            window.top.limitNotice('超过文件大小限制','文件  ' + file.name + '太大,最多支持2M.');
        },
        handleFileMaxSize (file) {
            window.top.limitNotice('超过文件大小限制','文件  ' + file.name + '太大,最多支持10M.');
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
                    //f[0].remove();

                    let tepFile = {};
                    tepFile.url ='/H_roleplay-si/ds/download?url=' +  res[0].attacthment;
                    tepFile.name = res[0].attr1;
                    tepFile.byte =(600 / 1024).toFixed(2);
                    tepFile.attId = res[0].id;
                    insertHtmlAtCaret(`<img  paste=1 class="paste-img" src="${tepFile.url}" name="${tepFile.name}" attId="${tepFile.attId}"  size="${tepFile.byte}">`);
                }
            });
        },
        initEvent(){
            const that = this;
            this.$refs.editor.addEventListener("paste",  (e)=> {
                let clipboardData = e.clipboardData;
                let ua = window.navigator.userAgent;
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
                        e.preventDefault(); //该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
                                            //例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
                                            //注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。
                        let f= item.getAsFile();
                        let reader=new FileReader()
                        //读取完成
                        reader.onload= (e)=> {
                            that.uploadImageByBase64('ab',e.target.result);
                            clipboardData.clearData('Text');
                        }
                        reader.readAsDataURL(f)
                    } else if (item.kind === "string") {
                        item.getAsString(function (str) {
                            // str 是获取到的字符串
                            //console.log(str);
                        })
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
      
        this.$nextTick(()=>{
            this.contentWrap = this.$refs.editor;
        })
        //初始化事件
        this.initEvent();
        let me = this;
        Bus.$on('atUser',user => {
            let atUserHtml = `<span contenteditable="false" class="atUser" style="color: #646b6b;font-style: italic;font-size:12px;cursor: pointer;">@${user.nickName}&nbsp;</span>`;
            this.$refs.editor.innerHTML=this.$refs.editor.innerHTML+atUserHtml;
        });
         Bus.$on('replyMsg',replyInfo => {
            let {msg,group} = replyInfo;
            let tempConent='';

            switch (msg.imType) {
                case 1:
                    tempConent = msg.content;
                    break;
                case 2:
                    tempConent = tempConent+`<img height=50 width=100 src="/H_roleplay-si/ds/downloadById?id=${msg.content.id}" >`
                    break;
                case 3:
                      msg.content.map(m=>{
                        if(m.imType===2) tempConent = tempConent+`<img height=50 width=100 src="/H_roleplay-si/ds/downloadById?id=${m.content.id}" >`;

                        if(m.imType ===1) tempConent=tempConent+m.content;

                        if(m.imType===4) tempConent = tempConent+
                        `<div class="publish-container-reply-content-message-file">
                            <img height=38 src="resources/images/file/excel.png" >
                            <div class="publish-container-reply-content-message-file-info">
                                <p>${m.content}</p>
                                <p>${m.size}</p>
                            </div>
                        </div>`;
                        
                    });
                    break;
                 case 4:
                    var src= this.$options.filters.fileTypeFilter(msg.content.content);

                    tempConent = tempConent+
                    `<div class="publish-container-reply-content-message-file">
                        <img height=38 src="${src}" >
                        <div class="publish-container-reply-content-message-file-info">
                            <p>${msg.content.content}</p>
                            <p>${msg.content.size}KB</p>
                        </div>
                    </div>`;
                    break;
            }

            let innerHTML = `<div  class="publish-container-reply-content" >
                <div class="publish-container-reply-content-creator">${msg.creatorName}:</div>
                <div class="publish-container-reply-content-message">${tempConent}</div>
            </div>`;
            this.$refs.editor.style.height='140px';
            this.$refs.replycontainer.innerHTML = innerHTML;
            this.replayMsg = msg;
        });
    },

};
</script>

