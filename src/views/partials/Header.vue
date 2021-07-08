<template>
    <div id="home-header" class="purple-gradient md:mt-12 mb-12 pt-12 pb-24 md:rounded shadow-xl">
        <router-link :to="{ name: 'Home' }">
            <h1 class="text-4xl text-center mt-12 text-white" id="main-header">Tajná volba</h1>
        </router-link>
        <h4 class="text-white text-center" id="main-subheader">{{title}}</h4>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: ['title']
}
</script>