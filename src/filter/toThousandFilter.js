/**
 * @author XiaoYing
 * @param num 数值
 * @description 数字千分位符格式化
 */
const toThousandFilter  = (num) => {
    let t,r,l,numone;
    if (typeof num !== 'number') return num;

    num = num + "";
    numone = num.split(".")[0];
    l = num < 0 ? numone.split("").slice(1,numone.split("").length).reverse() : numone.split("").reverse(); 
    r = num.split(".")[1];
    r = (r == null ? "" : "." + r);
    t = "";

    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    
    num < 0 ? t = '-' + t.split("").reverse().join("") + r : t = t.split("").reverse().join("") + r

    return t;
}

export default toThousandFilter