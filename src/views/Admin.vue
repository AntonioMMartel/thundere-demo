<template>
  <div class="container-main">
    <UpdateDialog 
      v-if="dialogIsOpen" 
      @closeDialog="closeDialog" 
      :dialogIsUpdating="dialogIsUpdating" 
      :target="targets[targetSelector]" 
      :data="openDialogData" 
      :id="selectedId"
      :message="dialogMessage"
      :mode="dialogModes[selectedDialogMode]" />
    <FadingLightsAnimation />
    <div class="container-ui">
      <div class="select-container">
        <img data-test="moveTargetBackwards" v-on:click="moveTargetBackwards()" class="arrow button" src="/public/svgs/ArrowLeft.svg" />
        <div data-test="selectedTarget" class="select capitalize title">{{ targets[targetSelector] }}</div>
        <img data-test="moveTargetForwards" v-on:click="moveTargetForwards()" class="arrow button" src="/public/svgs/ArrowRight.svg" />
      </div>
      <table data-test="countriesTable" v-if="targets[targetSelector] == 'Countries'">
        <thead>
          <tr>
            <th>Code</th>
            <th class="name-col">Name</th>
            <th>Data</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr data-test="dataRow" v-for="(country, index) in data['Countries'].slice(page * 5, (page + 1) * 5)" :key="country._id.$oid" v-bind:id="country._id.$oid">
            <td>{{ country.isoCode }}</td>
            <td><DynamicArrayViewer :array="country.names"></DynamicArrayViewer></td>
            <td @click="seeCountryData(country.names[0])" class="button">Go to </td>
            <td class="unselectable">
              <div class="icons">
                <img
                  data-test="updateButton"
                  v-on:click="
                    openDialog({
                      'Iso code': country.isoCode,
                      Names: country.names,
                    },
                    country._id.$oid,
                    true)
                  "
                  class="unselectable button"
                  src="/public/svgs/EditButton.svg"
                />
                <img v-on:click="deleteCountry(country._id.$oid, index)" class="unselectable button" src="public/svgs/Trashcan.svg" />
              </div>
            </td>
          </tr>
          <tr>
            <td v-on:wheel="changePageOnScroll($event)" class="unselectable" colspan="100%">
              <div class="page-display">
                <img v-on:click="decreasePageCounter()" class="page-arrow button" src="/public/svgs/ArrowLeft.svg" />
                {{ page + 1 }}
                <img v-on:click="increasePageCounter()" class="page-arrow button" src="/public/svgs/ArrowRight.svg" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <table data-test="usersTable" v-if="targets[targetSelector] == 'Users'">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Confirmation Time</th>
            <th>Created Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr data-test="dataRow" v-for="user in data['Users'].slice(page * 5, (page + 1) * 5)" :key="user._id.$oid" v-bind:id="user._id.$oid">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td> {{ user.role }}</td>
            <td>{{ toNormalDate(user.confirmation_time.$date) }}</td>
            <td>{{ toNormalDate(user.created_time.$date) }}</td>
            <td class="unselectable">
              <div class="icons">
                <img
                  v-on:click="
                    openDialog({
                      Name: user.name,
                      Email: user.email,
                      Password: user.password,
                      Role: user.role,
                      'Confirmation time': toNormalDate(user.confirmation_time.$date),
                      'Creation time': toNormalDate(user.created_time.$date),
                    },
                    user._id.$oid,
                    true)
                  "
                  class="unselectable button"
                  src="/public/svgs/EditButton.svg"
                />
                <img v-on:click="deleteUser(user._id.$oid)" class="unselectable button" src="/public/svgs/Trashcan.svg" />
              </div>
            </td>
          </tr>
          <tr>
            <td v-on:wheel="changePageOnScroll($event)" class="unselectable" colspan="100%">
              <div class="page-display">
                <img v-on:click="decreasePageCounter()" class="page-arrow button" src="/public/svgs/ArrowLeft.svg" />
                {{ page + 1 }}
                <img v-on:click="increasePageCounter()" class="page-arrow button" src="/public/svgs/ArrowRight.svg" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <img data-test="addButton" v-on:click="openDialog({}, 0, false)" class="add button" src="/public/svgs/add.svg" />
        <div v-if="targets[targetSelector] == 'Countries'" class="select-container"> 
          <img v-on:click="moveDialogModeBackwards()" class="arrow button" src="/public/svgs/ArrowLeft.svg" />
          <div class="sub-title">{{ dialogModes[selectedDialogMode] }} </div>
          <img v-on:click="moveDialogModeForwards()" class="arrow button" src="/public/svgs/ArrowRight.svg" />
        </div>
    </div>
  </div>
</template>

