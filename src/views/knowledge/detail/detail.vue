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
                <Col span="12" style="margin-left:-121px;">
                    <FormItem prop="title" label="标题:">
                        <Input v-model="knowledgeForm.title" style="width: 300px" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="type" label="分类:">
                         <Select ref="typeSelect" v-model="knowledgeForm.type" :transfer="false" style="width:300px">
                            <Option v-for="(item,index) in typeList" :value="item.value" :key="item.id">
                              {{ item.name }}
                              <span class="type-edit" @click.stop="deleteType(item,index)"><Icon type="md-close"/></span>
                              <!-- <span class="type-edit" @click.stop="editType(item,index)"><Icon type="ios-create-outline"></Icon></span> -->
                            </Option>
                            <Option value="addType">
                                <span class="add-type" @click="showAddTypeModal">
                                  <Icon type="md-add" />
                                </span>
                            </Option>
                         </Select>
                    </FormItem>
                </Col>
            </Row>
            </FormItem>
            <FormItem label="内容:" prop="content" style="margin-bottom: 65px;">
                <div ref="editor" style="height:400px;padding-right:20%;"></div>
            </FormItem>
          </Form>
        </Row>
        <Row class="knowledge-save">
            <span class="knowledge-save-btn" @click="saveKnowledge('save')">保存</span>
            <span class="knowledge-save-btn" @click="saveKnowledge">保存并继续添加</span>
            <span class="knowledge-save-btn" @click="goBack">返回</span>
        </Row>
        <!-- modal -->
        <Modal v-model="showModal" title="添加分类" :styles="{top: '20px'}" :transfer="false">
            <Form ref="typeValidate" :model="typeValidate" :rules="typeRuleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="typeValidate.name" autofocus></Input>
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
import { 
  updateKnowledgeData, 
  getKnowledgeTypeDataById,
  getKnowledgeTypeData,
  saveKnowledgeData,
  saveKnowledgeDataType,
  deleteKnowledgeDataType
  } from "@/services/knowledgeBaseService.js";
  import E from 'wangeditor';

export default {
  name: "KnowledgeDetail",
  components: {},
  data() {
    return {
      knowledgeId: this.$route.params.id,
      isEdit: false,
      showModal: false,
      typeValidate: {
        name: "",
        value: ""
      },
      typeRuleValidate: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      },
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
    showAddTypeModal() {
      this.showModal = true;
      this.$refs["typeValidate"].resetFields();
      this.typeValidate.edit = false;
    },
    cancelAdd() {
      this.showModal = false;
    },
    //添加分类
    confirmAdd() {
      let newType = {};
      this.$refs["typeValidate"].validate(v => {
        if (v) {
          if(this.typeValidate.edit){
            newType = {
              name: this.typeValidate.name,
              value: 'KnowledgeBaseType',
              id: this.typeValidate.id
            };
          }else{
            newType = {
              name: this.typeValidate.name,
              value: 'KnowledgeBaseType'
            };
          }
          if(newType){
              saveKnowledgeDataType(newType).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  this.getAllKnowledgeTypeData();
                }
              }).catch(error => {
                this.$Message.error(error.data.message);
              });
          }
          this.showModal = false;
        }
      });
    },
    //修改分类
    editType(item,index) {
      this.$refs['typeSelect'].hideMenu();
      this.typeValidate.id = item.id;
      this.typeValidate.name = item.name;
      this.typeValidate.edit = true;
      this.showModal = true;
    },
    //删除分类
    deleteType(item,index) {
      this.$refs['typeSelect'].hideMenu();
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除<b style=color:#e4393c;>"+item.name+"</b>么？",
        onOk: () => {
          deleteKnowledgeDataType(item.id)
          .then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              if(this.knowledgeForm.type === item.value){
                this.knowledgeForm.type = '';
              }
              this.getAllKnowledgeTypeData();
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      });
    },
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
                  this.knowledgeId = false;
                  this.knowledgeForm.content = '';
                  this.$refs['formValidate'].resetFields();
                  this.editor.txt.html('<span></span>');
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
                  this.editor.txt.html('<span></span>');
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
      if(this.knowledgeId){
        getKnowledgeTypeDataById(this.knowledgeId).then(res => {
          this.knowledgeForm.title = res.title;
          this.knowledgeForm.type = res.type;
          this.knowledgeForm.content = res.content;

          this.createEditor(res.content);
        })
      }
    },
    //create富文本编辑器
    createEditor(content) {
      let knowledgeContent = content?content:'';
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.onchange = (html) => {
        this.knowledgeForm.content = html;
      }
      this.editor.customConfig.uploadImgShowBase64 = true;
      this.editor.customConfig.zIndex = 100
      this.editor.create();
      this.editor.$textContainerElem[0].style.height = '400px';
      this.editor.txt.html('<span>'+knowledgeContent+'</span>');
    }
  },
  mounted() {
      this.createEditor();
  },
  created() {
    this.getAllKnowledgeTypeData();
    this.getKnowledgeDataById();
  }
};
</script>

