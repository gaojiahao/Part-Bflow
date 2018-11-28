export const  knowledgeBaseRouter = {
    path: '/knowledgeBase',
    name: 'knowledgeBase',
    meta: {
        title: '知识库'
    },
    component: () =>import('@/views/knowledge-base/layout.vue'),
    children: [{
            path: 'list',
            name: 'knowledgeBaseList',
            meta: {
                title: '知识库首页',
            },
            component: () => import('@/views/knowledge-base/knowledge-base/list.vue')
        }
    ]
}   

