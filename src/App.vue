<template>
  <div>
    <header-app></header-app>
    <div class="container-fluid">
       <router-view></router-view>
    </div>
    <v-snackbar
        :value="true"
        color = "black"
        :multi-line="true"
        class="snackbar"
        v-if="error"
        :timeout="5000"
    >
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="closeError"
            @input="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import HeaderApp from '@/components/header-app/';

export default {
  name: 'App',

  components: {
    HeaderApp
  },
  computed:{
    error() {
      return this.$store.getters.error
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
  }
};
</script>
<style>
.snackbar{
  opacity: 0.7;
}
</style>
