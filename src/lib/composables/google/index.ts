import { reactive } from 'vue'
import { useScriptTag, useSessionStorage, StorageSerializers } from '@vueuse/core'

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_KEY
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

type SheetName = {
  staff: string
  runDown: string
  specialIntro: string
  instrument: string
}

interface SheetStaff {
  上台: 'TRUE' | ''
  名稱: string
  樂器: string
  屆數: number
}

interface SheetInstrument {
  id: string
  group: string
  樂器: string
  instrument: string
}

interface SheetStaffWithInstrument extends SheetStaff {
  instrumentGroup: number
  instrumentId: number
}

const sheet: SheetName = {
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

  useScriptTag(
    'https://apis.google.com/js/api.js',
    () => {
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
    },
    {
      defer: true
    }
  )

  useScriptTag(
    'https://accounts.google.com/gsi/client',
    () => {
      window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: () => {}
      })
      gisLoadStates.hasLoaded = true
    },
    {
      defer: true
    }
  )

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
      }).reduce((all: any, sheetData: any) => {
        const keysOfSheet = Object.keys(sheet) as Array<keyof SheetName>
        const engName =
          keysOfSheet.find((key) => sheet[key] === sheetData.sheetName) || sheetData.sheetName
        all[engName] = sheetData.table
        return all
      }, {})

      formattedData.staff = formattedData.staff
        .map((person: SheetStaff): SheetStaffWithInstrument => {
          const { group, id } = formattedData.instrument.find(
            (instrument: SheetInstrument) => instrument.instrument === person['樂器']
          )

          return {
            ...person,
            instrumentGroup: Number(group),
            instrumentId: Number(id)
          }
        })
        .sort((a: SheetStaffWithInstrument, b: SheetStaffWithInstrument) => {
          if (a.instrumentGroup !== b.instrumentGroup) return a.instrumentGroup - b.instrumentGroup
          if (a.instrumentId !== b.instrumentId) return a.instrumentId - b.instrumentId
          if (a['屆數'] === 0 || a['屆數'] === undefined) return 1
          if (b['屆數'] === 0 || b['屆數'] === undefined) return -1
          return a['屆數'] - b['屆數']
        })
        .reduce((all: SheetStaffWithInstrument[][], person: SheetStaffWithInstrument) => {
          if (all[person.instrumentId] === undefined) all[person.instrumentId] = []
          all[person.instrumentId].push(person)
          return all
        }, [])
        .filter((item: any) => item !== undefined)

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
    const sheetData = {
      sheetName,
      table: body.map((row) => {
        return row.reduce((rowObject: any, columnValue, columnIndex) => {
          rowObject[head[columnIndex]] = columnValue
          return rowObject
        }, {})
      })
    }
    if (sheetName === sheet.staff) {
      sheetData.table = sheetData.table
        .filter((item) => item['上台'] === 'TRUE' && item['名稱'] && item['樂器'])
        .map((item) => {
          if (item['屆數'] === undefined) return item
          item['屆數'] = Number(item['屆數'])
          return item
        })
    }

    if (sheetName === sheet.runDown) {
      sheetData.table = sheetData.table
        .filter((item) => item['公開活動'] === 'TRUE')
        .sort((a, b) => a['順序'] - b['順序'])
    }

    if (sheetName === sheet.specialIntro) {
      sheetData.table = sheetData.table.map((row) => {
        return {
          ...row,
          介紹: row['介紹']?.split('\n') || []
        }
      })
    }

    if (sheetName === sheet.instrument) {
      sheetData.table = sheetData.table.sort((a, b) => {
        if (a['group'] === b['group']) return a.id - b.id
        return a['group'] - b['group']
      })
    }

    return sheetData
  }
  return { fetchAllSheets, sheet }
}
