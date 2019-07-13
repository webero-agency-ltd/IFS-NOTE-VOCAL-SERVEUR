import Vue from 'vue';

import labelTrello from '../components/labelTrello'; 
Vue.component('labelTrello', labelTrello);

import wisetransferApikey from '../components/wisetransferApikey'; 
Vue.component('wisetransferApikey', wisetransferApikey);

import pourTrello from '../components/pourTrello';
Vue.component('pourTrello', pourTrello);

import pourInfusionsoft from '../components/pourInfusionsoft';
Vue.component('pourInfusionsoft', pourInfusionsoft);

import menu from '../components/menu';
Vue.component('menu-app', menu);

import menuExternal from '../components/menu-external';
Vue.component('menu-external', menuExternal);

import modal from '../components/modal';
Vue.component('modal', modal);

import deleteApplication from '../components/deleteApplication'; 
Vue.component('deleteApplication', deleteApplication);

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
	Select  , 
	DatePicker  , 
	Spin  , 
	Alert  , 
	Badge
} from 'ant-design-vue';

Vue.component( Menu.name, Menu );
Vue.component( Menu.Item.name, Menu.Item );
Vue.component( Menu.SubMenu.name, Menu.SubMenu );

Vue.component( Avatar.name, Avatar );

Vue.component( Layout.name, Layout );
Vue.component( Layout.Header.name, Layout.Header );
Vue.component( Layout.Content.name, Layout.Content );

Vue.component( Row.name, Row );
Vue.component( Col.name, Col );

Vue.component( Breadcrumb.name, Breadcrumb );

Vue.component( Button.name, Button );
Vue.component( Button.Group.name, Button.Group );

Vue.component( Table.name, Table );

Vue.component( Modal.name, Modal );

Vue.component( Input.name, Input );
Vue.component( Input.TextArea.name, Input.TextArea  );

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

Vue.component( Select.name, Select );
Vue.component( Select.Option.name, Select.Option );

Vue.component( DatePicker.name, DatePicker );

Vue.component( Spin.name, Spin );

Vue.component( Alert.name, Alert );

Vue.component( Badge.name, Badge );

let comp = {}

export default comp;