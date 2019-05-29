import exoption from '../modules/exoption';
import application from '../modules/application';
import infusionsoft from '../modules/infusionsoft';
import users from '../modules/users';
import trello from '../modules/trello';
import pour from '../modules/pour';
import { createHelpers } from 'vuex-map-fields';

const actions = {
  async ['ERROR']({ commit, state }) {

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
    exoption,
  	infusionsoft,
    application ,
    trello ,
    users ,
    pour ,
};

export const { mapMultiRowFields: mapApplicationMultiRowFields } = createHelpers({
    getterType: `external/application/getField`,
    mutationType: `external/application/updateField`,
});

export const { mapFields: mapApplicationFields } = createHelpers({
    getterType: `external/application/getField`,
    mutationType: `external/application/updateField`,
});

export const { mapMultiRowFields: mapTrelloMultiRowFields } = createHelpers({
    getterType: `external/trello/getField`,
    mutationType: `external/trello/updateField`,
});

export const { mapFields: mapExoptionFields } = createHelpers({
    getterType: `external/exoption/getField`,
    mutationType: `external/exoption/updateField`,
});

export const { mapFields: mapInfusionsoftFields } = createHelpers({
    getterType: `external/infusionsoft/getField`,
    mutationType: `external/infusionsoft/updateField`,
});

export const { mapMultiRowFields: mapInfusionsoftMultiRowFields } = createHelpers({
    getterType: `external/infusionsoft/getField`,
    mutationType: `external/infusionsoft/updateField`,
});

export const { mapMultiRowFields: mapUsersMultiRowFields } = createHelpers({
    getterType: `external/users/getField`,
    mutationType: `external/users/updateField`,
});

export const { mapMultiRowFields: mapPourMultiRowFields } = createHelpers({
    getterType: `external/pour/getField`,
    mutationType: `external/pour/updateField`,
});

export const external = {
  	namespaced: true,
  	actions,
  	mutations,
  	state,
  	modules,
};