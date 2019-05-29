import { getField, updateField } from 'vuex-map-fields';
import api from '../../libs/api' ; 
import lang from '../../libs/lang' ; 

const actions = {

	//Récupération de tout les team de cette applications 
	async ['ALL_POUR']({ commit, state } , { id , type , namespace }  ) {
        let [ err , {data} ] = await api( '/pour/'+id )  ; 
        if ( err ) {
        	return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'FILTER_POUR', data.filter( e => e.type === type ) )
	},

  async ['FIND_ALL_POUR']({ commit, state } , { id , type , namespace }  ) {
        let [ err , {data} ] = await api( '/pour/'+id )  ; 
        if ( err ) {
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        commit( 'ALL_POUR', data )
  },

    async ['DELETE_POUR']({ commit, state } , { id , application , type , namespace } ) {

        console.log( 'DELETE_POUR' , application ) ; 
        let [ err , {data} ] = await api( '/pour/'+id , 'DELETE' )  ; 
        if ( err ) {
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        this.dispatch( namespace+'/pour/ALL_POUR', { id : application , type , namespace } , {root:true})

  },

     async ['CREATE_POUR']({ commit, state }, { op , namespace } ) {
        console.log( 'CREATE_POUR' , op ) ; 
        let [ err , {data} ] = await api( '/pour/' , 'POST' , op )  ; 
        if ( err ) {
          return commit(namespace+'/ERROR',{ message : err.message } , {root:true})
        }
        this.dispatch( namespace+'/pour/ALL_POUR', { id : op.application , type : op.type , namespace } , {root:true})

  },


};

const mutations = {
  	updateField,
  	['FILTER_POUR'](state, data ) {
	    state.pours = [ ...data ] ;
  	},
    ['ALL_POUR'](state, data ) {
      state.allPours = [ ...data ] ;
    },
};

const getters = {
  	getField,
};

const state = () => ({
  	pours: [], 
    allPours : [] , 
});

export default {
  	namespaced: true,
  	mutations,
  	getters,
  	state,
  	actions,
};