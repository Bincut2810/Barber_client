import { Layout } from "antd"
import { Roles } from "src/lib/constant"
import LayoutAdmin from "../LayoutAdmin"
import LayoutCommon from "../LayoutCommon"
import Header from "../components/Header"
import { useLocation } from "react-router-dom"
import LayoutUser from "../LayoutUser"

const { Content } = Layout

const MainLayout = ({ children, tokenData }) => {

  const location = useLocation()


  return (
    <Layout>
      <Header />
      <Layout>
        <Content
          style={{
            marginTop: "84px",
            backgroundColor: 'white'
          }}
        >
          {
            (!!tokenData && [Roles.ROLE_ADMIN].includes(tokenData?.RoleID))
              ? <LayoutAdmin>
                {children}
              </LayoutAdmin>
              : (!!tokenData && ![Roles.ROLE_ADMIN].includes(tokenData?.RoleID))
                ? <LayoutUser>
                  {children}
                </LayoutUser>
                : <LayoutCommon>
                  {children}
                </LayoutCommon>
          }
        </Content>
      </Layout>
    </Layout >
  )
}

export default MainLayout
