import { Col, Input, Row, Select } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"
import BarberListItem from "./components/BarberListItem"
import { useNavigate } from "react-router-dom"
import Router from "src/routers"
import InputCustom from "src/components/InputCustom"
import ListIcons from "src/components/ListIcons"

const BarberList = () => {

  const [loading, setLoading] = useState(false)
  const [barbers, setBarbers] = useState([])
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    TextSearch: "",
    AddressSearch: "",
    PageSize: 10,
    CurrentPage: 1,
    SortByStar: -1
  })

  const getListBarber = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListBarber(pagination)
      if (!!res?.isError) return
      setBarbers(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListBarber()
  }, [pagination])


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[12, 16]}>
        <Col span={9} className="mb-35">
          <InputCustom
            placeholder="Tìm kiếm theo tên"
            type="isSearch"
            allowClear
            prefix={ListIcons.ICON_SEARCH}
            onSearch={e => setPagination(pre => ({ ...pre, TextSearch: e }))}
          />
        </Col>
        <Col span={9} className="mb-35">
          <InputCustom
            placeholder="Tìm kiếm theo dịa chỉ"
            type="isSearch"
            allowClear
            prefix={ListIcons.ICON_LOCATION}
            onSearch={e => setPagination(pre => ({ ...pre, TextSearch: e }))}
          />
        </Col>
        <Col span={6}>
          <Select
            onChange={e => setPagination(pre => ({ ...pre, SortByStar: e }))}
            defaultValue={pagination?.SortByStar}
          >
            <Select.Option value={-1}>Sắp xếp giảm dần (Theo vote)</Select.Option>
            <Select.Option value={1}>Sắp xếp tăng dần (Theo vote)</Select.Option>
          </Select>
        </Col>
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