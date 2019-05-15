<template>
    <div class="userpage">
        <b-container>
            <b-row style="margin-top: 2rem" v-if="type=='trello'">
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
            <b-row style="margin-top: 2rem" v-if="type=='infusionsoft'">
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
	export default {
		props : [ ], 
		data(){
            return {
                teams : [] , 
                items : [],
                urladdteams : 'xdsds' , 
                infusionsoft : {} , 
                type : null , 
                //membre équipe 
                trellos : [] , 
                infusionsofts : [] , 
                //table ici
                fields : [
                    { key: "fullName", label: "full name" },
                    { key: "id", label: "ID" },
                    { key: "add", label: "Add Team" },
                ]
            }
        },
        methods : {

            async findallteams(){
                let url = window.urlapplication + '/team/application/'+this.$route.params.id ;
                console.log( '--- ssssssssssss : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.items = data.map(function ( e ) {
                        return {
                            id: e.id,
                            fullname: e.fullname,
                            email: e.email,
                            role: e.role,
                        }
                    })
                    console.log( data )
                }
            },

            //récupération des information trello 
            async trellomenbre(){
                let url = window.urlapplication + '/trello/membre/'+this.$route.params.id ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.trellos = data.map(function ( e ) {
                        return {
                            id: e.id,
                            fullName: e.fullName,
                            add: e.id,
                        }
                    })
                }
            },

            async infusionsoftmenbre(){
                let url = window.urlapplication + '/infusionsoft/membre/'+this.$route.params.id ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.infusionsofts = data.map(function ( e ) {
                        return {
                            id: e.global_user_id,
                            fullName: e.preferred_name,
                            add: e.global_user_id,
                        }
                    }).filter(function (e) {
                        if ( e.id ) {
                            return true
                        }
                        return false
                    }) ; 
                }
            },

            async findInfusionsoft(){
                let url = window.urlapplication + '/application/item/'+this.$route.params.id ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    if ( data.type == "trello" ) {
                        this.type = 'trello' ;
                        this.trellomenbre() ;
                    }else{
                        this.type = 'infusionsoft' ;
                        this.infusionsoftmenbre() ;
                    }
                    this.infusionsoft = data.unique ; 
                    this.urladdteams = window.urlapplication + '/team/'+ data.unique ; 
                }
            }
        },
		created(){
            this.findInfusionsoft() ; 
            this.findallteams() ; 
		}
	}
</script>

<style>

</style>