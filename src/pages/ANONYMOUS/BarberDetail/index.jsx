import { Col, Image, Rate, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ListIcons from "src/components/ListIcons"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import { formatMoney } from "src/lib/stringUtils"
import Router from "src/routers"
import UserService from "src/services/UserService"
import { DivTimeContainer, PatentChildBorder, ServiceItemStyled, TabStyled } from "./styled"
import { convertMinuteToHour, convertSchedules } from "src/lib/dateUtils"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import globalSlice from "src/redux/globalSlice"
import FeedbackService from "src/services/FeedbackService"
import { toast } from "react-toastify"
import Feedback from "./components/Feedback"
import { Roles } from "src/lib/constant"
import InsertUpdateBooking from "./components/InsertUpdateBooking"

const BarberDetail = () => {

  const { BarberID } = useParams()
  const [loading, setLoading] = useState(false)
  const [barber, setBarber] = useState()
  const navigate = useNavigate()
  const [openInsertBooking, setOpenInsertBooking] = useState(false)
  const { isLogin, user } = useSelector(globalSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const [feedbacks, setFeedbacks] = useState([])
  const [totalFeedback, setTotalFeedback] = useState(0)

  const getDetailBarber = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailBarber(BarberID)
      if (!!res?.isError) return navigate(Router.NOT_FOUND)
      setBarber(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getListFeedback = async () => {
    try {
      setLoading(true)
      const res = await FeedbackService.getListFeedbackOfBarber({
        PageSize: 10,
        CurrentPage: 1,
        BarberID
      })
      if (!!res?.isError) return toast.error(res?.msg)
      setFeedbacks(res?.data?.List)
      setTotalFeedback(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const itemTab = !!barber?.Schedules?.length
    ? convertSchedules(barber?.Schedules)?.map(i => (
      {
        key: i?.DateAt,
        label: i?.DateAt,
        children: (
          <PatentChildBorder>
            <Row gutter={[16, 16]} className="d-flex p-12">
              {i?.Times?.map((item, index) =>
                <Col span={12} key={index}>
                  <DivTimeContainer>
                    {dayjs(item?.StartTime).format("HH:mm")} - {dayjs(item?.EndTime).format("HH:mm")}
                  </DivTimeContainer>
                </Col>
              )}
            </Row>
          </PatentChildBorder>
        )
      }
    ))
    : []

  useEffect(() => {
    getDetailBarber()
  }, [])

  useEffect(() => {
    if (!!barber?._id) {
      getListFeedback()
    }
  }, [barber])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[70]}>
        <Col span={15}>
          <Row>
            <Col span={24} className="mb-20">
              <div>
                <img
                  src={barber?.AvatarPath}
                  alt=""
                  style={{
                    width: "400px",
                    height: "400px"
                  }}
                />
              </div>
            </Col>
            <Col span={24} className="mb-30">
              <div className="fs-32 fw-600 mb-6">{barber?.FullName}</div>
              <div className="fs-14 gray-text">{barber?.Address}</div>
            </Col>
            <Col span={24}>
              <div className="fs-32 fw-600 mb-6">Dịch vụ</div>
            </Col>
            <Col span={24} className="mb-30">
              {
                barber?.Services?.map(i =>
                  <ServiceItemStyled key={i?._id} className="d-flex-sb mb-12">
                    <div>{i?.ServiceName}</div>
                    <div className="d-flex-sb">
                      <div>
                        <div className="mr-12 fw-600">{formatMoney(i?.ServicePrice)} VNĐ</div>
                        <div className="fs-13 gray-text">{convertMinuteToHour(i?.ServiceTime)}</div>
                      </div>
                      {
                        (!isLogin || (!!isLogin && user?.RoleID !== Roles.ROLE_BARBER)) &&
                        <ButtonCustom
                          className="primary mini-size"
                          onClick={() => {
                            if (!isLogin) {
                              dispatch(globalSlice.actions.setRouterBeforeLogin(location.pathname))
                              navigate("/dang-nhap")
                            } else {
                              setOpenInsertBooking({
                                Services: [i],
                                BarberServices: barber?.Services,
                                Schedules: barber?.Schedules,
                                BarberID: barber?._id,
                                BarberEmail: barber?.Email,
                                BarberName: barber?.FullName,
                              })
                            }
                          }}
                        >
                          Book
                        </ButtonCustom>
                      }
                    </div>
                  </ServiceItemStyled>
                )
              }
            </Col>
            {
              !!barber?.Results?.length &&
              <Col span={24}>
                <div className="fs-17 fw-700  mb-12">Mẫu tóc mà barber đã thực hiện</div>
                <Row gutter={[8]}>
                  {
                    barber?.Results?.map((i, idx) =>
                      <Col span={6} key={idx}>
                        <Image src={i} style={{ width: "180px", height: '150px' }} />
                      </Col>
                    )
                  }
                </Row>
              </Col>
            }
            {
              !!feedbacks?.length &&
              <Col span={24}>
                <div className="d-flex-sb mb-12">
                  <p className="fs-17 fw-700">Đánh giá của khách hàng</p>
                  <div>
                    <div className="d-flex-center mb-4">
                      <div>
                        <span className="fs-32 fw-600">{barber?.TotalStars / barber?.Stars?.length}</span>
                        <span>/5</span>
                      </div>
                    </div>
                    <Rate
                      value={barber?.TotalStars / barber?.Stars?.length}
                      disabled
                    />
                    <div className="d-flex-center gray-text fs-13">Dựa trên {feedbacks?.length} đánh giá</div>
                  </div>
                </div>
                <Feedback feedbacks={feedbacks} />
              </Col>
            }
          </Row>
        </Col>
        <Col span={9}>
          <Row>
            <Col span={24} className="mb-10">
              <div
                style={{ height: "300px" }}
              >
                <iframe
                  width="100%"
                  height="300"
                  src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(barber?.Address)}+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                >
                  <a href="https://www.gps.ie/collections/drones/">drone quadcopter</a>
                </iframe>
              </div>
            </Col>
            <Col span={24} className="mb-10">
              <ServiceItemStyled className="d-flex align-items-center">
                <div className="fs-20 mr-4 fs-16">{ListIcons.ICON_PHONE}</div>
                <div className="fs-16">{barber?.Phone}</div>
              </ServiceItemStyled>
            </Col>
            <Col span={24} className="mb-20">
              <ServiceItemStyled>
                <div className="fw-600 fs-16 mb-8">Kinh nghiệm</div>
                <div>{barber?.Experiences}</div>
              </ServiceItemStyled>
            </Col>
            <Col span={24}>
              <div>
                <div className="fw-600 fs-16 mb-8">Thời gian làm việc</div>
                <TabStyled>
                  <Tabs
                    type="card"
                    items={itemTab}
                    size="small"
                    animated={{
                      tabPane: true,
                    }}
                  />
                </TabStyled>
              </div>
            </Col>
          </Row>
        </Col>

        {
          !!openInsertBooking &&
          <InsertUpdateBooking
            open={openInsertBooking}
            onCancel={() => setOpenInsertBooking(false)}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default BarberDetail