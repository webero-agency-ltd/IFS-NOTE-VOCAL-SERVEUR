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
                    :dataSource="items"
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

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
    import {
        generale,
        mapApplicationFields ,
        mapUsersFields ,
        mapUsersMultiRowFields , 
        mapTrelloMultiRowFields
    } from '../store/pages/generale';
    
    if (!store.state.generale) store.registerModule(`generale`, generale);

    const { 
        mapMutations: mapApplicationMutations , 
        mapActions: mapApplicationActions 
    } = createNamespacedHelpers(`generale/application`);

    let fields =  [{
        title: 'ID',
        dataIndex: 'checkbox',
        width: 30,
        scopedSlots: { customRender: 'checkbox' },
    },{
        title: 'Title',
        dataIndex: 'title',
        width: 150,
    },{
        title: 'Url',
        dataIndex: 'url',
        width: 150,
        scopedSlots: { customRender: 'link' },
    }] ; 
    
	export default {
		props : [ ], 
		data(){
            return {
                infusionsoft : {} , 
                compte : '' , 
                items: [],
                loading : false ,
                fields ,
                loading_btn  : false , 
            }
        },

        computed: {
            ...mapApplicationFields({ applicationsItem: `item` }),
            ...mapTrelloMultiRowFields({ trelloBoards: `boards` }),
        },

        watch : {

            applicationsItem : function () {
                if ( this.applicationsItem ) {
                    this.compte = this.applicationsItem.compteId ;
                }
            },

            trelloBoards : function () {
                this.items = this.trelloBoards.map(({ id , title , url }) => {
                    return { id , title , url }
                }) 
            }

        },

        methods : { 

            async create(){
                let item = null ;
                for( const i of this.items ){
                    if ( i.id == this.compte ) {
                        item = i ; 
                    }
                }
                this.loading_btn = true; 
                await this.$store.dispatch('generale/trello/ADD_BOARDS' , { id : this.$route.params.id,  compte : this.compte , url : item.url ,namespace : 'generale'} ) ; 
                this.loading_btn = false; 
            },  

            async init(){
                await this.$store.dispatch('generale/application/ITEM_APPLICATION' , { id : this.$route.params.id ,namespace : 'generale' } ) ; 
                await this.$store.dispatch('generale/trello/ALL_BOARDS' , { id : this.$route.params.id  ,namespace : 'generale' }) ; 
            },

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