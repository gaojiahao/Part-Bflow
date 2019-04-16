<style lang="less" scoped>
  @import './related-app.less';
</style>

<template>
<div class="bg_ff" style="margin-bottom:20px;">

    <Row class="app-resource-group-title">
      <h3>相关应用<a v-if="isAdmin" @click="showAddModal" class="app-relate-add">添加</a></h3>
    </Row>
    <Row class="related-app-content" :gutter="8">
      <draggable v-model="relatedApps" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
        <Col :xs="24" :sm="12" :md="8" :lg="5" v-for="(app,index) of relatedApps" :key="index" style="margin-bottom:5px">
          <Card class="app-card">
            <img class="card-img" :src="app.icon" />
            <div class="card-right">
              <p class="card-name">{{ app.listName }}</p>
              <p class="card-type">{{ app.appName }}</p>
            </div>
            <Checkbox @on-change="changeAppStatus(app,app.sort)" class="card-check" :disabled="!isAdmin" :value="app.STATUS===1?true:false"></Checkbox>
            <div v-if="isAdmin" @click="deleteApp(app)" class="card-delete">删除</div>
          </Card>
        </Col>
        </transition-group>
      </draggable>
      <p v-if="relatedApps.length===0" style="text-align:center;">暂无相关应用</p>
    </Row>
    <Modal v-model="showModal" title="新增相关应用">
            <Form ref="formValid" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="应用名称" prop="name">
                    <Input 
                      @on-click="selectAppRelate" 
                      @on-change="clearAppRelate" 
                      v-model="formValidate.name" 
                      icon="md-arrow-dropdown" 
                      style="width: 200px">
                    </Input>
                </FormItem>
                <FormItem label="关系类型" prop="exampleType">
                    <Select v-model="formValidate.exampleType">
                        <Option value="business">计算关系</Option>
                        <Option value="quote">引用关系</Option>
                    </Select>
                </FormItem>
                <FormItem label="别名" prop="alias">
                    <Input v-model="formValidate.alias"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="confirmAdd">确定</Button>
                <Button type="default" @click="cancelAdd">取消</Button>
            </div>
        </Modal>
        <!-- 应用名称选择器 -->
        <app-name-selector 
          ref="appNameSelector" 
          @appSelectData="getAppSelectData">
        </app-name-selector>
  </div>
</template>

<script>
import { 
  getRelatedApp,
  prohibitExampleDetails,
  sortExampleDetails,
  addAppRelate,
  deleteAppRelate } from "@/services/appService.js";
import AppNameSelector from './app-name-selector';
import draggable from "vuedraggable";

export default {
  name: "relatedApp",
  components: {
    draggable,
    AppNameSelector
  },
  props: {
    listId: {
      type: String
    },
    isAdmin: Boolean
  },
  data() {
    return {
      isDragging: false,
      delayedDragging: false,
      showModal: false,
      relatedApps: [],
      selectAppName: [],
      selectAppListId: [],
      formValidate: {
        name: "",
        exampleType: "",
        alias: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "请选择应用名称名称", trigger: "change" }
        ],
        exampleType: [
          { required: true, message: "请选择关系类型", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.isAdmin,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      //执行在dom更新之后
      this.$nextTick(() => {
        this.delayedDragging = false;
        this.saveAppData();
      });
    },
    showModal(value) {
      if(value){
        this.$refs["formValid"].resetFields();
        this.formValidate.alias = '';
      }
    }
  },
  methods: {
    //获取选择的应用名称
    getAppSelectData(selectData) {
      let appName = [],appListId = [];
      this.selectAppName = selectData;
      if(selectData.length > 0){
        for(let item of selectData){
          appName.push(item.title);
          this.selectAppListId.push(item.listId);
        }
      }
      this.formValidate.name = appName.join(',');
    },
    showAddModal() {
      this.showModal = true;
    },
    //添加相关应用确定
    confirmAdd() {
      let params = [];
      for(let item of this.selectAppListId){
        params.push({
          appId: this.$route.params.listId,
          listId: item,
          exampleType: this.formValidate.exampleType,
          alias: this.formValidate.alias
        })
      }

      this.$refs["formValid"].validate(v => {
        if(v){
          addAppRelate(params).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.showModal = false;
              this.getRelatedAppData();
            }
          }).catch(res => {
            this.$Message.error(res.data.message);
          })
        }
      });
    },
    //删除相关应用
    deleteApp(app) {
      let params = {
        appId: this.$route.params.listId,
        listId: app.listId
      };
      if(app){
        this.$Modal.confirm({
            title: "确认",
            content: `确认删除<b>${app.listName}</b>？`,
            onOk: () => {
              deleteAppRelate(params).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  this.getRelatedAppData();
                }
              }).catch(res => {
                this.$Message.error(res.data.message);
              })
            }
          });
      }
    },
    //添加相关应用取消
    cancelAdd() {
      this.showModal = false;
    },
    //打开应用名称选择器
    selectAppRelate() {
      this.$refs['appNameSelector'].showAppNameModal = true;
    },
    clearAppRelate() {},
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    //相关应用排序保存
    saveAppData() {
      let sortIds = [];
      this.relatedApps.forEach(val => {
        sortIds.push(val.id);
      });
      if(sortIds){
        sortExampleDetails(sortIds.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
          }
        })
      }
    },
    //启用禁用相关应用
    changeAppStatus(app,index) {
      prohibitExampleDetails(app.id).then(res => {
        if(res.success){
          this.$Message.success(res.message);
        }
      }).catch(error => {
        this.$Message.error(error.data.message);
      });
    },
    //获取相关应用列表数据
    getRelatedAppData() {
      getRelatedApp(this.$route.params.listId).then(res => {
          this.relatedApps = res;
          this.relatedApps.map(app=>{
             if(app.icon){
                if(app.icon.indexOf('resource')=== 0 ){
                     app.icon = `https://lab.roletask.com/resource/app-icon/${app.icon.split('/').pop()}`
                }
            }
          });
      });
    }
  },
  created() {
    this.getRelatedAppData();
  }
};
</script>

