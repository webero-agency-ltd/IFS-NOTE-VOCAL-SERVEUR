<template>
	<div>
        <a-table 
            rowKey="id"
            :columns="column"
            :loading="loading"
            :dataSource="pour.labels">
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
            <a-form-item :label="$lang('externalOptionTrelloLabelId')">
                <a-select v-model="form.appId">
                    <a-select-option v-for="item in optionsLabelsFilter" :key="item.value" :value="item.value">
                        {{item.text}}
                    </a-select-option>
                </a-select> 
            </a-form-item>
            <a-form-item :label="$lang('externalOptionTrelloDateLabel')">
                <a-input
                    v-decorator="[
                        'cardId',
                        {rules: [{ required: true, message: 'Please input Date !' }]} ]"
                    v-model="form.cardId" :placeholder="$lang('appInfusionsoftName')" /> 
            </a-form-item>
            <a-button icon="plus" @click="create" block :loading="loading_btn" >Valider</a-button>
        </a-form>
	</div>
</template>
<script>
    
    import exoption from '../store/exoption' ; 
    import pour from '../store/pour' ; 
    import user from '../store/user' ; 
    import trello from '../store/trello' ; 

    let column =  [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 20,
            scopedSlots: { customRender: 'id' },
        },
        {
            title: 'Lables trello',
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
		props : [], 
		data(){
            return {
                column ,
                option : exoption.stade , 
                pour : pour.stade , 
                users : user.stade , 
                trello : trello.stade , 
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
            optionsLabelsFilter : function () {
                return this.trello.labels.filter(({ value }) => {
                    let filter = this.pour.lists.filter( ({ appId }) => value == appId ) ; 
                    if ( filter.length > 0 ) {
                        return false ; 
                    }
                    return true ; 
                })
            }
        },

        methods : {
        	
            create : async function () {
                
        		if( this.form.name && this.form.appId ){
                    await pour.createPour( { type : 'label' , name : this.form.name , appId : this.form.appId , cardId : this.form.cardId?this.form.cardId:0, application : this.option.external.trello } ) ; 
                    this.form.name = ''
                    this.form.appId = ''
                    this.form.cardId = ''
        		}

        	},

            //suppression d'un pour en particulier 
            async deletePour( row ){
                this.loading_btn_delete = true ;
                await pour.deletePour( row.id ) ;  
                this.loading_btn_delete = false ;
                this.init() ;
            },
            
            //affichage de tout les card 
            async init(){
                let option = await exoption.findOption() ;  
                if ( this.option.external.trello ) {
                    await pour.allPour( this.option.external.trello ) ;  
                    //récupèration des lites des
                    await user.allTeam( this.option.external.trello ) ; 
                    await trello.allLabel( this.option.external.trello ) ;
                    console.log( this.trello ) 
                    //this.team() ; 
                }
                this.loading = false ;
            }

        },
		created(){
			this.init() ; 
		}
	}
</script>