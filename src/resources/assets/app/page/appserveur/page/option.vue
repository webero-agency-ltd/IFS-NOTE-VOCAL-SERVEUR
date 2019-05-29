<template>
	<div class="notespage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appOptionTitle')}}</h2>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="items" :fields="fields" >
                                <template slot="id" slot-scope="data">
                                    <b-form-radio v-model="compte" name="some-radios" :value="data.item.id">{{data.item.id}}</b-form-radio>
                                </template>
                            </b-table>
                        </div>
                    </template>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-button class="mt-3" @click="create">Valider</b-button>
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
        mapUsersMultiRowFields , 
        mapTrelloMultiRowFields
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);

	export default {
		props : [ ], 
		data(){
            return {
                infusionsoft : {} , 
                compte : '' , 
                items: [],
                fields : [
                    { key: "id", label: "ID" },
                    { key: "title", label: "Title" },
                    { key: "url", label: "Url" },
                ]
            }
        },

        computed: {
            ...mapApplicationFields({ applicationsItem: `item` }),
            ...mapTrelloMultiRowFields({ trelloBoards: `boards` }),
        },

        watch : {

            applicationsItem : function () {
                if ( this.applicationsItem ) {
                    this.compte = this.applicationsItem.compteId ;
                }
            },

            trelloBoards : function () {

                this.items = this.trelloBoards.map(({ id , title , url }) => {
                    return { id , title , url }
                }) 

            }

        },

        methods : { 

            async create(){
                let item = null ;
                for( const i of this.items ){
                    if ( i.id == this.compte ) {
                        item = i ; 
                    }
                }
                await this.$store.dispatch('generale/trello/ADD_BOARDS' , { id : this.$route.params.id,  compte : this.compte , url : item.url ,namespace : 'generale'} ) ; 
            },  

            async init(){
                await this.$store.dispatch('generale/application/ITEM_APPLICATION' , { id : this.$route.params.id ,namespace : 'generale' } ) ; 
                await this.$store.dispatch('generale/trello/ALL_BOARDS' , { id : this.$route.params.id  ,namespace : 'generale' }) ; 
            }

        },
		mounted(){
            
            this.init() ; 

		}
	}
</script>

<style>

</style>