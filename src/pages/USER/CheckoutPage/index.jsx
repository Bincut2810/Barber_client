import { Col, Descriptions, Row } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"
import { formatMoney } from "src/lib/stringUtils"
import { CheckoutPageContainerStyled, CheckoutPageStyled } from "./styled"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import PaymentService from "src/services/PaymentService"
import handleCreatePaymentVNPay from "src/lib/getUrlVNPay"
import ModalSuccessBooking from "./components/ModalSuccessBooking"
import Router from "src/routers"
import BookingService from "src/services/BookingService"
import { PROFIT_PERCENT } from "src/lib/constant"

const RootURLWebsite = import.meta.env.VITE_ROOT_URL_WEBSITE

const CheckoutPage = () => {

  const { BookingID } = useParams()
  const navigate = useNavigate()
  const [dataPayment, setDataPayment] = useState()
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(globalSelector)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [openModalSuccessBooking, setOpenModalSuccessBooking] = useState(false)

  const itemServices = !!dataPayment?.Services?.length
    ? dataPayment?.Services?.map(i => ({
      key: i?._id,
      label: i?.ServiceName,
      children: `${formatMoney(i?.ServicePrice)} VNĐ`
    }))
    : []

  const getDataToCheckout = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getDetailBooking(BookingID)
      if (!!res?.isError) return navigate(Router.NOT_FOUND)
      setDataPayment(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteBooking = async () => {
    try {
      setLoading(true)
      const resBooking = await BookingService.changeBookingPaidStatus({
        BookingID,
        CustomerName: user?.FullName,
        BarberName: dataPayment?.Barber?.FullName,
        BarberEmail: dataPayment?.Barber?.Email,
      })
      if (!!resBooking?.isError) return
      const resPayment = await PaymentService.createPayment({
        Booking: BookingID,
        Description: `Thanh toán tiền cọc book barber ${dataPayment?.Barber?.FullName}`,
        TotalFee: dataPayment?.TotalPrice - dataPayment?.TotalExpensePrice,
        Percent: PROFIT_PERCENT
      })
      if (!!resPayment?.isError) return
      setOpenModalSuccessBooking({ FullName: dataPayment?.Barber?.FullName })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDataToCheckout()
  }, [BookingID])


  useEffect(() => {
    if (!!dataPayment && !dataPayment?.IsPaid) {
      if (
        !!queryParams.get("vnp_ResponseCode") &&
        queryParams.get("vnp_ResponseCode") === "00"
      ) {
        handleCompleteBooking()
      }
    }
  }, [location.search, dataPayment])


  return (
    <SpinCustom spinning={loading}>
      <CheckoutPageContainerStyled>
        <CheckoutPageStyled>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <div className="center-text primary-text fs-22 fw-700 mb-16">Thông tin thanh toán</div>
            </Col>
            <Col span={24}>
              <div>
                <span className="mr-4 fs-15 fw-600">Barber:</span>
                <span>{dataPayment?.Barber?.FullName}</span>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <div className="mb-6 fs-15 fw-600">Dịch vụ:</div>
                <Descriptions
                  items={itemServices}
                />
              </div>
            </Col>
            <Col span={24}>
              <div>
                <p className="fs-15 fw-600">Thời gian: {dayjs(dataPayment?.DateAt).format("DD/MM/YYYY HH:mm")}</p>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <span className="gray-text fs-15 fw-600 mr-4">Số tiền thanh toán:</span>
                <span className="fs-17 fw-700 primary-text">{formatMoney(dataPayment?.TotalPrice - dataPayment?.TotalExpensePrice)} VNĐ</span>
              </div>
            </Col>
            <Col span={24}>
              {
                !dataPayment?.IsPaid
                  ?
                  <ButtonCustom
                    className="medium-size primary"
                    onClick={() => handleCreatePaymentVNPay(
                      "Thanh toán tiền cọc book barber",
                      (dataPayment?.TotalPrice - dataPayment?.TotalExpensePrice) * 100,
                      `${RootURLWebsite}${location.pathname}`,
                      "1.1.1.1"
                    )}
                  >
                    Thanh toán
                  </ButtonCustom>
                  : <p className="fs-16 fw-700">Booking đã được thanh toán</p>
              }
            </Col>
          </Row>

          {
            !!openModalSuccessBooking &&
            <ModalSuccessBooking
              open={openModalSuccessBooking}
              onCancel={() => setOpenModalSuccessBooking(false)}
            />
          }

        </CheckoutPageStyled>
      </CheckoutPageContainerStyled>
    </SpinCustom >
  )
}

export default CheckoutPage