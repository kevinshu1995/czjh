import { defineStore } from 'pinia'
import { onMounted, ref, computed } from 'vue'

import useGoogleComposable from '@/lib/composables/google'

export const useGoogle = defineStore('google', () => {
  const { fetchAllSheets } = useGoogleComposable()

  const sheetsData = ref<any[] | null>(null)

  const formattedSheet = computed(() => {
    if (sheetsData.value === null) {
      return {
        staff: [],
        runDown: [],
        specialIntro: []
      }
    }

    return sheetsData.value.map((sheet: { sheetName: string; table: any[] }) => {
      if (sheet.sheetName === '演出人員') {
        return sheet.table.filter((item) => item['上台'] === 'TRUE' && item['名稱'] && item['樂器'])
      }
      if (sheet.sheetName === '流程') {
        return sheet.table.filter((item) => item['公開活動'] === 'TRUE')
      }
      if (sheet.sheetName === '介紹') {
        return sheet.table
      }
    })
  })

  onMounted(async () => {
    const { data, error } = await fetchAllSheets()

    if (error) {
      console.log('error', error)
      return
    }

    sheetsData.value = data
    console.log('data', formattedSheet.value)
  })

  return { fetchAllSheets, formattedSheet }
})
