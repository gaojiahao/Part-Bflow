<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="knowledge">
        <div class="knowledge-btn">
          <span class="knowledge-add" @click="openModal">新增</span>
        </div>
        <div 
          v-for="(knowledge,index) of knowledgeData"
          :key="index"
          @click="editKnowledgeData(knowledge,index)">
          <Row class="knowledge-list" :gutter="8">
              <Col span="22">
                <h2>{{ knowledge.title }}</h2>
                <p v-html="knowledge.content"></p>
                <span>{{ knowledge.creator }}</span>
                <span>{{ knowledge.crtTime }}</span>
              </Col>
              <Col span="2">
                <div class="knowledge-img">
                  <img :src="knowledge.imgSrc"/>
                </div>
              </Col>
          </Row>
        </div>

        <div>
          <Modal
              v-model="showModal"
              title="新增知识库"
              width=800
              :styles="{top: '20px'}">
              <Form 
                ref="formValidate" 
                :label-width="80" 
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
                    height="100" 
                    width="100%">
                    </vue-wangeditor>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="cancelModal">取消</Button>
                <Button type="primary"  @click="confirmModal">确定</Button>
            </div>
          </Modal>
        </div>
    </div>
</template>

<script>
import { 
  getKnowledgeData, 
  saveKnowledgeData, 
  getKnowledgeTypeData,
  updateKnowledgeData 
  } from "@/services/knowledgeBaseService.js";
import VueWangeditor from 'vue-wangeditor';

export default {
  name: "KnowledgeBase",
  components: { VueWangeditor },
  data() {
    return {
      showModal: false,
      isEdit: false,
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
      knowledgeData: [],
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
    openModal() {
      this.showModal = true;
      this.isEdit = false;
      this.$refs["formValidate"].resetFields();
      this.knowledgeForm.content = '';
      this.$refs.content.setHtml('');
    },
    //获取所有知识库数据
    getAllKnowledgeData() {
      getKnowledgeData().then(res => {
        if(res.success){
          this.knowledgeData = res.tableContent;
          this.knowledgeData.forEach((val) => {
            val.imgSrc = this.getString(val.content);
          })
        }
      })
    },
    //modal取消
    cancelModal() {
      this.showModal = false;
    },
    //modal确定
    confirmModal() {
      if(this.$refs.content.getHtml() === ''){
        this.$Message.error('必填项请输入！');
      }else{
        this.knowledgeForm.content = document.getElementById('editorContent').innerHTML;
      }
      this.$refs["formValidate"].validate(v => {
        if(v){
          saveKnowledgeData(this.knowledgeForm).then(res => {
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
    //修改知识库数据
    editKnowledgeData(data,index){
      this.$router.push({
        name: "knowledgeDetail",
        path: "/knowledge/detail",
        params: { id: data.id }
      });
    },
    //获取知识库类型数据
    getAllKnowledgeTypeData() {
      getKnowledgeTypeData().then(res => {
        this.typeList = res;
      })
    },
    //截取指定字符串
    getString(str) {
      let firstIndex,firstString,secondIndex,resultStr;
      if(str){
        firstIndex = str.indexOf('src');
        firstString = str.slice(firstIndex);
        secondIndex = firstString.indexOf('>');
        resultStr = firstString.slice(5,secondIndex-1);
      }
      
      return resultStr;
    }
  },
  mounted() {
    this.getAllKnowledgeData();
    this.getAllKnowledgeTypeData();
  }
};
</script>

