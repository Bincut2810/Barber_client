import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import StatisticService from "src/services/StatisticService"
import StatisticTotalBooking from "./components/StatisticTotalBooking"
import StatisticTotalAccount from "./components/StatisticTotalAccount"
import { BarberListItemStyled } from "src/pages/ANONYMOUS/BarberList/styled"
import StatisticBookingByMonth from "./components/StatisticBookingByMonth"

const DashboardManagement = () => {

  const [totalBooking, setTotalBooking] = useState()
  const [totalAccount, setTotalAccount] = useState()
  const [loading, setLoading] = useState(false)

  const getStatisticTotalBooking = async () => {
    try {
      setLoading(true)
      const res = await StatisticService.statisticTotalBooking()
      if (!!res?.isError) return
      setTotalBooking(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getStatisticTotalAccount = async () => {
    try {
      setLoading(true)
      const res = await StatisticService.statisticTotalAccount()
      if (!!res?.isError) return
      setTotalAccount(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStatisticTotalBooking()
    getStatisticTotalAccount()
  }, [])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[12, 16]}>
        <Col span={24} className="d-flex-sb mb-30">
          <div className="title-type-1">
            QUẢN LÝ DASHBOARD
          </div>
        </Col>
        <Col span={12}>
          <BarberListItemStyled>
            <StatisticTotalBooking totalBooking={totalBooking} />
          </BarberListItemStyled>
        </Col>
        <Col span={12}>
          <BarberListItemStyled>
            <StatisticTotalAccount totalAccount={totalAccount} />
          </BarberListItemStyled>
        </Col>
        <Col span={24}>
          <BarberListItemStyled>
            <StatisticBookingByMonth totalBooking={totalBooking} />
          </BarberListItemStyled>
        </Col>
      </Row>
    </SpinCustom >
  )
}

export default DashboardManagement