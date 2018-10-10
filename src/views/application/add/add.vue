<style lang="less" scoped>
    @import './add.less';
</style>

<template>
  <div>
    <Row v-for="(list,k) of appData" :key="k" style="padding-bottom:35px;">
        <Card class="app-out-card">
            <p class="app-name" slot="title">
                {{ list.name }}
            </p>
            <a href="#" slot="extra"></a>
            <div 
                @click="selectApp(index,list.name)" 
                class="app-card" 
                v-for="(item,index) of list.list" 
                :key="index">
                <Card>
                    <div class="app-block">
                        <img class="app-img" :src="item.icon" />
                        <p class="app-title">{{ item.title }}</p>
                        <Icon 
                            v-show="item.isSelect" 
                            class="app-select-icon" 
                            type="checkmark-round">
                        </Icon>
                        <p class="app-desc">{{ item.comment }}</p>
                    </div>
                </Card>
            </div>
        </Card>
    </Row>
    <div class="add-bottom">
        <Affix class="add-save-btn" :offset-bottom="0">
            <Button @click="goBack">返回</Button>
            <Button @click="addAppTemplate" type="primary">保存</Button>
        </Affix>
    </div>
  </div>
</template>

<script>
import { getAppTemplateData, addTemplateApp } from '@/services/appService.js'
export default {
  name: 'appAddList',
  components:{},
  data () {
      return {
         showSelect: true,
         selectTemplate: [],
         appData: [{name:'业务',list:[]}]
      }
  },
  methods: {
     selectApp(index,name) {
        this.appData[0].list[index].isSelect = !this.appData[0].list[index].isSelect;
     },
     //添加应用模板
     addAppTemplate() {
         let addTemplateData = [];
         this.appData[0].list.forEach(val => {
             if(val.isSelect){
                 this.selectTemplate.push(val);
             }
         });
        this.selectTemplate.forEach(val => {
            addTemplateData.push({
                list: 'list',
                title: val.title,
                templateId: val.id,
                type: val.tplType,
                creator: '',
                transType: val.transType,
                uniqueId: val.uniqueId
            });
        });
        addTemplateApp(addTemplateData).then(res =>{
            if(res.success){
                this.$Message.success(res.message);
                this.selectTemplate = [];
            }
        })
     },
     //获取应用模板数据
     getTplData() {
         getAppTemplateData().then(res => {
          res.tableContent.forEach((val, index) => {
              if(val.tplType === 'business'){
                  val.isSelect = false;
                  this.appData[0].list.push(val);
              }
          })
      })
     },
     goBack() {
         this.$router.push({path: '/application/list'});
     }
  },
  created() {
      this.getTplData();
  }
}
</script>

