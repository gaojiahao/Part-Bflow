<template>
    <div class="active-layout">
        <Menu mode="horizontal" theme="light" :active-name="$route.name">
            <router-link :to="{ name:'comment'}">
                <MenuItem name="comment">
                评论
                </MenuItem>
            </router-link>
            <router-link :to="{ name:'tasklog'}">
                <MenuItem name="tasklog">
                日志
                </MenuItem>
            </router-link>
            <router-link :to="{ name:'attachment'}">
                <MenuItem name="attachment">
                附件
                </MenuItem>
            </router-link>
        </Menu>
        <div class="active-layout-content">
            <router-view :uploadParams="uploadParams" :allowAddLog="allowAddLog">
            </router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'activityLayout',
    props:{
        uploadParams:{
            type:Object,
            default(){
                return {}
            }
        },
        allowAddLog:{
            type:Boolean,
            default(){
                return true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.active-layout{
    height: 100%;
    width: 100%;
    border-top: 1px solid #cecece;
    /deep/ .ivu-menu-horizontal{
        height: 54px;
        line-height: 54px;
        font-weight: bold;
        display: flex;
    }
    &-content{
        height: calc(100% - 55px);
        overflow: auto;
    }
    /deep/ .router-link-active{
        background-color: white;
    }
}
</style>