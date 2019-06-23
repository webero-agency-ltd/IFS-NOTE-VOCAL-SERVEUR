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
	Card , 
	Icon , 
	Divider , 
	Form ,
	Radio , 
	Popover , 
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

Vue.component( Card.name, Card );
Vue.component( Card.Meta.name, Card.Meta );

Vue.component( Icon.name, Icon );

Vue.component( Divider.name, Divider );

Vue.component( Form.name, Form );
Vue.component( Form.Item.name, Form.Item );

Vue.component( Radio.name, Radio );
Vue.component( Radio.Button.name, Radio.Button );
Vue.component( Radio.Group.name, Radio.Group );

Vue.component( Popover.name, Popover );

let comp = {}

export default comp;