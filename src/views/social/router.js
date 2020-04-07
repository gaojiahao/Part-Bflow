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
            component: () => import('@/views/social/message/message-layout.vue'),
            children:[
                {
                    path: 'list/:listId',
                    name: 'list',
                    meta: {
                        title: '应用消息',
                    },
                    component: () => import('@/views/social/message/content/content.vue'),
                    // children:[
                    //     {
                    //         path:'history',
                    //         name:'history',
                    //         meta:{
                    //             title:'历史纪录'
                    //         },
                    //         redirect: 'history/files',
                    //         component: () => import('@/views/social/message/content/messageistory.vue'),
                    //         children: [
                    //             {
                    //                 path: 'files',
                    //                 name: 'files',
                    //                 meta: {
                    //                     title: '附件'
                    //                 },
                    //                 component: () => import('@/views/social/message/content/history/files.vue'),
                    //             },
                    //             {
                    //                 path: 'images',
                    //                 name: 'images',
                    //                 meta: {
                    //                     title: '图片'
                    //                 },
                    //                 component: () => import('@/views/social/message/content/history/images.vue'),
                    //             }
                    //         ]
                    //     }
                    // ]
                },{
                    path: 'group/:groupId',
                    name:'group',
                    meta:{
                        title:'即时通讯'
                    },
                    component: () => import('@/views/social/message/content/content.vue'),
                    children:[
                        {
                            path:'member',
                            name:'member',
                            meta:{
                                title:'群成员'
                            },
                            component:() => import('@/views/social/message/content/groupMember.vue'),
                        },
                        {
                            path:'history',
                            name:'history',
                            redirect: 'history/all',
                            component: () => import('@/views/social/message/content/history/history-layout.vue'),
                            children: [
                                {
                                    path: 'all',
                                    name: 'all',
                                    meta: {
                                        title: '全部'
                                    },
                                    component: () => import('@/views/social/message/content/history/all-message.vue'),
                                },
                                {
                                    path: 'files',
                                    name: 'files',
                                    meta: {
                                        title: '附件'
                                    },
                                    component: () => import('@/views/social/message/content/history/files.vue'),
                                },
                                {
                                    path: 'images',
                                    name: 'images',
                                    meta: {
                                        title: '图片'
                                    },
                                    component: () => import('@/views/social/message/content/history/images.vue'),
                                }
                            ]
                        }
                    ]
                }
            ]
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
                    path: 'allFlowtask',
                    name: 'allFlowtask',
                    meta: {
                        title: '所有工作流任务',
                    }, 
                    component: () => import('@/views/social/flowtask/all-flowtask/all-flowtask.vue'),
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

