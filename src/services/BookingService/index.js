import http from "../index"
import {
  apiChangeBookingPaidStatus,
  apiChangeBookingStatus,
  apiCreateBooking,
  apiGetDetailBooking,
  apiGetListMyBooking
} from "./urls"

const createBooking = body => http.post(apiCreateBooking, body)
const getListMyBooking = body => http.post(apiGetListMyBooking, body)
const changeBookingStatus = body => http.post(apiChangeBookingStatus, body)
const changeBookingPaidStatus = body => http.post(apiChangeBookingPaidStatus, body)
const getDetailBooking = BookingID => http.get(`${apiGetDetailBooking}/${BookingID}`)

const BookingService = {
  createBooking,
  getListMyBooking,
  changeBookingStatus,
  changeBookingPaidStatus,
  getDetailBooking
}

export default BookingService
