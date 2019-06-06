module.exports = {
    /*
     * lang générale utilisé par l'application
    */
    MessageAppGlobalErreur: 'Une erreur est survenu, veillé ressayer svp',
    /*
     * 	Les langues de la page signup
    */
    signupEmail: 'Email',
    signupFullname: 'Fullname',
    signupPassword: 'Password',
    signupConfpassword: 'conf-pass',
    signupEmailReady: 'Cette utilisateur existe déja',
    //les erreurs des forumaires d'inscription 
    signupEmailConfpassword2: 'Ne correspond pas a password',
    //alert 
    signupSuccess: 'Votre inscription a réussi avec success',
    /*
     * Page index de l'application
    */
    appMenuHome: 'Home',
    appMenuIFS: 'Infustionsoft',
    appMenuUsers: 'Users',
    appMenuNotes: 'Notes',
    appMenuOptions: 'Option',
    //page home de l'application en js 
    appHomeTitle: 'Liste de votre intégration infusionsoft',
    //Modale Création d'infusionsoft dans la page home
    appCreateApplicationTitle: "Nouvelle Int\u00E9gration",
    appInfusionsoftName: 'Name',
    appInfusionsoftUrlId: 'Url ID',
    //trello lang
    appTrelloName: 'Name compte trello',
    TrelloNull: 'l\'ID ne correspond pas a un compte trello, ou vous n\'avez pas d\'authorisation',
    TrelloTokenError: 'l\'access token de trello est erreur',
    //page infusionsoft
    appIFSTitle: 'La statique de votre page',
    InfusionsoftNull: 'l\'ID ne correspond pas a un compte infusionsoft, ou vous n\'avez pas d\'authorisation',
    InfusionsoftAPINull: 'Il semble que les donners de l\'infusionsoft est vide',
    InfusionsoftTokenError: 'l\'access token de l\'application est erreur',
    //note page
    filesnoteimpty: 'Fichier pas trouver',
    //page utilisateur 
    appUserTitle: 'Teams de compte',
    appMembreTrello: 'Membre trello',
    appMembreInfusionsof: 'User Infusionsoft',
    //page add notes vocals 
    addvocalFormTitle: 'Title',
    addvocalFormDescription: 'Description',
    addvocalInfusionsoft: 'Contact ID IFS',
    //page option application 
    appOptionTitle: 'Paramètrage de la board trello',
    //langue de l'externale page
    appOptionTitleExternTrello: 'Compte trello a utilisé',
    appOptionTitleExternIFS: 'Compte infusionsoft a utilisé',
    externalOptionTrelloListId: "Liste trello",
    externalOptionTrelloAppId: "Compte trello",
    //langue de la création de label de l'application 
    externalOptionTrelloLabelId: "Labels trello",
    externalOptionTrelloDateLabel: "Date Add",
    /*
     * Enregistrement des langues de tout les erreurs
    */
    errors: {
        //les erreur de manipulation de base de donner 
        //libs application
        A0001: "IL y a une erreur lors de la traitement des donners *CODE:A0001*",
        //libs team
        T0001: "IL y a une erreur lors de la traitement des donners *CODE:T0001*",
        //erreur de la page index 
        //IXR0001 : `Une erreur est produit *CODE:IXR0001*`,
        //eurreur dans application controlleur 
        //AID001 : `Erreur d'autentification *CODE:AID001*` , 
        //AID002 : `Erreur de récupération de votre donner, veuille réssayer svp *CODE:AID002*` , 
        AC001: "Erreur lors de la cr\u00E9ation de l'application *CODE:AC001*",
        AC002: "Erreur d'autentification *CODE:AC002*",
        AC003: "Une erreur est survenue *CODE:AC003*",
        AC004: "Impossible de cr\u00E9e le teams *CODE:AC004*",
        AC005: "Une erreur est survenue *CODE:AC005*",
        AC006: "Une erreur est survenue *CODE:AC006*",
        //AID000 : `Erreur d'autentification *CODE:AID000*`,
        ARE001: "Impossible de trouver l'app infusionsoft *CODE:ARE001*",
        ARE002: "Erreur de r\u00E9cup\u00E9ration de l'accesstoken d'infusionsoft *CODE:ARE002*",
        ARE003: "Une erreur est survenue *CODE:ARE003*",
        ARE004: "Impossible de r\u00E9cup\u00E9r\u00E9 l'utilisateur infusionsoft *CODE:ARE004*",
        ARE005: "Impossible de r\u00E9cup\u00E9r\u00E9 le token infusionsoft *CODE:ARE005*",
        ART001: "Impossible de trouver l'app trello *CODE:ART001*",
        //ART002 : `Impossible de trouver l'app trello *CODE:ART002*`,
        ART003: "Impossible de r\u00E9cup\u00E9r\u00E9 le token trello *CODE:ART003*",
    },
    /*
     * Langue des demandes de confirmation.
    */
    confirm: {
        C0001: "Vous etes sur de vouloire suprimer l'int\u00E9gration ? ceci n'est pas r\u00E9vesible",
    },
    /*
     * Enregistrement des messages de success
    */
    success: {}
};
