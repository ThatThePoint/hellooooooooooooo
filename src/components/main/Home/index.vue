<template>
    <div class="home">
        <div class="pie">
            <div id="p-item">
                <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                <div class="clear">
                    <span>医院主名</span>
                    <span>{{cleanMsg.main_clean_ratio}}</span>
                    <span class="small">完成率</span>
                </div>

            </div>
            <div id="p-item">
                <div class="clear">
                    <span>医院别名</span>
                    <span>{{cleanMsg.alias_clean_ratio}}</span>
                    <span class="small">完成率</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="primary" :disabled="userInfo.role!==1" @click="goPage( 1)">清洗</el-button>
            <div>
            <el-button type="primary" :disabled="userInfo.role!==0" @click="goPage(2)">审核</el-button>
            <div class="buttons">
            <el-button type="primary" size="small" :disabled="userInfo.role!==0" @click="goToPage('/CheckMain')">审核别名转主名</el-button>
             <el-button type="primary" size="small" :disabled="userInfo.role!==0" @click="goToPage('/CheckAnother')">审核主名转别名</el-button>
            </div>
            </div>
        </div>

    </div>
</template>
<script>
// 引入饼状图组件
import Cookie from 'js-cookie';
import VPagination from "common/VPagination";
// import { isClear_jump} from "@/api/secondName";

export default {
    components: {
        VPagination
    },
    data() {
        return {
            cleanMsg: {},
            userInfo: Cookie.get("userInfo") || {}
        };
    },
    mounted() {
        //获取列表
        // this.initData();
        // this.$nextTick(function () {
        //     this.getData();
        // })
        this.userInfo = JSON.parse(this.userInfo);
    },
    methods: {
        getData() {
            // statistics().then(res => {
            //     this.cleanMsg = res || {};
            // })
        },
    }
};
</script>
<style lang="stylus" scoped>
    .home
        width 100%
        height 100%

    .pie {
        display flex
        justify-content space-around

        .clear {
            display flex
            flex-direction column
            justify-items conter
            align-items center
            font-size 18px
            font-weight 600
            line-height 30px

            .small {
                font-size 12px
                font-weight 400
            }
        }
    }

    .button {
        display :flex;
        justify-content :space-around;
        margin-top 40px
        text-align center
       .buttons{
           margin-top:30px;
           .el-button{
               width:280px;
           }
       }
        .el-button {
            width 400px
            height :50px;
            // margin-right 100px
            font-size 30px
        }
    }
</style>
