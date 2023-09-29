<template>
  <div class="filter-container">
    <select ref="typeInput" @change="changeType" class="input" value="General" name="data-type" >
      <option  class="option" v-for="(option, key) in types" :key="key" :value="option"> {{ option }}</option>
    </select>
    <div v-if="selectedType !== 'Weather'" class="flex" >
      <select ref="dataFilterInput" @change="changeDataFilter" class="input" name="data-type" >
        <option class="option" v-for="(option, key) in selectedDataKeys" :key="key" :value="option"> {{ option }}</option>
      </select>
      <select ref="conditionInput" @change="updateCondition" class="input" name="data-type" >
        <option class="option" v-for="(option, key) in condition[typeof(selectedData)]" :key="key" :value="option"> {{ option }}</option>
      </select>
    </div>
    <div v-if="selectedType === 'Weather'" class="flex">
      <select ref="dataFilterInput" @change="changeDataFilter" class="input" name="data-type" >
        <option class="option" v-for="(option, key) in selectedWeatherDataKeys" :key="key" :value="option"> {{ option }}</option>
      </select>
      <select ref="conditionInput" @change="updateCondition" class="input" name="data-type" >
        <option class="option" v-for="(option, key) in condition[typeof(selectedWeatherData)]" :key="key" :value="option"> {{ option }}</option>
      </select>
    </div>
    <input v-if=" (typeof(selectedData) !== 'boolean')" ref="userInput" @keyup="updateUserInput"  autocomplete="no" type="text" class="input" name="data-type" >

    <select v-if="typeof(selectedData) === 'boolean'" ref="userInput" @change="updateUserInput" class="input" name="data-type" >
      <option class="option" v-for="(option, key) in ['true', 'false']" :key="key" :value="option"> {{ option }}</option>
    </select>

    <div class="options">
      <input class="invisible" ref="dateInput" @change="changeSelectedDate" v-if="selectedType === 'Weather'" type="date">
      <div v-if="selectedType === 'Weather'" class="filter-option">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#dbdbdb" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <line x1="16" y1="3" x2="16" y2="7" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="4" y1="11" x2="20" y2="11" />
          <rect x="8" y="15" width="2" height="2" />
        </svg>
      </div>
      <div class="filter-option">
        <img class="delete-icon" @click="deleteFilter" src="/public/svgs/Trash.svg" alt="Delete filter" />
      </div>
      <div @wheel="changeHour($event)" v-if="selectedType === 'Weather'" class="filter-option">{{ americanStyleHour }}</div>
    </div>
  </div>
</template>

<script>

import {ref} from 'vue';

