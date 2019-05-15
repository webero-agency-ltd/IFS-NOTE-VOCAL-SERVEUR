<template>
	<div class="cont-app">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <b-form class="form-login" @submit.prevent.stop="onSubmit">
                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12"><label for="title">{{$lang('addvocalFormTitle')}} : </label></b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-select v-model="form.title" :options="optionsTitle" @input="changeinput('title')" ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12"><label for="description">{{$lang('addvocalFormDescription')}} : </label></b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-textarea id="description"
                                                    v-model="form.description"
                                                    :state="error.description"
                                                    @input="changeinput('description')"
                                                    :placeholder="$lang('addvocalFormDescription')">
                                            </b-form-textarea>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">
                                        <div id="vocal_recoder_core"></div>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group>
                            <b-form-radio :disabled="disabled.trello" v-model="compte" name="some-radios" value="trello">Trello</b-form-radio>
                            <b-form-radio :disabled="disabled.infusionsoft" v-model="compte" name="some-radios" value="infusionsoft">Infusionsoft</b-form-radio>
                        </b-form-group>

                        <div v-if="compte=='trello'">
                            <b-form-group>
                                <b-input-group>
                                    <b-row style="width: 100%;">
                                        <b-col sm="12">Pour : </b-col>
                                        <b-col sm="12">
                                            <pour-trello v-if=" this.trello && this.trello.id " :trello="this.trello.id"></pour-trello>
                                            <b-form-group >
                                                <b-form-radio-group
                                                    v-model="form.membre"
                                                    :options="trellos"
                                                    buttons
                                                    >
                                                </b-form-radio-group>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-input-group>
                            </b-form-group>
                        </div>
                        <div v-if="compte=='infusionsoft'">
                            <b-form-group>
                                <b-input-group>
                                    <b-row style="width: 100%;">
                                        <b-col sm="12">Pour : </b-col>
                                        <b-col sm="12">
                                            <pour-infusionsoft v-if="this.infusionsoft && this.infusionsoft.id " :infusionsoft="this.infusionsoft.id"></pour-infusionsoft>
                                            <b-form-group>
                                                <b-form-radio-group
                                                    v-model="form.membre"
                                                    :options="infusionsofts"
                                                    buttons
                                                    >
                                                </b-form-radio-group>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-input-group>
                            </b-form-group>
                        </div>

                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Priorité : </b-col>
                                    <b-col sm="12">
                                        <b-form-group  >
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

                        <b-form-group>
                            <b-input-group>
                                <b-row style="width: 100%;">
                                    <b-col sm="12">Date : </b-col>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <b-form-input
                                                    v-model="form.date"
                                                    :state="error.date"
                                                    type="date"
                                                    @change="changeDate">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-input-group>
                        </b-form-group>

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
    
                        <b-row style="margin-botton: 2rem ;">
                            <b-col cols="12">
                                <b-button class="mt-3" @click="create">Créer</b-button>
                            </b-col>
                        </b-row>

                    </b-form>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import { get, post } from './lib/api'

    import recoder from '../libs/recoder'
    import { BinaryClient } from 'binaryjs-client';
    import { wav } from 'wav';
    import recordRTC from 'recordRTC';
    import makeid from '../libs/makeid';
    import moment from 'moment';

    export default {
        name: 'App', 
        data(){
            return {
                compte : 'trello',
                application : [] , 
                infusionsoft : null , 
                infusionsofts : [] , 
                trello : null , 
                trellos : [] , 
                disabled : {
                    trello : false , 
                    infusionsoft : false , 
                },
                error : {
                    title : null,
                    description : null,
                },
                form: {
                    title : 0 ,
                    description : '',
                    membre : 0 ,
                    prioriter : 0 ,
                    date : '' , 
                    contactId : '' , 
                    search : '' , 
                },
                txt: {
                    title : '',
                    description : '',
                },
                prioriters : [
                    { text: 'Critical', value: 0 },
                    { text: 'Essential', value: 1 },
                    { text: 'Non-essential', value: 2 },
                ],
                optionsTitle : [
                    { value: 0, text: 'Note générale' },
                    { value: 1, text: 'Appel commercial' },
                    { value: 2, text: 'SAV' },
                ],
                suggestions : [
                ],
                //note vocal id 
                NOTEID : null , 
            }
        },
        computed : {
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

            changeinput : function ( champ ) {
                if ( this.form[champ] ) {
                    this.error[champ]=null ; 
                }
            },

            async create(){

                let compteId = null ;
                if ( this.compte == 'trello' ) {
                    compteId = this.trello.compteId ; 
                }else if ( this.compte == 'infusionsoft' ) {
                    compteId = this.trello.compteId ; 
                }else{
                    return false ; 
                }

                let url = window.urlapplication +'/external' ;
                let find = await fetch( url , {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ compteId , type : this.compte , title : this.optionsTitle[this.form.title].text , description : this.form.description , pour : this.form.membre, prioriter : this.form.prioriter, date : this.form.date, contactId : this.form.contactId })
                }) ;

                if ( find.ok ) {
                    let data = await find.json() ;
                    if ( ! data.success ) {
                        return ;
                    }
                    //enregistrement des vocal apres création des notes sur l'application qui a été selectionner 
                    let url = window.urlapplication+'/save/'+this.NOTEID+'?typeId='+compteId ;
                    //@todo :seulement pour trello  
                    let id = decodeURIComponent( data.data.url.replace('https://trello.com', '') ).split('/').join('_').replace('/', '_') ; 
                    console.log( data.data , id )

                    let set = await fetch( url , {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ type : 'trello', newId : id , text : this.form.description , title : this.optionsTitle[this.form.title].text })
                    }) ;
                    if ( set.ok ) {
                        window.location.reload( true ) 
                    }
                }
                
            },  
            
            initRecoder(){
                
                //récupération des elements on on ajoute l'enregistreur 
                let url = window.urlapplication  ;
                let serveur =  url.replace(/(^\w+:|^)\/\//, '');
                serveur = serveur.replace(/[0-9]/g, '');
                serveur = serveur.replace(/:([^:]*)$/,'$1');

                function convertFloat32ToInt16(buffer) {
                    let l = buffer.length;
                    let buf = new Int16Array(l);
                    while (l--) {
                        buf[l] = Math.min(1, buffer[l])*0x7FFF;
                    }
                    return buf.buffer;
                }

                let rec = recoder( url ) ; 
                let stream = null ;
                let client = null ; 
                let listeAfter = false ; 
                let onupload = false ; 

                rec.connexion = function ( data ) {
                    if( listeAfter )
                        return true

                    listeAfter = true ; 
                    //on veut connecter au serveur pour commencer un nouvelle notes 
                    let {
                        NOTEID , 
                        type , 
                        typeId , 
                        contactId
                    } = data  ;  
                    setTimeout(function () {
                        client = new BinaryClient( 'ws://'+serveur+':9001?unique='+NOTEID+'&type='+type+'&typeId='+typeId+'&contactId='+contactId ) ; 
                        client.on('open', function() {
                            stream = client.createStream();
                            rec.connexionSoketNoteVocaux() ;
                            return listeAfter = false 
                        })
                    }, 1000 );
                }

                rec.saveStream = function ( data ) {
                    stream.end();
                    stream = null ;     
                   
                }

                rec.stream = function ( data ) {
                    let arr = new Float32Array(  data );
                    stream.write(convertFloat32ToInt16( arr )); 
                }

                rec.close = function ( data ) {
                    onupload = data ; 
                }

                let btnAddNote = $('#vocal_recoder_core')
                btnAddNote.before( rec.recorder() ) ; 
                //initialisation du recoder 
                this.NOTEID = rec.init() ; 

                $(window).on("beforeunload", function() { 
                    if ( !client ) 
                        return false ; 
                    //enregistrement avant close client 
                    client.close() ;
                    client = null ; 
                })
            },

            //ici on change la valeur des date 
            changeDate(){ 
                this.form.prioriter = null ; 
            }, 

            changePrioriters( p ){

                if ( this.form.prioriter == 0 ) {
                    this.form.date = moment().clone().add(1, 'day').format('YYYY-MM-DD')  
                } else if ( this.form.prioriter == 1 ) {
                    this.form.date = moment().clone().add(2, 'day').format('YYYY-MM-DD')  
                }else if ( this.form.prioriter == 2 ) {
                    this.form.date = moment().clone().add(3, 'day').format('YYYY-MM-DD') 
                }

            }, 

            async findallteams(){

                let url = window.urlapplication + '/pour'; 
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    let trellos = data.filter(function (e) {
                        if ( e.type == "trello" ) {
                            return true ; 
                        }
                        return false ; 
                    })
                    trellos = trellos.map(function ( e ) {
                        return {
                            value: e.id,
                            text: e.name,
                        }
                    })
                    this.form.membre = trellos[trellos.length-1].value
                    this.trellos = trellos ;
                    //////////
                    let infusionsofts = data.filter(function (e) {
                        if ( e.type == "infusionsoft" ) {
                            return true ; 
                        }
                        return false ; 
                    })
                    infusionsofts = infusionsofts.map(function ( e ) {
                        return {
                            value: e.id,
                            text: e.name,
                        }
                    })
                    infusionsofts.push({
                        value: 'default',
                        text: 'Note',
                    }) 
                    this.infusionsofts = infusionsofts ;

                }

            },

            //récupération des listes de tout les applications
            async findInfusionsoft(){

                let url = window.urlapplication + '/application'; 
                let find = await fetch( url )  ;  
                if ( find.ok ) { 
                    this.application = await find.json() ; 
                    let trello = this.application.filter( e => e.type ==='trello' )
                    if ( trello.length ) {
                        this.trello = trello[0]; 
                        this.disabled.trello = false ;
                    }else{
                        this.disabled.trello = true ;  
                    }
                    let infusionsoft = this.application.filter( e => e.type ==='infusionsoft' )
                    if ( infusionsoft.length ) {
                        this.infusionsoft = infusionsoft[0]; 
                        this.disabled.infusionsoft = false ;
                        //récupération de la liste des membres d'infusionsoft 
                        this.findInfusionsoftMembre() ; 
                    }else{
                        this.disabled.infusionsoft = true ;
                    }

                    this.findallteams() ; 
                }

            },

            //récupération de la liste des membres d'infusionsoft 
            async findInfusionsoftMembre(){
                
                let url = window.urlapplication + '/infusionsoft/contacts/'+this.infusionsoft.id; 
                let find = await fetch( url )  ;  
                if ( find.ok ) { 
                    let optionsConctats = await find.json() ; 
                    this.form.contactId = optionsConctats[optionsConctats.length-1].value ;
                    this.suggestions = optionsConctats ; 
                }
                
            },

            apply_contact( info ){

                this.form.contactId = info.value ;
                $('#popover-reactive-search').trigger('click') ; 

            }

        },
        mounted(){
            this.initRecoder() ; 
            this.findInfusionsoft() ; 
            //initialisation de la varriable date 
            this.changePrioriters(0) ; 
        },
        created(){
            
        }
    }
</script>
<style>
    
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

</style>