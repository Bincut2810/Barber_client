import { Col, Form, Rate, Row, Space } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import FeedbackService from "src/services/FeedbackService"

const SendFeedback = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSendFeedback = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await FeedbackService.createFeedback({
        ...values,
        Barber: open,
      })
      if (!!res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Gửi đánh giá barber"
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
            onClick={() => handleSendFeedback()}
          >
            Gửi
          </ButtonCustom>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Vote cho barber"
              name="Rate"
              rules={[
                { required: true, message: "Chọn số lượng sao vote cho barber" }
              ]}
            >
              <Rate />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Viết nội dung đánh giá"
              name="Content"
              rules={[
                { required: true, message: "Viết nội dung đánh giá barber" }
              ]}
            >
              <InputCustom type="isTextArea" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default SendFeedback
