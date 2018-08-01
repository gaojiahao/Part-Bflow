<style lang="less">
@import './detail.less';
</style>

<template>
  <div class="detail">
    <Row class="detail-header">
      <Breadcrumb class="detail-header-bread">
        <BreadcrumbItem to="/addressBook/users">张晓</BreadcrumbItem>
        <BreadcrumbItem>rfd125</BreadcrumbItem>
      </Breadcrumb>
      <Tag class="detail-header-status" color="error">使用中</Tag>
    </Row>
    <Row class="detail-header">
      <Button>返回</Button>
      <div class="detail-header-icon">
        <Icon class="detail-header-icon-back" type="ios-arrow-back" />
        <Icon class="detail-header-icon-forward" type="ios-arrow-forward" />
      </div>
    </Row>
    <div class="detail-tabs">
      <Tabs value="userInfo">
        <TabPane label="用户信息" name="userInfo">
          <user-info></user-info>
        </TabPane>
        <TabPane label="上级用户" name="highUser">
          <higher-user></higher-user>
        </TabPane>
        <TabPane label="下级用户" name="lowUser">
          <lower-user></lower-user>
        </TabPane>
        <TabPane label="部门" name="department">
          <department-member></department-member>
        </TabPane>
        <TabPane label="职位" name="position">
          <role-member></role-member>
        </TabPane>
        <TabPane label="直接权限" name="dirPermission">
          <direct-permission></direct-permission>
        </TabPane>
        <TabPane label="间接权限" name="indirPermission">
          <indirect-permission></indirect-permission>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import UserInfo from './instance/user-info';
import HigherUser from './instance/higher-user';
import LowerUser from './instance/lower-user';
import DepartmentMember from './instance/department';
import RoleMember from './instance/role';
import DirectPermission from './instance/direct-permission';
import IndirectPermission from './instance/indirect-permission';

export default {
  name: "detail",
  components: {
    UserInfo,
    HigherUser,
    LowerUser,
    DepartmentMember,
    RoleMember,
    DirectPermission,
    IndirectPermission
  },
  props: {},
  data() {
    return {
    };
  },
  created() {},
  methods: {
  },
  mounted() {}
};
</script>
