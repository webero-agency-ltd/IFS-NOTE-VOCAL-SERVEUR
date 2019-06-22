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
    appMenuApp: 'Application',
    appMenuUsers: 'Users',
    appMenuNotes: 'Notes',
    appMenuOptions: 'Option',
    appMenuDashbord: 'Dashboard',
    //page home de l'application en js 
    appHomeTitle: 'Mes application',
    appNoteMobile: 'Note mobile',
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
        ART004: "Impossible de r\u00E9cup\u00E9r\u00E9 le token trello *CODE:ART004*",
        //AIT001 : `Accunne application est ratacher a cette ID *CODE:AIT001*`,
        ARA001: "Une erreur est produit *CODE:ARA001*",
        ARA002: "Une erreur est produit *CODE:ARA002*",
        ARA003: "Une erreur est produit *CODE:ARA003*",
        ARA004: "Une erreur est produit *CODE:ARA004*",
        //les erreur générale de l'applications 
        //G0001 : `Une erreur est produit veille réactualisé votre app svp *CODE:G0001*`,
        //Erreur qui se trouve dans la pages teams 
        //T0001 : `Erreur de récupération des teams de l'applications *CODE:T0001*` ,
        //erreur sur la controller team  
        //TMB001 : `Erreur de récupération des teams de l'applications *CODE:TMB001*` , 
        //TMB002 : `Erreur de récupération des bords trello *CODE:TMB002*` , 
        //TML001 : `Erreur de récupération des teams de l'applications *CODE:TML001*` , 
        TML002: "Erreur de r\u00E9cup\u00E9ration des lists trello *CODE:TML002*",
        //TMBU001 : `Erreur de récupération de l'applications *CODE:TMBU001*` , 
        //TMBU002 : `Une erreur est produit *CODE:TMBU002*` , 
        //TMBU003 : `Impossible de récupère les listes de trello *CODE:TMBU002*` , 
        //erreur d'infusionsoft controller 
        //IM0001 : `Impossible de récupère le compte infuisonsoft *CODE:IM0001*`,
        //IM0002 : `Erreur sur le token de l'application infusionsoft *CODE:IM0002*`,
        IM0003: "Une erreur est produit *CODE:IM0003*",
        //IC0001 : `Impossible de récupère le compte infuisonsoft *CODE:IC0001*`,
        //IC0002 : `Erreur sur le token de l'application infusionsoft *CODE:IC0002*`,
        IC0003: "Une erreur est produit *CODE:IC0003*",
        //erreur de page external 
        EC0001: "Erreur de r\u00E9cup\u00E9ration d'information de l'utilisateur *CODE:EC0001*",
        EC0002: "Erreur de r\u00E9cup\u00E9ration d'information de l'utilisateur *CODE:EC0002*",
        EI0001: "Erreur de r\u00E9cup\u00E9ration d'information de l'utilisateur *CODE:EI0001*",
        EI0002: "Une erreur est produit *CODE:EI0002*",
        EI0003: "Une erreur est produit *CODE:EI0003*",
        EI0004: "Une erreur est produit *CODE:EI0004*",
        EN0001: "Une erreur est produit *CODE:EN0001*",
        EN0002: "Une erreur est produit *CODE:EN0002*",
        EN0003: "Une erreur est produit *CODE:EN0003*",
        EN0004: "Une erreur est produit *CODE:EN0004*",
        EN0005: "Une erreur est produit *CODE:EN0005*",
        EN0006: "Une erreur est produit *CODE:EN0006*",
        EN0007: "Une erreur est produit *CODE:EN0007*",
        EN0008: "Une erreur est produit *CODE:EN0008*",
        //generale externale page
        //GE000A : `Veillez d'abord paramètre votre application` , 
        //erreur dans la controller pour 
        //PI001 : `Une erreur est produit *CODE:PI001*`,
        //PI002 : `Une erreur est produit *CODE:PI002*`,
        //PD001 : `Une erreur est produit *CODE:PD001*`,
        //PD002 : `Une erreur est produit *CODE:PD002*`,
        //PD003 : `Une erreur est produit *CODE:PD003*`,
        //PC0001 : `Une erreur est produit *CODE:PC0001*`,
        //PC0002 : `Une erreur est produit *CODE:PC0002*`,
        //PC0003 : `Une erreur est produit *CODE:PC0003*`,
        //PC0004 : `Une erreur est produit *CODE:PC0004*`, 
        /////
        // euror dans le fichier note
        N0001: "Une erreur est produit *CODE:N0001*",
        N0002: "Une erreur est produit *CODE:N0002*",
        N0003: "Une erreur est produit *CODE:N0003*",
        N0004: "Une erreur est produit *CODE:N0004*",
        N0005: "Une erreur est produit *CODE:N0005*",
        N0006: "Une erreur est produit *CODE:N0006*",
        N0007: "Une erreur est produit *CODE:N0007*",
        //erreur dans la page form
        F0001: "Une erreur est produit lors de l'ajout du formulaire *CODE:F0001*",
        F0002: "Une erreur est produit lors de l'ajout du formulaire *CODE:F0002*",
        F0003: "Une erreur est produit lors de l'ajout du formulaire *CODE:F0003*",
        F0004: "Une erreur est produit lors de la mise a jour de la valeur du formulaire *CODE:F0004*",
        //erreur de récupération de donner dans transfère wise 
        TWP0001: "Une erreur est produit dans transferwise *CODE:TWP0001*",
        TWP0002: "Une erreur est produit dans transferwise *CODE:TWP0002*",
        TWP0003: "Une erreur est produit dans transferwise *CODE:TWP0003*",
        TWP0004: "Une erreur est produit dans transferwise *CODE:TWP0004*",
        TWP0005: "Une erreur est produit dans transferwise *CODE:TWP0005*",
        TWP0006: "Une erreur est produit dans transferwise *CODE:TWP0006*",
        TWP0007: "Une erreur est produit dans transferwise *CODE:TWP0007*",
        TWP0008: "Une erreur est produit dans transferwise *CODE:TWP0008*",
        TWP0009: "Une erreur est produit dans transferwise *CODE:TWP0009*",
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
