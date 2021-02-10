<template>
  <div>
    <h3 class="b-title b-title__position">{{ title }}</h3>
    <login-form
        :dataForm="dataForm"
        type="registration"
    ></login-form>

  </div>
</template>

<script>
import LoginForm from '@/components/login-form';
import { registrationForm } from '@/fixtures'

export default {

  name: 'registration',
  components: { LoginForm },
  data() {
    return {
      title: 'Registration Form',
      dataForm: registrationForm,
    }
  }
}
</script>
