import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faPencilAlt,
  faPlus,
  faCheck,
  faArrowAltCircleLeft,
  faTrash,
  faMinus,
  faEdit,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

library
  .add(faTimes, faPencilAlt, faPlus, faCheck, faArrowAltCircleLeft, faTrash, faMinus, faEdit, faSyncAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
