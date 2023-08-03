<script setup lang="ts">
import IconFacebook from '/src/components/icon/IconFacebook.vue'
import IconInstagram from '/src/components/icon/IconInstagram.vue'
</script>

<template>
  <div class="pb-24 space-y-8 text-gray-200">
    <div data-aos="fade-left">
      <img src="/people.jpg" class="w-full" alt="" />
    </div>
    <div class="w-2/3" data-aos="fade-left">
      <img src="/CZJH-logo_rectangle-logo-light.svg" alt="" />
    </div>
    <div data-aos="fade-left">
      <p>十年歲月的琢磨、精進、執著，追尋到的是那種努力過後得來的甘甜！</p>
      <p>無論未來會遇到什麼樣的困難，誠正校友管樂團永遠是你的家。</p>
      <p>這裡有許多厲害的人，這裡有許多溫暖的人，</p>
      <p>希望未來的日子，都能一起走下去！</p>
      <p></p>
    </div>
    <div class="flex flex-col border-l border-white pl-4 text-lg space-y-2" data-aos="fade-left">
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
