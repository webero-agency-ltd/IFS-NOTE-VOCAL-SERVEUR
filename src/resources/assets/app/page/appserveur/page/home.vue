<template>
    <div class="homepage">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h2>{{$lang('appHomeTitle')}}</h2>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <h4>
                        <a href="/vocal-note">{{$lang('appNoteMobile')}}</a>
                    </h4>
                </b-col>
            </b-row>
            <b-row style="margin-top: 2rem">
                <b-col cols="12">
                    <b-card-group deck >
                        <b-card v-for="item in applications" :key="item.id"  footer-tag="footer" bg-variant="light" :header="item.name">
                            <b-card-text><h3>Recorder</h3></b-card-text>
                            <b-card-text><h3>00 : 12</h3></b-card-text>
                            <router-link :to="{name:'application', params : {id : item.id} }">
                                statistique
                            </router-link>
                            <em slot="footer">{{item.user_role}}</em>
                        </b-card>
                        <b-card @click="modale" class="text-center" bg-variant="light" >
                            ADD NEW
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
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

            modale() { 
                let footer = [
                    {event:'createApplication',name:'crée application',variant:'primary'}
                ]; 
                footer = [{event:'close',name:'ANNULE',variant:'secondary'},...footer]
                this.emit('modale',{title:this.$lang('appCreateApplicationTitle'),component:'create-application',footer}) 
            },

            async init(){
                //initialisation des stores de l'applications  
                console.log('FIND_ALL')
                await this.$store.dispatch('generale/application/FIND_ALL' , { namespace : 'generale' } ) ; 
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