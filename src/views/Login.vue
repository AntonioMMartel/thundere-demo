<template>
  <div class="container-main">
    <FadingLightsAnimation />
    <div class="container-ui">
      <div class="login">
        <h1 data-test="title" class="title">Login to the page</h1>
        <form class="form" action="/login" method="post" @submit.prevent="login">
          <label class="form-label" for="#email">Email:</label>
          <input data-test="input" v-model="email" name="email" class="form-input" type="email" id="email" required placeholder="Email" />

          <label class="form-label" for="#password">Password:</label>
          <input data-test="input" v-model="password" name="password" class="form-input" type="password" id="password" placeholder="Password" />

          <div class="error">
            <span v-if="error"> {{ errorMessage }} </span>
          </div>
          <input data-test="submit" class="form-submit" type="submit" value="Login" />

          <!-- <input type="hidden" name="_csrf_token"> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import users from "../assets/data/users.json"
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: false,
    errorMessage: "Login attempt failed",
    loginSuccess: null,
  }),
  methods: {

    login() {
      this.error = false
      for(let i = 0; i < users.length; i++) {
        if(this.email === users[i].email && this.password === users[i].password) {
          this.setUserRole(users[i].role)
          window.location.replace("/");
          return;
        }
      }
      this.error = true
    },
    setUserRole(role) {
      return document.cookie = "userRole=" + role + "; max-age=60*60*6, path=/, SameSite=Strict" // Session token expires after 6 hours or after brower close
      //return sessionStorage.setItem("userRole", role);
    },
    reloadComponent() {
      this.$forceUpdate(); // Recargamos el componente -> Se vuelve a llamar a symfony
    },
    
  },
  components: {FadingLightsAnimation}
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.error {
  padding: 20px;
  height: 0px;
  text-align: center;
  justify-content: center;
  color: #dc3545;
  font-weight: 500;
}

.login {
  height: 77.5vh;
  color: $primary-color;
}

.title {
  padding-top: 2rem;
  text-align: center;
  color: $primary-color;
}
.form {
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);
}
.form-label {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 2pt solid rgba(255, 225, 255, 0.7);
  border-radius: 6px;
  &:focus {
    outline: 0;
    border-color: rgba(0, 225, 255, 0.7);
  }
}
.form-submit {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 7px;
  margin-top: 1em;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: rgba(0, 225, 255, 0.4);
  }
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
