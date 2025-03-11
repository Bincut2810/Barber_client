import { Col, Form, Radio, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupContainerStyled } from "./styled"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"
import { useGoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import globalSlice from "src/redux/globalSlice"
import SpinCustom from "src/components/SpinCustom"

const SignupPage = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { isLogin } = useSelector(globalSelector)
  const dispatch = useDispatch()

  const validateByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)
        const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
        const roleID = form.getFieldValue("RoleID")
        if (!!userInfor) {
          const dataFromGoogle = userInfor?.data
          const res = await UserService.register({
            Email: dataFromGoogle.email,
            FullName: dataFromGoogle.name,
            AvatarPath: dataFromGoogle.picture,
            RoleID: roleID
          })
          if (!!res?.isError) return toast.error(res?.msg)
          toast.success(res?.msg)
          const tokenData = jwtDecode(res?.data)
          const { payload } = tokenData
          if (!!payload.ID) {
            dispatch(globalSlice.actions.setIsCheckAuth(true))
          } else {
            navigate('/forbidden')
          }
        } else {
          return toast.error("Have something error")
        }
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (!!isLogin) navigate("/")
  }, [])


  return (
    <SpinCustom spinning={loading}>
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
              <ButtonCustom
                className="d-flex-center third-type-2 submit-btn mb-15"
                onClick={async () => {
                  await form.validateFields()
                  validateByGoogle()
                }}
              >
                <span className="icon-google"></span>
                <span className="ml-12">Sign up with Google</span>
              </ButtonCustom>
            </Col>
          </Row>
        </Form>
      </SignupContainerStyled>
    </SpinCustom>
  )
}

export default SignupPage