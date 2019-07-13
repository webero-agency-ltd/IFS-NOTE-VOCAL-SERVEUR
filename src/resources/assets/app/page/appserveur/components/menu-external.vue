<template>
    <a-layout-header class="header">
        <div class="logo" >
            <router-link :to="{name:'external'}">
                <a-avatar  src="/assets/img/logo2.png" /> 
            </router-link>
        </div>
        <a-menu :style="{ lineHeight: '64px' , float : 'right' }" v-model="current"  mode="horizontal">
            <a-menu-item key="dashboard">
                <a href="/">{{$lang('appMenuDashbord')}}</a>
            </a-menu-item>
            <a-menu-item key="option">
                <router-link :to="{name:'option'}">
                    {{$lang('appMenuOptions')}} 
                </router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>
<script>
    export default {
        props : [], 
        data(){
            return {
                current : ['dashboard'] , 
            }
        },
        watch:{
            $route (to, from){
                this.current = [ this.$route.name ]
            }
        }, 
        computed: {
        },
        methods : {
        },
        mounted(){
            this.current = [ this.$route.name ] 
        }
    }
</script>
<style>
    .logo {
        width: auto !important;
        height: 31px;
        float: left;
        margin: 16px 28px 16px 0px;
    }
    
    /*@Ecrase :*/
    .ant-layout-header {
        background: #f0f2f5;
    }
    .ant-menu-horizontal{
        background-color: #f0f2f5
    }

    .ellipsis {
        text-overflow: ellipsis;
        /* Required for text-overflow to do anything */
        white-space: nowrap;
        overflow: hidden;
    }

</style>