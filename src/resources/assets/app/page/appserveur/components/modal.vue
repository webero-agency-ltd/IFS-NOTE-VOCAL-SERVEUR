<template>
	<b-modal v-model="modale" :hide-footer="false">
        <alert :errors="error"></alert>
	    <template slot="modal-title">
	        <span>{{options.title}}</span>
	    </template>
	    <component v-if="component" v-bind:is="component"></component>
	    <div slot="modal-footer" class="w-100">
	    	<span v-for="item in options.footer" style="margin-left: 10px;">
	    		<b-button
		    		:key="item.name"
		          	:variant="item.variant?item.variant:'secondary'"
					@click="event(item.event)"
		          	>
		          	{{item.name}}
		        </b-button>  
	    	</span>  
	    </div>
	</b-modal>
</template>
<script>
	
    import store from '../store/';
    import { createNamespacedHelpers } from 'vuex';
	import {
        generale,
    } from '../store/pages/generale';
    
    const { 
        mapAction , 
        mapState  
    } = createNamespacedHelpers(`generale`);

    if (!store.state.generale) store.registerModule(`generale`, generale);

	export default {
		props : [], 
		data(){
            return {
            	modale : false ,
            	options : {} , 
            	component : '' , 
            }
        },
        computed: {
            ...mapState([`error`, `success`]),
        },
        methods : {
        	event( event ){
        		if ( event =='close' ) 
        			return this.modale=false ; 
        		this.emit( event ) ; 
        	}
        },
		mounted(){

			this.on('modale',(options) => {
				this.modale = true ; 
				this.options = { ...options }
				this.component = this.options.component
			})

			this.on('cmodale',(options) => {
				this.modale = false ;
			})

		}
	}
</script>
<style>

</style>