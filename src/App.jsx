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
import UpdateBarberInfor from './components/Layout/components/UpdateBarberInfor'

// ADMIN
const AdminRoutes = React.lazy(() => import("src/pages/ADMIN/AdminRoutes"))
const UserManagement = React.lazy(() => import("src/pages/ADMIN/UserManagement"))

// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import("src/pages/ANONYMOUS/AnonymousRoutes"))
const Register = React.lazy(() => import("src/pages/ANONYMOUS/Register"))
const Login = React.lazy(() => import("src/pages/ANONYMOUS/Login"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const BarberList = React.lazy(() => import("src/pages/ANONYMOUS/BarberList"))
const BarberDetail = React.lazy(() => import("src/pages/ANONYMOUS/BarberDetail"))

// USER
const UserRoutes = React.lazy(() => import("src/pages/USER/UserRoutes"))
const UserProfile = React.lazy(() => import("src/pages/USER/UserProfile"))
const MyBooking = React.lazy(() => import("src/pages/USER/MyBooking"))

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
  const [openUpdateBarberInfor, setOpenUpdateBarberInfor] = useState(false)
  const location = useLocation()

  const handleNavigate = (userInfor) => {
    console.log("userInfor", userInfor);
    if (!!routerBeforeLogin) {
      dispatch(globalSlice.actions.setRouterBeforeLogin(""))
      navigate(routerBeforeLogin)
    } else {
      if (userInfor.RoleID === Roles.ROLE_ADMIN) {
        navigate(Router.QUAN_LY_NGUOI_DUNG)
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
      // socket.connect()
      // socket.emit("add-user-online", res?.data?._id)
      dispatch(globalSlice.actions.setUser(res?.data))
      // dispatch(globalSlice.actions.setListTabs(resTabs?.data))
      if (location.pathname === Router.DANG_NHAP) {
        handleNavigate(res?.data)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSystemKey()
  }, [])

  useEffect(() => {
    checkAuth()
  }, [isCheckAuth])

  useEffect(() => {
    if (!!user?.IsFirstLogin) {
      setOpenUpdateBarberInfor(user)
    }
  }, [user])


  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
      />
      <div>{appRoutes}</div>

      {
        !!openUpdateBarberInfor &&
        <UpdateBarberInfor
          open={openUpdateBarberInfor}
          onCancel={() => setOpenUpdateBarberInfor(false)}
        />
      }

    </div>
  )
}

export default App
