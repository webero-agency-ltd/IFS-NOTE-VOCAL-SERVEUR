<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <div style="display: flex;">
            <h3>{{$lang('appOptionTitle')}}</h3>
        </div>
        <a-divider dashed />
        <a-row :gutter="16">
            <a-col>
                <a-table 
                    :columns="fields"
                    :dataSource="trello.boards"
                    :loading="loading"
                    rowKey="title">
                    <template slot="checkbox" slot-scope="checkbox , record">
                        <a-radio-group @change="onChange" v-model="compte">
                            <a-radio :value="record.id">{{record.id}}</a-radio>
                        </a-radio-group>
                    </template>
                    <template slot="link" slot-scope="link , record">
                        <a target="_blank" :href="record.url">{{record.url}}</a>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col>
                <a-button type="primary" icon="table" @click="create" block :loading="loading_btn" >Valider</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>

    import trello from '../store/trello' ; 
    import application from '../store/application' ; 

    let fields =  [
        {
            title: 'ID',
            dataIndex: 'checkbox',
            width: 30,
            scopedSlots: { customRender: 'checkbox' },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 150,
        },
        {
            title: 'Url',
            dataIndex: 'url',
            width: 150,
            scopedSlots: { customRender: 'link' },
        }
    ] ; 
    
	export default {
		props : [ ], 
		data(){
            return {
                trello : trello.stade , 
                application : application.stade , 
                compte : '' , 
                loading : true ,
                fields ,
                loading_btn  : false , 
            }
        },

        computed: {
        
        },

        watch : {

        },

        methods : { 

            onChange (e) {
                console.log('radio checked', e.target.value)
            },

            async create(){
                let item = null ;
                for( const i of this.trello.boards ){
                    if ( i.id == this.compte ) {
                        item = i ; 
                    }
                }
                this.loading_btn = true; 
                await application.addBoard( { id : this.$route.params.id,  compte : this.compte , url : item.url } ) 
                this.loading_btn = false; 
                this.init() ; 
            },  

            async init(){
                await application.itemApplication( this.$route.params.id ) 
                await trello.allBoard( this.$route.params.id ); 
                this.loading = false ; 
                if ( this.application.item ) {
                    this.compte = this.application.item.compteId ;
                }
            },

        },
		mounted(){
            this.init() ; 
		}
	}
</script>

<style>

</style>