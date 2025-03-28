import { Col, Descriptions, Row, Space } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { defaultDays } from "src/lib/dateUtils"
import { formatMoney } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"
import ScheduleSetting from "./components/ScheduleSetting"
import ServiceSetting from "./components/ServiceSetting"
import { toast } from "react-toastify"
import UserService from "src/services/UserService"
import globalSlice from "src/redux/globalSlice"

const ServicesAndSchedules = () => {

  const { user } = useSelector(globalSelector)
  const [openServiceSetting, setOpenServiceSetting] = useState(false)
  const [openScheduleSetting, setOpenScheduleSetting] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const requestConfirmRegister = async () => {
    try {
      setLoading(true)
      if (!user?.Services?.length) {
        return toast.error("Bạn hãy bổ sung dịch vụ của mình")
      }
      if (!user?.Schedules?.length) {
        return toast.error("Bạn hãy bổ sung thời gian làm việc của mình")
      }
      const res = await UserService.requestConfirmRegister()
      if (!!res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      toast.success(res?.msg)
    } finally {
      setLoading(false)
    }
  }

  const itemSchedules = []
  defaultDays?.forEach((i, idx) => {
    if (user?.Schedules?.some(s => s?.DateAt === i?.EngName)) {
      itemSchedules.push({
        key: idx,
        label: i?.VieNameSpecific,
        children: user?.Schedules
          ?.filter(s => s?.DateAt === i?.EngName)
          ?.map(s => `${dayjs(s?.StartTime).format("HH:mm")} - ${dayjs(s?.EndTime).format("HH:mm")}`).join(", ")
      })
    }
  })


  return (
    <Row>
      <Col span={24}>
        <Descriptions
          title="Thông tin dịch vụ"
          layout="vertical"
          bordered
          items={
            !!user?.Services?.length
              ? user?.Services?.map(i => ({
                key: i?._id,
                label: i?.ServiceName,
                children: `${formatMoney(i?.ServicePrice)} VNĐ`
              }))
              : []
          }
          extra={
            <Space>
              <ButtonCustom
                className="third-type-2"
                onClick={() => setOpenServiceSetting({ isUpdate: false })}
              >
                Thêm mới
              </ButtonCustom>
              {
                !!user?.Services?.length &&
                <ButtonCustom
                  className="third-type-2"
                  onClick={() => setOpenServiceSetting({ isUpdate: true })}
                >
                  Chỉnh sửa
                </ButtonCustom>
              }
            </Space>
          }
        />
      </Col>
      <Col span={24} className="mb-30">
        <Descriptions
          title="Thời gian làm việc"
          bordered
          size="small"
          items={itemSchedules}
          extra={
            <ButtonCustom
              className="third-type-2"
              onClick={() => setOpenScheduleSetting(true)}
            >
              Chỉnh sửa
            </ButtonCustom>
          }
        />
      </Col>
      {
        user?.RegisterStatus !== 3 &&
        <Col span={24}>
          <Space className="d-flex-end">
            <ButtonCustom
              className="third-type-2"
              loading={loading}
              onClick={() => requestConfirmRegister()}
            >
              Gửi yêu cầu kiểm duyệt
            </ButtonCustom>
          </Space>
        </Col>
      }

      {
        !!openScheduleSetting &&
        <ScheduleSetting
          open={openScheduleSetting}
          onCancel={() => setOpenScheduleSetting(false)}
        />
      }

      {
        !!openServiceSetting &&
        <ServiceSetting
          open={openServiceSetting}
          onCancel={() => setOpenServiceSetting(false)}
        />
      }

    </Row>
  )
}

export default ServicesAndSchedules