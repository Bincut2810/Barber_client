import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"
import BarberListItem from "./components/BarberListItem"
import { useNavigate } from "react-router-dom"
import Router from "src/routers"

const BarberList = () => {

  const [loading, setLoading] = useState(false)
  const [barbers, setBarbers] = useState([])
  const navigate = useNavigate()

  const getListBarber = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListBarber({})
      if (!!res?.isError) return
      setBarbers(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListBarber()
  }, [])


  return (
    <SpinCustom spinning={loading}>
      <Row>
        {
          barbers?.map(i =>
            <Col
              key={i?._id}
              span={6}
              className="cursor-pointer"
              onClick={() => navigate(`${Router.CHI_TIET_BARBER}/${i?._id}`)}
            >
              <BarberListItem item={i} />
            </Col>
          )
        }
      </Row>
    </SpinCustom>
  )
}

export default BarberList