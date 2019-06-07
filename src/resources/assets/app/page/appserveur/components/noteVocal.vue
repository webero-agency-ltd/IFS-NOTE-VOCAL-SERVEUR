<template>
	<div>
        <div id="vocale-content"></div>   
        <div id="vocale-listen"></div>   
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    import Vocale from '../libs/vocale';
    import listen from '../libs/listen';
    
    import {
        external,
        mapExoptionFields ,
        mapInfusionsoftMultiRowFields ,
        mapTrelloMultiRowFields , 
        mapUsersMultiRowFields , 
        mapPourMultiRowFields , 
    } from '../store/pages/external';
    
    if (!store.state.external) store.registerModule(`external`, external);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions , 
        mapGetters: mapApplicationGetters 
    } = createNamespacedHelpers(`external/application`);

    //@todo : Relier a un compte application trello 
	export default {
		props : ['trello'], 
		data(){
            return {
                
            }
        },

        watch : {

            allTeams : function () {

            }

        },
 
        computed: {
            ...mapExoptionFields([`external`]),
            ...mapTrelloMultiRowFields({ optionsCards: `lists` }),
            ...mapUsersMultiRowFields({ allTeams: `teams` }),
            ...mapPourMultiRowFields({ pours: `pours` }),
        },

        methods : {

            async recorder(){
                await this.$nextTick() ;
                let init = Vocale.init('vocale-content') ;
                let $that = this ;  
                console.log( init )
                if ( init ) {
                    let vo = new Vocale()
                    //enregistrement terminer
                    vo.recorder = function ( blob  ) {
                        console.log(' STOP RECORDER ')
                        var url = URL.createObjectURL(blob);
                        new listen( 'vocale-listen' , url , 'audio-liste-note-record' )
                        $that.emit('note-vocal-changed',blob)
                    }
                    //enregistrement ok a uploader
                    vo.upload = function ( file ) {
                        alert('POSSIBILITER ECOUTER DIRECTEMENT ONLINE')
                        var url = URL.createObjectURL(blob);
                        new listen( 'vocale-listen' , url , 'audio-liste-note-record' )
                        $that.emit('note-vocal-changed', file )
                    }
                }
                //initialisation des evenements d'écoute de changement de vitesse 
                listen.event()
            }
        },

		mounted(){
            this.recorder() ; 
		}

	}
</script>

<style>
    .recorder-style{
        width: 26px;
        height: 26px;
        border-radius: 26px; 
        background-color: #999 ; 
    }
    .recorder-style.active{
        background-color: red ;
    }
</style>