import http from "../index"
import { apiCreateBooking, apiGetListMyBooking } from "./urls"

const createBooking = body => http.post(apiCreateBooking, body)
const getListMyBooking = body => http.post(apiGetListMyBooking, body)

const BookingService = {
  createBooking,
  getListMyBooking
}

export default BookingService
