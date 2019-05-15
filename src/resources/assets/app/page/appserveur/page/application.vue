<template>
	<div class="ifspage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <b-button class="mt-3" @click="reauthorize">Créer</b-button>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <h2>{{$lang('appIFSTitle')}}</h2>
                </b-col>
                <b-col cols="12">
                    <b-card-group deck>
                        <b-card  footer-tag="footer" bg-variant="light" header="Temp d'enregistrement">
                            
                        </b-card>
                        <b-card  footer-tag="footer" bg-variant="light" header="Note d'utilisateur">
                            
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
	export default {
		props : [ ], 
		data(){
            return {
                application : '' , 
            }
        },
        methods : {

            async reauthorize ( data ) {
                
                let url = window.urlapplication + '/application/reauthorize/' + this.application.type + '/' + this.application.id ; 
                let find = await fetch( url )  ;  
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    if ( data.success ) {
                        var win = window.open(data.success, '_blank');
                        win.focus();
                    } 
                }

            } , 

            async init ( data ) {
                
                let url = window.urlapplication + '/application/item/'+this.$route.params.id; 
                let find = await fetch( url )  ;  
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.application = data ; 
                }

            }
        },
		created(){

            this.init() ; 
            console.log( this.$route.params.id )
		}
	}
</script>

<style>

</style>