import { Col, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListIcons from "src/components/ListIcons"
import SpinCustom from "src/components/SpinCustom"
import Router from "src/routers"
import BookingService from "src/services/BookingService"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { ServiceItemStyled } from "src/pages/ANONYMOUS/BarberDetail/styled"
import { formatMoney } from "src/lib/stringUtils"
import { convertMinuteToHour } from "src/lib/dateUtils"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import { toast } from "react-toastify"
import socket from "src/socket"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SendFeedback from "./components/SendFeedback"
import ViewBookingDetail from "./components/ViewBookingDetail"
import InsertUpdateBooking from "src/pages/ANONYMOUS/BarberDetail/components/InsertUpdateBooking"

const BookingDetail = () => {

  const { BookingID } = useParams()
  const [booking, setBooking] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, listSystemKey } = useSelector(globalSelector)
  const bookingStatus = getListComboKey(SYSTEM_KEY.BOOKING_STATUS, listSystemKey)
  const [openViewBookingDetail, setOpenViewBookingDetail] = useState(false)
  const [openSendFeedback, setOpenSendFeedback] = useState(false)
  const [openUpdateBooking, setOpenUpdateBooking] = useState(false)

  const getDetailBooking = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getDetailBooking(BookingID)
      if (!!res?.isError) return navigate(Router.NOT_FOUND)
      setBooking(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const changeBookingStatus = async (body, Receiver) => {
    try {
      setLoading(true)
      const res = await BookingService.changeBookingStatus(body)
      if (!!res?.isError) return
      getDetailBooking()
      toast.success(res?.msg)
      socket.emit("change-bookingstatus", {
        ...res?.data,
        Receiver: Receiver
      })
    } finally {
      setLoading(false)
    }
  }

  const listBtn = [
    {
      title: "Xem chi tiết",
      isView: true,
      isDisabled: false,
      icon: ListIcons?.ICON_VIEW,
      onClick: () => setOpenViewBookingDetail(booking)
    },
    {
      title: "Chỉnh sửa",
      isView: booking?.ButtonShow?.IsUpdate,
      isDisabled: booking?.ButtonDisabled?.IsUpdate,
      icon: ListIcons?.ICON_EDIT,
      onClick: () => setOpenUpdateBooking({
        _id: booking?._id,
        Services: booking?.Services,
        BarberServices: booking?.Barber?.Services,
        Schedules: booking?.Barber?.Schedules,
        BarberID: booking?.Barber?._id,
        BarberEmail: booking?.Barber?.Email,
        BarberName: booking?.Barber?.FullName,
        DateAt: booking?.DateAt,
        CustomerAddress: booking?.CustomerAddress,
        CustomerPhone: booking?.CustomerPhone
      })
    },
    {
      title: "Duyệt",
      isView: booking?.ButtonShow?.IsConfirm,
      isDisabled: booking?.ButtonDisabled?.IsConfirm,
      icon: ListIcons?.ICON_CONFIRM,
      onClick: () => {
        ConfirmModal({
          description: `Bạn có chắc chắn duyệt booking này không?`,
          onOk: close => {
            changeBookingStatus(
              {
                BookingID: booking?._id,
                BookingStatus: 2,
                CustomerName: booking?.Customer?.FullName,
                CustomerEmail: booking?.Customer?.Email,
                BarberName: booking?.Barber?.FullName,
                BarberEmail: booking?.Barber?.Email,
              },
              user?.RoleID === Roles.ROLE_BARBER
                ? booking?.Customer?._id
                : booking?.Barber?._id
            )
            close()
          }
        })
      }
    },
    {
      title: "Thanh toán",
      isView: booking?.ButtonShow?.IsPayment,
      isDisabled: booking?.ButtonDisabled?.IsPayment,
      icon: ListIcons?.ICON_PAYMENT_BOOKING,
      onClick: () => navigate(`${Router.CHECKOUT}/${booking?._id}`)
    },
    {
      title: "Hủy",
      isView: booking?.ButtonShow?.IsReject,
      isDisabled: booking?.ButtonDisabled?.IsReject,
      icon: ListIcons?.ICON_CLOSE,
      onClick: () => {
        ConfirmModal({
          description: `Bạn có chắc chắn hủy booking này không?`,
          onOk: close => {
            changeBookingStatus(
              {
                BookingID: booking?._id,
                BookingStatus: 3,
                CustomerName: booking?.Customer?.FullName,
                CustomerEmail: booking?.Customer?.Email,
                BarberName: booking?.Barber?.FullName,
                BarberEmail: booking?.Barber?.Email,
              },
              user?.RoleID === Roles.ROLE_BARBER
                ? booking?.Customer?._id
                : booking?.Barber?._id
            )
            close()
          }
        })
      }
    },
    {
      title: "Hoàn thành",
      isView: booking?.ButtonShow?.IsComplete,
      isDisabled: booking?.ButtonDisabled?.IsComplete,
      icon: ListIcons?.ICON_DONE,
      onClick: () => {
        changeBookingStatus(
          {
            BookingID: booking?._id,
            BookingStatus: 5,
            CustomerName: booking?.Customer?.FullName,
            CustomerEmail: booking?.Customer?.Email,
            BarberName: booking?.Barber?.FullName,
            BarberEmail: booking?.Barber?.Email,
          },
          user?.RoleID === Roles.ROLE_BARBER
            ? booking?.Customer?._id
            : booking?.Barber?._id
        )
      }
    },
    {
      title: "Đánh giá",
      isView: booking?.ButtonShow?.IsFeedback,
      isDisabled: booking?.ButtonDisabled?.IsFeedback,
      icon: ListIcons?.ICON_REVIEW,
      onClick: () => setOpenSendFeedback(booking?.Barber?._id)
    }
  ]

  useEffect(() => {
    getDetailBooking()
  }, [])

  useEffect(() => {
    socket.on("listen-change-bookingstatus", data => {
      setBooking(data)
    })
  }, [])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[0, 16]} className="pl-20 pr-20">
        <Col span={24} className="d-flex-start">
          <div
            className="mt-6 fs-22 mr-5 cursor-pointer"
            onClick={() => navigate(Router.CAC_LICH_HEN)}
          >
            {ListIcons.ICON_BACK}
          </div>
          <div className="fs-25 fw-600 gray-text">{dayjs(booking?.DateAt).format("DD/MM/YYYY HH:mm")}</div>
        </Col>
        <Col span={24} className="d-flex-center">
          <Tag
            color={["warning", "success", "error", "processing", "success"][booking?.BookingStatus - 1]}
            className="p-5 fs-15 mb-12"
          >
            {bookingStatus?.find(b => b?.ParentID === booking?.BookingStatus)?.ParentName}
          </Tag>
        </Col>
        <Col span={24}>
          <div
            style={{ height: "200px" }}
          >
            <iframe
              width="100%"
              height="200"
              src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(booking?.CustomerAddress)}+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
            >
              <a href="https://www.gps.ie/collections/drones/">drone quadcopter</a>
            </iframe>
          </div>
        </Col>
        <Col span={24} className="mb-30">
          {
            booking?.Services?.map(i =>
              <ServiceItemStyled key={i?._id} className="d-flex-sb mb-12">
                <div>{i?.ServiceName}</div>
                <div className="d-flex-sb">
                  <div>
                    <div className="mr-12 fw-600">{formatMoney(i?.ServicePrice)} VNĐ</div>
                    <div className="fs-13 gray-text">{convertMinuteToHour(i?.ServiceTime)}</div>
                  </div>
                </div>
              </ServiceItemStyled>
            )
          }
        </Col>
        <Col span={24}>
          <Space className="d-flex-center">
            {
              listBtn?.map((i, idx) =>
                !!i?.isView &&
                <ButtonCustom
                  className="submit-btn third"
                  key={idx}
                  icon={i?.icon}
                  disabled={i?.isDisabled}
                  onClick={i?.onClick}
                >
                  {i?.title}
                </ButtonCustom>
              )
            }
          </Space>
        </Col>

        {
          !!openViewBookingDetail &&
          <ViewBookingDetail
            open={openViewBookingDetail}
            onCancel={() => setOpenViewBookingDetail(false)}
          />
        }

        {
          !!openSendFeedback &&
          <SendFeedback
            open={openSendFeedback}
            onCancel={() => setOpenSendFeedback(false)}
            onOk={getDetailBooking}
          />
        }

        {
          !!openUpdateBooking &&
          <InsertUpdateBooking
            open={openUpdateBooking}
            onCancel={() => setOpenUpdateBooking(false)}
          />
        }

      </Row>
    </SpinCustom >
  )
}

export default BookingDetail