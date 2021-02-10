<template>
  <div>
    <h3 class="b-title b-title__position">{{ title }}</h3>
    <login-form :dataForm="dataForm"
                type="login"
                :validator="validator">
    </login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form';
import { loginForm } from '@/fixtures';
import {validationForm} from '@/fixtures';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data () {
    return {
      title: 'Login form',
      dataForm: loginForm,
      validator: validationForm.login
    }
  },
  created() {
    if (this.$route.query['loginError']){
      this.$store.dispatch('setError','Please log in to access this page')
    }
  }

}
</script>
