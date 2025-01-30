import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.foursquare.com/v3/places/',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_FSQ_API,
  }
})

export const PLACE_CATEGORY = {
  restaurant: '4d4b7105d754a06374d81259',
} as const

type PlaceCategoryValues = typeof PLACE_CATEGORY[keyof typeof PLACE_CATEGORY]

type Place = {
  fsq_id: string;
  name: string;
  geocodes: {
    main: {
      latitude: number,
      longitude: number,
    }
  };
  location: {
    formatted_address: string;
  };
}

export interface searchPlacesParams {
  query?: string;
  ll?: string;
  radius?: number;
  categories?: PlaceCategoryValues;
  limit?: number;
}

export const searchPlaces = async (params: searchPlacesParams) => {
  const res = await client.get<{ results: Place[]}>('/search', {
    params: {
      ...params,
      fields: 'fsq_id,name,geocodes,location',
    },
  })
  return res.data.results
}