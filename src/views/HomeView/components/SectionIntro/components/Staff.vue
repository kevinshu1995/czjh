<script setup lang="ts">
import { computed } from 'vue'
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()

const staff = computed(() => {
  return storeGoogle.staff
})

const helper = '*'
</script>

<template>
  <!-- 演出人員 -->
  <div class="space-y-12">
    <ul class="space-y-12">
      <li v-for="(group, i) in staff" :key="i" class="space-y-2 border-l-4 border-yellow11 pl-4">
        <div class="space-y-0">
          <h3 class="text-3xl font-bold">{{ group[0].instrument }}</h3>
          <p class="text-gray-400">{{ group[0]['樂器'] }}</p>
        </div>
        <ul class="flex flex-wrap">
          <li v-for="(person, i) in group" class="mr-3">
            <div class="space-x-1 items-center">
              <!-- <span v-if="i !== 0">、</span> -->
              <span>
                {{ person['名稱'] }}
              </span>
              <span class="text-gray-400 text-xs">
                {{ person['屆數'] === 0 ? helper : person['屆數'] }}
              </span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <p>{{ helper }} 協演</p>
  </div>
</template>
