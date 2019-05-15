<template>
    <div class="homepage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appHomeTitle')}}</h2>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <b-card-group deck>
                        <b-card v-for="item in applications" :key="item.id" footer-tag="footer" bg-variant="light" :header="item.name">
                            <b-card-text><h3>Recorder</h3></b-card-text>
                            <b-card-text><h3>00 : 12</h3></b-card-text>
                            <router-link :to="{name:'application', params : {id : item.id} }">
                                statistique
                            </router-link>
                            <em slot="footer">{{item.user_role}}</em>
                        </b-card>
                        <b-card @click="newcompte=true" class="text-center" bg-variant="light" >
                            ADD NEW
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>

        <b-modal v-model="newcompte" hide-footer>
            <!-- CREATION DE COMPTE INFUSIONSOFT -->
            <template slot="modal-title">
                <span v-if="compte=='infusionsoft'">Nouvelle infusionsoft</span>
                <span v-if="compte=='trello'">Nouvelle Trello</span>
            </template>
            <div class="d-block text-center">
                <b-form class="form-login" @submit.prevent.stop="onSubmit">
                    <b-form-group buttons >
                        <b-form-radio v-model="compte" name="some-radios" value="trello">Trello</b-form-radio>
                        <b-form-radio v-model="compte" name="some-radios" value="infusionsoft">Infusionsoft</b-form-radio>
                    </b-form-group>
                    <b-form-group v-if="compte=='infusionsoft'" >
                        <b-input-group>
                            <b-row style="width: 100%;">
                                <b-col sm="4"><label for="name">{{$lang('appInfusionsoftName')}} : </label></b-col>
                                <b-col sm="8">
                                    <b-form-group>
                                        <b-form-input id="name"
                                                v-model="form.name"
                                                :state="error.name"
                                                @input="changeinput('name')"
                                                :placeholder="$lang('appInfusionsoftName')">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group v-if="compte=='infusionsoft'" >
                        <b-input-group>
                            <b-row style="width: 100%;">
                                <b-col sm="4"><label for="compteId">{{$lang('appInfusionsoftUrlId')}} : </label></b-col>
                                <b-col sm="8">
                                    <b-form-group>
                                        <b-form-input id="compteId"
                                                v-model="form.compteId"
                                                :state="error.compteId"
                                                @input="changeinput('compteId')"
                                                :placeholder="$lang('appInfusionsoftUrlId')">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group v-if="compte=='trello'" >
                        <b-input-group>
                            <b-row style="width: 100%;">
                                <b-col sm="4"><label for="name">{{$lang('appTrelloName')}} : </label></b-col>
                                <b-col sm="8">
                                    <b-form-group>
                                        <b-form-input id="name"
                                                v-model="form.name"
                                                :state="error.name"
                                                @input="changeinput('name')"
                                                :placeholder="$lang('appTrelloName')">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-input-group>
                    </b-form-group>
                </b-form>
            </div>
            <!-- Note button -->
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <b-button class="mt-3" @click="newcompte=false">Annuler</b-button>
                    <b-button class="mt-3" @click="create">Créer</b-button>
                </b-col>
            </b-row>
            <!-- CREATION DE COMPTE TRELLO -->
            
        </b-modal>

    </div>
</template>
<script>
    export default {
        props : [ ], 
        data(){
            return {
                applications : [], 
                error : {
                    name : null,
                    compteId : null,
                },
                form: {
                    name : '',
                    compteId : '',
                },
                txt: {
                    name : '',
                    compteId : '',
                },
                newcompte : false ,
                compte : 'infusionsoft' ,
            }
        },
        methods : {

            //création de l'IFS 
            create : async function () {

                let url = window.urlapplication + '/application' ;
                let data = {} ;
                if ( this.form.name && this.form.compteId ) {
                    let { name , compteId } = this.form; 
                    data = { name , compteId , type : 'infusionsoft' } ; 
                }else if( this.form.name ){ 
                    let { name } = this.form; 
                    data = { name , type : 'trello' } ; 
                }else{
                    return
                }

                let uploadResponse = await fetch( url , {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( data )
                })
                
                if ( uploadResponse.ok ) { 
                    let data = await uploadResponse.json() ;
                    if ( data.success ) {
                        var win = window.open(data.success, '_blank');
                        win.focus();
                        this.newcompte = false ; 
                    } 
                }

            },

            //s'il y une erreur dans les champs, on reset ces erreur a zero 
            changeinput : function ( champ ) {
                if ( this.form[champ] ) {
                    this.error[champ]=null ; 
                }
            },

            async findInfusionsoft(){
                let url = window.urlapplication + '/application'; 
                console.log( '--- Récupédddddddddddration : ' , url )
                let find = await fetch( url )  ;  
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    console.log( data )
                    this.applications = data ; 
                }
            }

        },
        mounted(){
            this.findInfusionsoft() ; 
        }
    }
</script>

<style>
    .homepage{
        position: fixed;
        top: 0;left: 0;right: 0;bottom: 0;
        z-index: 4000;
        background-color: #FFF ;
        padding-top: 3rem;
    }
</style>