<script>
import FadingLightsAnimation from "../components/FadingLightsAnimation.vue";
import DynamicArrayViewer from "../components/DynamicArrayViewer.vue";
import UpdateDialog from "../components/UpdateDialog.vue";
import countries from "../assets/data/countries.json"
import users from "../assets/data/users.json"
//import { getAllCountries, deleteCountryByID, getAllUsers, deleteUserByID, addAllCountries } from "../../facade/AdminFacade.js";
export default {
  name: "Admin",
  components: { FadingLightsAnimation, DynamicArrayViewer, UpdateDialog },
  data() {
    return {
      data: { Countries: [], Users: [] },
      message: "Loading data...",
      targets: ["Countries", "Users"],
      targetSelector: 0,
      page: 0,
      maxElements: 5,
      openDialogData: {},
      dialogIsOpen: false,
      selectedId: 0,
      dialogIsUpdating: false,
      dialogMessage: "",
      dialogModes: ["Add one normally", "Add one using api", "Add all using api"],
      selectedDialogMode: 0
    };
  },
  beforeMount() {
    // Pilla todos los datos
    this.getAllCountries()
    this.getAllUsers()
    // Los cacheas
    // // // //
  },
  methods: {
    getAllCountries() {
      this.data["Countries"] = countries
    },
    getAllUsers() {
      this.data["Users"] = users
    },
    toNormalDate(date) {
      return date.substr(0,10) + ", " + date.substr(11, 8)
    },

    deleteCountry(id, key) {
      if (confirm("This country and all its associated data will be deleted permanently. (This feature is disabled and just hides the country in the table)"))
        document.getElementById(id).style.display = "none";



    },
    deleteUser(id) {
      if (confirm("This user and all its associated data will be deleted permanently. (This feature is disabled and just hides the user in the table)"))
        document.getElementById(id).style.display = "none";

    },
    moveTargetBackwards() {
      if (this.targetSelector - 1 < 0) {
        this.targetSelector = this.targets.length - 1;
      } else {
        this.targetSelector--;
      }
      this.page= 0
    },
    moveTargetForwards() {
      if (this.targetSelector + 1 >= this.targets.length) {
        this.targetSelector = 0;
      } else {
        this.targetSelector++;
      }
      this.page= 0
    },
    longToDate(time) {
      var date = new Date(parseInt(time));
      return date.toLocaleString();
    },
    decreasePageCounter() {
      if (this.page - 1 < 0) {
        this.page = Math.ceil(this.data[this.targets[this.targetSelector]].length / this.maxElements) - 1;
      } else {
        this.page--;
      }
    },
    increasePageCounter() {
      if (this.page + 1 >= Math.ceil(this.data[this.targets[this.targetSelector]].length / this.maxElements)) {
        this.page = 0;
      } else {
        this.page++;
      }
    },
    changePageOnScroll(event) {
      // Hacia arriba
      if (event.deltaY < 0) {
        this.increasePageCounter();
      } else {
        this.decreasePageCounter();
      }
    },
    openDialog(data, id, dialogIsUpdating) {
      if(dialogIsUpdating){ // Update
        this.dialogIsUpdating = true
        this.openDialogData = data;
        this.selectedId = id;
        this.dialogIsOpen = true;

      } else { // Add
        this.dialogIsUpdating = false
        if(this.targets[this.targetSelector] === "Users"){ // User
          this.openDialogData = {
                                  Name: '',
                                  Email:'',
                                  Password: '',
                                  Roles: '',
                                  'Confirmation time': this.longToDate(Date.now()),
                                  'Creation time': this.longToDate(Date.now()),
                                }
          this.dialogIsOpen = true;

        } else if (this.targets[this.targetSelector] === "Countries"){ //Country

          if(this.dialogModes[this.selectedDialogMode] === "Add one using api") {
            this.openDialogData = {'Name': "", }
            this.dialogMessage = "Put the name of the country you want to add and well call our apis to have it completed automatically for you :)"
            this.dialogIsOpen = true;

          } else if (this.dialogModes[this.selectedDialogMode] === "Add all using api") {
            confirm("This will update all existing data with that of the api. (This feature is disabled and pressing OK will do nothing)")

          } else if (this.dialogModes[this.selectedDialogMode] === "Add one normally") { // Solamente va a añadir
            this.openDialogData = {
                                    'Iso Code': "",
                                    'Names': []
                                  }
            this.dialogMessage = "Be sure to include something in names so you can search it and modify it via the country viewer"
            this.dialogIsOpen = true;
          }
        }
      }
    },
    closeDialog() {
      if(this.targets[this.targetSelector] === "Countries") 
        this.getAllCountries()

      if(this.targets[this.targetSelector] === "Users") 
        this.getAllUsers()
      
      this.dialogIsOpen = false;
      this.dialogMessage = '';
    },
    moveDialogModeBackwards() {
      if (this.selectedDialogMode - 1 < 0) {
        this.selectedDialogMode = this.dialogModes.length - 1;
      } else {
        this.selectedDialogMode--;
      }
    },
    moveDialogModeForwards() {
      if (this.selectedDialogMode + 1 >= this.dialogModes.length) {
        this.selectedDialogMode = 0;
      } else {
        this.selectedDialogMode++;
      }
    },
    seeCountryData(name) {
      window.location.replace("/country/" + name)
    }
  },
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.sub-title {
  font-size: 1.5em;
  text-align: center;
  width: 100px;
  margin-top: 0.5em;

}

.add {
  margin-top: 1.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  
}

.page-display {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
  height: 50%;
  margin-right: 1em;
  margin-left: 1em;
}
.arrow {
  margin: 1.5em;
}
.select-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  padding-top: 0.2em;
}

.title {
  width: 33vw;
}
.select {
  font-size: 2.5rem;
  text-align: center;
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

.container-ui {
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  border-radius: 10px;
}

.unselectable {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
}

th,
td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  max-width: 20vw;
  word-wrap: break-word;
  text-align: center;
}

th {
  text-align: center;
}

thead {
  th {
    background-color: rgba(255, 255, 255, 0.15);
  }
}

tbody {
  tr {
    &:hover {
      display: table-row;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
