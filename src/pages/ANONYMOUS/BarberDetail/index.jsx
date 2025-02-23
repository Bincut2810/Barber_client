import { Col, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListIcons from "src/components/ListIcons"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import { formatMoney } from "src/lib/stringUtils"
import Router from "src/routers"
import UserService from "src/services/UserService"
import { DivTimeContainer, PatentChildBorder, ServiceItemStyled, TabStyled } from "./styled"
import { convertSchedules } from "src/lib/dateUtils"
import dayjs from "dayjs"
import ModalBooking from "./components/ModalBooking"

const BarberDetail = () => {

  const { BarberID } = useParams()
  const [loading, setLoading] = useState(false)
  const [barber, setBarber] = useState()
  const navigate = useNavigate()
  const [openModalBooking, setOpenModalBooking] = useState(false)

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
            <Col span={24}>
              {
                barber?.Services?.map(i =>
                  <ServiceItemStyled key={i?._id} className="d-flex-sb mb-12">
                    <div>{i?.ServiceName}</div>
                    <div className="d-flex-sb">
                      <div className="mr-12 fw-600">{formatMoney(i?.ServicePrice)} VNĐ</div>
                      <ButtonCustom
                        className="primary mini-size"
                        onClick={() => setOpenModalBooking({
                          Service: i,
                          Services: barber?.Services,
                          Schedules: barber?.Schedules,
                          BarberID: barber?._id
                        })}
                      >
                        Book
                      </ButtonCustom>
                    </div>
                  </ServiceItemStyled>
                )
              }
            </Col>
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
          !!openModalBooking &&
          <ModalBooking
            open={openModalBooking}
            onCancel={() => setOpenModalBooking(false)}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default BarberDetail