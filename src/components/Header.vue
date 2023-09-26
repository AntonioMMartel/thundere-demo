<template>
    <nav class="contenedor-nav">
        <NavButton data-test="navButton"
        v-for="navButton in navButtonsDisplay"
        :key="navButton.id"
        :label="navButton.label"
        :id="navButton.id"
        :href="navButton.href"
        ></NavButton>            
    </nav>
</template>

<script>
import NavButton from './NavButton.vue'
    export default {
        name: 'Header',
        data: () => ({
            navButtons: [
                {id: 1, label: "History", href:"/history", forRole:"user" },
                {id: 2, label: "Sign in", href:"/login", forRole:"none" },
                {id: 3, label: "Home", href:"/", forRole:"all" },
                {id: 4, label: "Bookmarks", href:"/bookmarks", forRole:"user" },
                {id: 5, label: "Sign up", href:"/register", forRole:"none" },
                {id: 6, label: "Sign out", href:"/logout", forRole:"user" },
                {id: 7, label: "Sign out", href:"/logout", forRole:"admin" },
                {id: 8, label: "Admin", href:"/admin", forRole:"admin" },
            ],
        }),
        components: { NavButton },
        props:["userRole"],
        onMount() {

        },
        computed: {
            navButtonsDisplay: function() {
                let navButtonsRole = [];
                

                // Mira si el botón está destinado a ese usuario. Si no lo está no lo pone
                for(let key in this.navButtons) {
                    if (this.navButtons[key].forRole == this.userRole || this.navButtons[key].forRole == "all"){
                        navButtonsRole.push(this.navButtons[key]);
                    } 
                }
                return navButtonsRole;
            }
        }

    }
</script>

<style lang="scss" scoped>
$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;
    .contenedor-nav{
        display: flex;
        width: 100%;
        height: 10vh;
        justify-content: center;
        align-items: center;
        color: $primary-color;
        font-size: 2em;
    }



</style>