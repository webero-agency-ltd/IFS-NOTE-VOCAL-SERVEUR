import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);

import home from '../page/home';
import infusionsoft from '../page/infusionsoft';
import notes from '../page/notes';
import users from '../page/users';

const router = new vueRouter({
	routes : [
		{ name: 'home', path : '/', component : home },
		{ name: 'infusionsoft', path : '/:id', component : infusionsoft },
		{ name: 'notes', path : '/:id/notes', component : notes },
		{ name: 'users', path : '/:id/users', component : users },
		{ path : '*', redirect : '/'},
	]
})

export default router ; 