const DASHBOARD = "/dashboard"
const USER = "/user"

const Router = {
  // GUEST
  TRANG_CHU: "/",
  DANG_NHAP: "/dang-nhap",
  DANG_KY: "/dang-ky",
  DANH_SACH_BARBER: "/danh-sach-barber",
  CHI_TIET_BARBER: "/barber",

  // USER
  TRANG_CA_NHAN: `${USER}/trang-ca-nhan`,
  LICH_BOOKING: `${USER}/lich-book`,

  // ADMIN
  QUAN_LY_NGUOI_DUNG: `${DASHBOARD}/quan-ly-nguoi-dung`,

  // Error
  NOT_FOUND: "/not-found",
  FORBIDDEN: "/forbidden"
}

export default Router
