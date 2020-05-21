<template class="positon">
    <div class="login">
        <h2 class="title">追偿统计系统</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input
                    v-model="form.email"
                    size="small"
                    style="width:250px"
                    @keyup.native="keyup"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    v-model="form.password"
                    type="password"
                    size="small"
                    style="width:250px"
                    @keyup.native="keyup"
                ></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
    data() {
        return {
            form: {
                email: Cookie.get("EuserName") || "",
                password: "",
                token: "",
                text: ""
            },
            imgUrl: ""
        };
    },
    mounted() {
        this.compress_html(document.getElementById('app').innerHTML)
    },
    methods: {
        keyup(e) {
            if (e.keyCode == 13) {
                this.onLogin();
            }
        },
        //登录
        onLogin() {
            let isEmpty = this.isEmpty();
            if (!isEmpty) {
                return;
            }
            this.form.email = this.form.email.trim();
            this.form.password = this.form.password.trim();
            // let param = {
            //     username:this.form.email,
            //     password:  this.form.password
            // };
            // API.user_login(param).then( (res) => {
            // this.setCookie(param.username, param.password, 7,res);
            this.$router.push({
                path: "/inf-collection"
            });
            // });
        },
        //非空验证
        isEmpty() {
            if (!this.form.email.trim()) {
                this.Message("请输入用户名");
                return false;
            }
            if (!this.form.password.trim()) {
                this.Message("请输入密码");
                return false;
            }
            return true;
        },
        /**
         * 压缩html : 清除换行符,清除制表符,去掉注释标记
         * @param $string
         * @return压缩后的$string
         * */

        compress_html(str) {
            console.log(str,1111111111111)
            str = str.replace("\r\n", ""); //清除换行符
            str = str.replace("\n",'')
            str = str.replace("\t",'')//清除制表符
            console.log(str)

            // $pattern=array(
            // "/> *([^ ]*) *</",//去掉注释标记
            // "/[\s]+/",
            // "/<!--[^!]*-->/",
            // "/\" /",
            // "/ \"/",
            // "'/\*[^*]*\*/'"  );

            // $replace=array (
            // ">\\1<",
            // " ",
            // "",
            // "\"",
            // "\"",
            // ""
            // );
            // return preg_replace($pattern, $replace, $string);
        },
        Message(message, type) {
            type = type || "warning";
            this.$message({
                message,
                type
            });
        },
        setCookie(c_name, c_pwd, exdays, res) {
            var exdate = new Date(); //获取时间
            exdays = exdays || 7;
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "EuserName" +
                "=" +
                c_name +
                ";path=/;expires=" +
                exdate.toGMTString();
            window.document.cookie =
                "Epassword" +
                "=" +
                c_pwd +
                ";path=/;expires=" +
                exdate.toGMTString();
            Cookie.set("userInfo", JSON.stringify(res));
        }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.fl {
    display: flex;
}

.fl-j-center {
    display: flex;
    justify-content: center;
}

.fl-a-center {
    display: flex;
    align-items: center;
}

.login {
    // position: relative;
    height: 100vh;
    width: 100vw;
    background: url('./../../assets/images/eapp-ops-web-loginbg.jpeg') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
        margin-bottom: 24px;
        color: #fff;
    }

    .el-form {
        width: 460px;
        padding: 30px;
        border: 1px solid #ccc;
        background: #fff;
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        // position: absolute;
        // right: 120px;
        // top: 25vh;
        // margin-top: -295px;
    }

    .codeImg {
        width: 110px;
        height: 40px;
        border: 1px solid #eee;
        border-radius: 3px;
        cursor: pointer;
    }

    .el-flex {
        .el-form-item__content {
            display: flex;
            align-items: center;
        }
    }

    .el-button {
        width: 80%;
        position: relative;
        left: 10%;
    }

    .el-icon-loading {
        position: relative;
        left: -66px;
        font-size: 20px;
    }
}
</style>
