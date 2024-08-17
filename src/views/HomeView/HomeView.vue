<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch, nextTick } from 'vue'
import BaseNavbar from '@/components/BaseNavbar.vue'
import SectionIntro from './components/SectionIntro/SectionIntro.vue'
import SectionRepertoire from './components/SectionRepertoire.vue'
import SectionAbout from './components/SectionAbout.vue'
import IconLogo from '/src/components/icon/IconLogo.vue'

import { useNav } from '@/stores/nav'
import { useGoogle } from '@/stores/google'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const storeNav = useNav()
const storeGoogle = useGoogle()

const elSection1 = ref(null)
const elTitle101 = ref(null)
const elTitle102 = ref(null)

const elSection2 = ref(null)
const elTitle201 = ref(null)
const elTitle202 = ref(null)

const elSection3 = ref(null)
const elTitle301 = ref(null)
const elTitle302 = ref(null)

async function scrollAnimation(targets: { el: Ref; from: {}; to: {} }[], targetWrap: Ref) {
  if (!targets.every((target) => target.el.value) || !targetWrap.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'in' },
    scrollTrigger: {
      trigger: targetWrap.value,
      scrub: true,
      start: 'top-=300 top',
      end: '+=100%',
      pin: true,
      markers: true
    }
  })

  targets.forEach((target) => {
    tl.from(target.el.value, target.from).to(target.el.value, target.to)
  })

  await nextTick()
  setTimeout(() => {
    tl.scrollTrigger && tl.scrollTrigger.refresh()
  }, 0)
}

watch([elTitle101, elTitle102, elSection1, () => storeGoogle.isFetching], () => {
  if (storeGoogle.isFetching === true) return
  scrollAnimation(
    [
      {
        el: elTitle101,
        from: { xPercent: -105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      },
      {
        el: elTitle102,
        from: { xPercent: 105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      }
    ],
    elSection1
  )
})
watch([elTitle201, elTitle202, elSection2, () => storeGoogle.isFetching], () => {
  if (storeGoogle.isFetching === true) return
  scrollAnimation(
    [
      {
        el: elTitle201,
        from: { xPercent: -105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      },
      {
        el: elTitle202,
        from: { xPercent: 105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      }
    ],
    elSection2
  )
})
watch([elTitle301, elTitle302, elSection3, () => storeGoogle.isFetching], () => {
  if (storeGoogle.isFetching === true) return
  scrollAnimation(
    [
      {
        el: elTitle301,
        from: { xPercent: -105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      },
      {
        el: elTitle302,
        from: { xPercent: 105, autoAlpha: 0, scale: 0 },
        to: { xPercent: 0, autoAlpha: 1, scale: 1 }
      }
    ],
    elSection3
  )
})
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
    <main class="relative max-w-lg space-y-60">
      <div class="relative">
        <div
          :class="[
            'container my-72 px-4 flex flex-nowrap gap-2 relative',
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
            'absolute -left-12 bottom-0 w-[300px] transition duration-500 ease-out translate-y-full !-translate-x-1/2'
          ]"
        >
          <img
            :class="[storeGoogle.isFetching || 'animate-[HugeFadeIn_1s_ease-out]']"
            src="/landing-images/web-demo_circle-1.svg"
            alt=""
          />
        </div>
      </div>
      <div class="container max-w-[100vw]">
        <section :id="storeNav.getSection('intro').hash" class="space-y-72 py-16" ref="elSection1">
          <div>
            <p class="opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10">
              <span class="inline-block" ref="elTitle101"> Staff </span>
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20" ref="elTitle102">
              演出人員
            </h2>
          </div>
          <SectionIntro />
        </section>
        <section
          :id="storeNav.getSection('repertoire').hash"
          class="space-y-72 py-16"
          ref="elSection2"
        >
          <div>
            <p class="opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10">
              <span class="inline-block" ref="elTitle201">Repertoire</span>
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20" ref="elTitle202">
              演出曲目
            </h2>
          </div>
          <SectionRepertoire />
        </section>
        <section :id="storeNav.getSection('about').hash" class="space-y-72 py-16" ref="elSection3">
          <div>
            <p class="opacity-70 text-9xl text-yellow11 font-bold relative top-8 z-10">
              <span class="inline-block" ref="elTitle301"> About </span>
            </p>
            <h2 class="text-7xl font-bold italic text-yellow11 relative z-20" ref="elTitle302">
              關於我們
            </h2>
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
