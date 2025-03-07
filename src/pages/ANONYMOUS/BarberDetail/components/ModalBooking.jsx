import { Col, Collapse, DatePicker, Form, Row, Space, TimePicker } from "antd"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { ServiceItemStyled } from "../styled"
import { formatMoney, getRegexPhoneNumber } from "src/lib/stringUtils"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ListIcons from "src/components/ListIcons"
import BookingService from "src/services/BookingService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Router from "src/routers"
import InputCustom from "src/components/InputCustom"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { convertMinuteToHour, disabledBeforeDate } from "src/lib/dateUtils"

const ModalBooking = ({ open, onCancel }) => {

  const [times, setTimes] = useState([])
  const [bookSchedulesBySelectedDate, setBookSchedulesBySelectedDate] = useState([])
  const [services, setServices] = useState([])
  const [totalMoney, setTotalMoney] = useState(0)
  const [items, setItems] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { user } = useSelector(globalSelector)

  const getFreeTimeOfBarber = (e) => {
    setTimes(
      open?.Schedules
        ?.filter(i => i?.DateAt === dayjs(e).format("dddd"))
        ?.map(i => {
          const dayGap = dayjs(e).startOf("day").diff(dayjs(i?.StartTime).startOf("day"), "days")
          return {
            StartTime: dayjs(i?.StartTime).add(dayGap, "days"),
            EndTime: dayjs(i?.EndTime).add(dayGap, "days"),
          }
        })
    )
    setBookSchedulesBySelectedDate(
      open?.BookingSchedules
        ?.filter(i => dayjs(i?.StartTime).format("DD/MM/YYYY") === dayjs(e).format("DD/MM/YYYY"))
        ?.map(i => ({
          StartTime: dayjs(i?.StartTime),
          EndTime: dayjs(i?.EndTime),
        }))
    )
  }

  const handleDisabledDateTime = () => {
    const validHours = new Set()
    const validMinutesByHour = {}
    times.forEach(i => {
      for (let h = i?.StartTime.hour(); h <= i?.EndTime.hour(); h++) {
        validHours.add(h)
        if (!validMinutesByHour[h]) validMinutesByHour[h] = new Set()

        let startMin = h === i?.StartTime.hour() ? i?.StartTime.minute() : 0
        let endMin = h === i?.EndTime.hour() ? i?.EndTime.minute() : 59

        for (let m = startMin; m <= endMin; m++) {
          validMinutesByHour[h].add(m)
        }
      }
    })
    let invalidHoursByBookSchedules = new Set()
    let invalidMinuteByBookSchedules = {}
    bookSchedulesBySelectedDate.forEach(i => {
      for (let h = i?.StartTime.hour(); h <= i?.EndTime.hour(); h++) {
        invalidHoursByBookSchedules.add(h)
        if (!invalidMinuteByBookSchedules[h]) invalidMinuteByBookSchedules[h] = new Set()

        let startMin = h === i?.StartTime.hour() ? i?.StartTime.minute() : 0
        let endMin = h === i?.EndTime.hour() ? i?.EndTime.minute() : 59

        for (let m = startMin; m <= endMin; m++) {
          invalidMinuteByBookSchedules[h].add(m)
        }
      }
    })
    return {
      disabledHours: () => [...Array(24).keys()]
        .filter((h) => !validHours.has(h) || !!invalidHoursByBookSchedules.has(h)),
      disabledMinutes: (selectedHour) => [...Array(60).keys()]
        .filter((m) => !validMinutesByHour[selectedHour]?.has(m) || !!invalidMinuteByBookSchedules[selectedHour]?.has(m))
    }
  }

  const convertRealDateTime = () => {
    const realDateTime = dayjs(selectedDate)
      .set("hour", selectedTime.hour())
      .set("minute", selectedTime.minute())
      .set("second", 0)
    return realDateTime
  }

  const handleCreateBooking = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await BookingService.createBooking({
        ...values,
        BarberID: open?.BarberID,
        BarberEmail: open?.BarberEmail,
        BarberName: open?.BarberName,
        Services: services?.map(i => ({
          ServiceName: i?.ServiceName,
          ServicePrice: i?.ServicePrice,
          ExpensePrice: i?.ExpensePrice,
          ServiceTime: i?.ServiceTime
        })),
        DateAt: convertRealDateTime(),
        TotalPrice: totalMoney,
        TotalExpensePrice: services?.reduce(
          (value, currentValue) => value + currentValue?.ExpensePrice,
          0
        )
      })
      if (!!res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate(Router.LICH_BOOKING)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setServices([open?.Service])
    form.setFieldsValue({
      CustomerAddress: user?.Address,
      CustomerPhone: user?.Phone
    })
  }, [])

  useEffect(() => {
    if (!!services?.length) {
      setTotalMoney(services?.reduce(
        (value, currentValue) => value + currentValue?.ServicePrice,
        0
      ))
    }
    setItems([
      {
        key: 1,
        label: 'Dịch vụ khác',
        children: (
          <div>
            {
              open?.Services
                ?.filter(i => services?.every(s => s?._id !== i?._id))
                ?.map(i =>
                  <ServiceItemStyled key={i?._id} className="d-flex-sb mb-12">
                    <div>{i?.ServiceName}</div>
                    <div className="d-flex-sb">
                      <div className="mr-12 fw-600">{formatMoney(i?.ServicePrice)} VNĐ</div>
                      <ButtonCustom
                        className="primary mini-size"
                        onClick={() => {
                          const copyServices = [...services]
                          copyServices.push(i)
                          setServices(copyServices)
                        }}
                      >
                        Book
                      </ButtonCustom>
                    </div>
                  </ServiceItemStyled>
                )
            }
          </div>
        )
      }
    ])
  }, [services])


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Xác nhận thông tin booking"
      width="45vw"
      style={{ position: "relative" }}
      footer={
        <Space className="d-flex-end">
          <ButtonCustom className="third" onClick={onCancel}>
            Đóng
          </ButtonCustom>
          <ButtonCustom
            loading={loading}
            className="primary"
            onClick={() => handleCreateBooking()}
          >
            Lưu
          </ButtonCustom>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={[8]}>
          <Col span={24}>
            <Row gutter={[12]}>
              <Col span={16}>
                <Form.Item
                  name="SelectedDate"
                  label="Chọn ngày cắt tóc"
                  rules={[
                    { required: true, message: "Thông tin không được để trống" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    allowClear={false}
                    disabledDate={current => disabledBeforeDate(current)}
                    onChange={e => {
                      setSelectedDate(e)
                      getFreeTimeOfBarber(e)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="SelectedTime"
                  label="Chọn thời gian"
                  rules={[
                    { required: true, message: "Thông tin không được để trống" },
                  ]}
                >
                  <TimePicker
                    style={{ width: "100%" }}
                    format="HH:mm"
                    disabledTime={handleDisabledDateTime}
                    onChange={currentTime => setSelectedTime(currentTime)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12} className="mb-30">
            <Form.Item
              name='CustomerAddress'
              label="Địa chỉ"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom placeholder="Nhập vào địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={12} className="mb-30">
            <Form.Item
              name='CustomerPhone'
              label="Số điện thoại"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
                { pattern: getRegexPhoneNumber(), message: "Số điện thoại sai định dạng" }
              ]}
            >
              <InputCustom placeholder="Nhập vào địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={24} className="mb-15">
            {
              services?.map((i, idx) =>
                <ServiceItemStyled key={i?._id} className="d-flex-sb">
                  <div className="fw-600">{i?.ServiceName}</div>
                  <div className="d-flex-sb">
                    <div>
                      <div className="mr-12 fw-600">{formatMoney(i?.ServicePrice)} VNĐ</div>
                      <div className="fs-13 gray-text">{convertMinuteToHour(i?.ServiceTime)}</div>
                    </div>
                    {
                      services?.length > 1 &&
                      <ButtonCircle
                        icon={ListIcons.ICON_CLOSE}
                        onClick={() => {
                          const copyServices = [...services]
                          copyServices.splice(idx, 1)
                          setServices(copyServices)
                        }}
                      />
                    }
                  </div>
                </ServiceItemStyled>
              )
            }
          </Col>
          <Col span={24} className="mb-30">
            <Collapse items={items} bordered={false} />
          </Col>
          <Col span={24}>
            <Space
              className="d-flex-end"
              style={{
                position: "sticky",
                bottom: 0,
              }}
            >
              <div>Total:</div>
              <div className="fs-18 fw-700">{formatMoney(totalMoney)} VNĐ</div>
            </Space>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalBooking