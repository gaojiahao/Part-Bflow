export const  projectRouter = {
    path: '/project',
    name: 'project',
    meta: {
        title: '项目'
    },
    redirect: '/project/warRoom',
    component:() =>import('@/views/project/project-layout.vue'),
    children:[{
        path: 'warRoom/:transCode',
        name: 'warRoom',
        meta: {
            title: '项目作战指挥室',
        },
        component: () => import('@/views/project/war-room/war-room'),
        children:[{
            path: 'activity',
            name: 'activity',
            meta: {
                title: '活动区',
            },
            redirect:'activity/comment',
            component: () => import('@/views/project/war-room/activity/activity-layout'),
            children:[{
                path: 'comment',
                name: 'comment',
                meta: {
                    title: '评论',
                },
                component: () => import('@/views/project/war-room/activity/comment')
            },
            {
                path: 'tasklog',
                name: 'tasklog',
                meta: {
                    title: '日志',
                },
                component: () => import('@/views/project/war-room/activity/tasklog')
            },
            {
                path: 'attachment',
                name: 'attachment',
                meta: {
                    title: '附件',
                },
                component: () => import('@/views/project/war-room/activity/attachment')
            },
        ]
        }]
    }]
}