<script setup lang="ts">
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()
</script>

<template>
  <div>
    <ul class="space-y-24">
      <li v-for="intro in storeGoogle.specialIntro" class="space-y-4">
        <div class="flex items-end space-x-4">
          <div class="w-36 h-36 overflow-hidden" v-if="intro['照片']">
            <img :src="intro['照片']" alt="" class="h-full w-full object-cover" />
          </div>
          <div class="space-y-2">
            <div class="space-x-2 flex items-end">
              <h3 class="font-bold text-4xl">{{ intro['姓名'] }}</h3>
              <p class="font-thin">{{ intro['職稱'] }}</p>
            </div>
            <p class="italic text-gray-300 text-sm" v-if="intro.quote">
              {{ intro.quote }}
            </p>
          </div>
        </div>
        <div class="space-y-4 text-gray-200">
          <p v-for="p in intro['介紹']">{{ p }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
