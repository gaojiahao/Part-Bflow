export const getToken = () => {
    let token;
    if (localStorage['roleplay-token']) {
        try {
            token = JSON.parse(localStorage['roleplay-token']).token;
        } catch (e) {
            token = false;
        }
    }
    return "8OqhBMogi6ogOLNVyD1w/IU6SeQFr4mEBN1G+41bN+AJoDaAK1Xy9BfPfXWZJFPVD+wvJFtm+VdVRjf/tBRuRgvJX0+Y2Yd+brq0iv0gG/WMMbYlzUq5wsYjUUESAM1AAaxX5T918U0=";
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