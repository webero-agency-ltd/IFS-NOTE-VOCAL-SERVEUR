import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 


const actions = {

	async ['ALL_CONTACTS']({ commit, state } , { namespace , id } ) {
      	
        let [ err , {data} ] = await api( '/infusionsoft/contacts/' + id )  ; 
        if ( err ) {
        	return commit('generale/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'ALL_CONTACTS', data )

	},


};

const mutations = {
  	updateField,
  	['ALL_CONTACTS']( state, data ) {
  		console.log( data )
        //this.form.contactId = optionsConctats[optionsConctats.length-1].value ;
       //this.contacts = optionsConctats ; 
	    state.contacts = [ ...data ] ;
  	},
};

const getters = {
  	getField,
};

const state = () => ({
  	contacts: [], 
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};