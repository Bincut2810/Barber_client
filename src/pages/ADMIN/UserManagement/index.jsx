import { Col, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ListIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"
import socket from "src/socket"
import ViewProfileUser from "./modal/ViewProfileUser"

const UserManagement = () => {

  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
    RoleID: 0,
    RegisterStatus: 0,
    IsActive: null
  })
  const { listSystemKey } = useSelector(globalSelector)
  const registerStatus = getListComboKey(SYSTEM_KEY.REGISTER_STATUS, listSystemKey)
  const [openViewProfile, setOpenViewProfile] = useState(false)

  const getListUser = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListUser(pagination)
      if (!!res?.isError) return
      setUsers(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const handleResponseRequestRegister = async (body) => {
    try {
      setLoading(true)
      const res = await UserService.responseRequestRegister(body)
      if (!!res?.isError) return
      getListUser()
      toast.success(res?.msg)
    } finally {
      setLoading(false)
    }
  }

  const handleInactiveOrActiveAccount = async (body) => {
    try {
      setLoading(true)
      const res = await UserService.inactiveOrActiveAccount(body)
      if (!!res?.isError) return toast.error(res?.msg)
      getListUser()
      toast.success(res?.msg)
      socket.emit("inactive-account", body?.UserID)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListUser()
  }, [pagination])

  const listBtn = record => [
    {
      title: "Xem chi tiết",
      isDisabled: false,
      icon: ListIcons?.ICON_VIEW,
      onClick: () => setOpenViewProfile(record)
    },
    {
      title: "Duyệt",
      icon: ListIcons?.ICON_CONFIRM,
      isDisabled: record?.IsConfirm,
      onClick: () => {
        ConfirmModal({
          description: `Bạn có chắc chắn duyệt tài khoản ${record?.FullName} không?`,
          onOk: close => {
            handleResponseRequestRegister({
              UserID: record?._id,
              RegisterStatus: 3
            })
            close()
          }
        })
      }
    },
    {
      title: "Không duyệt",
      icon: ListIcons?.ICON_CLOSE,
      isDisabled: record?.IsReject,
      // onClick: () => setOpenModalReasonReject(record)
    },
    {
      title: !!record?.IsActive ? "Khóa tài khoản" : "Mở khóa tài khoản",
      placement: "topRight",
      icon: !!record?.IsActive ? ListIcons?.ICON_BLOCK : ListIcons?.ICON_UNBLOCK,
      onClick: () => handleInactiveOrActiveAccount({
        UserID: record?._id,
        IsActive: !!record?.IsActive ? false : true,
      })
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
        <div className="text-center">{pagination?.PageSize * (pagination?.CurrentPage - 1) + index + 1}</div>
      ),
    },
    {
      title: 'Tên',
      width: 80,
      align: 'center',
      dataIndex: 'FullName',
      key: 'FullName',
    },
    {
      title: 'Địa chỉ email',
      width: 100,
      align: 'center',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Số điện thoại',
      width: 70,
      align: 'center',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: "Trạng thái tài khoản",
      width: 60,
      dataIndex: "IsActive",
      align: "center",
      key: "IsActive",
      render: (val) => (
        <Tag color={!!val ? "success" : "error"} className="p-5 fs-16">
          {
            !!val ? "Đang sử dụng" : "Đã bị khóa"
          }
        </Tag>
      )
    },
    {
      title: "Trạng thái đăng ký",
      width: 80,
      dataIndex: "RegisterStatus",
      align: "center",
      key: "RegisterStatus",
      render: (val) => (
        <Tag color={["processing", "warning", "success", "error"][val - 1]} className="p-5 fs-16">
          {
            registerStatus?.find(i => i?.ParentID === val)?.ParentName
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
              <ButtonCircle
                key={idx}
                title={i?.title}
                disabled={i?.isDisabled}
                icon={i?.icon}
                onClick={i?.onClick}
                placement={i?.placement}
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
            QUẢN LÝ NGƯỜI DÙNG
          </div>
        </Col>
        <Col span={12}>
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
        </Col>
        <Col span={24} className="mt-16">
          <TableCustom
            isPrimary
            bordered
            noMrb
            showPagination
            dataSource={users}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="_id"
            pagination={
              !!pagination?.PageSize
                ? {
                  hideOnSinglePage: total <= 10,
                  current: pagination?.CurrentPage,
                  pageSize: pagination?.PageSize,
                  responsive: true,
                  total,
                  showSizeChanger: total > 10,
                  locale: { items_per_page: "" },
                  onChange: (CurrentPage, PageSize) =>
                    setPagination(pre => ({
                      ...pre,
                      CurrentPage,
                      PageSize,
                    })),
                }
                : false
            }
          />
        </Col>

        {
          !!openViewProfile &&
          <ViewProfileUser
            open={openViewProfile}
            onCancel={() => setOpenViewProfile(false)}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default UserManagement