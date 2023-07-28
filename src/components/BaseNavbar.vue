<script setup>
import { useNav } from '@/stores/nav'
import { ref, watch, computed } from 'vue'
import { useElementSize } from '@vueuse/core'

const storeNav = useNav()
const sections = computed(() => storeNav.sections)
const elNav = ref(null)

const { height } = useElementSize(elNav)

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
  <header class="sticky top-0" ref="elNav">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-xl">Logo</a>
      </div>
      <div class="navbar-center hidden md:flex">
        <ul class="menu menu-horizontal px-1 space-x-2">
          <li v-for="(section, i) in sections" :key="section.hash">
            <router-link custom v-slot="{ isActive, href, navigate }" :to="`/#${section.hash}`">
              <a
                :href="href"
                @click="navigate"
                :class="$route.fullPath === href ? 'text-red-400' : ''"
                >{{ section.text }}
              </a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="(section, i) in sections" :key="section.hash">
              <router-link custom v-slot="{ isActive, href, navigate }" :to="`/#${section.hash}`">
                <a
                  :href="href"
                  @click="navigate"
                  :class="$route.fullPath === href ? 'text-red-400' : ''"
                  >{{ section.text }}
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
