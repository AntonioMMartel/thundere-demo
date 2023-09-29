<template>
  <div class="filters-container">
    <img v-if="dataIsPrepared" v-on:click="addNewFilter()" :style="{'opacity': addFilterButtonOpacity, 'cursor': addFilterButtonCursor}" class="add button" src="/public/svgs/add.svg" />
    <div v-if="dataIsPrepared" class="filters-grid">
      <div ref="filters" :class="filterClass" v-for="(index, key) in filters" :key="key">
        <FilterInstance v-if="filters[key]" ref="key" @filterChanged="filterChanged" @deleteFilter="deleteFilter" :data="data" :index="key"></FilterInstance>
      </div>
    </div>
  </div>
</template>

<script>
import FilterInstance from "./FilterInstance.vue";
import countries from "../assets/data/countries.json"
export default {
  name: "FiltersMenu",
  data() {
    return {
      filters: [false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                ],
      filterData: [{}],
      data: {},
      addFilterButtonOpacity: 1,
      addFilterButtonCursor: "pointer",
      dataIsPrepared: false,
      filterClass: "filter"
    };
  },
  methods: {
    addNewFilter() {
      
      if(this.filters.indexOf(false) !== -1) {
        this.filters.splice(this.filters.length)
        this.filters[this.filters.indexOf(false)] = true
      }
      this.checkFilters()
    },
    checkFilters(){
      if(this.filters.indexOf(false) == -1){
        this.addFilterButtonOpacity = 0
        this.addFilterButtonCursor = 'auto'
      } 
    },
    deleteFilter(index) {
      this.filters.splice(this.filters.length)
      this.filters[index] = false
      if(this.addFilterButtonOpacity == 0) {
        this.addFilterButtonOpacity = 1
        this.addFilterButtonCursor = 'pointer'
      }
    },
    filterChanged(filterData, index) {
      // me lo enchufas en el array de filtros
      this.filterData[index] = filterData;
      this.filterData[index].type = filterData.type
      this.filterData[index].filter = filterData.filter
      this.filterData[index].condition = filterData.condition
      this.filterData[index].userInput = filterData.userInput

      this.$emit("filterChanged", this.filterData)
    },
    view(input, filters) {
      for(let i = 0; i < countries.length; i++){
        if(countries[i].countryData.General.name.common == input) {
          return countries[i];
        }
      }
    }
  },
  beforeMount() {
    // view("Morocco", ["General", "Weather"])
    this.data = this.view("Morocco").countryData
    this.dataIsPrepared = true;

  },
  components: { FilterInstance }
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.filters-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-top: 1.5em;
}

.filters-container {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.add {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 35px;
  height: 35px;
  padding: 8px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}



</style>