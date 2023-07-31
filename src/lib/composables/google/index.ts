import { reactive } from 'vue'
import { useScriptTag, useSessionStorage, StorageSerializers } from '@vueuse/core'

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_KEY
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

const sheet = {
  staff: '演出人員',
  runDown: '流程',
  specialIntro: '介紹',
  instrument: '樂器'
}

const SHEET_NAMES: string[] = [sheet.staff, sheet.runDown, sheet.specialIntro, sheet.instrument]

function useLoadGoogle() {
  const gapiLoadStates = reactive({
    hasLoaded: false,
    hasError: false
  })
  const gisLoadStates = reactive({
    hasLoaded: false
  })

  useScriptTag('https://apis.google.com/js/api.js', () => {
    window.gapi.load('client', {
      async callback() {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS
        })
        gapiLoadStates.hasLoaded = true
        gapiLoadStates.hasError = false
      },
      onerror() {
        gapiLoadStates.hasLoaded = true
        gapiLoadStates.hasError = true
        console.error('gapi load error')
      },
      timeout: 5000,
      ontimeout() {
        gapiLoadStates.hasLoaded = true
        gapiLoadStates.hasError = true
        console.error('gapi load timeout')
      }
    })
  })

  useScriptTag('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {}
    })
    gisLoadStates.hasLoaded = true
  })

  function waitGoogleLoaded() {
    return new Promise((resolve, reject) => {
      function wait(time = 0) {
        const eachCycleTime = 50
        const timeout = 10000
        if (time > timeout) {
          reject('google api load timeout')
        }
        if (gapiLoadStates.hasLoaded && gisLoadStates.hasLoaded) {
          resolve(!gapiLoadStates.hasError)
        }
        window.setTimeout(() => wait(time + eachCycleTime), eachCycleTime)
      }
      wait()
    })
  }

  return { waitGoogleLoaded }
}

export default function useGoogle() {
  const { waitGoogleLoaded } = useLoadGoogle()

  const storageOfFetchAllSheets = useSessionStorage('fetchAllSheets', null, {
    serializer: StorageSerializers.object,
    shallow: true
  })

  const setFetchAllSheets = (data: any) => {
    storageOfFetchAllSheets.value = {
      data,
      updateAt: new Date().getTime()
    }
  }

  const getFetchAllSheets = () => {
    const now = new Date().getTime()
    const cacheTime = 1000 * 60 * 1 // 10 min
    const cachedData = storageOfFetchAllSheets.value
    const needUpdate = cachedData === null || now - cachedData.updateAt > cacheTime

    return {
      needUpdate,
      ...storageOfFetchAllSheets.value
    }
  }

  async function fetchAllSheets() {
    try {
      // check cache
      const { needUpdate, data } = getFetchAllSheets()
      if (needUpdate === false) {
        console.info('[fetchAllSheets] use Cache')
        // return cached data
        return {
          data,
          error: null
        }
      }

      const isLoaded = await waitGoogleLoaded()
      if (isLoaded === false) throw new Error('google api load failed')

      // fetch data
      console.info('[fetchAllSheets] use Fetch')
      const response = await gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: SPREADSHEET_ID,
        ranges: SHEET_NAMES
      })

      const formattedData = SHEET_NAMES.map((sheetName: string, index: number) => {
        return formatSheetData(sheetName, response?.result?.valueRanges?.[index]?.values || [])
      })

      // cache data
      setFetchAllSheets(formattedData)

      return {
        data: formattedData,
        error: null
      }
    } catch (error) {
      console.error(error)
      return { data: null, error }
    }
  }

  function formatSheetData(sheetName: string, data: string[][]) {
    const [head, comment, ...body] = data
    return {
      sheetName,
      table: body.map((row) => {
        return row.reduce((rowObject: any, columnValue, columnIndex) => {
          rowObject[head[columnIndex]] = columnValue
          return rowObject
        }, {})
      })
    }
  }

  return { fetchAllSheets }
}
