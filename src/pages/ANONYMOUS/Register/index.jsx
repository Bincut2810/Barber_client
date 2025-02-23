import { Col, Form, Radio, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DotStyled, SignupContainerStyled } from "./styled"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"
import Router from "src/routers"
import { getRegexEmail, getRegexPassowrd } from "src/lib/stringUtils"
import InputCustom from "src/components/InputCustom"

const SignupPage = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { isLogin } = useSelector(globalSelector)

  const handleRegister = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.register(values)
      if (!!res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate(Router.DANG_NHAP)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!isLogin) navigate("/")
  }, [])


  return (
    <SignupContainerStyled>
      <Form form={form} layout="vertical">
        <Row gutter={[8]}>
          <Col span={24}>
            <div className="center-text fw-600 fs-25 mb-8">Đăng ký tài khoản</div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="RoleID"
              label="Bạn đăng ký với tài khoản gì:"
              rules={[
                { required: true, message: "Hãy chọn vai trò của bạn" },
              ]}
            >
              <Radio.Group className="d-flex-center">
                <Radio
                  className="border-radio"
                  key={2}
                  value={2}
                >
                  Barber
                </Radio>
                <Radio
                  className="border-radio"
                  key={3}
                  value={3}
                >
                  Người dùng
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='FullName'
              label="Tên của bạn"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom placeholder="Nhập vào họ và tên" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Email"
              label="Email của bạn"
              rules={[
                { required: true, message: "Hãy nhập vào email của bạn" },
                { pattern: getRegexEmail(), message: "Email sai định dạng" }
              ]}
            >
              <InputCustom placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Hãy nhập vào mật khẩu của bạn" },
                { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" }
              ]}
            >
              <InputCustom type="isPassword" placeholder="Mật khảu" />
            </Form.Item>
            <div className="mb-16">
              <p className="gray-text">
                <DotStyled />
                Ký tự đầu tiên phải là một chữ cái in hoa (A-Z)
              </p>
              <p className="gray-text">
                <DotStyled />
                Các ký tự tiếp theo có thể là chữ cái (in hoa hoặc in thường) hoặc chữ số (0-9)
              </p>
              <p className="gray-text">
                <DotStyled />
                Ít nhất 8 ký tự
              </p>
            </div>
          </Col>
          <Col span={24}>
            <ButtonCustom
              className="primary submit-btn fs-18"
              htmlType="submit"
              onClick={() => handleRegister()}
              loading={loading}
            >
              Đăng ký
            </ButtonCustom>
          </Col>
        </Row>
      </Form>
    </SignupContainerStyled>
  )
}

export default SignupPage