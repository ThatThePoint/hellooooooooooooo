<template>
    <div class="Inf-Collection">
        <p class="title">信息提交</p>
        <el-form :model="form" ref="accountForm" :rules="rules" class="form" label-width="160px">
            <el-form-item label="报案号：" prop="ReportCode">
                <el-input size="small" v-model="form.ReportCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="立案号：" prop="RegisterCode">
                <el-input size="small" v-model="form.RegisterCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车牌号：" prop="Plate">
                <el-input size="small" v-model="form.Plate" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型：" prop="CarType">
                <el-select size="small" v-model="form.CarType" placeholder="请选择">
                    <el-option v-for="(role,i) in CarTypeList" :key="i" :label="role" :value="role"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事故责任：" prop="Duty">
                <el-select size="small" v-model="form.Duty" placeholder="请选择">
                    <el-option v-for="(role,i) in DutyList" :key="i" :label="role" :value="role"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代位类型：" prop="SubrogationType">
                <el-select size="small" v-model="form.SubrogationType" placeholder="请选择">
                    <el-option
                        v-for="(role,i) in SubrogationTypeList"
                        :key="i"
                        :label="role"
                        :value="role"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代位金额（元）：" prop="SubrogationAmount">
                <el-input
                    size="small"
                    v-model="form.SubrogationAmount"
                    type="number"
                    placeholder="请输入"
                ></el-input>
            </el-form-item>
            <el-form-item label="应追偿金额（元）：" prop="ShouldAmount">
                <el-input size="small" v-model="form.ShouldAmount" type="number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="Note">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.Note"></el-input>
            </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span class="juzhong">提交成功</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <div class="footer">
            <el-button size="large" @click="reset('accountForm')">重置</el-button>
            <el-button size="large" type="primary" @click="submit('accountForm')">提交</el-button>
        </div>
    </div>
</template>
<script>
import { isMobileOrPhone } from "@/utils/common";
import { SubmitCauseinfo } from "api/user";
import {
    DutyList,
    CarTypeList,
    SubrogationTypeList,
    cityList
} from "@/components/commonData";
export default {
    props: {
        addOrEdit: {
            type: String,
            default: "add"
        },
        info: {
            type: Object,
            dafault: function() {
                return this.formTemp;
            }
        }
    },
    // computed: {
    //     form () {
    //         return this.info ? this.info : this.formTemp;
    //     }
    // },
    data() {
        const validateMobile = (rule, value, callback) => {
            if (!value || isMobileOrPhone(value) === "mobile") {
                callback();
            } else {
                callback(new Error("请输入正确的手机号"));
            }
        };
        return {
            saving: false,
            centerDialogVisible: false,
            form: {
                ReportCode: null,
                RegisterCode: null,
                Plate: null,
                CarType: null,
                Duty: null,
                saleType: null,
                SubrogationType: null,
                ShouldAmount: null,
                Note: null
            },
            DutyList,
            CarTypeList,
            SubrogationTypeList,
            rules: {
                ReportCode: [
                    { required: true, message: "请输入报案号", trigger: "blur" }
                ],
                RegisterCode: [
                    { required: true, message: "请输入立案号", trigger: "blur" }
                ],
                Plate: [
                    { required: true, message: "请输入车牌号", trigger: "blur" }
                ],
                CarType: [
                    {
                        required: true,
                        message: "请选择车辆类型",
                        trigger: "change"
                    }
                ],
                Duty: [
                    {
                        required: true,
                        message: "请选择事故责任",
                        trigger: "change"
                    }
                ],
                SubrogationType: [
                    {
                        required: true,
                        message: "请选择代位类型",
                        trigger: "change"
                    }
                ],
                SubrogationAmount: [
                    {
                        required: true,
                        message: "请输入代位金额",
                        trigger: "blur"
                    }
                ],
                ShouldAmount: [
                    {
                        required: true,
                        message: "请输入应追偿金额",
                        trigger: "blur"
                    }
                ],
                Note: [
                    {
                        required: false,
                        message: "请选择备注",
                        trigger: "change"
                    }
                ]
            },
            roleList: [],
            typeList: [
                {
                    name: "经理",
                    id: 0
                },
                {
                    name: "线上",
                    id: 1
                },
                {
                    name: "线下",
                    id: 2
                }
            ],
            enterpriseList: [],
            projectList: [],
            productList: []
        };
    },
    created() {},
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        // 重置
        reset(formName) {
            this.$refs[formName].resetFields();
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
        // 企业列表
        getEnterpriseList() {
            // const params = {
            //     page: 1,
            //     pageSize: 999
            // }
            // businessList(params).then((data)=>{
            //     this.enterpriseList = data.content || [];
            // })
        },
        // 企业改变
        changeEnterprise() {
            this.form.projectIdList = [];
            this.form.productIdList = [];
            this.projectList = [];
            this.productList = [];
            this.getProjectList();
        },
        // 项目列表
        getProjectList() {
            // const params = {
            //     drugId: this.form.drugId,
            //     page: 1,
            //     pageSize: 999
            // }
            // projectList(params).then((data)=>{
            //     if (data) {
            //         this.projectList = data.content || [];
            //     }
            // })
        },
        // 项目改变
        changeProject() {
            const projectList = this.form.projectIdList;
            this.form.productIdList = [];
            this.productList = [];
            if (projectList && projectList.length) {
                this.form.projectIdList = projectList;
                this.getProductList();
            }
        },
        // 产品列表
        getProductList() {
            // const params = {
            //     projectIdList: this.form.projectIdList
            // }
            // reqMulPorjectProduct(params).then((data)=>{
            //     this.productList = data || [];
            // })
        },
        // setProductList () {
        //     if (this.info) {
        //         this.productList = [
        //             {
        //                 productId: this.form.productName,
        //                 productName: this.form.productIdList[0]
        //             }
        //         ]
        //     }
        // },
        // 保存
        submit(formName) {
            const vm = this;
           
            this.$refs[formName].validate(valid => {
                if (valid && !vm.saving) {
                    // const params = this.form;
                    vm.saving = true;

                    if (!vm.info) {
                        SubmitCauseinfo(vm.form)
                            .then(data => {
                                if (data.status === 1) {
                                    vm.centerDialogVisible = true;
                                    this.$refs[formName].resetFields();
                                    // this.$message({
                                    //     type: "success",
                                    //     message: "提交成功!",
                                    //     duration: 3000
                                    // });
                                }
                            })
                            .catch(() => {
                                vm.loadingTable = false;
                            });
                    } else {
                        // API.updAccount(params).then((data)=>{
                        //     vm.saving = false;
                        //     if (data) {
                        //         this.$message({
                        //             type: 'success',
                        //             message: '保存成功!',
                        //             duration: 5 * 1000
                        //         })
                        //         this.cancel(true);
                        //     }
                        // }).catch(()=>{
                        //     vm.saving = false;
                        // })
                    }
                } else {
                    return false;
                }
            });
        },
        cancel(type) {
            type = type || false;
            this.$emit("change", type);
        },
        inputNum(field) {
            this.form[field] = this.form[field].replace(/[^\d]/g, "");
        }
    }
};
</script>
<style lang="stylus" scoped>
.juzhong{
    text-align :center;
}
.Inf-Collection {
    .title {
        text-align: left;
        font-size: 20px;
        border-bottom: 1px solid #eee;
    }

    .form {
        width: 600px;

        // .el-input
        // width: 180px;
        .el-textarea {
            width: 180px;
        }
    }

    .footer {
        text-align: center;
    }
}
</style>
