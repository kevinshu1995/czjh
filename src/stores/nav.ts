import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNav = defineStore('nav', () => {
  const sections = ref([
    {
      text: '介紹',
      hash: 'intro'
    },
    {
      text: '曲目',
      hash: 'repertoire'
    },
    {
      text: '關於',
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
