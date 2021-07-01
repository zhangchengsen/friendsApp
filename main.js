import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import divider from 'components/common/divider.vue'
import loadMore from 'components/common/load_more.vue'
import nothing from 'components/common/nothing.vue'
import upload_image from "components/common/upload_img.vue"

import $C from './common/config.js'
import $U from './common/util.js'
Vue.prototype.$C = $C
Vue.prototype.$U = $U
Vue.component('divider',divider)
Vue.component('loadMore',loadMore)
Vue.component('nothing',nothing)
Vue.component('uploadImage',upload_image)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
