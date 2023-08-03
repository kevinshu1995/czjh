<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useNav } from '@/stores/nav'

const router = useRouter()
const storeNav = useNav()
const sections = computed(() => storeNav.sections)
const elNav = ref(null)

const { height } = useElementSize(elNav)

function onClickLogo() {
  router.push('/')
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

watch(height, () => {
  if (
    typeof height.value === 'number' &&
    height.value !== 0 &&
    height.value !== storeNav.navHeight
  ) {
    storeNav.navHeight = height.value
  }
})
</script>

<template>
  <header class="sticky top-0 z-[9999]" ref="elNav">
    <div class="navbar bg-base-100 bg-opacity-90">
      <div class="">
        <button class="btn btn-ghost normal-case text-xl px-2" @click="onClickLogo">
          <div class="h-full py-2 w-[30px]">
            <img src="/logo.svg" class="w-full h-full" alt="" />
          </div>
        </button>
      </div>
      <div class="flex ml-auto">
        <ul class="menu menu-horizontal px-1 space-x-2">
          <li v-for="section in sections" :key="section.hash">
            <router-link :to="`/#${section.hash}`">
              {{ section.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
