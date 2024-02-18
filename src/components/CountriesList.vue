<template>
  <div class="countries">
    <div v-if="isLoading" class="loader" aria-busy="true" data-testid="loader">Loading...</div>

    <section v-else data-testid="countries">
      <CountriesListItem
        @click="$router.push({ name: 'country', params: { name: country.name.common } })"
        v-for="country in countries"
        :key="country.name.common"
        :country="country"
        id="test"
        class="country"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useListCountries } from '@/composables/useListCountries'
import CountriesListItem from './CountriesListItem.vue'

const { isLoading, countries, listCountries } = useListCountries()
listCountries()
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
.countries {
  width: 90%;
  max-width: 500px;
  margin: 50px auto;
}

.country {
  @supports (animation-timeline: view()) {
    transform: translateY(-30px);
    opacity: 0;
    animation: fade-in linear forwards;
    animation-timeline: view();
    animation-range: entry 10px;
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
