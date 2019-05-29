export default class Store{

    static increment(){
        if (this.i===null) {
            this.i = 0  ; 
        }
        return this.i++;
    }

    constructor() {

    }

    onChange( cbl ){
        this.callback.push( cbl ) ; 
    }

    /*
     *    Alerté les composante qu'il y a des changements 
    */
    alert(){
        this.callback.forEach( cbl => cbl( this ) ) ; 
    }

    request( url , type = 'GET' ){
        
        if ( type ==='GET' ) {
            find = await fetch( url )  ;  
        }else{
            find = await fetch( url )  ;  
        }

        if ( find.ok ) { 
            let data = await find.json() ; 
            this.application = data ; 
        }

    }
}