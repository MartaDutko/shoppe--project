import { createApp } from "vue";
import App from "./App.vue";
// import Vue from 'vue';

// 

import '../src/assets/styles/styles.css';
import router from "./router";
import i18n from "@/plugins/i18n";
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fab, fas, far)
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
// 
// import AlertCard from "@/components/AlertCard.vue";
// const app = createApp(App);
// app.component('alert-card', AlertCard);

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(router).use(store).use(i18n).component('font-awesome-icon', FontAwesomeIcon).use(vuetify).mount("#app");




