<template>
	<div class="cont-app">
        <menu-app></menu-app>
        <transition name="fade">
            <router-view></router-view> 
        </transition>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import { get, post } from './lib/api'
    export default {
        name: 'App', 
        data(){
            return {

            }
        },
        computed : {
        },
        methods : {
            
        },
        mounted(){

        },
        created(){
        
        }
    }
</script>
<style>
    
</style>