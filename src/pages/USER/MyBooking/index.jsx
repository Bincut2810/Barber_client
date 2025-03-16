import { Col, Empty, Row, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import BookingService from "src/services/BookingService"
import socket from "src/socket"
import { BookingItemStyled } from "./styled"
import dayjs from "dayjs"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import InsertUpdateBooking from "src/pages/ANONYMOUS/BarberDetail/components/InsertUpdateBooking"

const MyBooking = () => {

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, listSystemKey } = useSelector(globalSelector)
  const bookingStatus = getListComboKey(SYSTEM_KEY.BOOKING_STATUS, listSystemKey)
  const navigate = useNavigate()
  const [openInsertBooking, setOpenInsertBooking] = useState(false)

  const getListMyBooking = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getListMyBooking()
      if (!!res?.isError) return
      setBookings(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListMyBooking()
  }, [])

  useEffect(() => {
    socket.on("listen-change-bookingstatus", data => {
      setBookings(pre => {
        const copyBookings = [...pre]
        const index = copyBookings?.findIndex((i) => i?._id === data?._id)
        if (index !== -1) {
          copyBookings.splice(index, 1, data)
        } else {
          copyBookings.push(data)
        }
        return copyBookings
      })
    })
  }, [])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[0, 16]}>
        <Col span={24} className="d-flex-sb">
          <div className="title-type-2">
            Các lịch hẹn
          </div>
        </Col>
        <Col span={24}>
          {
            !!bookings?.length ?
              bookings?.map(i =>
                <BookingItemStyled
                  key={i?._id}
                  onClick={() => navigate(`${Router.CAC_LICH_HEN}/${i?._id}`)}
                >
                  <Row>
                    <Col span={18}>
                      <Tag
                        color={["warning", "success", "error", "processing", "success"][i?.BookingStatus - 1]}
                        className="p-3 fs-12 mb-12"
                      >
                        {bookingStatus?.find(b => b?.ParentID === i?.BookingStatus)?.ParentName}
                      </Tag>
                      <div className="mb-8">
                        <div className="fs-17 fw-600">{i?.Services[0]?.ServiceName}</div>
                        <div className="fs-11 gray-text">Xem thêm</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          src={i?.[user?.RoleID === Roles?.ROLE_BARBER ? "Customer" : "Barber"]?.AvatarPath}
                          style={{
                            width: '25px',
                            height: "25px",
                            borderRadius: "50%",
                            marginRight: "8px"
                          }}
                        />
                        <div className="fs-14">{i?.[user?.RoleID === Roles?.ROLE_BARBER ? "Customer" : "Barber"]?.FullName}</div>
                      </div>
                    </Col>
                    <Col span={6} className="d-flex-center date">
                      <div className="center-text">
                        <div className="mb-8">
                          <span>Ngày </span>
                          <span className="fs-16 fw-600">{dayjs(i?.DateAt).format("DD")}</span>
                        </div>
                        <div className="mb-8">
                          <span>Tháng </span>
                          <span className="fs-16 fw-600">{dayjs(i?.DateAt).format("MM")}</span>
                        </div>
                        <div>
                          <span>Thời gian </span>
                          <span className="fs-16 fw-600">{dayjs(i?.DateAt).format("HH:mm")}</span>
                        </div>
                      </div>
                    </Col>
                    {
                      !!i?.IsBookAgain &&
                      <Col span={6} className="mt-12">
                        <ButtonCustom
                          className="primary submit-btn"
                          onClick={e => {
                            e.stopPropagation()
                            setOpenInsertBooking({
                              Services: i?.Services,
                              BarberServices: i?.Barber?.Services,
                              Schedules: i?.Barber?.Schedules,
                              BarberID: i?.Barber?._id,
                              BarberEmail: i?.Barber?.Email,
                              BarberName: i?.Barber?.FullName,
                              CustomerAddress: i?.CustomerAddress,
                              CustomerPhone: i?.CustomerPhone,
                              IsMyBookingPage: true
                            })
                          }}
                        >
                          Book lại
                        </ButtonCustom>
                      </Col>
                    }
                  </Row>
                </BookingItemStyled>
              )
              : <Empty description="Chưa có dữ liệu" />
          }
        </Col>

        {
          !!openInsertBooking &&
          <InsertUpdateBooking
            open={openInsertBooking}
            onCancel={() => setOpenInsertBooking(false)}
            onOk={getListMyBooking}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default MyBooking