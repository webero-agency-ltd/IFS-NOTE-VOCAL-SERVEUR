<template>
	<div class="menu">
		 <b-container>
        	<b-row>
        		<b-col cols="12">
        			 <b-navbar toggleable="md">
					  	<b-navbar-brand href="#">
					  		<router-link :to="{name:'external'}">
					  			<img :src="'/assets/img/logo.png'" alt="logo" style="width: 35px; height: 35px;">
					  		</router-link>
					  	</b-navbar-brand>
                        <b-navbar-nav class="ml-auto" >
                            <b-nav-item href="/">
                                {{$lang('appMenuDashbord')}} 
                            </b-nav-item>
                            <b-nav-item :to="{name:'option'}">
                                {{$lang('appMenuOptions')}} 
                            </b-nav-item>
                        </b-navbar-nav>
					</b-navbar>
        		</b-col>
        	</b-row>
        </b-container>
	</div>
</template>
<style>
    .menu{
        border-bottom: 2px solid #ed1f24;
    }
</style>