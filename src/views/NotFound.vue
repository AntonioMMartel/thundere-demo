<template>
    <article>
        <div class="container-main">
            <FadingLightsAnimation/>
            <div class="container-ui">
                <div data-test="title" class="title capitalize"> Page not found </div> 
                <div data-test="text" class="texto"> The page you were looking for doesn't exist. </div>
            </div>
        </div>
    </article>
</template>

<script>
import FadingLightsAnimation from '../components/FadingLightsAnimation.vue'

    export default {
        name: 'Bookmarks',
        components: {FadingLightsAnimation},
    }
</script>


<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

    .title {
        font-size: 7rem;     
        text-align: center;
    }

    .capitalize {
        text-transform: capitalize;
    }   

    .container-main {
        display:flex;
        min-height: 80vh;
        height:auto;
        flex-wrap: wrap;
        color: $primary-color;
    }

    .container-ui {
        width: 100%;
        height: 80vh;
        
        display: flex;
        flex-direction: column;
        align-items: center;

        div:first-child{
            padding-bottom: 0.3em ;
            padding-top: 1.2em;
        }
        
    }

    .texto {
        font-size: 2rem;
    }

</style>