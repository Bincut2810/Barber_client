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
    label: "Doanh thu"
  },
  {
    key: Router.QUAN_LY_NGUOI_DUNG,
    label: "Người dùng"
  },
  {
    key: Router.QUAN_LY_FEEDBACK,
    label: "Đánh giá của khách hàng"
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    TabID: 13
  },
]

export const MenuUser = () => [
  {
    key: Router.TRANG_CA_NHAN,
    label: "Thông tin cá nhân"
  },
  {
    key: Router.LICH_BOOKING,
    label: "Lịch book"
  },
  {
    key: Router.CAI_DAT_MAT_KHAU,
    label: "Đổi mật khẩu"
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    TabID: 13
  },
]