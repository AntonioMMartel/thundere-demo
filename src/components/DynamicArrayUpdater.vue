<template>
  <div data-test="arrayViewer" @mouseover="openMenu()"  @mouseleave="tryToCloseMenu()" v-on:wheel="modifyPointer($event)" class="container">
    <div class="pointer-data">
      <span data-test="dataValue" v-if="!addingNewElement">{{ this.array[this.pointer] }} </span>
      <span data-test="addingNewElement" v-if="addingNewElement"> Adding new element </span>
    </div>
    <div data-test="optionsMenu" ref="options" class="options-menu" >
      <img class="unselectable"  src="@/assets/svgs/ArrowsUpDown.svg" alt="" />
      <input data-test="indexInput" v-if="showingOptionsMenu" ref="pointerInput" class="bubble pointer-input down" type="number" v-model="pointer"/>
      <div data-test="addElementButton" v-if="showingOptionsMenu" v-on:click="startAddingNewElement()" class="bubble up" > + </div>
    </div>
    <input data-test="updateValueInput" name="input" id="form-input" type="text" :value="this.array[this.pointer]" />
    <img data-test="confirmButton" v-on:click="confirmChanges()" class="confirm-button" src="@/assets/svgs/Tic.svg" />
  </div>
</template>

<script>
export default {
  name: "DynamicArrayUpdater",
  data() {
    return {
      pointer: 0,
      showingOptionsMenu: false,
      menuBeingHovered: false,
      addingNewElement: false
    };
  },
  props: ["array", "label"],
  mounted: function() {
    if(this.array.length == 0) {
      this.addingNewElement = true;
    }
  },
  methods: {
    async sleep(ms) {
      return await new Promise((resolve) => setTimeout(resolve, ms));
    },
    modifyPointer(event) {
      // Hacia arriba
      if(!this.addingNewElement){
        if (event.deltaY < 0) {
          if (this.pointer + 1 >= this.array.length) {
            this.pointer = 0;
          } else {
            this.pointer++;
          }
        } else {
          if (this.array.length == 0) {
            this.pointer = 0
          } else if (this.pointer - 1 < 0) {
            this.pointer = this.array.length - 1;
          } else {
            this.pointer--
          }
        }
      } else {
        this.addingNewElement = !this.addingNewElement
      }
        
    },
    confirmChanges(){
      if(!this.addingNewElement) this.array[this.pointer] = document.getElementById("form-input").value;
      if(this.addingNewElement){
        this.array.push(document.getElementById("form-input").value);
      } 
      this.addingNewElement = false;
      this.$emit('arrayUpdated', this.array, this.label)
    },
    async openMenu(){
      this.showingOptionsMenu = true
      await this.sleep(10);
      if(!this.addingNewElement) this.$refs.pointerInput.focus();
      this.menuBeingHovered = true
    },
    async tryToCloseMenu () {
      this.menuBeingHovered = false
      await this.sleep(500);
      if(!this.menuBeingHovered){
        this.showingOptionsMenu = false
      } 
    },
    startAddingNewElement() {
      this.addingNewElement = true;
      this.pointer = this.array.length
    }
  },

};
</script>

<style lang="scss" scoped>
$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.pointer-data {
  width: 50%
}

.pointer-input {
  outline: none !important;
  resize: none !important;
  border: none !important;
  max-width: 15px;
  -moz-appearance: textfield;
  appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
}

.options-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
}

.bubble {
  position: absolute !important;
  background-color: rgba(255, 255, 255, 0.1); ;
  z-index: 10;
  padding: 1em;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.up {
  margin-top: 5em;
  cursor: pointer;

}

.down {
  margin-bottom: 5em;
}

.confirm-button {
  margin: 10px;
  height: 20px;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}

.unselectable {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  margin: 10px;
}
</style>
