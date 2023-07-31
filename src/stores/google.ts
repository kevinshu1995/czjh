import { defineStore } from 'pinia'
import { onMounted, ref, computed } from 'vue'

import useGoogleComposable from '@/lib/composables/google'

export const useGoogle = defineStore('google', () => {
  const { fetchAllSheets, sheet: sheetEnum } = useGoogleComposable()

  const sheetsData = ref<any[] | null>(null)

  onMounted(async () => {
    const { data, error } = await fetchAllSheets()

    if (error) {
      console.log('error', error)
      return
    }

    sheetsData.value = data
    console.log({ data })
  })

  return { fetchAllSheets }
})
