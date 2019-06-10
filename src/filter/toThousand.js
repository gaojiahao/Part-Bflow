/**
 * @author XiaoYing
 * @param num 数值
 * @description 数字千分位符格式化
 */
const toThousandFilter  = (num) => {
    let t,r,l;
    if (typeof num !== 'number') return num;

    num = parseFloat((num + "").replace(/[^\d\.-]/g, ""))+ "";
    l = num.split(".")[0].split("").reverse(), r = num.split(".")[1];
    r = (r == null ? "" : "." + r);
    t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + r;
}

export default toThousandFilter