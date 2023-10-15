<template>
  <article>
    <div class="container-main">
      <FadingLightsAnimation />
      <div class="container-ui">
        <div data-test="title" class="title capitalize">{{ name || "Loading" }}</div>
        <div class="select-container">
          <img v-on:click="moveTypeSelectorBackwards()" class="arrow button" src="@/assets/svgs/ArrowLeft.svg" />
          <div class="select texto">{{  types[typeSelector] || "Loading data..." }}</div>
          <img v-on:click="moveTypeSelectorForwards()" class="arrow button" src="@/assets/svgs/ArrowRight.svg" />
        </div>
        <GeneralDataViewer v-if="types[typeSelector] ==='General'" :data="data['General']"></GeneralDataViewer>
        <WeatherDataViewer v-if="types[typeSelector] ==='Weather'" :data="data['Weather']"></WeatherDataViewer>
      </div>
    </div>
  </article>
</template>

<script>
import WeatherDataViewer from "../components/WeatherDataViewer.vue";
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";
import GeneralDataViewer from "../components/GeneralDataViewer.vue";
import countries from "@/assets/data/countries.json"

export default {
  name: "CountryViewer",
  components: { FadingLightsAnimation, GeneralDataViewer, WeatherDataViewer },
  data() {
    return {
      data: [],
      types: ["General", "Weather"],
      typeSelector: 0,
      name: "Loading"
    };
  },
  props: ["country"],
  methods: {
    moveTypeSelectorBackwards() {
      if (this.typeSelector - 1 < 0) {
        this.typeSelector = this.types.length - 1;
      } else {
        this.typeSelector--;
      }
    },
    moveTypeSelectorForwards() {
      if (this.typeSelector + 1 >= this.types.length) {
        this.typeSelector = 0;
      } else {
        this.typeSelector++;
      }
    },
    view(input, filters) {
      for(let i = 0; i < countries.length; i++){
        if(countries[i].countryData.General.name.common == input) {
          return countries[i];
        }
      }
      return this.search(input)
    },
    search(input, filters) {
      const regExp = new RegExp(this.capitalize(input) + "*")
      for(let i = 0; i < countries.length; i++){
        for(let j = 0; j < countries[i].names.length; j++) {
          if(regExp.exec(countries[i].names[j])){
            return countries[i]
          } 
        }
      }
      return {};
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    } 
  },
  beforeMount() {
    this.data = this.view(this.country, this.types).countryData
    this.name = this.data.General.name.common
  },
};
</script>

<style lang="scss" scoped>
$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.button {
  cursor: pointer;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.page-arrow {
  height: 50%;
  margin-right: 1em;
  margin-left: 1em;
}
.arrow {
  margin: 1.5em;
}

.select {
  text-align: center
}
.title {
  font-size: 4rem;
  text-align: center;
  padding-top: 0.25em;
}
.capitalize {
  text-transform: capitalize;
}
.container-main {
  display: flex;
  min-height: 80vh;
  height: auto;
  flex-wrap: wrap;
  color: $primary-color;
}

.select-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  padding-top: 0.2em;
}

.container-ui {
  width: 100%;
  height: 80vh;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.texto {
  font-size: 2rem;
}
</style>
