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
                        <b-card v-for="item in infusionsoft" :key="item.id" footer-tag="footer" bg-variant="light" :header="item.name">
                            <b-card-text><h3>Recorder</h3></b-card-text>
                            <b-card-text><h3>00 : 12</h3></b-card-text>
                            <router-link :to="{name:'infusionsoft', params : {id : item.id} }">
                                statistique
                            </router-link>
                            <em slot="footer">{{item.user_role}}</em>
                        </b-card>
                        <b-card @click="newifsmodale=true" class="text-center" bg-variant="light" >
                            ADD NEW
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
        <b-modal v-model="newifsmodale" hide-footer>
            <template slot="modal-title">
                Nouvelle infusionsoft 
            </template>
            <div class="d-block text-center">
                <b-form class="form-login" @submit.prevent.stop="onSubmit">
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
                                                :placeholder="$lang('appInfusionsoftName')">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-input-group>
                    </b-form-group>

                    <b-form-group>
                        <b-input-group>
                            <b-row style="width: 100%;">
                                <b-col sm="4"><label for="urlid">{{$lang('appInfusionsoftUrlId')}} : </label></b-col>
                                <b-col sm="8">
                                    <b-form-group>
                                        <b-form-input id="urlid"
                                                v-model="form.urlid"
                                                :state="error.urlid"
                                                @input="changeinput('urlid')"
                                                :placeholder="$lang('appInfusionsoftUrlId')">
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
                    <b-button class="mt-3" @click="newifsmodale=false">Annuler</b-button>
                    <b-button class="mt-3" @click="create">Créer</b-button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
	export default {
		props : [ ], 
		data(){
            return {
                infusionsoft : [], 
                error : {
                    name : null,
                    urlid : null,
                },
                form: {
                    name : '',
                    urlid : '',
                },
                txt: {
                    name : '',
                    urlid : '',
                },
                newifsmodale : false ,
            }
        },
        methods : {

            //création de l'IFS 
            create : async function () {

                let url = window.urlapplication + '/infusionsoft';
                if ( this.form.name && this.form.urlid ) {
                    let formData = new FormData();
                    formData.append('name', this.form.name );
                    formData.append('urlid', this.form.urlid );
                    let { name , urlid } = this.form; 
                    let uploadResponse = await fetch( url , {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name , urlid })
                    })
                    if ( uploadResponse.ok ) { 
                        let data = await uploadResponse.json() ;
                        if ( data.success ) {
                            var win = window.open(data.success, '_blank');
                            win.focus();
                            this.newifsmodale = false ; 
                        } 
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
                let url = window.urlapplication + '/infusionsoft';
                console.log( '--- Récupération : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    console.log( data )
                    this.infusionsoft = data ; 
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