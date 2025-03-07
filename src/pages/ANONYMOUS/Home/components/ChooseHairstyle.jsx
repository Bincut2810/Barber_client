import { Col, Row, Space } from "antd"
import ButtonCustom from "src/components/MyButton/ButtonCustom"

const ChooseHairstyle = () => {


  return (
    <Row gutter={[16, 0]} className="d-flex-sb">
      <Col span={12}>
        <div className="primary-text fs-18 mb-12">Men, face shape matters</div>
        <div className="fs-25 fw-600 mb-12">
          Xác định những yếu tố quan trọng với việc lựa chọn kiểu tóc
        </div>
        <Space>
          <ButtonCustom className="third-type-2">Test kiểu tóc</ButtonCustom>
          <ButtonCustom className="third-type-2">Test màu tóc</ButtonCustom>
        </Space>
      </Col>
      <Col span={12}>
        <div className="mb-16">
          Có rất nhiều dáng khuôn mặt: mặt tròn, mặt trái xoan, mặt vuông hoặc kim cương. Một kiểu tóc phù hợp, sẽ giúp khắc phục dáng mặt hài hòa hơn và cải thiện được một vài khuyết điểm của gương mặt.
        </div>
        <div>
          Một yếu tố khác cần xem xét là mật độ tóc. Mặc dù có một số kiểu tóc đẹp mà bạn yêu thích, nhưng không phải kiểu nào cũng phù hợp, bởi kiểu tóc nào cũng đòi hỏi mật độ tóc khác nhau, cũng như chất tóc cứng, mềm, xoăn, bồng bềnh hay bung chỉa.
        </div>
      </Col>
    </Row>
  )
}

export default ChooseHairstyle