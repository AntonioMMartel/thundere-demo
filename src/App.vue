<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <body>
    <div>
      <Header :user-role="userRole" />
      <article class="forwards">
        <RouterView />
      </article>
      <Footer/>
    </div>
  </body>
</template>

<style lang="scss">

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;
.forwards {
  z-index: 10;
  height: 80vh;
}

</style>
