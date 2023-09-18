<template>
  <router-link data-test="button" :to="href" class="contenedor-nav-item"> {{ label }} </router-link>
</template>

<script>
export default {
  props: ["label", "href", "user-role"],
}
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.contenedor-nav-item {
  padding: 1.25em;
  text-decoration: none;
  color: $primary-color;

  &:hover {
    color: $primary-color-darker;
  }

  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
