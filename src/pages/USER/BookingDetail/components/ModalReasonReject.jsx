import { Form, Space } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { Roles } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import BookingService from "src/services/BookingService"
import socket from "src/socket"

const ModalReasonReject = ({ open, onCancel, onOk }) => {

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { user } = useSelector(globalSelector)

  const changeBookingStatus = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await BookingService.changeBookingStatus({
        ...open,
        ...values
      })
      if (!!res?.isError) return
      onOk()
      toast.success(res?.msg)
      socket.emit("change-bookingstatus", {
        ...res?.data,
        Receiver: open?.Receiver
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={
        user?.RoleID === Roles.ROLE_STUDENT
          ? "Lý do hủy"
          : "Lý do không duyệt"
      }
      width="50vw"
      footer={
        <Space className="d-flex-end">
          <ButtonCustom
            className="third"
            onClick={() => onCancel()}
          >
            Đóng
          </ButtonCustom>
          <ButtonCustom
            className="primary"
            loading={loading}
            onClick={() => changeBookingStatus()}
          >
            Gửi
          </ButtonCustom>
        </Space>
      }
    >
      <Form form={form}>
        <Form.Item
          name='Reason'
          rules={[
            { required: true, message: "Thông tin không được để trống" },
          ]}
        >
          <InputCustom
            placeholder={
              user?.RoleID === Roles.ROLE_STUDENT
                ? "Nhập vào lý do hủy"
                : "Nhập vào lý do không duyệt"
            }
          />
        </Form.Item>
      </Form>
    </ModalCustom>
  )
}

export default ModalReasonReject