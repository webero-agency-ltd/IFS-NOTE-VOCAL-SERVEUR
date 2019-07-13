
export default async function api( url , methode = 'GET', data = null  ) {

	let op = { id : 1 } ; 
	let da = { ...op }
	url = window.urlapplication + url ;
  	let uploadResponse = null ; 
  	if ( methode == 'GET' ) {
  		uploadResponse = await fetch( url )
  	}else if(methode == 'POST'){
  		uploadResponse = await fetch( url , {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify( data )
	    })
  	}else{
  		uploadResponse = await fetch( url , {
	        method: methode
	    })
  	}

    if ( uploadResponse.ok ) { 
    	let json = null ; 
		try {
		  	json = await uploadResponse.json() ;
		} catch(e) {
		  	return [ { message : 'FORMAT ERROR' }, null];
		}
	    if ( json && json.type == 'ERROR' ) {
	    	return [json, {data:null}];
	    }
	    return [null, json];
    }else{
    	let json = null ; 
		try {
		  	json = await uploadResponse.json() ;
		} catch(e) {
		  	return [ { message : 'FORMAT ERROR' }, null];
		}
	    return [json, {data:null}];
	}

}