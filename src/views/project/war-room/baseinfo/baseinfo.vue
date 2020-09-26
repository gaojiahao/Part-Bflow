<template>
    <div style="padding: 5px 10px;overflow: auto;">
         <!-- <p class="base-info-p">{{project.projectName}}</p> -->
      <div>
        <Row>
          <Col span="12">
          项目经理：{{project.projectManagerName}}
          </Col>
          <Col span="12">
          联系方式: {{project.phoneNumber}}
          </Col>
        </Row>
        <Row>
          <Col span="12">
          项目大类: {{project.projectType}}
          </Col>
          <Col span="12">
          项目子类: {{project.projectSubclass}}
          </Col>
        </Row>
        <Row>
          <Col span="12">
          开始日期:{{project.expectStartDate | dateFormatFilter('YYYY-mm-dd')}}
          </Col>
          <Col span="12">
          结束日期: {{project.expectEndDate | dateFormatFilter('YYYY-mm-dd')}}
          </Col>
        </Row>

      </div>
      <Divider />
      <p
        class="base-info-p"
        v-if="project.comment"
      >描述</p>
      <pre
        class="project-comment"
        v-if="project.comment"
      >{{project.comment}}</pre>
      <Divider />
      <div>
        <Table
          :columns="memberColumns"
          :data="projectMember"
        >
          <template
            slot-scope="{ row }"
            slot="percent"
          >
            <span>{{  Math.floor(row.shareOfProfits * 100) + '%' }}</span>
          </template>
          <template
            slot-scope="{ row }"
            slot="divisionOfResponsibilities"
          >
            <Button
              type="error"
              size="small"
              v-if="row.divisionOfResponsibilities==='交付经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <Button
              type="success"
              size="small"
              v-if="row.divisionOfResponsibilities==='方案经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <Button
              type="info"
              size="small"
              v-if="row.divisionOfResponsibilities==='客户经理'"
            >{{row.divisionOfResponsibilities}}</Button>
            <span v-if="row.divisionOfResponsibilities==='项目成员'">{{row.divisionOfResponsibilities}}</span>
          </template>
        </Table>
      </div>
    </div>
</template>

<script>

import {getProject} from "@/services/projectService";
export default {
    name:'projetBaseInfo',
    props:{
    },
    data(){
        return{
          memberColumns: [
            {
            title: "项目合伙人与成员",
            key: "projectPartnerName"
            },
            {
            title: "责任分工",
            key: "divisionOfResponsibilities",
            slot: "divisionOfResponsibilities"
            },
            {
            title: "分成比例",
            key: "shareOfProfits",
            slot: "percent",
            align: "right"
            },
            {
            title: "说明",
            key: "comment"
            }
          ],
          project:{},
          projectMember:[]
        }
    },
    methods:{
        /**
         * 获取项目信息
         */
        getProjectInfo() {
          return getProject(this.$route.params.projectTransCode).then(res => {
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
    mounted() {
      this.getProjectInfo();
    }
}
</script>