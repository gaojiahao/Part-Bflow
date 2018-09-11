/**
 * @author GuoZheng
 * @description 滚动事件监听
 * @example  <Tag v-scrollDirective="handleScroll"></Tag>
 */

const scrollDirective = {
    bind(el,binding,vnode){
        el.addEventListener('scroll',binding.value);
        el._handleScroll = binding.value;
    },

    unbind(el,binding){
        el.removeEventListener('scroll',el._handleScroll);
        delete el._handleScroll;
    },
}

export default scrollDirective;