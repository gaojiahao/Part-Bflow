<style lang="less">
  @import "./detail.less";
</style>

<template>
    <div class="knowledge">
      <Row class="knowledge-form">
          <Form 
            ref="formValidate" 
            :label-width="120" 
            :model="knowledgeForm" 
            :rules="ruleValidate">
            <FormItem label="">
              <Row>
                <Col span="11" style="margin-left:-121px;">
                    <FormItem prop="title" label="标题:">
                        <Input v-model="knowledgeForm.title" style="width: 300px" />
                    </FormItem>
                </Col>
                <Col span="11">
                    <FormItem prop="type" label="分类:">
                         <Select v-model="knowledgeForm.type" :transfer="false" style="width:300px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.id">{{ item.name }}</Option>
                         </Select>
                    </FormItem>
                </Col>
            </Row>
            </FormItem>
            <FormItem label="内容:" prop="content" style="margin-bottom: 65px;">
                <div ref="editor" style="height:400px"></div>
            </FormItem>
          </Form>
        </Row>
        <Row class="knowledge-save">
            <span class="knowledge-save-btn" @click="saveKnowledge('save')">保存</span>
            <span class="knowledge-save-btn" @click="saveKnowledge">保存并继续添加</span>
            <span class="knowledge-save-btn" @click="goBack">返回</span>
        </Row>
    </div>
</template>

<script>
import { 
  updateKnowledgeData, 
  getKnowledgeTypeDataById,
  getKnowledgeTypeData,
  saveKnowledgeData
  } from "@/services/knowledgeBaseService.js";

  import { getToken } from "@/utils/utils";
  import E from 'wangeditor';

export default {
  name: "KnowledgeDetail",
  components: {},
  data() {
    return {
      knowledgeId: this.$route.params.id,
      knowledgeForm: {
        title: '',
        type: '',
        content: ''
      },
      typeList: [],
      ruleValidate: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择分类', trigger: 'change' }
        ],
        content: [
            { required: true, message: ' ', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push({path:'/knowledge/list'});
    },
    //保存
    saveKnowledge(isSave) {
      if(this.editor.txt.html() === '<p><br></p>'){
        this.$Message.error('必填项请输入！');
      }else{
        this.knowledgeForm.content = this.editor.txt.html();
      }

      this.$refs["formValidate"].validate(v => {
        if(v){
          if(this.knowledgeId){
            this.knowledgeForm.id = this.knowledgeId;
            updateKnowledgeData(this.knowledgeForm).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                if(isSave === 'save'){
                    this.$router.push({path:'/knowledge/list'});
                }else{
                  this.knowledgeId = null;
                  this.knowledgeForm.content = '';
                  this.$refs['formValidate'].resetFields();
                  this.editor.txt.html('');
                }
              }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
          }else{
            saveKnowledgeData(this.knowledgeForm).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                if(isSave === 'save'){
                    this.$router.push({path:'/knowledge/list'});
                }else{
                  this.knowledgeForm.content = '';
                  this.$refs['formValidate'].resetFields();
                  this.editor.txt.html('');
                }
              }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
          }
        }
      })
    },
    //获取知识库类型数据
    getAllKnowledgeTypeData() {
      getKnowledgeTypeData().then(res => {
        this.typeList = res;
      })
    },
    //获取编辑知识库信息
    getKnowledgeDataById() {
      getKnowledgeTypeDataById(this.knowledgeId).then(res => {
        this.knowledgeForm.title = res.title;
        this.knowledgeForm.type = res.type;
        this.knowledgeForm.content = res.content;

        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.onchange = (html) => {
          this.knowledgeForm.content = html
        }
        this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.create();
        this.editor.$textContainerElem[0].style.height = '400px';
        this.editor.cmd.do('insertHTML', res.content)
      })
    }
  },
  created() {
    this.getAllKnowledgeTypeData();
    this.getKnowledgeDataById();
  }
};
</script>

