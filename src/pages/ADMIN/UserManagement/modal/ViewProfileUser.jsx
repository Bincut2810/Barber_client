import { Space, Tabs } from "antd"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { PatentChildBorder, TabStyled } from "../styled"
import Service from "../components/Service"
import Information from "../components/Information"
import Schedule from "../components/Schedule"
import { Roles } from "src/lib/constant"

const ViewProfileUser = ({ open, onCancel }) => {

  const commonItem = [
    {
      key: 1,
      label: "Thông tin tài khoản",
      children: (
        <PatentChildBorder>
          <Information user={open} />
        </PatentChildBorder>
      )
    },
  ]

  const barberItem = [
    {
      key: 2,
      label: "Dịch vụ cung cấp",
      children: (
        <PatentChildBorder>
          <Service user={open} />
        </PatentChildBorder>
      )
    },
    {
      key: 3,
      label: "Thời gian làm việc",
      children: (
        <PatentChildBorder>
          <Schedule user={open} />
        </PatentChildBorder>
      )
    },
  ]


  return (
    <ModalCustom
      open={open}
      width="80vw"
      title="Thông tin chi tiết"
      onCancel={onCancel}
      footer={
        <Space className="d-flex-end">
          <ButtonCustom
            className="third"
            onClick={() => onCancel()}
          >
            Đóng
          </ButtonCustom>
        </Space>
      }
    >
      <TabStyled>
        <Tabs
          type="card"
          items={
            open?.RoleID === Roles.ROLE_BARBER
              ? [...commonItem, ...barberItem]
              : commonItem
          }
          animated={{
            tabPane: true,
          }}
        />
      </TabStyled>
    </ModalCustom>
  )
}

export default ViewProfileUser