import Router from "src/routers"
import ListIcons from "../ListIcons"

export const MenuCommon = () => [
  {
    key: Router.DANH_SACH_BARBER,
    label: "BARBER",
  },
  {
    key: Router.CACH_HOAT_DONG,
    label: "CÁCH HOẠT ĐỘNG",
  }
]

export const MenuAdmin = () => [
  {
    key: Router.QUAN_LY_DOANH_THU,
    label: "Doanh thu",
    TabID: 1
  },
  {
    key: Router.QUAN_LY_NGUOI_DUNG,
    label: "Người dùng",
    TabID: 2
  },
  {
    key: Router.QUAN_LY_FEEDBACK,
    label: "Đánh giá của khách hàng",
    TabID: 3
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    TabID: 4
  },
]

export const MenuUser = () => [
  {
    key: Router.TRANG_CA_NHAN,
    label: "Thông tin cá nhân",
    TabID: 1
  },
  {
    key: Router.DASHBOARD,
    label: "Dashboard",
    TabID: 2
  },
  {
    key: Router.DICH_VU_LICH_LAM_VIEC,
    label: "Dịch vụ và lịch làm việc",
    TabID: 3
  },
  {
    key: Router.MAU_TOC_CUA_BAN,
    label: "Mẫu tóc của bạn",
    TabID: 4
  },
  {
    key: Router.CAC_LICH_HEN,
    label: "Các lịch hẹn",
    TabID: 5
  },
  {
    key: Router.LICH_SU_GIAO_DICH,
    label: "Lịch sử giao dịch",
    TabID: 6
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    TabID: 7
  },
]