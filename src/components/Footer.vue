<template>
    <footer class="contenedor-footer">
        <div class="footer-text">
            This is a visual demo, all data apis are disconnected and data will not be up to date.
            As well as this, most countries wont have weather data. Except for: Morocco, Belgium, China, Cabo Verde and several others. 
            I also disconnected the cloud database (MongoDB Atlas) and all of the backend implementation(Symfony) so filters will not work.
            <br><br>
            ©2022 Gofio SA ™ - Todos los derechos reservados
        </div>


    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    } 
</script>

<style lang="scss" scoped>
    .contenedor-footer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        align-items: center;
        height: 10vh;
    }

    .footer-text {
        text-align: center;
        width: 50%;
        color: white; 
        padding-bottom: 1em;
    }
</style>