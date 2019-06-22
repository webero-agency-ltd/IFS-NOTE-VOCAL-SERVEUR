<template>
	<a-layout>    
        <menu-app v-if="page == '/' || page == ''"></menu-app>
        <menu-external v-if="page == '//vocal-note' || page == 'vocal-note'"></menu-external>
        <transferwise-menu v-if="page=='/transferwise' || page == 'transferwise' "></transferwise-menu>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
            <!--<a-breadcrumb :routes="routes">
                <template slot="itemRender" slot-scope="{route, params, routes, paths}">
                    <span v-if="routes.indexOf(route) === routes.length - 1">
                      {{route.breadcrumbName}}
                    </span>
                    <router-link v-else :to="paths.join('/')">
                      {{route.breadcrumbName}}
                    </router-link>
                </template>
            </a-breadcrumb>-->
            <transition name="fade">
                <router-view></router-view> 
            </transition>
        </a-layout-content>
        <modal></modal>
    </a-layout> 
</template>
<script>
    
    import store from './store/index';
    export default {
        store: store, 
        name: 'App', 
        data(){ 
            return {
                page : window.location.pathname ,
                routes: [{
                    path: 'index',
                    breadcrumbName: 'PATH 1'
                }, {
                    path: 'first',
                    breadcrumbName: 'PATH 2'
                }],
            }
        },
        computed : {},
        methods : {},
        mounted(){
            console.log( window.location.pathname ) ; 

        },
    }
</script>
<style>
    
</style>