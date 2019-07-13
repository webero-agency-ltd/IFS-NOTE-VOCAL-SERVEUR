<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <div style="display: flex;">
            <h1>{{$lang('appIFSTitle')}} <strong>{{this.application.item.name}}</strong></h1>
            <h3 style="flex: 1;"><a-button @click="reauthorize" type="danger" style="float: right;margin-top: 0.5rem;" >Token refresh</a-button></h3>
        </div>
        <a-divider dashed />
        <a-row :gutter="12">
            <a-col :span="8">
                            
            </a-col>
        </a-row>
    </div>
</template>
<script>
    
    import application from '../store/application' ; 

	export default {
		props : [ ], 
		data(){
            return {
                application  : application.stade
            }
        },
        watch : {

        },
        computed: {
        
        },
        methods : {
            async init(){
                await application.itemApplication( this.$route.params.id ) 
                if ( this.application.item.type == "trello" && !this.application.item.compteId ) {
                    this.$router.push({ name: 'option', params: { id: this.$route.params.id } }) 
                }
            },
            async reauthorize () { 
                await application.reAuthorize( this.$route.params.id ) 
            }
        },
		created(){
            this.init() ; 
		}
	}
</script>

<style>

</style>