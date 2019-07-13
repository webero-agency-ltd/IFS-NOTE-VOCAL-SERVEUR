<template>
    <a-alert
        :message="'Vous voulez vraiment suprimer : -' + application.item.name"
        description="on note que la suppression de n'est pas réversible"
        type="error"
        showIcon
    />
</template>
<script>

    import application from '../store/application' ; 
	
	export default {

		props : ['data'], 

		data(){
            return {
                application : application.stade
            }
        },

        computed: {
        
        },

        methods : {

            async init(){
                await application.itemApplication( this.data.id ) ; 
            }

        },  
		created(){

            this.init()
			this.on('ApplicationDestroy',async () => {
				let [ err , destroy ] = await application.destroyApplication( this.data.id ) ; 
                if ( destroy ) {
                    setTimeout(function() {
                        window.location.reload( true ) 
                    }, 3000);
                }
			});

		}
	}
</script>
<style>

</style>