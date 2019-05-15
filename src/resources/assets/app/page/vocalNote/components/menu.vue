<template>
	<div class="menu">
		 <b-container>
        	<b-row>
        		<b-col cols="12">
        			 <b-navbar toggleable="md">
					  	<b-navbar-brand href="#">
					  		<router-link :to="{name:'home'}">
					  			<img :src="'./img/logo.png'" alt="logo" style="width: 35px; height: 35px;">
					  		</router-link>
					  	</b-navbar-brand>
					  	<b-navbar-nav>
					  		<b-nav-item :to="{name:'infusionsoft'}">
					  			{{$lang('appMenuIFS')}}
					  		</b-nav-item>
					  		<b-nav-item :to="{name:'users', params : {id : $route.params.id}}">
					  			{{$lang('appMenuUsers')}}
					  		</b-nav-item>
					  		<b-nav-item :to="{name:'notes', params : {id : $route.params.id}}">
					  			{{$lang('appMenuNotes')}}
					  		</b-nav-item>
					  		<b-nav-item :to="{name:'option', params : {id : $route.params.id}}">
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

	export default {
		props : [], 
		data(){
            return {
            }
        },
        methods : {
        },
		created(){ 
		}
	}
</script>
<style>
	.menu{
		box-shadow: 0px 0px 4px rgba(0,0,0,0.4) ; 
		background-color:  #FFF ; 
	}
</style>