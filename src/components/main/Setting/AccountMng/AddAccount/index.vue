<template>
    <div class="add-account">
        <el-form :model="form" ref="accountForm" :rules="rules" class="form" label-width="100px">
            <el-form-item label="账号：" prop="loginName">
                <el-input size="small" v-model="form.loginName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input size="small" v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
             <el-form-item label="密码：" prop="password">
                <el-input size="small" v-model="form.password" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="role">
                <el-select size="small" v-model="form.role"  placeholder="请选择">
                    <el-option v-for="(role,i) in roleList" :key="i" :label="role.roleName" :value="role.roleId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属城市：" prop="city" >
                <el-select size="small" v-model="form.city" placeholder="请选择" >
                    <el-option v-for="(role,i) in cityList" :key="i" :label="role" :value="role"></el-option>
                </el-select>    
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button size="small" @click="cancel(false)">取消</el-button>
            <el-button size="small" @click="submit('accountForm')">保存</el-button>
        </div>
    </div>
</template>
<script>
import {isMobileOrPhone} from '@/utils/common';
import {AddUserinfo, UpdateUserinfo} from '@/api/user';
import {cityList} from '@/components/commonData';

export default {
    props: {
        addOrEdit: {
            type: String,
            default: 'add'
        },
        info: {
            type: Object,
        }
    },
    data () {
        const validateMobile = (rule, value, callback) => {
            if (!value || isMobileOrPhone(value) === 'mobile') {
                callback();
            } else {
                callback(new Error('请输入正确的手机号'));
            }
        };
        return {
            saving: false,
            cityList,
            form: {
                loginName: null,
                name: null,
                password: null,
                city: null,
                role: null,
            },
            // form:JSON.stringify(this.info),
            rules: {
                loginName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                city: [
                    { required: true, message: '请选择城市', trigger: 'change' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
            },
            roleList: [
                {
                    roleName: '管理员',
                    roleId: "2",
                },{
                    roleName: '市公司',
                    roleId: "3",
                }
            ],
        }
    },
    created () {
        console.log(this.info)
        if(this.info){
            this.form= JSON.parse(JSON.stringify(this.info))
        }
    },
    methods: {
      
        // 保存
        submit (formName) {
            const vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid && !vm.saving) {
                    const params = this.form;
                    vm.saving = true;
                    if (!vm.info) {
                        AddUserinfo(params).then((data)=>{
                            vm.saving = false;
                            if (data) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!',
                                    duration: 5 * 1000
                                })
                                this.cancel(true);
                            }
                        }).catch(()=>{
                            vm.saving = false;
                        })
                    } else {
                        UpdateUserinfo(params).then((data)=>{
                            vm.saving = false;
                            if (data) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!',
                                    duration: 5 * 1000
                                })
                                this.cancel(true);
                            }
                        }).catch(()=>{
                            vm.saving = false;
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        cancel (type) {
            type = type  || false;
            this.$emit('change',type);
        },
        inputNum (field) {
            this.form[field] = this.form[field].replace(/[^\d]/g,'');
        }
    }
}
</script>
<style lang="stylus" scoped>
.add-account
    .form
        width: 300px;
        margin: 0 auto;
        .el-input
            width: 180px;
        .el-textarea
            width: 180px;
    .footer
        text-align: center;
</style>
