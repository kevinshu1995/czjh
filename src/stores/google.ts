import { defineStore } from 'pinia'
import { onMounted, ref, computed } from 'vue'

import useGoogleComposable from '@/lib/composables/google'

export const useGoogle = defineStore('google', () => {
  const { fetchAllSheets, sheet: sheetEnum } = useGoogleComposable()

  const isFetching = ref(false)

  const sheetsData = ref<{
    staff: any[]
    specialIntro: any[]
    runDown: any[]
    instruments: any[]
  } | null>(null)

  const staff = computed(() => sheetsData.value?.staff ?? [])
  const specialIntro = computed(() => sheetsData.value?.specialIntro ?? [])
  const runDown = computed(() => sheetsData.value?.runDown ?? [])

  onMounted(async () => {
    isFetching.value = true
    const { data, error } = await fetchAllSheets()
    isFetching.value = false

    if (error) {
      console.log('error', error)
      return
    }

    sheetsData.value = data
    console.log({ data })
  })

  return { fetchAllSheets, isFetching, staff, specialIntro, runDown }
})
