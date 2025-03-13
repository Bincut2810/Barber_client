import { Form, message, Space, Upload } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { getBase64, normFile } from "src/lib/fileUtils"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"

const ResultSetting = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const [previewCertificate, setPreviewCertificate] = useState()
  const [loading, setLoading] = useState(false)
  const [filesResult, setFilesResult] = useState([])
  const { user } = useSelector(globalSelector)
  const dispatch = useDispatch()

  const handleBeforeUpload = (file) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      return message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else if (file.size > 5 * 1024 * 1024) {
      return message.error("Dung lượng file tải lên phải nhỏ 5MB")
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { Results } = values
      let resResult
      if (!!Results?.some(i => !!i?.originFileObj)) {
        resResult = await FileService.uploadFileList({
          FileList: Results?.map(i => i?.originFileObj)
        })
      }
      if (!!resResult?.isError) return
      const res = await UserService.updateResult({
        Results: !!resResult?.data?.length
          ? [...filesResult?.map(i => i?.url), ...resResult?.data]
          : filesResult?.map(i => i?.url)
      })
      if (!!res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      toast.success(res?.msg)
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const data = {
      Results: user?.Results?.map((i, idx) => ({
        url: i,
        id: idx + 1
      }))
    }
    form.setFieldsValue(data)
    setFilesResult(data?.Results)
  }, [])


  return (
    <ModalCustom
      open={open}
      title="Thêm mẫu tóc bạn đã tạo"
      onCancel={onCancel}
      centered={false}
      width="45vw"
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
      <Form form={form}>
        <Form.Item
          name="Results"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Hãy chọn file tải lên" }
          ]}
        >
          <Upload.Dragger
            listType="picture-circle"
            beforeUpload={file => handleBeforeUpload(file)}
            // onPreview={handlePreview}
            accept="image/*"
            className="pointer"
            multiple={true}
            onRemove={file => {
              if (!!file?.id) {
                const newData = filesResult.filter(i => i?.id !== file?.id)
                setFilesResult(newData)
              }
            }}
          >
            Tải lên mẫu tóc bạn đã tạo
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </ModalCustom>
  )
}

export default ResultSetting