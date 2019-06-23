<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        
        <a-row :gutter="12">
            <a-col v-if="applicationsItem.type=='trello'" >
                <div>
                    <h3>{{$lang('appMembreTrello')}}</h3>
                </div>
                <a-divider dashed />
                <a-table 
                    rowKey="id"
                    :columns="trello_column"
                    :dataSource="trellos"
                    :loading="trello_loading">
                    <template slot="add" slot-scope="add , record" >
                        <a-popover placement="topLeft">
                            <template slot="content">
                                <p>{{urladdteams+'/trello/'+record.id}}</p>
                            </template>
                            <a-button variant="primary" >Add team</a-button>
                        </a-popover>
                    </template>
                </a-table>     
            </a-col>
            <a-col v-if="applicationsItem.type=='infusionsoft'">
                <div>
                    <h3>{{$lang('appMembreInfusionsof')}}</h3>
                </div>
                <a-divider dashed />
                <a-table 
                    rowKey="id"
                    :columns="infusionsoft_column"
                    :dataSource="infusionsofts"
                    :loading="infusionsoft_loading"
                    >
                    <template slot="add" slot-scope="add , record" >
                        <a-popover placement="topLeft">
                            <template slot="content">
                                <p>{{urladdteams+'/infusionsoft/'+record.id}}</p>
                            </template>
                            <a-button variant="primary" >Add team</a-button>
                        </a-popover>
                    </template>
                </a-table>
            </a-col>
            <a-col>
                <div>
                    <h3>{{$lang('appUserTitle')}}</h3>
                </div>
                <a-divider dashed />
                <a-table 
                    rowKey="email"
                    :columns="users_columns"
                    :dataSource="items"
                    :loading="users_loading">
                </a-table>
            </a-col>
        </a-row>
    </div>

</template>
<script>

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        mapApplicationFields ,
        mapUsersFields ,
        mapUsersMultiRowFields
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);

    const { 
        mapActions: mapGeneraleMutations, 
        mapState: mapGeneraleActions 
    } = createNamespacedHelpers(`generale`);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);

    const { 
        mapMutations: mapUsersMutations , 
        mapActions: mapUsersActions 
    } = createNamespacedHelpers(`generale/users`);

    let users_columns =  [{
        title: 'Email',
        dataIndex: 'email',
        width: 150,
    },{
        title: 'Full Name',
        dataIndex: 'fullname',
        width: 150,
    },{
        title: 'role',
        dataIndex: 'role',
        width: 150,
    }] ; 

    let trello_column =  [{
        title: 'Full Name',
        dataIndex: 'fullName',
        width: 150,
    },{
        title: 'Link add team',
        dataIndex: 'add',
        width: 150,
        scopedSlots: { customRender: 'add' },
    }] ; 

    let infusionsoft_column =  [{
        title: 'Full Name',
        dataIndex: 'fullName',
        width: 150,
    },{
        title: 'Link add team',
        dataIndex: 'add',
        width: 150,
        scopedSlots: { customRender: 'add' },
    }] ; 

	export default {
		props : [ ], 
		data(){
            return {
                urladdteams : '' , 
                //membre équipe 
                trellos : [] , 
                items : [] , 
                infusionsofts : [] , 
                //table ici
                fields : [
                    { key: "fullName", label: "full name" },
                    { key: "id", label: "ID" },
                    { key: "add", label: "Add Team" },
                ],
                users_columns , 
                trello_column , 
                infusionsoft_column ,  
                //loading 
                trello_loading : true , 
                infusionsoft_loading : true , 
                users_loading : true ,
            }
        },

        computed: {
            ...mapGeneraleActions([`error`, `success`]),
            ...mapUsersMultiRowFields({ applicationTeam: `teams` , membreTrello : `membreTrello` , membreInfusionsoft : `membreInfusionsoft` }),
            ...mapApplicationFields({ applicationsItem: `item` }),
        },

        watch : {

            membreInfusionsoft : function (argument) {
                this.infusionsofts = this.membreInfusionsoft.map(({ id , fullName , add }) => {
                    return { id , fullName , add }
                }).filter(({ id }) => {
                    let is = this.applicationTeam.filter((un) => {
                        let unique = un.id ; 
                        if ( id == unique ) {
                            return true;
                        }
                        return false ; 
                    })
                    if ( is.length > 0 ) {
                        return false
                    }
                    return true ; 
                })
                this.infusionsoft_loading = false ; 
            },

            membreTrello : function (argument) {
                this.trellos = this.membreTrello.map(({ id , fullName , add }) => {
                    return { id , fullName , add }
                }).filter(({ id }) => {
                    let is = this.applicationTeam.filter((un) => {
                        let unique = un.id ; 
                        console.log( id == unique , id , unique )
                        if ( id == unique ) {
                            return true;
                        }
                        return false ; 
                    })
                    if ( is.length > 0 ) {
                        return false
                    }
                    return true ; 
                })
                console.log( this.trellos )
                this.trello_loading = false ; 

            },

            applicationTeam :  function () {
                this.items = this.applicationTeam.map(({ email , fullname , role }) => {
                    return { email , fullname , role }
                }) 
                this.users_loading = false ; 
                //récupération de l'information de l'application qui a le focus 
                this.$store.dispatch('generale/application/ITEM_APPLICATION' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
            },

            applicationsItem : function () {
                if ( !this.applicationsItem ) 
                    return ; 
                if ( this.applicationsItem.type == "trello" ) {
                    if ( !this.applicationsItem.compteId ) {
                        this.$router.push({ name: 'option', params: { id: this.$route.params.id } }) 
                    }else{
                        this.$store.dispatch('generale/users/MEMBRE_TRELLO' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
                    }
                }else{
                    this.$store.dispatch('generale/users/MEMBRE_INFUSIONSOFT' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
                }
                this.urladdteams = window.urlapplication + '/team/'+ this.applicationsItem.unique ; 
            }
        },

        methods : {  
            async init(){
                await this.$store.dispatch('generale/users/ALL_TEAM' , { namespace : 'generale' , id : this.$route.params.id } ) ; 
            },
        },
		created(){ 
            this.init() ; 
		}
	}
</script>