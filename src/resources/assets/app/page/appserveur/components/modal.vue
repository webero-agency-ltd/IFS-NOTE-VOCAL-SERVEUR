<template>
    <div>
    	<a-modal
		    :title="options.title"
		    :visible="visible"
		    @ok="handleOk"
		    :confirmLoading="confirmLoading"
		    @cancel="handleCancel">
	      	<component :data="data" v-if="component" v-bind:is="component"></component>
	    </a-modal>
    </div>
</template>
<script>
	

	export default {
		props : [], 
		data(){
            return {
            	options : {} , 
            	component : '' , 
			    visible: false,
			    confirmLoading: false,
			    data : {} , 
            }
        },
        computed: {

        },
        methods : {

        	handleCancel(e) {
		      	console.log('Clicked cancel button');
		      	this.visible = false
		    },

        	handleOk(e) {
		      	this.confirmLoading = true;
		      	console.log( this.options.handleOk )
        		this.emit( this.options.handleOk ) ; 
		    },

        },
		mounted(){

			this.on('modal',(options) => {
				this.visible = true ; 
				this.options = { ...options }
				if ( this.options.data ) {
					this.data = Object.assign({} , this.options.data )
				}
				this.component = this.options.component
			})

			this.on('closemodale',(options) => {
				this.confirmLoading = false;
				setTimeout(() => {
		        	this.visible = false;
		      	}, 300);
			})

		}
	}
</script>
<style>

</style>