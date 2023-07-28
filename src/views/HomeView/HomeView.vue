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
    <section :id="storeNav.getSection('intro').hash" class="py-96 border border-white">
      <SectionIntro />
    </section>
    <section :id="storeNav.getSection('repertoire').hash" class="py-96 border border-white">
      <SectionRepertoire />
    </section>
    <section :id="storeNav.getSection('about').hash" class="py-96 border border-white">
      <SectionAbout />
    </section>
  </main>
</template>
