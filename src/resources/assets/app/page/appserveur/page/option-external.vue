<template>
	<div class="notespage">
        <b-container>
            <b-row style="width: 100%; margin-top: 20px; margin-bottom: 10px;">
                <alert :errors="error" style="width: 100%;"></alert>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <h3>{{$lang('appOptionTitleExternTrello')}}</h3>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="applicationsTrello" :fields="fields" >
                                <template slot="id" slot-scope="data">
                                    <b-form-radio v-model="option.trello" name="some-radios-trello" :value="data.item.id">{{data.item.id}}</b-form-radio>
                                </template>
                                <template v-if="option.trello==data.item.id" slot="action" slot-scope="data">
                                    <b-button class="mt-3" @click="pourOption(data.item)">Option</b-button>
                                </template>
                                <template v-if="option.trello==data.item.id" slot="label" slot-scope="data">
                                    <b-button class="mt-3" @click="labelOption(data.item)">Etiquette</b-button>
                                </template>
                            </b-table>
                        </div>
                    </template>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <h3>{{$lang('appOptionTitleExternIFS')}}</h3>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <template>
                        <div>
                            <b-table striped hover :items="applicationsIFS" :fields="fields" >
                                <template slot="id" slot-scope="data">
                                    <b-form-radio v-model="option.infusionsoft" name="some-radios-infusionsoft" :value="data.item.id">{{data.item.id}}</b-form-radio>
                                </template>
                                <template v-if="option.infusionsoft==data.item.id" slot="action" slot-scope="data">
                                    <b-button class="mt-3" @click="pourOption(data.item)">Option</b-button>
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
        external,
        mapExoptionFields ,
        mapInfusionsoftMultiRowFields ,
        mapApplicationMultiRowFields , 
    } from '../store/pages/external';
    
    if (!store.state.external) store.registerModule(`external`, external);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions , 
        mapGetters: mapApplicationGetters 
    } = createNamespacedHelpers(`external/application`);

    const { 
        mapActions: mapExternalMutations, 
        mapState: mapExternalState 
    } = createNamespacedHelpers(`external`);

	export default {
		props : [ ], 
		data(){
            return {
                infusionsoft : {} , 
                compte : '' , 
                items: [],
                fields : [
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                    { key: "action", label: "Action" },
                    { key: "label", label: "Label" },
                ],
                option : { infusionsoft : null , trello : null } , 
            }
        },

        computed: {
            ...mapExternalState([`error`, `success`]),
            ...mapApplicationMultiRowFields({ applications: `rows` }),
            ...mapExoptionFields([`external`]),
            ...mapApplicationGetters({  applicationsTrello : `rowsTrello` , applicationsIFS : `rowsIFS` })
        },

        watch : {

            external : function () {
                console.log( this.external )
                this.option = Object.assign({},this.external)
            },

            trelloBoards : function () {
                this.items = this.trelloBoards.map(({ id , title }) => {
                    return { id , title }
                }) 
            },

        },

        methods : { 

            labelOption : function ( option ) {
                this.emit('modale',{title:this.$lang(`Edition des labels Trello`),component:'label-trello',footer:[]}) 
            },

            pourOption : function ( option ) {

                if ( option.type == "infusionsoft" ) {
                    this.emit('modale',{title:this.$lang(`Edition de 'POUR' de infusionsoft`),component:'pour-infusionsoft',footer:[]}) 
                }else if ( option.type == "trello" ) {
                    this.emit('modale',{title:this.$lang(`Edition de 'POUR' de trello`),component:'pour-trello',footer:[]}) 
                }

            },

            async create(){
                await this.$store.dispatch('external/exoption/SET_OPTION' , { namespace : 'external' , op : this.option }  ) ; 
            },  

            async init(){
                await this.$store.dispatch('external/application/FIND_ALL', { namespace : 'external' }) ; 
                await this.$store.dispatch('external/exoption/FIND_OPTION', { namespace : 'external' }) ; 
            }

        },
		mounted(){
            this.init() ; 
		}

	}
</script>

<style>

</style>