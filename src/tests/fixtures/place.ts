import type { Place, PlaceDetail } from '@/services/fsqApi'

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

export const genPlaceDetail = (data?: Partial<PlaceDetail>): PlaceDetail => {
  return {
    ...genPlace(),
    menu: 'http://www.tonkatsu-masamune.com/menu.html',
    rating: 8.4,
    tel: '03-3505-3505',
    tips: [
      {
        created_at: '2020-06-28T09:02:43.000Z',
        text: 'ずっと気になっていた、限定部位のヒレカツ(ヘッド)定食(1380円)をいただきました。何ともジューシーで柔らかくボリューミーで、これまでにないトンカツ体験を楽しみました。大大大満足❗️',
      },
      {
        created_at: '2020-04-26T00:19:26.000Z',
        text: 'この店に夜カツカレー食いに2回行ったとこがあるけど、2回ともSonny Rollins の Saxophone Colossus がかかってた。店主のお気に入りなのか？',
      },
      {
        created_at: '2019-06-05T10:11:37.000Z',
        text: 'The Tonkatsu was amazing! Miso soup also very good!',
      },
      {
        created_at: '2019-03-15T06:23:35.000Z',
        text: 'Just salt. No sauce needed at this place. The tonkatsu is so delicate it’s almost like eating good tempura.',
      },
      {
        created_at: '2018-07-11T10:24:05.000Z',
        text: 'ロースカツ定食をオススメします！',
      },
    ],
    website: 'http://www.tonkatsu-masamune.com',
    ...data,
  }
}
