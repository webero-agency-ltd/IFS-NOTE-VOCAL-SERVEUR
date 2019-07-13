
export default function paginate(_array : any[] , page_size : number , page_number : number ) : any {
  	--page_number;  
	return {
		data : _array.slice(page_number * page_size, (page_number + 1) * page_size) ,
		total : _array.length , 
		maxpage : Math.ceil( (_array.length / page_size )) , 
	};
}