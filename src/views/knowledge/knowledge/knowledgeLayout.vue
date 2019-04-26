<style lang="less" scoped>
.knowledge{
    height: 100%;
    width: 100%;
    &-sider{
        width: 260px;
        float: left;
        height: 100%;
        background-color: #fff;
    }
    &-content{
        width: calc(100% - 260px);
        float: left;
        height: 100%;
        border-top-style: none;
    }
}
</style>
<template>
    <div class="knowledge">
        <div class="knowledge-sider">
            <knowledge-list></knowledge-list>
        </div>
        <div class="knowledge-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import KnowledgeList from './list/list';
export default {
    name:"KnowledgeLayout",
    components:{
        KnowledgeList
    }
}
</script>