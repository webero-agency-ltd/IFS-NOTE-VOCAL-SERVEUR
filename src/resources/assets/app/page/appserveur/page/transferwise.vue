<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <h1>mes transfer dans transferwise</h1>
        <a-table :columns="columns"
            :dataSource="data"
            rowKey="created"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange">
            <template slot="montant" slot-scope="montant , record">
                {{record.sourceValue}} {{record.sourceCurrency}} 
            </template>
        </a-table>
    </div>
</template>
<script>
    
    const columns = [{
        title: 'Date',
        dataIndex: 'created',
        width: 150,
    },
    { 
        title: 'Source',
        dataIndex: 'source.accountHolderName',
        width: 150,
    },
    {
        title: 'Destinataire',
        dataIndex: 'target.accountHolderName',
        width: 150,
    },
    {
        title: 'Montant',
        dataIndex: 'montant',
        width: 150,
        scopedSlots: { customRender: 'montant' },
    }];

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    import api from '../libs/api';
    
    import {
        generale,
        mapApplicationMultiRowFields ,
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

    export default {
        props : [ ], 
        data(){
            return {
                data: [] ,
                pagination : {},
                loading: false,
                columns,
            }
        },
        computed: {
            
        },
        methods : {

            async init(){
                let [ err , reponse ] = await api( '/transferwise/transfers/key' )
                console.log( reponse )
                if ( reponse.data.token ) {
                    this.fetch( {page : 1} );
                }else{
                    //on ouvre le modale et en bloque tant que l'utilisateur na pas ajouter un token valide 
                    this.emit('modal',{
                        title : 'Changement de l\'API key' , 
                        component : 'wisetransferApikey' , 
                        handleOk : 'WisetransferApikeyCreate'
                    })
                }
            },

            handleTableChange (pagination, filters, sorter) {
                this.fetch({
                    page: pagination.current,
                });
            },

            async fetch ({ page }) {
                this.loading = true
                let [ err , reponse ] = await api( '/transferwise/transfers?page='+page )
                this.loading = false;
                if ( ! reponse ) 
                    return !1 ; 
                let { data } = reponse ; 
                this.data = [ ...data.listes ];
                this.pagination = { ...data.pagination };
            }

        },
        mounted() {
            this.init() ; 
            this.on('WisetransferApikeyRefresh', () => {
                this.init() ; 
            })
        },
    }
</script>

<style>

</style>