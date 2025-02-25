import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { Col, Descriptions, Image, Row, Space } from "antd"
import { formatMoney } from "src/lib/stringUtils"
import { useState } from "react"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import ScheduleSetting from "./components/ScheduleSetting"
import ServiceSetting from "./components/ServiceSetting"
import { defaultDays } from "src/lib/dateUtils"
import { toast } from "react-toastify"
import UserService from "src/services/UserService"
import globalSlice from "src/redux/globalSlice"

const UserProfile = () => {

  const { user, listSystemKey } = useSelector(globalSelector)
  const gender = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
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

  const itemInfo = [
    {
      key: '1',
      label: 'Tên',
      children: user?.FullName,
    },
    {
      key: '2',
      label: 'Năm sinh',
      children: dayjs(user?.DateOfBirth).format("DD/MM/YYYY"),
    },
    {
      key: '3',
      label: "Địa chỉ",
      children: user?.Address,
    },
    {
      key: '4',
      label: 'Số điện thoại',
      children: user?.Phone,
    },
    {
      key: '5',
      label: 'Giới tính',
      children: gender?.find(i => i?.ParentID === user?.Gender)?.ParentName,
    },
    {
      key: '6',
      label: 'Kinh nghiệm',
      children: user?.Experiences,
    },
    {
      key: '7',
      label: 'Chứng chỉ',
      children: (
        user?.Certificates?.map(i =>
          <Image style={{ width: '200px', height: "150px" }} key={i} src={i} />
        )
      ),
    },
  ]

  const itemServices = !!user?.Services?.length
    ? user?.Services?.map(i => ({
      key: i?._id,
      label: i?.ServiceName,
      children: formatMoney(i?.ServicePrice)
    }))
    : []

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
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <Descriptions title="Thông tin cá nhân" items={itemInfo} />
      </Col>
      <Col span={24}>
        <Descriptions
          title="Thông tin dịch vụ"
          items={itemServices}
          extra={
            <ButtonCustom
              className="third-type-2"
              onClick={() => setOpenServiceSetting(true)}
            >
              Chỉnh sửa
            </ButtonCustom>
          }
        />
      </Col>
      <Col span={24} className="mb-30">
        <Descriptions
          title="Thời gian làm việc"
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

export default UserProfile