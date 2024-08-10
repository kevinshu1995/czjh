<script setup lang="ts">
import { computed } from 'vue'
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()

const runDown = computed(() => {
  let order = 1
  return storeGoogle.runDown.map((item) => {
    if (item['曲目/活動'] === '中場休息') {
      return item
    }

    item.order = String(order).padStart(2, '0')
    order += 1
    return item
  })
})
</script>

<template>
  <div class="">
    <ul class="space-y-20">
      <li v-for="item in runDown" :key="item.id" class="space-y-1 border-l-4 border-yellow11 pl-4">
        <span class="text-yellow11 text-2xl">{{ item.order || '' }}</span>
        <h3 class="text-3xl font-bold">
          {{ item['曲目/活動'] }}
        </h3>
        <p class="text-gray-400">{{ item['小標題'] }}</p>
      </li>
    </ul>
  </div>
</template>
