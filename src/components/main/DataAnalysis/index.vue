<template>
    <div class="account-mng">
        <el-form :model="form" ref="form" inline class="form page-search" label-width="90px">
            <el-form-item label="报案号：" prop="reportCode">
                <el-input size="small" v-model="form.reportCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="立案号：" prop="registerCode">
                <el-input size="small" v-model="form.registerCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车牌号：" prop="plate">
                <el-input size="small" v-model="form.plate" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型：" prop="carType">
                <el-select size="small" v-model="form.carType" placeholder="请选择">
                    <el-option v-for="(item,i) in CarTypeList" :key="i" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城市：" prop="city">
                <el-select size="small" v-model="form.city" placeholder="请选择">
                    <el-option v-for="(item,i) in cityList" :key="i" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事故责任：" prop="duty">
                <el-select size="small" v-model="form.duty" placeholder="请选择">
                    <el-option v-for="(item,i) in DutyList" :key="i" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代位类型：" prop="subrogationType">
                <el-select size="small" v-model="form.subrogationType" placeholder="请选择">
                    <el-option
                        v-for="(item,i) in SubrogationTypeList"
                        :key="i"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <query-reset @query="query" @reset="reset('form')"></query-reset>
        <div class="right">
            <el-button type="primary" @click="exportListToExcel">导出</el-button>
        </div>
        <!-- 列表 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            border
            v-loading="loadingTable"
            class="dr-list"
            style="width:100%"
        >
            <template v-for="(item,index) in headerList">
                <el-table-column
                    :key="index"
                    :label="item.label"
                    :prop="item.name"
                    align="center"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <!-- 账号状态 -->
                        <template v-if="item.name == 'status'">
                            <el-switch
                                v-model="scope.row[item.name]"
                                active-color="#13ce66"
                                @change="changeAccountStatus(scope.row)"
                            ></el-switch>
                        </template>
                        <template v-else-if="item.name == 'saleType'">
                            <span v-if="scope.row[item.name] == 0">经理</span>
                            <span v-else-if="scope.row[item.name] == 1">线上</span>
                            <span v-else-if="scope.row[item.name] == 2">线下</span>
                        </template>
                        <template v-else-if="item.name == 'operate'">
                            <!-- <span class="color-btn edit" @click="editAccount">编辑</span>
                            <span class="color-btn del" @click="delAccount">删除</span>-->
                            <!-- <el-button @click="editAccount(scope.row)" size="mini">编辑</el-button>
                            <el-button @click="resetPwd(scope.row)" size="mini">重置密码</el-button> -->
                            <!-- <el-button @click="delAccount" size="mini" type="danger" plain>删除</el-button> -->
                        </template>
                        <span v-else>{{scope.row[item.name]}}</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <v-pagination
            :pageSize="form.pageSize"
            :page="form.page"
            :total="form.total"
            @change="reload"
        ></v-pagination>
    </div>
</template>
<script>
import QueryReset from "common/QueryReset";
import VPagination from "common/VPagination";
import axios from "axios";
// import * as API from 'api/account';
import { GetCauseList, GetCauseListExcel } from "api/user";
import {
    DutyList,
    CarTypeList,
    SubrogationTypeList,
    cityList
} from "@/components/commonData";

export default {
    components: {
        QueryReset,
        VPagination
    },
    data() {
        return {
            loadingTable: false,

            DutyList,
            CarTypeList,
            SubrogationTypeList,
            cityList,
            form: {
                reportCode: null, //报案号
                registerCode: null, //立案号
                plate: null, //车牌号
                carType: null, //车辆类型
                city: null, // 城市
                duty: null, // 事故责任
                subrogationType: null, //代位类型
                page: 1,
                pageSize: 10,
                listType: 2
            },
            total: 0,
            roleList: [
                {
                    roleName: "省公司",
                    roleId: 2
                },
                {
                    roleName: "市公司",
                    roleId: 3
                }
            ],
            // 地市	报案号	立案号	车牌号		事故责任	代位金额	应追偿金额
            headerList: [
                {
                    label: "唯一id",
                    name: "id",
                    width: "130px"
                },
                {
                    label: "地市",
                    name: "city"
                },
                {
                    label: "报案号",
                    name: "reportCode"
                },
                {
                    label: "立案号",
                    name: "registerCode"
                },
                {
                    label: "车牌号",
                    name: "plate"
                },
                {
                    label: "车辆类型",
                    name: "carType"
                },
                {
                    label: "事故责任",
                    name: "duty"
                },
                {
                    label: "代位类型",
                    name: "subrogationType"
                },
                {
                    label: "代位金额",
                    name: "subrogationAmount"
                },
                {
                    label: "应追偿金额",
                    name: "shouldAmount"
                },
                {
                    label: "提交人",
                    name: "submitPerson"
                },
                {
                    label: "提交时间",
                    name: "submitTime",
                    width: "175px"
                },
            ],
            tableData: [],
            rowInfo: null
        };
    },
    created() {
        this.getRole();
        this.getTable();
    },
    methods: {
        getTable() {
            const vm = this;
            const params = this.form;
            vm.loadingTable = true;
            GetCauseList(params)
                .then(data => {
                    this.tableData = data.causelist || [];
                    this.total = data.total || 0;
                    vm.loadingTable = false;
                })
                .catch(() => {
                    vm.loadingTable = false;
                });
        },
        //导出按钮事件
        exportListToExcel() {
            const vm = this;
            const params = this.form;
            vm.loadingTable = true;
            GetCauseListExcel(params)
                .then(data => {
                    const elink = document.createElement("a");
                    elink.download = '数据分析.xls';
                    elink.style.display = "none";
                    elink.href =process.env.BASE_API + "/" + data.excelUrl ;
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                    vm.loadingTable = false;
                })
                .catch(() => {
                    vm.loadingTable = false;
                });
        },
        // 角色列表
        getRole() {
            // const params = {
            //     page: 1,
            //     pageSize: 999
            // }
            // reqRoleList(params).then((data)=>{
            //     this.roleList = data.content || [];
            // })
        },
        // 查询
        query() {
            this.form.page = 1;
            this.form.total = 0;
            this.getTable();
        },
        // 重置
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        reload(val, tag) {
            const vm = this;
            if (tag == "curPage") {
                this.form.page = val;
            } else if (tag == "size") {
                this.form.pageSize = val;
                this.form.page = 1;
            }
            vm.getTable();
        },
        // 删除
        delAccount() {
            this.$confirm("确定删除此账号吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
        }
        // inputNum (field) {
        //     this.form[field] = this.form[field].replace(/[^\d]/g,'');
        // },
        // replaceSpace (field) {
        //     this.form[field] = this.form[field].replace(/\s+/g,"");
        // }
    }
};
</script>
<style lang="stylus">
.right {
    float: right;
}

.account-mng {
    .form {
        .el-input__inner {
            width: 180px;
        }
    }

    .query-reset {
        float: left;
    }

    .el-table {
        .color-btn {
            user-select: none;
            cursor: pointer;
        }

        .el-button {
            user-select: none;
            margin: 3px 0;
        }
    }

    .btn-box {
        display: inline-block;
        float: right;
        margin-bottom: 20px;
    }
}
</style>

