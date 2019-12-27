export const getToken = () => {
    let token;
    if (localStorage['roleplay-token']) {
        try {
            token = JSON.parse(localStorage['roleplay-token']).token;
        } catch (e) {
            token = false;
        }
    }
    return token;
}
/**
 * @param  {Date} date 日期
 * @param  {} fmt   
 */
export const FormatDate = (date, fmt) => {
    let o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//解决浮点数*100、10后精度变化，例如：0.56*100 = 56.00000000000001
export const toPercent = (num) => {
    return (num + '00').replace(/\.([\d]{2})/,'$1.') * 1;
}

/**
 * @param  {Date} date 日期
 * @param  {monthNum} Number  前几个月
 * 获取日期之前的几月
 */
export const getPreMonthDay = (date, monthNum) => {
    let year = date.getFullYear(); //获取当前日期的年份
    let month = date.getMonth() + 1; //获取当前日期的月份
    let year2 = year
    let month2 = parseInt(month) - monthNum
    if (month2 <= 0) {
      year2 =
        parseInt(year2) -
        parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
      month2 = 12 - (Math.abs(month2) % 12)
    }
    if (month2 < 10) {
      month2 = '0' + month2
    }
    let t2 = year2 + '-' + month2;
    return t2;
  }

/**
 * @description 获取某月最后一天
 */
export const getLastDay = (year,month) => {   
    let new_year = year;  //取当前的年份   
    let new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）   
    if(month>12)      //如果当前大于12月，则年份转到下一年   
    {   
    new_month -=12;    //月份减   
    new_year++;      //年份增   
    }   
    let new_date = new Date(new_year,new_month,1);        //取当年当月中的第一天   
    return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期   
};

/**
 * @author XiaoYing
 * @param num 数值
 * @description 数字千分位符格式化
 */
export const toThousandFilter  = (num) => {
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
    num < 0 && (t = '-' + t); 

    return t;
}

/**
 * @author XiaoYing
 * @param  cloneObject 克隆对象
 * @description 深度克隆
 */
export const deepClone  = (cloneObject) => {
    if (cloneObject === null || typeof cloneObject !== 'object') return cloneObject;

    let result = cloneObject.constructor();

    for(let key in cloneObject){
        if (cloneObject.hasOwnProperty(key)) {
            if(cloneObject[key] && typeof cloneObject[key] === 'object'){
                result[key] = this.deepClone(cloneObject[key]);
            }else{
                result[key] = cloneObject[key];
            }
        }
    }

    return result;
}

/** 
 * 格式化Json数据
*/
export const ForamtJson = (json, options) => {
    let reg = null,
        formatted = "",
        pad = 0,
        PADDING = "    ";
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket =
        options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
    options.spaceAfterColon =
        options.spaceAfterColon === false ? false : true;
    if (typeof json !== "string") {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, "\r\n$1\r\n");
    reg = /([\[\]])/g;
    json = json.replace(reg, "\r\n$1\r\n");
    reg = /(\,)/g;
    json = json.replace(reg, "$1\r\n");
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, "\r\n");
    reg = /\r\n\,/g;
    json = json.replace(reg, ",");
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ":{");
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ":[");
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ":");
    }
    json.split("\r\n").forEach(function (node, index) {
        //console.log(node);
        let i = 0,
            indent = 0,
            padding = "";

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + "\r\n";
        pad += indent;
    });
    return formatted;
}