import { createApp } from 'vue';
import App from './App.vue';
async function run(): Promise<void>{
    const app = createApp(App);
}
console.log(
    '%c @Sakura/admin %c v1.0 ',
    'color: white; background: #0078E7; padding:5px 0;',
    'padding:4px;border:1px solid #0078E7;'
);
run().then(r => console.log("success!"))