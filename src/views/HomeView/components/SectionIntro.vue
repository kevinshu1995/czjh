<script setup>
import { computed } from 'vue'
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()

const staff = computed(() => {
  return storeGoogle.staff
})

const helper = '*'
</script>

<template>
  <div class="flex justify-center">
    <ul class="space-y-12">
      <li v-for="(group, i) in staff" :key="i" class="space-y-2">
        <h3 class="text-3xl font-bold">{{ group[0]['樂器'] }}</h3>
        <ul class="flex flex-wrap -mx-2">
          <li v-for="(person, i) in group" class="px-2">
            <div class="space-x-1 items-center">
              <span v-if="i !== 0">/ </span>
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
  </div>
  <p>{{ helper }} 協演</p>
</template>
