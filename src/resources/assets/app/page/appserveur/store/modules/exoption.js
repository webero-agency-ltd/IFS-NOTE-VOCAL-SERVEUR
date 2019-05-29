import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 

const actions = {

	async ['FIND_OPTION']({ commit, state } , { namespace } ) {
      	
		  console.log( 'GET OPTION' , this )
        let [ err , {data} ] = await api( '/external' )  ;
        console.log( data ) ;  
        if ( err ) {
        	//@todo : voire quelle est le module code de celle ci
        	//pour faire appelle pour ajouter des erreus 
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'FIND_OPTION', data )

	},

	async ['SET_OPTION']({ commit, state } , { namespace , op } ) {

		console.log('SET OPTION')
		console.log( op )
        let [ err , {data} ] = await api( '/external' , 'POST' , op) ;
        console.log( data )
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }else{ 
        	this.dispatch(namespace+'/exoption/FIND_OPTION' , { namespace }  , {root:true})
        }

	},

	/*
	 * Création de note par l'intermediaire des API
	*/
  	async ['CREATE']({ commit, state }, { namespace , op } ) {

		console.log('CREATE NOTE')
		console.log( op )
        let [ err , {data} ] = await api( '/external/note' , 'POST' , op ) ;
        console.log( data )
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        return data

	}

};

const mutations = {
  	updateField,
  	['FIND_OPTION']( state, data ) {
	    console.log( data ) ; 
	    state.external = Object.assign({},{ ...data }) ; 
  	},
};

const getters = {
  	getField,
};

const state = () => ({
  	external: { infusionsoft : null , trello : null }, 
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};