import { useNavigate } from "react-router-dom"
import { Row, Col, Typography, Divider, Image } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import { AnimatedTitle, Container, GuaranteeContainer, StepCard, StyledButton } from "./styled"
import ChooseBarber from "/chooseBarber.png"
import ChooseService from "/chooseService.png"
import CompleteSchedule from "/completeSchedule.png"
import WaitToConfirm from "/waitToConfirm.png"
import Payment from "/payment.png"

const { Title, Text } = Typography

const HowWorkPage = () => {

  const navigate = useNavigate()

  const steps = [
    {
      title: "1. Chọn barber",
      image: ChooseBarber,
      description:
        "Khám phá và lựa chọn barber phù hợp với phong cách của bạn. Hệ thống cung cấp danh sách các barber chuyên nghiệp, giúp bạn dễ dàng tìm kiếm và đặt lịch cắt tóc.",
    },
    {
      title: "2. Chọn dịch vụ",
      image: ChooseService,
      description:
        "Lựa chọn dịch vụ cắt tóc, gội đầu, tạo kiểu hay combo chăm sóc tóc theo nhu cầu. Mỗi dịch vụ đều có mô tả chi tiết và giá cả rõ ràng để bạn dễ dàng quyết định.",
    },
    {
      title: "3. Chọn lịch cắt",
      image: CompleteSchedule,
      description:
        "Chọn ngày và giờ cắt tóc phù hợp với lịch trình của bạn. Hệ thống sẽ hiển thị thời gian trống của barber để bạn dễ dàng đặt lịch.",
    },
    {
      title: "4. Xác nhận đặt lịch",
      image:
        "https://img.freepik.com/vecteurs-premium/icone-marque-controle-verte-isolee-fond-blanc-sign-symbolvector-designeps-10_1224031-925.jpg?semt=ais_hybrid",
      description:
        "Kiểm tra lại thông tin đặt lịch, bao gồm barber đã chọn, dịch vụ và thời gian. Xác nhận đặt lịch để barber nhận được thông báo và chuẩn bị cho buổi cắt tóc của bạn.",
    },
    {
      title: "5. Chờ duyệt và thanh toán",
      image: WaitToConfirm,
      description:
        "Barber sẽ xác nhận lịch hẹn của bạn. Sau khi được duyệt, bạn có thể tiến hành thanh toán trực tuyến hoặc chọn thanh toán tại cửa hàng vào ngày hẹn.",
    },
    {
      title: "6. Thanh toán và chờ đến ngày cắt",
      image: Payment,
      description:
        "Sau khi thanh toán thành công, bạn chỉ cần chờ đến ngày hẹn và tận hưởng dịch vụ chuyên nghiệp từ barber đã chọn. Nhận thông báo nhắc nhở để không bỏ lỡ cuộc hẹn của bạn.",
    },
  ]


  return (
    <Container>
      <AnimatedTitle level={2}>Bắt đầu học với ba bước đơn giản</AnimatedTitle>
      <Row gutter={[16, 16]} justify="center">
        {
          steps.map((step, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <StepCard hoverable>
                <Image src={step.image} alt={step.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <Title level={4}>{step.title}</Title>
                <Text>{step.description}</Text>
              </StepCard>
            </Col>
          ))
        }
      </Row>
      <GuaranteeContainer>
        <SmileOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
        <Title level={3} style={{ marginTop: "10px" }}>
          Đảm bảo sự hài lòng 100%!
        </Title>
        <Divider />
        <Text>
          Hãy thử những bài học đầu tiên và nếu bạn không hài lòng, chúng tôi sẽ tìm cho bạn một bài học phù hợp hơn đi
          kèm với các gia sư chất lượng nhất.
        </Text>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <StyledButton type="primary" onClick={() => navigate("/tim-kiem-mon-hoc")}>
            Bắt đầu học ngay bây giờ!
          </StyledButton>
        </div>
      </GuaranteeContainer>
    </Container>
  )
}

export default HowWorkPage
