
export default function formateDescription ( form ){
	let text = '' ; 
	for( let { name , value } of form ){
		if ( name == 'soncas-select' && value !== '') {
			let val = formPlace('soncasArray')  ;
			text += '<strong>SONCAS :</strong> </br>'
			for( let pitem of val ){
				pitem.value==value?text += ` - ${pitem.key}</br>`:'';
			}
		}else if( name == 'vitesse-closing-select' && value ){
			text += '<strong>Vitesse Closing :</strong> </br>';
			console.log( value )
			let ex = value.split(',') ; 
			console.log( ex )
			let val = formPlace('vitesseclosingArray')  ;
			for( let i of ex ){
				for( let pitem of val ){
					pitem.value==i?text += ` - ${pitem.key}</br>`:'';
				}
			}
		}else if( name == 'doemotion' && value !== ''){
			text += '<strong>Douleur émotionnelle :</strong> </br>'
			text += ` - ${value}</br>`
		}else if( name == 'comment' && value !== ''){
			text += '<strong>Commentaire :</strong></br>'
			text += ` - ${value}</br>`
		}
	}
	return text
}