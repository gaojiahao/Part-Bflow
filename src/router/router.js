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
    path: '/app',
    name: 'app',
    meta:{
        title:'应用'
    },
    redirect:'app/list',
    component:() => import ('@/views/appManage/appManage.vue'),
    children:[{
        path:'list',
        name:'list',
        meta:{
            title:'应用列表'
        },
        component: () => import('@/views/appManage/list.vue'),
    },{
        path:'add',
        name:'add',
        meta:{
            title:'添加应用',
        },
        component: () => import('@/views/appManage/add.vue')
    },{
        path: 'detail/:listId',name: 'detail',
        meta: {
            title: 'detail - 应用详情'
        },
        component: () => import('@/views/appManage/setting/detail.vue')
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

export const sujectformRouter = {
    path:'/subjectform',
    name:'subjectform',
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


export const routers = [
    loginRouter,
    flowRouter,
    homepageRouter,
    dashboardRouter,
    app,
    sujectformRouter,
    ...appRouter
];