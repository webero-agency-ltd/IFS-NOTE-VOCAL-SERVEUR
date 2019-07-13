<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <a-spin v-if="loading" tip="Loading..." style="position: absolute;top: 50%;left: 50%;"></a-spin>
        <a-row type="flex" justify="center" :gutter="16">
            <a-col :span="14" >
                <a-alert
                    v-if="newcreate"
                    :message="$lang('success_note')"
                    type="success"
                    showIcon
                    style="margin-bottom: 1rem;"
                />
                <a-alert
                    v-if="existe===false"
                    :message="$lang('note_unexiste')"
                    type="error"
                    showIcon
                    style="margin-bottom: 1rem;"
                />
                <div v-show="existe===true">
                    <h2>{{title}}</h2>
                    <p></p>
                    <div id="vocale-listen"></div>    
                    <a-divider dashed />
                    <div>
                        <a-button @click="newnote">Nouvelle note</a-button>
                        <a-button @click="edit" type="primary">Edit</a-button>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>

    import trello from '../store/trello' ; 
    import external from '../store/external' ; 
    import exoption from '../store/exoption' ; 
    import placedata from '../libs/placedata' ; 
    import pour from '../store/pour' ; 
    import infusionsoft from '../store/infusionsoft' ; 
    import makeid from '../libs/makeid' ; 
    import wait from '../libs/wait' ; 
    import moment from 'moment' ; 
    import note from '../store/note' ; 
    import listen from '../libs/listen';

    export default {
        data(){
            return {
                newcreate : window.success_create , 
                existe : null ,
                title : '' , 
                id : '', 
                loading : true , 
            }
        },
        computed : {

        },
        methods : {

            async newnote(){
                let url = window.urlapplication+'/vocal-note' ;
                window.location.href = url 
            },
            
            async edit(){
                let url = window.urlapplication+'/vocal-note#/update/'+window.unique  ;
                window.location.href = url 
            },

            async ifsfindnote( n ){
                let err , note ; 
                if ( n.attache == 'note' ) 
                    [ err , note ] = await infusionsoft.itemNote( n.nativeId , n.ApplicationId ) ;
                else if ( n.attache == 'task' ) 
                    [ err , note ] = await infusionsoft.itemTask( n.nativeId , n.ApplicationId ) ;
                console.log( note )
                this.loading = false ; 
                if ( ! note.title ) 
                    return this.existe = false ;
                this.existe = true ; 
                this.title = note.title ; 
                new listen( 'vocale-listen' , window.urlapplication+'/audio/'+window.unique , 'audio-liste-note-record' ) ; 
                console.log( window.urlapplication+'/audio/'+window.unique  )
            },

            async trellonote( n ){
                let [ err , note ] = await trello.itemCard( n.nativeId , n.ApplicationId ) ;
                console.log( note )
                this.loading = false ; 
                if ( !note.name ) 
                    return this.existe = false ;
                this.title = note.name ; 
                this.existe = true ; 
                new listen( 'vocale-listen' , window.urlapplication+'/audio/'+window.unique , 'audio-liste-note-record' ) ; 
                console.log( window.urlapplication+'/audio/'+window.unique  )
            },

            async init(){
                await this.$nextTick() ; 
                //récupération des informations de ce note en native 
                let [ err , noteItem ] = await note.find( window.unique ) ;
                console.log( err , noteItem , window.unique ) ; 
                console.log(  err || !noteItem || (noteItem && !noteItem.nativeId ) ) 
                if ( err || !noteItem || (noteItem && !noteItem.nativeId) ) {
                    return this.existe = false ;
                }
                if ( noteItem.type == "infusionsoft" ) {
                    this.ifsfindnote( noteItem )
                } 
                if ( noteItem.type == "trello" ) {
                    this.trellonote( noteItem )
                } 
            }
        },
        mounted(){
            this.init() ; 
        },
        created(){

        }
    }

</script>
<style>
    
</style>