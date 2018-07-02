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

export const appListRouter = {
    path: '/appList',
    name: 'appList',
    meta: {
        title: 'appList - 应用列表'
    },
    component: () => import('@/views/appManage/appList.vue'),
    children: [{
        path: 'add',
        name: 'add',
        meta: {
            title: 'add - 添加应用'
        },
        component: () => import('@/views/appManage/appAdd.vue')
    },{
        path: 'appSetting',
        name: 'appSetting',
        meta: {
            title: 'appSetting - 应用设置'
        },
        component: () => import('@/views/appManage/appSetting/appDetails.vue')
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

export const appRouter = [
    {
        path: '/',
        name: 'home_index',
        component: () => import('@/components/home.vue')
    }
]


export const routers = [
    loginRouter,
    flowRouter,
    homepageRouter,
    dashboardRouter,
    appListRouter,
    ...appRouter
];