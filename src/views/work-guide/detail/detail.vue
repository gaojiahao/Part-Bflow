<style lang="less" scoped>
  @import "./detail.less";
</style>

<template>
    <div class="workguide">
        <Row class="workguide-title">
            <span><b style="color:#e4393c;margin-left: -9px;">*</b>标题：</span>
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
        </Row>
        <Row class="workguide-content">
            <div class="workguide-content-add">
                <span @click="addStep" class="workguide-content-add-btn">添加步骤</span>
                <b v-show="workGuideData.workStepList.length>0">拖动下方列表可排序</b>
            </div>
           <Timeline>
                <draggable v-model="workGuideData.workStepList" :options="dragOptions" :move="onMove">
                    <TimelineItem v-for="(list,index) of workGuideData.workStepList" :key="index">
                        <div class="step-num" slot="dot">{{index+1}}</div>
                        <div class="step-detail">
                            <i class=""></i>
                            <h4>{{list.title}}</h4>
                            <div @click="deleteStep(list,index)" class="workguide-content-delete">删除</div>
                            <div @click="editStep(list,index)" class="workguide-content-delete">修改</div>
                            <div class="step-detail-comment">{{list.comment}}</div>
                            <img :src="list.image"/>
                        </div>
                    </TimelineItem>
                </draggable>
            </Timeline>
        </Row>
        <Row class="workguide-toolbar">
            <span class="workguide-toolbar-btn" @click="saveWorkguide('save')">保存</span>
            <span class="workguide-toolbar-btn" @click="saveWorkguide">保存并继续添加</span>
            <router-link :to="{ name:'wokdGuideList'}">
                <span class="workguide-toolbar-btn">返回</span>
            </router-link>
        </Row>
        <!-- modal -->
        <Modal v-model="showModal" :transfer="false" title="添加步骤">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="formValidate.title"></Input>
                </FormItem>
                <FormItem label="描述">
                    <Input v-model="formValidate.comment" type="textarea"></Input>
                </FormItem>
                <FormItem label="图片：" :label-width="91">
                    <Upload ref="upload"  
                        :show-upload-list="false" 
                        :on-success="handleSuccess" 
                        :format="['jpg','jpeg','png']" 
                        :max-size="2048" 
                        :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        type="drag"
                        action="/H_roleplay-si/ds/upload"
                        class="upload-img"
                        :headers="httpHeaders">
                        <div class="upload-img-first" v-if="!formValidate.logo">
                            <img v-if="formValidate.logo" :src="formValidate.logo">
                            <i v-if="!formValidate.logo" class="iconfont">&#xe63b;</i>
                        </div>
                        <div class="demo-upload-list" v-if="formValidate.logo">
                            <img :src="formValidate.logo">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" color="#fff" size="30" @click.stop="handleView"></Icon>
                                <Icon type="ios-trash-outline" color="#fff" size="30" @click.stop="handleRemove"></Icon>
                            </div>
                        </div>
                    </Upload>
                    <Modal title="查看头像" v-model="visible">
                        <img :src="formValidate.logo" v-if="visible" style="width: 100%">
                        <div slot="footer"></div>
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
import draggable from "vuedraggable";

export default {
  name: "wokdGuideDetail",
  components: {
      draggable
  },
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
            ]
        },
        workGuideData: {
            title: '',
            comment: '',
            workStepList: []
        }
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 500,
        group: "description",
        disabled: false,
        handle: ".step-detail",
        ghostClass: "ghost"
      };
    }
  },
  methods: {
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    },
    //保存
    saveWorkguide(save) {
        if(!this.workguideId){
            if(this.workGuideData.title === ''){
                this.$Message.error('请输入标题！');
            }else{
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
                }).catch(error => {
                    this.$Message.error(error.data.message);
                });
            }
        }else{
            if(this.workGuideData.title === ''){
                this.$Message.error('请输入标题！');
            }else{
                updateWorkGuideData(this.workGuideData).then(res => {
                    if(res.success){
                        this.$Message.success(res.message);
                        if(save === 'save'){
                            this.$router.push({path:'/wokdGuide/list'});
                        }else{
                            this.$router.push({path:'/wokdGuide/add'});
                            window.location.reload();
                        }
                    }
                }).catch(error => {
                    this.$Message.error(error.data.message);
                });
            }
        }
        
    },
    //获取编辑知识库信息
    getKnowledgeDataById() {
      getKnowledgeTypeDataById(this.knowledgeId).then(res => {
        this.knowledgeForm = res
      }).catch(error => {
        this.$Message.error(error.data.message);
      });
    },
    //添加步骤
    addStep() {
        this.showModal = true;
        this.$refs['formValidate'].resetFields();
        this.formValidate.logo = '';
        this.formValidate.comment = '';
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
        this.$refs["formValidate"].validate(v => {
            if (v) {
                if(this.formValidate.edit){
                    this.workGuideData.workStepList[this.formValidate.currentIndex].title = this.formValidate.title;
                    this.workGuideData.workStepList[this.formValidate.currentIndex].comment = this.formValidate.comment;
                    this.workGuideData.workStepList[this.formValidate.currentIndex].image = this.formValidate.logo;
                }else{
                    this.workGuideData.workStepList.push({
                    title: this.formValidate.title,
                    comment: this.formValidate.comment,
                    image: this.formValidate.logo
                    });
                }
            this.showModal = false;
            }
        });
    },
    //上传图片
    handleSuccess(res, file) {
      this.formValidate.logo =
        `/H_roleplay-si/ds/download?width=300&height=300&url=
        ${res.data[0].attacthment}`;
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
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
    }
  },
  created() {
      if(this.$route.params.id){
          this.getWorkGuideDataById();
      }
  }
};
</script>

