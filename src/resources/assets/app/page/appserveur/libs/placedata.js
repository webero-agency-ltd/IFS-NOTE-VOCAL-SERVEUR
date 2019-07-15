export default function placedata( opt , value ) {
    let objs = {} ; 
	objs['soncasArray'] = [
		{value : 0 , key : 'Sécurité'} , 
		{value : 1 , key : 'Orgueil'} , 
		{value : 2 , key : 'Nouveauté'} , 
		{value : 3 , key : 'Confort'} , 
		{value : 4 , key : 'Argent'} , 
		{value : 5 , key : 'Sympathie'} , 
	]; 
	objs['vitesseclosingArray'] = [
		{value : '' , key : ''} , 
		{value : 0 , key : 'V1 (Rapide)'} , 
		{value : 1 , key : 'V2 (Moyen)'} , 
		{value : 2 , key : 'V3 (Lent)'} , 
	]; 
	objs['produitArray'] = [
		{value : '' , key : ''} , 
		{value : 'Aumscan 4' , key : 'Aumscan 4'} , 
		{value : 'Aumscan 3' , key : 'Aumscan 3'} , 
		{value : 'Cardiaum' , key : 'Cardiaum'} , 
		{value : 'TQ2022' , key : 'TQ2022'} , 
		{value : 'Coloraum' , key : 'Coloraum'} , 
		{value : 'Aumscan 4 De Luxe' , key : 'Aumscan 4 De Luxe'} , 
	]; 
	objs['commercialArray'] = [
		{value : '' , key : ''} , 
		{value : 'Envoyer devis' , key : 'Envoyer devis'} , 
		{value : 'Relancer' , key : 'Relancer'} , 
		{value : 'Closer' , key : 'Closer'} , 
		{value : 'Résumé après appel' , key : 'Résumé après appel'} , 
		{value : 'Résumé après présentation' , key : 'Résumé après présentation'} , 
		{value : 'Envoyer document' , key : 'Envoyer document'} , 
		{value : '_____' , key : 'Autre (Input Texte libre)'} , 
	] ; 
	objs['savArray'] = [
		{value : '' , key : ''} , 
		{value : 'Installation logiciel' , key : 'Installation logiciel'} , 
		{value : 'Intervention' , key : 'Intervention'} , 
		{value : '_____' , key : 'Autre (Input Texte libre)'} , 
	]; 
	objs['comptabiliteArray'] =  [
		{value : '' , key : ''} , 
		{value : 'Envoyer document' , key : 'Envoyer document'} , 
		{value : 'Vérifier paiement' , key : 'Vérifier paiement'} , 
		{value : 'Gérer impayé' , key : 'Gérer impayé'} , 
		{value : '_____' , key : 'Autre (Input Texte libre)'} , 
	];
	objs['categorieArray'] =  [
		{value : 'comptabilite' , key : 'COMPTABILITE'} , 
		{value : 'sav' , key : 'SAV'} , 
		{value : 'commercial' , key : 'COMMERCIAL'} , 
		{value : 'autre' , key : 'AUTRE'} , 
		{value : 'marketing' , key : 'Marketing'} , 
		{value : 'technique' , key : 'Technique'} , 
	]; 
	if ( objs[opt] && !value ) 
		return objs[opt]
	if ( objs[opt] && value ) {
		return objs[opt].filter( e => e.value == value )[0].key
	}
	if ( !opt ) 
		return objs

} 