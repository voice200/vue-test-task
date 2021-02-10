import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import '@/assets/style/style.css';
import router from '@/router';
import store from '@/store';
import firebase from "firebase/app";
import vuetify from './plugins/vuetify';


Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(vuetify)

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  store,
  vuetify,
  router,
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyClLfZN4thZbBzwK30PN29vGYz_xhP7MuQ",
      authDomain: "vue-myprofile.firebaseapp.com",
      databaseURL: 'https://vue-myprofile-default-rtdb.firebaseio.com',
      projectId: "vue-myprofile",
      storageBucket: "vue-myprofile.appspot.com",
      messagingSenderId: "968442225864",
      appId: "1:968442225864:web:c21a2d730210b1603031fd"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogUser', user)
      }
    });

    this.$store.dispatch('fetchUsers')
  },
  render: h => h(App)
}).$mount('#app')
