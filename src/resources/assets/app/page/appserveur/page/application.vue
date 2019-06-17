<template>

    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">

        <Row :gutter="12">
            <Col :span="8">
                <h2>{{$lang('appIFSTitle')}}</h2>
            </Col>
            <Col :span="4">
                <b-button class="mt-3" @click.prevent.stop="reauthorize">Token refresh</b-button>
            </Col>
        </Row>

        <b-col cols="12">
            <b-card-group deck>
                <b-card  footer-tag="footer" bg-variant="light" header="Temp d'enregistrement">
                    
                </b-card>
                <b-card  footer-tag="footer" bg-variant="light" header="Note d'utilisateur">
                    
                </b-card>
            </b-card-group>
        </b-col>        
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