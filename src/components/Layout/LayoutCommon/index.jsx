import { useSelector } from "react-redux"
import { ContentContainerStyled, ContentStyled, LayoutStyled } from "../styled"
import { globalSelector } from "src/redux/selector"
import { FloatButton } from "antd"
import ListIcons from "src/components/ListIcons"
import { useState } from "react"
import Router from "src/routers"
import { useLocation } from "react-router-dom"

const LayoutCommon = ({ children }) => {

  const { user } = useSelector(globalSelector)
  const [openChatBox, setOpenChatBox] = useState(false)
  const [openChatBoxAI, setOpenChatBoxAI] = useState(false)
  const loaction = useLocation()


  return (
    <LayoutStyled>
      <ContentContainerStyled>
        <ContentStyled>
          {children}
        </ContentStyled>
      </ContentContainerStyled>
      <FloatButton.Group
        icon={ListIcons.ICON_CHAT_DOT}
        trigger="click"
        type="primary"
      >
        <FloatButton
          icon={ListIcons.ICON_MACHINE}
          tooltip="Chat bot"
          onClick={() => setOpenChatBoxAI(true)}
        />
        {
          !!user?._id &&
          <FloatButton
            icon={ListIcons.ICON_ADMIN}
            tooltip="Liên hệ với quản trị viên"
            onClick={() => setOpenChatBox(true)}
          />
        }
      </FloatButton.Group>
    </LayoutStyled>
  )
}

export default LayoutCommon