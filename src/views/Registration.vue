<template>
  <div class="container-main">
    <FadingLightsAnimation />
    <div class="container-ui">
      <div class="login">
          <h1 data-test="title" class="title"> Make an account</h1>
          <form class="form" @submit.prevent="register">
              <label data-test="username" class="form-label" for="#username">Username:</label>
              <input data-test="input" v-model="username" class="form-input" id="username" required placeholder="Username">

              <label data-test="email" class="form-label" for="#email">Email:</label>
              <input data-test="input" v-model="email" class="form-input" type="email" id="email" required placeholder="Email">

              <label data-test="password" class="form-label" for="#password">Password:</label>
              <input data-test="input" minlength="8" v-model="password" class="form-input" type="password" id="password" placeholder="Password">

              <label data-test="passwordRepeat" class="form-label" for="#password-repeat"> Repeat your password:</label>
              <input data-test="input" minlength="8" v-model="passwordRepeat" class="form-input" type="password" id="password-repeat" placeholder="Password">

              <div v-if="error" class="error"> {{ errorMessage }}</div>
              <input disabled data-test="submit" class="form-submit" type="submit" value="Register">
          </form>
      </div>
    </div>
  </div>
</template>

<script>
//import {register} from "../../facade/AuthorizationFacade";
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";
export default {
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    username: "",
    error: true,
    errorMessage: "The register feature is disabled"
  }),
  methods: {
    register() {
      
      // Deberia redirigir a algo de confirmar usuario con su codigo que le llega al email
    }
  },
  components: {FadingLightsAnimation},
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
  border-radius: 5px;
  padding: 40px;   
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);

}
.form-label {
  margin-top: 2rem;
  color: white;
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
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 7px;
  border: none;
  color: white;
  margin-top: 1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;
  &:hover {
    cursor: auto;
    user-select: none;
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