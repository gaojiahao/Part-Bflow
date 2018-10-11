export const  socialRouter = {
    path: '/social',
    name: 'social',
    meta: {
        title: '社交'
    },
    component: () =>import('@/views/social/layout.vue'),
    children: [
        {
            path: 'message',
            name: 'message',
            meta: {
                title: '消息通知',
            },
            component: () => import('@/views/notifications/notifications.vue')
        },{
            path: 'flowtask',
            name: 'flowtask',
            meta: {
                title: '工作流任务',
            },
            redirect: 'flowtask/todo',
            component: () => import('@/views/social/flowtask/flowtask-layout.vue'),
            children:[
                {
                    path: 'all',
                    name: 'all',
                    meta: {
                        title: '所有任务',
                    }, 
                    component: () => import('@/views/social/flowtask/all/all.vue'),
                },
                {
                    path: 'todo',
                    name: 'todo',
                    meta: {
                        title: '所有待办任务',
                    },
                    component: () => import('@/views/social/flowtask/todo/todo.vue'),
                },
                {
                    path: 'done',
                    name: 'done',
                    meta: {
                        title: '所有已办任务',
                    },
                    component: () => import('@/views/social/flowtask/done/done.vue'),
                },
                {
                    path: 'draftbox',
                    name: 'draftbox',
                    meta: {
                        title: '草稿箱',
                    },
                    component: () => import('@/views/social/flowtask/draftbox/draftbox.vue'),
                },
                {
                    path: 'reports',
                    name: 'reports',
                    meta: {
                        title: '统计报表',
                    },
                    component: () => import('@/views/social/flowtask/reports/reports.vue'),
                }
            ]
        }, {
            path: 'associates',
            name: 'associates',
            meta: {
                title: '同事圈',
            },
            component: () => import('@/views/social/associates/associates-layout.vue')
        }
    ]
}   

