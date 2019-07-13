import Vue from 'vue';
import vueRouter from 'vue-router';
import baseurl from '../libs/baseurl' ; 

Vue.use(vueRouter);

console.log( window.location )

let router = null ;
let baseU = baseurl( window.location ) ; 
if ( window.location.pathname == '/' || window.location.pathname == '' ) {
	router = new vueRouter({
		routes : [
			{ name: 'home', path : '/', component : h => h(require('../page/home')) },
			{ name: 'application', path : '/:id', component : h => h(require('../page/application')) },
			//{ name: 'notes', path : '/:id/notes', component : h => h(require('../page/notes')) },
			{ name: 'users', path : '/:id/users', component : h => h(require('../page/users')) },
			{ name: 'option', path : '/:id/option', component : h => h(require('../page/option')) },
			{ path : '*', redirect : '/'},
		]
	})
}
else if ( window.location.pathname == '/transferwise' || window.location.pathname == '/transferwise/') {
	router = new vueRouter({
		routes : [
			{ name: 'transferwise', path : '/', component : h => h(require('../page/transferwise')) },
			{ path : '*', redirect : '/'},
		]
	})
}
else if ( baseU[0] == "read" ) {
	router = new vueRouter({
		routes : [
			{ name: 'read', path : '/', component : h => h(require('../page/read')) },
			{ path : '*', redirect : '/read'},
		]
	})
}
else {
	router = new vueRouter({
		routes : [
			{ name: 'external', path : '/', component : h => h(require('../page/external')) },
			{ name: 'update', path : '/update/:id', component : h => h(require('../page/external')) },
			{ name: 'option', path : '/option', component : h => h(require('../page/option-external')) },
			{ name: 'read', path : '/read/:unique', component : h => h(require('../page/read')) },
			{ path : '*', redirect : '/'},
		]
	})
}

export default router ; 