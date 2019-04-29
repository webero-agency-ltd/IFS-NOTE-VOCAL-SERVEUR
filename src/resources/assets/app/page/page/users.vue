<template>
    <div class="userpage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appUserTitle')}}</h2>
                </b-col>
                <b-col cols="12">
                    <b-button id="popover-reactive-1" variant="primary" ref="button">
                        Add team
                    </b-button>
                    <b-popover target="popover-reactive-1" triggers="click" :triggers="'click'" variant="primary">{{urladdteams}}</b-popover>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
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
                items: [],
                urladdteams : '' , 
                infusionsoft : {} , 
            }
        },
        methods : {

            async findallteams(){
                let url = window.urlapplication + '/team/infusionsoft/'+this.$route.params.id ;
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

            async findInfusionsoft(){
                let url = window.urlapplication + '/infusionsoft/item/'+this.$route.params.id ;
                console.log( '--- Récupération : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    console.log( data.unique )
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