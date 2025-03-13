import { Form, Space } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import globalSlice from "src/redux/globalSlice"
import Router from "src/routers"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
import FormUserProfile from "./FormUserProfile"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"

const UpdateUserProfile = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filesCertificate, setFilesCertificate] = useState([])
  const { user } = useSelector(globalSelector)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { image, Certificates, ...remainValues } = values
      let resAvatarPath, resCertificate
      if (!!image?.file) {
        resAvatarPath = FileService.uploadFileSingle({
          FileSingle: image?.file
        })
      }
      if (!!Certificates?.some(i => !!i?.originFileObj)) {
        resCertificate = FileService.uploadFileList({
          FileList: Certificates?.map(i => i?.originFileObj)
        })
      }
      const resultFile = await Promise.all([resAvatarPath, resCertificate])
      if (!!resultFile[0]?.isError || !!resultFile[1]?.isError) return
      const res = await UserService.changeProfile({
        ...remainValues,
        AvatarPath: resultFile[0]?.data,
        Certificates: !!resultFile[1]?.data?.length
          ? [...filesCertificate?.map(i => i?.url), ...resultFile[1]?.data]
          : filesCertificate?.map(i => i?.url)
      })
      if (!!res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      onCancel()
      dispatch(globalSlice.actions.setUser(res?.data))
      navigate(Router.PROFILE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const data = {
      FullName: user?.FullName,
      Address: user?.Address,
      Gender: user?.Gender,
      Phone: user?.Phone,
      DateOfBirth: !!user?.DateOfBirth ? dayjs(user?.DateOfBirth) : null,
      Experiences: user?.Experiences,
      Certificates: user?.Certificates?.map((i, idx) => ({
        url: i,
        id: idx + 1
      }))
    }
    form.setFieldsValue(data)
    setFilesCertificate(data?.Certificates)
  }, [])


  return (
    <ModalCustom
      open={open}
      title="Hoàn thiện thông tin cá nhân"
      onCancel={!!user?.IsFirstLogin ? null : onCancel}
      closable={user?.IsFirstLogin ? false : true}
      centered={false}
      width="60vw"
      footer={
        <Space className="d-flex-end">
          <ButtonCustom
            loading={loading}
            className="primary"
            onClick={() => handleSubmit()}
          >
            Cập nhật
          </ButtonCustom>
        </Space>
      }
    >
      <FormUserProfile
        form={form}
        filesCertificate={filesCertificate}
        setFilesCertificate={setFilesCertificate}
      />
    </ModalCustom>
  )
}

export default UpdateUserProfile