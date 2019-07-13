<template>
	<a-layout-header class="header">
        <div class="logo" >
         	<router-link :to="{name:'home'}">
	            <a-avatar  src="/assets/img/logo.png" /> 
	        </router-link>
        </div>
      	<a-menu :style="{ lineHeight: '64px' , float : 'right' }" v-model="current"  mode="horizontal">
		    <a-menu-item key="users">
			  	<router-link :to="{name:'users', params : {id : $route.params.id}}">
                    {{$lang('appMenuUsers')}}
                </router-link>
			</a-menu-item>
			<a-menu-item key="notes">
		      	<router-link :to="{name:'notes', params : {id : $route.params.id}}" >
		      		{{$lang('appMenuNotes')}}
		      	</router-link>
		    </a-menu-item>
		    <a-menu-item v-if="application.item.type=='trello'" key="option">
		      	<router-link  :to="{name:'option', params : {id : $route.params.id}}" >
		      		{{$lang('appMenuOptions')}}
		      	</router-link>
		    </a-menu-item>
		</a-menu>
    </a-layout-header>
</template>

<script>

    import application from '../store/application' ; 

	export default {
		props : [], 
		data(){
            return {
            	current : ['application'] , 
                application  : application.stade
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