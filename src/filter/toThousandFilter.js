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
    l = numone.split("").reverse();
    num < 0 && (l = numone.split("").slice(1,numone.split("").length).reverse()); 
    r = num.split(".")[1];
    r = (r == null ? "" : "." + r);
    t = "";

    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    
    t = t.split("").reverse().join("") + r;
    num < 0 && (t = '-' + t) 

    return t;
}

export default toThousandFilter