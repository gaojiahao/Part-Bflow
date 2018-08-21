/**
 * @author xiaoying
 * @description 数据实例状态标签指令
 * @prop status 实例数据值
 * @example  <Tag v-instanceStateDirective="{status:obj.status}"></Tag>
 */
function render (el, bind) {
    switch (bind.value.status) {
        case 1:
            el.style.backgroundColor = bind.value.color ? bind.value.color : 'green';
            el.innerText = "使用中";
            break;
        case 3:
            el.style.backgroundColor = '#FFC107';
            el.innerText = "草稿";
            break;
        case 2:
            el.style.backgroundColor = '#35baf6';
            el.innerText = "未使用";
            break;
        case -1:
            el.style.backgroundColor = '#E91E63';
            el.innerText = "停用";
            break;
    }
}
const instanceStateDirective = {
    componentUpdated: function (el, binding) {
        render(el, binding);
    },
    inserted: function (el, binding) {
        render(el, binding);
    }
}

export default instanceStateDirective;
