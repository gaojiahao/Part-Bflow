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

export const entryRouter = {
  path: '/',
  name: 'entry',
  redirect: '/login'
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


export const homepageRouter = {
  path: '/homepage',
  name: 'homepage',
  meta: {
    title: 'homepage - 首页导航'
  },
  component: () =>
    import('@/views/home/home.vue')
};


export const home = {
  path: '/home',
  name: 'home',
  meta: {
    title: 'home - 首页导航'
  },
  component: () =>
    import('@/views/home/home.vue')
};




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

export const taskLog = {
  path: '/taskLog/:transCode',
  name: 'taskLog',
  meta: {
    title: 'RoleTask - 任务日志'
  },
  component: () =>
    import('@/views/form/modules/task-log.vue')
}



export const appRouter = [{
  path: '/home_index',
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
    import('@/views/end-to-end/bigProcess.vue')
}

//用户激活页面
export const activation = {
  path: '/activation',
  name: 'activation',
  component: () =>
    import('@/views/activation/activation.vue')
}
export const dictionaryManage = {
  path: '/dictionaryManage/:dicId',
  name: 'dictionaryManage',
  component: () =>
    import('@/views/dictionaryManage/dictionaryManage.vue')
}


//应用模块
import { applicationRouter} from '@/views/application/router';
//通讯录模块
import { addressBookRouter } from  '@/views/addressBook/router';
//社交模块
import { socialRouter} from '@/views/social/router';
//作业标准模块
import { checkSheetRouter } from '@/views/performance-standard/router';
//知识库模块
import { knowledgeBaseRouter } from '@/views/knowledge/router';

//作业指导模块
import { wrokGuideRouter } from '@/views/work-guide/router';

//文件柜
import { fileCabinetRouter } from '@/views/file-cabinet/router';

export const routers = [
  loginRouter,
  entryRouter,
  flowRouter,
  home,
  homepageRouter,
  addressBookRouter,
  technologyRouter,
  bigProcess,
  fieldChangeHistoryRouter,
  taskLog,
  instanceCommetns,
  enterpriseInfo,
  activation,
  dictionaryManage,
  socialRouter,
  applicationRouter,
  checkSheetRouter,
  knowledgeBaseRouter,
  wrokGuideRouter,
  fileCabinetRouter,
  ...appRouter
];
