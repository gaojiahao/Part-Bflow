export const fileCabinetRouter = {
    path: '/fileCabinet',
    name: 'fileCabinet',
    meta: {
        title: '文件柜'
    },
    redirect: '/fileCabinet/list',
    component: () => import('@/views/file-cabinet/layout.vue'),
    children: [
        {
            path: 'list',
            name: 'fileCabinetList',
            meta: {
                title: '文件柜分区',
            },
            component: () => import('@/views/file-cabinet/list/list.vue'),
        },
        {
            path: 'detail/:id',
            name: 'fileCabinetDetail',
            meta: {
                title: '文件柜分区详情',
            },
            component: () => import('@/views/file-cabinet/detail/detail.vue'),
        },
        {
            path: 'test',
            name: 'test',
            meta: {
                title: 'test',
            },
            component: () => import('@/views/file-cabinet/test.vue'),
        }
    ]
}

