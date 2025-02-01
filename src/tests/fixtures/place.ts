import type { Place } from '@/services/fsqApi'

export const genPlace = (data?: Partial<Place>): Place => {
  return {
    fsq_id: '50a5930d067da53a72f0797e',
    name: 'sansa',
    geocodes: {
      main: {
        latitude: 35.669257,
        longitude: 139.738533,
      },
    },
    location: {
      formatted_address:
        '赤坂2丁目20-19 (赤坂菅井ビル 1F), 港区, 東京都, 107-0052',
    },
    photos: [
      {
        id: '672c419773c05d16e00fb615',
        prefix: 'https://fastly.4sqi.net/img/general/',
        suffix: '/12162880_lEMZruVOTGv_2wtibpaKivJbkQV5Gu4D3JBDmTey85w.jpg',
      },
      {
        id: '67108aa78a2ae8069dccddc2',
        prefix: 'https://fastly.4sqi.net/img/general/',
        suffix: '/12162880_Ppaz4nWyi_mgBLHdIcka-CD0EmO8y2dIX52MMBGhg6M.jpg',
      },
      {
        id: '67024ee43710f8389ba7280f',
        prefix: 'https://fastly.4sqi.net/img/general/',
        suffix: '/14666723_LpFIg8BIZt2eNBWmUHjhTOiTk9LMDKR6pEVgZ1dmhr8.jpg',
      },
    ],
    ...data,
  }
}
