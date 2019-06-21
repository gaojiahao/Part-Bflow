export const  checkSheetRouter = {
    path: '/checkSheet',
    name: 'checkSheet',
    meta: {
        title: '点检表'
    },
    redirect: '/checkSheet/list',
    component: () =>import('@/views/performance-standard/layout.vue'),
    children: [{
            path: 'list',
            name: 'checkSheetList',
            meta: {
                title: '点检列表',
            },
            component: () => import('@/views/performance-standard/check-sheet/list.vue')
        },
        {
            path: 'detail/:id',
            name: 'checkSheetDetail',
            meta: {
                title: '点检列表详情',
            },
            component: () => import('@/views/performance-standard/check-sheet/detail.vue')
        },
        {
            path: 'add',
            name: 'checkSheetAdd',
            meta: {
                title: '点检列表详情',
            },
            component: () => import('@/views/performance-standard/check-sheet/detail.vue')
        }
    ]
}   

