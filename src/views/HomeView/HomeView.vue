<script setup lang="ts">
import { watch, nextTick } from 'vue'
import BaseNavbar from '@/components/BaseNavbar.vue'
import SectionIntro from './components/SectionIntro/SectionIntro.vue'
import SectionRepertoire from './components/SectionRepertoire.vue'
import SectionAbout from './components/SectionAbout.vue'
import IconLogo from '/src/components/icon/IconLogo.vue'

import { useNav } from '@/stores/nav'
import { useGoogle } from '@/stores/google'

const storeNav = useNav()
const storeGoogle = useGoogle()
</script>

<template>
  <BaseNavbar />
  <!-- loading -->
  <div
    v-show="storeGoogle.isFetching"
    class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur z-50"
  >
    <div>
      <span class="loading loading-ring loading-lg"></span>
      <p class="text-sm text-gray-300">讀取中</p>
    </div>
  </div>
  <div class="fixed z-[-1] left-0 top-0 w-screen h-screen">
    <img src="/background-sheet.jpg" class="object-cover h-full w-full opacity-5" alt="" />
  </div>
  <div class="flex justify-center">
    <main class="overflow-x-hidden relative max-w-md">
      <div class="mb-60">
        <img src="/cover.jpg" alt="" />
      </div>
      <div class="container space-y-60">
        <section :id="storeNav.getSection('intro').hash" class="space-y-24">
          <div>
            <p class="text-9xl text-gray-700 font-bold relative top-8 -left-4 z-10">Staff</p>
            <h2 class="text-7xl font-bold italic text-gray-300 relative z-20">演出人員</h2>
          </div>
          <SectionIntro />
        </section>
        <section :id="storeNav.getSection('repertoire').hash" class="space-y-24">
          <div>
            <p class="text-9xl text-gray-700 font-bold relative top-8 -left-4 z-10">Repertoire</p>
            <h2 class="text-7xl font-bold italic text-gray-300 relative z-20">演出曲目</h2>
          </div>
          <SectionRepertoire />
        </section>
        <section :id="storeNav.getSection('about').hash" class="space-y-24">
          <div>
            <p class="text-9xl text-gray-700 font-bold relative top-8 -left-4 z-10">About</p>
            <h2 class="text-7xl font-bold italic text-gray-300 relative z-20">關於我們</h2>
          </div>
          <SectionAbout />
        </section>
      </div>
    </main>
  </div>
  <footer>
    <div class="container text-xs text-gray-400 py-8">
      <div class="flex flex-col gap-2 justify-center items-center">
        <p>© 2023 誠正國中校友管樂團</p>
        <div class="max-w-[200px]">
          <IconLogo class="w-full" />
        </div>
      </div>
    </div>
  </footer>
</template>
