<template>
    <div class="country">
        <CountriesListItem :country="country"/>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import CountriesListItem from '@/components/CountriesListItem.vue';
import { useViewCountry } from '@/composables/useViewContry';

const route = useRoute()
const {isLoading, country, viewCountry } = useViewCountry()

viewCountry(route.params.name)
</script>

<style scoped>
.loader {
    text-align: center;
}
.countries {
    width: 90%;
    max-width: 500px;
    margin: 50px auto;
}
</style>