import http from "../index"
import {
  apiChangeBookingPaidStatus,
  apiChangeBookingStatus,
  apiCreateBooking,
  apiGetBookingScheduleOfBarber,
  apiGetDetailBooking,
  apiGetListMyBooking,
  apiUpdateBooking
} from "./urls"

const createBooking = body => http.post(apiCreateBooking, body)
const getListMyBooking = body => http.post(apiGetListMyBooking, body)
const changeBookingStatus = body => http.post(apiChangeBookingStatus, body)
const changeBookingPaidStatus = body => http.post(apiChangeBookingPaidStatus, body)
const getDetailBooking = BookingID => http.get(`${apiGetDetailBooking}/${BookingID}`)
const updateBooking = body => http.post(apiUpdateBooking, body)
const getBookingScheduleOfBarber = BarberID => http.get(`${apiGetBookingScheduleOfBarber}/${BarberID}`)

const BookingService = {
  createBooking,
  getListMyBooking,
  changeBookingStatus,
  changeBookingPaidStatus,
  getDetailBooking,
  updateBooking,
  getBookingScheduleOfBarber
}

export default BookingService
