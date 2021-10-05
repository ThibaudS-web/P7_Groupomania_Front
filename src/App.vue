<template>
  <Signup />
  <Signin />

</template>

<script>
import Signup from './components/Signup.vue'
import Signin from './components/Signin.vue'

export default {

  name: 'App',
  components: {
    Signup,
    Signin
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>