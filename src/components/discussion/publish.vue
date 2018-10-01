<style lang="less" scoped>
@import "./publish.less";
</style>

<template>
 <div class="publish">
    <Row class="publish-container">
        <div 
            class="publish-container-content" 
            contenteditable="true" 
            ref="publishContent"
            v-html="innerText"
            @input="changeTxt" 
            @focus="lock=true" 
            @blur="lock=false"></div>
    </Row>
    <br>
    <Row class="publish-bar">
        <Col class="publish-bar-left" span="12">
            <Poptip 
            placement="bottom-start" 
            v-model="faceVisible"
            width="400">
                <Icon 
                    class="choice-face" 
                    type="ios-happy-outline"  
                    size=24 />表情
                    <div class="api" slot="content">
                        <img 
                            :src="n" 
                            width=24 v-for="n in faces" :key="n" 
                            @click="choice_face(n)"
                            style="float:left;margin: 2px;cursor: pointer;">
                    </div>
            </Poptip>

            <Poptip 
                v-show="allowFile"
                placement="bottom-start" 
                width="230" >
                    <Icon 
                    type="md-images" 
                    class="choice-img"  
                    size=24 />图片
                    <span v-if="uploadList.length>0">({{uploadList.length}})</span>
                    <div class="api" slot="content" >
                        <p class="lh25 marbottom10">
                            <span>共{{uploadList.length}}张,您还能上传{{9-uploadList.length}}张</span>
                            <Button class="fr" type="warning" v-if="uploadList.length>0" @click="handleClearImg">清空全部</Button>
                        </p>
                        <div 
                            class="comment-upload-list" 
                            v-for="(item,index) in uploadList" 
                            :key="index" >
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="comment-upload-list-cover">
                                        <Icon 
                                        type="ios-eye-outline" 
                                        @click.native="handleView(item.name)">
                                        </Icon>
                                        <Icon 
                                        type="ios-trash-outline" 
                                        @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress 
                                    v-if="item.showProgress" 
                                    :percent="item.percentage" 
                                    hide-info></Progress>
                                </template>
                        </div>
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
                            type="drag"
                            action="/H_roleplay-si/ds/upload"
                            style="display: table;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看图片" v-model="visible">
                            <img 
                                :src="'/H_roleplay-si/ds/download?url=' + imgName + ''" 
                                v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
            </Poptip>

            <Poptip 
                
                v-show="allowFile"
                placement="bottom-start" >
                <Icon type="md-attach" size=24  class="choice-file" />文件
                 <span v-if="uploadFileList.length>0">({{uploadFileList.length}})</span>
                <div slot="content">
                    <p class="lh25 marbottom10" style="min-width:230px;">
                        <span>共{{uploadFileList.length}}份,您还能上传{{9-uploadFileList.length}}份</span>
                        <Button 
                            class="fr" 
                            v-if="uploadFileList.length>0"
                            type="warning" 
                            @click="handleClearFile">清空全部</Button>
                    </p>
                    <Upload
                    multiple
                    ref="uploadFile"
                    :headers="httpHeaders"
                    :on-success="handleFileSuccess"
                    :default-file-list="defaultFileList"
                    :before-upload="handleBeforeFileUpload"
                    action="/H_roleplay-si/ds/upload">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                   
                </div>
            </Poptip>
            <!-- <span v-if="ischild">
                <Checkbox v-model="commentAndReply">同时评论到此应用</Checkbox>
            </span> -->
        </Col>
        <Col class="publish-bar-right" span="12">
            <Button  @click.native="handleSend" >发送</Button>
        </Col>
    </Row>
</div>
</template>

<script>
import { getToken } from "@/utils/utils";
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
            faceVisible:false
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
        choice_face: function(n) {
            this.discContent.txt  =   this.discContent.txt + '<img src="'+ n+'" width="20">';
            this.faceVisible = false;
        },
        changeTxt:function(e){
            this.discContent.txt=  e.target.innerHTML
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

            this.handlePublish(this.discContent.txt,files,this.superComment,this.commentAndReply);

            this.innerText = '';
            this.discContent.txt = '';
            this.$refs.publishContent.innerText = '';
            this.$refs.upload.clearFiles();
            this.$refs.uploadFile.clearFiles();
           
            this.uploadList = this.$refs.upload.fileList;
            this.uploadFileList = this.$refs.uploadFile.fileList;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
            file.name  =res.data[0].attacthment;
        },
        handleFileSuccess(res, file){
            file.url ='/H_roleplay-si/ds/download?url=' +  res.data[0].attacthment;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '系统提示',
                desc: '图片 ' + file.name + '格式不支持, 请选择格式为jpg或者png的图片'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超过文件大小限制',
                desc: '文件  ' + file.name + '太大,最多支持2M.'
            });
        },
        handleBeforeImgUpload () {
            const check = this.uploadList.length < 9;
            if (!check) {
                this.$Notice.warning({
                    title: '您最多可以上传九张图片。 '
                });
            }
            return check;
        },
        handleBeforeFileUpload () {
            const check = this.uploadFileList.length < 9;
            if (!check) {
                this.$Notice.warning({
                    title: '您最多可以上传九分文件。 '
                });
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
        }
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
    }
};
</script>

