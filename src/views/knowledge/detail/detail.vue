<style lang="less" scoped>
  @import "./detail.less";
</style>

<template>
    <div class="knowledge">
          <Form 
            ref="formValidate" 
            :label-width="120" 
            :model="knowledgeForm" 
            :rules="ruleValidate">
            <FormItem label="标题:" prop="title">
                <Input v-model="knowledgeForm.title" style="width: 300px" />
                </DatePicker>
            </FormItem>
            <FormItem label="分类:" prop="type">
                <Select v-model="knowledgeForm.type" style="width:300px">
                    <Option v-for="item in typeList" :value="item.value" :key="item.id">{{ item.name }}</Option>
                </Select>
                </DatePicker>
            </FormItem>
            <FormItem label="内容:" prop="content" style="margin-bottom: 65px;">
                <vue-wangeditor 
                ref="content" 
                id="editorContent" 
                :menus="menu"
                width="100%">
                </vue-wangeditor>
            </FormItem>
        </Form>
        <Row class="knowledge-save">
            <span class="knowledge-save-btn" @click="saveKnowledge('save')">保存</span>
            <span class="knowledge-save-btn" @click="saveKnowledge">保存并继续添加</span>
        </Row>
    </div>
</template>

<script>
import { 
  updateKnowledgeData, 
  getKnowledgeTypeDataById,
  getKnowledgeTypeData } from "@/services/knowledgeBaseService.js";
import VueWangeditor from 'vue-wangeditor';

export default {
  name: "KnowledgeDetail",
  components: { VueWangeditor },
  data() {
    return {
      showModal: false,
      knowledgeForm: {
        title: '',
        type: '',
        content: ''
      },
      typeList: [],
      ruleValidate: {
        title: [
            { required: true, message: '不能为空！', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '不能为空！', trigger: 'change' }
        ],
        content: [
            { required: true, message: ' 123', trigger: 'blur' }
        ]
      },
      menu: [
        'source',	// 源码模式
        '|',
        'bold',	// 粗体
        'underline',	// 下划线
        'italic',	// 斜体
        'strikethrough',	// 中线
        'eraser',	// 清空格式
        'forecolor',	// 文字颜色
        'bgcolor',	// 背景颜色
        '|',
        'quote',	// 引用
        'fontfamily',	// 字体
        'fontsize',	// 字号
        'head',	// 标题
        'unorderlist',	// 无序列表
        'orderlist',	// 有序列表
        'alignleft',	// 左对齐
        'aligncenter',	// 居中
        'alignright',	// 右对齐
        '|',
        'emotion',	// 表情
        'img',
        '|',
        'undo',	// 撤销
        'redo'	// 重做
      ]
    };
  },
  methods: {
    //保存
    saveKnowledge() {
      if(this.$refs.content.getHtml() === ''){
        this.$Message.error('必填项请输入！');
      }else{
        this.knowledgeForm.content = document.getElementById('editorContent').innerHTML;
      }
      this.$refs["formValidate"].validate(v => {
        if(v){
          updateKnowledgeData(this.knowledgeForm).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                this.showModal = false;
                this.getAllKnowledgeData();
              }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
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
      getKnowledgeTypeDataById(this.$route.params.id).then(res => {
        this.knowledgeForm.title = res.title;
        this.knowledgeForm.type = res.type;
        this.knowledgeForm.content = res.content;
        this.$refs.content.setHtml(res.content);
      })
    }
  },
  mounted() {
    this.getAllKnowledgeTypeData();
    this.getKnowledgeDataById();
  }
};
</script>

