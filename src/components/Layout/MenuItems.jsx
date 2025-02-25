import Router from "src/routers"
import ListIcons from "../ListIcons"

export const MenuCommon = () => [
  {
    key: "/dich-vu",
    label: "DỊCH VỤ",
  },
  {
    key: Router.DANH_SACH_BARBER,
    label: "BARBER",
  },
  {
    key: "/thiep-cuoi-online",
    label: "THIỆP CƯỚI ONLINE",
  },
  {
    key: "/su-kien",
    label: "SỰ KIỆN",
  },
  {
    key: "/blog",
    label: "Blog cưới",
  }
]

export const MenuAdmin = () => [
  {
    key: Router.QUAN_LY_NGUOI_DUNG,
    label: "Người dùng"
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
    label: "Thông tin tài khoản"
  },
  {
    key: Router.LICH_BOOKING,
    label: "Lịch book"
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    TabID: 13
  },
]