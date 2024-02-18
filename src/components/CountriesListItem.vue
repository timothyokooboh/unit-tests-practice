<template>
  <div id="test" class="country">
    <div class="country__name">
      {{ country?.name?.common }}
    </div>
    <img :src="country?.flags?.svg" :alt="country?.flags?.alt" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  country: Record<string, any>
}>()
</script>

<style lang="scss">
.country {
  margin-block-end: 20px;
  padding-block-end: 20px;
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  column-gap: 20px;
  border-bottom: 1px solid #eee;

  &__name {
    word-break: break-word;
  }

  img {
    width: 50px;
    height: 50px;
  }
}
</style>
