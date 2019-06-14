<template>
	<div class="cont-app">
        <menu-app v-if="home"></menu-app>
        <menu-external v-if="!home"></menu-external>
        <transition name="fade">
            <router-view></router-view> 
        </transition>
        <modal></modal>
    </div>
</template>
<script>
    import store from './store/index';
    export default {
        store: store, 
        name: 'App', 
        data(){
            return {
                home : window.location.pathname == '/' || window.location.pathname == '' 
            }
        },
        computed : {},
        methods : {},
        mounted(){

        },
    }
</script>
<style>
    
</style>