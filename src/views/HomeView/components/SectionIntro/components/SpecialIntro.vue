<script setup lang="ts">
import { useGoogle } from '@/stores/google'

const storeGoogle = useGoogle()
</script>

<template>
  <div>
    <ul class="space-y-24">
      <li v-for="intro in storeGoogle.specialIntro" class="space-y-4">
        <div class="flex items-end space-x-4">
          <div class="shrink-0 w-28 h-28 overflow-hidden" v-if="intro['照片']">
            <img
              :src="intro['照片']"
              alt=""
              class="h-full w-full object-cover rounded-tr-3xl rounded-bl-3xl"
            />
          </div>
          <div class="space-y-2">
            <div class="gap-1 flex flex-col">
              <p class="font-thin">{{ intro['職稱'] }}</p>
              <h3 class="font-bold text-4xl">{{ intro['姓名'] }}</h3>
            </div>
            <p class="italic text-gray-400 text-sm" v-if="intro.quote">
              {{ intro.quote }}
            </p>
          </div>
        </div>
        <div class="space-y-4 text-gray-800">
          <p v-for="p in intro['介紹']">{{ p }}</p>
          <div v-if="intro['姓名'] === '駱繹'" class="space-y-4">
            <span class="italic block"
              >「有自己的校友團吹，是一件非常幸福的事！」-大安高工校友團團長 李啟源</span
            >
            <p>
              其實這場音樂會，從2021年12月開始計畫，中間經過疫情的打擊，讓這場音樂會不斷延期，起初是以跟在校生管樂團一起成發的規劃，但也因為疫情反覆爆發，計畫再次終止。而在2022年8月我個人吹完大安高工校友團後，被開頭這一句深深的啟發，我們應該要有一個屬於我們自己的校友團，不是featuring那種身份，組成成員都是畢業校友，真正的辦一場校友團音樂會，用心吹出讓人感動的音樂，與做事認真的態度，去深深影響後輩跟一起共事的夥伴們，當這場音樂會結束時，希望大家都能記得這場音樂會一起經歷的所有事情，然後好好的，認真的，去改變你們的人生。
            </p>
            <p>
              「當你很努力做一件事的時候，世界正因為你的努力悄悄的變化，即使變化很小，也不要放棄任何〝可以變成更好〞的機會，不只音樂，所有事都是。」
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
