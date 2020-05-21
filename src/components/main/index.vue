<template>
    <div class="main">
        <el-container>
            <el-header>
                <v-header :userInfo="userInfo"></v-header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <v-menu v-if="menuList.length" :menuList="menuList"></v-menu>
                </el-aside>
                <el-main>
                    <router-view ></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>

import VHeader from 'common/VHeader';
import VMenu from 'common/VMenu';
import Cookie from 'js-cookie';
export default {
    name: 'Main',
    components: {
        VHeader,
        VMenu
    },
    data () {
        return {
            menuList:[],
            userInfo:{
                nickname:"",
                userId:"",
                roleList:[],
                roleListStr:""
            }
        }
    },
    mounted () {
        //获取用户信息
        // this.getUserInfo();
        let data = {
            menuList:['/home',"/projectTitle-mng","/enterprise-mng", "/project-mng","/product-mng","/hospitalTitle-mng", "/hospital-mng", "/department-mng","/dr-mng","/setting", "/account-mng","/role-mng","/sys-logs"],
            nickname: Cookie.get('EuserName') || '',
            userId:11893346,
            roleList:["产品管理员", "管理员"],
            permissionList: ["project:project", "product:list", "user:list", "index:index", "hcp:list", "system:system", "syslog:list", "project:list", "subject:list", "role:list", "hci:hci", "enterprise:list", "hci:list"]
        };
        
        this.userInfo = Cookie.get('userInfo')?JSON.parse(Cookie.get('userInfo')) :      {
            nickname: data.nickname,
            userId: data.userId,
            roleList: data.roleList
        };
      
        this.menuList = data.menuList;
    },
    methods: {
        // getUserInfo(){
        //     API.getInfo().then( res => {
        //         let data = res&&res.userPermission;
        //         if(data&&data.menuList){
        //             this.menuList=data.menuList;
        //             this.userInfo.nickname=data.nickname;
        //             this.userInfo.userId=data.userId;
        //             this.userInfo.roleList=data.roleList;
        //             this.userInfo.roleListStr = data.roleList.join("·");

        //             sessionStorage.setItem('nickname',this.userInfo.nickname)
        //         }else{
        //             this.$router.push('/login')
        //         }
        //     }).catch(()=>{
        //         this.$router.push("/")
        //     });
        // }
    }
}
</script>
<style lang="stylus">
.main
    width: 100%;
    height: 100%;
    .el-header
        padding: 0;
    .el-container
        width: 100%;
        height: 100%;
</style>
