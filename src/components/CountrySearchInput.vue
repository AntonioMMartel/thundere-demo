<template>
  <div class="contenedor-flex">
    <textarea data-test="textArea" id="text-input" maxlength="74" 
    @keydown.enter.prevent="submit" 
    v-model="input"
    :rows="textRows"
    placeholder="Put a country's name"> </textarea>
    <div data-test="error" class="texto-error" v-if="error">{{ errorMessage }}</div>
  </div>
</template>

<script>

export default {
  name: "CountrySearchInput",
  data() {
    return {
      error: false,
      errorMessage: "Ha habido un error inesperado",
      textRows: 1,
      input: ""
    };
  },
  props: ["to", "canFilter", "filters", "changeInput"],
  methods: {
    submit() {
      let filters = "";
      if(this.canFilter) {  
        filters = "?filters=" + encodeURIComponent(JSON.stringify(this.filters))
      }
      window.location.replace(this.to + "/" + this.input + filters);
    },
    updateInputHeight() {
      if (this.textRows <= 6) this.textRows = this.input.length / 16 + 1;
    },
    preventUselessWhitespaces() {
      // Al final 1 espacio
      if (this.input.slice(-2) === "  ") {
        this.input = this.input.slice(0, -1);
      }
      // Al principio ningun espacio
      if (this.input.charAt(0) === " ") {
        this.input = this.input.slice(1);
      }
    },
  },
  updated() {
    this.updateInputHeight();
    this.preventUselessWhitespaces();
  },
  created() {
    if(this.changeInput) this.input = this.changeInput
  }
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

#text-input {
  text-align: center;
  font-size: 1.5rem;
  resize: none !important;
  overflow: hidden;

  border-radius: 25px;
  border: 2px solid rgb(37, 197, 197);
  background: linear-gradient(135deg, rgba(0, 99, 182, 0.75) 13%, rgba(0, 99, 182, 0.5) 50%, rgba(0, 99, 182, 0.75) 100%);
  padding: 0.3em;
  resize: both;
  color: $primary-color;
  width: 12em;

  &:hover {
    border: 2px solid rgb(0, 255, 255);
  }

  &:focus {
    outline: none;
  }
}

.contenedor-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texto-error {
  padding: 1em;
  color: red;
}

::placeholder {
  color: darkgrey;
}

</style>
