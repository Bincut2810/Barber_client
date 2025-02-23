import { Col, DatePicker, Form, Image, message, Radio, Row, Space, Upload } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { getBase64, normFile } from "src/lib/fileUtils"
import { getRegexPhoneNumber } from "src/lib/stringUtils"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"

const UpdateBarberInfor = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [preview, setPreview] = useState()
  const { user, listSystemKey } = useSelector(globalSelector)
  const gender = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [previewCertificate, setPreviewCertificate] = useState(false)

  const handleBeforeUpload = (file, type) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      return messageApi.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else if (file.size > 5 * 1024 * 1024) {
      return messageApi.error("Dung lượng file tải lên phải nhỏ 5MB")
    }
    if (type === "avatar") {
      setPreview(URL.createObjectURL(file))
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewCertificate(file.url || file.preview)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { image, certificates, ...remainValues } = values
      let resAvatarPath, resCertificate
      if (!!image?.file) {
        resAvatarPath = FileService.uploadFileSingle({
          FileSingle: image?.file
        })
      }
      if (!!certificates?.some(i => !!i?.originFileObj)) {
        resCertificate = FileService.uploadFileList({
          FileList: certificates?.map(i => i?.originFileObj)
        })
      }
      const resultFile = await Promise.all([resAvatarPath, resCertificate])
      if (!!resultFile[0]?.isError || !!resultFile[1]?.isError) return
      const res = await UserService.changeProfile({
        ...remainValues,
        AvatarPath: resultFile[0]?.data,
        Certificates: resultFile[1]?.data
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


  return (
    <ModalCustom
      open={open}
      title="Hoàn thiện thông tin cá nhân"
      closable={false}
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
      <Form form={form}>
        <Row gutter={[12, 0]}>
          {contextHolder}
          <Col span={7}>
            <Form.Item
              name='image'
            >
              <Upload.Dragger
                beforeUpload={file => handleBeforeUpload(file, "avatar")}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div >
                  Chọn ảnh đại diện cho bạn
                </div>
                <img
                  style={{ width: '100%', height: '200px' }}
                  src={!!preview ? preview : user?.AvatarPath}
                  alt=""
                />
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={17}>
            <Form.Item
              name='Address'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom placeholder="Nhập vào địa chỉ" />
            </Form.Item>
            <Form.Item
              name="Gender"
              rules={[
                { required: true, message: "Hãy chọn giới tính của bạn" },
              ]}
            >
              <Radio.Group>
                <Space direction="horizontal">
                  {
                    gender?.map((i, idx) =>
                      <Radio
                        className="border-radio"
                        key={idx}
                        value={i?.ParentID}
                      >
                        {i?.ParentName}
                      </Radio>
                    )
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='Phone'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
                { pattern: getRegexPhoneNumber(), message: "Số điện thoại sai định dạng" }
              ]}
            >
              <InputCustom placeholder="Nhập vào số diện thoại" />
            </Form.Item>
            <Form.Item
              name='DateOfBirth'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày sinh của bạn"
                format="DD/MM/YYYY"
                style={{
                  width: "100%"
                }}
              />
            </Form.Item>
            <Form.Item
              name='Experiences'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom type="isTextArea" placeholder="Mô tả về kinh nghiệm làm việc của bạn" style={{ height: "80px" }} />
            </Form.Item>
            <Form.Item
              name="certificates"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: "Hãy chọn file tải lên" }
              ]}
            >
              <Upload.Dragger
                listType="picture-circle"
                beforeUpload={file => handleBeforeUpload(file)}
                onPreview={handlePreview}
                accept="image/*"
                className="pointer"
                multiple={true}
              // onRemove={file => {
              //   if (!!file?.id) {
              //     const copyFile = [...filesCertificate]
              //     const newData = copyFile.filter(i => i?.id !== file?.id)
              //     setFilesCertificate(newData)
              //   }
              // }}
              >
                Tải lên ảnh chứng chỉ của bạn
              </Upload.Dragger>
            </Form.Item>
          </Col>

          {
            !!previewCertificate &&
            <Image
              src={previewCertificate}
              style={{
                display: 'none',
              }}
              preview={{
                visible: !!previewCertificate,
                src: previewCertificate,
                onVisibleChange: (value) => {
                  setPreviewCertificate(value)
                },
              }}
            />
          }

        </Row>
      </Form>
    </ModalCustom>
  )
}

export default UpdateBarberInfor