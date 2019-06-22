<template>
    <a-layout-header class="header">
        <div class="logo" >
            <router-link :to="{name:'transferwise'}">
                <a-avatar  src="/assets/img/transferwise.png" /> 
            </router-link>
        </div>
        <a-menu :style="{ lineHeight: '64px' , float : 'right' }" v-model="current"  mode="horizontal">
            <a-menu-item key="users" @click="modaleOption">
                <span>API Key</span>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
    
    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        mapApplicationFields ,
        mapUsersFields ,
        mapUsersMultiRowFields
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);

    export default {
        props : [], 
        data(){
            return {
                current : ['application'] , 
            }
        },
        computed: {
            ...mapApplicationFields({ applicationsItem: `item` }),
        },
        methods : {

            modaleOption : function () {
                this.emit('modal',{
                    title : 'Changement de l\'API key' , 
                    component : 'wisetransferApikey' , 
                    handleOk : 'WisetransferApikeyCreate'
                })
            },

        },
    }
</script>
<style>
    .logo {
        width: 120px;
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

</style>