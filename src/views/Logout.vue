<template>
    <article>
        <div class="container-main">

            Iconito / Gif crema de cargando
            
        </div>
    </article>
</template>

<script>
export default {
    created () {
        window.location.reload()
    }
}
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.container-main {
    display:flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    flex-wrap: wrap;
    color: $primary-color;
}
</style>