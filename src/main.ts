import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils - Only import what you need to reduce bundle size */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
/* Commented out unused utilities to reduce CSS size
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
*/

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// i18n
import { i18next } from './i18n';
import I18NextVue from 'i18next-vue';
import { createHead } from '@vueuse/head';
const pinia = createPinia();
const head = createHead();

const lang = localStorage.getItem('lang') || 'en';
document.body.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');

const app = createApp(App)
  .use(IonicVue)
  .use(pinia)
  .use(router)
  .use(I18NextVue, { i18next })
  .use(head);

router.isReady().then(() => {
  app.mount('#app');
});
