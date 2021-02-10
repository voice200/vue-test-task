<template>
  <div class="container b-form b-form__decoration b-form__position">
    <form @submit.prevent="onSubmit">
      <div class="form-row b-form_content" v-for="item of dataForm" :key="item.name">
        <div class="col-md-9 mb-3">
          <label :for="item.name">{{ item.label }}</label>
          <input :type="item.type"
                 class="form-control"
                 :id="item.name"
                 :name="item.name"
                 :class="{'is-invalid': $v.formState[item.name].$error, 'is-valid': $v.formState[item.name].$dirty && !$v.formState[item.name].$error}"
                 v-model="formState[item.name]"
                 @blur="$v.formState[item.name].$touch()"
                 :placeholder="item.placeholder">
          {{ $v.formState[item.name]}}
          <div class="invalid-feedback" v-if="!$v.formState[item.name].required">
            This field is required
          </div>
          <div class="invalid-feedback" v-if="!$v.formState[item.name].email && item.name === 'email'">
            This field should be an Email
          </div>
<!--          <div class="invalid-feedback" v-if="item.name === 'password' && !$v.formState[item.name].between">-->
<!--            Length of password should be between {{$v.formState[item.name].$params.between.min}}-->
<!--            and {{$v.formState[item.name].$params.between.max}},-->
<!--            now Length is {{ formState[item.name].length }}-->
<!--          </div>-->
          <div class="invalid-feedback" v-if="!$v.formState[item.name].sameAs && item.name === 'confirmPassword'">
            Passwords do not match
          </div>
        </div>
      </div>
      <div class="b-form_btns">
        <button
            class="btn b-form_button b-form_button__position btn-warning"
            :disabled="loading"
            type="submit">
            Login
        </button>
        <button
            class="btn b-form_button b-form_button__position btn-outline-dark"
            type="reset"
            @click="resetForm">
          Reset
        </button>
      </div>

    </form>
  </div>
</template>

<script>
//<!--            :disabled="$v.$invalid || loading"-->
import { returnValidationForm } from '@/fixtures'
import {validationForm} from '@/fixtures'
import fb from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import 'firebase/database'

const state = {
  validator: {}
}

export default {
  props: ['dataForm', 'type'],
  name: "LoginForm",

  data() {
    return {
      formState: {},
    }
  },
  methods:{
    onSubmit () {
      console.log('form', this.formState)
      if ( this.type === 'registration') {
        this.$store.dispatch('registerUser', this.formState)
            .then(()=>{
              const user = fb.auth().currentUser
              this.$store.dispatch('createUser', { ...this.formState, id: user.uid})
                  .then(() =>{
                   this.$router.push(`/myProfile/${user.uid}`)
                  })
                  .catch(err => console.log(err))
            })

      } else if ( this.type === 'login' ){
        this.$store.dispatch('loginUser', this.formState)
            .then(() =>{
              const user = fb.auth().currentUser
              this.$router.push(`/myProfile/${user.uid}`)
            })
            .catch(err => console.log(err))
      }

    },
    resetForm() {
      const data = {...this.formState}
      for (const key in data) {
        data[key] = ''
      }
      this.formState = {...data}
      console.log('reset', this.formState)
    },
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    getUserById () {
        const id = this.id
        return this.$store.getters.userById(id)
    },
    getUser () {
      return this.getUser()
    },
  },
  created() {
    const newData = this.dataForm.forEach(item =>{
      return { ...newData, [item.name]: '' };
    });
    this.formState = { ...this.formState, ...newData };
    state.validator = returnValidationForm(this.type);
    console.log('validator1234', state.validator)

  },
  validations: {
    formState: validationForm.registration
  }
}
</script>
