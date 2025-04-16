import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './main.scss';

// import { useWindowStore, WindowStoreType } from '@/store';

const pinia = createPinia()

// const store = useWindowStore();

createApp(App).use(pinia).use(router).mount('#app')

// provide<WindowStoreType>('windowStore', store)
