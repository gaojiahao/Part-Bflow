export const  knowledgeBaseRouter = {
    path: '/knowledge',
    name: 'knowledge',
    meta: {
        title: '知识库'
    },
    component: () =>import('@/views/knowledge/layout.vue'),
    children: [{
            path: 'list',
            name: 'knowledgeList',
            meta: {
                title: '知识库首页',
            },
            component: () => import('@/views/knowledge/list/list.vue')
        },{
            path: 'detail/:id',
            name: 'knowledgeDetail',
            meta: {
                title: '知识库详情',
            },
            component: () => import('@/views/knowledge/detail/detail.vue')
        },{
            path: 'add',
            name: 'knowledgeAdd',
            meta: {
                title: '知识库新增',
            },
            component: () => import('@/views/knowledge/detail/detail.vue')
        },{
            path: 'view/:id',
            name: 'knowledgeView',
            meta: {
                title: '知识库查看',
            },
            component: () => import('@/views/knowledge/view/view.vue')
        }
    ]
}   

