<template>
    <div class="account-mng">
        <el-form :model="form" ref="form" inline class="form page-search" label-width="90px">
             <el-form-item label="账号：" prop="loginName">
                <el-input size="small" v-model.trim="form.loginName" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input size="small" v-model.trim="form.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="role">
                <el-select size="small" v-model="form.role" clearable placeholder="请选择">
                    <el-option v-for="(role,i) in roleList" :key="i" :label="role.roleName" :value="role.roleId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属城市：" prop="city">
                <el-select size="small" v-model="form.city"  clearable placeholder="请选择">
                    <el-option v-for="(item,i) in cityList" :key="i" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <query-reset @query="query" @reset="reset('form')"></query-reset>
        <div class="btn-box">
            <el-button size="small" @click="addAccount">添加账号</el-button>
        </div>
        <!-- 列表 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            border
            v-loading="loadingTable"
            class="dr-list"
            style="width:100%">
            <template v-for="(item,index) in headerList">
                <el-table-column
                    :key="index"
                    :label="item.label"
                    :prop="item.name"
                    align="center"
                    :width="item.width">
                    <template slot-scope="scope">
                        <!-- 账号状态 -->
                        <template v-if="item.name=='No'" >
                            <span>{{(form.page - 1) * form.pageSize + scope.$index + 1}}</span>
                        </template>
                        <template v-if="item.name == 'status'">
                            <el-switch v-model="scope.row[item.name]" active-color="#13ce66" @change="changeAccountStatus(scope.row)"></el-switch>
                        </template>
                        <template v-else-if="item.name == 'role'">
                            <span v-if="scope.row[item.name] == 2">管理员</span>
                            <span v-else-if="scope.row[item.name] == 3">市公司</span>
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <!-- <span class="color-btn edit" @click="editAccount">编辑</span>
                            <span class="color-btn del" @click="delAccount">删除</span> -->
                            <el-button @click="editAccount(scope.row)" size="mini">编辑</el-button>
                            <el-button @click="delAccount(scope.row)" size="mini">删除</el-button>
                            <!-- <el-button @click="delAccount" size="mini" type="danger" plain>删除</el-button> -->
                        </template>
                        <span v-else>{{scope.row[item.name]}}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <v-pagination :pageSize="form.pageSize" :page="form.page" :total="form.total" @change="reload"></v-pagination>

        <!-- 添加账号 -->
        <el-dialog v-if="addVisible || editVisible" :visible="addVisible || editVisible" :title="dialogTitle" :before-close="close">
            <add-account :addOrEdit="addOrEdit" :info="rowInfo" @change="close"></add-account>
        </el-dialog>
    </div>
</template>
<script>
import QueryReset from 'common/QueryReset';
import VPagination from 'common/VPagination';
import AddAccount from './AddAccount';
import { GetUserList, DeleteUserinfo }  from 'api/user';
import {DutyList,CarTypeList,SubrogationTypeList,cityList} from '@/components/commonData';

// import {reqRoleList} from 'api/role';
export default {
    components: {
        QueryReset,
        VPagination,
        AddAccount
    },
    data () {
        return {
            loadingTable: false,
            addVisible: false,
            editVisible: false,
            dialogTitle: '添加账号',
            addOrEdit: 'add',
            DutyList,CarTypeList,SubrogationTypeList,cityList,
            form: {
                name: null,
                loginName: null,
                role: null,
                saleType: null,
                city: null,
                page: 1,
                pageSize: 10,
                total: 0
            },
            roleList: [
                {
                    roleName: '管理员',
                    roleId: 2,
                },{
                    roleName: '市公司',
                    roleId: 3,
                }
            ],
            accountStatusList: [
                {
                    name: '全部',
                    id: null
                },
                {
                    name: '开启',
                    id: 1
                },
                {
                    name: '关闭',
                    id: 0
                }
            ],
            headerList: [
                {
                    label: '序号',
                    name: 'No',
                    width:"130px"
                },
                {
                    label: '账号',
                    name: 'loginName'
                },
                {
                    label: '姓名',
                    name: 'name'
                },
                {
                    label: '角色',
                    name: 'role'
                },
                {
                    label: '归属城市',
                    name: 'city'
                },
                // {
                //     label: '更新人',
                //     name: 'modifier'
                // },
                {
                    label: '更新时间',
                    name: 'createTime',
                    width:"175px"
                },
                {
                    label: '密码',
                    name: 'password'
                },
                {
                    label: '操作',
                    name: 'operate',
                    width:"200px"
                }
            ],
            tableData: [],
            rowInfo: null
        }
    },
    created () {
        this.getRole();
        this.getTable();
    },
    methods: {
        getTable () {
            const vm = this;
            const params = this.form;
            vm.loadingTable = true;
            GetUserList(params).then((data)=>{
                this.tableData = data.list || [];
                this.form.total = data.total || 0;
                this.loadingTable = false;
            }).catch(()=>{
                vm.loadingTable = false;
            })
        },
        // 角色列表
        getRole () {
            // const params = {
            //     page: 1,
            //     pageSize: 999
            // }
            // reqRoleList(params).then((data)=>{
            //     this.roleList = data.content || [];
            // })
        },
        // 查询
        query () {
            this.form.page = 1;
            this.form.total = 0;
            this.getTable();
        },
        // 重置
        reset () {
            this.$refs['form'].resetFields();
        },
        reload (val,tag) {
            const vm = this;
            if(tag == 'curPage'){
                this.form.page = val;
            }else if(tag == 'size'){
                this.form.pageSize = val;
                this.form.page = 1;
            }
            vm.getTable();
        },
        // 新增
        addAccount () {
            this.dialogTitle = '添加账号';
            this.addOrEdit = 'add';
            this.addVisible = true;
        },
        close (isRefresh) {
            this.rowInfo = null;
            this.addVisible = this.editVisible = false;
            if(!isRefresh || typeof(isRefresh) == "function"){return false}
            this.getTable();
        },
        // // 状态改变
        // changeAccountStatus (info) {
        //     API.updAccountStatus(info.drugUserId,info.status).then((data)=>{
        //         if (data) {
        //             this.$message({
        //                 type: 'success',
        //                 message: '操作成功!',
        //                 duration: 5 * 1000
        //             })
        //         }
        //     })
        // },
        // 编辑
        editAccount (info) {
            this.dialogTitle = '编辑账号';
            this.addOrEdit = 'edit';
            this.rowInfo = info;
            this.editVisible = true;
        },
        // 重置密码
        // resetPwd (info) {
        //     this.$confirm('确定重置此账号密码吗?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         API.resetPwd(info.drugUserId).then((data)=>{
        //             if (data) {
        //                 this.$message({
        //                     type: 'success',
        //                     message: '操作成功!'
        //                 });
        //             }
        //         })
        //     })
        // },
        // 删除
        delAccount (row) {
            this.$confirm('确定删除此账号吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DeleteUserinfo({id: row.id}).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getTable();
                }).catch(()=>{
                    this.$message({
                        type: 'waring',
                        message: '删除失败，请稍后再试'
                    });
                })

            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        },
    }
}
</script>
<style lang="stylus">
.account-mng
    .form
        .el-input__inner
            width: 180px;
    .query-reset
        float: left;
    .el-table
        .color-btn
            user-select: none;
            cursor: pointer;
        .el-button
            user-select: none;
            margin: 3px 0;
    .btn-box
        display: inline-block;
        float: right;
        margin-bottom: 20px;
</style>

