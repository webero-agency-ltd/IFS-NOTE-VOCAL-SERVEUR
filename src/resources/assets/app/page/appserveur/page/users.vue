<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <a-row :gutter="12">
            <a-col v-if="application.item.type=='trello'" >
                <div>
                    <h3>{{$lang('appMembreTrello')}}</h3>
                </div>
                <a-divider dashed />
                <a-table 
                    rowKey="id"
                    :columns="trello_column"
                    :dataSource="users.membreTrelloNoteTeam"
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
            <a-col v-if="application.item.type=='infusionsoft'">
                <div>
                    <h3>{{$lang('appMembreInfusionsof')}}</h3>
                </div>
                <a-divider dashed />
                <a-table 
                    rowKey="id"
                    :columns="infusionsoft_column"
                    :dataSource="users.membreIFSNoteTeam"
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
                    :dataSource="users.teams"
                    :loading="users_loading">
                </a-table>
            </a-col>
        </a-row>
    </div>

</template>
<script>

    import application from '../store/application' ; 
    import user from '../store/user' ; 

    let users_columns =  [
        {
            title: 'Email',
            dataIndex: 'email',
            width: 150,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            width: 150,
        },
        {
            title: 'role',
            dataIndex: 'role',
            width: 150,
        }
    ]; 

    let trello_column =  [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: 150,
        },
        {
            title: 'Link add team',
            dataIndex: 'add',
            width: 150,
            scopedSlots: { customRender: 'add' },
        }
    ]; 

    let infusionsoft_column =  [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: 150,
        },
        {
            title: 'Link add team',
            dataIndex: 'add',
            width: 150,
            scopedSlots: { customRender: 'add' },
        }
    ]; 

	export default {
		props : [ ], 
		data(){
            return {
                
                application : application.stade , 
                users : user.stade , 
                urladdteams : '' ,  
                
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
        
        },
        methods : { 

            async finduser() {
                if ( !this.application.item ) 
                    return ; 
                if ( this.application.item.type == "trello" ) {
                    if ( !this.application.item.compteId ) {
                        this.$router.push({ name: 'option', params: { id: this.$route.params.id } }) 
                    }else{
                        await user.membreTrello( this.$route.params.id ) ;
                        this.trello_loading = false ;
                    }
                }else{
                    await user.membreInfusionsoft( this.$route.params.id ) ;
                    this.infusionsoft_loading = false ; 
                }
                this.urladdteams = window.urlapplication + '/team/'+ this.application.item.unique ; 
            },

            async init(){
                await application.itemApplication( this.$route.params.id ) 
                await user.allTeam( this.$route.params.id ) ; 
                this.users_loading = false ;
                this.finduser() ; 
            },
        },
		created(){ 
            this.init() ; 
		}
	}
</script>