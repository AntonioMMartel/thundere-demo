<template>

  <div class="all-container">
    
    <div v-on:wheel="modifyPointer($event, 'Date', dateKeys)" class="selector date-selector"> 
      <div class="separed">Date</div>
      {{ dateKeys[dateSelector] }}
    </div>
    <img v-if="Object.keys(hourData).length > 8" v-on:click="decreasePageCounter()" class="page-arrow left-arrow button" src="@/assets/svgs/ArrowLeft.svg" />
    <div class="flex">
      <div v-if="data" class="data-container">


        <div class="data-view" v-for="(data, key) in  Object.entries(hourData).slice(page * 8, (page + 1) * 8)" 
              :key="key" :id="key">
          <div class="data-title"> {{ putSpaces(data[0]) }} </div>


          <div class="data-content" v-if="data[1] === null">
            No data has been found
          </div> 

          <div class="data-content" v-if="typeof(data[1]) === 'string' || typeof(data[1]) === 'number' && data[0] !== 'weatherCode'  && data[0] !== 'precipitationType'" >

            <span> {{ data[1] }} 
              <span v-if="data[0] == 'cloudBase' || data[0] == 'cloudCeiling'">
                km
              </span>
              <span v-if="data[0] == 'cloudCover'">
                %
              </span>
              <span v-if="data[0] == 'precipitationIntensity'">
                mm/hr
              </span>
              <span v-if="data[0] == 'temperature' || data[0] == 'temperatureApparent'">
                º Celcius
              </span>
              <span v-if="data[0] == 'windDirection'">
                º 
              </span>
              <span v-if="data[0] == 'windSpeed' || data[0] == 'windGust'">
                m/s
              </span>
            </span>
          </div> 
          <div class="data-content" v-else-if="typeof(data[1]) === 'string' || typeof(data[1]) === 'number' && data[0] === 'precipitationType'" >
            <span> {{ precipitationTypeCode[data[1]] }} </span>
          </div> 

          <div class="data-content" v-else-if="typeof(data[1]) === 'string' || typeof(data[1]) === 'number' && data[0] === 'weatherCode'" >
            <span> {{ data[1].length === 4? weatherCodeFullDay[data[1]] : weatherCodeFullDay[data[1].toString().substring(0,4)] }} </span>
          </div> 

          <div class="data-content" v-if="typeof(data[1]) === 'boolean'">
            {{ data[1]? true : false }}
          </div> 

          <div class="data-content-array" v-if="data[1] instanceof Array">
            <DynamicArrayViewer :array="data[1]"></DynamicArrayViewer> 
          </div>

          <div class="data-content-object" v-else-if="typeof(data[1]) === 'object' && data[1] !== null">
            <DynamicObjectViewer :data="data[1]"></DynamicObjectViewer> 
          </div>
        </div>  

      </div>
      <div  class="page-display">
        {{ page + 1 }}
      </div>
    </div>
    <div v-on:wheel="modifyPointer($event, 'Hour', hourKeys)" class="selector hour-selector">
      <div class="separed">Hour</div>
      {{ hourKeys[hourSelector] }}
    </div>
    <img v-if="Object.keys(hourData).length > 8" v-on:click="increasePageCounter()" class="page-arrow right-arrow button" src="@/assets/svgs/ArrowRight.svg" />
    
  </div>
  
</template>

<script>
import DynamicArrayViewer from './DynamicArrayViewer.vue';
import DynamicObjectViewer from './DynamicObjectViewer.vue';


