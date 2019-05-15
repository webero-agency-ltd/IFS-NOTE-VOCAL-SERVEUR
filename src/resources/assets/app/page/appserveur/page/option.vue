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
                ]
            }
        },
        methods : { 

            async create(){
                console.log( this.compte ) ; 
                if ( !this.compte ) 
                    return
                console.log( '---' , this.compte ) ; 
                let url = window.urlapplication + '/trello/boards/'+this.$route.params.id ;
                let uploadResponse = await fetch( url , {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { compteId : this.compte } )
                })
                
                if ( uploadResponse.ok ) { 
                    document.location.reload(true);
                }
            },  

            async findallnotes(){

                let url = window.urlapplication + '/trello/boards/'+this.$route.params.id ;
                console.log( '--- Récupération de tout les boards : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.items = data.map(function ( e ) {
                        return {
                            id: e.id,
                            title: e.name,
                            //email: e.email,
                            //role: e.role,
                        }
                    })
                    console.log( data )
                }
            },

            //récupération du compte infusionsoft en question 
            async findInfusionsoft(){
                let url = window.urlapplication + '/application/item/' + this.$route.params.id;
                console.log( '--- Récupération : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    console.log( data )
                    if ( data ) {
                        this.infusionsoft = data; 
                        this.compte = this.infusionsoft.compteId ;
                        console.log( this.infusionsoft.compteId ) 
                    }
                }
            }
        },
		created(){
            this.findallnotes() ; 
            this.findInfusionsoft() ; 
		}
	}
</script>

<style>

</style>