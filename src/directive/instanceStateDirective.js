

/**
 * @xiaoying
 * @description 数据实例状态标签指令
 * @prop status 实例数据值
 * @example  <Tag v-instanceStateDirective="obj.status"></Tag>
 */
const instanceStateDirective = {
    componentUpdated: function (el, binding) {
        switch(binding.value){
            case 1:
                el.style.backgroundColor = 'red';
                el.style.color = '#fff';
                el.innerText = "使用中";
                break;
            case 3:
                el.style.backgroundColor = '#ddd';
                el.style.color = '#fff';
                el.innerText = "草稿";
                break;
            case 2:
                el.style.backgroundColor = '#19be6b';
                el.style.color = '#fff';
                el.innerText = "未使用";
                break;
            case 0:
                el.style.backgroundColor = '#f90';
                el.style.color = '#fff';
                el.innerText = "停用";
                break;
        }
      }
};

export default instanceStateDirective;
