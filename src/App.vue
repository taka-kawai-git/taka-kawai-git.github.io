<template>
    <div id="app">
        <Navbar />
        <router-view/>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
      Navbar
  }
}
</script>

<style scoped>
/*.container {*/
/*    margin: 0 auto;*/
/*    max-width: 1280px;*/
/*    width: 100%;*/
/*}*/

/*@media only screen and (min-width: 601px) {*/
/*  .container {*/
/*    width: 85%;*/
/*  }*/
/*}*/

/*@media only screen and (min-width: 993px) {*/
/*  .container {*/
/*    width: 70%;*/
/*  }*/
/*}*/
</style>