import {
  SET_DATA
} from './types'

export const setData = (data: any) => ({
  type: SET_DATA,
  payload: data,
})