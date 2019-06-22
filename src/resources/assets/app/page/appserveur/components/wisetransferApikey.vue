<template>
	<div>
		<a-input v-model="apikey" placeholder="API key wisetransfer"/>
	</div>
</template>

<script>

    import api from '../libs/api';
    
    export default {
        props : [], 
        data(){
            return {
                apikey : ''
            }
        },
        computed: {
        },
        methods : {
            init : async function () {
                //récupération de l'api key 
                let [ err , reponse ] = await api( '/transferwise/transfers/key' )
                let { success } = reponse.data ; 
                if ( reponse.data.token ) {
                    this.apikey = reponse.data.token ; 
                }
            }, 
            sendApiKey : async function () {
                let [ err , reponse ] = await api( '/transferwise/transfers/key' , 'POST' , { token : this.apikey } )
                if ( reponse.data ) {                    
                    this.emit('closemodale')
                    this.emit('WisetransferApikeyRefresh')
                }
            }
        },
        mounted(){
            this.init()
            this.on('WisetransferApikeyCreate', () => {
                this.sendApiKey() ; 
            })
        }
    }
</script>
