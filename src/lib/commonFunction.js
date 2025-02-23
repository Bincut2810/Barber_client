import globalSlice from "src/redux/globalSlice"
import Router from "src/routers"
import UserService from "src/services/UserService"
// import socket from "src/utils/socket"

export const randomNumber = () => {
  const min = 100000
  const max = 999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const getListComboKey = (key, listSystemKey) => {
  const parent = listSystemKey?.find(i => i?.KeyName === key)
  if (!!parent)
    return parent?.Parents
  return []
}

export const handleLogout = async (dispatch, navigate) => {
  const res = await UserService.logout()
  if (!!res?.isError) return
  // socket.disconnect()
  dispatch(globalSlice.actions.setIsLogin(false))
  dispatch(globalSlice.actions.setIsCheckAuth(false))
  dispatch(globalSlice.actions.setUser({}))
  navigate(Router.DANG_NHAP)
}

export const getTotalVote = (votes) => {
  const total = votes?.reduce(
    (value, currentValue) => value + currentValue,
    0
  )
  return total
}
