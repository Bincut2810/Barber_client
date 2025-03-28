import http from "../index"
import {
  apiStatisticServiceBooking,
  apiStatisticTotalAccount,
  apiStatisticTotalBooking,
  apiStatisticTotalBookingByBarber
} from "./urls"

const statisticTotalBookingByBarber = () => http.get(apiStatisticTotalBookingByBarber)
const statisticServiceBooking = body => http.post(apiStatisticServiceBooking, body)
const statisticTotalBooking = () => http.get(apiStatisticTotalBooking)
const statisticTotalAccount = () => http.get(apiStatisticTotalAccount)

const StatisticService = {
  statisticTotalBookingByBarber,
  statisticServiceBooking,
  statisticTotalBooking,
  statisticTotalAccount
}

export default StatisticService
