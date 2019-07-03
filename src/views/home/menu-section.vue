<style lang="less" scoped>
    @import "./home.less";
</style>
<template>
     <section class="menu-section" >
        <div v-if="!section.leaf">
            <div class="menu-section-title">{{section.text}}</div>
            <div class="menu-section-list" >
                <div  
                    v-bind:class="[ menu.leaf  ? 'menu-section-list-item' : 'menu-section']" 
                    v-for="menu in section.children" 
                    :key="menu.id">
                    <menu-item 
                        v-if="menu.leaf" 
                        :menu='menu' 
                        :allTaskCount="allTaskCount">
                    </menu-item>
                    <menu-section 
                        :section=menu 
                        v-if="!menu.leaf" 
                        :allTaskCount="allTaskCount">
                    </menu-section>    
                </div>
            </div>
        </div>
    </section>
    
</template>

<script>
import MenuSection from './menu-section';
import MenuItem from './menu-item';
export default {
    name:'MenuSection',
    components:{
        MenuSection,
        MenuItem
    },
    props:{
        section:{
            type:Object,
            default:function () {
                return {};
            }
        },
        allTaskCount:{
            type:Object,
            default:function () {
                return {};
            }
        }
    }
}
</script>

