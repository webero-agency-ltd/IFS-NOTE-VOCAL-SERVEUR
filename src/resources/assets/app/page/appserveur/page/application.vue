<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <div style="display: flex;">
            <h1>{{$lang('appIFSTitle')}} <strong>{{applicationsItem.name}}</strong></h1>
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

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        mapApplicationFields ,
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

        watch : {
            applicationsItem : function () {
                if ( this.applicationsItem.type == "trello" && !this.applicationsItem.compteId ) {
                    this.$router.push({ name: 'option', params: { id: this.$route.params.id } }) 
                }
            }
        },

        computed: {
            ...mapApplicationFields({ applicationsItem: `item` }),
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