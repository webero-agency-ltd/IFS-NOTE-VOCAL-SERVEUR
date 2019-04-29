declare namespace Express {
   	export interface Request {
      	lang?: ()=> any
      	flash?: (  type:string , content:any  )=> void
   	}
}