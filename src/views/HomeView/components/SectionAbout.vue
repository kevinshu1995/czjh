<script setup lang="ts">
import IconFacebook from '/src/components/icon/IconFacebook.vue'
import IconInstagram from '/src/components/icon/IconInstagram.vue'
</script>

<template>
  <div class="pb-24 space-y-8 text-gray-800">
    <div>
      <img src="/people.jpg" class="w-full" alt="" />
    </div>
    <div class="w-2/3">
      <img src="/CZJH-logo_rectangle-logo-light.svg" alt="" />
    </div>
    <div class="space-y-4">
      <p>
        誠正國中校友管樂團至今已成立十餘年。於2010年，創團人陳權號召眾多曾在誠正管樂中奏響過青春樂章的校友以及在校生們，共同在每年夏季參與演出。
      </p>
      <p>
        於是，每年的七、八月，誠正國中團練室裡，多了一群長得不像國中生的高中生、大學生以及社會人士，用他們僅有的時間揮灑汗水、淚水以及口水，為的就是譜出這場夏日盛宴。
      </p>
      <p>
        十年流轉，團員屆數甚差二十屆次，但透過音樂的力量，讓年紀的距離在彼此的心中淡化。他們透過自由奔放的音符，在樂聲中編織出校友與學弟妹之間的共鳴，消除了跨世代交流的阻礙，讓每個樂曲添加了動人的色彩。
      </p>
    </div>
    <div class="flex flex-col border-l border-yellow11 pl-4 text-lg space-y-2">
      <a class="gap-2" target="_blank" href="https://instagram.com/czjhawb/">
        <div class="flex gap-2">
          <IconInstagram width="30" height="30" />
          <span>@czjhawb</span>
        </div>
      </a>

      <a class="gap-2" target="_blank" href="https://www.facebook.com/CZWindBand">
        <div class="flex gap-2">
          <IconFacebook width="30" height="30" />
          <span>誠正國中校友管樂團</span>
        </div>
      </a>
    </div>
  </div>
</template>
