<template>
    <div class="v-header">
        <h1 class="title">追偿统计系统</h1>
        <div class="r-btns">
        <i class="el-icon-user"></i>
          <span class="icon user">{{userInfo.nickname}}</span>
          <span v-if="userInfo.roleListStr">【{{userInfo.roleListStr}}】</span>
          <span class="icon logout" @click="logout"><i class="el-icon-switch-button"></i>注销</span>
        </div>
    </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return { nickname: "", userId: "", roleList: [],roleListStr:""};
            }
        }
    },
    data() {
        return {
        };
    },
    computed: {
        defaultActive() {
            return this.$route.path || "/";
        }
    },
    mounted() {
    },
    methods: {
        logout(){
            sessionStorage.removeItem('token')
            if(Cookie.get("userInfo")&&JSON.parse(Cookie.get("userInfo"))){
                Cookie.remove("userInfo")
            }
            this.$router.push('/login')
        }
    }
};
</script>

<style lang="stylus" scoped>
.v-header {
    width: 100%;
    height: 60px;
    background: #011e3c;
    color: #fff;
    border-bottom: solid 1px #011e3c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .el-icon-switch-button, .el-icon-user {
        font-size: 17px;
        font-weight: 900;
        margin-right: 8px;
        margin-left: 20px;
    }
}
</style>
