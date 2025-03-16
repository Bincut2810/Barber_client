import { useEffect, useState } from "react"
import { formatMoney } from "src/lib/stringUtils"
import PaymentService from "src/services/PaymentService"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import Router from "src/routers"
import SpinCustom from "src/components/SpinCustom"
import { Col, Row } from "antd"
import TableCustom from "src/components/TableCustom"

const PaymentHistory = () => {

  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const getListPaymenttByUser = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.getListPaymenttByUser()
      if (!!res?.isError) return
      setPayments(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListPaymenttByUser()
  }, [])

  const columns = [
    {
      title: "STT",
      width: 35,
      align: "center",
      key: 'STT',
      dataIndex: 'STT',
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: 'Nội dung giao dịch',
      width: 100,
      align: 'center',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Giá tiền',
      width: 70,
      align: 'center',
      dataIndex: 'TotalFee',
      key: 'TotalFee',
      render: (val) => (
        <div className="text-center">{formatMoney(val)} VNĐ</div>
      ),
    },
    {
      title: "Thời gian thanh toán",
      width: 80,
      dataIndex: "PaymentTime",
      align: "center",
      key: "PaymentTime",
      render: (val) => (
        <div>{dayjs(val).format("DD/MM/YYYY HH:mm")}</div>
      )
    },
    {
      title: "Xem chi tiết booking",
      width: 70,
      dataIndex: "Booking",
      align: "center",
      key: "Booking",
      render: (val) => (
        <Link to={`${Router.CAC_LICH_HEN}/${val}`}>
          Xem
        </Link>
      )
    },
  ]


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[0, 16]}>
        <Col span={24} className="d-flex-sb">
          <div className="title-type-2">
            Lịch sử giao dịch
          </div>
        </Col>
        <Col span={24} className="mt-16">
          <TableCustom
            isPrimary
            bordered
            noMrb
            showPagination
            dataSource={payments}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="_id"
            pagination={false}
          />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default PaymentHistory