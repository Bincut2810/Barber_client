import { useEffect, useState } from "react"
import { Col, Form, Row } from "antd"
import { LoginContainerStyled } from "./styled"
import { useNavigate } from "react-router-dom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import { jwtDecode } from "jwt-decode"
import UserService from "src/services/UserService"
import { useGoogleLogin } from "@react-oauth/google"

const LoginPage = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLogin } = useSelector(globalSelector)

  const validateByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)
        const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
        if (!!userInfor) {
          const dataFromGoogle = userInfor?.data
          const res = await UserService.login({
            Email: dataFromGoogle.email,
          })
          if (!!res?.isError) return toast.error(res?.msg)
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
    if (!!isLogin) navigate(Router.TRANG_CHU)
  }, [])


  return (
    <LoginContainerStyled>
      <Form form={form}>
        <Row>
          <Col span={24}>
            <div className="center-text fw-600 fs-25 mb-8">Đăng nhập</div>
            <div className="center-text mb-12">
              <span className="mr-4 mb-8 fs-16">Người dùng mới?</span>
              <span
                className="fs-16 primary-text cursor-pointer"
                onClick={() => navigate("/dang-ky")}
              >
                Tạo tài khoản mới
              </span>
            </div>
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
    </LoginContainerStyled>
  )
}

export default LoginPage