export default {
  name: "FilterInstance",
  data() {
    return {
      types: ["General", "Weather"],
      condition: {
        "number": ["equals", "lower than", "higher than", "lower or equal than", "higher or equal than"],
        "object": ["contains"],
        "string": ["contains", "equals", "starts with", "ends with"],
        "boolean": ["equals"]
      },
      selectedType: "General",
      selectedDataFilter: "name",
      selectedDataCondition: "contains",
      userInput: "",
      selectedDataKey: 0,
      filterType: "object",
      selectedHour: ref(0),
      selectedDate: "",
      sampleWeatherData: {
                          cloudBase: 7.03,
                          cloudCeiling: 7.03,
                          cloudCover: 100,
                          precipitationIntensity: 0,
                          precipitationType: 0,
                          temperature: 21.91,
                          temperatureApparent: 21.91,
                          weatherCode: 1001,
                          windDirection: 226.83,
                          windGust: 3.55
                        }
    };
  },
  props: ["index", "data"],
  methods: {
    changeHour(event) {

      // Hacia arriba
      if (event.deltaY < 0) {
        if (this.selectedHour + 1 >= 23) {
          this.selectedHour = 0;
        } else {
          this.selectedHour++;
        }
      } else {
        if (this.selectedHour - 1 < 0) {
          this.selectedHour = 23;
        } else {
          this.selectedHour--;
        }
      }
    },
    changeSelectedDate() {
      this.selectedDate = this.$refs.dateInput.value
      this.updateFilter()
    },
    changeType() {
      this.selectedType = this.$refs.typeInput.value;
      this.selectedDataKey = 0;
      if(this.selectedType === "Weather"){
        this.selectedDataFilter = "cloudBase"
        this.selectedDate = this.dateFormat(Date.now(),'yyyy-MM-dd')
        this.selectedHour = this.longToDate(Date.now()).substring(11,12)
        this.selectedDataCondition = "equals"
        this.filterType = "number"
      }
        
      if(this.selectedType === "General"){
        this.selectedDataFilter = "name"
        this.selectedDataCondition = "contains"
        this.filterType = "object"

      }
      
    },
    dateFormat(inputDate, format) {
      //parse the input date
      const date = new Date(inputDate);

      //extract the parts of the date
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();    

      //replace the month
      format = format.replace("MM", month.toString().padStart(2,"0"));        

      //replace the year
      if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
      } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
      }

      //replace the day
      format = format.replace("dd", day.toString().padStart(2,"0"));

      return format;
    },
    longToDate(time) {
      var date = new Date(parseInt(time));
      return date.toLocaleString();
    },
    changeDataFilter() {
      this.selectedDataFilter = this.$refs.dataFilterInput.value;
        this.userInput = ""
        if(typeof(this.selectedData) !== "object"){
          this.filterType = typeof(this.selectedData)
          this.selectedDataCondition = "contains"
        } else {
          Array.isArray(selectedData) ? this.filterType = "array" : this.filterType = "object"
          this.selectedDataCondition = "contains"
        }
        if(typeof(this.selectedData) === "boolean") {
          this.selectedDataCondition = "equals"
          this.userInput = "true"
        }
      this.updateFilter()
    },
    updateUserInput() {
      this.userInput = this.$refs.userInput.value
      this.updateFilter()
    },
    updateCondition() {
      this.selectedDataCondition = this.$refs.conditionInput.value
      this.updateFilter()
    },
    deleteFilter() {
      this.$emit('filterChanged', {}, this.index)
      this.$emit('deleteFilter', this.index)
    },
    updateFilter() {
      this.$emit('filterChanged', this.filters, this.index)
    }
  },
  updated() {
    this.updateFilter()
  },
  computed: {
    americanStyleHour: {    
      get() {
        return this.selectedHour > 12? this.selectedHour - 12 + "pm" : 
              this.selectedHour === 0? "12pm": this.selectedHour + "am"
      }
    },
    selectedDataKeys() {
      return Object.keys(this.data[this.selectedType]);
    },
    selectedWeatherDataKeys() {
      return Object.keys(this.sampleWeatherData);
    },
    selectedData() {
      return (this.data[this.selectedType][this.selectedDataFilter])
    },
    selectedWeatherData() {
      return (this.sampleWeatherData[this.selectedDataFilter])
    },
    filters() {
      let extraData = {};
      if(this.selectedType === "Weather"){
        extraData = {"clientTimeOffset": new Date().getTimezoneOffset(),
                     "hour": this.selectedHour,
                     "date": this.selectedDate,
                    }
      }
      return {
        "type": this.selectedType,
        "filter": this.selectedDataFilter,
        "condition": this.selectedDataCondition,
        "userInput": this.userInput,
        "filterType": this.filterType,
        "extraData": extraData
      }
    }
  }
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;


input[type="date"] {
  /* Turn off the native look and feel */
  appearance: none;
  /* for Internet Explorer */
  background: none;
  text-shadow: none;
  text-decoration: none;
  outline: none;
  border: 0;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 0px;
  right: 105px;
  z-index: 1;
  &::-webkit-calendar-picker-indicator {
   opacity: 0;
   cursor: pointer; /* optional */
  } 
    &::-webkit-datetime-edit-text {
      -webkit-appearance: none;
      display: none;
  }
  &::-webkit-datetime-edit-month-field{
      -webkit-appearance: none;
      display: none;
  }
  &::-webkit-datetime-edit-day-field {
      -webkit-appearance: none;
      display: none;
  }
  &::-webkit-datetime-edit-year-field {
      -webkit-appearance: none;
      display: none;
  }
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

}

.filter-option {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 33%;
  min-width: 33%;
  
}

.invisible {
  opacity: 0;
}
.options {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-around;
  width: 80%;
  margin-top: 0.4em;
}

.delete-icon {
  cursor: pointer;
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.filter-container {
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 170px;
  width: 170px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.13);
  }
}

.input {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  border-width: 0;
  margin-top: 1em;
  border-color: $primary-color;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  outline: none;
  padding: 0.12em;
  text-align: center;
  width: 120px
}

option {
  background-color: #363636;
  box-shadow: none;
  border-radius: 20px;
  border-width: 0;
}

</style>