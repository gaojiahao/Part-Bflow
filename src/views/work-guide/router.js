export const wrokGuideRouter = {
    path: '/wokdGuide',
    name: 'wokdGuide',
    meta: {
        title: '作业指导'
    },
    redirect: '/wokdGuide/list',
    component: () => import('@/views/work-guide/layout.vue'),
    children: [
        {
            path: 'list',
            name: 'wokdGuideList',
            meta: {
                title: '作业指导列表',
            },
            component: () => import('@/views/work-guide/list/list.vue'),
        },
        {
            path: 'detail/:id',
            name: 'wokdGuideDetail',
            meta: {
                title: '作业指导详情',
            },
            component: () => import('@/views/work-guide/detail/detail.vue'),
        }
    ]
}

