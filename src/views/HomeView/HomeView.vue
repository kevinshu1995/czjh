<script setup lang="ts">
import BaseNavbar from '@/components/BaseNavbar.vue'
import SectionIntro from './components/SectionIntro.vue'
import SectionRepertoire from './components/SectionRepertoire.vue'
import SectionAbout from './components/SectionAbout.vue'

import { useNav } from '@/stores/nav'
import { useGoogle } from '@/stores/google'

const storeNav = useNav()
const storeGoogle = useGoogle()
</script>

<template>
  <BaseNavbar />
  <main>
    <div class="container">
      <section :id="storeNav.getSection('intro').hash" class="py-96 space-y-20">
        <h2 class="text-center text-4xl font-bold">簡介</h2>
        <SectionIntro />
      </section>
      <section :id="storeNav.getSection('repertoire').hash" class="py-96 space-y-20">
        <h2 class="text-center text-4xl font-bold">演出曲目</h2>
        <SectionRepertoire />
      </section>
      <section :id="storeNav.getSection('about').hash" class="py-96 space-y-20">
        <h2 class="text-center text-4xl font-bold">關於我們</h2>
        <SectionAbout />
      </section>
    </div>
  </main>
</template>
