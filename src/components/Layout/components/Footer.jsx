import { Col, Row } from "antd"
import { FooterContainer, FooterStyled } from "../styled"

const Footer = () => {
  return (
    <FooterContainer>
      <FooterStyled>
        <Row>
          <Col span={8}>
            <div>WEDDINGBOOK</div>
            <div>Experience K-Wedding Service At Once</div>
            <div>Studio / Dress / Make up / Planner</div>
          </Col>
          <Col span={8}>

          </Col>
          <Col span={8}>

          </Col>
        </Row>
      </FooterStyled>
    </FooterContainer>
  )
}

export default Footer