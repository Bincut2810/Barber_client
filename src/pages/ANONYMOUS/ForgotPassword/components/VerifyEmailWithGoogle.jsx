import { useGoogleLogin } from "@react-oauth/google"
import { Col, Row } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"

const VerifyEmailWithGoogle = ({ email, setCurrent }) => {

  const [loading, setLoading] = useState(false)

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)
        const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
        if (userInfor?.data?.email !== email) {
          toast.error("Tài khoản email không khớp")
        } else {
          setCurrent(2)
        }
      } finally {
        setLoading(false)
      }
    },
    onError: (error) => {
      toast.error("error:", error.toString())
    }
  })

  return (
    <SpinCustom spinning={loading}>
      <Row>
        <Col span={24}>
          <div className="fw-600 fs-25 mb-24">Xác thực với Google</div>
        </Col>
        <Col span={24} className="mb-16">
          <div className="fs-16">Vui lòng đăng nhập với tài khoản Google.</div>
          <div>{email}</div>
        </Col>
        <Col span={24} className="d-flex-end">
          <ButtonCustom
            className="primary"
            onClick={() => loginByGoogle()}
          >
            Tiếp tục
          </ButtonCustom>
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default VerifyEmailWithGoogle