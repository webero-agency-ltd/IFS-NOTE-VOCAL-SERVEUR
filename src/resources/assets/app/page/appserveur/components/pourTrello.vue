<template>
	<div>
        <b-table :fields="fields" striped hover :items="formatPour">
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
                    <b-row style="width: 100%;">
                        <b-col sm="12"><label for="name">{{$lang('externalOptionTrelloListId')}} : </label></b-col>
                        <b-col sm="12">
                            <b-form-group>
                                <b-form-select id="cardId"
                                    v-model="form.cardId"
                                    :options="optionsCards">
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
		props : ['trello'], 
		data(){
            return {
                newpour : false , 
            	formatPour : [] , 
                form: {
                    name : '',
                    appId : '' , 
					cardId : '' , 
                },
                optionsUser : [] , 
				fields : [
                    { key: "name", label: "Name" },
                    { key: "nameliste", label: "Lists trello" },
                    'action',
                ]

            }
        },

        watch : {

            optionsCards : function () {
                this.$store.dispatch( 'external/pour/ALL_POUR',{ id : this.external.trello , type : 'trello', namespace : 'external' } ) ; 
            },

            external : function () {
                this.$store.dispatch( 'external/trello/FIND_LISTS',{ id : this.external.trello , namespace : 'external' } ) ; 
            },

            pours : function () {
                if ( this.pours ) {
                    this.formatPour = this.pours.map(({ApplicationId , AuthorId , appId , cardId , id , name , type}) => {
                        let filter = this.optionsCards.filter( (e) => cardId == e.value ) ; 
                        if ( filter.length > 0 ) {
                            return { nameliste : filter[0].text , ApplicationId , AuthorId , appId , cardId , id , name , type  } 
                        }
                        return { ApplicationId , AuthorId , appId , cardId , id , name , type } 
                    })
                    this.$store.dispatch( 'external/users/ALL_TEAM' , { namespace : 'external' , id : this.external.trello } ) ; 
                }
            },

            allTeams : function () {

                console.log(  this.allTeams )
                let optionsUser = this.allTeams.map(({ fullname , id }) => { 
                    return { text : fullname , value : id}
                }); 
                optionsUser.push({
                    value: 'generale',
                    text: 'Générale',
                })
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
            ...mapTrelloMultiRowFields({ optionsCards: `lists` }),
            ...mapUsersMultiRowFields({ allTeams: `teams` }),
            ...mapPourMultiRowFields({ pours: `pours` }),
        },

        methods : {

        	onSubmit : async function () {

        		if( this.form.name && this.form.appId && this.form.cardId  ){
                    await this.$store.dispatch('external/pour/CREATE_POUR' , { namespace : 'external', op : { type : 'trello' , name : this.form.name , appId : this.form.appId , cardId : this.form.cardId , application : this.external.trello } }) ; 
                    this.form.name = ''
                    this.form.appId = ''
        		}

        	},

            //suppression d'un pour en particulier 
            async deletePour( row ){
                await this.$store.dispatch('external/pour/DELETE_POUR' , { namespace : 'external' , type : 'trello', id : row.item.id , application : this.external.trello }) ; 
                this.init() ; 
            },

            //affichage de tout les card 
            async init(){
                await this.$store.dispatch('external/exoption/FIND_OPTION',{ namespace : 'external' }) ; 
            }

        },
		created(){
			this.init() ; 
		}
	}
</script>