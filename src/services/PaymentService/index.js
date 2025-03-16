import http from "../index"
import {
  apiCreatePayment,
  apiGetListPayment,
  apiGetListPaymentByUser,
} from "./urls"

const createPayment = body => http.post(apiCreatePayment, body)
const getListPayment = () => http.get(apiGetListPayment)
const getListPaymenttByUser = () => http.get(apiGetListPaymentByUser)

const PaymentService = {
  createPayment,
  getListPayment,
  getListPaymenttByUser
}

export default PaymentService
