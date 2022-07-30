import { createApp } from 'vue';
import './styles/index.css'
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
async function run(): Promise<void>{
    const app = createApp(App);
    // 挂载状态管理
    setupStore(app);
    // 挂载路由
    setupRouter(app);
// 路由准备就绪后挂载APP实例
    router.isReady().then(() => app.mount('#app'));
}
console.log(
    '%c @Sakura/admin %c v1.0 ',
    'color: white; background: #0078E7; padding:5px 0;',
    'padding:4px;border:1px solid #0078E7;'
);
run().then(r => console.log("success!"))