<template>
	<div class="d-block text-center">
        <b-form class="form-login" @submit.prevent.stop="onSubmit">
            <b-form-group buttons >
                <b-form-radio v-model="type" name="some-radios" value="trello">Trello</b-form-radio>
                <b-form-radio v-model="type" name="some-radios" value="infusionsoft">Infusionsoft</b-form-radio>
            </b-form-group>
            <b-form-group v-if="type=='infusionsoft'" >
                <b-input-group>
                    <b-row style="width: 100%;">
                        <b-col sm="4"><label for="name">{{$lang('appInfusionsoftName')}} : </label></b-col>
                        <b-col sm="8">
                            <b-form-group>
                                <b-form-input 
                                		v-model="name"
                                		@input="changeError('name')" 
                                		:state="error.name?false:null"
                                        :placeholder="$lang('appInfusionsoftName')">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-input-group>
            </b-form-group>
            <b-form-group v-if="type=='infusionsoft'" >
                <b-input-group>
                    <b-row style="width: 100%;">
                        <b-col sm="4"><label for="compteId">{{$lang('appInfusionsoftUrlId')}} : </label></b-col>
                        <b-col sm="8">
                            <b-form-group>
                                <b-form-input id="compteId"
                                        v-model="compteId"
                                        @input="changeError('compteId')"
                                        :state="error.compteId?false:null"
                                        :placeholder="$lang('appInfusionsoftUrlId')">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-input-group>
            </b-form-group>
            <b-form-group v-if="type=='trello'" >
                <b-input-group>
                    <b-row style="width: 100%;">
                        <b-col sm="4"><label for="nameTrello">{{$lang('appTrelloName')}} : </label></b-col>
                        <b-col sm="8">
                            <b-form-group>
                                <b-form-input id="nameTrello"
                                        v-model="name"
                                        @input="changeError('name')"
                                        :state="error.name?false:null"
                                        :placeholder="$lang('appTrelloName')">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-input-group>
            </b-form-group>
        </b-form>
    </div>
</template>
<script>
	
	import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        //mapApplicationMultiRowFields ,
        mapApplicationFields ,
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

		props : [], 

		data(){
            return {
            }
        },

        computed: {
            ...mapGeneraleActions([`error`, `success`]),
            //...mapApplicationMultiRowFields({ applications: `rows` }),
            ...mapApplicationFields([`name`,`compteId`,`type`])
        },

        methods : {

        	/*
            ...mapApplicationMutations({
                submit: 'ADD_APPLICATION',
            }),
            */

        	changeError ( e ){
        		let data = {}
        		data[e] = null ; 
        		this.$store.commit('generale/ERROR',data, {root:true})
        	},

        	async findInfusionsoft(){
                let url = window.urlapplication + '/application/item/'+this.$route.params.id ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    if ( !data ) {
                    	return
                    }
                    if ( data.type == "trello" ) {
                        this.type = 'trello' ;
                    }else{
                        this.type = 'infusionsoft' ;
                    }
                }
            },

        },
		created(){

			let ADD_APPLICATION = false ; 
			this.on('createApplication',async () => {
				if ( ADD_APPLICATION === false ) {
					ADD_APPLICATION = true ; 
					let response = await this.$store.dispatch('generale/application/ADD_APPLICATION' , { namespace : 'generale' } ) ; 
					ADD_APPLICATION = false ; 
					//on ferme le modale
					this.emit('cmodale')
				}
			});

            this.findInfusionsoft() ; 

		}
	}
</script>
<style>

</style>