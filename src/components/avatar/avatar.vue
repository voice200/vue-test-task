<template>
<div>
  <div class="b-avatar b-avatar__position">
    <img class="b-avatar_img" :src=" photo" alt="avatar" v-if="photo">
    <img class="b-avatar_img" src="https://pp.userapi.com/c836137/v836137627/3accd/sVFKKoqN2v4.jpg" alt="avatar" v-if="!photo">
  </div>
  <p class="field-download">
    <button type="button" class="btn btn-outline-info button-photo" @click="clickInputImg">Выбрать
      <input ref="downloadImg" class="photo-input" type="file" name="photo" accept="image/*" @change="updatePhoto" ></button>
    <button :disabled="loading || disable" type="button" class="btn btn-outline-warning" @click="changePhoto">Отправить</button></p>
</div>
</template>

<script>
export default {
 props:['src'],
 name: "avatar",
  data () {
   return {
     photo: this.src,
     imageSrc:'',
     disable: true,
     img: ''
   }
  },
  computed: {
   loading () {
     return this.$store.getters.loading
   }
  },
  methods: {
   updatePhoto () {
     this.img = this.$refs.downloadImg.files[0];
     if (!this.img){
       this.imageSrc = ''
     } else {
       const reader = new FileReader()
       reader.readAsDataURL(this.img)
       reader.onload = () =>{
         this.imageSrc = reader.result
         this.photo = reader.result
       }
       this.disable = false
     }
   },
   clickInputImg() {
      this.$refs.downloadImg.click()
   },
    changePhoto() {
      this.$store.dispatch('updatePhoto', this.img)
          .then(()=>{
            this.disable = true
          })
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
