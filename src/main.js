import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerTokensRefresh } from './utils';

await store.dispatch('restoreAuth');

registerTokensRefresh();

createApp(App).use(store).use(router).mount('#app');
