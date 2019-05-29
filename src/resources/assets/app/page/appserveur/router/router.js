import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);

import home from '../page/home';
import application from '../page/application';
import notes from '../page/notes';
import users from '../page/users';
import option from '../page/option';

let router = null ;
if ( window.location.pathname == '/' || window.location.pathname == '' ) {
	router = new vueRouter({
		routes : [
			{ name: 'home', path : '/', component : home },
			{ name: 'application', path : '/:id', component : application },
			{ name: 'notes', path : '/:id/notes', component : notes },
			{ name: 'users', path : '/:id/users', component : users },
			{ name: 'option', path : '/:id/option', component : option },
			{ path : '*', redirect : '/'},
		]
	})
}else {
	router = new vueRouter({
		routes : [
			{ name: 'external', path : '/', component : h => h(require('../page/external')) },
			{ name: 'option', path : '/option', component : h => h(require('../page/option-external')) },
			{ path : '*', redirect : '/'},
		]
	})
}

export default router ; 