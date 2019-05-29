import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 

const actions = {

	async ['ALL_BOARDS']({ commit, state } , { namespace , id } ) {
      	
        let [ err , {data} ] = await api( '/trello/boards/'+ id )  ; 
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        let items = data.map(function ( e ) {
            return {
                id: e.id,
                title: e.name,
                url: e.url,
            }
        })
        commit( 'ALL_BOARDS', items )

	},

	async ['ADD_BOARDS']({ commit, state } , op ) {

		let { id , compte , url , namespace } = op ; 
        let [ err , {data} ] = await api(  '/trello/boards/'+id , 'POST' , { compteId : compte , url } ) ;
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }else{
        	document.location.reload(true);
        }

	},


  async ['FIND_LABELS']({ commit, state } , { namespace , id } ) {
        console.log('FIND LISTE' , id )
        let [ err , {data} ] = await api( '/trello/label/'+id ) ;
        if ( err ) {
          return commit('generale/ERROR',{ message : err.message } , {root:true})
        }
        console.log( data )
        let optionsCards = data.map(function ( e ) {
            return {
                value: e.id,
                text: e.name,
            } 
        })
        commit( 'FIND_LABELS', optionsCards )

  },

  //récupération de tout les liste du board trello qui a été selectionner 
  async ['FIND_LISTS']({ commit, state } , { namespace , id } ) {
        console.log('FIND LISTE' , id )
        let [ err , {data} ] = await api( '/trello/lists/'+id ) ;
        if ( err ) {
          return commit('generale/ERROR',{ message : err.message } , {root:true})
        }
        console.log( data )
        let optionsCards = data.map(function ( e ) {
            return {
                value: e.id,
                text: e.name,
            } 
        })
        commit( 'FIND_LISTS', optionsCards )

  }
};

const mutations = {
  	updateField,
  	['ALL_BOARDS']( state, data ) {
  		console.log( data )
	    state.boards = [ ...data ] ;
  	},
    ['FIND_LISTS']( state, data ) {
      console.log( data )
      state.lists = [ ...data ] ;
    },
    ['FIND_LABELS']( state, data ) {
      console.log( data )
      state.labels = [ ...data ] ;
    },
    
};

const getters = {
  	getField,
};

const state = () => ({
    boards: [], 
  	lists: [], 
    labels : [] , 
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};