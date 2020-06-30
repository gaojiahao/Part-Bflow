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
            title: '项目作战指挥使',
        },
        component: () => import('@/views/project/war-room/war-room')
    },]
}