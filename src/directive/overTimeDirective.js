/**
 * @author snack.huang
 * @description 已过时间
 * @prop status 实例数据值
 * @example  <Tag v-overTimeDirective="{time:time}"></Tag>
 */
function render(el, bind) {

    var calcTimeDiff = function(startDate, endDate) {

        var diffMillise = endDate.getTime() - startDate.getTime(),//时间差的毫秒数
            diffDays = Math.floor(diffMillise / (24 * 3600 * 1000));//计算出相差天数
        
        var diffMilliseWoDay = diffMillise % (24 * 3600 * 1000),//计算天数后剩余的毫秒数
            diffHours = Math.floor(diffMilliseWoDay / (3600 * 1000));//计算出小时数
        
        var diffMilliseWohour = diffMilliseWoDay % (3600 * 1000),  //计算小时数后剩余的毫秒数
            diffMinutes = Math.floor(diffMilliseWohour / (60 * 1000));//计算相差分钟数

        var diffMilliseWoMinutes = diffMilliseWohour % (60 * 1000),//计算分钟数后剩余的毫秒数
            diffSeconds = Math.round(diffMilliseWoMinutes / 1000);//计算相差秒数

        if (diffDays > 0) {
            if(diffDays >= 10){
                return bind.value.time;
            }
            return diffDays + '天前';
        }

        if (diffHours > 0) {
            return diffHours + '小时' + diffMinutes + '分钟前';
        }

        if (diffMinutes>0){
            return diffMinutes + '分钟' + diffSeconds + '秒前'; 
        }        

    }
    el.innerText = calcTimeDiff(new Date(bind.value.time),new Date());
}



const overTimeDirective = {
    componentUpdated: function (el, binding) {
        render(el, binding);
    },
    inserted: function (el, binding) {
        render(el, binding);
    }
}

export default overTimeDirective;
