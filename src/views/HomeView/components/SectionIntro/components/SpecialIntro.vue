<script setup lang="ts">
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()
</script>

<template>
  <div>
    <ul class="space-y-24">
      <li v-for="intro in storeGoogle.specialIntro" class="space-y-4">
        <div class="flex items-end space-x-4">
          <div class="shrink-0 w-28 h-28 overflow-hidden" v-if="intro['照片']">
            <img
              :src="intro['照片']"
              alt=""
              class="h-full w-full object-cover rounded-tr-3xl rounded-bl-3xl"
            />
          </div>
          <div class="space-y-2">
            <div class="gap-1 flex flex-col">
              <p class="font-thin">{{ intro['職稱'] }}</p>
              <h3 class="font-bold text-4xl">{{ intro['姓名'] }}</h3>
            </div>
            <p class="italic text-gray-400 text-sm" v-if="intro.quote">
              {{ intro.quote }}
            </p>
          </div>
        </div>
        <div class="space-y-4 text-gray-800">
          <p v-for="p in intro['介紹']">{{ p }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
