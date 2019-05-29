import application from '../modules/application';
import users from '../modules/users';
import trello from '../modules/trello';
import { createHelpers } from 'vuex-map-fields';

const actions = {
  async ['ERROR']({ commit, state }) {
    console.log( 'ERROR ELEMENT ROUTE GENERALE' )
  },
};

const mutations = {
	['ERROR'](state, error) {
	    state.error = Object.assign({},{ ...state.error , ...error });
	    state.success = false;
	},
	['SUCCESS'](state) {
	    state.error = {};
	    state.success = true;
	},
};

const state = () => ({
  	error: {},
  	success: false,
});

const modules = {
    application,
    users,
  	trello,
};

export const { mapMultiRowFields: mapApplicationMultiRowFields } = createHelpers({
    getterType: `generale/application/getField`,
    mutationType: `generale/application/updateField`,
});

export const { mapFields: mapApplicationFields } = createHelpers({
    getterType: `generale/application/getField`,
    mutationType: `generale/application/updateField`,
});

export const { mapMultiRowFields: mapUsersMultiRowFields } = createHelpers({
    getterType: `generale/users/getField`,
    mutationType: `generale/users/updateField`,
});

export const { mapMultiRowFields: mapTrelloMultiRowFields } = createHelpers({
    getterType: `generale/trello/getField`,
    mutationType: `generale/trello/updateField`,
});

/*
export const { mapFields: mapUsersFields } = createHelpers({
    getterType: `generale/users/getField`,
    mutationType: `generale/users/updateField`,
});
*/
export const generale = {
  	namespaced: true,
  	actions,
  	mutations,
  	state,
  	modules,
};