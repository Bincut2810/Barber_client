import { Col, Menu, Row } from "antd"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ListIcons from "src/components/ListIcons"
import { MenuAdmin } from "../MenuItems"
import { handleLogout } from "src/lib/commonFunction"
import { ContentAdminContainerStyled, MenuAdminStyled } from "../styled"
import { globalSelector } from "src/redux/selector"

const LayoutAdmin = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const { listTab } = useSelector(globalSelector)

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout(dispatch, navigate)
    }
  }


  return (
    <Row>
      <Col span={collapsed ? 2 : 4}>
        <MenuAdminStyled>
          <div
            className="menu-container"
          >
            <Menu
              inlineCollapsed={collapsed}
              mode="inline"
              onClick={e => handleChangeMenu(e.key)}
              items={MenuAdmin()?.filter(i => listTab?.includes(i?.TabID))}
              selectedKeys={[location?.pathname]}
            />
          </div>
          <div
            className="collapsed-menu cursor-pointer d-flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="mr-8">
              {collapsed ? ListIcons.ICON_MENUUNFOLD : ListIcons.ICON_MENUFOLD}
            </div>
          </div>
        </MenuAdminStyled>
      </Col>
      <Col span={collapsed ? 22 : 20}>
        <ContentAdminContainerStyled>
          {children}
        </ContentAdminContainerStyled>
      </Col>
    </Row>
  )
}

export default LayoutAdmin