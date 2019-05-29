<template>
	<b-alert v-if="shwoed" v-model="shwoed" variant="danger">
		<div v-if="errors[key]" v-for="key in Object.keys( this.errors )">- {{errors[key]}} </div> 
	</b-alert>
</template>
<script>
    //
	export default {
		props : ['errors'], 
		data(){
            return {
                shwoed : false , 
            }
        },
        watch : {
            errors : function () {
                if ( !this.errors ) {
                    return
                }
                let keys = Object.keys( this.errors )
                keys = keys.filter( e => this.errors[e] )
                if (keys.length>0) {
                    setTimeout(() => {
                        this.shwoed = false; 
                    }, 4400);
                    return this.shwoed = true ; 
                }
                this.shwoed = false ; 
                return false
            }, 
            shwoed : function () {
                if ( this.shwoed ) {
                    window.scrollTo(0, 0);
                }
            }
        },
        computed: {

        },
        methods : {
        	
        },
		mounted(){
			
		}
	}
</script>
<style>

</style>