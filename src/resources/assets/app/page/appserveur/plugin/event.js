import Vue from 'vue';

let evs = [] ; 

let on = {} ; 


let MyPlugin = {};
let pause = [] ; 

MyPlugin.install = function (Vue, options) {
  	
  	Vue.prototype.on = function (event,func) {
		if (on[event]) {}
		else{
			on[event] = [] ;
		}
		return on[event].push(func);
  	}

  	Vue.prototype.emit = function (event,option,tab) {
  		if (on[event]) {
			if (typeof(on[event])=='function') {
				on[event](option);
			}else{
				for (var i = 0; i < on[event].length; i++) {
					if ( pause.indexOf( event ) == -1 ) {
						on[event][i](option);
					}else{}
				}
			}
		}
  	}

  	Vue.prototype.off = function (event,id) {
		
		if (on[event]) {
			on[event].splice(id-1,1);
		}

  	}

  	Vue.prototype.pause = function (event) {
		if ( pause.indexOf( event ) == -1 ) {
			pause.push( event );
		}
  	}

  	Vue.prototype.play = function (event) {
		if ( pause.indexOf( event ) != -1 ) {
			pause.splice(pause.indexOf( event )-1,1);
		}
  	}

}


Vue.use(MyPlugin);

export default MyPlugin ; 