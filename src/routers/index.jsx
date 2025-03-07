const DASHBOARD = "/dashboard"
const USER = "/user"

const Router = {
  // GUEST
  TRANG_CHU: "/",
  DANG_NHAP: "/dang-nhap",
  DANG_KY: "/dang-ky",
  DANH_SACH_BARBER: "/danh-sach-barber",
  CHI_TIET_BARBER: "/barber",
  FORGOT_PASSWORD: "/quen-mat-khau",
  CACH_HOAT_DONG: "/cach-hoat-dong",

  // USER
  TRANG_CA_NHAN: `${USER}/trang-ca-nhan`,
  LICH_BOOKING: `${USER}/lich-book`,
  CHECKOUT: `${USER}/checkout`,
  CAI_DAT_MAT_KHAU: `${USER}/cai-dat-mat-khau`,

  // ADMIN
  QUAN_LY_NGUOI_DUNG: `${DASHBOARD}/quan-ly-nguoi-dung`,
  QUAN_LY_DOANH_THU: `${DASHBOARD}/quan-ly-doanh-thu`,
  QUAN_LY_FEEDBACK: `${DASHBOARD}/quan-ly-danh-gia`,

  // Error
  NOT_FOUND: "/not-found",
  FORBIDDEN: "/forbidden"
}

export default Router
