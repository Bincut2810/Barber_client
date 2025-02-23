import { Col, Row, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { formatMoney } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"
import BookingService from "src/services/BookingService"

const MyBooking = () => {

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, listSystemKey } = useSelector(globalSelector)
  const bookingStatus = getListComboKey(SYSTEM_KEY.BOOKING_STATUS, listSystemKey)

  const getListMyBooking = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getListMyBooking()
      if (!!res?.isError) return
      setBookings(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListMyBooking()
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
      title: user?.RoleID === Roles.ROLE_BARBER ? "Tên khách hàng" : "Tên barber",
      width: 80,
      align: 'center',
      dataIndex: 'FullName',
      key: 'FullName',
      render: (_, record, index) => (
        <div className="text-center">
          {
            user?.RoleID === Roles.ROLE_BARBER
              ? record?.Customer?.FullName
              : record?.Barber?.FullName
          }
        </div>
      ),
    },
    {
      title: 'Dịch vụ',
      width: 90,
      align: 'center',
      dataIndex: 'Services',
      key: 'Services',
      render: (_, record, index) => (
        <div className="text-center">
          {
            record?.Services?.map(i =>
              <div key={i?._id}>{i?.ServiceName}</div>
            )
          }
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      width: 80,
      dataIndex: "TotalPrice",
      align: "center",
      key: "TotalPrice",
      render: (val) => (
        <div>{formatMoney(val)} VNĐ</div>
      )
    },
    {
      title: "Trạng thái duyệt",
      width: 80,
      dataIndex: "BookingStatus",
      align: "center",
      key: "BookingStatus",
      render: (val) => (
        <Tag color={["processing", "warning", "success", "error"][val - 1]} className="p-5 fs-16">
          {
            bookingStatus?.find(i => i?.ParentID === val)?.ParentName
          }
        </Tag>
      )
    },
  ]


  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[8, 16]}>
        <Col span={24} className="d-flex-sb">
          <div className="title-type-1">
            LỊCH SỬ BOOKING
          </div>
        </Col>
        {/* <Col span={12}>
          <InputCustom
            type="isSearch"
            placeholder="Tìm kiếm tên..."
            allowClear
            onSearch={e => setPagination(pre => ({ ...pre, TextSearch: e }))}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Loại tài khoản"
            onChange={e => setPagination(pre => ({ ...pre, RoleID: e }))}
            allowClear
          >
            <Select.Option key={2} value={2}>Barber</Select.Option>
            <Select.Option key={3} value={3}>User</Select.Option>
          </Select>
        </Col>
        <Col span={4}>
          <Select
            placeholder="Trạng thái đăng ký"
            onChange={e => setPagination(pre => ({ ...pre, RegisterStatus: e }))}
            allowClear
          >
            {
              registerStatus?.map(i =>
                <Select.Option key={i?.ParentID} value={i?.ParentID}>{i?.ParentName}</Select.Option>
              )
            }
          </Select>
        </Col>
        <Col span={4}>
          <Select
            placeholder="Trạng thái tài khoản"
            onChange={e => setPagination(pre => ({ ...pre, IsActive: e }))}
            allowClear
          >
            <Select.Option key={1} value={true}>Đang sử dụng</Select.Option>
            <Select.Option key={2} value={false}>Đã khóa</Select.Option>
          </Select>
        </Col> */}
        <Col span={24} className="mt-16">
          <TableCustom
            isPrimary
            bordered
            noMrb
            showPagination
            dataSource={bookings}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="_id"
          // pagination={
          //   !!pagination?.PageSize
          //     ? {
          //       hideOnSinglePage: total <= 10,
          //       current: pagination?.CurrentPage,
          //       pageSize: pagination?.PageSize,
          //       responsive: true,
          //       total,
          //       showSizeChanger: total > 10,
          //       locale: { items_per_page: "" },
          //       onChange: (CurrentPage, PageSize) =>
          //         setPagination(pre => ({
          //           ...pre,
          //           CurrentPage,
          //           PageSize,
          //         })),
          //     }
          //     : false
          // }
          />
        </Col>

        {/* {
        !!openModalInsertStaff &&
        <ModalInsertUpdateStaff
          open={openModalInsertStaff}
          onCancel={() => setOpenModalInsertStaff(false)}
          onOk={getListStaff}
        />
      } */}

      </Row>
    </SpinCustom>
  )
}

export default MyBooking