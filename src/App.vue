<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import { onMounted } from 'vue';

function getUserRole() {
  return document.cookie.substring(9)
  // return sessionStorage.getItem("userRole");
}

function setUserRole(role) {
  return document.cookie = "userRole=" + role + "; max-age=60*60*6, path=/, SameSite=Strict" // Session token expires after 6 hours or after brower close
  //return sessionStorage.setItem("userRole", role);
}

let userRole = "none"

onMounted( () => {

  if(getUserRole() === ""){
    setUserRole("none")
  }

  userRole = getUserRole()
  
})

</script>

<template>
  <body>
    <div>
      <Header :userRole="userRole" />
      <article class="forwards">
        <router-view></router-view>
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
