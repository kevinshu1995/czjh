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
    class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-white bg-opacity-80 backdrop-blur z-50"
  >
    <div>
      <span class="loading loading-ring loading-lg"></span>
      <p class="text-sm text-gray-300">讀取中</p>
    </div>
  </div>
  <div
    :class="[
      'fixed z-[-1] left-0 top-0 w-screen h-screen',
      !storeGoogle.isFetching && 'animate-[blurIn_1.5s_ease-in]'
    ]"
  >
    <img src="/background-sheet.jpg" class="object-cover h-full w-full opacity-5" alt="" />
  </div>
  <div
    :class="[
      'flex justify-center overflow-x-hidden',
      !storeGoogle.isFetching && 'animate-[blurIn_1.5s_ease-in]'
    ]"
  >
    <main class="relative max-w-lg">
      <div class="relative">
        <div
          :class="[
            'container my-40 px-4 flex flex-nowrap gap-2 relative',
            storeGoogle.isFetching || 'animate-[SmallFadeIn_1s_ease-out]'
          ]"
        >
          <div class="w-[22.6%] animate-[float_3s_0.2s_infinite]">
            <img class="aspect-[274/800]" src="/landing-images/main_head_title-1.png" alt="1" />
          </div>
          <div class="w-[33%] animate-[float_3s_0.5s_infinite]">
            <img class="aspect-[400/800]" src="/landing-images/main_head_title-2.png" alt="2" />
          </div>
          <div class="w-[44.3%] animate-[float_3s_0.3s_infinite]">
            <img class="aspect-[536/800]" src="/landing-images/main_head_title-3.png" alt="輯" />
          </div>
          <div class="absolute left-0 bottom-6 w-[43%] ml-[60px] animate-[float_3s_infinite]">
            <img src="/landing-images/web-demo_subtitle.svg" alt="" />
          </div>
        </div>
        <div :class="['absolute right-0 top-0 w-[300px] translate-x-1/4 -translate-y-full']">
          <img
            :class="[storeGoogle.isFetching || 'animate-[HugeFadeIn_1s_ease-out]']"
            src="/landing-images/web-demo_circle-4.svg"
            alt=""
          />
        </div>
        <div :class="['absolute -right-28 top-1/2 w-[100px] -translate-y-1/2']">
          <img
            :class="[storeGoogle.isFetching || 'animate-[HugeFadeIn_1s_ease-out]']"
            src="/landing-images/web-demo_circle-3.svg"
            alt=""
          />
        </div>
        <div
          :class="[
            'absolute -left-12 bottom-0 w-[300px] transition duration-500 ease-out translate-y-3/4 !-translate-x-3/4'
          ]"
        >
          <img
            :class="[storeGoogle.isFetching || 'animate-[HugeFadeIn_1s_ease-out]']"
            src="/landing-images/web-demo_circle-1.svg"
            alt=""
          />
        </div>
      </div>
      <div class="container max-w-[100vw] space-y-60">
        <section :id="storeNav.getSection('intro').hash" class="space-y-24">
          <div class="marquee-container">
            <p
              class="marquee-content opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10"
            >
              Staff
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20">演出人員</h2>
          </div>
          <SectionIntro />
        </section>
        <section :id="storeNav.getSection('repertoire').hash" class="space-y-24">
          <div class="marquee-container">
            <p
              class="marquee-content opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10"
            >
              Repertoire
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20">演出曲目</h2>
          </div>
          <SectionRepertoire />
        </section>
        <section :id="storeNav.getSection('about').hash" class="space-y-24">
          <div class="marquee-container">
            <p
              class="marquee-content opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10"
            >
              About
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20">關於我們</h2>
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
