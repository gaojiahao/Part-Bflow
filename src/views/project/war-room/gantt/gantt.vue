<template>
  <div class="gantt-container">
    <Spin fix v-if="showSpin">
        <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>
    <Row style="width:100%;height:100%;">
      <Col style="height:100%;" :span="showActivityModel?18:24">
        <div ref="gantt" style="width:100%;height:100%;"></div>
      </Col>
      <Col span="6" style="height: 100%;overflow: hidden;" v-if="showActivityModel">
        <router-view :uploadParams="uploadParams" :allowAddLog="allowAddLog"></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import { ganttLocale } from "../ganttLocale";
import {
  saveProjectPlan,
  getProjectPlan,
  saveProjectTask,
  getProjectPlanTransCode,
  getProject,
  addProjectTask,
  updateProjectTask,
  deleteProjectTask,
  addProjectTaskLink,
  deleteProjectTaskLink,
  getProjectTask,
  deleteProjectTaskFile
} from "@/services/projectService";
import { getProcessStatusByListId } from "@/services/appService";
import Bus from "@/assets/eventBus.js";
export default {
  name: "projectGantt",
  props: {},
  data() {
    return {
      allowAddLog: true,
      uploadParams: {
        biReferenceId: ""
      },
      showActivityModel: false,
      ganttLocale: ganttLocale,
      project: {},
      projectPlanTransCode: undefined,
      filterProcess:[],
      myTaskVisible:false,
      showSpin:true
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "gantt") {
        this.showActivityModel = false;
      }
    }
  },
  methods: {
    getRootTask(projectApproval) {
      return {
        parent: "root",
        text: this.project.projectName,
        dealerName: this.project.projectManagerName,
        attachmentCount: projectApproval.attachmentCount,
        logCount: projectApproval.logCount,
        commentCount: projectApproval.commentCount,
        projectTaskReferenceId: this.rootBiReferenceId,
        start_date: new Date(this.project.expectStartDate),
        end_date: new Date(this.project.expectEndDate),
        type: "project", 
        transCode: "",
        id: "0"
      };
    },
    formatProjectData(formData) {
      this.projectPlanReferenceId = formData.biReferenceId;
      var tasks = [],
        links = formData.link || [],
        projectPlanTask = formData.projectPlanTask,
        projectApproval = formData.projectApproval,
        spltTask = function(task) {
          tasks.push(task);
          if (task.children.length) {
            task.children.map(t => {
              spltTask(t);
            });
          }
        };

      projectPlanTask.map(t => {
        spltTask(t);
      });

      tasks.map((t, index) => {
        t.id = t.projectPlanTaskId;
        t.parent = t.parentId;
        t.start_date = t.startTime;
        t.end_date = t.deadline;
        t.text = t.taskName;
        t.type = 'task';
        if (
          t.declareWorkingHoursSubtotal === 0 ||
          t.standardWorkingHoursSubtotal === 0
        ) {
          t.progress = 0;
        } else {
          t.progress =
            t.declareWorkingHoursSubtotal / t.standardWorkingHoursSubtotal;
        }
      });

      tasks.push(this.getRootTask(projectApproval));
      return {
        data: tasks,
        links: links
      };
    },
    /**
     * 添加标记
     */
    addMarker() {
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "今天",
        title: "Today: " + today
      });

      var start = new Date(this.project.expectStartDate);
      gantt.addMarker({
        start_date: start,
        css: "status_line",
        text: "开始日期",
        title: "开始日期: " + start
      });
    },
    /**
     * 初始配置各类模板
     */
    initTemplates() {
      gantt.templates.rightside_text = function (start, end, task) {
        if (task.type == gantt.config.types.milestone) {
          return task.text;
        }
        return "";
      };
      gantt.templates.tooltip_text = function(start, end, task) {
        var tooltip = "";
        tooltip += "<b>任务:</b> " + task.text + "<br/>";
        tooltip +=
          "<b>开始日期:</b> " +
          gantt.templates.format_date(new Date(start)) +
          "<br/>";
        tooltip +=
          "<b>结束日期:</b> " +
          gantt.templates.format_date(new Date(end)) +
          "<br/>";
        tooltip += "<b>周期天数:</b> " + task.duration + "<br/>";
        task.standardWorkingHours &&
          (tooltip +=
            "<b>计划工时:</b> " + task.standardWorkingHours + "<br/>");
        tooltip += "<b>执行者:</b> " + task.dealerName + "<br/>";
        task.processStatus &&
          (tooltip += "<b>流程状态:</b> " + task.processStatus + "<br/>");
        return tooltip;
      };
      //区分工作日
      gantt.config.work_time = true;
      gantt.templates.timeline_cell_class = function(task, date) {
        if (!gantt.isWorkTime({ date: date, unit: "day" })) return "week_end";
        return "";
      };

      //弹出框标题
      gantt.templates.lightbox_header = function(start_date, end_date, task) {
        return "任务详情";
      };

      function percenToString(num) {
        return Math.floor(num * 100) + "%";
      }

      function ColorLuminance(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#",
          c,
          i;
        for (i = 0; i < 3; i++) {
          c = parseInt(hex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
          rgb += ("00" + c).substr(c.length);
        }

        return rgb;
      }
      let vm = this;

      gantt.templates.task_text = function(start, end, task) {
        let color,
          progress = task.progress;

        vm.taskProcess.map(c => {
          if (c.fieldValue === task.processStatus) color = c.color;
        });
        return `<div style='width:100%;position: absolute;background-color:${color}' >${
          task.text
        }</div>
                            <div  style='text-align: left;opacity: 0.5;color: black;font-weight: 600;width:${progress *
                              100}%;background-color:${ColorLuminance(
          color,
          0.5
        )}' >${percenToString(progress)}</div>`;
      };

      gantt.templates.grid_row_class = function(start, end, task) {
        var css = [];
        if (gantt.hasChild(task.id)) {
          css.push("folder_row");
        }
        return css.join(" ");
      };
    },
    createTaskSaveData(item, type) {
      let parent;
      //parent为0，则为项目
      //如果直接拿id,会拿gantt的默认自动生成的id,所有再添加子任务时，添加的parentId是错的
      if (item.parent === "root") {
        parent = "0";
      } else {
        parent = item.parent;
      }

      let data = {
        parentId: parent,
        projectPlanReferenceId: this.projectPlanReferenceId,
        projectId: this.project.projectApprovalId,
        taskName: item.text,
        taskType: item.taskType,
        executor: item.executor,
        dealerName: item.dealerName,
        processStatus: item.processStatus,
        standardWorkingHours: item.standardWorkingHours,
        cycleDays: item.duration,
        startTime: gantt.templates.format_date(item.start_date),
        deadline: gantt.templates.format_date(item.end_date),
        comment: item.comments || "",
        seq: item.$index
      };

      if (type === "update") {
        data["projectPlanTaskId"] = item.projectPlanTaskId;
      }
      return data;
    },
    /**
     * 初始化事件
     */
    initEvents() {
      let vm = this;
      gantt.attachEvent("onParse", function() {
        gantt.render();
      });


      //可用于做任务类型过滤
      gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
          if (vm.filterProcess.includes(task.processStatus) || task.type === 'project'){

              if(vm.myTaskVisible){
                if(vm.$currentUser.nickname === task.dealerName || task.type === 'project'){
                  return true;
                }
              }else{
                return true;
              }
          }
          return false;
      });
      //新增任务
      gantt.attachEvent("onAfterTaskAdd", function(id, item) {
        let projectPlanData = vm.buildProjetPlanData();
        let projectPlanTaskData = vm.initProjetPlanTaskFormData();
        let saveTaskData = {};

        vm.projectMember.map(m => {
          if (item.executor === m.key) {
            item.dealerName = m.label;
          }
        });
      
        //如果层级为1，和索引唯一，则需要创建项目计划，否则只是单纯的增加任务
        if (!vm.projectPlanTransCode) {
          
          item.parent = '0';
          projectPlanData.formData.projectPlanTask.push(vm.transformTask(item));

          saveProjectPlan(projectPlanData).then(res => {
            vm.ganttLoadData();
          });
        } else {
          if(item.parent === 'root') item.parent = '0';
          saveTaskData = vm.createTaskSaveData(item, "save");
          addProjectTask(saveTaskData).then(res => {
            if (res.success) {
              let routeName = vm.$route.name,
                endPath = "";

              if (["comment", "tasklog", "attachment"].includes(routeName)) {
                endPath = `/activity/${routeName}`;
              }
              vm.$router.replace(
                `/project/${vm.projectTransCode}/warRoom/gantt/${res.task.transCode}${endPath}`
              );
              vm.uploadParams.biReferenceId = res.task.projectTaskReferenceId;
              vm.allowAddLog = true;

              vm.$Message.success(res.message);
              item = Object.assign(item, res.task);
              gantt.changeTaskId(id, res.task.projectPlanTaskId);
            } else {
              vm.$Message.error(res.message);
              gantt.deleteTask(id);
            }
            gantt.createTask({},item.parent);
          });
        }
      });

      //删除任务
      gantt.attachEvent("onBeforeTaskDelete", function(id, item) {
        //todo:删除项目
        if (item.projectPlanTaskId) {
          deleteProjectTask(item.projectPlanTaskId).then(res => {
            if (res.success) {
              vm.$Message.success(res.message);
            } else {
              vm.$Message.error(res.message);
            }
          });
        }
      });

      //修改任务
      gantt.attachEvent("onAfterTaskUpdate", function(id, task) {
        let saveTaskData = {};
        vm.projectMember.map(m => {
          if (task.executor === m.key) {
            task.dealerName = m.label;
          }
        });
        saveTaskData = vm.createTaskSaveData(task, "update");
        updateProjectTask(saveTaskData).then(res => {
          if (res.success) {
            vm.$Message.success(res.message);
          } else {
            vm.$Message.error(res.message);
          }
        });
        return true;
      });

      //拖动左侧表格任务的顺序
      // gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex) {
      //   var task = gantt.getTask(id);
      //   if (task.parent != parent) return false;
      //   return true;
      // });

      // 选择任务
      gantt.attachEvent("onTaskClick", function(id, e) {
        let task = gantt.getTaskBy("id", id)[0],
          routeName = vm.$route.name,
          endPath = "";
        if (["comment", "tasklog", "attachment"].includes(routeName)) {
          endPath = `/activity/${routeName}`;
        }

        if (task) {
          vm.$router.replace(
            `/project/${vm.projectTransCode}/warRoom/gantt/${task.transCode}${endPath}`
          );
          vm.uploadParams.biReferenceId = task.projectTaskReferenceId;
          vm.allowAddLog = true;
        } else {
          
          vm.$router.replace(
            `/project/${vm.projectTransCode}/warRoom/gantt/${vm.projectPlanTransCode}${endPath}`
          );
          vm.uploadParams.biReferenceId = vm.rootBiReferenceId;
          vm.allowAddLog = false;
        }
        return true;
      });
      //校验
      gantt.attachEvent("onLightboxSave", function(id, item) {
        let valid = true;
        if(item.type === 'task'){
            if (!item.standardWorkingHours) {
              vm.errorText = "请输入计划工时！";
              valid = false;
            }
            if (!item.text) {
              vm.errorText = "请输入任务名称！";
              valid = false;
            }
        }
       
        if (!valid) {
          vm.errorTip = true;
          setTimeout(() => {
            vm.errorTip = false;
          }, 2000);
          return false;
        }

        return true;
      });

      //link增加前校验
      gantt.attachEvent("onBeforeLinkAdd", function(id, item) {
        if (item.source === "0" || item.target === "0") {
          vm.$Message.error("根节点不可连接！");
          return false;
        }
      });
      //link增加
      gantt.attachEvent("onAfterLinkAdd", function(id, item) {
        let data = {
          source: item.source,
          target: item.target,
          type: item.type
        };

        addProjectTaskLink(data).then(res => {
          if (res.success) {
            gantt.changeLinkId(id, res.link.id);
            vm.$Message.success(res.message);
          }
        });
      });

      //link删除
      gantt.attachEvent("onAfterLinkDelete", function(id, item) {
        deleteProjectTaskLink(id).then(res => {
          if (res.success) {
            vm.$Message.success(res.message);
          }
        });
      });
    },
    /**
     * 构建表单基本信息
     */
    buildBaseInfo() {
      let currentUser = this.$currentUser;
      return {
        handlerName: currentUser.nickname,
        handlerUnitName:
          currentUser.depts && currentUser.depts[0]
            ? currentUser.depts[0].name
            : "",
        handlerRoleName: currentUser.isSysRoleList[0].name,
        handler: currentUser.userId,
        handlerUnit:
          currentUser.depts && currentUser.depts[0]
            ? currentUser.depts[0].id
            : "",
        handlerRole: currentUser.isSysRoleList[0].id,
        creator: currentUser.userId,
        modifer: currentUser.userId,
        handlerEntity: currentUser.entityId
      };
    },
    /**
     * 设置项目周期
     */
    setProjectDuration(duration) {
      gantt.config.start_date = new Date(duration[0]);
      gantt.config.end_date = new Date(duration[1]);
      gantt.render();
    },
    /**
     * 构建项目计划主体结构数据
     */
    buildProjetPlanData() {
      let data = {
        listId: "0281f8eb-f1d2-415c-b566-756fc749ccb3",
        formData: {
          baseinfo: this.buildBaseInfo(),
          projectApproval: this.project,
          projectPlanTask: []
        }
      };
      return data;
    },
    /**
     * 构建项目任务主体结构数据
     */
    initProjetPlanTaskFormData() {
      let data = {
        formData: {
          baseinfo: this.buildBaseInfo(),
          rootProjectPlanTaskId: "",
          projectPlanTask: []
        }
      };
      return data;
    },
    /**
     * 数据转换，将gantt的task对象转换撑RT需要的格式
     */
    transformTask(item) {
      return {
        taskName: item.text,
        parentId: item.parent,
        taskType: item.taskType,
        executor: item.executor,
        standardWorkingHours: item.duration,
        startTime: gantt.templates.format_date(item.start_date),
        deadline: gantt.templates.format_date(item.end_date),
        seq: item.$index
      };
    },
    /**
     * 初始化甘特图配置
     */
    initGanttConfig() {
      let vm = this;
      // gantt.config.autoscroll = true;
      // gantt.config.types = {
      //   task: "task",
      //   milestone: "milestone",
      //   project:"project"
      // };
      gantt.config.fit_tasks = true;
      //允许拖动左侧表格任务的顺序
      // gantt.config.order_branch = true;
      // gantt.config.order_branch_free = true;
      gantt.config.show_progress = false;
      // gantt.config.placeholder_task = true;
      // gantt.config.readonly = true;
      gantt.i18n.setLocale(this.ganttLocale);
      gantt.config.date_format = "%Y-%m-%d";
      //暂时快捷信息
      gantt.plugins({
        // quick_info: true,
        tooltip: true,
        fullscreen: true,
        marker: true
      });
      gantt.config.root_id = "root";
      gantt.config.xml_date = "%Y-%m-%d";
      gantt.config.row_height = 18; //甘特图的行高
      gantt.config.min_column_width = 60;
      gantt.config.scale_height = 18 * 3;
      gantt.config.row_height = 28;
      gantt.config.open_tree_initially = true; //初始化就展开树结构
      gantt.config.preserve_scroll = true; //图表刷新后，滚动条的位置跟原来保持一致
      gantt.config.round_dnd_dates = false;
      gantt.config.touch = true;
      gantt.config.touch_drag = 75;
      gantt.config.touch_feedback = false;
      gantt.config.touch_feedback_duration = 1;
      gantt.config.auto_scheduling = true;
      gantt.config.duration_unit = "day";
      gantt.config.scale_unit = "day"; //时间坐标轴单位“minute”, “hour”, “day”, “week”, “quarter”, “month”, “year”
      gantt.config.date_scale = "%d,%D"; //日期格式 先数字后文字
      gantt.config.subscales = [
        {
          unit: "month",
          step: 1,
          date: "%Y年,%M"
        }
      ];
      //允许用户推拽条形图上用来调整进度百分比的小按钮
      gantt.config.drag_progress = false;
      //合并父节点是，分割下级任务
      gantt.config.open_split_tasks = true;

      let taskType = [
        {
          key: "设计类",
          label: "设计类"
        },
        {
          key: "协调类",
          label: "协调类"
        },
        {
          key: "执行类",
          label: "执行类"
        }
      ];

      let processStatusData = [];
      this.taskProcess.forEach(item => {
        processStatusData.push({
          key: item.fieldValue,
          label: item.fieldValue
        });
      });

      gantt.form_blocks["num_editor"] = {
        render: function(sns) {
          //sns - the section's configuration object
          return (
            "<div class='gantt_cal_ltext' >" +
            "&nbsp;<input class='editor_description' type='number'>" +
            "</div>"
          );
        },
        set_value: function(node, value, task, section) {
          node.querySelector(".editor_description").value = value;
          //node - an html object related to the html defined above
          //value - a value defined by the map_to property
          //task - the task object
          //section- the section's configuration object
        },
        get_value: function(node, task, section) {
          //node - an html object related to the html defined above
          //task - the task object
          //section - the section's configuration object
          let value = node.querySelector(".editor_description").value;
          task[section.map_to] = value;
          return value;
          ("");
        },
        focus: function(node) {
          //node - an html object related to the html defined above
        }
      };

      gantt.config.lightbox.sections = [
        {
          name: "description",
          height: 38,
          map_to: "text",
          type: "textarea",
          focus: true
        },
        {
          name: "taskType",
          height: 30,
          width: "50%",
          map_to: "taskType",
          type: "select",
          options: taskType
        },
        //  {
        //   name: "type",
        //   height: 30,
        //   width: "50%",
        //   map_to: "type",
        //   type: "typeselect"
        // },
        {
          name: "executor",
          height: 30,
          width: "50%",
          type: "select",
          map_to: "executor",
          options: this.projectMember
        },
        {
          name: "standardWorkingHours",
          height: 38,
          map_to: "standardWorkingHours",
          type: "num_editor",
          default_value: 1
        },
        {
          name: "processStatus",
          height: 30,
          width: "50%",
          type: "select",
          map_to: "processStatus",
          options: processStatusData
        },
        {
          name: "time",
          height: 30,
          type: "duration",
          time_format: ["%Y", "%m", "%d"],
          map_to: "auto"
        }
      ];

      gantt.locale.labels.section_taskType = "任务类型";
      gantt.locale.labels.section_executor = "执行者";
      gantt.locale.labels.section_standardWorkingHours = "计划工时";
      gantt.locale.labels.section_processStatus = "流程状态";

      var standardWorkingHoursEditor = {
        type: "number",
        map_to: "standardWorkingHours",
        min: 0,
        max: 24
      };
      gantt.config.columns = [
        {
          name: "text",
          tree: true,
          width: 200,
          resize: true,
          editor: { type: "text", map_to: "text" },
          label: "任务名称",
          align: "left",
          template: function (task) {
            let flag = false;
            vm.taskProcess.map(p=>{
              if(task.processStatus === p.fieldValue && p.openOrClose===1 && task.end_date<new Date()){
                flag = true;
              }
            });
            if(flag){
              return `<div style="color:red;">【逾期】${task.text}</div>`
            }else{
              return `<div >${task.text}</div>`
            }
          }
        },
        { name: "dealerName", width: 60, align: "center", label: "执行者" },
         {
          name: "start_date",
          align: "center",
          width: 80,
          resize: true,
          label: "开始日期"
        },
        { name: "standardWorkingHours", width: 60, align: "right", label: "计划工时" },
        {
          name: "comment",
          width: 40,
          align: "right",
          resize: true,
          label:
            '<img title="评论" style="width:17px;height:17px;cursor: pointer;vertical-align:middle;" src="resources/images/task-comment.png">',
          template: function(task) {
            return `<span style"color:#999;">${task.commentCount || 0}</span>`;
          }
        },
        {
          name: "taskLog",
          width: 40,
          align: "right",
          resize: true,
          label:
            '<img title="日志" style="width:17px;height:17px;cursor: pointer;vertical-align:middle;" src="resources/images/task-log.png">',
          template: function(task) {
            return `<span style"color:#999;">${task.logCount || 0}</span>`;
          }
        },
        {
          name: "file",
          width: 40,
          align: "right",
          resize: true,
          label:
            '<img title="附件" style="width:17px;height:17px;cursor: pointer;vertical-align:middle;" src="resources/images/attach.png">',
          template: function(task) {
            return `<span style"color:#999;">${task.attachmentCount ||
              0}</span>`;
          }
        },
        { name: "add", width: 44 }
      ];
    },
    /**
     * 加载甘特图数据
     */
    ganttLoadData(type) {
      let planTransCode, selectTaskId;


      selectTaskId = gantt.getSelectedId();

      getProjectPlanTransCode(this.projectTransCode).then(res => {
        this.showSpin = false;
        if (res.length) {
        //   this.transType = res[0].transType;
          this.$parent.transType = res[0].transType;
          planTransCode = res[0].transCode;
          this.projectPlanTransCode = planTransCode;
          getProjectPlan(planTransCode).then(res => {
            let data = this.formatProjectData(res.formData);
            this.rootBiReferenceId = res.formData.biReferenceId;
            gantt.clearAll();
            this.addMarker();
            gantt.parse(data);
            if (selectTaskId) {
              gantt.selectTask(selectTaskId);
            }
          });
        } else {
          this.addMarker();
          let rootTask = this.getRootTask(this.project);
          this.setProjectDuration([
            this.project.expectStartDate,
            this.project.expectEndDate
          ]);
          gantt.parse({
            data: [rootTask]
          });
        }
      });
    },

    /**
     * 获取项目任务流程状态
     */
    getTaskProcess() {
      return getProcessStatusByListId(
        "ee4ff0a1-c612-419d-afd7-471913d57a2a",
        1,
        20,
        {}
      ).then(res => {
        this.taskProcess = res.tableContent;
        this.$parent.taskProcess = res.tableContent;
        res.tableContent.map(r=>{
          this.$parent.filterProcess.push(r.fieldValue);
          this.filterProcess.push(r.fieldValue);
        });
      });
    },

    /**
     * 获取项目信息
     */
    getProjectInfo() {
      return getProject(this.projectTransCode).then(res => {
        this.uploadParams.biReferenceId = res.formData.biReferenceId;
        this.projectMember = res.formData.order;
        this.projectMember.map(m => {
          m.key = m.projectPartnerCode;
          m.label = m.projectPartnerName;
        });
        this.project = res.formData.projectApproval;
        this.$parent.project = this.project;
      });
    }
  },
  async mounted() {
    this.projectTransCode = this.$route.params.projectTransCode;

    await this.getTaskProcess();
    await this.getProjectInfo();

    this.initTemplates();
    this.initGanttConfig();
    gantt.init(this.$refs.gantt);
    this.ganttLoadData();
    this.initEvents();
    Bus.$on("showActivityModel", () => {
      this.showActivityModel = !this.showActivityModel;
      if (this.showActivityModel) {
        if (!gantt.getSelectedId()) {
          gantt.selectTask("0");
          this.$router.replace(
            `/project/${this.projectTransCode}/warRoom/gantt/${this.projectPlanTransCode}/activity/comment`
          );
          this.uploadParams.biReferenceId = this.rootBiReferenceId;
          this.allowAddLog = false;
        } else {
          this.$router.push({
            name: "activity"
          });
        }
      } else {
        this.$router.push({
          name: "gantt"
        });
      }
    });

    Bus.$on("ganttLoadData", () => {
      this.ganttLoadData();
    });

    Bus.$on("filterTaskByProcess",(filterProcess) =>{
      this.filterProcess = filterProcess;
      gantt.refreshData();
    });

    Bus.$on("filterMyTask",(myTaskVisible) =>{
      this.myTaskVisible = myTaskVisible;
      gantt.refreshData();
    });

    


  }
  // created: function() {
  //     debugger
  //     this.projectTransCode = this.$route.params.transCode;
  // }
};
</script>
<style lang="less" scoped>

.gantt-container{
  position: relative;
  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
}
</style>

