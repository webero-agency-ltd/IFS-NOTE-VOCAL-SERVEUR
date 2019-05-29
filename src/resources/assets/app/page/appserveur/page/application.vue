<template>
	<div class="ifspage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <b-button class="mt-3" @click.prevent.stop="reauthorize">Token refresh</b-button>
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

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        mapApplicationMultiRowFields ,
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);
    
    const { 
        mapActions: mapGeneraleMutations, 
        mapState: mapGeneraleActions 
    } = createNamespacedHelpers(`generale`);
    
    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);


	export default {
		props : [ ], 
		data(){
            return {
                
            }
        },
        computed: {
            
        },
        methods : {
            async init(){
                await this.$store.dispatch('generale/application/ITEM_APPLICATION' , { id : this.$route.params.id , namespace : 'generale' } ) ; 
            },
            reauthorize () { 
                this.$store.dispatch( 'generale/application/RE_AUTHORIZE', { id : this.$route.params.id , namespace : 'generale' }  ) ; 
            }
        },
		created(){
            this.init() ; 
		}
	}
</script>

<style>

</style>