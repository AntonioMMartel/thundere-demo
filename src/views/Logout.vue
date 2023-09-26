<template>
    <article>
        <div class="container-main">

            Loading...
            
        </div>
    </article>
</template>

<script>
export default {
    created () {
        this.logout();
        window.location.replace("/");
    },
    methods: {
        logout() {
            return document.cookie = "userRole=none; max-age=60*60*6, path=/, SameSite=Strict" // Session token expires after 6 hours or after brower close
        //return sessionStorage.removeItem("userRole");
        }
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