export default {
  name: "GeneralDataViewer",
  data() {
    return {
      error: false,
      errorMessage: "Ha habido un error inesperado",
      textRows: 1,
      page: 0,
      dateSelector: 0,
      hourSelector: 0,
      currentHour: "0:00:00",
      weatherCodeFullDay: {
        "0": "Unknown",
        "1000": "Clear, Sunny",
        "1100": "Mostly Clear",
        "1101": "Partly Cloudy",
        "1102": "Mostly Cloudy",
        "1001": "Cloudy",
        "1103": "Partly Cloudy and Mostly Clear",
        "2100": "Light Fog",
        "2101": "Mostly Clear and Light Fog",
        "2102": "Partly Cloudy and Light Fog",
        "2103": "Mostly Cloudy and Light Fog",
        "2106": "Mostly Clear and Fog",
        "2107": "Partly Cloudy and Fog",
        "2108": "Mostly Cloudy and Fog",
        "2000": "Fog",
        "4204": "Partly Cloudy and Drizzle",
        "4203": "Mostly Clear and Drizzle",
        "4205": "Mostly Cloudy and Drizzle",
        "4000": "Drizzle",
        "4200": "Light Rain",
        "4213": "Mostly Clear and Light Rain",
        "4214": "Partly Cloudy and Light Rain",
        "4215": "Mostly Cloudy and Light Rain",
        "4209": "Mostly Clear and Rain",
        "4208": "Partly Cloudy and Rain",
        "4210": "Mostly Cloudy and Rain",
        "4001": "Rain",
        "4211": "Mostly Clear and Heavy Rain",
        "4202": "Partly Cloudy and Heavy Rain",
        "4212": "Mostly Cloudy and Heavy Rain",
        "4201": "Heavy Rain",
        "5115": "Mostly Clear and Flurries",
        "5116": "Partly Cloudy and Flurries",
        "5117": "Mostly Cloudy and Flurries",
        "5001": "Flurries",
        "5100": "Light Snow",
        "5102": "Mostly Clear and Light Snow",
        "5103": "Partly Cloudy and Light Snow",
        "5104": "Mostly Cloudy and Light Snow",
        "5122": "Drizzle and Light Snow",
        "5105": "Mostly Clear and Snow",
        "5106": "Partly Cloudy and Snow",
        "5107": "Mostly Cloudy and Snow",
        "5000": "Snow",
        "5101": "Heavy Snow",
        "5119": "Mostly Clear and Heavy Snow",
        "5120": "Partly Cloudy and Heavy Snow",
        "5121": "Mostly Cloudy and Heavy Snow",
        "5110": "Drizzle and Snow",
        "5108": "Rain and Snow",
        "5114": "Snow and Freezing Rain",
        "5112": "Snow and Ice Pellets",
        "6000": "Freezing Drizzle",
        "6003": "Mostly Clear and Freezing drizzle",
        "6002": "Partly Cloudy and Freezing drizzle",
        "6004": "Mostly Cloudy and Freezing drizzle",
        "6204": "Drizzle and Freezing Drizzle",
        "6206": "Light Rain and Freezing Drizzle",
        "6205": "Mostly Clear and Light Freezing Rain",
        "6203": "Partly Cloudy and Light Freezing Rain",
        "6209": "Mostly Cloudy and Light Freezing Rain",
        "6200": "Light Freezing Rain",
        "6213": "Mostly Clear and Freezing Rain",
        "6214": "Partly Cloudy and Freezing Rain",
        "6215": "Mostly Cloudy and Freezing Rain",
        "6001": "Freezing Rain",
        "6212": "Drizzle and Freezing Rain",
        "6220": "Light Rain and Freezing Rain",
        "6222": "Rain and Freezing Rain",
        "6207": "Mostly Clear and Heavy Freezing Rain",
        "6202": "Partly Cloudy and Heavy Freezing Rain",
        "6208": "Mostly Cloudy and Heavy Freezing Rain",
        "6201": "Heavy Freezing Rain",
        "7110": "Mostly Clear and Light Ice Pellets",
        "7111": "Partly Cloudy and Light Ice Pellets",
        "7112": "Mostly Cloudy and Light Ice Pellets",
        "7102": "Light Ice Pellets",
        "7108": "Mostly Clear and Ice Pellets",
        "7107": "Partly Cloudy and Ice Pellets",
        "7109": "Mostly Cloudy and Ice Pellets",
        "7000": "Ice Pellets",
        "7105": "Drizzle and Ice Pellets",
        "7106": "Freezing Rain and Ice Pellets",
        "7115": "Light Rain and Ice Pellets",
        "7117": "Rain and Ice Pellets",
        "7103": "Freezing Rain and Heavy Ice Pellets",
        "7113": "Mostly Clear and Heavy Ice Pellets",
        "7114": "Partly Cloudy and Heavy Ice Pellets",
        "7116": "Mostly Cloudy and Heavy Ice Pellets",
        "7101": "Heavy Ice Pellets",
        "8001": "Mostly Clear and Thunderstorm",
        "8003": "Partly Cloudy and Thunderstorm",
        "8002": "Mostly Cloudy and Thunderstorm",
        "8000": "Thunderstorm"
      },
      precipitationTypeCode: {
        "0": "N/A",
        "1": "Rain",
        "2": "Snow",
        "3": "Freezing Rain",
        "4": "Ice Pellets"
      }
    };
  },
  props: ["data"],
  methods: {
    decreasePageCounter() {
      if (this.page - 1 < 0) {
        this.page = Math.ceil(Object.keys(this.hourData).length / 8) - 1;
      } else {
        this.page--;
      }
    },
    increasePageCounter() {
      if (this.page + 1 >= Math.ceil(Object.keys(this.hourData).length / 8)) {
        this.page = 0;
      } else {
        this.page++;
      }
    },
    putSpaces(string) {
      return string.replace(/([A-Z])/g, ' $1').trim()
    },
    modifyPointer(event, pointerSelector, keys) {
      if(pointerSelector === "Date"){
        this.hourSelector = this.hourKeys.findIndex((element) => element === this.currentHour) === -1? 0: this.hourKeys.findIndex((element) => element === this.currentHour);
        // Hacia arriba
        if (event.deltaY < 0) {
          if (this.dateSelector + 1 >= keys.length) {
            this.dateSelector = 0;
          } else {
            this.dateSelector++;
          }
        } else {
          if (this.dateSelector - 1 < 0) {
            this.dateSelector = keys.length - 1;
          } else {
            this.dateSelector--;
          }
        }
      
      } else if(pointerSelector === "Hour"){

        if (event.deltaY < 0) {
          if (this.hourSelector + 1 >= keys.length) {
            this.hourSelector = 0;
          } else {
            this.hourSelector++;
          }
        } else {
          if (this.hourSelector - 1 < 0) {
            this.hourSelector = keys.length - 1;
          } else {
            this.hourSelector--;
          }
        }

      }
    }

  },
  components: { DynamicArrayViewer, DynamicObjectViewer },
  computed: {
    dateKeys() {
      return Object.keys(this.data)
    },
    dates() {
      return this.data
    },
    hourKeys() {
      return Object.keys(this.hours)
    },
    hours() {
      return this.dates[this.dateKeys[this.dateSelector]]
    },
    hourData() {
      return this.hours[this.hourKeys[this.hourSelector]]
    }
  }
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;


.separed {
  margin-bottom: 7px
}
.selector {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 22.5vh;
  font-size: 1.5rem;
  height: 40px;
  width: 150px;
  text-align: center;
}

.date-selector {
  top: 22vh;
  left: 25vw;
}

.hour-selector {
  right: 25vw;
}

.all-container {
  display: flex;
  flex-direction: row;


}

.data-content-array {
  font-size: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;
  width: 50%;
}

.data-content-object {
  font-size: 1.25rem;
  margin-top: 0.5em
}

.data-content {
  text-align: center;
  font-size: 1.25rem;
  margin-top: 0.5em

}
.data-title {
  font-size: 1.75rem;
  text-align: center;
  text-transform: capitalize;
  margin-top: 0.75em
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.data-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  justify-content: center;
  justify-items: center;
}

.data-view{
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  width: 250px;
  height: 250px;
    &:hover {
    background-color: rgba(255, 255, 255, 0.13);
  }
}

.page-display {
  font-size: 1.75rem;
  text-align: center;
  position: absolute;
  top: 90vh;
  left: 0;
  bottom: 0;
  right: 0;
}

.button {
  cursor: pointer;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.page-arrow {
  margin-top: 7em;
  height: 60px;
  width: 30px
}

.left-arrow {
  margin-right: 4em;
}

.right-arrow {
  margin-left: 4em;
}

.container-ui {
  width: 100%;
  height: 80vh;
  display: flex;
  
}


</style>
