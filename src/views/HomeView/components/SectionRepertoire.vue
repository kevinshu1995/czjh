<script setup lang="ts">
import { computed } from 'vue'
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()

const runDown = computed(() => {
  return storeGoogle.runDown.map((item) => {
    if (item['曲序']) {
      item.order = String(item['曲序']).padStart(2, '0')
      return item
    }
    return item
  })
})
</script>

<template>
  <div class="">
    <ul class="space-y-20">
      <li v-for="item in runDown" :key="item.id" class="space-y-4 border-l-4 border-yellow11 pl-4">
        <div class="space-y-1">
          <span class="text-yellow11 text-2xl">{{ item?.order || '' }}</span>
          <h3 class="text-3xl font-bold">
            {{ item['曲目/活動'] }}
          </h3>
          <p class="text-gray-400">{{ item['小標題'] }}</p>
        </div>
        <p class="text-base-content text-lg" v-for="p in item.description">{{ p }}</p>
      </li>
    </ul>
  </div>
</template>
