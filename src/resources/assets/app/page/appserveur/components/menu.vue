<template>
	<div class="menu">
		 <b-container>
        	<b-row>
        		<b-col cols="12">
        			 <b-navbar toggleable="md">
					  	<b-navbar-brand href="#">
					  		<router-link :to="{name:'home'}">
					  			<img :src="'/assets/img/logo.png'" alt="logo" style="width: 35px; height: 35px;">
					  		</router-link>
					  	</b-navbar-brand>
					  	<b-navbar-nav class="ml-auto" >
					  		<b-nav-item :to="{name:'application'}">
					  			{{$lang('appMenuIFS')}}
					  		</b-nav-item>
					  		<b-nav-item :to="{name:'users', params : {id : $route.params.id}}">
					  			{{$lang('appMenuUsers')}}
					  		</b-nav-item>
					  		<b-nav-item :to="{name:'notes', params : {id : $route.params.id}}">
					  			{{$lang('appMenuNotes')}}
					  		</b-nav-item>
					  		<b-nav-item v-if="applicationsItem.type=='trello'" :to="{name:'option', params : {id : $route.params.id}}">
					  			{{$lang('appMenuOptions')}}
					  		</b-nav-item>
					  	</b-navbar-nav>
					</b-navbar>
        		</b-col>
        	</b-row>
        </b-container>
	</div>
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
            	type : null , 
            }
        },
        computed: {
            ...mapApplicationFields({ applicationsItem: `item` }),
        },
        methods : {

        },
	}
</script>
<style>
	.menu{
		border-bottom: 2px solid #ed1f24;
	}
</style>