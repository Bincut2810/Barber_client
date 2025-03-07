import { Steps } from "antd"
import { ForgotPasswordStyled, MainProfileWrapper } from "./styled"
import { useState } from "react"
import CheckEmailExist from "./components/CheckEmailExist"
import VerifyEmailWithGoogle from "./components/VerifyEmailWithGoogle"
import EnterNewPassword from "./components/EnterNewPassword"

const ForgotPassword = () => {

  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState("")

  const steps = [
    {
      title: "Tìm tài khoản của bạn",
      content: (
        <CheckEmailExist
          setCurrent={setCurrent}
          setEmail={setEmail}
        />
      )
    },
    {
      title: "Xác thực với Google",
      content: (
        <VerifyEmailWithGoogle
          email={email}
          setCurrent={setCurrent}
        />
      )
    },
    {
      title: "Nhập mật khẩu với",
      content: (
        <EnterNewPassword email={email} />
      )
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
  }))

  return (
    <ForgotPasswordStyled>
      <MainProfileWrapper>
        <Steps
          current={current}
          items={items}
          progressDot={true}
        />
        {steps[current].content}
      </MainProfileWrapper>
    </ForgotPasswordStyled>
  )
}

export default ForgotPassword