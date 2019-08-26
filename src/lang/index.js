import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './EN'
import zhLocale from './zh_CN'

Vue.use(VueI18n);
const messages = {
    'zh': zhLocale, // 中文
    'en': enLocale // 英文
}
const i18n = new VueI18n({
    locale:'zh', // set locale
    // locale:'zh', // set locale
    messages // set locale messages
});

export default i18n
