<template>
  <div class="b-profile">
    <h3 class="b-title b-title__position">{{ title }}</h3>
    <div class="container-fluid">
      <div class="b-profile_personal-label">Personal profile: {{ getUserById.name  }}</div>
      <div class=" b-profile_info">
        <Avatar :src="getUserById.imageSrc"/>
        <AdditionalInformation :user="getUserById"/>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar/avatar';
import AdditionalInformation from '@/components/additional-information/additional-information';

export default {
props:['id'],
name: "myProfile",
  components: {
    AdditionalInformation,
    Avatar },
  data() {
    return{
      title: 'My Profile',
      user: {
        id: 1,
        name: 'Irina Malysheva',
        phone: '7999844444',
        email: 'test@gmail.com'
      }
    }
  },
  created() {
  },
  computed: {
    getUserById () {
      const id = this.id
      return this.$store.getters.getUserById(id)
    }
  }
}
</script>
