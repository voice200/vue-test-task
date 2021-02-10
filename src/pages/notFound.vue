<template>
  <div class="container not-found">
        <h1>404 Not Found this Page</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
h1{
  color: red;
}
.not-found{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
