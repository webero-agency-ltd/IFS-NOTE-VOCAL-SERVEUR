import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 

const actions = {

	//Fonction de création de compte infusionsoft 
	async ['ADD_APPLICATION']({ commit, state } , { namespace } ) {
      	//commit(SUCCESS);
      	//commit('ERROR', 'error.message');
      	let { compteId , name , type } = state ; 
        let body = {} ;
        if ( name && compteId ) {
            body = { name , compteId , type } ; 
        }else if( name ){ 
            body = { name , type } ; 
        }else{
            return false
        }
        let [ err , {data} ] = await api( '/application' , 'POST' , body ) ;
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }else{
        	//redirection a la page d'authentification pour la récupération des accessToke 
        	let win = window.open( data, '_blank');
            win.focus();
        }
        return true;
	},

  async ['RE_AUTHORIZE']({ commit, state } , { namespace , id } ) {
        console.log('RE_AUTHORIZE')
        let [ err , {data} ] = await api( `/application/reauthorize/all/${id}` ) ;
        if ( err ) {
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }else{
          //redirection a la page d'authentification pour la récupération des accessToke 
          let win = window.open( data, '_blank');
            win.focus();
        }
        return true;
  },

	//récupération de tout les applications 
    async ['FIND_ALL']({ commit, state } , { namespace }) {
	    let [ err , {data} ] = await api( '/application' ) ;
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'ADD_APPLICATION', data )
    },

    //ajoute de focus a l'applications 
    async ['ITEM_APPLICATION']({ commit, state } , { namespace , id } ) {
	      let [ err , {data} ] = await api( '/application/item/'+id ) ;
         if ( err ) {
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'ADD_ITEM', data )
    }
};

const mutations = {
  	updateField,
  	['ADD_APPLICATION'](state, data ) {
      console.log( data )
	    state.rows = [ ...data ]
	},
	['ADD_ITEM'](state, data ) {
	    state.item = Object.assign({},{...data}) ; 
	},
};

const getters = {
  	getField,
    ['rowsTrello'](state, data ) {
      return state.rows.filter( e => e.type ==='trello' )
    },
    ['rowsIFS'](state, data ) {
        return state.rows.filter( e => e.type ==='infusionsoft' ) 
    },
};

const state = () => ({
  	item: {},
    rows: [],
  	name : '' , 
	  compteId : '' , 
	  type : 'infusionsoft' , 
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};