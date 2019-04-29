
export default function makeid(length : number ) : string {
  	var text = "";
  	var possible = "abcdefghijklmnopqrstuvwxyz";
  	for (var i = 0; i < length; i++)
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
  	return text;
}