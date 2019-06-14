<template>
	<div>
		<a-menu v-model="current"  mode="horizontal" >
		    <a :to="{name:'home'}" >
	      		<a-avatar src="/assets/img/logo.png" /> 
	      	</a>
		    <a-menu-item key="application">
		      	<a :to="{name:'application'}" >
		      		{{$lang('appMenuApp')}}
		      	</a>
		    </a-menu-item>
		    <a-menu-item key="users">
		      	<a :to="{name:'users', params : {id : $route.params.id}}" >
		      		{{$lang('appMenuUsers')}}
		      	</a>
		    </a-menu-item>
		    <a-menu-item key="notes">
		      	<a :to="{name:'notes', params : {id : $route.params.id}}" >
		      		{{$lang('appMenuNotes')}}
		      	</a>
		    </a-menu-item>
		    <a-menu-item v-if="applicationsItem.type=='trello'" key="option">
		      	<a  :to="{name:'option', params : {id : $route.params.id}}" >
		      		{{$lang('appMenuOptions')}}
		      	</a>
		    </a-menu-item>
		</a-menu>
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
            	current : ['application'] , 
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