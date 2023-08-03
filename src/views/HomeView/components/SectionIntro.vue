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
  <!-- 演出人員 -->
  <div class="flex justify-center">
    <div class="space-y-12">
      <ul class="space-y-12">
        <li v-for="(group, i) in staff" :key="i" class="space-y-2">
          <h3 class="text-3xl font-bold">{{ group[0]['樂器'] }}</h3>
          <ul class="flex flex-wrap">
            <li v-for="(person, i) in group" class="">
              <div class="space-x-1 items-center">
                <span v-if="i !== 0">、</span>
                <span>
                  {{ person['名稱'] }}
                </span>
                <span class="text-gray-300 text-xs">
                  {{ person['屆數'] === 0 ? helper : '' }}
                </span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <p>{{ helper }} 協演</p>
    </div>
  </div>
</template>
