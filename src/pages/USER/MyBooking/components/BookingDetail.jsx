import { useSelector } from "react-redux"
import ModalCustom from "src/components/ModalCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"
import { formatMoney } from "src/lib/stringUtils"
import { Col, Descriptions, Row } from "antd"
import TableCustom from "src/components/TableCustom"

const BookingDetail = ({ open, onCancel }) => {

  const { user, listSystemKey } = useSelector(globalSelector)
  const gender = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  const commonItem = [
    {
      key: '1',
      label: user?.RoleID === Roles.ROLE_BARBER ? "Khách hàng" : "Barber",
      children: open?.[user?.RoleID === Roles.ROLE_BARBER ? "Customer" : "Barber"]?.FullName,
    },
    {
      key: '2',
      label: 'Tổng tiền',
      children: `${formatMoney(open?.TotalPrice)} VNĐ`,
    },
    {
      key: '3',
      label: 'Ngày hẹn',
      children: dayjs(open?.DateAt).format("DD/MM/YYYY HH:mm"),
    },
  ]

  const itemForBarber = [
    {
      key: '4 ',
      label: 'Số điện thoại khách hàng',
      children: open?.CustomerPhone,
    },
    {
      key: '5',
      label: 'Địa chỉ khách hàng',
      children: open?.CustomerAddress,
    },
  ]

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
      title: "Tên dịch vụ",
      width: 100,
      align: "center",
      key: 'ServiceName',
      dataIndex: 'ServiceName',
    },
    {
      title: "Giá tiền",
      width: 80,
      align: "center",
      key: 'ServicePrice',
      dataIndex: 'ServicePrice',
      render: (val) => (
        <div className="text-center">{formatMoney(val)} VNĐ</div>
      ),
    },
  ]


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chi tiết booking"
      width="60vw"
      centered={false}
      footer={null}
    >
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Descriptions
            items={
              user?.RoleID === Roles.ROLE_BARBER ?
                [...commonItem, ...itemForBarber]
                : commonItem
            }
          />
        </Col>
        <Col span={24}>
          <TableCustom
            isPrimary
            bordered
            noMrb
            showPagination
            dataSource={open?.Services}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="_id"
            pagination={false}
          />
        </Col>
      </Row>
    </ModalCustom>
  )
}

export default BookingDetail