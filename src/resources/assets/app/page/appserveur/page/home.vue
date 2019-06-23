<template>
    <div :style="{ marginLeft: 'auto', marginRight: 'auto', background: '#fff', padding: '24px', minHeight: '380px' , maxWidth : '992px' }">
        <div style="display: flex;">
            <h1>{{$lang('appHomeTitle')}}</h1>
            <h3 style="flex: 1;"><a href="/vocal-note" style="float: right; line-height: 2rem;"><a-icon type="mobile" />{{$lang('appNoteMobile')}}</a></h3>
        </div>
        <a-divider dashed />
        <a-row :gutter="16">
            <a-col :span="8" v-for="item in applications" :key="item.id">
                <a-card>
                    <template class="ant-card-actions" slot="actions">
                        <a-icon @click="dashboard(item.id)" type="dashboard" />
                        <a-icon type="user" />
                        <a-icon type="delete" />
                    </template>
                    <a-card-meta
                        :title="item.name"
                        :description="item.user_role">
                        <a-avatar v-if="item.type=='trello'" slot="avatar" src="/assets/img/trello.png" />
                        <a-avatar v-if="item.type=='infusionsoft'" slot="avatar" src="/assets/img/infusionsoft.png" />
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>
        <div style="margin-top: 1.5rem;">
            <a-button type="primary" icon="plus-circle" @click="newapplication" block >Add new application</a-button>
        </div>
    </div>
</template>
<script>

    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    
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
                
            }
        },
        computed: {
            ...mapGeneraleActions([`error`, `success`]),
            ...mapApplicationMultiRowFields({ applications: `rows` }),
        },
        methods : {

            newapplication() { 
                
                this.emit('modal',{
                    title : this.$lang('appCreateApplicationTitle') , 
                    component : 'create-application' , 
                    handleOk : 'ApplicationCreate'
                })

            },

            async init(){
                //initialisation des stores de l'applications  
                await this.$store.dispatch('generale/application/FIND_ALL' , { namespace : 'generale' } ) ; 
            },

            //redirection a la page dashbord 
            async dashboard( page ){
                this.$router.push({ name: 'application', params: { id: page } }) 
            }

        },
        mounted(){
            this.init()
        }
    }
</script>

<style>
    .homepage{
        position: fixed;
        top: 0;left: 0;right: 0;bottom: 0;
        z-index: 1025;
        background-color: #FFF ;
        padding-top: 3rem;
    }
</style>