<template>
	<div>
        <a-table 
            rowKey="id"
            :columns="column"
            :loading="loading"
            :dataSource="pour.lists">
            <template slot="action" slot-scope="action , record">
                <a-button icon="delete" type="danger" @click="deletePour(record)" :loading="loading_btn_delete" >Suprimer</a-button>
            </template>
        </a-table>
        <a-form :layout="'vertical'">
            <a-form-item :label="$lang('appInfusionsoftName')">
                <a-input
                    v-decorator="[
                        'name',
                        {rules: [{ required: true, message: 'Please input name!' }]} ]"
                    v-model="form.name" :placeholder="$lang('appInfusionsoftName')" /> 
            </a-form-item>
            <a-form-item :label="$lang('appOptionTitleExternIFS')">
                <a-select v-model="form.appId">
                    <a-select-option v-for="item in optionsUser" :key="item.value" :value="item.value">
                        {{item.text}}
                    </a-select-option>
                </a-select> 
            </a-form-item>
            <a-button icon="plus" @click="create" block :loading="loading_btn" >Valider</a-button>
        </a-form>
	</div>
</template>
<script>
    
    import exoption from '../store/exoption' ; 
    import pour from '../store/pour' ; 
    import user from '../store/user' ; 

    let column =  [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 20,
            scopedSlots: { customRender: 'id' },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
            scopedSlots: { customRender: 'name' },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 50,
            scopedSlots: { customRender: 'action' },
        }
    ]; 

	export default {
		props : ['infusionsoft'], 
		data(){
            return {
                column ,
                option : exoption.stade , 
            	pour : pour.stade , 
                users : user.stade , 
            	loading : true , 
                form: {
                    name : '',
                    appId : '' , 
					cardId : '' , 
                },
                optionsUser : [] , 
                loading_btn : false , 
				loading_btn_delete : false , 
            }
        },
        watch : {

        },
        computed: {

        },
        methods : {

            create : async function () {
                if( this.form.name && this.form.appId ){
                    await pour.createPour( { type : 'infusionsoft' , name : this.form.name , appId : this.form.appId , cardId : null , application : this.option.external.infusionsoft } ) ; 
                    this.form.name = ''
                    this.form.appId = '' 
                    this.init() ;
                }
            },

            //suppression d'un pour en particulier 
            async deletePour( row ){
                this.loading_btn_delete = true ;
                await pour.deletePour( row.id ) ;  
                this.loading_btn_delete = false ;
                this.init() ;
            },

            team(){

                console.log( this.users.teams )
                this.optionsUser = this.users.teams.map(({ fullname , contactid }) => { 
                    return { text : fullname , value : contactid }
                })
                .filter( (e) => {
                    let existe = false ; 
                    for (var i = 0; i < this.pour.lists.length; i++) {
                        if ( this.pour.lists[i].appId == e.value ) {
                            existe = true ; 
                        }
                    }
                    return !existe
                })
            },

            async init(){
                let option = await exoption.findOption() ;  
                if ( this.option.external.infusionsoft ) {
                    await pour.allPour( this.option.external.infusionsoft ) ;  
                    //récupèration des lites des
                    await user.allTeam( this.option.external.infusionsoft ) ; 
                    this.team() ; 
                }
                this.loading = false ;
            }

        },
		created(){ 
			this.init() ;
		}
	}
</script>