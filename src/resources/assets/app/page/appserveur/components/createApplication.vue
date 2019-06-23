<template>
    <a-form :layout="'vertical'">
        <a-form-item>
            <a-radio-group
                style="width: 100%;"
                default-value="infusionsoft" 
                @change="handleFormApplicationChange">
                <a-radio-button style="width: 50%;" value="trello">
                    Trello
                </a-radio-button>
                <a-radio-button style="width: 50%;" value="infusionsoft">
                    Infusionsoft
                </a-radio-button>
            </a-radio-group>
        </a-form-item>    
        <a-form-item v-if="type=='infusionsoft'" :label="$lang('appInfusionsoftName')">
            <a-input
                v-decorator="[
                    'name',
                    {rules: [{ required: true, message: 'Please input name!' }]} ]"
                v-model="name" :placeholder="$lang('appInfusionsoftName')" /> 
        </a-form-item>
        <a-form-item v-if="type=='infusionsoft'" :label="$lang('appInfusionsoftUrlId')">
            <a-input
                v-decorator="[
                    'compteId',
                    {rules: [{ required: true, message: 'Please input website!' }]}]"
                    v-model="compteId" :placeholder="$lang('appInfusionsoftUrlId')" />      
        </a-form-item>
        <a-form-item v-if="type=='trello'" :label="$lang('appTrelloName')">
            <a-input
                v-decorator="[
                    'name',
                    {rules: [{ required: true, message: 'Please input name!' }]}]"
                v-model="name" :placeholder="$lang('appTrelloName')" />   
        </a-form-item>
    </a-form>
</template>
<script>
	
	import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        //mapApplicationMultiRowFields ,
        mapApplicationFields ,
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);

    const { 
        mapActions: mapGeneraleMutations, 
        mapState: mapGeneraleActions 
    } = createNamespacedHelpers(`generale`);
    
    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);

	export default {

		props : [], 

		data(){
            return {
            }
        },

        computed: {
            ...mapGeneraleActions([`error`, `success`]),
            //...mapApplicationMultiRowFields({ applications: `rows` }),
            ...mapApplicationFields([`name`,`compteId`,`type`])
        },

        methods : {

            handleFormApplicationChange  (e) {
                this.type = e.target.value;
            },

        	changeError ( e ){
        		let data = {}
        		data[e] = null ; 
        		this.$store.commit('generale/ERROR',data, {root:true})
        	},

        	async findInfusionsoft(){
                let url = window.urlapplication + '/application/item/'+this.$route.params.id ;
                let find = await fetch( url )  ; 
                if ( find.ok ) { 
                    let data = await find.json() ; 
                    if ( !data ) {
                    	return
                    }
                    if ( data.type == "trello" ) {
                        this.type = 'trello' ;
                    }else{
                        this.type = 'infusionsoft' ;
                    }
                }
            },

        },
		created(){

			this.on('ApplicationCreate',async () => {
				let response = await this.$store.dispatch('generale/application/ADD_APPLICATION' , { namespace : 'generale' } ) ; 
                if ( response ) {
                    this.emit('closemodale') ; 
                }
			});

            this.findInfusionsoft() ; 

		}
	}
</script>
<style>

</style>