import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { HeaderContainerStyled, HeaderStyled } from "../styled"
import { Col, Menu, Row, Space } from "antd"
import Logo from "/logo.png"
import { MenuCommon } from "../MenuItems"
import { useLocation, useNavigate } from "react-router-dom"
import Router from "src/routers"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { Roles } from "src/lib/constant"

const Header = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { isLogin, user } = useSelector(globalSelector)


  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <Row className="d-flex-sb">
          <Col span={3}>
            <div>
              <img
                src={Logo}
                className="cursor-pointer"
                onClick={() => navigate(Router.TRANG_CHU)}
                style={{
                  width: '160px',
                  height: "80px",
                }}
              />
            </div>
          </Col>
          <Col span={18}>
            {
              user?.RoleID !== Roles.ROLE_ADMIN &&
              <div>
                <Menu
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    width: "100%",
                    justifyContent: "center"
                  }}
                  mode="horizontal"
                  items={MenuCommon()}
                  selectedKeys={[location?.pathname]}
                  defaultSelectedKeys={null}
                  onClick={(e) => navigate(e?.key)}
                />
              </div>
            }
          </Col>
          <Col span={3}>
            {
              !isLogin ?
                <Space className="d-flex justify-content-flex-end">
                  <ButtonCustom
                    className="third-type-2 mini-size"
                    onClick={() => navigate(Router.DANG_KY)}
                  >
                    Đăng ký
                  </ButtonCustom>
                  <div>/</div>
                  <ButtonCustom
                    className="third-type-2 mini-size"
                    onClick={() => navigate(Router.DANG_NHAP)}
                  >
                    Đăng nhập
                  </ButtonCustom>
                </Space>
                :
                <Space
                  className="d-flex-end cursor-pointer"
                  onClick={() => navigate(Router.TRANG_CA_NHAN)}
                >
                  <img
                    style={{
                      display: "block",
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      marginBottom: "2px"
                    }}
                    src={user?.AvatarPath}
                    alt=""
                  />
                  <div>{user?.FullName}</div>
                </Space>
            }
          </Col>
        </Row>
      </HeaderStyled>
    </HeaderContainerStyled>
  )
}

export default Header