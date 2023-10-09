<template>
  <div class="container-main">
    <FadingLightsAnimation />
    <div class="container-ui">
      <div data-test="title" class="title">
        Relevant info 
      </div>
      <div>
        This is a visual demo, all data apis are disconnected and data will not be up to date.
        Because of this, most countries wont have weather data. Except for: Morocco, Belgium, China, Cabo Verde and several others.
        All functionality that has to do with apis such as login, register and all CRUD operations are disabled.

        There are two admin accounts and one normal user one. 
        
        This is because the Symphony backend and the cloud database (MongoDB Atlas) have been disconnected as well.
        Why? Because this project isnt finished. 
        Having into account Bachelor Thesis time frames, this project had a time limit of 300 hours. A time limit
        that is too limiting for projects with a scope as big as this one.
        Which means that this project isnt "ready" for producton and would need more time: 
            - Firstly, so that this project fulfils the cloud host constraints. (And that I discover what they are by exploring documentation and tutorials)
            - Secondly, so that the data transfer between the apis to the backend and from the backend to the frontend is done efficiently enough
            so that it complies with the requirements of the free tier of the apis and the cloud database.
            - Thirdly, so that this project even when fulfilling the cloud host constraints can live within the free tier of the cloud provider.
            - Fourthly, so that this project is minimally protected against at least the most common varieties of cyber attacks (CSRF tokens, code injection...etc.)
            - Fifthly, so that this project is properly tested to ensure that code works properly and doesnt fail in the future.
        
        Time that, in my view, is better spent in more meaningful projects. 
      </div>
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
  font-size: 3rem;
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
