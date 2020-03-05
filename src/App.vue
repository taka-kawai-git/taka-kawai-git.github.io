<template>
    <div id="app">
        <Navbar :key="$route.fullPath"></Navbar>
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

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Exo:800&display=swap');

#app {
    font-family: "Hiragino Kaku Gothic ProN", 'Noto Sans JP', sans-serif !important;
    height: 100%;
}

</style>