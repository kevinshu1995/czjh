<script setup lang="ts">
import useGoogle from '@/lib/composables/google'

const { fetchAllSheets } = useGoogle()

fetchAllSheets().then((res) => console.log(res))
</script>

<template>
  <main>Welecome to the HomeView!</main>
</template>
