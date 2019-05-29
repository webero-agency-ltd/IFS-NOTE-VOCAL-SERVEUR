module.exports = {
	/*
	 * lang générale utilisé par l'application 
	*/
	MessageAppGlobalErreur : 'Une erreur est survenu, veillé ressayer svp' ,

	/*
	 * 	Les langues de la page signup 
	*/	
	signupEmail : 'Email',
	signupFullname : 'Fullname',
	signupPassword : 'Password',
	signupConfpassword : 'conf-pass',
	signupEmailReady : 'Cette utilisateur existe déja',
	//les erreurs des forumaires d'inscription 
	signupEmailConfpassword2 : 'Ne correspond pas a password',
	//alert 
	signupSuccess : 'Votre inscription a réussi avec success', 

	/*
	 * Page index de l'application 
	*/
	appMenuHome : 'Home',
	appMenuIFS : 'Infustionsoft',
	appMenuUsers : 'Users',
	appMenuNotes : 'Notes',
	appMenuOptions : 'Option',
	//page home de l'application en js 
	appHomeTitle : 'Liste de votre intégration infusionsoft' ,
	//Modale Création d'infusionsoft dans la page home
	appCreateApplicationTitle : `Nouvelle Intégration` , 
	appInfusionsoftName : 'Name' ,
	appInfusionsoftUrlId : 'Url ID' ,
	//trello lang
	appTrelloName : 'Name compte trello' ,
	TrelloNull : 'l\'ID ne correspond pas a un compte trello, ou vous n\'avez pas d\'authorisation' ,
	TrelloTokenError : 'l\'access token de trello est erreur' ,
	//page infusionsoft
	appIFSTitle : 'La statique de votre page' ,
	InfusionsoftNull : 'l\'ID ne correspond pas a un compte infusionsoft, ou vous n\'avez pas d\'authorisation' ,
	InfusionsoftAPINull : 'Il semble que les donners de l\'infusionsoft est vide' ,
	InfusionsoftTokenError : 'l\'access token de l\'application est erreur' ,

	//note page
	filesnoteimpty : 'Fichier pas trouver' ,
	//page utilisateur 
	appUserTitle : 'Teams de compte' ,
	appMembreTrello : 'Membre trello' ,
	appMembreInfusionsof : 'User Infusionsoft' ,

	//page add notes vocals 
	addvocalFormTitle : 'Title' , 
	addvocalFormDescription : 'Description' , 
	addvocalInfusionsoft : 'Contact ID IFS' , 

	//page option application 
	appOptionTitle : 'Paramètrage de la board trello' , 

	//langue de l'externale page
	appOptionTitleExternTrello : 'Compte trello a utilisé' , 
	appOptionTitleExternIFS : 'Compte infusionsoft a utilisé' , 
	externalOptionTrelloListId : `Liste trello`,
	externalOptionTrelloAppId : `Compte trello`,

	//langue de la création de label de l'application 
	externalOptionTrelloLabelId : `Labels trello`,
	externalOptionTrelloDateLabel : `Date Add`,
	/*
	 * Enregistrement des langues de tout les erreurs 
	*/
	errors : {
		//eurreur dans application controlleur 
		AID001 : `Erreur d'autentification *CODE:AID001*` , 
		AID002 : `Erreur de récupération de votre donner, veuille réssayer svp *CODE:AID002*` , 
		AC001 : `Erreur lors de la création de l'application *CODE:AC001*`,
		AC002 : `Erreur d'autentification *CODE:AC002*`,
		AC003 : `Une erreur est survenue *CODE:AC003*`,
		AC004 : `Impossible de crée le teams *CODE:AC004*`,
		AC005 : `Une erreur est survenue *CODE:AC005*`,
		AC006 : `Une erreur est survenue *CODE:AC006*`,
		AID000 : `Erreur d'autentification *CODE:AID000*`,
		ARE001 : `Impossible de trouver l'app infusionsoft *CODE:ARE001*`,
		ARE002 : `Erreur de récupération de l'accesstoken d'infusionsoft *CODE:ARE002*`,
		ARE003 : `Une erreur est survenue *CODE:ARE003*`,
		ARE004 : `Impossible de récupéré l'utilisateur infusionsoft *CODE:ARE004*`,
		ARE005 : `Impossible de récupéré l'utilisateur infusionsoft *CODE:ARE005*`,
		ART001 : `Impossible de trouver l'app trello *CODE:ART001*`,
		ART002 : `Impossible de trouver l'app trello *CODE:ART002*`,
		ART003 : `Impossible de récupéré le token trello *CODE:ART003*`,
		AIT001 : `Accunne application est ratacher a cette ID *CODE:AIT001*`,
		ARA001 : `Une erreur est produit *CODE:ARA001*`,
		//les erreur générale de l'applications 
		G0001 : `Une erreur est produit veille réactualisé votre app svp *CODE:G0001*`,
		//Erreur qui se trouve dans la pages teams 
		T0001 : `Erreur de récupération des teams de l'applications *CODE:T0001*` ,
		//erreur sur la controller team  
		TMB001 : `Erreur de récupération des teams de l'applications *CODE:TMB001*` , 
		TML001 : `Erreur de récupération des teams de l'applications *CODE:TML001*` , 
		TMBU001 : `Erreur de récupération de l'applications *CODE:TMBU001*` , 
		TMBU002 : `Une erreur est produit *CODE:TMBU002*` , 
		TMBU003 : `Impossible de récupère les listes de trello *CODE:TMBU002*` , 
		//erreur d'infusionsoft controller 
		IM0001 : `Impossible de récupère le compte infuisonsoft *CODE:IM0001*`,
		IM0002 : `Erreur sur le token de l'application infusionsoft *CODE:IM0002*`,
		IM0003 : `Une erreur est produit *CODE:IM0003*`,
		IC0001 : `Impossible de récupère le compte infuisonsoft *CODE:IC0001*`,
		IC0002 : `Erreur sur le token de l'application infusionsoft *CODE:IC0002*`,
		IC0003 : `Une erreur est produit *CODE:IC0003*`,
		//erreur de page external 
		EC0001 : `Erreur de récupération d'information de l'utilisateur *CODE:EC0001*` , 
		EC0002 : `Erreur de récupération d'information de l'utilisateur *CODE:EC0002*` , 
		EI0001 : `Erreur de récupération d'information de l'utilisateur *CODE:EI0001*` , 
		EI0002 : `Une erreur est produit *CODE:EI0002*` ,   
		EI0003 : `Une erreur est produit *CODE:EI0003*` , 
		EI0004 : `Une erreur est produit *CODE:EI0004*` , 
		EN0001 : `Une erreur est produit *CODE:EN0001*` , 
		EN0002 : `Une erreur est produit *CODE:EN0002*` , 
		EN0003 : `Une erreur est produit *CODE:EN0003*` , 
		EN0004 : `Une erreur est produit *CODE:EN0004*` , 
		EN0005 : `Une erreur est produit *CODE:EN0005*` , 
		EN0006 : `Une erreur est produit *CODE:EN0006*` , 
		EN0007 : `Une erreur est produit *CODE:EN0007*` , 
		//generale externale page
		GE000A : `Veillez d'abord paramètre votre application` , 
		//erreur dans la controller pour 
		PI001 : `Une erreur est produit *CODE:PI001*`,
		PI002 : `Une erreur est produit *CODE:PI002*`,
		PD001 : `Une erreur est produit *CODE:PD001*`,
		PD002 : `Une erreur est produit *CODE:PD002*`,
		PD003 : `Une erreur est produit *CODE:PD003*`,
		PC0001 : `Une erreur est produit *CODE:PC0001*`,
		PC0002 : `Une erreur est produit *CODE:PC0002*`,
		PC0003 : `Une erreur est produit *CODE:PC0003*`,
		PC0004 : `Une erreur est produit *CODE:PC0004*`, 
	},

	/*
	 * Langue des demandes de confirmation.
	*/
	confirm : {
		C0001 : `Vous etes sur de vouloire suprimer l'intégration ? ceci n'est pas révesible` , 
	},

	/*
	 * Enregistrement des messages de success  
	*/
	success : {

	}
}