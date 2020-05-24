<template>
    <div class="v-menu">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <!-- 导航菜单 -->
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened router >
            <template v-for="(item,i) in menu">
                <el-menu-item v-if="item.index=='/home'" :index="item.index" :key="i">
                    <template>
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                </el-menu-item>
                <!-- 下拉菜单 -->
                <template v-else-if="item.subs">
                    <el-submenu :index="item.index" :key="i">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <!-- <el-menu-item-group> -->
                            <!-- <span slot="title">分组一</span> -->
                            <el-menu-item v-for="(sub,j) in item.subs" :index="sub.index" :key="j">{{sub.title}}</el-menu-item>
                        <!-- </el-menu-item-group> -->
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="i">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
    props: {
        menuList : {
            type : Array,
            default : ()=>{
                return {}
            }
        }
    },
    data() {
        return {
            menu: [],
        };
    },
    computed: {
        defaultActive(){
            return this.$route.path || '/';
        }
    },
    mounted () {
        this.getSideTitle()

       
    },
    methods: {
        getSideTitle(){  
            const userInfo = JSON.parse(Cookie.get("userInfo"))
            //  console.log(JSON.parse(Cookie.get("userInfo")))        
            let titleList = [
                {
                    icon: 'el-icon-s-home',
                    index: '/inf-collection',
                    title: '首页',
                    display: true
                },
                {
                    icon: 'el-icon-search',
                    index: "/data-analysis",
                    title: "运营",
                    display: true,
                },
                {
                    icon: 'el-icon-setting',
                    index: "/account-mng",
                    title: "账号管理",
                    display: true,
                }
            ];
            if(userInfo && userInfo.currentMember&&userInfo.currentMember.memberType){
                if(userInfo.currentMember.memberType==3){
                    titleList=[ {
                        icon: 'el-icon-s-home',
                        index: '/inf-collection',
                        title: '首页',
                        display: true
                    },]
                }
            }else{
                titleList=[]
            }
            this.menu=titleList;
        }
    }
}
</script>

<style lang="stylus">
.v-menu
    height: 100%;
    user-select: none;
    .el-menu-vertical-demo:not(.el-menu--collapse)
        width: 200px;
        height: 100%;
    .el-menu-item
        &.is-active
            background: #ecf5ff
</style>
