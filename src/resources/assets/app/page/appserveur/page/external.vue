<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', minHeight: '380px' , maxWidth : '992px' }">
        <a-row type="flex" justify="center">
            <a-col :xs="24" style="max-width: 500px;" >
                <h1>{{$lang('page_external_title')}}</h1>
                <p>{{$lang('page_external_description')}}</p>
                <a-divider dashed />
                <a-form :layout="'vertical'">
                    <a-form-item>
                        <a-radio-group
                            buttonStyle="solid"
                            style="width: 100%;"
                            v-model="compte">
                            <a-radio-button :disabled="!option.external.trello" style="width: 50%;" value="trello">
                                Trello
                            </a-radio-button>
                            <a-radio-button :disabled="!option.external.infusionsoft" style="width: 50%;" value="infusionsoft">
                                Infusionsoft
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item> 
                    <a-form-item>
                        <note-vocal :placedata="placeVocal"></note-vocal>
                    </a-form-item>
                    <a-form-item v-if="pour.trello.length||pour.infusionsoft.length" :label="$lang('Pour ')" style="width: 100%;">
                        <a-radio-group class="select-pour" buttonStyle="solid" v-model="form.pour" style="width: 100%;">
                            <a-radio-button class="select-pour-option" v-for="item in (pour.trello.length?pour.trello:pour.infusionsoft)" :key="item.id" :value="item.id" :style="pour.trello.length?styleSelect(pour.trello):styleSelect(pour.infusionsoft)">{{item.name}}</a-radio-button>
                        </a-radio-group>
                    </a-form-item> 
                    <a-form-item v-if="compte=='infusionsoft'" :label="$lang('Contact IFS ')">
                        <a-select
                            dropdownClassName="suggestion_dropdown"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            v-bind:class="{ active: opensuggestion }"
                            class="opensuggestion"
                            style="width: 100%"
                            @change="handleChange"
                            @search="handleSearch"
                            @blur="closesuggestionEvent"
                            @popupScroll="suggestionScroll"
                            @dropdownVisibleChange="dropdownVisibleChange"
                            :autoClearSearchValue="true" 
                            :defaultValue="defaultContact"
                            :filterOption="filterConctats">
                            <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
                            <a-select-option :key="item.id" :value="item.id" v-for="item in suggestion">
                                <span class="item-suggestion" v-html="highlight( item )"></span>
                            </a-select-option>
                            <a-select-option class="more-search" disabled="disabled" v-if=" ( form.contactPage < form.contactTotal ) && suggestion.length " :key="'more'" :value="'more'" >
                                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;height: 36px;font-weight: bold;line-height: 36px;text-align: center; cursor: none;">
                                    <a-spin style="display: flex;padding: 5px 12px;" :tip="form.contactPage+' / '+form.contactTotal" v-if="loading_more" >
                                        <a-icon slot="indicator" type="loading" style="font-size: 22px; margin-right: 10px;" spin />
                                    </a-spin>
                                </div>
                            </a-select-option>
                        </a-select>
                    </a-form-item> 
                    <a-form-item v-if="compte=='trello'" :label="$lang('Priorité ')" style="width: 100%;">
                        <a-radio-group @change="prioriterChanger" class="select-pour" buttonStyle="solid" v-model="form.prioriter" style="width: 100%;">
                            <a-radio-button class="select-pour-option" v-for="item in pour.labels" :key="item.id" :value="item.id" :style="styleSelect(pour.labels)">{{item.name}}</a-radio-button>
                        </a-radio-group>
                    </a-form-item>   
                    <a-form-item v-if="compte=='infusionsoft'" :label="$lang('Priorité ')" style="width: 100%;">
                        <a-radio-group @change="prioriterChanger" class="select-pour" buttonStyle="solid" v-model="form.prioriter" style="width: 100%;">
                            <a-radio-button class="select-pour-option ellipsis" v-for="item in prioriters" :key="item.id" :value="item.id" :style="styleSelect(prioriters)">{{item.name}}</a-radio-button>
                        </a-radio-group>
                    </a-form-item>   
                    <a-form-item :label="$lang('Date ')">
                        <a-date-picker style="width: 100%;" v-model="form.date" @change="changeDate"/>
                    </a-form-item>
                    <a-form-item :label="$lang('Categorie ')">
                        <a-select defaultValue="comptabilite" v-model="form.categorie">
                            <a-select-option v-for="item in placedata.categorieArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='comptabilite'" :label="$lang('Comptabilite')">
                        <a-select v-model="form.comptabilite">
                            <a-select-option v-for="item in placedata.comptabiliteArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                        <a-textarea v-if="form.comptabilite=='_____'" v-model="form.comptabilite_autre" :placeholder="$lang('Text ici')" :rows="4"/>
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='sav'" :label="$lang('SAV')">
                        <a-select v-model="form.sav">
                            <a-select-option v-for="item in placedata.savArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                        <a-textarea v-if="form.sav=='_____'" v-model="form.sav_autre" :placeholder="$lang('Text ici')" :rows="4"/>
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Commercial')">
                        <a-select v-model="form.commercial">
                            <a-select-option v-for="item in placedata.commercialArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                        <a-textarea v-if="form.commercial=='_____'" v-model="form.commercial_autre" :placeholder="$lang('Text ici')" :rows="4"/>
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='autre'" :label="$lang('Autre')">
                        <a-textarea v-model="form.autre" :placeholder="$lang('Autre')" :rows="4"/>
                    </a-form-item>
                    <a-form-item :label="$lang('Produit')">
                        <a-select v-model="form.produit">
                            <a-select-option v-for="item in placedata.produitArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Vitesse Closing')">
                        <a-select v-model="form.vitesseclosing">
                            <a-select-option v-for="item in placedata.vitesseclosingArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Soncas')">
                        <a-select mode="multiple" v-model="form.socas">
                            <a-select-option v-for="item in placedata.soncasArray" :key="item.value" :value="item.value">
                                {{item.key}}
                            </a-select-option>
                        </a-select> 
                    </a-form-item>
                    <a-form-item :label="$lang('Commentaire')">
                        <a-textarea :placeholder="$lang('commentaire')" v-model="form.comment" :rows="4"/> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Douleur émotionnelle')">
                        <a-textarea :placeholder="$lang('douleur émotionnelle')" v-model="form.demotionnelle" :rows="4"/> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Plaisir')">
                        <a-textarea :placeholder="$lang('plaisir')" v-model="form.plaisir" :rows="4"/> 
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Motivation')">
                        <a-input-number style="width: 100%;" :min="0" :max="10" placeholder="Motivation 0 à 10" v-model="form.motivation" />
                    </a-form-item>
                    <a-form-item v-if="form.categorie=='commercial'" :label="$lang('Objections')">
                        <a-textarea :placeholder="$lang('objections')" v-model="form.objections" :rows="4"/> 
                    </a-form-item>
                    <a-button type="primary" icon="table" @click="create" block :loading="loading_btn" >Valider</a-button>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>
