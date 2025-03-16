import { Col, Menu, Row } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MenuUser } from "../MenuItems"
import { handleLogout } from "src/lib/commonFunction"
import { MenuUserStyled } from "../styled"
import { globalSelector } from "src/redux/selector"

const LayoutUser = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { listTab } = useSelector(globalSelector)

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout(dispatch, navigate)
    }
  }


  return (
    <div className="d-flex-center mt-60">
      <Row style={{ width: "78%" }} gutter={[16]}>
        <Col span={8}>
          <MenuUserStyled>
            <div
              className="menu-container"
            >
              <Menu
                mode="inline"
                onClick={e => handleChangeMenu(e.key)}
                items={MenuUser()?.filter(i => listTab?.includes(i?.TabID))}
                selectedKeys={[location?.pathname]}
              />
            </div>
          </MenuUserStyled>
        </Col>
        <Col span={16} style={{ marginBottom: "30px" }}>
          <div>
            {children}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LayoutUser