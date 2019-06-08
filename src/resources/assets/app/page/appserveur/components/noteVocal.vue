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

	export default {
		props : [], 
		data(){
            return {}
        },

        watch : {
            allTeams : function () {

            }
        },

        methods : {
            async recorder(){
                await this.$nextTick() ;
                let init = Vocale.init('vocale-content') ;
                let $that = this ;  
                if ( init ) {
                    let vo = new Vocale()
                    //enregistrement terminer
                    vo.recorder = function ( blob  ) {
                        var url = URL.createObjectURL(blob);
                        new listen( 'vocale-listen' , url , 'audio-liste-note-record' )
                        $that.emit('note-vocal-changed',blob)
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