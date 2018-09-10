/**
 * @author snack.huang
 * @param value 数值
 * @param num 数字精度
 * @description 数字精度格式化
 */
const numFixedFilter  = (value, num) => {
    var number = Number(value)
    return number.toFixed(num);
}

export default numFixedFilter