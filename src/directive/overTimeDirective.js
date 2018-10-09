/**
 * @author snack.huang
 * @description 时间区间
 * @param startTime 开始时间  必须
 * @param endTime 截至时间 可有可没有，默认为当前时间
 * @param describe 描述字符 可有可没有 描述信息
 * @example  <Tag v-overTimeDirective="{startTime:startTime [endTime:endTime][describe:describe]}"></Tag>
 */
function render(el, bind) {

    var calcTimeDiff = function(startDate, endDate) {

        let diffMillise, 
            diffDays, 
            diffMilliseWoDay, 
            diffHours, 
            diffMilliseWohour,
            diffMinutes,
            diffMilliseWoMinutes, 
            diffSeconds;

        diffMillise = endDate.getTime() - startDate.getTime();//时间差的毫秒数
        diffDays = Math.floor(diffMillise / (24 * 3600 * 1000));//计算出相差天数
        
        diffMilliseWoDay = diffMillise % (24 * 3600 * 1000);//计算天数后剩余的毫秒数
         diffHours = Math.floor(diffMilliseWoDay / (3600 * 1000));//计算出小时数
        
        diffMilliseWohour = diffMilliseWoDay % (3600 * 1000);  //计算小时数后剩余的毫秒数
        diffMinutes = Math.floor(diffMilliseWohour / (60 * 1000));//计算相差分钟数

        diffMilliseWoMinutes = diffMilliseWohour % (60 * 1000);//计算分钟数后剩余的毫秒数
        diffSeconds = Math.round(diffMilliseWoMinutes / 1000);//计算相差秒数

        if (diffDays > 0) {
            if(diffDays >= 10){
                return bind.value.startTime ; 
            }
            return diffDays + '天' + describe; 
        }
        if (diffHours > 0) {
            return diffHours + '小时' + diffMinutes + '分钟' + describe; 
        }
        if (diffMinutes>0){
            return diffMinutes + '分钟' + diffSeconds + '秒' + describe;  
        } 
        return diffSeconds + '秒' + describe; 
    }

    let startTime = bind.value.startTime,
        endTime = bind.value.endTime ? bind.value.endTime : new Date(),
        describe = bind.value.describe ? bind.value.describe: '';

    if (typeof (startTime) === 'number'){
        startTime = new Date(parseInt(startTime) * 1000);
    } else if (typeof (startTime) === 'string'){
        startTime = new Date(Date.parse(bind.value.startTime.replace(/-/g, "/")));

    }

    if (typeof (endTime) === 'number') {
        endTime = new Date(parseInt(endTime) * 1000);
    } else if (typeof (endTime) === 'string') {
        endTime = new Date(Date.parse(bind.value.endTime.replace(/-/g, "/")));
    }
   
    el.innerText = calcTimeDiff(startTime, endTime);
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
