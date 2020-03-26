<style lang="less" scoped>
  @import './features.less';
</style>

<template>
<div class="bg_ff" :style="{marginBottom:'20px'}">

    <Row class="app-feature-title">
         <h3>特性管理</h3>
    </Row>
    <Row class="feature-content">
        <!-- <div class="feature-toolbar">
            <Input search placeholder="输入名称搜索"  class="feature-search" />
            <Dropdown trigger="click" class="feature-dropdown">
                <a href="javascript:void(0)">
                    全部特性
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>全部特性</DropdownItem>
                    <DropdownItem>已开启特性</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div> -->
        <div class="feature-body">
            <Row :gutter="16">
                <Col :xs="24" 
                     :sm="12" 
                     :md="8" 
                     :lg="6"
                     v-for="(item, index) of featureList" 
                     :key="index"
                     :style="{marginBottom: '20px'}">
                     <div class="feature-card">
                         <div class="card-left">
                            <img :src="item.iconCls?item.iconCls:'resources/images/icon/img-loading-error.png'"/>
                        </div>
                        <div class="card-right">
                            <p class="card-right-title">
                                {{ item.title }}
                                <Icon v-if="item.status === '1'" type="md-checkmark-circle" class="card-right-title-icon" />
                            </p>
                            <Tooltip class="card-right-desc" :content="item.description" max-width="200" placement="top">
                                <p>{{ item.description }}</p>
                            </Tooltip>
                            <p>
                                <Button 
                                    @click="openOrCloseFeatures(item.id)" 
                                    type="info" 
                                    :disabled="!isAdmin"
                                    v-if="item.status === '0'">
                                    开启
                                </Button>
                                <Button 
                                    @click="openOrCloseFeatures(item.id)" 
                                    type="error" 
                                    :disabled="!isAdmin"
                                    ghost  
                                    v-if="item.status === '1'">
                                    关闭
                                </Button>
                                <Button 
                                    v-if="item.title === '工作日志'"
                                    @click="setFeatureConfig(item)">
                                    设置
                                </Button>
                            </p>
                        </div>
                     </div>
                </Col>
            </Row>
        </div>
    </Row>
    <Modal
        v-model="showFeatureConfig"
        :title="configTitle"
        @on-ok="saveFeatureConfig">
        <label>标题默认值：</label>
        <Select 
            v-model="defaultConfigValue" 
            label-in-value
            filterable
            @on-change="onConfigSelectChange" 
            transfer 
            style="width:250px">
            <Option 
                v-for="item in fieldList" 
                :value="item.fieldCode" 
                :key="item.fieldCode">
                {{ item.fieldName }}
            </Option>
        </Select>
    </Modal>
  </div>
</template>

<script>
import { 
    getAppFeaturesList, 
    switchAppFeatures, 
    getCustomFieldResorce,
    saveFeaturesConfig,
    getFeaturesConfig } from "@/services/appService.js";

export default {
  name: "FeatureManage",
  components: {},
  props: {
    isAdmin: Boolean,
    listId: String
  },
  data() {
    return {
        showFeatureConfig: false,
        configTitle: '',
        defaultConfigValue: '',
        featureList: [],
        fieldList: [],
        defaultTitle: {}
    };
  },
  watch: {
    
  },
  methods: {
      getFeaturesData() {
          getAppFeaturesList(this.listId).then(res => {
              if(res.success){
                  this.featureList = res.data;
                  for(let item of this.featureList){
                      if(item.title === '工作日志'){
                          getFeaturesConfig(this.listId,item.id).then(con => {
                              if(con.success){
                                  if(con.data.defaultTitle) this.defaultConfigValue = JSON.parse(con.data.defaultTitle).fieldCode;
                              }
                          })
                          break;
                      }
                  }
              }
          });
      },
      openOrCloseFeatures(featureId) {
          if(featureId) {
              switchAppFeatures(this.listId, featureId).then(res => {
                  if(res.success){
                      this.$Message.success(res.message);
                      this.getFeaturesData();
                  }
              }).catch(err => {
                  this.$Message.error(res.data.message)
              });
          }
      },
      setFeatureConfig(item) {
          this.configTitle = item.title;
          this.featureId = item.id;
          this.showFeatureConfig = true;
      },
      onConfigSelectChange(value) {
          this.defaultTitle = {
              fieldCode: value.value,
              fieldName: value.label
          };
      },
      saveFeatureConfig() {
          saveFeaturesConfig(this.listId,this.featureId,JSON.stringify(this.defaultTitle)).then(res => {
              if(res.success){
                  this.$Message.success(res.message);
                  this.showFeatureConfig = false;
                  this.getFeaturesData();
              } 
          }).catch(err => {
              this.$Message.error(err.data.message);
          })
      },
      getAllFormFields() {
          getCustomFieldResorce(this.listId).then(res => {
              this.fieldList = res;
              this.fieldList.forEach(item => {
                  item.parentCode && (item.fieldCode = `${item.fieldCode}_${item.parentCode}`);
              })
          })
      }
  },
  created() {
    this.getFeaturesData();
    this.getAllFormFields();
  }
};
</script>

