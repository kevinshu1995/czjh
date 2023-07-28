import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNav = defineStore('nav', () => {
  const sections = ref([
    {
      text: '演出人員',
      hash: 'intro'
    },
    {
      text: '曲目介紹',
      hash: 'repertoire'
    },
    {
      text: '關於我們',
      hash: 'about'
    }
  ])

  const getSection = (hash: string) =>
    sections.value.find((section) => section.hash === hash) || {
      hash: '',
      text: ''
    }

  const navHeight = ref(68)

  return { sections, getSection, navHeight }
})
