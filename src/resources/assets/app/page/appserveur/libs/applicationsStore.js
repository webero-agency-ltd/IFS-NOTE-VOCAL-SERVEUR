import Vuex from 'vuex';

export default new Vuex.Store ({

	/*
		//récupération de vos liste d'application 
		finds(){

			let url = window.urlapplication + '/application/item/'+this.$route.params.id; 
	        let find = await fetch( url )  ;  
	        if ( find.ok ) { 
	            let data = await find.json() ; 
	            this.application = data ; 
	        }

		},

		//récupération de l'url de demande d'authorisation d'application 
		authorize(){
			
			let url = window.urlapplication + '/application/reauthorize/' + this.application.type + '/' + this.application.id ; 
	        let find = await fetch( url )  ;  
	        if ( find.ok ) { 
	            let data = await find.json() ; 
	            if ( data.success ) {
	                var win = window.open(data.success, '_blank');
	                win.focus();
	            } 
	        }
		}
	*/

})