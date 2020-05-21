import fetch from '@/utils/fetch';
import { stringify } from 'qs';

//获取省份
export function getProvince() {
    return fetch({
        url: `/get_provice`,
        method: 'get'
    })
}
//模糊搜索医院主名
export function getMasterName(data){
    return fetch({
        url:`/search/master_name?${stringify(data)}`,
        method:'get'
    })
}

//别名转主名
export function ChangeAnother(data){
    return fetch({
        url:'/alias_to_main',
        method:'post',
        data
    })
}
//主名转别名
export function ChangeMain(data){
    return fetch({
        url:'/hci/main/main_to_alias',
        method:'post',
        data
    })
}
//主名转别名审核列表
export function aliasList(){
    return fetch({
        url:'/hci/main/get_main_to_alias_list',
        method:'get',
    })
}
//别名转主名审核列表
export function mainList(){
    return fetch({
        url:'/get_alias_to_main_list',
        method:'get',
    })
}
//主名转别名审核提交
export function updateAlias(data){
    return fetch({
        url:'/hci/main/update_main_to_alias',
        method:'post',
        data
    })
}
//别名转主名审核提交
export function updateMain(data){
    return fetch({
        url:'/update_alias_to_main',
        method:'post',
        data
    })
}