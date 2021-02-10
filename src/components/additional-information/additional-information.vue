<template>
<div class="b-additional-information" >
  <div class="b-additional-information_field" v-for="item of info" :key="item.value">
    <span class="b-additional-information_label">
      {{ item.label }}:
    </span>
    <span class="b-additional-information_value">
      {{ user[item.value]}}
    </span>
  </div>

</div>
</template>

<script>
import { additionalInformation } from '@/fixtures';

export default {
  props:['user'],
  name: 'additional-information',
  data() {
    return {
      info: additionalInformation
    }
  }
}
</script>

<style scoped>

</style>
