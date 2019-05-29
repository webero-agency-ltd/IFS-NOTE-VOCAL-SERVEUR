declare namespace Express {
   	export interface Request {
      	lang?: ()=> any
      	flash?: (  type:string , content:any  )=> void
   	}
   	export interface Response {
      	error?: ( id : string , code? : number , data? : any ) => object
      	success?: ( data? : any , id? : string ) => object
    }
}