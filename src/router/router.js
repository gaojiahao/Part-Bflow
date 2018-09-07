// import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () =>
    import('@/views/login.vue')
};

export const flowRouter = {
  path: '/pulse_graph/:caseId',
  name: 'pulse_graph',

  meta: {
    title: 'pulseGraph - 脉动图'
  },
  component: () =>
    import('@/views/flow/pulseGraph.vue')
};

export const technologyRouter = {
  path: '/technology_graph/:processRouteCode',
  name: 'technology_graph',

  meta: {
    title: 'technologyGraph - 工艺路线图'
  },
  component: () =>
    import('@/views/flow/technologyGraph.vue')
};

export const dashboardRouter = {
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: 'dashboard - 仪表盘'
  },
  component: () =>
    import('@/views/dashboard/dashboard.vue')
};

export const app = {
  path: '/application',
  name: 'application',
  meta: {
    title: '应用'
  },
  redirect: 'application/list',
  component: () =>
    import('@/views/application/application.vue'),
  children: [{
    path: 'list',
    name: 'list',
    meta: {
      title: '应用列表'
    },
    component: () =>
      import('@/views/application/list/list.vue'),
  }, {
    path: 'add',
    name: 'add',
    meta: {
      title: '添加应用',
    },
    component: () =>
      import('@/views/application/add/add.vue')
  }, {
    path: 'detail/:listId',
    name: 'detail',
    meta: {
      title: 'detail - 应用详情'
    },
    component: () =>
      import('@/views/application/detail/detail.vue')
  }]
};

export const homepageRouter = {
  path: '/homepage',
  name: 'homepage',
  meta: {
    title: 'homepage - 全部应用'
  },
  component: () =>
    import('@/views/home/HomePage.vue')
};

export const addressBook = {
  path: '/addressBook',
  name: 'addressBook',
  meta: {
    title: '通讯录'
  },
  redirect: 'addressBook/user',
  component: () =>
    import('@/views/addressBook/index.vue'),
  children: [
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '用户'
      },
      component: () =>
        import('@/views/addressBook/user/index.vue'),
      children: [{
        path: 'detail/:userId',
        name: 'detail',
        meta: {
          title: '用户详情'
        },
        component: () =>
          import('@/views/addressBook/user/detail/detail.vue')
      }, {
        path: 'board',
        name: 'board',
        meta: {
          title: '用户看板'
        },
        component: () =>
          import('@/views/addressBook/user/board/board.vue')
      }, {
        path: 'add',
        name: 'add',
        meta: {
          title: '新增用户'
        },
        component: () =>
          import('@/views/addressBook/user/detail/detail.vue')
      }]
    },
    {
      path: 'organization',
      name: 'organization',
      meta: {
        title: '组织'
      },
      component: () =>
        import('@/views/addressBook/organization/index.vue'),
      children: [{
        path: 'board',
        name: 'board',
        meta: {
          title: '组织看板'
        },
        component: () =>
          import('@/views/addressBook/organization/board/board.vue')
      }, {
        path: 'detail/:groupId',
        name: 'detail',
        meta: {
          title: '组织详情'
        },
        component: () =>
          import('@/views/addressBook/organization/organization.vue')
      }, {
        path: 'add',
        name: 'add',
        meta: {
          title: '添加组织'
        },
        component: () =>
          import('@/views/addressBook/organization/organization.vue')
      }]

    },
    {
      path: 'job',
      name: 'job',
      meta: {
        title: '职位'
      },
      component: () =>
        import('@/views/addressBook/job/index.vue'),
      children: [{
        path: 'board',
        name: 'board',
        meta: {
          title: '职位看板'
        },
        component: () =>
          import('@/views/addressBook/job/board/board.vue')
      }, {
        path: 'detail/:jobId',
        name: 'detail',
        meta: {
          title: '职位详情'
        },
        component: () =>
          import('@/views/addressBook/job/job.vue')
      }, {
        path: 'add',
        name: 'add',
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
      component: () =>
        import('@/views/addressBook/companyInfo/index.vue'),
      children: [{
        path: 'board',
        name: 'board',
        meta: {
          title: '公司看板'
        },
        component: () =>
          import('@/views/addressBook/companyInfo/board/board.vue')
      }, {
        path: 'baseInfo/:groupId',
        name: 'companyInfo',
        meta: {
          title: '基本信息'
        },
        component: () =>
          import('@/views/addressBook/companyInfo/companyInfo.vue'),
      }, {
        path: 'add',
        name: 'add',
        meta: {
          title: '新增'
        },
        component: () => import('@/views/addressBook/companyInfo/companyInfo.vue')
      }]
    }]
}



export const fieldChangeHistoryRouter = {
  path: '/fieldChangeHistory/:transCode',
  name: 'subjectform',
  meta: {
    title: 'RoleTask - 变更历史'
  },
  component: () =>
    import('@/views/form/field-change-history.vue')
}

export const instanceCommetns = {
  path: '/instcommetns/:transCode',
  name: 'instcommetns',
  meta: {
    title: 'RoleTask - 实例评论'
  },
  component: () =>
    import('@/views/form/instance-comments.vue')
}



export const appRouter = [{
  path: '/',
  name: 'home_index',
  component: () =>
    import('@/components/home.vue')
}]


export const enterpriseInfo = {
  path: '/enterpriseInfo',
  name: 'enterpriseInfo',
  meta: {
    title: 'enterpriseInfo - 企业信息'
  },
  component: () =>
    import('@/views/enterpriseInfo/enterpriseInfo.vue')
}


export const bigProcess = {
  path: '/bigProcess/:orderCode',
  name: 'bigProcess',
  component: () =>
    import('@/components/bigProcess.vue')
}



export const routers = [
  loginRouter,
  flowRouter,
  homepageRouter,
  technologyRouter,
  dashboardRouter,
  bigProcess,
  app,
  addressBook,
  fieldChangeHistoryRouter,
  instanceCommetns,
  enterpriseInfo,
  ...appRouter
];