<script>
 
    import application from '../store/application' ; 
    import external from '../store/external' ; 
    import exoption from '../store/exoption' ; 
    import trello from '../store/trello' ; 
    import placedata from '../libs/placedata' ; 
    import pour from '../store/pour' ; 
    import note from '../store/note' ; 
    import form from '../store/form' ; 
    import index from '../store/index' ; 
    import infusionsoft from '../store/infusionsoft' ; 
    import makeid from '../libs/makeid' ; 
    import wait from '../libs/wait' ; 
    import formateDescription from '../libs/formateDescription' ; 
    import moment from 'moment' ; 

    export default {
        data(){
            return {
                //option de la page mobile ( page trello et ou page infusionsoft a utiliser )
                option : exoption.stade , 
                placedata : placedata() , 
                pour : pour.stade ,
                infusionsoft : infusionsoft.stade , 
                application : application.stade , 
                compte : '',
                loader : true ,
                form: {
                    categorie : 'comptabilite' , 
                    comptabilite : 'Envoyer document' ,
                    comptabilite_autre : '' ,
                    sav : 'Installation logiciel' , 
                    sav_autre : '' , 
                    commercial : 'Envoyer devis' , 
                    commercial_autre : '' , 
                    produit : 'Aumscan 4' , 
                    vitesseclosing : 0 , 
                    socas : [] ,  
                    comment : '' , 
                    demotionnelle : '' ,
                    autre : '' , 
                    //
                    pour : '' ,
                    prioriter : '' ,
                    date : null , 
                    contactId : null , 
                    contactSearch : '' , 
                    contactPage : 1 , 
                    contactTotal : 1 , 
                    note : null , 
                    //note vocal id 
                    NOTEID : null , 
                    plaisir : '' ,
                    motivation : '' ,
                    objections : '' ,
                },

                prioriters : [
                    { name: 'Critical', id: 1 },
                    { name: 'Essential', id: 2 },
                    { name: 'Non-essential', id: 3 },
                ],
                
                //le note vocal est enregistrer ici 
                fetching : false , 
                loading_btn : false , 
                suggestion : [] , 
                loading_more : false , 
                opensuggestion : false , 
                suggestionDOM : null , 
                suggestionLongeur : 0 ,
                suggestionLoadSearch : false , 
                defaultContact : null , 
                placeVocal : null , 
                tempstemp : null ,
            }
        },
        watch : {
            compte : async function () {
                if ( this.compte == 'trello' ) { 
                    await pour.allPour( this.option.external.trello )
                    this.pour.trello && this.pour.trello[0] ? this.form.pour = this.pour.trello[0].id :'';
                    this.pour.labels && this.pour.labels[0] ? this.form.prioriter = this.pour.labels[0].id :'';
                    this.prioriterChanger() ; 
                }else if ( this.compte == 'infusionsoft' ) {
                    this.fetching = true ;
                    await pour.allPour( this.option.external.infusionsoft )
                    this.pour.infusionsoft && this.pour.infusionsoft[0] ? this.form.pour = this.pour.infusionsoft[0].id :'';
                    this.form.prioriter = 2 ; 
                    this.prioriterChanger() ;
                    let [ e , d ] = await infusionsoft.allContact( this.option.external.infusionsoft , '' , this.defaultContact ) ;
                    console.log( d ) ; 
                    this.form.contactTotal = d.maxpage ; 
                    console.log( 'compte : async function' , this.infusionsoft.contacts ) ; 
                    this.fetching = false ;
                    this.suggestionLoadSearch = true ; 
                    this.infusionsoft.contacts.length?this.handleSearch(''):'' ; 
                }
            },
        },
        computed : {
            contacts : {
                get : function () {
                    return this.suggestion ; 
                },
                set : function ( res ) {
                    this.suggestion = [...res]
                    return this.suggestion
                }
            },
        },
        methods : {

            suggestionScroll : async function( e , i ) {
                let offsetHeight = this.suggestionDOM.offsetHeight
                let scrollTop = this.suggestionDOM.scrollTop
                if ( this.suggestionDOM && ( (this.suggestionDOM.scrollTop + offsetHeight) >= this.suggestionDOM.scrollHeight ) && ( this.suggestionLongeur < this.suggestionDOM.scrollHeight ) && this.suggestionLoadSearch ) {
                    this.suggestionLongeur = this.suggestionDOM.scrollHeight ;
                    console.log( 'NEXT ......' , this.suggestionDOM.scrollTop + offsetHeight , ' === ' , this.suggestionDOM.scrollHeight )
                    let j =  await this.handleMore() ; 
                    setTimeout(() => {
                        this.suggestionDOM.scrollTop = scrollTop ;
                    }, 100); 
                }
            },

            watchDOM : function ( select , callback ) {
                let sel = null ; 
                sel = document.querySelector( select ) ;
                if ( sel ) {
                    callback( sel ) ; 
                } else {
                    setTimeout(()=> {
                        this.watchDOM( select , callback ) 
                    },500);
                }
            },

            dropdownVisibleChange : function ( e , i ) {
                if ( !e ) 
                    return this.handleSearch('')
                this.opensuggestion = true ; 
                this.$nextTick(()=>{
                    this.watchDOM( ".suggestion_dropdown ul" , ( el )=>{
                        this.suggestionDOM = el ; 
                    })
                }); 
            },

            closesuggestionEvent : function () {
                this.opensuggestion = false ; 
            },

            highlight : function ( item ) {
                var search = this.contactSearch ;
                search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var re = new RegExp(search, 'gi');
                if (search.length > 0)
                    return `<span class="name_suggestion">${(item.text.replace(re, `<i class="mark">$&</i>`))}</span><span class="email_suggestion_title"> <strong>Email :</strong></span><span class="email_suggestion"><strong></strong>${item.email_addresses.map(e=>(e.email.replace(re, `<i class="mark">$&</i>`))).join(',')}</span>`;
                else return `<span class="name_suggestion">${item.text}</span><span class="email_suggestion_title"> <strong>Email :</strong></span><span class="email_suggestion"><strong></strong>${item.email_addresses.map(e=>e.email).join(',')}</span>`;
            },

            filterConctats : function ( input, option ) {
                return true
            },

            handleChange : function ( value ) {
                this.form.contactId = value ; 
            },

            handleMore : async function () {
                this.form.contactPage++  ;
                this.fetching = true ; 
                this.loading_more = true ; 
                let [ e , s ] = await infusionsoft.moreContact( this.option.external.infusionsoft , this.contactSearch , this.form.contactPage , this.defaultContact ) ;
                this.contacts = this.infusionsoft.contacts ; 
                this.loading_more = false ; 
                this.fetching = false ; 
                return s ; 
            },

            handleSearch : function ( search ) {
                this.suggestionLongeur = 0 ; 
                this.form.contactPage = 1 ; 
                this.contactSearch = search ;
                this.suggestionLoadSearch = false ; 
                this.fetching = true ; 
                this.contacts = [] ; 
                clearTimeout( this.tempstemp )
                this.tempstemp = setTimeout( async () => {
                    clearTimeout( this.tempstemp )
                    let [ e , d ] =  await infusionsoft.allContact( this.option.external.infusionsoft , this.contactSearch , this.defaultContact ) ;
                    this.form.contactTotal = d.maxpage ;
                    this.contacts = this.infusionsoft.contacts ; 
                    this.fetching = false ; 
                    this.suggestionLoadSearch = true ; 
                }, 500 );
            }, 
            
            prioriterChanger : function ( ) {
                let add = this.form.prioriter ;
                this.compte == 'trello'?
                this.pour.labels.forEach( e => {
                    if ( e.id == this.form.prioriter ) {
                        add = parseInt( e.cardId ) ;  
                    }
                }): 
                add = this.form.prioriter
                this.form.date = moment().clone().add( add , 'day' )
            },

            styleSelect :  function ( data ) {
                if ( data.length == 2 || data.length == 1 ) {
                    return { width : '50%' }
                }else if ( data.length == 3 ) {
                    return { width : '33.33333333333333333333%' }
                }else if ( data.length > 3 && data.length< 6) {
                    return { width : '50%' }
                }else if ( data.length >= 6 ) {
                    return { width : '33.33333333333333333333%' }
                }
            },

            formateTitle : function () {
                return  placedata('categorieArray' , this.form.categorie)+" "+this.form.produit+" -"+( this.form.categorie !== 'autre' ? (this.form[this.form.categorie]=='_____'? this.form[this.form.categorie+"_autre"] : this.form[this.form.categorie]) : this.form.autre )
            }, 

            formateForm : function () {
                let body = [] ; 
                let doemotion = this.form.demotionnelle
                body = [ ...body , { type : 'text' , name : 'demotionnelle' , value : doemotion } ]
                let autre = this.form.autre 
                body = [ ...body , { type : 'text' , name : 'autre' , value : autre } ]
                let comment = this.form.comment 
                body = [ ...body , { type : 'text' , name : 'comment' , value : comment } ]
                let vitesse_closing_select = this.form.vitesseclosing 
                body = [ ...body , { type : 'text' , name : 'vitesseclosing' , value : vitesse_closing_select } ]
                let soncas_select = this.form.socas 
                body = [ ...body , { type : 'text' , name : 'socas' , value : ( soncas_select?soncas_select.join(','):'' ) } ]
                let produit_select = this.form.produit 
                body = [ ...body , { type : 'text' , name : 'produit' , value : produit_select } ]
                let commercial_autre = this.form.commercial_autre 
                body = [ ...body , { type : 'text' , name : 'commercial_autre' , value : commercial_autre } ]
                let commercial = this.form.commercial  
                body = [ ...body , { type : 'text' , name : 'commercial' , value : commercial } ]
                let sav_autre = this.form.sav_autre 
                body = [ ...body , { type : 'text' , name : 'sav_autre' , value : sav_autre } ]
                let sav = this.form.sav 
                body = [ ...body , { type : 'text' , name : 'sav' , value : sav } ]
                let comptabilite_autre = this.form.comptabilite_autre 
                body = [ ...body , { type : 'text' , name : 'comptabilite_autre' , value : comptabilite_autre } ]
                let comptabilite = this.form.comptabilite 
                body = [ ...body , { type : 'text' , name : 'comptabilite' , value : comptabilite } ]
                let categorie_select = this.form.categorie 
                body = [ ...body , { type : 'text' , name : 'categorie' , value : categorie_select } ]
                body = [ ...body , { type : 'text' , name : 'plaisir' , value : this.form.plaisir } ]
                body = [ ...body , { type : 'text' , name : 'motivation' , value : this.form.motivation } ]
                body = [ ...body , { type : 'text' , name : 'objections' , value : this.form.objections } ]
                return body ;
            },

            formateDescription : function ( form ) {
                let text = '' ; 
                for( let { name , value } of form ){
                    if ( name == 'soncas-select' && value !== '') {
                        let val = placedata('soncasArray')  ;
                        text += 'SONCAS : '+"\n"
                        for( let pitem of val ){
                            pitem.value==value?text += ` - ${pitem.key} `+"\n":'';
                        }
                    }else if( name == 'vitesse-closing-select' && value ){
                        text += 'Vitesse Closing : '+"\n";
                        let ex = value.split(',') ; 
                        let val = placedata('vitesseclosingArray')  ;
                        for( let i of ex ){
                            for( let pitem of val ){
                                pitem.value==i?text += ` - ${pitem.key}</br>`:'';
                            }
                        }
                    }else if( name == 'doemotion' && value !== ''){
                        text += 'Douleur émotionnelle : '+"\n"
                        text += ` - ${value}`+"\n"
                    }else if( name == 'comment' && value !== ''){
                        text += 'Commentaire : '+"\n"
                        text += ` - ${value} `+"\n"
                    }
                }
                return text
            },

            errorCreate(){
                alert( 'ERREUR DE CR2ATION ' )
                this.loading_btn = false ;
            },

            //création de card dans trello
            trelloCard : async function () {
                this.loading_btn = true ; 
                let body = {
                    title : this.formateTitle() , 
                    compteId : this.option.external.trello , 
                    description : this.formateDescription(this.formateForm()) , 
                    pour : this.form.pour , 
                    prioriter : this.form.prioriter , 
                    date : this.form.date.format('YYYY-MM-DDTHH:mm:ssZ'), 
                }
                console.log( body ) ; 
                let [ err , note ] = await trello.card( body )  ;
                if ( err ) {
                    return this.errorCreate() ; 
                } 
                return note

            },

            //création de note d'infusionsoft avec la mise a jour 
            ifsnoteCreate : async function () {
                if ( !this.form.contactId ) {
                    return alert(' Contact Infusionsoft oblogatoire')
                }
               this.loading_btn = true ; 
                let body = {
                    title : this.formateTitle() , 
                    compteId : this.option.external.infusionsoft , 
                    description : 'https://therapiequantique.net/read/'+this.form.NOTEID , 
                    pour : this.form.pour , 
                    prioriter : this.form.prioriter , 
                    date : this.form.date.format('YYYY-MM-DDTHH:mm:ssZ'), 
                    contactId : this.form.contactId , 
                }
                let [ err , note ] = await infusionsoft.note( body ) ;
                if ( err ) {
                    this.errorCreate() ; 
                } 
                return note
            },

            async create(){
                if ( ! this.form.note ) 
                    return alert(' Le vocal est obligatire')
                let noteSave = null
                this.compte=='trello'?noteSave = await this.trelloCard():noteSave = await this.ifsnoteCreate() ; 
                if ( !noteSave || (!noteSave.url&&this.compte == 'trello') ) {
                    return this.errorCreate() ; 
                }
                //si le note que vous évez crée est un card de trello, alors on fait la recréation des ID 
                let id = null ; 
                this.compte == 'trello' ? id = decodeURIComponent( noteSave.url.replace('https://trello.com', '') ).split('/').join('_').replace('/', '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "") : '' 
                console.log( noteSave );
                //création de note dans notre application 
                let url = '/upload?' ; 
                url += 'NOTEID='+this.form.NOTEID
                url += '&type='+(this.compte=='trello'?'trello':'infusionsoft') 
                url += '&appId='+(this.compte=='trello'?this.option.external.trello:this.option.external.infusionsoft)
                url += '&nativeId='+noteSave.id
                url += '&attache='+(this.compte=='trello'?'card':(this.form.pour=="default"?'note':'task'))  
                if ( id ) 
                    url += '&newId='+id
                url += '&text='+''
                url += '&title='+''
                console.log( url ) ; 
                if ( false ) {
                    url += '&update='+true
                }
                if ( this.form.file ) {
                    url += '&file='+true
                }else{
                    url += '&file='+false
                }
                let formData = new FormData();
                formData.append('file', this.form.note );
                let [ err , vocal ] = await note.noteCreate( url , formData )
                console.log( vocal ) ;
                if ( err ) {
                    alert('@TODO:il y a une erreur')
                } 
                let [ error , formSave ] = await form.formCreate( vocal.id , this.formateForm() )
                console.log( formSave );
                console.log( 'Upload a formulaire' )
                let [ errorFlash , flash ] = await index.setFlash( { create : true } ) ;
                if ( flash ) {
                    window.location.href= window.urlapplication + "/read/"+ ( id ? id : this.form.NOTEID)
                }
               this.loading_btn = false ; 
            },  

            //ici on change la valeur des date 
            changeDate(){ 
                this.form.prioriter = null ; 
            }, 

            async trellonote( n ){
                let [ err , note ] = await trello.itemCard( n.nativeId , n.ApplicationId ) ;
                console.log( note )
                if ( !note.name ) 
                    return this.existe = false ;
                this.title = note.name ; 
                return note  
            },

            async ifsfindnote( n ){
                let err , note ; 
                if ( n.attache == 'note' ) 
                    [ err , note ] = await infusionsoft.itemNote( n.nativeId , n.ApplicationId ) ;
                else if ( n.attache == 'task' ) 
                    [ err , note ] = await infusionsoft.itemTask( n.nativeId , n.ApplicationId ) ;  

                //defaultValueContact
                //récupération des listes de tout les contacts 
                //si dans la liste des contacts, on n'a pas le contact si contre 
                //on ajoute dans le première argument 
                //s'il existe, on transforme dans la premièer argument
                this.defaultContact = note.contact.id ; 
                this.compte = this.application.item.type ; 
                if ( ! note.title ) 
                    return this.existe = false ;
                this.existe = true ; 
                return note  
            },

            defaultForm( form ){
                for( let item of form ){
                    if ( item.name == 'socas') {
                        this.form[ item.name ] = item.value.split(',').map( e => parseInt( e ) )
                    }else{
                        let place = parseInt( this.form[ item.name ] )
                        this.form[ item.name ] = isNaN( place ) ? item.value : place;
                    }
                }
            },

            async init(){
                await this.$nextTick() ; 
                this.form.NOTEID = this.$route.params.id?this.$route.params.id:makeid(12) ;  
                this.loader = false;
                console.log( this.$route.params.id )
                if ( this.$route.params.id ) {
                    let [ err , noteItem ] = await note.find( this.$route.params.id ) ;
                    console.log( noteItem )
                    this.placeVocal = noteItem.unique 
                    if ( err || !noteItem || (noteItem && !noteItem.nativeId) ) {
                        return this.existe = false ;
                        //note n'existe pas on vous redirige a la page nouvelle note 
                    }
                    await application.itemApplication( noteItem.ApplicationId ) ; 
                    //this.application.item
                    if ( noteItem.type == "infusionsoft" ) {
                        this.option.external.trello = null ; 
                        this.option.external.infusionsoft = noteItem.ApplicationId ; 
                        this.ifsfindnote( noteItem )
                    } 
                    if ( noteItem.type == "trello" ) {
                        this.option.external.infusionsoft = null ;
                        this.option.external.trello = noteItem.ApplicationId ;
                        this.trellonote( noteItem )
                        this.compte = this.application.item.type ; 
                    } 
                    //récupération des formulaires de l'application 
                    let [ errorForm , formNote ] = await form.all( noteItem.id ) ; 
                    if ( errorForm ) {
                        console.log( errorForm )
                        return
                    }
                    this.defaultForm( formNote ) ; 
                }else{
                    //récupération des informations de base de l'application 
                    //récupération de trello et d'infusionsoft a utiliser dans la page mobile
                    //si tout les deux n'existe pas, alors on vous redirige vers la page options de l'applications 
                    await exoption.findOption() ; 
                    if ( !this.option.external.infusionsoft&&!this.option.external.trello ) {
                        //ouvrire la page option 
                        return this.$router.push({ name: 'option' }) 
                    }
                    this.option.external.infusionsoft?this.compte='infusionsoft':this.compte='trello' ;
                }               
            }

        },
        mounted(){
            this.init() ; 
        },
        created(){
            this.on('note-vocal-changed',( note ) => {
                this.form.note = note ;
                console.log( '--- NOTE' , this.form.note ) 
            })
        }
    }

</script>
<style>
    .select-pour-option, .select-pour-option *{
        border-radius: 0px !important;
    }
    .highlight {
        background-color: yellow;
    }
    li .name_suggestion{
        display: block !important;
    }
    li .email_suggestion{
        display: block !important;
    }
    li .email_suggestion_title{
        display: none !important; 
    }
    li .mark {
        font-style: normal;
        padding: 0em;
        background-color: #fdffca;
        font-weight: 600;
    }
    .more-search{
        position: relative;
        height: 30px !important;
        line-height: 30px !important;
    }

    .more-search a:hover{
        background-color: #40a9ff ; 
        color: #FFF !important ; 
    }
</style>