<template>
  <div class="container-main">
    <FadingLightsAnimation />
    <div class="container-ui">
      <div data-test="title" class="title"> Thundere </div>
      <CountrySearchInput :filters="filters" :canFilter="true" :to="'/search'" />
      <FiltersMenu @filterChanged="filterChanged"></FiltersMenu>
    </div>
  </div>
</template>

<script>
import CountrySearchInput from "../components/CountrySearchInput.vue";
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";
import FiltersMenu from "../components/FiltersMenu.vue";

export default {
  name: "Home",
  components: { FadingLightsAnimation, CountrySearchInput, FiltersMenu },
  data () {
    return {
      filters: []
    }
  },
  mounted () {
    if(this.getUserRole() === ""){
      this.setUserRole("none")
    }

    this.userRole = this.getUserRole()
  },
  methods: {
    filterChanged(filters) {
      this.filters = filters
    },
    getUserRole() {
      return document.cookie.substring(9)
      // return sessionStorage.getItem("userRole");
    },
    setUserRole(role) {
      var expiryDate = new Date(Date.now() + 60 * 60 * 1000)
      return document.cookie = "userRole=" + role + ";expires=" + expiryDate +", path=/, SameSite=Strict" // Session token expires after 6 hours or after brower close
      //return sessionStorage.setItem("userRole", role);
    }

  },

};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.title {
  font-size: 7rem;
  text-align: center;
}

.container-main {
  display: flex;
  height: 80vh;
  flex-wrap: wrap;
  color: $primary-color;
}

.container-ui {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  div:first-child {
    padding-bottom: 0.3em;
    padding-top: 0.4em;
  }
}
</style>
