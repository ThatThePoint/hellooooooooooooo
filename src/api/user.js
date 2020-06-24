

import fetch from '@/utils/fetch';
import { stringify } from 'qs';

//获取list
export function GetUserList(data) {
    return fetch({
        url: `/Home/GetUserList?${stringify(data)}`,
        method: 'post'
    })
}

// 添加人
export function AddUserinfo(data) {
    return fetch({
        url: `/Home/AddUserinfo?${stringify(data)}`,
        method: 'post'
    })
}

// 更新用户

export function UpdateUserinfo(data) {
    return fetch({
        url: `/Home/UpdateUserinfo?${stringify(data)}`,
        method: 'post'
    })
}

// 删除用户

export function DeleteUserinfo(data) {
    return fetch({
        url: `/Home/DeleteUserinfo?${stringify(data)}`,
        method: 'post'
    })
}
//提交案件


export function SubmitCauseinfo(data) {
    return fetch({
        url: `/Home/SubmitCauseinfo?${stringify(data)}`,
        method: 'post'
    })
}

// 案件列表
export function GetCauseList(data) {
    return fetch({
        url: `/Home/GetCauseList?${stringify(data)}`,
        method: 'post'
    })
}

// 登录


export function Login(data) {
    return fetch({
        url: `/Home/Login?${stringify(data)}`,
        method: 'post'
    })
}

//导出案件
export function GetCauseListExcel(data) {
    return fetch({
        url: `/Home/GetCauseExcel?${stringify(data)}`,
        method: 'post'
    })
}
//下载excel
export function LoadExcel(excelname) {
    return fetch({
        url: `${excelname}`,
        method: 'get'
    })
}

// 删除某条

export function DeleteCause(data) {
    return fetch({
        url: `/Home/DeleteCause?${stringify(data)}`,
        method: 'post',
    })
}
