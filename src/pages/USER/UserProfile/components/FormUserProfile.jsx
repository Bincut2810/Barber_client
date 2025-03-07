import { Col, DatePicker, Form, Image, message, Radio, Row, Space, Upload } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import InputCustom from "src/components/InputCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { getBase64, normFile } from "src/lib/fileUtils"
import { getRegexPhoneNumber } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"

const FormUserProfile = ({ form, filesCertificate, setFilesCertificate }) => {

  const [preview, setPreview] = useState()
  const { user, listSystemKey } = useSelector(globalSelector)
  const gender = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
  const [previewCertificate, setPreviewCertificate] = useState(false)

  const handleBeforeUpload = (file, type) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      return message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else if (file.size > 5 * 1024 * 1024) {
      return message.error("Dung lượng file tải lên phải nhỏ 5MB")
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


  return (
    <Form form={form}>
      <Row gutter={[12, 0]}>
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
          {
            user?.RoleID === Roles.ROLE_BARBER &&
            <>
              <Form.Item
                name='Experiences'
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                ]}
              >
                <InputCustom type="isTextArea" placeholder="Mô tả về kinh nghiệm làm việc của bạn" style={{ height: "80px" }} />
              </Form.Item>
              <Form.Item
                name="Certificates"
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
                  onRemove={file => {
                    if (!!file?.id) {
                      const copyFile = [...filesCertificate]
                      const newData = copyFile.filter(i => i?.id !== file?.id)
                      setFilesCertificate(newData)
                    }
                  }}
                >
                  Tải lên ảnh chứng chỉ của bạn
                </Upload.Dragger>
              </Form.Item>
            </>
          }
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
  )
}

export default FormUserProfile