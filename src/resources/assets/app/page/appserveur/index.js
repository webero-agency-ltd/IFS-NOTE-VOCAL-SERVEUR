import Vue from 'vue';
import plugin from './core/plugin';
import router from './router/router';
import components from './core/components';
import directives from './core/directives';
import Vuex from 'vuex';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

new Vue({
    el: '#core',
    plugin ,
    components , 
    router , 
    render: h => h(App)
})
