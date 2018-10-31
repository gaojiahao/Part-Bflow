export const  applicationRouter = {
    path: '/application',
    name: 'application',
    meta: {
        title: '应用'
    },
    component: () =>import('@/views/application/layout.vue'),
    children: [
        {
            path: 'detail/:listId',
            name: 'app-detail',
            meta: {
                title: '应用详情',
            },
            component: () => import('@/views/application/detail/detail-layout.vue'),
            children:[
                {
                    path: 'change-log',
                    name: 'change-log',
                    meta: {
                        title: '更新日志',
                    },
                    component: () => import('@/views/application/detail/change-log/change-log.vue'),
                },
                {
                    path: 'analysis',
                    name: 'analysis',
                    meta: {
                        title: '数据分析',
                    },
                    component: () => import('@/views/application/detail/analysis/analysis-layout.vue'),
                },
                {
                    path: 'interaction',
                    name: 'interaction',
                    meta: {
                        title: '互动评论',
                    },
                    component: () => import('@/views/application/detail/interaction/interaction-layout.vue'),
                },
                {
                    path: 'permission',
                    name: 'permission',
                    meta: {
                        title: '资源授权',
                    },
                    component: () => import('@/views/application/detail/permission/permission-layout.vue'),
                },
                {
                    path: 'connection',
                    name: 'connection',
                    meta: {
                        title: '连接',
                    },
                    component: () => import('@/views/application/detail/connection/connection-layout.vue'),
                }
            ]
        },{
            path: 'list',
            name: 'list',
            meta: {
                title: '应用列表',
            },
            component: () => import('@/views/application/list/list.vue')
        }
    ]
}   

