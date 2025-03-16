const DASHBOARD = "/dashboard"
const USER = "/user"

const Router = {
  // GUEST
  TRANG_CHU: "/",
  DANG_NHAP: "/dang-nhap",
  DANG_KY: "/dang-ky",
  DANH_SACH_BARBER: "/danh-sach-barber",
  CHI_TIET_BARBER: "/barber",
  CACH_HOAT_DONG: "/cach-hoat-dong",

  // USER
  DASHBOARD: `${USER}/dashboard`,
  TRANG_CA_NHAN: `${USER}/trang-ca-nhan`,
  CAC_LICH_HEN: `${USER}/cac-lich-hen`,
  CHECKOUT: `${USER}/checkout`,
  DICH_VU_LICH_LAM_VIEC: `${USER}/dich-vu-va-lich-lam-viec`,
  MAU_TOC_CUA_BAN: `${USER}/mau-toc-cua-ban`,
  LICH_SU_GIAO_DICH: `${USER}/lich-su-giao-dich`,

  // ADMIN
  QUAN_LY_NGUOI_DUNG: `${DASHBOARD}/quan-ly-nguoi-dung`,
  QUAN_LY_DOANH_THU: `${DASHBOARD}/quan-ly-doanh-thu`,
  QUAN_LY_FEEDBACK: `${DASHBOARD}/quan-ly-danh-gia`,

  // Error
  NOT_FOUND: "/not-found",
  FORBIDDEN: "/forbidden"
}

export default Router
