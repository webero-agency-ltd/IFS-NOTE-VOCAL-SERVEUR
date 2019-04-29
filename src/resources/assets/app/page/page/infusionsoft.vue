<template>
	<div class="ifspage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appIFSTitle')}}</h2>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
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
            }
        },
        methods : {
            advcprofile : function ( data ) {
            }
        },
		created(){

            console.log( this.$route.params.id )
		}
	}
</script>

<style>

</style>