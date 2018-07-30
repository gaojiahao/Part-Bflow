// import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const flowRouter = {
    path: '/pulse_graph/:caseId',
    name: 'pulse_graph',

    meta: {
        title: 'pulseGraph - 脉动图'
    },
    component: () => import('@/views/flow/pulseGraph.vue')
};

export const dashboardRouter = {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
        title: 'dashboard - 仪表盘'
    },
    component: () => import('@/views/dashboard/dashboard.vue')
};

export const app = {
    path: '/application',
    name: 'application',
    meta: {
        title: '应用'
    },
    redirect: 'application/list',
    component: () => import('@/views/application/application.vue'),
    children: [{
        path: 'list',
        name: 'list',
        meta: {
            title: '应用列表'
        },
        component: () => import('@/views/application/list/list.vue'),
    }, {
        path: 'add',
        name: 'add',
        meta: {
            title: '添加应用',
        },
        component: () => import('@/views/application/add/add.vue')
    }, {
        path: 'detail/:listId', name: 'detail',
        meta: {
            title: 'detail - 应用详情'
        },
        component: () => import('@/views/application/detail/detail.vue')
    }]
};

export const homepageRouter = {
    path: '/homepage',
    name: 'homepage',
    meta: {
        title: 'homepage - 全部应用'
    },
    component: () => import('@/views/home/HomePage.vue')
};

export const addressBook = {
    path: '/addressBook ',
    name: 'addressBook ',
    meta: {
        title: '人员管理'
    },
    redirect: 'addressBook/users',
    component: () => import('@/views/addressBook/index.vue'),
    children: [{
        path: 'users',
        name: 'users',
        meta: {
            title: '用户列表'
        },
        component: () => import('@/views/addressBook/user/users.vue')
        },{
        path: 'detail/:userId',
        name: 'detail',
        meta: {
            title: '用户详情'
        },
        component: () => import('@/views/addressBook/user/detail.vue')
     }]
}

export const sujectformRouter = {
    path: '/subjectform',
    name: 'subjectform',
    meta: {
        title: 'subjectform - 科目分录'
    },
    component: () => import('@/views/form/SubjectForm.vue')
}

export const appRouter = [
    {
        path: '/',
        name: 'home_index',
        component: () => import('@/components/home.vue')
    }
]


export const enterpriseInfo = {
    path: '/enterpriseInfo',
    name: 'enterpriseInfo',
    meta: {
        title: 'enterpriseInfo - 企业信息'
    },
    component: () => import('@/views/enterpriseInfo/enterpriseInfo.vue')
}


export const users = {
    path: '/users',
    name: 'users',
    meta: {
        title: 'users - 用户'
    },
    component: () => import('@/views/addressBook/user/users.vue')
}



export const routers = [
    loginRouter,
    flowRouter,
    homepageRouter,
    dashboardRouter,
    app,
    sujectformRouter,
    enterpriseInfo,
    users,
    ...appRouter,
    addressBook
];