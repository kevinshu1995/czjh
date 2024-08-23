<script setup lang="ts">
import { computed } from 'vue'
import IconFacebook from '/src/components/icon/IconFacebook.vue'
import IconInstagram from '/src/components/icon/IconInstagram.vue'
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()

const bandDescription = computed(() => {
  return storeGoogle.others.find((item) => item['項目'] === '樂團介紹')?.['內容']
})
</script>

<template>
  <div class="pb-24 space-y-8 text-gray-800">
    <div>
      <img src="/people.jpg" class="w-full" alt="" />
    </div>
    <div class="w-2/3">
      <img src="/CZJH-logo_rectangle-logo-light.svg" alt="" />
    </div>
    <div class="space-y-4">
      <p v-for="p in bandDescription">
        {{ p }}
      </p>
    </div>

    <hr />

    <div class="flex flex-col gap-4">
      <a
        class="btn bg-yellow11/40 hover:bg-yellow11/20 border-none"
        target="_blank"
        href="https://instagram.com/czjhawb/"
      >
        <IconInstagram width="30" height="30" />
        <span>@czjhawb</span>
      </a>
      <a
        class="btn bg-yellow11/40 hover:bg-yellow11/20 border-none"
        target="_blank"
        href="https://www.facebook.com/CZWindBand"
      >
        <IconFacebook width="30" height="30" />
        <span>誠正國中校友管樂團</span>
      </a>
    </div>
  </div>
</template>
