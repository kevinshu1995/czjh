<script setup lang="ts">
import BaseNavbar from '@/components/BaseNavbar.vue'
import SectionIntro from './components/SectionIntro.vue'
import SectionRepertoire from './components/SectionRepertoire.vue'
import SectionAbout from './components/SectionAbout.vue'

import useGoogle from '@/lib/composables/google'
import { useNav } from '@/stores/nav'

const storeNav = useNav()

const { fetchAllSheets } = useGoogle()
fetchAllSheets().then((res) => console.log(res))
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
