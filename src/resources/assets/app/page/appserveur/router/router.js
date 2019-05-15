import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);

import home from '../page/home';
import application from '../page/application';
import notes from '../page/notes';
import users from '../page/users';
import option from '../page/option';

const router = new vueRouter({
	routes : [
		{ name: 'home', path : '/', component : home },
		{ name: 'application', path : '/:id', component : application },
		{ name: 'notes', path : '/:id/notes', component : notes },
		{ name: 'users', path : '/:id/users', component : users },
		{ name: 'option', path : '/:id/option', component : option },
		{ path : '*', redirect : '/'},
	]
})

export default router ; 