<template>
    <div class="userpage">
        <b-container>
            <b-row style="margin-top: 2rem" v-if="applicationsItem.type=='trello'">
                <b-col cols="12">
                    <h4>{{$lang('appMembreTrello')}}</h4>
                </b-col>
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="trellos">
                                <template slot="add" slot-scope="data">
                                    <b-button :id="'popover-reactive'+data.item.id" variant="primary" ref="button">
                                        Add team
                                    </b-button>
                                    <b-popover :target="'popover-reactive'+data.item.id"  triggers="click" :triggers="'click'" variant="primary">{{urladdteams+'/trello/'+data.item.id}}</b-popover>
                                </template>
                            </b-table>
                        </div>
                    </template>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem" v-if="applicationsItem.type=='infusionsoft'">
                <b-col cols="12">
                    <h4>{{$lang('appMembreInfusionsof')}}</h4>
                </b-col>
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="infusionsofts">
                                <template slot="add" slot-scope="data">
                                    <b-button :id="'popover-reactive'+data.item.id" variant="primary" ref="button">
                                        Add team
                                    </b-button>
                                    <b-popover :target="'popover-reactive'+data.item.id"  triggers="click" :triggers="'click'" variant="primary">{{urladdteams+'/infusionsoft/'+data.item.id}}</b-popover>
                                </template>
                            </b-table>
                        </div>
                    </template>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <h4>{{$lang('appUserTitle')}}</h4>
                </b-col>
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="items"></b-table>
                        </div>
                    </template>
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
        mapApplicationFields ,
        mapUsersFields ,
        mapUsersMultiRowFields
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

    const { 
        mapMutations: mapUsersMutations , 
        mapActions: mapUsersActions 
    } = createNamespacedHelpers(`generale/users`);

	export default {
		props : [ ], 
		data(){
            return {
                urladdteams : '' , 
                //membre équipe 
                trellos : [] , 
                items : [] , 
                infusionsofts : [] , 
                //table ici
                fields : [
                    { key: "fullName", label: "full name" },
                    { key: "id", label: "ID" },
                    { key: "add", label: "Add Team" },
                ]
            }
        },

        computed: {
            ...mapGeneraleActions([`error`, `success`]),
            ...mapUsersMultiRowFields({ applicationTeam: `teams` , membreTrello : `membreTrello` , membreInfusionsoft : `membreInfusionsoft` }),
            ...mapApplicationFields({ applicationsItem: `item` }),
        },

        watch : {

            membreInfusionsoft : function (argument) {
                this.infusionsofts = this.membreInfusionsoft.map(({ id , fullName , add }) => {
                    return { id , fullName , add }
                }).filter(({ id }) => {
                    let is = this.applicationTeam.filter((un) => {
                        let unique = un.id ; 
                        if ( id == unique ) {
                            return true;
                        }
                        return false ; 
                    })
                    if ( is.length > 0 ) {
                        return false
                    }
                    return true ; 
                })
            },

            membreTrello : function (argument) {
                this.trellos = this.membreTrello.map(({ id , fullName , add }) => {
                    return { id , fullName , add }
                }).filter(({ id }) => {
                    let is = this.applicationTeam.filter((un) => {
                        let unique = un.id ; 
                        console.log( id == unique , id , unique )
                        if ( id == unique ) {
                            return true;
                        }
                        return false ; 
                    })
                    if ( is.length > 0 ) {
                        return false
                    }
                    return true ; 
                })
                console.log( this.trellos )
            },

            applicationTeam :  function () {
                this.items = this.applicationTeam.map(({ email , fullname , role }) => {
                    return { email , fullname , role }
                }) 
                //récupération de l'information de l'application qui a le focus 
                this.$store.dispatch('generale/application/ITEM_APPLICATION' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
            },

            applicationsItem : function () {

                if ( !this.applicationsItem ) 
                    return ; 
                if ( this.applicationsItem.type == "trello" ) {
                    this.$store.dispatch('generale/users/MEMBRE_TRELLO' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
                }else{
                    this.$store.dispatch('generale/users/MEMBRE_INFUSIONSOFT' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
                }
                this.urladdteams = window.urlapplication + '/team/'+ this.applicationsItem.unique ; 

            }
        },

        methods : {  

            async init(){
                await this.$store.dispatch('generale/users/ALL_TEAM' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
            },

            //récupération des information trello 
            async trellomenbre(){},

            async infusionsoftmenbre(){},

            async findInfusionsoft(){}

        },
		created(){ 
            this.init() ; 
		}
	}
</script>

<style>

</style>