import { Promise } from 'bluebird'
import axios from 'axios'
import config from './config'

const serverAxios = axios.create({
  baseURL: config.serverUri,
})

export function setBearerToken(token:string) {
  serverAxios.defaults.headers.Authorization = `Bearer ${token}`
}

serverAxios.interceptors.request.use(onAxiosBegin, undefined)
serverAxios.interceptors.response.use(undefined, onAxiosError)

function onAxiosBegin(config: any) {
  if (!serverAxios.defaults.headers.Authorization) config.headers.Authorization = serverAxios.defaults.headers.Authorization
  return config
}

function onAxiosError(err: any) {
  if (!err.response) {
    return Promise.reject(err)
  } else if (err.response.status === 401) {
    window.location.href = '#/login'
    // auto refresh token
    // return getToken().then((res) => {
    //   setBearerToken(res.access_token)
    //   err.config.headers.Authorization = 'Bearer ' + res.access_token
    //   return axios.request(err.config)
    // })
  } else {
    return Promise.reject(err)
  }
}



export function downloadAlbum(payload: IDownloadAlbumRequest): Promise<IDownloadAlbumResponse> {
  return serverAxios.post(`/download-album`, payload)
}

export interface IDownloadAlbumRequest {
  artist: string
  album:string
  uri: string
}

export interface IDownloadAlbumResponse {

}