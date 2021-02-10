<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nav-bar nav-bar__decoration">
    <router-link class="navbar-brand nav-bar_logo" to="/">Aplication for you</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse nav-bar_links" id="navbarSupportedContent" >
      <ul class="navbar-nav nav-bar_links__position">
        <router-link tag="li" class="nav-item active" :to="link.url" v-for="link in links" :key="link.title + Date.now.toString()">
          <a class="nav-link"> <span :class="link.icon "></span> {{ link.title }}</a>
        </router-link>
        <button type="button"
                class="btn btn-outline-dark"
                @click="onLogOut"
                v-if="isUserLoggedIn">
          <i class="fa fa-sign-out"></i>Log Out</button>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'header-app',
  data() {
   return  {
   }
  },
  methods: {
    onLogOut () {
      this.$store.dispatch('logOutUser')
          .then(() =>{
            this.$router.push('/login')

          })
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if ( this.isUserLoggedIn ) {
        return [
          {title: 'My profile', url: '/myProfile', icon: 'fa fa-user'}
        ]
      } else {
        return [
          {title: 'Login', url: '/Login', icon: 'fa fa-sign-in'},
          {title: 'Registration', url: '/registration', icon: 'fa fa-lock'}
        ]
      }
    }
  }
}
</script>
