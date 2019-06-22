import Vue from 'vue';

import pourTrello from '../components/pourTrello';
Vue.component('pour-trello', pourTrello);

import labelTrello from '../components/labelTrello'; 
Vue.component('label-trello', labelTrello);

import wisetransferApikey from '../components/wisetransferApikey'; 
Vue.component('wisetransferApikey', wisetransferApikey);

import pourInfusionsoft from '../components/pourInfusionsoft';
Vue.component('pour-infusionsoft', pourInfusionsoft);

import menu from '../components/menu';
Vue.component('menu-app', menu);

import loader from '../components/loader';
Vue.component('loader-app', loader);

import menuExternal from '../components/menu-external';
Vue.component('menu-external', menuExternal);

import modal from '../components/modal';
Vue.component('modal', modal);

import alert from '../components/alert';
Vue.component('alert', alert);

import createApplication from '../components/createApplication';
Vue.component('create-application', createApplication);

import noteVocal from '../components/noteVocal';
Vue.component('note-vocal', noteVocal);

import transferwiseMenu from '../components/transferwise-menu';
Vue.component('transferwise-menu', transferwiseMenu);



//////////////////////////////////////////////////////////////////////////////////////////////
import { 
	Menu , 
	Avatar , 
	Layout , 
	Breadcrumb , 
	Col , 
	Row , 
	Button , 
	Table ,
	Modal ,
	Input , 
} from 'ant-design-vue';

Vue.component( Menu.name, Menu );
Vue.component( Menu.Item.name, Menu.Item );
Vue.component( Menu.SubMenu.name, Menu.SubMenu );

Vue.component( Avatar.name, Avatar );

Vue.component( Layout.name, Layout );
Vue.component( Layout.Header.name, Layout.Header );
Vue.component( Layout.Content.name, Layout.Content );

console.log( Row.name )
Vue.component( Row.name, Row );
Vue.component( Col.name, Col );

Vue.component( Breadcrumb.name, Breadcrumb );

Vue.component( Button.name, Button );

Vue.component( Table.name, Table );

Vue.component( Modal.name, Modal );

Vue.component( Input.name, Input );

//////////////////////////////////////////////////////////////////////////////////////////////

import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
Vue.component('b-form-group', bFormGroup);

import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
Vue.component('b-form-input', bFormInput);

import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback';
Vue.component('b-form-invalid-feedback', bFormInvalidFeedback);
	
import bContainer from 'bootstrap-vue/es/components/layout/container';
Vue.component('b-container', bContainer);

import bCol from 'bootstrap-vue/es/components/layout/col';
Vue.component('b-col', bCol);

import bPopover from 'bootstrap-vue/es/components/popover/popover';
Vue.component('b-popover', bPopover);

import bModal from 'bootstrap-vue/es/components/modal/modal';
Vue.component('b-modal', bModal);

import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';
Vue.component('b-dropdown', bDropdown);

import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';
Vue.component('b-dropdown-item', bDropdownItem);

import bNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown';
Vue.component('b-nav-item-dropdown', bNavItemDropdown);

import bImg from 'bootstrap-vue/es/components/image/img';
Vue.component('b-img', bImg);

import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group';
Vue.component('b-input-group', bInputGroup);

import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
Vue.component('b-list-group', bListGroup);

import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item';
Vue.component('b-list-group-item', bListGroupItem);

import bCard from 'bootstrap-vue/es/components/card/card';
Vue.component('b-card', bCard);

import bCardText from 'bootstrap-vue/es/components/card/card-text';
Vue.component('b-card-text', bCardText);

import bCardGroup from 'bootstrap-vue/es/components/card/card-group';
Vue.component('b-card-group', bCardGroup);

import bBadge from 'bootstrap-vue/es/components/badge/badge';
Vue.component('b-badge', bBadge);

import bProgress from 'bootstrap-vue/es/components/progress/progress';
Vue.component('b-progress', bProgress);

import bAlert from 'bootstrap-vue/es/components/alert/alert';
Vue.component('b-alert', bAlert);

import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';
Vue.component('b-form-textarea', bFormTextarea);

import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
Vue.component('b-form-select', bFormSelect);

import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
Vue.component('b-form-checkbox-group', bFormCheckboxGroup);

import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';
Vue.component('b-form-checkbox', bFormCheckbox);

import bProgressBar from 'bootstrap-vue/es/components/progress/progress-bar';
Vue.component('b-progress-bar', bProgressBar);

import BPopover from 'bootstrap-vue/es/components/popover/popover'
Vue.component('b-popover', BPopover)

import BFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
Vue.component('b-form-radio-group', BFormRadioGroup)

import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio'
Vue.component('b-form-radio', bFormRadio)

import bInputGroupAppend from 'bootstrap-vue/es/components/input-group/input-group-append'
Vue.component('b-input-group-append', bInputGroupAppend)

let comp = {
}

export default comp;