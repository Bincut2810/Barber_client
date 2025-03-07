import { Col, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { formatMoney } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import BookingService from "src/services/BookingService"
import BookingDetail from "./components/BookingDetail"
import { toast } from "react-toastify"
import socket from "src/socket"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import SendFeedback from "./components/SendFeedback"

const MyBooking = () => {

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, listSystemKey } = useSelector(globalSelector)
  const bookingStatus = getListComboKey(SYSTEM_KEY.BOOKING_STATUS, listSystemKey)
  const [openBookingDetail, setOpenBookingDetail] = useState(false)
  const navigate = useNavigate()
  const [openSendFeedback, setOpenSendFeedback] = useState(false)

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

  const changeBookingStatus = async (body, Receiver) => {
    try {
      setLoading(true)
      const res = await BookingService.changeBookingStatus(body)
      if (!!res?.isError) return
      getListMyBooking()
      toast.success(res?.msg)
      socket.emit("change-bookingstatus", {
        ...res?.data,
        Receiver: Receiver
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListMyBooking()
  }, [])

  useEffect(() => {
    socket.on("listen-change-bookingstatus", data => {
      setBookings(pre => {
        const copyBookings = [...pre]
        const index = copyBookings?.findIndex((i) => i?._id === data?._id)
        if (index !== -1) {
          copyBookings.splice(index, 1, data)
        } else {
          copyBookings.push(data)
        }
        return copyBookings
      })
    })
  }, [])

  const listBtn = record => [
    {
      title: "Xem chi tiết",
      isView: true,
      isDisabled: false,
      icon: ListIcons?.ICON_VIEW,
      onClick: () => setOpenBookingDetail(record)
    },
    {
      title: "Duyệt",
      isView: record?.ButtonShow?.IsConfirm,
      isDisabled: record?.ButtonDisabled?.IsConfirm,
      icon: ListIcons?.ICON_CONFIRM,
      onClick: () => {
        ConfirmModal({
          description: `Bạn có chắc chắn duyệt booking này không?`,
          onOk: close => {
            changeBookingStatus(
              {
                BookingID: record?._id,
                BookingStatus: 2,
                CustomerName: record?.Customer?.FullName,
                CustomerEmail: record?.Customer?.Email,
                BarberName: record?.Barber?.FullName,
                BarberEmail: record?.Barber?.Email,
              },
              user?.RoleID === Roles.ROLE_BARBER
                ? record?.Customer?._id
                : record?.Barber?._id
            )
            close()
          }
        })
      }
    },
    {
      title: "Thanh toán",
      isView: record?.ButtonShow?.IsPayment,
      isDisabled: record?.ButtonDisabled?.IsPayment,
      icon: ListIcons?.ICON_PAYMENT_BOOKING,
      onClick: () => navigate(`${Router.CHECKOUT}/${record?._id}`)
    },
    {
      title: "Hủy",
      isView: record?.ButtonShow?.IsReject,
      isDisabled: record?.ButtonDisabled?.IsReject,
      icon: ListIcons?.ICON_CLOSE,
      onClick: () => {
        ConfirmModal({
          description: `Bạn có chắc chắn hủy booking này không?`,
          onOk: close => {
            changeBookingStatus(
              {
                BookingID: record?._id,
                BookingStatus: 3,
                CustomerName: record?.Customer?.FullName,
                CustomerEmail: record?.Customer?.Email,
                BarberName: record?.Barber?.FullName,
                BarberEmail: record?.Barber?.Email,
              },
              user?.RoleID === Roles.ROLE_BARBER
                ? record?.Customer?._id
                : record?.Barber?._id
            )
            close()
          }
        })
      }
    },
    {
      title: "Hoàn thành",
      isView: record?.ButtonShow?.IsComplete,
      isDisabled: record?.ButtonDisabled?.IsComplete,
      icon: ListIcons?.ICON_DONE,
      onClick: () => {
        changeBookingStatus(
          {
            BookingID: record?._id,
            BookingStatus: 5,
            CustomerName: record?.Customer?.FullName,
            CustomerEmail: record?.Customer?.Email,
            BarberName: record?.Barber?.FullName,
            BarberEmail: record?.Barber?.Email,
          },
          user?.RoleID === Roles.ROLE_BARBER
            ? record?.Customer?._id
            : record?.Barber?._id
        )
      }
    },
    {
      title: "Đánh giá",
      isView: record?.ButtonShow?.IsFeedback,
      isDisabled: record?.ButtonDisabled?.IsFeedback,
      icon: ListIcons?.ICON_REVIEW,
      onClick: () => setOpenSendFeedback(record?.Barber?._id)
    }
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
      title: user?.RoleID === Roles.ROLE_BARBER ? "Khách hàng" : "Barber",
      width: 80,
      align: 'center',
      dataIndex: 'FullName',
      key: 'FullName',
      render: (_, record, index) => (
        <div
          className={
            `${user?.RoleID === Roles.ROLE_BARBER ? "" : "cursor-pointer blue-text"} text-center`
          }
          onClick={() => {
            if (user?.RoleID === Roles.ROLE_USER) {
              navigate(`${Router.CHI_TIET_BARBER}/${record?.Barber?._id}`)
            }
          }}
        >
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
      title: user?.RoleID === Roles.ROLE_BARBER ? "Địa chỉ" : "Tổng tiền",
      width: 90,
      dataIndex: user?.RoleID === Roles.ROLE_BARBER ? "CustomerAddress" : "TotalPrice",
      align: "center",
      key: user?.RoleID === Roles.ROLE_BARBER ? "CustomerAddress" : "TotalPrice",
      render: (val) => (
        <div>
          {
            user?.RoleID === Roles.ROLE_BARBER
              ? val
              : `${formatMoney(val)} VNĐ`
          }
        </div>
      )
    },
    {
      title: "Trạng thái booking",
      width: 80,
      dataIndex: "BookingStatus",
      align: "center",
      key: "BookingStatus",
      render: (val) => (
        <Tag color={["processing", "success", "error", "warning", "success"][val - 1]} className="p-5 fs-16">
          {
            bookingStatus?.find(i => i?.ParentID === val)?.ParentName
          }
        </Tag>
      )
    },
    {
      title: "Trạng thái thanh toán",
      width: 80,
      dataIndex: "IsPaid",
      align: "center",
      key: "IsPaid",
      render: (val) => (
        <Tag color={!!val ? "success" : "processing"} className="p-5 fs-16">
          {
            !!val ? "Đã thanh toán" : "Chưa thanh toán"
          }
        </Tag>
      )
    },
    {
      title: "Chức năng",
      width: 70,
      key: "Function",
      align: "center",
      render: (_, record) => (
        <Space direction="horizontal">
          {
            listBtn(record)?.map((i, idx) =>
              !!i?.isView &&
              <ButtonCircle
                key={idx}
                title={i?.title}
                disabled={i?.isDisabled}
                icon={i?.icon}
                onClick={i?.onClick}
              />
            )
          }
        </Space>
      ),
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

        {
          !!openBookingDetail &&
          <BookingDetail
            open={openBookingDetail}
            onCancel={() => setOpenBookingDetail(false)}
          />
        }

        {
          !!openSendFeedback &&
          <SendFeedback
            open={openSendFeedback}
            onCancel={() => setOpenSendFeedback(false)}
            onOk={getListMyBooking}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default MyBooking