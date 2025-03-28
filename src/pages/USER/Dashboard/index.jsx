import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import StatisticService from "src/services/StatisticService"
import { BarberListItemStyled } from "src/pages/ANONYMOUS/BarberList/styled"
import StatisticTotalBooking from "./components/StatisticTotalBooking"
import StatisticServiceBooking from "./components/StatisticServiceBooking"

const Dashboard = () => {

  const [totalBooking, setTotalBooking] = useState()
  const [services, setServices] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 3
  })

  const getStatisticTotalBookingByBarber = async () => {
    try {
      setLoading(true)
      const res = await StatisticService.statisticTotalBookingByBarber()
      if (!!res?.isError) return
      setTotalBooking(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getStatisticServiceBooking = async () => {
    try {
      setLoading(true)
      const res = await StatisticService.statisticServiceBooking(pagination)
      if (!!res?.isError) return
      setServices(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStatisticTotalBookingByBarber()
  }, [])

  useEffect(() => {
    getStatisticServiceBooking()
  }, [pagination])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <BarberListItemStyled>
            <StatisticTotalBooking totalBooking={totalBooking} />
          </BarberListItemStyled>
        </Col>
        <Col span={24}>
          <BarberListItemStyled>
            <StatisticServiceBooking
              services={services}
              pagination={pagination}
              setPagination={setPagination}
              total={total}
            />
          </BarberListItemStyled>
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default Dashboard