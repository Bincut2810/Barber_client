import React, { useEffect, useState } from 'react'
import Router from './routers'
import CommonService from './services/CommonService'
import { useDispatch, useSelector } from 'react-redux'
import globalSlice from './redux/globalSlice'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { globalSelector } from './redux/selector'
import { Roles } from './lib/constant'
import UserService from './services/UserService'
import { toast, ToastContainer } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import SpinCustom from './components/SpinCustom'
import ScrollToTop from './components/ScrollToTop'
import UpdateUserProfile from './pages/USER/UserProfile/components/UpdateUserProfile'
import InactiveModal from './components/Layout/components/InactiveAccount'
import socket from './socket'

// ADMIN
const AdminRoutes = React.lazy(() => import("src/pages/ADMIN/AdminRoutes"))
const UserManagement = React.lazy(() => import("src/pages/ADMIN/UserManagement"))
const PaymentManagement = React.lazy(() => import("src/pages/ADMIN/PaymentManagement"))
const FeedbackManagement = React.lazy(() => import("src/pages/ADMIN/FeedbackManagement"))

// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import("src/pages/ANONYMOUS/AnonymousRoutes"))
const Register = React.lazy(() => import("src/pages/ANONYMOUS/Register"))
const Login = React.lazy(() => import("src/pages/ANONYMOUS/Login"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const BarberList = React.lazy(() => import("src/pages/ANONYMOUS/BarberList"))
const BarberDetail = React.lazy(() => import("src/pages/ANONYMOUS/BarberDetail"))
const ForgotPassword = React.lazy(() => import("src/pages/ANONYMOUS/ForgotPassword"))
const HowWorkPage = React.lazy(() => import("src/pages/ANONYMOUS/HowWorkPage"))

// USER
const UserRoutes = React.lazy(() => import("src/pages/USER/UserRoutes"))
const UserProfile = React.lazy(() => import("src/pages/USER/UserProfile"))
const MyBooking = React.lazy(() => import("src/pages/USER/MyBooking"))
const CheckoutPage = React.lazy(() => import("src/pages/USER/CheckoutPage"))
const AccountUser = React.lazy(() => import("src/pages/USER/AccountUser"))

// ERROR
const NotFoundPage = React.lazy(() => import("src/pages/ErrorPage/NotFoundPage"))
const ForbiddenPage = React.lazy(() => import("src/pages/ErrorPage/ForbiddenPage"))

const LazyLoadingComponent = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const App = () => {

  const [tokenData, setTokenData] = useState()
  const [loading, setLoading] = useState(false)

  const routes = [

    // ADMIN
    {
      element: (
        <LazyLoadingComponent>
          <AdminRoutes tokenData={tokenData} loading={loading} />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: Router.QUAN_LY_NGUOI_DUNG,
          element: (
            <LazyLoadingComponent>
              <UserManagement />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.QUAN_LY_DOANH_THU,
          element: (
            <LazyLoadingComponent>
              <PaymentManagement />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.QUAN_LY_FEEDBACK,
          element: (
            <LazyLoadingComponent>
              <FeedbackManagement />
            </LazyLoadingComponent>
          )
        },
      ]
    },

    // USER
    {
      element: (
        <LazyLoadingComponent>
          <UserRoutes tokenData={tokenData} loading={loading} />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: Router.TRANG_CA_NHAN,
          element: (
            <LazyLoadingComponent>
              <UserProfile />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.LICH_BOOKING,
          element: (
            <LazyLoadingComponent>
              <MyBooking />
            </LazyLoadingComponent>
          )
        },
        {
          path: `${Router.CHECKOUT}/:BookingID`,
          element: (
            <LazyLoadingComponent>
              <CheckoutPage />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.CAI_DAT_MAT_KHAU,
          element: (
            <LazyLoadingComponent>
              <AccountUser />
            </LazyLoadingComponent>
          )
        },
      ]
    },

    // ANONYMOUS
    {
      element: (
        <LazyLoadingComponent>
          <AnonymousRoutes />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: Router.TRANG_CHU,
          element: (
            <LazyLoadingComponent>
              <Home />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.DANG_NHAP,
          element: (
            <LazyLoadingComponent>
              <Login />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.DANG_KY,
          element: (
            <LazyLoadingComponent>
              <Register />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.DANH_SACH_BARBER,
          element: (
            <LazyLoadingComponent>
              <BarberList />
            </LazyLoadingComponent>
          )
        },
        {
          path: `${Router.CHI_TIET_BARBER}/:BarberID`,
          element: (
            <LazyLoadingComponent>
              <BarberDetail />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.FORGOT_PASSWORD,
          element: (
            <LazyLoadingComponent>
              <ForgotPassword />
            </LazyLoadingComponent>
          )
        },
        {
          path: Router.CACH_HOAT_DONG,
          element: (
            <LazyLoadingComponent>
              <HowWorkPage />
            </LazyLoadingComponent>
          )
        },
      ]
    },
    {
      path: "/forbidden",
      element: (
        <LazyLoadingComponent>
          <ForbiddenPage />
        </LazyLoadingComponent>
      )
    },
    {
      path: "*",
      element: (
        <LazyLoadingComponent>
          <NotFoundPage />
        </LazyLoadingComponent>
      )
    }
  ]

  const appRoutes = useRoutes(routes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCheckAuth, user, routerBeforeLogin } = useSelector(globalSelector)
  const [openUpdateUserProfile, setOpenUpdateUserProfile] = useState(false)
  const location = useLocation()
  const [openInactiveAccount, setOpenInactiveAccount] = useState(false)

  const handleNavigate = (userInfor) => {
    if (!!routerBeforeLogin) {
      dispatch(globalSlice.actions.setRouterBeforeLogin(""))
      navigate(routerBeforeLogin)
    } else {
      if (userInfor.RoleID === Roles.ROLE_ADMIN) {
        navigate(Router.QUAN_LY_DOANH_THU)
      } else {
        navigate(Router.TRANG_CHU)
      }
    }
  }

  const getListSystemKey = async () => {
    try {
      setLoading(true)
      const res = await CommonService.getListSystemkey()
      if (!!res?.isError) return
      dispatch(globalSlice.actions.setListSystemKey(res?.data))
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    try {
      setLoading(true)
      const res = await UserService.checkAuth()
      if (!!res?.isError) return
      if (!!res?.data) {
        const tokenData = jwtDecode(res?.data)
        const { payload } = tokenData
        if (!!payload.ID) {
          setTokenData(payload)
          dispatch(globalSlice.actions.setIsLogin(true))
          getDetailProfile()
        } else {
          navigate('/forbidden')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const getDetailProfile = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile()
      if (!!res?.isError) return toast.error(res?.msg)
      // const resTabs = await CommonService.getListTabs({
      //   IsByGoogle: res?.data?.IsByGoogle
      // })
      // if (!!resTabs?.isError) return
      socket.connect()
      socket.emit("add-user-online", res?.data?._id)
      dispatch(globalSlice.actions.setUser(res?.data))
      // dispatch(globalSlice.actions.setListTabs(resTabs?.data))
      if (location.pathname === Router.DANG_NHAP) {
        handleNavigate(res?.data)
      }
    } finally {
      setLoading(false)
    }
  }

  const getProfitPercent = async () => {
    try {
      setLoading(true)
      const res = await CommonService.getProfitPercent()
      if (!!res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setProfitPercent(res?.data?.Percent))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSystemKey()
    getProfitPercent()
  }, [])

  useEffect(() => {
    checkAuth()
  }, [isCheckAuth])

  useEffect(() => {
    if (!!user?.IsFirstLogin) {
      setOpenUpdateUserProfile(user)
    }
  }, [user])

  useEffect(() => {
    socket.on('listen-inactive-account', (data) => {
      setOpenInactiveAccount(data)
    })
  }, [])


  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
      />
      <div>{appRoutes}</div>

      {
        !!openUpdateUserProfile &&
        <UpdateUserProfile
          open={openUpdateUserProfile}
          onCancel={() => setOpenUpdateUserProfile(false)}
        />
      }

      {
        !!openInactiveAccount &&
        <InactiveModal
          open={openInactiveAccount}
          onCancel={() => setOpenInactiveAccount(false)}
        />
      }

    </div>
  )
}

export default App
