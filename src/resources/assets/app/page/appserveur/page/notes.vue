<template>
	<div class="notespage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appNoteTitle')}}</h2>
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
                items: []
            }
        },
        methods : { 
            async findallnotes(){
                let url = window.urlapplication + '/note/infusionsoft/'+this.$route.params.id ;
                console.log( '--- ssssssssssss : ' , url )
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    this.items = data.map(function ( e ) {
                        return {
                            id: e.id,
                            title: e.title,
                            //email: e.email,
                            //role: e.role,
                        }
                    })
                    console.log( data )
                }
            },
        },
		created(){
            this.findallnotes() ; 
		}
	}
</script>

<style>

</style>