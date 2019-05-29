import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 

const actions = {

	//Récupération de tout les team de cette applications 
	async ['ALL_TEAM']({ commit, state } , { namespace , id } ) {
      	
        let [ err , {data} ] = await api( '/team/application/'+ id )  ; 
        if ( err ) {
        	commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        let items = data.map( ( { contactid , fullname , email , role } ) => {
            return { id : contactid , fullname , email , role }
        })
        commit( 'ALL_TEAM', items )

	},

	async ['MEMBRE_TRELLO']({ commit, state } , { namespace , id } ) {
      	
      	let [ err , {data} ] = await api( '/trello/membre/'+ id )  ; 
        if ( err ) {
        	commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        console.log( data )
        let items = data.map(( { id , fullName }) => {
            return { id , fullName , add : id }
        }).filter(function (e) {
            if ( e.id ) {
                return true
            }
            return false
        }) ; 
        commit( 'MEMBRE_TRELLO', items )

	},

	async ['MEMBRE_INFUSIONSOFT']({ commit, state } , { namespace , id } ) {
      	
        let [ err , {data} ] = await api( '/infusionsoft/membre/'+ id )  ; 
        if ( err ) {
        	commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        console.log( data )
        let items = data.map(( { id , preferred_name }) => {
            return { id , fullName : preferred_name , add : id }
        }).filter(function (e) {
            if ( e.id ) {
                return true
            }
            return false
        }) ; 
        console.log( items )
        commit( 'MEMBRE_INFUSIONSOFT', items )

	},

};

const mutations = {
  	updateField,
  	['ALL_TEAM'](state, data ) {
	    state.teams = [ ...data ] ;
  	},
	['MEMBRE_TRELLO'](state, data ) {
	    state.membreTrello = [ ...data ] ;
  	},
  	['MEMBRE_INFUSIONSOFT'](state, data ) {
	    state.membreInfusionsoft = [ ...data ] ;
  	},
};

const getters = {
  	getField,
};

const state = () => ({
  	teams: [], 
  	membreTrello : [] ,
  	membreInfusionsoft : [] ,
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};