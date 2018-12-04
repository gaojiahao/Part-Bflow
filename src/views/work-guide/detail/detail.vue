<style lang="less" scoped>
  @import "./detail.less";
</style>

<template>
    <div class="workguide">
        <Row class="workguide-title">
            <span>标题：</span>
            <Input v-model="workGuideData.title" style="width: 300px" />
        </Row>
        <Row v-if="this.$route.params.id" class="workguide-type">
            <img :src="workGuideData.creatorImage"/>
            <span class="workguide-type-worktype">{{ workGuideData.creatorName }}</span>
            <span class="workguide-type-crtTime">{{ workGuideData.crtTime }}</span>
        </Row>
        <Row class="workguide-desc">
            <span>描述：</span>
            <Input v-model="workGuideData.comment" type="textarea" />
        </Row>
        <Row class="workguide-read">
            <img v-for="(data,idx) of workGuideData.workStepList" :key="idx" :src="data.image"/>
            <div v-if="workGuideData.workStepList.length>0" class="workguide-read-go"><Icon type="ios-arrow-forward" />分布阅读</div>
        </Row>
        <Row class="workguide-content">
            <div @click="addStep" class="workguide-content-add">添加步骤</div>
           <Timeline>
                <TimelineItem v-for="(list,index) of workGuideData.workStepList" :key="index">
                    <div class="step-detail">
                        <h4>{{list.title}}</h4>
                        <div @click="deleteStep(list,index)" class="workguide-content-delete">删除</div>
                        <div @click="editStep(list,index)" class="workguide-content-delete">修改</div>
                        <div>{{list.comment}}</div>
                        <img :src="list.image"/>
                    </div>
                </TimelineItem>
            </Timeline>
        </Row>
        <Row class="workguide-save">
            <span class="workguide-save-btn" @click="saveWorkguide('save')">保存</span>
            <span class="workguide-save-btn" @click="saveWorkguide">保存并继续添加</span>
            <span class="workguide-save-btn" @click="goBack">返回</span>
        </Row>
        <!-- modal -->
        <Modal v-model="showModal" title="添加步骤">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="formValidate.title"></Input>
                </FormItem>
                <FormItem label="描述" prop="comment">
                    <Input v-model="formValidate.comment" type="textarea"></Input>
                </FormItem>
                <FormItem label="图片：" prop="logo" :label-width="91">
                    <Upload ref="upload"  
                        :show-upload-list="false" 
                        :on-success="handleSuccess" 
                        :format="['jpg','jpeg','png']" 
                        :max-size="2048" 
                        :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        type="drag"
                        action="/H_roleplay-si/ds/upload" 
                        style="display: inline-block;width:128px;vertical-align: middle;" 
                        :headers="httpHeaders">
                        <div style="width: 128px;height:128px;line-height: 128px;" v-if="!formValidate.logo">
                            <img v-if="formValidate.logo" :src="formValidate.logo">
                            <i v-if="!formValidate.logo" class="iconfont">&#xe63b;</i>
                        </div>
                        <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="formValidate.logo">
                            <img :src="formValidate.logo">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" color="#fff" size="30" @click.stop="handleView"></Icon>
                                <Icon type="ios-trash-outline" color="#fff" size="30" @click.stop="handleRemove"></Icon>
                            </div>
                        </div>
                    </Upload>
                    <Modal title="查看头像" v-model="visible">
                        <img :src="formValidate.logo" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="confirmAdd">确定</Button>
                <Button type="default" @click="cancelAdd">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { saveWorkGuideData,getworkDataById,updateWorkGuideData } from "@/services/workGuideService.js";
import { getToken } from "@/utils/utils";

export default {
  name: "wokdGuideDetail",
  components: {},
  data() {
    return {
        workguideId: this.$route.params.id,
        showModal: false,
        visible: false,
        httpHeaders: {
            Authorization: getToken()
        },
        formValidate: {
            title: '',
            comment: '',
            logo: ''
        },
        ruleValidate: {
            title: [
            { required: true, message: "请输入标题", trigger: "blur" }
            ],
            comment: [
            { required: true, message: "请输入描述", trigger: "blur" }
            ],
            logo: [
            { required: true, message: " ", trigger: "blur" }
            ]
        },
        workGuideData: {
            title: '',
            comment: '',
            workStepList: []
        }
    };
  },
  methods: {
    goBack() {
      this.$router.push({path:'/wokdGuide/list'});
    },
    saveWorkguide(save) {
        if(!this.workguideId){
            saveWorkGuideData(this.workGuideData).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    if(save === 'save'){
                        this.$router.push({path:'/wokdGuide/list'});
                    }else{
                        this.workGuideData = {
                            title: '',
                            comment: '',
                            workStepList: []
                        };
                    }
                }
            })
        }else{
            updateWorkGuideData(this.workGuideData).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    if(save === 'save'){
                        this.$router.push({path:'/wokdGuide/list'});
                    }else{
                        this.workGuideData = {
                            title: '',
                            comment: '',
                            workStepList: []
                        };
                    }
                }
            })
        }
        
    },
    //获取编辑知识库信息
    getKnowledgeDataById() {
      getKnowledgeTypeDataById(this.knowledgeId).then(res => {
        this.knowledgeForm = res
      })
    },
    //添加步骤
    addStep() {
        this.showModal = true;
        this.$refs['formValidate'].resetFields();
        this.formValidate.logo = '';
        this.formValidate.edit = false;
    },
    //删除步骤
    deleteStep(list,index) {
        this.workGuideData.workStepList.splice(index,1);
    },
    //修改步骤
    editStep(list,index){
        this.showModal = true;
        this.formValidate.title = list.title;
        this.formValidate.comment = list.comment;
        this.formValidate.logo = list.image;
        this.formValidate.currentIndex = index;
        this.formValidate.edit = true;
    },
    cancelAdd() {
        this.showModal = false;
    },
    confirmAdd() {
        if(this.formValidate.logo === ''){
            this.$Message.error('请插入图片！');
        }else{
            this.$refs["formValidate"].validate(v => {
                if (v) {
                    if(this.formValidate.edit){
                        this.workGuideData.workStepList[this.formValidate.currentIndex].title = this.formValidate.title;
                        this.workGuideData.workStepList[this.formValidate.currentIndex].comment = this.formValidate.comment;
                        this.workGuideData.workStepList[this.formValidate.currentIndex].image = this.formValidate.logo;
                    }else{
                        this.workGuideData.workStepList.unshift({
                        title: this.formValidate.title,
                        comment: this.formValidate.comment,
                        image: this.formValidate.logo
                        });
                    }
                this.showModal = false;
                }
            });
        }
    },
    //上传图片
    handleSuccess(res, file) {
      this.formValidate.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&url=" +
        res.data[0].attacthment;
    },
    //判断上传头像大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出范围",
        desc: "文件大小最大为2M"
      });
    },

    //判断上传图片格式是否有误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: "请上传格式为png 或者 jpg 的图片"
      });
    },
    //查看头像
    handleView() {
        this.visible = true;
    },
    //删除头像
    handleRemove() {
        this.formValidate.logo = '';
        this.$refs['upload'].fileList.splice(0,this.$refs['upload'].fileList.length);
    },
    //查询作业指导数据
    getWorkGuideDataById() {
        getworkDataById(this.$route.params.id).then(res => {
            this.workGuideData = res;
        })
    }
  },
  created() {
      if(this.$route.params.id){
          this.getWorkGuideDataById();
      }
  }
};
</script>

