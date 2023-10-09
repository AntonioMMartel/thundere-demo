<template>
  <div class="container-main">
    <FadingLightsAnimation />
    <div class="container-ui">
      <div data-test="title" class="title">
        Relevant information
      </div>
      <div v-if="info">
        <div class="info-container">
          This is a visual demo where all data apis, the backend and the cloud db are disconnected. <br>
          This means that:
          <div class="list">
            <div class="list-item">Most countries wont have weather data. Except for: Morocco, Belgium, China, Cabo Verde and several others.</div>
            <div class="list-item">The data will not be up to date. Most of it is from 2022.</div>
            <div class="list-item">All the functionality that has to do with apis such as login, register and all other CRUD operations are disabled.</div>
          </div>

          <div class="list2">
            <div class="list-item">
                There is one admin account: <br><br>
                Email: admin@email.com <br><br>
                Password: 123 
            </div>
            <div v-on:click="toggleInfo()" class="why-button"> 
              Why is this? 
            </div>
          </div>
        </div>
      </div>

      <!-- Clicked Why is that? button -->
      <div v-if="!info">
        <div class="info-container">
        This is because the Bachelor Thesis time frame is of 300 hours. Which was too limiting for a project with a scope as big as this one. <br>
        This means that this project isnt "ready" for producton and would need more time (that I dont have): 
          <div class="list">
            <div class="list-item">
              So that this project fulfils the cloud host constraints. (And that I discover what they are by exploring documentation and tutorials)
            </div>
            <div class="list-item">
              So that the data transfer between all parts of the application is done efficiently so that it complies with the 
              requirements of the free tier of the apis and the cloud database.
            </div>
            <div class="list-item">
              So that this project even when fulfilling the cloud host constraints can live within the free tier of the cloud provider.
            </div>
          </div>

          <div class="list2">
            <div class="list">
              <div class="list-item">
                So that this project is minimally protected against at least the most common varieties of cyber attacks (CSRF tokens, code injection...etc.)
              </div>
              <div class="list-item">
                So that this project is properly tested to ensure that code works properly and doesnt fail or bug out terribly in the future.
              </div>
            </div>
            
            <div v-on:click="toggleInfo()" class="why-button"> 
              Go back
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";

export default {
  name: "Info",
  components: { FadingLightsAnimation },
  data () {
    return {
      filters: [],
      info: true
    }
  },
  mounted () {

  },
  methods: {
    toggleInfo() {
      this.info = !this.info 
    }
  },

};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.info-container {
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  text-align: center;
}

.title {
  font-size: 3rem;
  text-align: center;
  padding-bottom: 0.3em;
  padding-top: 0.4em;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.list2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
}


.list-item {
  width: 260px;
  height: 170px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 40px;
}

.why-button {
  text-align: center;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.1);
  width: 200px;
  padding: 20px;
  border-radius: 20px;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.115);
}

.why-button:hover {
  background-color: rgba(255, 255, 255, 0.115);
  cursor: pointer
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
}
</style>
