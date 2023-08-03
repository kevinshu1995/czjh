<script setup lang="ts">
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
  <main>
    <div class="mb-60">
      <img src="/cover.jpg" alt="" />
    </div>
    <div class="container space-y-60">
      <section :id="storeNav.getSection('intro').hash" class="space-y-24">
        <h2 class="text-7xl font-bold italic text-gray-300">演出人員</h2>
        <SectionIntro />
      </section>
      <section :id="storeNav.getSection('repertoire').hash" class="space-y-24">
        <h2 class="text-7xl font-bold italic text-gray-300">演出曲目</h2>
        <SectionRepertoire />
      </section>
      <section :id="storeNav.getSection('about').hash" class="space-y-24">
        <h2 class="text-7xl font-bold italic text-gray-300">關於我們</h2>
        <SectionAbout />
      </section>
    </div>
  </main>
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
