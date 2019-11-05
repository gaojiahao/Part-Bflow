export const addressBookRouter = {
  path: '/addressBook',
  name: 'addressBook',
  meta: {
    title: '通讯录'
  },
  redirect: 'addressBook/user',
  component: () => import('@/views/addressBook/layout.vue'),
  children: [{
    path: 'user',
    name: 'user',
    meta: {
      title: '用户'
    },
    redirect: 'user/board',
    component: () => import('@/views/addressBook/user/index.vue'),
    children: [{
      path: 'detail/:userId',
      name: 'user-detail',
      meta: {
        title: '用户详情'
      },
      component: () =>
        import('@/views/addressBook/user/detail/detail.vue')
    }, {
      path: 'board',
      name: 'user-board',
      meta: {
        title: '用户看板'
      },
      component: () =>
        import('@/views/addressBook/user/board/board.vue')
    }, {
      path: 'add',
      name: 'user-add',
      meta: {
        title: '新增用户'
      },
      component: () => import('@/views/addressBook/user/detail/detail.vue')
    }]
  },
  {
    path: 'organization',
    name: 'organization',
    meta: {
      title: '组织'
    },
    redirect: 'organization/board',
    component: () => import('@/views/addressBook/organization/index.vue'),
    children: [{
      path: 'board',
      name: 'org-board',
      meta: {
        title: '组织看板'
      },
      component: () => import('@/views/addressBook/organization/board/board.vue')
    }, {
      path: 'chart',
      name: 'org-chart',
      meta: {
        title: '组织树图'
      },
      component: () => import('@/views/addressBook/organization/tree-chart/tree-chart.vue')
    }, {
      path: 'detail/:groupId',
      name: 'org-detail',
      meta: {
        title: '组织详情'
      },
      redirect: { name: 'basic' },
      component: () => import('@/views/addressBook/organization/organization.vue'),
      children: [{
        path: 'basic',
        name: 'basic',
        meta: {
          title: '基本信息'
        },
        component: () => import('@/views/addressBook/organization/instance/basic')
      }, {
        path: 'teamProfit',
        name: 'teamProfit',
        meta: {
          title: '组织利润表'
        },
        component: () => import('@/views/addressBook/organization/instance/team-profit')
      }, {
        path: 'higherOrg',
        name: 'higherOrg',
        meta: {
          title: '上级组织'
        },
        component: () => import('@/views/addressBook/organization/instance/higher-organization')
      },
      {
        path: 'lowerOrg',
        name: 'lowerOrg',
        meta: {
          title: '下级组织'
        },
        component: () => import('@/views/addressBook/organization/instance/lower-origanization')
      },
      {
        path: 'principal',
        name: 'principal',
        meta: {
          title: '负责人'
        },
        component: () => import('@/views/addressBook/organization/instance/principal')
      }, {
        path: 'memberinfo',
        name: 'memberinfo',
        meta: {
          title: '成员'
        },
        component: () => import('@/views/addressBook/organization/instance/member-info')
      }, {
        path: 'permission',
        name: 'permission',
        meta: {
          title: '权限'
        },
        component: () => import('@/views/addressBook/user/detail/instance/direct-permission')
      }]
    }, {
      path: 'orgLayout',
      name: 'orgLayout',
      meta: {
        title: '组织'
      },
      component: () => import('@/views/addressBook/organization/organization.vue'),
      children: [{
        name: 'create',
        path: 'create',
        meta: {
          title: '新建'
        },
        component: () => import('@/views/addressBook/organization/instance/basic')
      }]
    }]

  },
  {
    path: 'job',
    name: 'job',
    meta: {
      title: '职位'
    },
    redirect: 'job/board',
    component: () =>
      import('@/views/addressBook/job/index.vue'),
    children: [{
      path: 'board',
      name: 'job-board',
      meta: {
        title: '职位看板'
      },
      component: () =>
        import('@/views/addressBook/job/board/board.vue')
    }, {
      path: 'detail/:jobId',
      name: 'job-detail',
      meta: {
        title: '职位详情'
      },
      component: () =>
        import('@/views/addressBook/job/job.vue')
    }, {
      path: 'add',
      name: 'job-add',
      meta: {
        title: '添加职位'
      },
      component: () =>
        import('@/views/addressBook/job/job.vue')
    }]
  },
  {
    path: 'companyInfo',
    name: 'companyInfo',
    meta: {
      title: '公司'
    },
    redirect: 'companyInfo/board',
    component: () =>
      import('@/views/addressBook/companyInfo/index.vue'),
    children: [{
      path: 'board',
      name: 'company-board',
      meta: {
        title: '公司看板'
      },
      component: () =>
        import('@/views/addressBook/companyInfo/board/board.vue')
    }, {
      path: 'baseInfo/:groupId',
      name: 'companyInfo-detail',
      meta: {
        title: '基本信息'
      },
      component: () =>
        import('@/views/addressBook/companyInfo/companyInfo.vue'),
    }, {
      path: 'add',
      name: 'company-add',
      meta: {
        title: '新增'
      },
      component: () =>
        import('@/views/addressBook/companyInfo/companyInfo.vue')
    }]
  }
  ]
}
