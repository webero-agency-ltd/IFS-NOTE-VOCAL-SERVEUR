<template>
    <div style="padding-top: 2rem;" class="cont-app">
        <loader-app v-if="loader"></loader-app>
        <b-container>
            <b-row style="width: 100%; margin-top: 10px;">
                <alert :errors="error" style="width: 100%;"></alert>
            </b-row>
            <b-row v-if="!external.infusionsoft&&!external.trello" style="width: 100%; margin-top: 10px;">
                <b-alert show variant="warning" style="width: 100%;">
                    {{$lang('GE000A')}}
                    <p class="mb-0">
                        <router-link :to="{name:'option'}">
                            A l'address
                        </router-link>
                    </p>
                </b-alert>
            </b-row>
            <b-row v-if="external.infusionsoft||external.trello">
                <b-col cols="12">
                    <b-form class="form-login" @submit.prevent.stop="onSubmit">
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12"><label for="title">{{$lang('addvocalFormTitle')}} : </label></b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-select v-model="form.title" :options="optionsTitle" ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12"><label for="description">{{$lang('addvocalFormDescription')}} : </label></b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-textarea id="description"
                                                    v-model="form.description"
                                                    :placeholder="$lang('addvocalFormDescription')">
                                            </b-form-textarea>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">
                                        <note-vocal v-if="NOTEID" :identifiant="NOTEID"></note-vocal>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group>
                            <div style="display: flex;">
                                <div style="width: 50%;">
                                    <b-button block variant="info" v-if="external.trello" v-bind:class="{ active: compte=='trello' }" @click="compte='trello'">Trello</b-button>
                                </div>
                                <div style="width: 50%;">
                                    <b-button block variant="info" v-if="external.infusionsoft" v-bind:class="{ active: compte=='infusionsoft' }" @click="compte='infusionsoft'">Infusionsoft</b-button>
                                </div>
                            </div>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Pour : </b-col>
                                    <b-col sm="12">
                                        <b-form-group >
                                            <b-form-radio-group
                                                v-model="form.membre"
                                                :options="pours"
                                                block
                                                buttons
                                                >
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group  v-if="compte=='infusionsoft'">
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Priorité : </b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-radio-group
                                                v-model="form.prioriter"
                                                :options="prioriters"
                                                buttons
                                                @input="changePrioriters(form.prioriter)">
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group  v-if="compte=='trello' && this.labels.length ">
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Priorité : </b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-radio-group
                                                v-model="form.prioriter"
                                                :options="labels"
                                                buttons
                                                @input="changePrioriters( form.prioriter )">
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Date : </b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-input
                                                    v-model="dateformate"
                                                    type="date"
                                                    @change="changeDate">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>
                        <div class="space"></div>
                        <div v-if="compte=='infusionsoft'">
                            <b-form-group>
                                <b-input-group>
                                    <b-row style="width: 100%;">
                                        <b-col sm="12">Contact ID : </b-col>
                                        <b-col sm="12">
                                            <b-input-group>
                                                <b-form-select v-model="form.contactId" :options="optionsConctats"></b-form-select>
                                                <b-input-group-append>
                                                    <b-button id="popover-reactive-search" variant="primary" ref="button">
                                                        Recherche
                                                    </b-button>
                                                </b-input-group-append>
                                                <b-popover :placement="'topleft'" target="popover-reactive-search"  triggers="click" :triggers="'click'" variant="primary">
                                                    <div style="width: 100%;overflow-x: hidden;">
                                                        <div class="propositionContent" style="max-height: 300px; overflow-y: auto;">
                                                            <div class="propositionMembre" v-for="item in optionsConctats" @click="apply_contact( item )">{{ item.family_name + ' ' + item.given_name }}</br><span>{{ item.email_addresses[0].email }}</span></div>
                                                            <hr>
                                                        </div>
                                                        <b-form-group>
                                                            <b-form-input id="search"
                                                                v-model="form.search">
                                                            </b-form-input>
                                                        </b-form-group>
                                                    </div>
                                                </b-popover>  
                                            </b-input-group>
                                        </b-col>
                                    </b-row>
                                </b-input-group>
                            </b-form-group>
                        </div>
                        <div class="space"></div>
                        <b-row style="margin-botton: 2rem ;">
                            <b-col cols="12">
                                <b-button block variant="primary" @click="create">CREER</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    
    import makeid from '../libs/makeid';
    import moment from 'moment';
    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        external,
        mapExoptionFields ,
        mapInfusionsoftMultiRowFields ,
        mapPourMultiRowFields , 
    } from '../store/pages/external';
    
    if (!store.state.external) store.registerModule(`external`, external);

    const { 
        mapActions: mapExternalMutations, 
        mapState: mapExternalState 
    } = createNamespacedHelpers(`external`);

    export default {
        name: 'App', 
        data(){
            return {
                compte : '',
                loader : true ,
                application : [] , 
                infusionsoft : null , 
                infusionsofts : [] , 
                trello : null , 
                trellos : [] , 
                labels : [] , 
                disabled : {
                    trello : false , 
                    infusionsoft : false , 
                },
                form: {
                    title : 0 ,
                    description : '',
                    membre : '' ,
                    prioriter : 0 ,
                    date : '' , 
                    contactId : '' , 
                    search : '' , 
                },
                prioriters : [
                    { text: 'Critical', value: 1 },
                    { text: 'Essential', value: 2 },
                    { text: 'Non-essential', value: 3 },
                ],
                optionsTitle : [
                    { value: 0, text: 'Note générale' },
                    { value: 1, text: 'Appel commercial' },
                    { value: 2, text: 'SAV' },
                    { value: 3, text: 'Email' },
                    { value: 4, text: 'Devis' },
                    { value: 5, text: 'Appel' },
                    { value: 6, text: 'Lien Paiement' },
                    { value: 7, text: 'Etiquette Chronopost' },
                    { value: 8, text: 'Comptabilité' },
                    { value: 9, text: 'Impayé' },
                    { value: 10, text: 'Agenda AppCore' },
                    { value: 11, text: 'TQ2022' },
                    { value: 12, text: 'Autre' },
                ],
                pours : [
                ] , 
                //note vocal id 
                NOTEID : null , 
                //le note vocal est enregistrer ici 
                note : null , 
            }
        },

        watch : {

            form : function () {
                console.log( this.form.membre )
            },

            allPours : function () {
                this.labels = this.allPours.filter( e => e.type === 'label' ).map( e => {
                    return { text: e.name, value: e.id }
                }) ; 
                if ( this.labels.length == 0 ) {
                    return
                }
                this.form.prioriter = this.labels[this.labels.length-1].value;
                this.changePrioriters(0) ; 
            },

            poursBrute : function () {
                this.pours = this.poursBrute.map( e => {
                    return { text: e.name, value: e.id }
                })
                if ( this.compte == 'infusionsoft' ) {
                    this.pours.push({ value : 'default' , text: 'Note' })
                }
                this.form.membre = this.pours[this.pours.length-1].value;
            },

            external : function () {
                if ( this.external.trello && this.external.infusionsoft ) {
                    this.compte = 'trello';
                    this.$store.dispatch( 'external/infusionsoft/ALL_CONTACTS', { id : this.external.infusionsoft , namespace : 'external' } ) ; 
                }else if ( this.external.trello ) {
                    this.compte = 'trello';
                }else if ( this.external.infusionsoft ) {
                    this.compte = 'infusionsoft';
                    this.$store.dispatch( 'external/infusionsoft/ALL_CONTACTS', { id : this.external.infusionsoft , namespace : 'external' } ) ; 
                }
            },

            compte : function () {
                if ( this.compte == 'trello' ) {
                    this.$store.dispatch( 'external/pour/ALL_POUR',{ id : this.external.trello , type : 'trello' , namespace : 'external' } ) ; 
                    this.$store.dispatch( 'external/pour/FIND_ALL_POUR',{ id : this.external.trello , type : 'trello' , namespace : 'external' } ) ; 
                }else if ( this.compte == 'infusionsoft' ) {
                    this.$store.dispatch( 'external/pour/ALL_POUR',{ id : this.external.infusionsoft , type : 'infusionsoft' , namespace : 'external' } ) ; 
                }
            },

        },

        computed : {

            ...mapExternalState([`error`, `success`]),
            ...mapExoptionFields([`external`]),
            ...mapPourMultiRowFields({ poursBrute: `pours` , allPours : `allPours` }),
            ...mapInfusionsoftMultiRowFields({ suggestions: `contacts` }),
             
            //paramètrage de récupération des contacts 
            dateformate : {
                get : function () {
                    if ( this.form.date ) {
                        return this.form.date.format( 'YYYY-MM-DD' )  ; 
                    }
                    return '' ; 
                },
                set : function ( data ) {
                    this.form.date = moment( data , 'YYYY-MM-DD' ) ; 
                }
            },

            // la liste des contacts a afficher 
            optionsConctats : function () {
                return this.suggestions.filter( (e) => {
                    let existe = false ; 
                    if ( e.text.toLowerCase().indexOf( this.form.search.toLowerCase() ) !== -1 ) {
                        existe = true ; 
                    }else if ( e.email_addresses.length > 0 && e.email_addresses.filter( (e) => { 
                        let existe = false ; 
                        if ( e.email.toLowerCase().indexOf( this.form.search.toLowerCase() ) !== -1 ) {
                            existe = true ; 
                        }
                        return existe 
                    }).length !== 0 ) {
                        existe = true ; 
                    }
                    return existe ;
                }) ; 
            },
        },
        methods : {

            async create(){

                let compteId = null ;
                let membre = null ; 
                let description = '' ; 
                if ( this.compte == 'trello' ) {
                    compteId = this.external.trello ;
                    description = this.form.description ;
                }else if ( this.compte == 'infusionsoft' ) {
                    compteId = this.external.infusionsoft ; 
                    description = 'NOTEID::'+this.NOTEID+'::NOTEID'  ;
                    description += "\n"+' Commentaire: '+"\n" ;
                    description += this.form.description+"\n" ;    
                }else{
                    return false ; 
                }
                let data = await this.$store.dispatch('external/exoption/CREATE', {
                    op : { compteId , type : this.compte , title : this.optionsTitle[this.form.title].text , description : description , pour : this.form.membre , prioriter : this.form.prioriter , date : this.form.date.format('YYYY-MM-DDTHH:mm:ssZ'), contactId : this.form.contactId } , namespace : 'external' 
                } ) ; 
                if ( !data || (!data.url&&this.compte == 'trello') ) {
                    return
                }
                //enregistrement des vocal apres création des notes sur l'application qui a été selectionner 
                let url = window.urlapplication+'/save/'+this.NOTEID+'?typeId='+compteId ;
                //@todo :seulement pour trello  
                let id = null ; 
                this.compte == 'trello' ? id = decodeURIComponent( data.url.replace('https://trello.com', '') ).split('/').join('_').replace('/', '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "") : '' ;  
                //upload des notes que vous avez enregister au paravant 
                let formData = new FormData();
                formData.append('file', this.note );
                let _url = window.urlapplication+'/upload?' ;
                _url += 'NOTEID='+this.NOTEID
                _url += '&type='+this.compte
                _url += '&appId='+compteId
                _url += '&newId='+id
                _url += '&text='+this.form.description
                _url += '&title='+this.optionsTitle[this.form.title].text
                let upload = await fetch( _url , {
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                if ( upload.ok ) {
                    window.location.reload( true ) 
                }
                
            },  

            //ici on change la valeur des date 
            changeDate(){ 
                this.form.prioriter = null ; 
            }, 

            changePrioriters( p ){

                let add = 0 ; 
                if ( this.form.prioriter == 1 ) {
                    add = 1 ; 
                } else if ( this.form.prioriter == 2 ) {
                    add = 2 ; 
                }else if ( this.form.prioriter == 3 ) {
                    add = 3 ; 
                }
                if ( this.compte == 'trello' ) {
                    //this.allPours
                    this.allPours.forEach( e => {
                        console.log( e )
                        if ( e.id == this.form.prioriter ) {
                            add = parseInt( e.cardId ) ;  
                        }
                    })
                }
                this.form.date = moment().clone().add( add , 'day' )

            }, 

            apply_contact( info ){
                this.form.contactId = info.value ;
                $('#popover-reactive-search').trigger('click') ; 
            },

            async init(){
                this.NOTEID = makeid(12) ;  
                await this.$store.dispatch('external/exoption/FIND_OPTION' , { namespace : 'external' } ) ; 
                this.loader = false;
                await this.$nextTick() 
                this.changePrioriters() ; 
            }

        },
        mounted(){
            this.init() ; 
        },
        created(){
            this.on('note-vocal-changed',( note ) => {
                this.note = note  ; 
            })
        }
    }
</script>
<style>
    
    .space{
        margin-bottom: 2rem;
        margin-top: 2rem;
    }

    .propositionContent{
        padding-right: 20px;
        padding-left: 20px;
        margin-left: -20px;
        margin-right: -20px;
    }
    
    .propositionMembre{
        border-bottom: 1px solid rgba( 0 , 0 , 0 , 0.05 );
        cursor: pointer;
        padding: 4px 2px;
    }

    .propositionMembre:hover{
        background-color: rgba( 0 , 0 , 0 , 0.02 ) ;
    }

    .propositionMembre span{
        color: rgba( 0 , 0 , 0 , 0.6 )
    }
    
    .btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active, .show > .btn-info.dropdown-toggle {
        color: #fff;
        background-color: #093840;
        border-color: #10707f;
    }
</style>