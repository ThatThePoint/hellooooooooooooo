import Cookie from 'js-cookie';
export function regTel(tel) {
    // 手机或固定电话
    const mobile = /^1[0-9]{10}$/,
        phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
}
// 是手机还是座机
export function isMobileOrPhone(tel) {
    //手机或固定电话
    const mobile = /^1[0-9]{10}$/,
        phone = /^0\d{2,3}-?\d{7,8}$/;
    if (mobile.test(tel)) {
        return 'mobile';
    } else if (phone.test(tel)) {
        return 'phone';
    } else {
        return false
    }
}

// 下载文件
export function downloadFile(api, obj) {
    let url = process.env.BASE_API + api;
    let arr = [];
    let str = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            arr.push(key + '=' + (val || ''));
        }
    }
    str = arr.join('&');
    window.open(url + '?' + str, '_blank');
}

export function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 距离n天的日期,整数n天后，负数n天前
export function getNDayDate(n) {
    const date = new Date();
    const time = date.getTime();
    const nDayTime = time + (60 * 60 * 24 * (n || 0) * 1000);
    const nDayDate = new Date(nDayTime);
    const y = nDayDate.getFullYear();
    const m = nDayDate.getMonth() + 1;
    const d = nDayDate.getDate();
    const mm = m < 10 ? '0' + m : m;
    const dd = d < 10 ? '0' + d : d;
    return y + '-' + mm + '-' + dd;
}

// 获取对象数组元素某属性Array
export function getListItemAttrArr(list, attr) {
    let arr = []
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item[attr]) {
            arr.push(item[attr])
        }
    }
    return arr;
}

//设置cookie
export function setCookie(c_name, c_pwd, c_token, exdays) {
    var exdate = new Date(); //获取时间
    exdays = exdays || 7;
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie = "token" + "=" + c_token + ";path=/;expires=" + exdate.toGMTString();
}
//读取cookie
export function getCookie() {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
                this.loginForm.dmpUserName = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'password') {
                this.loginForm.dmpPassword = arr2[1];
            }
        }
    }
}
//清除cookie
export function clearCookie() {
    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
}
// 退出
export function logoutAccount() {
    Cookie.remove('Etoken');
    Cookie.remove('Epassword');
    Cookie.remove('EuserName');
}
// 深拷贝
export function deepClone(obj) {
    if (typeof obj !== "object") return;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "object" && obj[key] != null ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}

export function getHciLevel() {
    let arrHciLevel = [
        { id: null, value: '不限' },
        { id: "1", value: '一级' },
        { id: "2", value: '一级甲等' },
        { id: "3", value: '一级乙等' },
        { id: "4", value: '一级丙等' },
        { id: "5", value: '一级特等' },
        { id: "6", value: '二级' },
        { id: "7", value: '二级甲等' },
        { id: "8", value: '二级乙等' },
        { id: "9", value: '三级' },
        { id: "10", value: '三级甲等' },
        { id: "11", value: '三级乙等' },
        { id: "12", value: '三级丙等' },
        { id: "13", value: '特级医院' },
        { id: "14", value: '民营医院' },
        { id: "15", value: '未知' },
        { id: "16", value: '二级丙等' }
    ];
    return arrHciLevel;
}
