import fetch from '@/utils/fetch';
import { stringify } from 'qs';

// 登录
export function user_login(data) {
    return fetch({
        url: `/user_login`,
        method: 'post',
        data
    })
}
// 获取别名清洗列表
export function get_alias_clean_list(target) {
    return fetch({
        url: `/get_alias_clean_list?target=${target}`,
        method: 'get',
    })
}
// 根据别名获取对应主名医院信息
export function get_main_hosptial_info(data) {
    return fetch({
        url: `/get_main_hosptial_info?id=${data.id}&aliasName=${data.aliasName}`,
        method: 'get',
    })
}
// 获取别名审核列表
export function get_alias_check_list(target) {
    return fetch({
        url: `/get_alias_check_list?target=${target}`,
        method: 'get',
    })
}
// 模糊获取主名信息
export function get_master_name() {
    return fetch({
        url: `/get_master_name`,
        method: 'get',
    })
}
// 别名审核提交
export function update_alias_check(data) {
    return fetch({
        url: `/update_alias_check`,
        method: 'post',
        data
    })
}
// 别名清洗提交
export function update_alias_clean(data) {
    return fetch({
        url: `/update_alias_clean`,
        method: 'post',
        data
    })
}
// 搜索省/市
export function searchLocation(data) {
    return fetch({
        url: `/search/location?level=${data.val}${data.keywords?'&keywords='+data.keywords:''}`,
        method: 'get',
    })
}
// 模糊搜索医院主名
export function searchMaster_name(data) {
    return fetch({
        url: `/search/master_name?keywords=${data.keywords?data.keywords:" "}${data.level?'&level='+data.level:''}${data.province?'&location='+data.province:''}${data.city?'&city='+data.city:''}`,
        method: 'get',
    })
}
// 首页数据统计
export function statistics() {
    return fetch({
        url: `/statistics`,
        method: 'get',
    })
}
// 操作日志
export function historyHandle(data) {
    return fetch({
        url: `/history/handle?name=${data.name}&page_num=${data.page_num}&page_size=${data.page_size}`,
        method: 'get',
    })
}
// 退出登录
export function user_logout() {
    return fetch({
        url: `/user_logout`,
        method: 'get',
    })
}


// 获取主名清洗列表
export function get_main_clean_list() {
    return fetch({
        url: `/hci/main/clean`,
        method: 'get',
    })
}

// 获取主名清洗列表
export function update_main_clean(data) {
    return fetch({
        url: `/hci/main/clean/submit`,
        method: 'post',
        data
    })
}

// 获取审核清洗列表
export function get_main_check_list() {
    return fetch({
        url: `/hci/main/verify`,
        method: 'get',
    })
}

// 主名审核提交接口

export function update_main_check(data) {
    return fetch({
        url: `/hci/main/verify/submit`,
        method: 'post',
        data
    })
}


// 主名审核提交接口

export function isClear_jump(data) {
    return fetch({
        url: `/handle?${stringify(data)}`,
        method: 'get'
    })
}
