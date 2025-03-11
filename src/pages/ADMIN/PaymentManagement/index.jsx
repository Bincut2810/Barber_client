import { useEffect, useState } from "react"
import { formatMoney } from "src/lib/stringUtils"
import PaymentService from "src/services/PaymentService"
import dayjs from "dayjs"
import SpinCustom from "src/components/SpinCustom"
import { Col, Row, Space } from "antd"
import TableCustom from "src/components/TableCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import ChangeProfitPercent from "./components/ChangeProfitPercent"

const PaymentManagement = () => {

  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0)
  const [openChangeProfitPercent, setOpenChangeProfitPercent] = useState(false)

  const getListPayment = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.getListPayment()
      if (!!res?.isError) return
      setPayments(res?.data)
      if (!!res?.data?.length) {
        setTotalMoney(
          res?.data?.reduce((total, curr) =>
            total + curr?.TotalFee,
            0)
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListPayment()
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
      title: 'Tên khách hàng',
      width: 80,
      align: 'center',
      dataIndex: 'FullName',
      key: 'FullName',
      render: (_, record) => (
        <div className="text-center">{record?.Customer?.FullName}</div>
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
      title: "Phần trăm",
      width: 50,
      dataIndex: "Percent",
      align: "center",
      key: "Percent",
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
  ]


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[8, 0]}>
        <Col span={24} className="d-flex-sb">
          <div className="title-type-1">
            QUẢN LÝ DOANH THU
          </div>
          <div className="mb-12">
            <span className="mr-6">Tổng doanh thu:</span>
            <span className="fs-19 fw-700 blue-text mr-6">{formatMoney(totalMoney)}</span>
            <span>VNĐ</span>
          </div>
        </Col>
        <Col span={24}>
          <Space className="d-flex-end">
            <ButtonCustom
              className="third-type-2"
              onClick={() => setOpenChangeProfitPercent(true)}
            >
              Phần trăm lợi nhuận
            </ButtonCustom>
          </Space>
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

        {
          !!openChangeProfitPercent &&
          <ChangeProfitPercent
            open={openChangeProfitPercent}
            onCancel={() => setOpenChangeProfitPercent(false)}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default PaymentManagement