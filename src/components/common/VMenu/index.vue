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
            let titleList = [
                {
                    icon: 'el-icon-s-home',
                    index: '/inf-collection',
                    title: '首页',
                    display: true
                },
                // {
                //     icon: 'el-icon-s-management',
                //     index: "/projectTitle-mng",
                //     title: "清洗",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/enterprise-mng",
                //             title: "· 人工清洗主名",
                //             display: true
                //         },
                //         {
                //             index: "/project-mng",
                //             title: "· 人工清洗别名",
                //             display: true
                //         },
                //         //{
                //         //     index: "/product-mng",
                //         //     title: "· 产品管理",
                //         //     display: true
                //         // }
                //     ]
                // },
                // {
                //     icon: 'el-icon-office-building',
                //     index: "/hospitalTitle-mng",
                //     title: "审核",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/hospital-mng",
                //             title: "· 审核--主名",
                //             display: true
                //         },{
                //             index: "/department-mng",
                //             title: "· 审核--别名",
                //             display: true
                //         }
                //     ]
                // },
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

                // {
                //     icon: 'el-icon-search',
                //     index: "/CheckMain",
                //     title: "审核主名",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/CheckMain",
                //             title: "转为主名",
                //             display: true
                //         },
                //     ]
                // },
                // {
                //     icon: 'el-icon-search',
                //     index: "/CheckMain",
                //     title: "审核别名",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/CheckAnother",
                //             title: "转为别名",
                //             display: true
                //         }
                        
                //     ]
                // },
                // {
                //     icon: 'el-icon-reading',
                //     index: "/article",
                //     title: "文章管理",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/articleList",
                //             title: "· 文章列表",
                //             display: true
                //         },{
                //             index: "/sort",
                //             title: "· 分类管理",
                //             display: true
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-s-promotion',
                //     index: "/activity-mng",
                //     title: "活动管理",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/activitySort",
                //             title: "· 活动分类",
                //             display: true
                //         },
                //         {
                //             index: "/activityList",
                //             title: "· 活动列表",
                //             display: true
                //         },
                //         {
                //             index: "/insuranceList",
                //             title: "· 内部活动统计",
                //             display: true
                //         },

                //     ]
                // },
                // {
                //     icon: 'el-icon-tickets',
                //     index: "/workOrder-mng",
                //     title: "工单管理",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/workOrderAll",
                //             title: "· 全部工单",
                //             display: true
                //         },
                //         {
                //             index: "/workOrderSet",
                //             title: "· 工单设置",
                //             display: true
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-setting',
                //     index: "/setting",
                //     title: "系统设置",
                //     display: true,
                //     subs: [
                //         {
                //             index: "/account-mng",
                //             title: "· 账号管理",
                //             display: true
                //         },{
                //             index: "/role-mng",
                //             title: "· 角色管理",
                //             display: true
                //         },{
                //             index: "/vx-mng",
                //             title: "· 微信账号管理",
                //             display: true
                //         },{
                //             index: "/sys-logs",
                //             title: "· 系统日志",
                //             display: true
                //         }
                //     ]
                // }
            ];
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
