<template>
	<div>
		<a @click.prevent.stop="newpour=true" href="#">OPTION</a>
		<b-modal v-model="newpour" hide-footer>
            <template slot="modal-title">
                <span>Edition de 'POUR' de infusionsoft</span>
            </template>
            <b-table :fields="fields" striped hover :items="pours">
                <template slot="action" slot-scope="row">
                    <b-button size="sm" @click="deletePour(row)" >
                        DELETE
                    </b-button>
                </template>
            </b-table>
            <div class="" style="width: 100%; text-align: center;">
            	<b-button id="popover-reactive-add-pour" variant="primary" ref="button">
	                Add team
	            </b-button>
	            <b-popover target="popover-reactive-add-pour"  triggers="click" :triggers="'click'" variant="primary">
	            	<b-form class="form-login" @submit.prevent.stop="''">
	                    <b-form-group>
	                        <b-input-group>
	                            <b-row style="width: 100%;">
	                                <b-col sm="4"><label for="name">{{$lang('appInfusionsoftName')}} : </label></b-col>
	                                <b-col sm="8">
	                                    <b-form-group>
	                                        <b-form-input id="name"
	                                                v-model="form.name"
	                                                :state="error.name"
	                                                @input="changeinput('name')"
	                                                :placeholder="$lang('externalOptionTrelloName')">
	                                        </b-form-input>
	                                    </b-form-group>
	                                </b-col>
								</b-row>
	                            <b-row style="width: 100%;">
	                                <b-col sm="4"><label for="name">{{$lang('externalOptionTrelloAppId')}} : </label></b-col>
	                                <b-col sm="8">
	                                    <b-form-group>
	                                        <b-form-select id="appId"
                                                v-model="form.appId"
                                                :state="error.appId"
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
	            </b-popover>            
            </div>
        </b-modal>
	</div>
</template>
<script>

    //@todo : Relier a un compte application trello 
	export default {
		props : ['infusionsoft'], 
		data(){
            return {
            	newpour : false , 
            	pours : [] , 
            	error : {
                    name : null,
                    appId : null , 
					cardId : null , 
                },
                form: {
                    name : '',
                    appId : '' , 
					cardId : '' , 
                },
                txt: {
                    name : '',
                    appId : '' , 
					cardId : '' , 
                },
                optionsUser : [] , 
				optionsCards : [] , 

				fields : [
                    { key: "name", label: "Name" },
                    { key: "appId", label: "Membre ID" },
                    'action',
                ]

            }
        },
        methods : {
        	onSubmit : async function () {

        		if( this.form.name && this.form.appId ){
        			let url = window.urlapplication+'/pour' ; 
                    console.log( url ) ; 
                    let add = await fetch(url , {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ type : 'infusionsoft' , name : this.form.name , appId : this.form.appId , cardId : null })
                    }) ;
                    if ( add.ok ) {
                    	//document.location.reload(true);
                        $('#popover-reactive-add-pour').trigger('click')
                    	await this.init() ;  
                        this.form.name = ''
                        this.form.appId = ''
                    }
        		}

        	},

            //suppression d'un pour en particulier 
            async deletePour( row ){

                let url = window.urlapplication+'/pour/'+row.item.id; 
                console.log( url ) ; 
                let add = await fetch(url , {
                    method: 'DELETE',
                }) ;
                if ( add.ok ) {
                    await this.init() ; 
                }

            },

        	//membre liste 
        	async poursListe(){

        		let url = window.urlapplication + '/pour'; 
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    if ( data.length !== undefined ) {
                        return this.pours = data.filter( e => e.type ==='infusionsoft' );
                    }
                }
                return this.pours = []; 

        	},

        	//s'il y une erreur dans les champs, on reset ces erreur a zero 
            changeinput : function ( champ ) {
                if ( this.form[champ] ) {
                    this.error[champ]=null ; 
                }
            },

            //charge la liste des utilisateur membre de trello 
            async findallteams( ){

                let url = window.urlapplication + '/team/application/'+ this.infusionsoft  ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    let optionsUser = data.map(function ( e ) {
                        return {
                            value: e.contactid,
                            text: e.fullname,
                        } 
                    })
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
                return [] ; 

            },

            async init(){
                let liste = await this.poursListe() ;
                this.findallteams() ; 
            }

        },
		created(){ 
			this.init() ;
		}
	}
</script>