import http from "../index"
import {
  apiCreateFeedback,
  apiDeleteFeedback,
  apiGetListFeedback,
  apiGetListFeedbackOfBarber
} from "./urls"

const createFeedback = body => http.post(apiCreateFeedback, body)
const getListFeedbackOfBarber = body => http.post(apiGetListFeedbackOfBarber, body)
const deleteFeedback = FeedbackID => http.get(`${apiDeleteFeedback}/${FeedbackID}`)
const getListFeedback = body => http.post(apiGetListFeedback, body)

const FeedbackService = {
  createFeedback,
  getListFeedbackOfBarber,
  deleteFeedback,
  getListFeedback
}

export default FeedbackService
