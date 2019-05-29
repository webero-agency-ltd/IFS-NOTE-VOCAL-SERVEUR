<template>
	<div>
        <b-table :fields="fields" striped hover :items="pours">
            <template slot="action" slot-scope="row">
                <b-button size="sm" @click="deletePour(row)" >
                    DELETE
                </b-button>
            </template>
        </b-table>
        <b-form class="form-login" @submit.prevent.stop="''">
            <b-form-group>
                <b-input-group>
                    <b-row style="width: 100%;">
                        <b-col sm="12"><label for="name">{{$lang('appInfusionsoftName')}} : </label></b-col>
                        <b-col sm="12">
                            <b-form-group>
                                <b-form-input id="name"
                                        v-model="form.name"
                                        :placeholder="$lang('appInfusionsoftName')">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row style="width: 100%;">
                        <b-col sm="12"><label for="name">{{$lang('externalOptionTrelloAppId')}} : </label></b-col>
                        <b-col sm="12">
                            <b-form-group>
                                <b-form-select id="appId"
                                    v-model="form.appId"
                                    :options="optionsUser">
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row> 
                </b-input-group>
            </b-form-group>
            <b-button @click.prevent.stop="onSubmit" ref="button">
                ADD 
            </b-button>
        </b-form>
	</div>
</template>
<script>
    
    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
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
		props : ['infusionsoft'], 
		data(){
            return {
            	newpour : false , 
            	form: {
                    name : '',
                    appId : '' , 
					cardId : '' , 
                },
                optionsUser : [] , 
				optionsCards : [] , 

				fields : [
                    { key: "name", label: "Name" },
                    'action',
                ]

            }
        },
        watch : {

            external : function () {
                this.$store.dispatch( 'external/pour/ALL_POUR',{ namespace : 'external', id : this.external.infusionsoft , type : 'infusionsoft' } ) ; 
            },

            pours : function () {
                if ( this.pours ) {
                    console.log( this.pours )
                    console.log('POUR OK')
                    this.$store.dispatch( 'external/users/ALL_TEAM', { namespace : 'external', id : this.external.infusionsoft } ) ; 
                }
            },

            allTeams : function () {

                console.log(  this.allTeams )
                let optionsUser = this.allTeams.map(({ fullname , id }) => { 
                    return { text : fullname , value : id}
                });
                console.log( optionsUser )
                this.optionsUser = optionsUser.filter( (e) => {
                    let existe = false ; 
                    for (var i = 0; i < this.pours.length; i++) {
                        if ( this.pours[i].appId == e.value ) {
                            existe = true ; 
                        }
                    }
                    return !existe
                })

            }

        },
        computed: {
            ...mapExoptionFields([`external`]),
            ...mapPourMultiRowFields({ pours: `pours` }),
            ...mapUsersMultiRowFields({ allTeams: `teams` }),
        },
        methods : {

            onSubmit : async function () {

                if( this.form.name && this.form.appId ){
                    await this.$store.dispatch('external/pour/CREATE_POUR' , { op : { type : 'infusionsoft' , name : this.form.name , appId : this.form.appId , cardId : null , application : this.external.infusionsoft } , namespace : 'external' } ) ; 
                    this.form.name = ''
                    this.form.appId = ''
                }

            },

            //suppression d'un pour en particulier 
            async deletePour( row ){
                await this.$store.dispatch('external/pour/DELETE_POUR' , { namespace : 'external' , type : 'trello', id : row.item.id , application : this.external.infusionsoft }) ; 
                this.init() ;
            },

            async init(){
                await this.$store.dispatch('external/exoption/FIND_OPTION', { namespace : 'external' } ) ; 
            }

        },
		created(){ 
			this.init() ;
		}
	}
</script>