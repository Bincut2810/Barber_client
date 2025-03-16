import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import dayjs from "dayjs"
import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import globalSlice from "src/redux/globalSlice"
import FormUserProfile from "./components/FormUserProfile"

const UserProfile = () => {

  const { user } = useSelector(globalSelector)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [filesCertificate, setFilesCertificate] = useState([])

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
      dispatch(globalSlice.actions.setUser(res?.data))
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
    <Row gutter={[0, 16]}>
      <Col span={24} className="d-flex-sb">
        <div className="title-type-2">
          Thông tin các nhân
        </div>
      </Col>
      <Col span={24}>
        <FormUserProfile
          form={form}
          filesCertificate={filesCertificate}
          setFilesCertificate={setFilesCertificate}
        />
      </Col>
      <Col span={24} className="d-flex-end">
        <ButtonCustom
          loading={loading}
          className="primary medium-size"
          onClick={() => handleSubmit()}
        >
          Lưu
        </ButtonCustom>
      </Col>
    </Row>
  )
}

export default UserProfile