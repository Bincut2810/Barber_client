import http from "../index"
import {
  apiCreatePayment,
  apiGetListPayment,
} from "./urls"

const createPayment = body => http.post(apiCreatePayment, body)
const getListPayment = () => http.get(apiGetListPayment)

const PaymentService = {
  createPayment,
  getListPayment,
}

export default PaymentService
