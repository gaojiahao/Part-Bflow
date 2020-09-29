<style lang="less" scoped>
  @import "./war-room.less";
</style>
<template>
  <div class="war-room">
    <div
      class="war-room-toolbar"
    >
      <div class="war-room-toolbar-title">
        <Row>
          <Col span="10" class="project-name">
          {{project.projectName}}
          </Col>
          <Col span="14">
             <Menu mode="horizontal" theme="light" active-name="gantt" >
              <MenuItem name="baseinfo">
             
                  <router-link :to="{name:'baseinfo'}">基本信息</router-link>
              </MenuItem>
              <MenuItem name="gantt">
                  <router-link :to="{name:'gantt',params:{transCode:$route.params.projectTransCode}}"> 甘特图</router-link>
              </MenuItem>
              <MenuItem name="finance">
                  <router-link :to="{name:'finance'}"> 
                    <Icon type="ios-warning-outline" color="red"  size="20" />
                    财务偏差
                  </router-link> 
              </MenuItem>
              <MenuItem name="schedule">
                <router-link :to="{name:'schedule'}">
                  <Icon  type="ios-warning-outline" color="red"  size="20" />
                  进度偏差
                </router-link> 
              </MenuItem>
            </Menu>
          </Col>
        </Row>
      </div>
     
      <div class="war-room-toolbar-actions"  >
        <Tooltip
          v-if="$route.path.includes('gantt')"
          :content="showGridModel?'隐藏左侧表格':'显示左侧表格'"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="md-list"
            type="primary"
            shape="circle"
            @click="showGrid()"
          ></Button>
        </Tooltip>
         <Tooltip
         v-if="$route.path.includes('gantt')"
          :content="expandAllModel?'关闭所有任务':'展开所有任务'"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="ios-folder-open-outline"
            type="primary"
            shape="circle"
            @click="expandTaskModel()"
          ></Button>
        </Tooltip>
        <Tooltip
          content="活动"
           v-if="$route.path.includes('gantt')"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="md-aperture"
            type="primary"
            shape="circle"
            @click="openRightContainer"
          ></Button>
        </Tooltip>
        <Tooltip
          content="财务分析"
          placement="top"
        >
          <Button
            :size="buttonSize"
            icon="ios-pie-outline"
            type="primary"
            shape="circle"
            @click="financialAnalysisModel=true;"
          ></Button>
        </Tooltip>

        <Tooltip
          content="刷新数据"
          placement="top"
          v-if="$route.path.includes('gantt')"
        >
          <Button
            :size="buttonSize"
            icon="md-refresh"
            type="primary"
            shape="circle"
            @click="ganttLoadData"
          ></Button>
        </Tooltip>

        <div class="war-room-toolbar-actions-process " v-if="$route.path.includes('gantt')" >
          任务状态：
          <Icon type="ios-funnel" />
          <div
            v-for="(p,index) in taskProcess"
            :key="index"
            style="cursor: pointer;"
            :style="{'background-color':p.color}"
            @click="filterTaskByProcess(p.fieldValue)"
          >
          <Icon type="md-checkmark" v-if="filterProcess.includes(p.fieldValue)" />
            {{p.fieldValue}}
          </div>
        </div>

      </div>
    </div>
    <router-view class="war-room-content"> </router-view>

    <Drawer
      :mask="true"
      class="project-drawer"
      width="350"
      :closable="false"
      v-model="financialAnalysisModel"
    >
      <financialAnalysis
        :projectTransCode="projectTransCode"
        :transType="transType"
      ></financialAnalysis>
    </Drawer>

    <!-- 报表分析 -->
    <Drawer
      :mask="true"
      class="project-drawer"
      width="600"
      :closable="false"
      :scrollable='true'
      v-model="timeAnalysisModel"
    >
      <timeAnalysis ref='timeAnalysis'></timeAnalysis>
    </Drawer>
    <Modal
      v-model="errorTip"
      width="360"
      footer-hide
      class="error-tip"
    >
      <div style="text-align:center;color:#e4393c;">
        <p>
          <Icon type="ios-information-circle"></Icon>{{errorText}}
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
const echarts = require("echarts");

import financialAnalysis from "./financial-analysis";
import timeAnalysis from "./time-analysis";

import Bus from "@/assets/eventBus.js";
import { getToken } from "@/utils/utils";

export default {
  name: "warRoom",
  components: {
    financialAnalysis,
    timeAnalysis
  },
  data() {
    return {
      showGridModel:true,
      expandAllModel:true,
      taskProcess: [],
      transType: "",
      buttonSize: "small",
      financialAnalysisModel: false,
      timeAnalysisModel: false,
      errorTip: false,
      showDeviation: false,
      errorText: "",
      project: {},
      filterProcess:[]
    };
  },
  computed: {
    
  },
  methods: {
    //隐藏或显示左侧grid
    showGrid(){
      this.showGridModel = !this.showGridModel;
      gantt.config.show_grid = this.showGridModel;
      gantt.render();
    },
    //展开或者合并任务节点
    expandTaskModel(){
      let _that = this;
      _that.expandAllModel = !_that.expandAllModel;

      gantt.eachTask(function(task){
        task.$open = _that.expandAllModel;
      });
      gantt.render();
    },
    ganttLoadData(){
      Bus.$emit('ganttLoadData');
    },
    openRightContainer(){
      Bus.$emit('showActivityModel');
    },
    filterTaskByProcess(process){
      if(this.filterProcess.includes(process)){
        this.filterProcess = this.filterProcess.filter(p=>{
          return p != process;
        });
      }else{
        this.filterProcess.push(process);
      }

       Bus.$emit('filterTaskByProcess',this.filterProcess);
    }
  },
  mounted() {
    
  },
  created: function() {
    this.projectTransCode = this.$route.params.projectTransCode;
    Bus.$on('showDeviation',(status) => {
      this.showDeviation = status;
    });
  }
};
</script>

<style>
@import "../../../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

<style >

.baseline {
  position: absolute;
  border-radius: 2px;
  opacity: 0.6;
  margin-top: -7px;
  height: 12px;
  background: #ffd180;
  border: 1px solid rgb(255, 153, 0);
}

.status_line {
  background-color: #0ca30a;
}

.gantt_task_cell.week_end {
  background-color: #e8e8e87d;
}

.gantt_task_row.gantt_selected .gantt_task_cell.week_end {
  background-color: #e8e8e87d !important;
}

.gantt_task_progress {
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
}

.project-comment {
  font-family: Arial;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
}

.base-info-p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  display: block;
  margin-bottom: 16px;
}

.gantt_task_line {
  border: none;
  background-color: snow;
}

.folder_row {
			font-weight: bold;
    }
  .gantt_grid_scale .gantt_grid_head_cell,
		.gantt_task .gantt_task_scale .gantt_scale_cell {
			font-weight: bold;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.7);
		}
</style>