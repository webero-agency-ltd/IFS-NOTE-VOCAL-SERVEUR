<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <a-row>
            <a-col>
                <h3>{{$lang('appOptionTitleExternTrello')}}</h3>
                <a-table 
                    rowKey="id"
                    :columns="column"
                    :dataSource="application.trellos">
                    <template slot="id" slot-scope="id , record">
                        <a-radio-group v-model="trello" @change="onChange">
                            <a-radio :value="record.id">{{record.id}}</a-radio>
                        </a-radio-group>
                    </template>
                    <template slot="action" slot-scope="action , record">
                        <a-button v-if="option.external.trello==record.id" @click="pourOption( record )" type="primary" >Option</a-button>
                        <a-button v-if="option.external.trello==record.id" @click="labelOption( record )" type="primary" >Etiquette</a-button>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <a-divider dashed />
        <a-row>
            <a-col>
                <h3>{{$lang('appOptionTitleExternIFS')}}</h3>
                <a-table 
                    rowKey="id"
                    :columns="column"
                    :dataSource="application.infusionsofts">
                    <template slot="id" slot-scope="id , record">
                        <a-radio-group v-model="infusionsoft" @change="onChange">
                            <a-radio :value="record.id">{{record.id}}</a-radio>
                        </a-radio-group>
                    </template>
                    <template slot="action" slot-scope="action , record">
                        <a-button v-if="option.external.infusionsoft==record.id" @click="pourOption( record )" type="primary" >Option</a-button>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <a-row>
            <a-col>
                <a-button type="primary" icon="table" @click="create" block :loading="loading_btn" >Valider</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>

    import exoption from '../store/exoption' ; 
    import application from '../store/application' ; 
    
    let column =  [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 150,
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
            width: 150,
            scopedSlots: { customRender: 'action' },
        }
    ]; 

	export default {
		props : [ ], 
		data(){
            return {
                //
                trello : null ,
                infusionsoft : null ,

                option : exoption.stade , 
                column , 
                application : application.stade , 
                //button loader 
                loading_btn : false , 
            }
        },

        computed: {
        
        },

        watch : {

        },

        methods : { 

            labelOption : function ( option ) {
                this.emit('modal',{
                    title : this.$lang(`Edition des labels Trello`) , 
                    component : 'label-trello' , 
                    footer : true , 
                    handleOk : 'pourLabelCreate'
                })  
            },

            pourOption : function ( option ) {

                if ( option.type == "infusionsoft" ) {
                    this.emit('modal',{
                        title : this.$lang(`Edition de 'POUR' de infusionsoft`) , 
                        component : 'pourInfusionsoft' , 
                        handleOk : 'pourCreateInfusionsoft' , 
                        footer : true , 
                    }) 
                }else if ( option.type == "trello" ) {
                    this.emit('modal',{
                        title : this.$lang(`Edition de 'POUR' de trello`) , 
                        component : 'pourTrello' , 
                        handleOk : 'pourCreateTrello',
                        footer : true , 
                    })
                }

            },

            async create(){
                this.loading_btn = true ; 
                await exoption.createOption({ infusionsoft : parseInt(this.infusionsoft) , trello : parseInt(this.trello) }) ;
                this.loading_btn = false ; 
                this.init() ; 
            },  

            async init(){
                await application.allApplication() ;
                await exoption.findOption() ;
                //ajout de valeur par défaut de la checkbox
                this.trello = parseInt(this.option.external.trello) ; 
                this.infusionsoft = parseInt(this.option.external.infusionsoft) ; 
            },

            //////////////
            onChange (e) {
                console.log('radio checked', e.target.value)
            },

        },
		mounted(){
            this.init() ; 
		}

	}
</script>

<style>

</style>