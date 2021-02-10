<template>
<div>
  <div class="b-avatar b-avatar__position">
    <img class="b-avatar_img" :src="imageSrc" alt="avatar" v-if="photo">
    <img class="b-avatar_img" src="https://pp.userapi.com/c836137/v836137627/3accd/sVFKKoqN2v4.jpg" alt="avatar" v-if="!photo">
  </div>
  <p class="field-download">
    <button type="button" class="btn btn-outline-info button-photo" @click="clickInputImg">Выбрать
      <input ref="downloadImg" class="photo-input" type="file" name="photo" accept="image/*" @change="updatePhoto" ></button>
    <button :disabled="!loading || !imageSrc" type="button" class="btn btn-outline-warning">Отправить</button></p>
</div>
</template>

<script>
export default {
 props:['src'],
 name: "avatar",
  data () {
   return {
     photo: this.src,
     imageSrc:''
   }
  },
  computed: {
   loading () {
     return this.$store.getters.loading
   }
  },
  methods: {
   updatePhoto () {
     this.photo = this.$refs.downloadImg.files[0];
     console.log('this.photo', this.photo)
     console.log('this.$refs.downloadImg.files[0]',this.$refs.downloadImg.files[0])
     if (!this.photo){
       this.imageSrc = ''
     } else {
       const reader = new FileReader()
       reader.readAsDataURL(this.photo)
       reader.onload = () =>{
         this.imageSrc = reader.result
       }
     }
     this.$store.dispatch('updatePhoto', this.photo)
   },
   clickInputImg() {
      this.$refs.downloadImg.click()
   }
  }
}
</script>

<style scoped>
.photo-input {
  opacity: 0;
}
.button-photo{
  width: 107px;
  height: 40px;
  padding-top: 8px;
}
.field-download{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  max-width: 223px;
}

</style>
