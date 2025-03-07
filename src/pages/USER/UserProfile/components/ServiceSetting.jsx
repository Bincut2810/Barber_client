import { Col, Form, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ListIcons from "src/components/ListIcons"
import ModalCustom from "src/components/ModalCustom"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { PROFIT_PERCENT } from "src/lib/constant"
import { formatMoney, getRealFee } from "src/lib/stringUtils"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"

const ServiceSetting = ({ open, onCancel }) => {

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { user } = useSelector(globalSelector)

  const handleChangeService = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.updateService({
        Services: values?.services?.map(i => i)
      })
      if (!!res?.isError) return
      toast.success(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      services: !!user?.Services?.length
        ? user?.Services?.map(i => i)
        : [{}],
    })
  }, [])


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Cài đặt dịch vụ"
      width="80vw"
      footer={
        <Space className="d-flex-end">
          <ButtonCustom className="third" onClick={onCancel}>
            Đóng
          </ButtonCustom>
          <ButtonCustom
            loading={loading}
            className="primary"
            onClick={() => {
              handleChangeService()
            }}
          >
            Lưu
          </ButtonCustom>
        </Space>
      }
    >
      <Form form={form}>
        <Form.List name="services">
          {(fields, { add, remove }) => (
            <Row gutter={[12]}>
              <Col span={24} className="mb-12">
                <div className="d-flex-sb">
                  <div className="fs-18 fw-600">Dịch vụ bạn có thể cung cấp cho khách hàng</div>
                  <ButtonCustom
                    className="third-type-2"
                    onClick={() => add()}
                  >
                    Thêm dịch vụ
                  </ButtonCustom>
                </div>
              </Col>
              <Col span={24}>
                {
                  fields.map(({ key, name, ...restField }) =>
                    <Row className="d-flex mb-16" key={key} gutter={[16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[name, 'ServiceName']}
                          {...restField}
                          label={<div className="fw-600">Tên dịch vụ</div>}
                          rules={[
                            { required: true, message: "Thông tin không được để trống" },
                          ]}
                        >
                          <InputCustom placeholder="Tên dịch vụ" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[name, 'ServiceTime']}
                          {...restField}
                          label={<div className="fw-600">Thời gian dịch vụ:</div>}
                          rules={[
                            { required: true, message: "Thông tin không được để trống" },
                          ]}
                        >
                          <InputCustom
                            style={{ width: "100%" }}
                            type="isNumber"
                            placeholder="Thời gian dịch vụ (phút)"
                            min={30}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          name={[name, 'ServicePrice']}
                          {...restField}
                          label={<div className="fw-600">Giá tiền</div>}
                          rules={[
                            { required: true, message: "Thông tin không được để trống" },
                            {
                              validator: (rule, value) => {
                                if (!value) {
                                  return Promise.reject("Thông tin không được để trống")
                                }
                                const fee = parseInt(value)
                                if (isNaN(fee)) {
                                  return Promise.reject("Vui lòng nhập vào số")
                                } else if (fee < 50000) {
                                  return Promise.reject("Số nhập vào phải lớn hơn hoặc bằng 50000")
                                }
                                return Promise.resolve()
                              }
                            },
                          ]}
                        >
                          <InputCustom
                            placeholder="Giá tiền"
                            type="isNumber"
                            style={{
                              width: "100%"
                            }}
                            onChange={e => {
                              const fee = !!e ? e : 0
                              const expense = getRealFee(fee, PROFIT_PERCENT)
                              form.setFieldsValue({
                                services: {
                                  [name]: { ExpensePrice: expense },
                                },
                              })
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={[name, 'ExpensePrice']}
                          {...restField}
                          label={<div className="fw-600">Số tiền bạn nhận được</div>}
                          rules={[
                            { required: true, message: "Thông tin không được để trống" },
                          ]}
                        >
                          <InputCustom
                            style={{
                              width: "100%"
                            }}
                            type="isNumber"
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <ButtonCircle
                          icon={ListIcons.ICON_DELETE}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  )
                }
              </Col>
            </Row>
          )}
        </Form.List>
      </Form>
    </ModalCustom>
  )
}

export default ServiceSetting