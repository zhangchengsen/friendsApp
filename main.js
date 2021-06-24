import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import divider from 'components/common/divider.vue'
import loadMore from 'components/common/load_more.vue'
Vue.component('divider',divider)
Vue.component('loadMore',loadMore)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
