import { Col, Row } from "antd"
import ButtonCustom from "src/components/MyButton/ButtonCustom"

const HomeItem = ({ title, items }) => {


  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <div className="center-text fs-34 fw-600">{title}</div>
      </Col>
      <Col span={24}>
        <Row gutter={[16]}>
          {
            items?.map((i, idx) =>
              <Col className="center-text" key={idx} span={24 / items?.length}>
                <div className="mb-16">
                  <img
                    src={i?.image}
                    style={{
                      width: "160px",
                      height: "150px"
                    }}
                  />
                </div>
                <ButtonCustom className="third-type-2 submit-btn mb-12">{i?.btn}</ButtonCustom>
                <div className="fs-13">{i?.content}</div>
              </Col>
            )
          }
        </Row>
      </Col>
    </Row>
  )
}

export default HomeItem