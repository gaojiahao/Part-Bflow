<style lang="less" scoped>
  @import './message-manage.less';
</style>

<template>
<div class="bg_ff" :style="{marginBottom:'20px'}">

    <Row class="message-title">
         <h3>消息管理
             <span 
                class="warning-color marlr" 
                :style="{fontSize:'14px'}">
                拖动字段列表到配置列表以配置模板
            </span>
        </h3>
    </Row>
    <Row class="message-content">
        <div class="all-fields">
            <div class="all-fields-header">字段集合</div>
            <div class="all-fields-search">
                <Input 
                    @on-search="searchFields" 
                    v-model="fieldsValue" 
                    search 
                    placeholder="请输入字段名称" />
            </div>
            <div class="all-fields-content">
                <draggable
                    :list="fieldsList"
                    group="people"
                    :disabled="!isAdmin"
                    :sort="allSort">
                    <div 
                        class="field-name" 
                        v-for="field of fieldsList" 
                        :key="field.fieldCode">
                        {{ field.fieldName }}
                    </div>
                </draggable>
                <div v-if="fieldsList.length===0" :style="{color:'#999797'}">暂无数据</div>
            </div>
        </div>
        <div class="message-fields">
            <div class="message-fields-header">模板配置项</div>
            <div class="message-fields-content">
                <draggable
                    :list="messageFieldsConfig"
                    group="people"
                    :disabled="!isAdmin"
                    @add="dragAdd"
                    @remove="dragRemove"
                    @update="dragSort">
                    <div class="field-list" v-for="field of messageFieldsConfig" :key="field.fieldCode">
                        <span class="field-list-name">{{ field.fieldName }}</span>
                        <span class="field-list-action">
                            <span class="field-list-action-impor" @click="changeImportantSatus(field)">
                                <Icon type="md-checkmark-circle" :style="{color:field.emphases?'#39f':'#999'}"/>
                                重要 
                            </span>
                            <!-- <span v-if="field.isNum" class="field-list-action-sum">
                                <Icon type="md-checkmark-circle" :style="{color:'#39f'}"/>
                                汇总
                            </span> -->
                        </span>
                    </div>
                    <div 
                        v-if="messageFieldsConfig.length===0" 
                        class="message-fields-content" 
                        :style="{color:'#999797'}">
                        暂无配置项
                    </div>
                </draggable>
            </div>
        </div>
        <div class="message-template">
            <div class="template-header">
                <span>{{ appTitle }}-xxxx</span>
                <span class="template-header-type">消息类型</span>
            </div>
            <div class="template-content">
                <div 
                    v-for="field of messageFieldsConfig" 
                    :key="field.name" 
                    class="template-content-list">
                    <span :class="{'list-impor':field.emphases}">{{ field.fieldName }}：</span>
                    <span :class="{'list-impor':field.emphases}">xxxxx</span>
                </div>
                <div 
                    v-if="messageFieldsConfig.length===0" 
                    class="template-content" 
                    :style="{color:'#999797'}">
                    暂无配置项
                </div>
            </div>
        </div>
    </Row>

  </div>
</template>

<script>
import { 
    getCustomFieldResorce,
    getMessageConfigFields,
    saveMessageConfigFields 
} from "@/services/appService.js";
import draggable from "vuedraggable";

export default {
  name: "MessageManage",
  components: {
      draggable
  },
  props: {
    isAdmin: Boolean,
    listId: String,
    appTitle: String
  },
  data() {
    return {
        fieldsValue: "",
        allSort: false,
        fieldsList: [],
        fieldsSearchList: [],
        messageFieldsConfig: []
    };
  },
  methods: {
      dragAdd() {
          this.dragChangeSave();
      },
      dragRemove() {
          this.dragChangeSave();
      },
      dragSort() {
          this.dragChangeSave();
      },
      dragChangeSave() {
          let data = {
              listId: this.listId,
              msgConfig: this.messageFieldsConfig
          }
          saveMessageConfigFields(data).then(res => {
              if(res.success){
                  this.$Message.success(res.message);
              }else{
                  this.$Message.error(res.message);
              }
          })
      },
      changeImportantSatus(field) {
          this.$set(field,'emphases',!field.emphases);
          this.dragChangeSave();
      },
      //所有字段列表搜索
      searchFields() {
          this.fieldsList = [];
          let unConfigFields = this.getUnConfigFields();
          if(this.fieldsValue){
              unConfigFields.forEach(val => {
                  val.fieldName.indexOf(this.fieldsValue) > -1 && this.fieldsList.push(val);
              })
          }else{
              this.fieldsList = unConfigFields;
          }
      },
      //获取未配置字段
      getUnConfigFields() {
        let unConfigFields = JSON.stringify(this.fieldsSearchList);
        unConfigFields = JSON.parse(unConfigFields);

        for(let i = 0;i < this.messageFieldsConfig.length; i++) {
            for(let j = 0; j < unConfigFields.length; j++) {
                if(unConfigFields[j].fieldCode === this.messageFieldsConfig[i].fieldCode) {
                    unConfigFields.splice(j,1);
                    j--;
                }
            }
        }

        return unConfigFields;
      },
      //获取所有字段
      getAllFields() {
          getCustomFieldResorce(this.listId).then(res => {
              for(let item of res){
                  item.emphases = true;
              }
              this.fieldsSearchList = res;
              getMessageConfigFields(this.listId).then(res => {
                  !res.data && (res.data = []);
                  if(!res.success) this.$Message.error(res.message);
                  this.messageFieldsConfig = res.data;
                  this.fieldsList = this.getUnConfigFields();
              })
          })
      }
  },
  created() {
    this.getAllFields()
  }
};
</script>

