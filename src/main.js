import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import 'bootstrap';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import toCurrency from '@/assets/javaScript/toCurrency';
import emitter from '@/assets/javaScript/mitt';
import App from './App.vue';
import router from './router';

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');
// swal設定
const options = {
  cancelButtonClass: 'btn btn-outline-dark',
  buttonsStyling: false,
  focusCancel: true,
};
const app = createApp(App);
app.config.globalProperties.toCurrency = toCurrency;
app.config.globalProperties.emitter = emitter;
app.use(VueAxios, axios);
app.use(router);
app.use(VueSweetalert2, options);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
