
export default function to( promise : any ) : any {
	return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}