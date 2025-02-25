import axios from "axios"
import http from "../index"
import {
  apiCheckAuth,
  apiGetDetailProfile,
  apiGetInforByGoogleLogin,
  apiGetListUser,
  apiLogin,
  apiLogout,
  apiRegister,
  apiChangeProfile,
  apiResponseRequestRegister,
  apiUpdateSchedule,
  apiUpdateService,
  apiGetListBarber,
  apiGetDetailBarber,
  apiRequestConfirmRegister
} from "./urls"

const getInforByGoogleLogin = (access_token) => axios.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const register = body => http.post(apiRegister, body)
const login = body => http.post(apiLogin, body)
const checkAuth = () => http.get(apiCheckAuth)
const logout = () => http.get(apiLogout)
const getDetailProfile = () => http.get(apiGetDetailProfile)
const changeProfile = body => http.post(apiChangeProfile, body)
const getListUser = body => http.post(apiGetListUser, body)
const requestConfirmRegister = () => http.get(apiRequestConfirmRegister)
const responseRequestRegister = body => http.post(apiResponseRequestRegister, body)
const updateSchedule = body => http.post(apiUpdateSchedule, body)
const updateService = body => http.post(apiUpdateService, body)
const getListBarber = body => http.post(apiGetListBarber, body)
const getDetailBarber = BarberID => http.get(`${apiGetDetailBarber}/${BarberID}`)

const UserService = {
  getInforByGoogleLogin,
  register,
  login,
  checkAuth,
  logout,
  getDetailProfile,
  changeProfile,
  getListUser,
  requestConfirmRegister,
  responseRequestRegister,
  updateSchedule,
  updateService,
  getListBarber,
  getDetailBarber
}

export default UserService
